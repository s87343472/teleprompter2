"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Expand, Minus, Play, Plus, Save, SkipBack, SkipForward, Upload, ChevronUp, ChevronDown } from "lucide-react"
import Logo from "@/components/Logo"

export default function EditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Basic state
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const [fontSize, setFontSize] = useState(36)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [currentLine, setCurrentLine] = useState(0)
  const [activeTab, setActiveTab] = useState("EDIT")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Refs for elements
  const fullscreenRef = useRef<HTMLDivElement>(null)

  // Check for saved script content in URL
  const keepScript = searchParams.get("keepScript")
  
  // Script content
  const [scriptContent, setScriptContent] = useState(
    "Welcome to Teleprompter.today professional system.\n\nThis is your script content, each line will be clearly displayed during playback.\n\nThe system automatically tracks the current reading line and provides highlighting.\n\nYou can easily adjust scrolling speed, font size, and display effects.\n\nStart using it now to create a more professional presentation experience!",
  )

  // Load saved script if available
  useEffect(() => {
    if (keepScript) {
      try {
        const decoded = decodeURIComponent(keepScript)
        setScriptContent(decoded)
      } catch (e) {
        console.error("Failed to decode saved script:", e)
      }
    }
  }, [keepScript])
  
  // Calculate script lines
  const scriptLines = scriptContent.split("\n")

  // Adjust speed
  const adjustSpeed = (amount: number) => {
    setSpeed((prev) => {
      const newSpeed = Number.parseFloat((prev + amount).toFixed(1))
      return Math.max(0.1, Math.min(10.0, newSpeed))
    })
  }

  // Adjust font size
  const adjustFontSize = (amount: number) => {
    setFontSize((prev) => Math.max(20, Math.min(64, prev + amount)))
  }

  // Adjust line height
  const adjustLineHeight = (amount: number) => {
    setLineHeight((prev) => Math.max(1.0, Math.min(2.5, Number.parseFloat((prev + amount).toFixed(1)))))
  }

  // Reset to start
  const resetToStart = () => {
    setCurrentLine(0)
    setIsPlaying(false)
  }

  // Start dedicated playback
  const startDedicatedPlayback = () => {
    // Encode script content for URL
    const encodedScript = encodeURIComponent(scriptContent)
    router.push(`/playback?script=${encodedScript}&speed=${speed}&fontSize=${fontSize}`)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = fullscreenRef.current;
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).msRequestFullscreen) {
          (elem as any).msRequestFullscreen();
        }
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement || 
        !!((document as any).webkitFullscreenElement) || 
        !!((document as any).msFullscreenElement)
      )
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Render the teleprompter display
  const renderTeleprompter = () => {
    return (
      <div className="flex-1 bg-black text-white flex flex-col" ref={fullscreenRef}>
        {/* Status bar */}
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <span>PREVIEW</span>
          </div>
          <div className="flex space-x-4">
            <span>SPEED: {speed.toFixed(1)}x</span>
            <span>SIZE: {fontSize}px</span>
            <span>LINES: {scriptLines.length}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-gray-400 hover:text-white"
              onClick={toggleFullscreen}
            >
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Text display area with improved alignment */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 flex">
            {/* Left side line numbers and tracking indicator */}
            <div className="w-10 bg-gray-900 flex flex-col">
              {scriptLines.map((_, index) => (
                <div
                  key={index}
                  className={`w-full flex items-center justify-center ${
                    currentLine === index ? "text-orange-500" : "text-gray-600"
                  }`}
                  style={{
                    height: `${fontSize * lineHeight}px`,
                    transition: "color 0.2s ease",
                  }}
                >
                  {currentLine === index && (
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-1 animate-pulse"></div>
                  )}
                  <span className="text-xs font-mono">{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Text area with improved alignment */}
            <div className="flex-1 overflow-hidden">
              <div
                className="transition-transform duration-500 ease-out px-8"
                style={{
                  transform: `translateY(calc(50vh - ${(fontSize * lineHeight) / 2}px - ${currentLine * fontSize * lineHeight}px))`,
                }}
              >
                {scriptLines.map((line, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap transition-colors duration-300 ${
                      currentLine === index ? "bg-gray-800 text-white font-bold" : "text-gray-400"
                    }`}
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}`,
                      minHeight: `${fontSize * lineHeight}px`,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {line || " "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Minimal controls for fullscreen mode */}
        {isFullscreen && (
          <div className="bg-gray-900 p-2 flex justify-center space-x-4">
            <Button
              variant="ghost"
              className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
              onClick={() => adjustSpeed(-0.1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
              onClick={resetToStart}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className="w-12 h-10 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center"
              onClick={startDedicatedPlayback}
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
              onClick={() => adjustSpeed(0.1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  // If in fullscreen mode, only show the teleprompter
  if (isFullscreen) {
    return renderTeleprompter()
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Top control bar */}
      <div className="w-full bg-gray-300 flex items-center justify-between px-4 py-2 border-b border-gray-400">
        <div className="flex space-x-2 items-center">
          <Link href="/" className="mr-4">
            <Logo variant="default" size={24} withText={false} />
          </Link>
          <div className="bg-white px-3 py-1 text-xs font-mono">OUTPUT</div>
          <div className="bg-orange-500 px-3 py-1 text-xs font-mono text-white">INPUT</div>
          <div className="bg-black px-3 py-1 text-xs font-mono text-white">SYNC</div>
        </div>
        <div className="flex space-x-2">
          <div className="bg-gray-500 px-3 py-1 text-xs font-mono text-white">SETTINGS</div>
          <Link href="/">
            <div className="bg-gray-800 px-3 py-1 text-xs font-mono text-white cursor-pointer">EXIT</div>
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side editor panel */}
        <div className="flex-1 overflow-hidden bg-white flex flex-col min-w-0">
          {/* Script editor header */}
          <div className="bg-gray-200 px-4 py-2 flex justify-between items-center text-xs font-mono">
            <div>SCRIPT EDITOR</div>
            <div>LINES: {scriptLines.length} | EST. TIME: {Math.round(scriptLines.length * 2.5)}s</div>
          </div>

          {/* Text area */}
          <textarea
            className="flex-1 p-4 focus:outline-none resize-none font-sans text-gray-900"
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            placeholder="Enter your script here..."
            style={{ fontSize: "16px", lineHeight: "1.6" }}
          />

          {/* Format bar */}
          <div className="bg-gray-200 px-4 py-2 flex justify-between items-center">
            <div className="font-mono text-xs">FORMAT</div>
            <div className="flex space-x-2">
              <Button variant="ghost" className="bg-black text-white text-xs" onClick={() => setScriptContent("")}>
                CLEAR
              </Button>
              <Button
                variant="ghost"
                className="bg-black text-white text-xs flex items-center"
                onClick={() => {
                  // Implement import logic
                }}
              >
                <Upload className="w-3 h-3 mr-1" />
                IMPORT
              </Button>
              <Button
                variant="ghost"
                className="bg-black text-white text-xs flex items-center"
                onClick={() => {
                  // Implement save logic
                }}
              >
                <Save className="w-3 h-3 mr-1" />
                SAVE
              </Button>
            </div>
          </div>
        </div>

        {/* Right side teleprompter preview panel */}
        {renderTeleprompter()}
      </div>

      {/* Bottom control panel */}
      <div className="bg-gray-300 border-t border-gray-400">
        {/* Control tabs */}
        <div className="flex border-b border-gray-400">
          {["EDIT", "CONTROLS", "FONT"].map((tab) => (
            <div
              key={tab}
              className={`px-4 py-2 font-mono text-sm cursor-pointer ${activeTab === tab ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Control panel content - different controls based on active tab */}
        <div className="p-4">
          {activeTab === "CONTROLS" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Speed control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">SPEED</div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => adjustSpeed(-0.1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{speed.toFixed(1)}</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => adjustSpeed(0.1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">Range: 0.1x - 10.0x</div>
                <div className="flex justify-center mt-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
              </div>

              {/* Combined Navigation & Display control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">PLAYBACK</div>
                <div className="flex flex-col space-y-4">
                  <Button
                    variant="ghost"
                    className="bg-orange-500 text-white p-2 text-xs font-mono hover:bg-orange-600 flex items-center justify-center"
                    onClick={startDedicatedPlayback}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    START PLAYBACK
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-black text-white p-2 text-xs font-mono hover:bg-gray-800 flex items-center justify-center"
                    onClick={toggleFullscreen}
                  >
                    <Expand className="w-4 h-4 mr-2" />
                    FULLSCREEN
                  </Button>
                  <div className="flex justify-center mt-2 space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>

              {/* Line indicator control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">CURRENT LINE</div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => setCurrentLine(Math.max(currentLine - 1, 0))}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{currentLine + 1}</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => setCurrentLine(Math.min(currentLine + 1, scriptLines.length - 1))}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "FONT" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Font size control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">FONT SIZE</div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => adjustFontSize(-2)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{fontSize}px</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => adjustFontSize(2)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Line height control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">LINE HEIGHT</div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => adjustLineHeight(-0.1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{lineHeight.toFixed(1)}</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                    onClick={() => adjustLineHeight(0.1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Font style control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">FONT STYLE</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" className="bg-black text-white p-2 text-xs font-mono hover:bg-gray-800">
                    NORMAL
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    BOLD
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    SANS
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    SERIF
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "EDIT" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Text tools */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">TEXT TOOLS</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" className="bg-black text-white p-2 text-xs font-mono hover:bg-gray-800">
                    UPPERCASE
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    LOWERCASE
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    CLEAR ALL
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    ADD MARKER
                  </Button>
                </div>
              </div>

              {/* Import/export */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">IMPORT/EXPORT</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" className="bg-black text-white p-2 text-xs font-mono hover:bg-gray-800">
                    <Upload className="w-3 h-3 mr-1" />
                    IMPORT
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    EXPORT
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    <Save className="w-3 h-3 mr-1" />
                    SAVE
                  </Button>
                  <Button variant="ghost" className="bg-gray-700 text-white p-2 text-xs font-mono hover:bg-gray-600">
                    TEMPLATES
                  </Button>
                </div>
              </div>

              {/* Estimated time */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">ESTIMATED TIME</div>
                <div className="p-2">
                  <div className="bg-black text-white p-3 font-mono text-xl text-center">
                    {Math.ceil((scriptLines.length * 2) / speed)}s
                  </div>
                  <div className="text-center mt-2 text-xs text-gray-600">At {speed.toFixed(1)}x speed</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="bg-gray-400 py-2 px-4 border-t border-gray-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div>V 1.0.3</div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              CONNECTED
            </div>
          </div>
          <div className="text-xs font-mono">{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}

