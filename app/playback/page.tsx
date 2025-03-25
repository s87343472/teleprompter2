"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Minus, Pause, Play, Plus, RotateCcw, Volume2, VolumeX, Expand } from "lucide-react"
import Logo from "@/components/Logo"
import Link from "next/link"

export default function PlaybackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get script content from URL params or use default
  const encodedScript = searchParams.get("script") || ""
  const initialSpeed = Number.parseFloat(searchParams.get("speed") || "1.0")
  const initialFontSize = Number.parseInt(searchParams.get("fontSize") || "36")

  // State
  const [scriptContent, setScriptContent] = useState("")
  const [scriptLines, setScriptLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(-1) // -1 for countdown
  const [isPlaying, setIsPlaying] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [speed, setSpeed] = useState(initialSpeed)
  const [fontSize, setFontSize] = useState(initialFontSize)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showEnd, setShowEnd] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Decode script content on mount
  useEffect(() => {
    if (encodedScript) {
      try {
        const decoded = decodeURIComponent(encodedScript)
        setScriptContent(decoded)
        setScriptLines(decoded.split("\n"))
      } catch (e) {
        console.error("Failed to decode script:", e)
        setScriptContent("Error loading script content.")
        setScriptLines(["Error loading script content."])
      }
    } else {
      const defaultScript =
        "Welcome to Teleprompter.today professional system.\n\nThis is your script content, each line will be clearly displayed during playback.\n\nThe system automatically tracks the current reading line and provides highlighting.\n\nYou can easily adjust scrolling speed, font size, and display effects.\n\nStart using it now to create a more professional presentation experience!"
      setScriptContent(defaultScript)
      setScriptLines(defaultScript.split("\n"))
    }
  }, [encodedScript])

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      // If at the end, restart from beginning
      if (currentLine >= scriptLines.length - 1) {
        setCurrentLine(-1) // Start with countdown
        setShowEnd(false)
      }
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, currentLine, scriptLines.length])

  // Adjust speed
  const adjustSpeed = useCallback((amount: number) => {
    setSpeed((prev) => {
      const newSpeed = Number.parseFloat((prev + amount).toFixed(1))
      return Math.max(0.1, Math.min(10.0, newSpeed))
    })
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ": // Space
          e.preventDefault()
          togglePlay()
          break
        case "ArrowUp":
          e.preventDefault()
          adjustSpeed(0.1)
          break
        case "ArrowDown":
          e.preventDefault()
          adjustSpeed(-0.1)
          break
        case "ArrowLeft":
          e.preventDefault()
          if (currentLine > 0) setCurrentLine(currentLine - 1)
          break
        case "ArrowRight":
          e.preventDefault()
          if (currentLine < scriptLines.length - 1) setCurrentLine(currentLine + 1)
          break
        case "Escape":
          e.preventDefault()
          router.push("/editor")
          break
        case "h":
          e.preventDefault()
          setShowControls(!showControls)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentLine, scriptLines.length, showControls, router, adjustSpeed, togglePlay])

  // Handle countdown and playback
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isPlaying) {
      if (currentLine === -1) {
        // Countdown phase
        timer = setTimeout(() => {
          if (countdown > 1) {
            setCountdown(countdown - 1)
          } else {
            setCurrentLine(0) // Start from first line immediately after countdown
            setCountdown(3) // Reset countdown for next time
            setShowEnd(false)
            if (!isMuted && audioRef.current) {
              audioRef.current.currentTime = 0
              audioRef.current.play().catch((e) => console.error("Audio play error:", e))
            }
          }
        }, 1000)
      } else {
        // Regular playback
        timer = setTimeout(() => {
          if (currentLine < scriptLines.length - 1) {
            setCurrentLine(currentLine + 1)
            setShowEnd(false)
            if (!isMuted && audioRef.current) {
              audioRef.current.currentTime = 0
              audioRef.current.play().catch((e) => console.error("Audio play error:", e))
            }
          } else {
            // Show END when we reach the last line
            setShowEnd(true)
            setIsPlaying(false)
          }
        }, 2000 / speed) // Speed affects interval
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isPlaying, currentLine, countdown, scriptLines.length, speed, isMuted])

  // Reset to beginning
  const resetToStart = () => {
    setCurrentLine(-1)
    setIsPlaying(false)
    setShowEnd(false)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Exit playback
  const exitPlayback = () => {
    router.push(`/editor?keepScript=${encodeURIComponent(scriptContent)}`)
  }

  // Mouse movement detection for controls
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [isPlaying])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black text-white flex flex-col"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Hidden audio element for line change sound */}
      <audio ref={audioRef} className="hidden">
        <source src="/click.mp3" type="audio/mpeg" />
      </audio>

      {/* Top status bar - only visible when controls are shown */}
      {showControls && (
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center text-xs font-mono z-50">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1" onClick={exitPlayback}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              EXIT
            </Button>
            <Link href="/" className="flex items-center">
              <Logo variant="light" size={20} withText={false} />
            </Link>
            <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-red-500" : "bg-gray-500"}`}></div>
            <span>{isPlaying ? "PLAYING" : "STANDBY"}</span>
          </div>
          <div className="flex space-x-4">
            <span>SPEED: {speed.toFixed(1)}x</span>
            <span>SIZE: {fontSize}px</span>
            <span>
              LINE: {currentLine >= 0 ? currentLine + 1 : 0}/{scriptLines.length}
            </span>
          </div>
        </div>
      )}

      {/* Main teleprompter display */}
      <div className="flex-1 overflow-hidden relative">
        {/* Countdown display */}
        {currentLine === -1 && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-6xl font-bold text-orange-500">{countdown}</div>
          </div>
        )}

        {/* Keyboard shortcuts reminder - only visible during countdown or when paused */}
        {(currentLine === -1 || !isPlaying) && !showEnd && (
          <div className="absolute top-1/4 left-0 right-0 text-center text-gray-400 pointer-events-none z-40">
            <div className="text-sm mb-2">KEYBOARD SHORTCUTS</div>
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-xs">
              <div className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                <span>Space</span>
                <span>Play/Pause</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                <span>↑/↓</span>
                <span>Adjust Speed</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                <span>←/→</span>
                <span>Previous/Next Line</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                <span>H</span>
                <span>Hide Controls</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                <span>Esc</span>
                <span>Exit Playback</span>
              </div>
            </div>
          </div>
        )}

        {/* Simple fixed-position teleprompter implementation */}
        {currentLine >= 0 && !showEnd && (
          <>
            {/* Fixed indicator bar in the middle of the screen */}
            <div
              className="fixed left-0 right-0 bg-orange-500/20 border-t-2 border-b-2 border-orange-500 z-20"
              style={{
                height: `${fontSize * lineHeight}px`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />

            {/* Text lines */}
            <div className="fixed inset-0 flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl px-4">
                {scriptLines.map((line, index) => {
                  // Calculate position relative to current line
                  const position = index - currentLine
                  const lineTop = `calc(50% + ${position * fontSize * lineHeight}px - ${(fontSize * lineHeight) / 2}px)`

                  return (
                    <div
                      key={index}
                      className={`absolute left-0 right-0 px-8 text-center transition-all duration-500 ${
                        position === 0 ? "text-white font-bold" : "text-gray-400"
                      }`}
                      style={{
                        top: lineTop,
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeight}`,
                        opacity: Math.abs(position) < 5 ? 1 : 0, // Only show nearby lines
                      }}
                    >
                      {line || " "}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* END display - only visible at the end */}
        {showEnd && (
          <>
            {/* Fixed indicator bar in the middle of the screen */}
            <div
              className="fixed left-0 right-0 bg-orange-500/20 border-t-2 border-b-2 border-orange-500 z-20"
              style={{
                height: `${fontSize * lineHeight}px`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />

            {/* END text */}
            <div className="fixed inset-0 flex items-center justify-center">
              <div
                className="text-4xl font-bold text-orange-500"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: `${lineHeight}`,
                }}
              >
                END
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom controls - only visible when controls are shown */}
      {showControls && (
        <div className="bg-gray-900/80 p-4 flex justify-center space-x-6 z-50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
              onClick={() => adjustSpeed(-0.1)}
              title="Decrease Speed"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="text-xs text-white">{speed.toFixed(1)}x</div>
            <Button
              variant="ghost"
              className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
              onClick={() => adjustSpeed(0.1)}
              title="Increase Speed"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            className={`w-12 h-10 ${isPlaying ? "bg-orange-500 hover:bg-orange-600" : "bg-black hover:bg-gray-800"} text-white flex items-center justify-center`}
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            className="w-12 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen();
              }
            }}
            title="Fullscreen"
          >
            <Expand className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

