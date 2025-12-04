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
  const [showSettings, setShowSettings] = useState(true)
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
    const currentFontSize = customFontSize || fontSize
    const containerWidth = 896 - 64
    const charWidth = currentFontSize * 0.55
    const charsPerLine = Math.floor(containerWidth / charWidth)
    const maxWidth = Math.max(10, Math.min(charsPerLine, 40))

    const result: string[] = []
    const paragraphs = text.split(/\n+/)

    paragraphs.forEach(para => {
      const trimmed = para.trim()
      if (!trimmed) return

      if (getTextWidth(trimmed) <= maxWidth) {
        result.push(trimmed)
      } else {
        const isChinese = /[\u4e00-\u9fff]/.test(trimmed)

        if (isChinese) {
          let currentLine = ""
          for (const char of trimmed) {
            const testLine = currentLine + char
            if (getTextWidth(testLine) <= maxWidth) {
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
            if (getTextWidth(testLine) <= maxWidth) {
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
  }, [fontSize])

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
  }, [fontSize, smartSplitText, originalContent])

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
      <div className={`bg-gray-900 px-6 py-3 flex justify-between items-center border-b border-gray-800 transition-opacity duration-300 ${isPlaying && !showSettings ? 'opacity-0' : 'opacity-100'}`}>
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="light" size={24} withText={true} />
        </Link>
        <div className="flex items-center gap-4">
          <Button
            onClick={togglePlay}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause" : "Start Playback"}
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
      <div className="flex-1 flex overflow-hidden">
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
                height: `${fontSize * lineHeight}px`,
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
            <div className="absolute inset-0 flex flex-col items-center p-8">
              <textarea
                value={originalContent}
                onChange={(e) => {
                  setOriginalContent(e.target.value)
                  setScriptLines(smartSplitText(e.target.value))
                }}
                placeholder="Paste or type your script here..."
                className="w-full max-w-4xl flex-1 bg-transparent text-white resize-none focus:outline-none overflow-y-auto playback-scrollbar"
                style={{
                  fontSize: `${fontSize}px`,
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-4xl px-8 relative h-full">
                {scriptLines.map((line, index) => {
                  const position = index - currentLine
                  if (Math.abs(position) > 10) return null
                  const lineHeightPx = fontSize * lineHeight
                  const lineTop = `calc(50% + ${position * lineHeightPx}px - ${lineHeightPx / 2}px)`

                  return (
                    <div
                      key={index}
                      onClick={() => !isPlaying && handleLineClick(index)}
                      className={`absolute left-0 right-0 px-4 transition-all duration-500 flex items-center ${!isPlaying ? 'cursor-pointer hover:bg-gray-800/30' : ''}`}
                      style={{
                        top: lineTop,
                        height: `${lineHeightPx}px`,
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeightPx}px`,
                        fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                        fontWeight: isBold ? 'bold' : 'normal',
                        justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
                        color: position === 0 ? '#fff' : '#666',
                        opacity: Math.abs(position) < 5 ? 1 : 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
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
                            fontSize: `${fontSize}px`,
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

          {/* Keyboard Shortcuts - Show when in edit mode */}
          {!isPlaying && currentLine === -1 && !showEnd && (
            <div className="absolute bottom-8 left-0 right-0 text-center text-gray-500 text-sm">
              <div className="inline-flex gap-6">
                <span><kbd className="bg-gray-800 px-2 py-1 rounded">Space</kbd> Play</span>
                <span><kbd className="bg-gray-800 px-2 py-1 rounded">↑/↓</kbd> Speed</span>
                <span><kbd className="bg-gray-800 px-2 py-1 rounded">H</kbd> Toggle Panel</span>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
        <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
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
                    className={`text-xs ${textAlign === align ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
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
                    className={`text-xs ${textCase === item.value ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
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
                  className={`text-xs ${fontFamily === 'sans' ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                  onClick={() => setFontFamily('sans')}>
                  Sans-serif
                </Button>
                <Button variant={fontFamily === 'serif' ? "default" : "outline"}
                  className={`text-xs ${fontFamily === 'serif' ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                  onClick={() => setFontFamily('serif')}>
                  Serif
                </Button>
                <Button variant={isBold ? "default" : "outline"}
                  className={`text-xs ${isBold ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
                  onClick={() => setIsBold(!isBold)}>
                  Bold
                </Button>
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

            {/* Auto Split */}
            {!isPlaying && (
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-base mb-4"
                onClick={autoSplitLines}
              >
                <Play className="w-4 h-4 mr-2" /> Auto Split Lines
              </Button>
            )}

            {/* Back to Edit Mode */}
            {!isPlaying && currentLine >= 0 && (
              <Button
                variant="outline"
                className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white py-4 text-sm"
                onClick={() => {
                  setCurrentLine(-1)
                  setShowEnd(false)
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Back to Edit Mode
              </Button>
            )}

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
