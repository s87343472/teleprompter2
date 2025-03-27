"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Expand, Minus, Play, Plus, Save, SkipBack, SkipForward, Upload, ChevronUp, ChevronDown, Download, Trash } from "lucide-react"
import Logo from "@/components/Logo"

function EditorContent() {
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
  const [content, setContent] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fontStyle, setFontStyle] = useState({
    weight: 'normal',  // 'normal' 或 'bold'
    family: 'sans'     // 'sans' 或 'serif'
  })
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left')
  const [mirror, setMirror] = useState({
    horizontal: false,
    vertical: false
  })

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

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB')
      return
    }

    // Check file type
    const allowedTypes = ['text/markdown', 'text/plain', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      alert('Only .md, .txt, and .doc files are supported')
      return
    }

    try {
      const text = await file.text()
      setScriptContent(text)
      setCurrentLine(0) // Reset current line when importing new content
    } catch (error) {
      alert('Error reading file. Please try again.')
    }
  }

  const handleSave = () => {
    const blob = new Blob([scriptContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'teleprompter-script.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all content?')) {
      setScriptContent('')
      setCurrentLine(0)
    }
  }

  // 文本工具函数
  const handleUpperCase = () => {
    setScriptContent(scriptContent.toUpperCase())
  }

  const handleLowerCase = () => {
    setScriptContent(scriptContent.toLowerCase())
  }

  const handleAddMarker = () => {
    const marker = "\n[MARKER]\n"
    const cursorPosition = (document.activeElement as HTMLTextAreaElement)?.selectionStart
    if (typeof cursorPosition === 'number') {
      const newContent = scriptContent.slice(0, cursorPosition) + marker + scriptContent.slice(cursorPosition)
      setScriptContent(newContent)
    } else {
      setScriptContent(scriptContent + marker)
    }
  }

  const handleExport = () => {
    // 创建导出内容，包含基本格式信息
    const exportData = {
      content: scriptContent,
      settings: {
        fontSize,
        lineHeight,
        speed
      },
      metadata: {
        exportDate: new Date().toISOString(),
        lineCount: scriptLines.length,
        estimatedTime: Math.ceil((scriptLines.length * 2) / speed)
      }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'teleprompter-export.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 字体样式处理函数
  const handleFontStyleChange = (style: 'normal' | 'bold' | 'sans' | 'serif') => {
    if (style === 'normal' || style === 'bold') {
      setFontStyle(prev => ({ ...prev, weight: style }))
    } else {
      setFontStyle(prev => ({ ...prev, family: style }))
    }
  }

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
                  transform: `
                    translateY(calc(50vh - ${(fontSize * lineHeight) / 2}px - ${currentLine * fontSize * lineHeight}px))
                    ${mirror.horizontal ? 'scaleX(-1)' : ''}
                    ${mirror.vertical ? 'scaleY(-1)' : ''}
                  `,
                }}
              >
                {scriptLines.map((line, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap transition-colors duration-300 ${
                      currentLine === index ? "bg-gray-800 text-white" : "text-gray-400"
                    } ${fontStyle.family === 'serif' ? 'font-serif' : 'font-sans'}`}
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}`,
                      minHeight: `${fontSize * lineHeight}px`,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: fontStyle.weight,
                      justifyContent: textAlign === 'left' ? 'flex-start' : 
                                    textAlign === 'right' ? 'flex-end' : 'center',
                      width: '100%'
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
          <div className="bg-gray-900 p-2 flex justify-between items-center">
            <div className="flex space-x-2">
              {/* Text alignment controls */}
              <Button
                variant="ghost"
                className={`w-8 h-8 ${textAlign === 'left' ? 'bg-gray-700' : 'bg-gray-900'} text-white flex items-center justify-center hover:text-orange-500`}
                onClick={() => handleTextAlign('left')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="18" y2="18" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                className={`w-8 h-8 ${textAlign === 'center' ? 'bg-gray-700' : 'bg-gray-900'} text-white flex items-center justify-center hover:text-orange-500`}
                onClick={() => handleTextAlign('center')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                className={`w-8 h-8 ${textAlign === 'right' ? 'bg-gray-700' : 'bg-gray-900'} text-white flex items-center justify-center hover:text-orange-500`}
                onClick={() => handleTextAlign('right')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="9" y1="12" x2="21" y2="12" />
                  <line x1="6" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                onClick={() => adjustSpeed(-0.1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
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
                className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                onClick={() => adjustSpeed(0.1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex space-x-2">
              {/* Mirror controls */}
              <Button
                variant="ghost"
                className={`w-8 h-8 ${mirror.horizontal ? 'bg-gray-700' : 'bg-gray-900'} text-white flex items-center justify-center hover:text-orange-500`}
                onClick={() => handleMirror('horizontal')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M4 6h16M4 18h16" />
                  <path d="M7 9l-3 3 3 3M17 9l3 3-3 3" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                className={`w-8 h-8 ${mirror.vertical ? 'bg-gray-700' : 'bg-gray-900'} text-white flex items-center justify-center hover:text-orange-500`}
                onClick={() => handleMirror('vertical')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M6 4v16M18 4v16" />
                  <path d="M9 7l3-3 3 3M9 17l3 3 3-3" />
                </svg>
              </Button>
            </div>
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
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="bg-white px-3 py-1 text-xs font-mono opacity-50">OUTPUT</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="bg-orange-500 px-3 py-1 text-xs font-mono text-white">INPUT</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="bg-black px-3 py-1 text-xs font-mono text-white opacity-50">SYNC</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="bg-gray-500 px-3 py-1 text-xs font-mono text-white cursor-not-allowed opacity-50">SETTINGS</div>
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

          {/* Format bar - 移除重复按钮 */}
          <div className="bg-gray-200 px-4 py-2 flex justify-between items-center">
            <div className="font-mono text-xs">FORMAT</div>
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
                    className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                    onClick={() => adjustSpeed(-0.1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{speed.toFixed(1)}</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
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
                    className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                    onClick={() => setCurrentLine(Math.max(currentLine - 1, 0))}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{currentLine + 1}</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Font size control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">FONT SIZE</div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                    onClick={() => adjustFontSize(-2)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="font-mono text-xl">{fontSize}px</div>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                    onClick={() => adjustFontSize(2)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">Range: 20px - 64px</div>
                <div className="flex justify-center mt-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
              </div>

              {/* Font style control */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">FONT STYLE</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="ghost" 
                    className={`${
                      fontStyle.weight === 'normal' ? 'bg-gray-900' : 'bg-gray-700'
                    } text-white p-2 text-xs font-mono hover:text-orange-500`}
                    onClick={() => handleFontStyleChange('normal')}
                  >
                    NORMAL
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`${
                      fontStyle.weight === 'bold' ? 'bg-gray-900' : 'bg-gray-700'
                    } text-white p-2 text-xs font-mono hover:text-orange-500`}
                    onClick={() => handleFontStyleChange('bold')}
                  >
                    BOLD
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`${
                      fontStyle.family === 'sans' ? 'bg-gray-900' : 'bg-gray-700'
                    } text-white p-2 text-xs font-mono hover:text-orange-500`}
                    onClick={() => handleFontStyleChange('sans')}
                  >
                    SANS
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`${
                      fontStyle.family === 'serif' ? 'bg-gray-900' : 'bg-gray-700'
                    } text-white p-2 text-xs font-mono hover:text-orange-500`}
                    onClick={() => handleFontStyleChange('serif')}
                  >
                    SERIF
                  </Button>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
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
                  <Button 
                    variant="ghost" 
                    className="bg-gray-900 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={handleUpperCase}
                  >
                    UPPERCASE
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-gray-700 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={handleLowerCase}
                  >
                    LOWERCASE
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-gray-700 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={handleClear}
                  >
                    CLEAR ALL
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-gray-700 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={handleAddMarker}
                  >
                    ADD MARKER
                  </Button>
                </div>
              </div>

              {/* Import/export */}
              <div className="bg-gray-200 p-4 rounded shadow">
                <div className="text-center font-mono text-sm mb-2">IMPORT/EXPORT</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="ghost" 
                    className="bg-gray-900 text-white p-2 text-xs font-mono hover:text-orange-500 flex items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    IMPORT
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-gray-700 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={handleExport}
                  >
                    EXPORT
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-gray-700 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={handleSave}
                  >
                    <Save className="w-3 h-3 mr-1" />
                    SAVE
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-gray-700 text-white p-2 text-xs font-mono hover:text-orange-500"
                    onClick={() => alert('Templates feature coming soon!')}
                  >
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

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorContent />
    </Suspense>
  )
}

