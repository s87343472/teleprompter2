"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Minus, Pause, Play, Plus, RotateCcw, Volume2, VolumeX, Expand } from "lucide-react"
import Logo from "@/components/Logo"
import Link from "next/link"
import { getScript, getDefaultScriptContent } from "@/lib/scriptStorage"

export default function PlaybackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 从URL获取脚本ID
  const scriptId = searchParams.get("id") || ""

  // State
  const [scriptContent, setScriptContent] = useState("")
  const [scriptLines, setScriptLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(-1) // -1 for countdown
  const [isPlaying, setIsPlaying] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [speed, setSpeed] = useState(1.0)
  const [fontSize, setFontSize] = useState(36)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center')
  const [mirror, setMirror] = useState({
    horizontal: false,
    vertical: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 从localStorage加载脚本内容
  useEffect(() => {
    if (scriptId) {
      const script = getScript(scriptId);
      if (script) {
        setScriptContent(script.content);
        setScriptLines(script.content.split("\n"));
        
        // 应用保存的设置
        if (script.settings) {
          if (script.settings.speed) setSpeed(script.settings.speed);
          if (script.settings.fontSize) setFontSize(script.settings.fontSize);
          if (script.settings.lineHeight) setLineHeight(script.settings.lineHeight);
        }
        return;
      }
    }
    
    // 如果没有找到脚本，使用默认内容
    const defaultScript = getDefaultScriptContent();
    setScriptContent(defaultScript);
    setScriptLines(defaultScript.split("\n"));
  }, [scriptId]);

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
    // 返回编辑器页面，传递脚本ID而不是内容
    router.push(`/editor?id=${scriptId}`);
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

  // 文本对齐处理函数
  const handleTextAlign = (align: 'left' | 'center' | 'right') => {
    setTextAlign(align)
  }

  // 镜像处理函数
  const handleMirror = (direction: 'horizontal' | 'vertical') => {
    setMirror(prev => ({
      ...prev,
      [direction]: !prev[direction]
    }))
  }

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
              <div 
                className="w-full max-w-4xl px-4"
                style={{
                  transform: `${mirror.horizontal ? 'scaleX(-1)' : ''} ${mirror.vertical ? 'scaleY(-1)' : ''}`
                }}
              >
                {scriptLines.map((line, index) => {
                  // Calculate position relative to current line
                  const position = index - currentLine
                  const lineTop = `calc(50% + ${position * fontSize * lineHeight}px - ${(fontSize * lineHeight) / 2}px)`

                  return (
                    <div
                      key={index}
                      className={`absolute left-0 right-0 px-8 transition-all duration-500 ${
                        position === 0 ? "text-white font-bold" : "text-gray-400"
                      }`}
                      style={{
                        top: lineTop,
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeight}`,
                        opacity: Math.abs(position) < 5 ? 1 : 0, // Only show nearby lines
                        textAlign: textAlign
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
        <div className="bg-gray-900/80 p-4 flex justify-center items-center gap-8 z-50">
          {/* Mirror controls group */}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              className={`w-8 h-8 ${mirror.horizontal ? 'bg-gray-700' : 'bg-black'} text-white flex items-center justify-center hover:bg-gray-800`}
              onClick={() => handleMirror('horizontal')}
              title="Horizontal Mirror"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M4 6h16M4 18h16" />
                <path d="M7 9l-3 3 3 3M17 9l3 3-3 3" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className={`w-8 h-8 ${mirror.vertical ? 'bg-gray-700' : 'bg-black'} text-white flex items-center justify-center hover:bg-gray-800`}
              onClick={() => handleMirror('vertical')}
              title="Vertical Mirror"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M6 4v16M18 4v16" />
                <path d="M9 7l3-3 3 3M9 17l3 3 3-3" />
              </svg>
            </Button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700"></div>

          {/* Text alignment controls group */}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              className={`w-8 h-8 ${textAlign === 'left' ? 'bg-gray-700' : 'bg-black'} text-white flex items-center justify-center hover:bg-gray-800`}
              onClick={() => handleTextAlign('left')}
              title="Left Align"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="18" y2="18" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className={`w-8 h-8 ${textAlign === 'center' ? 'bg-gray-700' : 'bg-black'} text-white flex items-center justify-center hover:bg-gray-800`}
              onClick={() => handleTextAlign('center')}
              title="Center Align"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="6" y1="12" x2="18" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className={`w-8 h-8 ${textAlign === 'right' ? 'bg-gray-700' : 'bg-black'} text-white flex items-center justify-center hover:bg-gray-800`}
              onClick={() => handleTextAlign('right')}
              title="Right Align"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="9" y1="12" x2="21" y2="12" />
                <line x1="6" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700"></div>

          {/* Playback controls group */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                onClick={() => adjustSpeed(-0.1)}
                title="Decrease Speed"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="text-xs text-white w-10 text-center">{speed.toFixed(1)}x</div>
              <Button
                variant="ghost"
                className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                onClick={() => adjustSpeed(0.1)}
                title="Increase Speed"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              className={`w-10 h-8 ${isPlaying ? "bg-orange-500 hover:bg-orange-600" : "bg-black hover:bg-gray-800"} text-white flex items-center justify-center`}
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800"
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
              }}
              title="Toggle Fullscreen"
            >
              <Expand className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

