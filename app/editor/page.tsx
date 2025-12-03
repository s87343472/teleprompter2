"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Expand, Minus, Play, Plus, Save, SkipBack, SkipForward, Upload, ChevronUp, ChevronDown, Download, Trash, FileText, Settings } from "lucide-react"
import Logo from "@/components/Logo"
import { saveScript, getScript, getCurrentScript, getDefaultScriptContent } from "@/lib/scriptStorage"

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
  const [scriptId, setScriptId] = useState<string | null>(null)

  // Refs for elements
  const fullscreenRef = useRef<HTMLDivElement>(null)

  // Check for script ID in URL
  const scriptIdParam = searchParams.get("id")
  
  // Script content
  const [scriptContent, setScriptContent] = useState(getDefaultScriptContent())

  // Load script content on mount
  useEffect(() => {
    // 首先检查URL中是否指定了脚本ID
    if (scriptIdParam) {
      const script = getScript(scriptIdParam);
      if (script) {
        setScriptContent(script.content);
        setScriptId(script.id);
        
        // 如果脚本有保存的设置，应用它们
        if (script.settings) {
          if (script.settings.speed) setSpeed(script.settings.speed);
          if (script.settings.fontSize) setFontSize(script.settings.fontSize);
          if (script.settings.lineHeight) setLineHeight(script.settings.lineHeight);
        }
        return;
      }
    }
    
    // 如果没有指定ID或ID无效，尝试加载当前脚本
    const currentScriptId = getCurrentScript();
    if (currentScriptId) {
      const script = getScript(currentScriptId);
      if (script) {
        setScriptContent(script.content);
        setScriptId(script.id);
        
        // 应用保存的设置
        if (script.settings) {
          if (script.settings.speed) setSpeed(script.settings.speed);
          if (script.settings.fontSize) setFontSize(script.settings.fontSize);
          if (script.settings.lineHeight) setLineHeight(script.settings.lineHeight);
        }
        return;
      }
    }
    
    // 如果没有当前脚本，使用默认内容
    setScriptContent(getDefaultScriptContent());
  }, [scriptIdParam]);
  
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
    // 保存当前脚本和设置
    const settings = {
      speed,
      fontSize,
      lineHeight
    };
    
    // 保存脚本到localStorage
    const id = saveScript(scriptContent, "未命名脚本", scriptId || undefined, settings);
    
    // 跳转到播放页面，只传递ID
    router.push(`/playback?id=${id}`);
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

  // 自动保存脚本内容
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (scriptContent.trim() !== '') {
        const settings = {
          speed,
          fontSize,
          lineHeight
        };
        const id = saveScript(scriptContent, "未命名脚本", scriptId || undefined, settings);
        if (!scriptId) {
          setScriptId(id);
        }
      }
    }, 30000); // 每30秒自动保存一次
    
    return () => clearInterval(autoSaveInterval);
  }, [scriptContent, scriptId, speed, fontSize, lineHeight]);

  // 手动保存脚本
  const handleManualSave = () => {
    if (scriptContent.trim() !== '') {
      const settings = {
        speed,
        fontSize,
        lineHeight
      };
      const id = saveScript(scriptContent, "未命名脚本", scriptId || undefined, settings);
      setScriptId(id);
      
      // 提示用户保存成功
      alert('脚本已保存！');
    }
  };

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
      <div className="flex-[0_0_70%] bg-black text-white flex flex-col" ref={fullscreenRef}>
        {/* Preview header - Minimal */}
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center text-xs">
          <span className="text-gray-400">Preview</span>
          <div className="flex items-center gap-3 text-gray-400">
            <span>{scriptLines.length} lines</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:text-white"
              onClick={toggleFullscreen}
            >
              <Expand className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Text display area with improved alignment */}
        <div className="flex-1 overflow-hidden relative">
          {/* Floating speed control - top right */}
          {!isFullscreen && (
            <div className="absolute top-4 right-4 z-20">
              {/* Speed control */}
              <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-3 border border-gray-700 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:text-orange-500 hover:bg-gray-800"
                  onClick={() => adjustSpeed(-0.1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-white font-mono text-sm min-w-[50px] text-center">{speed.toFixed(1)}×</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:text-orange-500 hover:bg-gray-800"
                  onClick={() => adjustSpeed(0.1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Keyboard shortcuts hint */}
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-300 border border-gray-700/50">
                <div className="font-medium mb-1 text-gray-200">Shortcuts</div>
                <div className="space-y-0.5">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Space</span>
                    <span>Play/Pause</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">↑/↓</span>
                    <span>Speed</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">F11</span>
                    <span>Fullscreen</span>
                  </div>
                </div>
              </div>
            </div>
          )}

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
      {/* Top control bar - Simplified */}
      <div className="w-full bg-white flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo variant="default" size={28} withText={false} />
          </Link>
          {scriptId && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FileText className="w-3 h-3" />
              <span>ID: {scriptId.substring(0, 8)}</span>
            </div>
          )}
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            Exit
          </Button>
        </Link>
      </div>

      {/* Main content area - 30/70 split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side editor panel - 30% */}
        <div className="w-[30%] overflow-hidden bg-white flex flex-col border-r border-gray-200">
          {/* Script editor header */}
          <div className="bg-gray-50 px-4 py-2 flex justify-between items-center text-xs border-b border-gray-200">
            <div className="font-medium text-gray-700">Script Editor</div>
            <div className="text-gray-500">{scriptLines.length} lines · ~{Math.round(scriptLines.length * 2.5)}s</div>
          </div>

          {/* Text area */}
          <textarea
            className="flex-1 p-4 focus:outline-none resize-none font-sans text-gray-900"
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            placeholder="Enter your script here..."
            style={{ fontSize: "16px", lineHeight: "1.6" }}
          />

        </div>

        {/* Right side teleprompter preview panel */}
        {renderTeleprompter()}
      </div>

      {/* Bottom control panel - Simplified single row */}
      <div className="bg-gray-200 border-t border-gray-300">
        {/* Main controls - always visible */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-8 max-w-6xl mx-auto">
            {/* Left: Primary controls */}
            <div className="flex items-center gap-6">
              {/* Font Size */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-600">FONT</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-gray-100"
                  onClick={() => adjustFontSize(-2)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-mono text-sm min-w-[45px] text-center">{fontSize}px</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-gray-100"
                  onClick={() => adjustFontSize(2)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Import/Export */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 bg-white hover:bg-gray-100 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Import
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 bg-white hover:bg-gray-100 text-xs"
                  onClick={handleSave}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            {/* Center: Main action button */}
            <Button
              className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-mono"
              onClick={startDedicatedPlayback}
            >
              <Play className="h-4 w-4 mr-2" />
              START PLAYBACK
            </Button>

            {/* Right: Secondary controls */}
            <div className="flex items-center gap-6">
              {/* Quick actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 bg-white hover:bg-gray-100 text-xs"
                  onClick={toggleFullscreen}
                >
                  <Expand className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 bg-green-600 hover:bg-green-700 text-white text-xs"
                  onClick={handleManualSave}
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </Button>
              </div>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Advanced settings toggle */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 text-xs ${activeTab !== 'EDIT' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
                onClick={() => setActiveTab(activeTab === 'EDIT' ? 'ADVANCED' : 'EDIT')}
              >
                <Settings className="h-3 w-3 mr-1" />
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced panel - collapsible */}
        {activeTab === "ADVANCED" && (
          <div className="px-6 pb-4 border-t border-gray-300 bg-gray-100">
            <div className="py-4 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Line Height */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">LINE HEIGHT</div>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => adjustLineHeight(-0.1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-mono text-sm">{lineHeight.toFixed(1)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => adjustLineHeight(0.1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Font Style */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">FONT STYLE</div>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      variant={fontStyle.weight === 'normal' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleFontStyleChange('normal')}
                    >
                      Normal
                    </Button>
                    <Button
                      variant={fontStyle.weight === 'bold' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleFontStyleChange('bold')}
                    >
                      Bold
                    </Button>
                  </div>
                </div>

                {/* Font Family */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">FONT FAMILY</div>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      variant={fontStyle.family === 'sans' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleFontStyleChange('sans')}
                    >
                      Sans
                    </Button>
                    <Button
                      variant={fontStyle.family === 'serif' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleFontStyleChange('serif')}
                    >
                      Serif
                    </Button>
                  </div>
                </div>

                {/* Text Alignment */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">ALIGNMENT</div>
                  <div className="grid grid-cols-3 gap-1">
                    <Button
                      variant={textAlign === 'left' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 w-full p-0"
                      onClick={() => handleTextAlign('left')}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="15" y2="12" />
                        <line x1="3" y1="18" x2="18" y2="18" />
                      </svg>
                    </Button>
                    <Button
                      variant={textAlign === 'center' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 w-full p-0"
                      onClick={() => handleTextAlign('center')}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="6" y1="12" x2="18" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                      </svg>
                    </Button>
                    <Button
                      variant={textAlign === 'right' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 w-full p-0"
                      onClick={() => handleTextAlign('right')}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="9" y1="12" x2="21" y2="12" />
                        <line x1="6" y1="18" x2="21" y2="18" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Text Tools */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">TEXT TOOLS</div>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={handleUpperCase}
                    >
                      UPPER
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={handleLowerCase}
                    >
                      lower
                    </Button>
                  </div>
                </div>

                {/* Mirror Controls */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">MIRROR</div>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      variant={mirror.horizontal ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleMirror('horizontal')}
                    >
                      H-Flip
                    </Button>
                    <Button
                      variant={mirror.vertical ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleMirror('vertical')}
                    >
                      V-Flip
                    </Button>
                  </div>
                </div>

                {/* Utilities */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">UTILITIES</div>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={handleAddMarker}
                    >
                      Marker
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs text-red-600 hover:text-red-700"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Export JSON */}
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 mb-2">ADVANCED</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs w-full"
                    onClick={handleExport}
                  >
                    Export JSON
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.doc,.docx"
        className="hidden"
        onChange={handleImport}
      />

      {/* Bottom status bar - simplified */}
      <div className="bg-gray-50 py-1.5 px-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div>v1.0.5</div>
          <div>{new Date().toLocaleDateString()}</div>
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
