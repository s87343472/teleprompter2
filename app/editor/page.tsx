"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Play, Pause, ChevronUp, ChevronDown, RotateCcw,
  ChevronsUp, ChevronsDown, Settings, Minus, Plus, X
} from "lucide-react"
import Logo from "@/components/Logo"
import Link from "next/link"
import { getScript, getDefaultScriptContent } from "@/lib/scriptStorage"

type TextCase = 'default' | 'capitalize' | 'uppercase' | 'lowercase'
type TextAlign = 'left' | 'center' | 'right'
type FontFamily = 'sans' | 'serif'

function EditorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scriptId = searchParams.get("id") || ""

  const [originalContent, setOriginalContent] = useState("")
  const [scriptLines, setScriptLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(-1)
  const [countdown, setCountdown] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showEnd, setShowEnd] = useState(false)

  const [fontSize, setFontSize] = useState(36)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [textAlign, setTextAlign] = useState<TextAlign>('center')
  const [textCase, setTextCase] = useState<TextCase>('default')
  const [fontFamily, setFontFamily] = useState<FontFamily>('sans')
  const [isBold, setIsBold] = useState(false)
  const [speed, setSpeed] = useState(1.0)

  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [showTextEditor, setShowTextEditor] = useState(false)
  const [textEditorContent, setTextEditorContent] = useState("")
  const [containerWidth, setContainerWidth] = useState(896)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth
      setContainerWidth(width)
      setIsMobile(width < 768)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const displayFontSize = fontSize

  const getTextWidth = (text: string): number => {
    let width = 0
    for (const char of text) {
      if (/[\u4e00-\u9fff\u3400-\u4dbf]/.test(char)) {
        width += 2
      } else {
        width += 1
      }
    }
    return width
  }

  const smartSplitText = useCallback((text: string, customFontSize?: number): string[] => {
    const actualFontSize = isMobile ? Math.min(fontSize, 28) : fontSize
    const currentFontSize = customFontSize || actualFontSize
    const availableWidth = containerWidth - 48
    const charWidthEn = currentFontSize * 0.55
    const charsPerLine = Math.floor(availableWidth / charWidthEn)
    const maxWidthChars = isMobile ? Math.min(charsPerLine, 20) : Math.min(charsPerLine, 40)

    const result: string[] = []
    const paragraphs = text.split(/\n+/)

    paragraphs.forEach(para => {
      const trimmed = para.trim()
      if (!trimmed) return

      if (getTextWidth(trimmed) <= maxWidthChars) {
        result.push(trimmed)
      } else {
        const isChinese = /[\u4e00-\u9fff]/.test(trimmed)

        if (isChinese) {
          let currentLine = ""
          for (const char of trimmed) {
            const testLine = currentLine + char
            if (getTextWidth(testLine) <= maxWidthChars) {
              currentLine = testLine
            } else {
              if (currentLine) result.push(currentLine)
              currentLine = char
            }
          }
          if (currentLine) result.push(currentLine)
        } else {
          const words = trimmed.split(/\s+/)
          let currentLine = ""

          words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word
            if (getTextWidth(testLine) <= maxWidthChars) {
              currentLine = testLine
            } else {
              if (currentLine) result.push(currentLine)
              currentLine = word
            }
          })
          if (currentLine) result.push(currentLine)
        }
      }
    })

    return result
  }, [fontSize, containerWidth, isMobile])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    if (scriptId) {
      const script = getScript(scriptId)
      if (script) {
        setOriginalContent(script.content)
        if (script.settings) {
          if (script.settings.speed) setSpeed(script.settings.speed)
          if (script.settings.fontSize) setFontSize(script.settings.fontSize)
          if (script.settings.lineHeight) setLineHeight(script.settings.lineHeight)
        }
        return
      }
    }
    const defaultScript = getDefaultScriptContent()
    setOriginalContent(defaultScript)
  }, [scriptId])

  useEffect(() => {
    if (originalContent) {
      setScriptLines(smartSplitText(originalContent))
    }
  }, [fontSize, smartSplitText, originalContent, containerWidth])

  const applyTextCase = (text: string): string => {
    switch (textCase) {
      case 'uppercase': return text.toUpperCase()
      case 'lowercase': return text.toLowerCase()
      case 'capitalize': return text.replace(/\b\w/g, c => c.toUpperCase())
      default: return text
    }
  }

  const autoSplitLines = useCallback(() => {
    const newLines = smartSplitText(originalContent)
    const newContent = newLines.join("\n")
    setOriginalContent(newContent)
    setScriptLines(newLines)
  }, [originalContent, smartSplitText])

  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      const newLines = smartSplitText(originalContent)
      setScriptLines(newLines)
      if (currentLine >= newLines.length - 1 || currentLine === -1) {
        setCurrentLine(-1)
        setCountdown(3)
        setShowEnd(false)
      }
      setShowSettings(false)
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, currentLine, originalContent, smartSplitText])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isPlaying) {
      if (currentLine === -1) {
        timer = setTimeout(() => {
          if (countdown > 1) {
            setCountdown(countdown - 1)
          } else {
            setCurrentLine(0)
            setCountdown(3)
            setShowEnd(false)
          }
        }, 1000)
      } else {
        timer = setTimeout(() => {
          if (currentLine < scriptLines.length - 1) {
            setCurrentLine(currentLine + 1)
            setShowEnd(false)
          } else {
            setShowEnd(true)
            setIsPlaying(false)
            setShowSettings(true)
          }
        }, 2000 / speed)
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isPlaying, currentLine, countdown, scriptLines.length, speed])


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInputFocused = target.tagName === 'TEXTAREA' || target.tagName === 'INPUT'

      if (isEditing || isInputFocused) return

      switch (e.key) {
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowUp":
          e.preventDefault()
          if (!isPlaying) setSpeed(prev => Math.min(4.0, +(prev + 0.25).toFixed(2)))
          break
        case "ArrowDown":
          e.preventDefault()
          if (!isPlaying) setSpeed(prev => Math.max(0.25, +(prev - 0.25).toFixed(2)))
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
          if (currentLine >= 0) {
            setCurrentLine(-1)
            setShowEnd(false)
          } else {
            router.push("/")
          }
          break
        case "h":
          e.preventDefault()
          setShowSettings(!showSettings)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isEditing, togglePlay, scriptLines.length, showSettings, router, isPlaying, currentLine])

  const handleLineClick = (index: number) => {
    if (isPlaying) return
    setCurrentLine(index)
    setIsEditing(true)
    setEditContent(scriptLines[index])
  }

  const handleEditComplete = () => {
    if (isEditing) {
      const newLines = [...scriptLines]
      newLines[currentLine] = editContent
      setScriptLines(newLines)
      setOriginalContent(newLines.join("\n"))
      setIsEditing(false)
    }
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleEditComplete()
    } else if (e.key === "Escape") {
      setIsEditing(false)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetToStart = useCallback(() => {
    setCurrentLine(-1)
    setIsPlaying(false)
    setShowEnd(false)
    setCountdown(3)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black text-white flex flex-col">
      {/* Top Bar */}
      <div className={`bg-gray-900 px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center border-b border-gray-800 transition-opacity duration-300 ${isPlaying && !showSettings ? 'opacity-0' : 'opacity-100'}`}>
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="light" size={24} withText={false} className="sm:hidden" />
          <Logo variant="light" size={24} withText={true} className="hidden sm:flex" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={togglePlay}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-6 text-sm sm:text-base"
          >
            {isPlaying ? <Pause className="w-4 h-4 sm:mr-2" /> : <Play className="w-4 h-4 sm:mr-2" />}
            <span className="hidden sm:inline">{isPlaying ? "Pause" : "Start Playback"}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Teleprompter Preview / Editor */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {/* Countdown Display - centered in main area */}
          {currentLine === -1 && isPlaying && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-8xl font-bold text-orange-500 animate-pulse">{countdown}</div>
            </div>
          )}

          {/* Orange Indicator Bar */}
          {currentLine >= 0 && !showEnd && (
            <div
              className="absolute left-0 right-0 bg-orange-500/20 border-t-2 border-b-2 border-orange-500 z-20 pointer-events-none"
              style={{
                height: `${(isMobile ? Math.min(displayFontSize, 28) : displayFontSize) * lineHeight}px`,
                top: "50%",
                transform: "translateY(-50%)"
              }}
            />
          )}

          {/* END Display - click to return to edit mode */}
          {showEnd && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-30 cursor-pointer"
              onClick={() => {
                setCurrentLine(-1)
                setShowEnd(false)
              }}
            >
              <div
                className="text-orange-500 font-bold"
                style={{ fontSize: `${fontSize}px` }}
              >
                END
              </div>
              <div className="text-gray-500 text-sm mt-4">Click to edit</div>
            </div>
          )}

          {/* Edit Mode - Full textarea when not playing and currentLine is -1 */}
          {!isPlaying && currentLine === -1 && !showEnd && (
            <div className={`absolute inset-0 flex flex-col items-center p-4 sm:p-8 ${showSettings ? 'pb-[65vh] md:pb-8' : ''}`}>
              <textarea
                value={originalContent}
                onChange={(e) => {
                  setOriginalContent(e.target.value)
                  setScriptLines(smartSplitText(e.target.value))
                }}
                placeholder="Paste or type your script here..."
                className="w-full max-w-4xl flex-1 bg-transparent text-white resize-none focus:outline-none overflow-y-auto playback-scrollbar text-base sm:text-lg"
                style={{
                  fontSize: `${Math.max(16, fontSize * 0.6)}px`,
                  lineHeight: lineHeight,
                  fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                  fontWeight: isBold ? 'bold' : 'normal',
                  textAlign: textAlign,
                  textTransform: textCase === 'uppercase' ? 'uppercase' : textCase === 'lowercase' ? 'lowercase' : textCase === 'capitalize' ? 'capitalize' : 'none',
                }}
              />
            </div>
          )}

          {/* Playback Mode - Script Lines */}
          {currentLine >= 0 && !showEnd && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${showSettings ? 'pb-[60vh] md:pb-0' : ''}`}
              onClick={() => {
                if (isMobile && isPlaying) {
                  setIsPlaying(false)
                }
              }}
            >
              <div className="w-full max-w-4xl px-4 sm:px-8 relative h-full">
                {scriptLines.map((line, index) => {
                  const position = index - currentLine
                  if (Math.abs(position) > 10) return null
                  const actualFontSize = isMobile ? Math.min(displayFontSize, 28) : displayFontSize
                  const lineHeightPx = actualFontSize * lineHeight
                  const lineTop = `calc(50% + ${position * lineHeightPx}px - ${lineHeightPx / 2}px)`

                  return (
                    <div
                      key={index}
                      onClick={() => !isPlaying && handleLineClick(index)}
                      className={`absolute left-0 right-0 px-2 sm:px-4 transition-all duration-500 flex items-center ${!isPlaying ? 'cursor-pointer hover:bg-gray-800/30' : ''}`}
                      style={{
                        top: lineTop,
                        height: `${lineHeightPx}px`,
                        fontSize: `${actualFontSize}px`,
                        lineHeight: `${lineHeightPx}px`,
                        fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                        fontWeight: isBold ? 'bold' : 'normal',
                        justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
                        color: position === 0 ? '#fff' : '#666',
                        opacity: Math.abs(position) < 5 ? 1 : 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {isEditing && position === 0 ? (
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onBlur={handleEditComplete}
                          onKeyDown={handleEditKeyDown}
                          autoFocus
                          className="w-full bg-transparent border-none outline-none text-white text-center"
                          style={{
                            fontSize: `${displayFontSize}px`,
                            fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                            fontWeight: isBold ? 'bold' : 'normal',
                          }}
                        />
                      ) : (
                        applyTextCase(line) || " "
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts - Show when in edit mode, hidden on mobile */}
          {!isPlaying && currentLine === -1 && !showEnd && (
            <div className={`absolute left-0 right-0 text-center text-gray-500 text-xs sm:text-sm hidden sm:block ${showSettings ? 'bottom-4 md:bottom-8' : 'bottom-4 sm:bottom-8'}`}>
              <div className="inline-flex gap-3 sm:gap-6">
                <span><kbd className="bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Space</kbd> Play</span>
                <span><kbd className="bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">↑/↓</kbd> Speed</span>
                <span><kbd className="bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">H</kbd> Panel</span>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel - Mobile: full screen modal, Desktop: side panel */}
        {showSettings && (
        <>
          {/* Mobile Settings - Full Screen Modal */}
          <div className="md:hidden fixed inset-0 bg-gray-900 z-50 overflow-y-auto">
            <div className="p-4 pb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Display Settings</h3>
                <div className="flex items-center gap-3">
                  <button
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-1"
                    onClick={() => {
                      setFontSize(36); setLineHeight(1.5); setTextAlign('center');
                      setTextCase('default'); setFontFamily('sans'); setIsBold(false); setSpeed(1.0);
                    }}>
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => setShowSettings(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <span className="text-white">Font Size</span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setFontSize(prev => Math.max(20, prev - 2))}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono w-16 text-center">{fontSize}pt</span>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setFontSize(prev => Math.min(72, prev + 2))}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Line Height */}
              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <span className="text-white">Line Height</span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setLineHeight(prev => Math.max(1.0, +(prev - 0.1).toFixed(1)))}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono w-16 text-center">{lineHeight.toFixed(1)}x</span>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setLineHeight(prev => Math.min(3.0, +(prev + 0.1).toFixed(1)))}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text Align */}
              <div className="py-4 border-b border-gray-800">
                <span className="text-gray-400 text-sm mb-3 block">Text Align</span>
                <div className="grid grid-cols-3 gap-2">
                  <button className={`py-3 rounded-lg text-sm ${textAlign === 'left' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextAlign('left')}>Left</button>
                  <button className={`py-3 rounded-lg text-sm ${textAlign === 'center' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextAlign('center')}>Center</button>
                  <button className={`py-3 rounded-lg text-sm ${textAlign === 'right' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextAlign('right')}>Right</button>
                </div>
              </div>

              {/* Text Case */}
              <div className="py-4 border-b border-gray-800">
                <span className="text-gray-400 text-sm mb-3 block">Text Case</span>
                <div className="grid grid-cols-2 gap-2">
                  <button className={`py-3 rounded-lg text-sm ${textCase === 'default' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextCase('default')}>Default</button>
                  <button className={`py-3 rounded-lg text-sm flex items-center justify-center gap-2 ${textCase === 'capitalize' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextCase('capitalize')}>Capitalize <span className="text-xs opacity-60">Aa</span></button>
                  <button className={`py-3 rounded-lg text-sm flex items-center justify-center gap-2 ${textCase === 'uppercase' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextCase('uppercase')}>Upper <span className="text-xs opacity-60">AA</span></button>
                  <button className={`py-3 rounded-lg text-sm flex items-center justify-center gap-2 ${textCase === 'lowercase' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTextCase('lowercase')}>Lower <span className="text-xs opacity-60">aa</span></button>
                </div>
              </div>

              {/* Font Style */}
              <div className="py-4 border-b border-gray-800">
                <span className="text-gray-400 text-sm mb-3 block">Font Style</span>
                <div className="grid grid-cols-3 gap-2">
                  <button className={`py-3 rounded-lg text-sm ${fontFamily === 'sans' && !isBold ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => { setFontFamily('sans'); setIsBold(false); }}>Sans-serif</button>
                  <button className={`py-3 rounded-lg text-sm ${fontFamily === 'serif' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setFontFamily('serif')}>Serif</button>
                  <button className={`py-3 rounded-lg text-sm ${isBold ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setIsBold(!isBold)}>Bold</button>
                </div>
              </div>

              <div className="h-px bg-gray-700 my-4" />

              {/* Speed */}
              <div className="flex items-center justify-between py-3">
                <span className="text-white">Speed</span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setSpeed(prev => Math.max(0.25, +(prev - 0.25).toFixed(2)))}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono w-16 text-center">{speed}x</span>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setSpeed(prev => Math.min(4.0, +(prev + 0.25).toFixed(2)))}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Current Line */}
              <div className="flex items-center justify-between py-3">
                <span className="text-white">Current Line</span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setCurrentLine(prev => Math.max(0, prev - 1))}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-orange-500 font-mono font-bold w-16 text-center">{Math.max(1, currentLine + 1)}</span>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white"
                    onClick={() => setCurrentLine(prev => Math.min(scriptLines.length - 1, prev + 1))}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Line Navigation */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                <button className="py-3 bg-gray-800 rounded-lg text-gray-300 text-sm"
                  onClick={() => setCurrentLine(prev => Math.max(0, prev - 1))}>Prev</button>
                <button className="py-3 bg-gray-800 rounded-lg text-gray-300 text-sm"
                  onClick={() => setCurrentLine(prev => Math.min(scriptLines.length - 1, prev + 1))}>Next</button>
                <button className="py-3 bg-gray-800 rounded-lg text-gray-300 text-sm"
                  onClick={() => { setCurrentLine(0); setShowEnd(false); }}>First</button>
                <button className="py-3 bg-gray-800 rounded-lg text-gray-300 text-sm"
                  onClick={() => setCurrentLine(scriptLines.length - 1)}>Last</button>
              </div>

              {/* Back to Edit */}
              {!isPlaying && currentLine >= 0 && (
                <button
                  className="w-full mt-6 py-4 bg-gray-800 rounded-lg text-gray-300 text-sm flex items-center justify-center gap-2"
                  onClick={() => {
                    setCurrentLine(-1)
                    setShowEnd(false)
                    setShowSettings(false)
                  }}
                >
                  <RotateCcw className="w-4 h-4" /> Back to Edit
                </button>
              )}
            </div>
          </div>

          {/* Desktop Settings - Side Panel */}
          <div className="hidden md:block w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs"
                  onClick={() => {
                    setFontSize(36); setLineHeight(1.5); setTextAlign('center');
                    setTextCase('default'); setFontFamily('sans'); setIsBold(false); setSpeed(1.0);
                  }}>
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </Button>
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Font Size</label>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(prev => Math.max(20, prev - 2))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-mono">{fontSize}pt</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(prev => Math.min(72, prev + 2))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Line Height */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Line Height</label>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setLineHeight(prev => Math.max(1.0, +(prev - 0.1).toFixed(1)))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-mono">{lineHeight.toFixed(1)}x</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setLineHeight(prev => Math.min(3.0, +(prev + 0.1).toFixed(1)))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Text Align */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Text Align</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'center', 'right'] as TextAlign[]).map(align => (
                    <Button key={align} variant={textAlign === align ? "default" : "outline"}
                      className={`text-xs py-2 ${textAlign === align ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                      onClick={() => setTextAlign(align)}>
                      {align === 'left' ? 'Left' : align === 'center' ? 'Center' : 'Right'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Text Case */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Text Case</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'default', label: 'Default' },
                    { value: 'capitalize', label: 'Capitalize Aa' },
                    { value: 'uppercase', label: 'Upper AA' },
                    { value: 'lowercase', label: 'Lower aa' },
                  ].map(item => (
                    <Button key={item.value} variant={textCase === item.value ? "default" : "outline"}
                      className={`text-xs py-2 ${textCase === item.value ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                      onClick={() => setTextCase(item.value as TextCase)}>
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Font Style */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Font Style</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={fontFamily === 'sans' ? "default" : "outline"}
                    className={`text-xs py-2 ${fontFamily === 'sans' ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                    onClick={() => setFontFamily('sans')}>Sans-serif</Button>
                  <Button variant={fontFamily === 'serif' ? "default" : "outline"}
                    className={`text-xs py-2 ${fontFamily === 'serif' ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                    onClick={() => setFontFamily('serif')}>Serif</Button>
                  <Button variant={isBold ? "default" : "outline"}
                    className={`text-xs py-2 ${isBold ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                    onClick={() => setIsBold(!isBold)}>Bold</Button>
                </div>
              </div>

              {/* Speed */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Speed</label>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSpeed(prev => Math.max(0.25, +(prev - 0.25).toFixed(2)))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-mono">{speed}x</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSpeed(prev => Math.min(4.0, +(prev + 0.25).toFixed(2)))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Current Line */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Current Line</label>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentLine(prev => Math.max(0, prev - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-orange-500 font-mono font-bold">{Math.max(1, currentLine + 1)}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentLine(prev => Math.min(scriptLines.length - 1, prev + 1))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Line Navigation */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-xs"
                    onClick={() => setCurrentLine(prev => Math.max(0, prev - 1))}>
                    <ChevronUp className="w-4 h-4 mr-1" /> Prev
                  </Button>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-xs"
                    onClick={() => setCurrentLine(prev => Math.min(scriptLines.length - 1, prev + 1))}>
                    <ChevronDown className="w-4 h-4 mr-1" /> Next
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-xs"
                    onClick={() => { setCurrentLine(0); setShowEnd(false); }}>
                    <ChevronsUp className="w-4 h-4 mr-1" /> First
                  </Button>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-xs"
                    onClick={() => setCurrentLine(scriptLines.length - 1)}>
                    <ChevronsDown className="w-4 h-4 mr-1" /> Last
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              {!isPlaying && (
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 mb-4"
                  onClick={autoSplitLines}
                >
                  <Play className="w-4 h-4 mr-2" /> Auto Split
                </Button>
              )}

              {!isPlaying && currentLine >= 0 && (
                <Button
                  variant="outline"
                  className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white py-4 text-sm"
                  onClick={() => {
                    setCurrentLine(-1)
                    setShowEnd(false)
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Back to Edit
                </Button>
              )}
            </div>
          </div>
        </>
        )}

        {/* Mobile Bottom Quick Controls - Show when not playing (tap screen to pause and show controls) */}
        {!isPlaying && !showSettings && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 z-30">
            <div className="flex items-center justify-center gap-6">
              {/* Settings button */}
              <button
                onClick={() => setShowSettings(true)}
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Play button */}
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white"
              >
                <Play className="w-7 h-7 ml-1" />
              </button>

              {/* Speed control */}
              <div className="flex items-center gap-1 bg-gray-800 rounded-full px-3 py-2">
                <button
                  onClick={() => setSpeed(prev => Math.max(0.25, +(prev - 0.25).toFixed(2)))}
                  className="p-1 text-gray-400"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono w-8 text-center text-white">{speed}x</span>
                <button
                  onClick={() => setSpeed(prev => Math.min(4.0, +(prev + 0.25).toFixed(2)))}
                  className="p-1 text-gray-400"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Editor Modal */}
      {showTextEditor && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8">
          <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-lg font-medium">Edit Script</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTextEditor(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <textarea
                value={textEditorContent}
                onChange={(e) => setTextEditorContent(e.target.value)}
                placeholder="Paste or type your script here..."
                className="w-full h-full bg-gray-800 text-white p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ minHeight: '400px' }}
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-4 p-4 border-t border-gray-800">
              <Button
                variant="outline"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => setShowTextEditor(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setOriginalContent(textEditorContent)
                  setScriptLines(textEditorContent.split("\n").filter(line => line.trim()))
                  setCurrentLine(0)
                  setShowEnd(false)
                  setShowTextEditor(false)
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading...</div>}>
      <EditorContent />
    </Suspense>
  )
}
