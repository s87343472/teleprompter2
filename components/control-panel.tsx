"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Minus, Play, Plus, SkipBack, SkipForward, X } from "lucide-react"

interface ControlPanelProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isPlaying: boolean
  togglePlay: () => void
  resetToStart: () => void
  speed: number
  adjustSpeed: (amount: number) => void
  fontSize: number
  adjustFontSize: (amount: number) => void
  lineHeight: number
  adjustLineHeight: (amount: number) => void
  currentLine: number
  setCurrentLine: (line: number) => void
  scriptLines: string[]
  fontStyle: { weight: string }
}

const ControlPanel = ({
  activeTab,
  setActiveTab,
  isPlaying,
  togglePlay,
  resetToStart,
  speed,
  adjustSpeed,
  fontSize,
  adjustFontSize,
  lineHeight,
  adjustLineHeight,
  currentLine,
  setCurrentLine,
  scriptLines,
}: ControlPanelProps) => {
  return (
    <div className="bg-gray-300 border-t border-gray-400">
      {/* Control tabs */}
      <div className="flex border-b border-gray-400">
        {["EDIT", "PLAY", "FONT"].map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 font-mono text-sm cursor-pointer ${activeTab === tab ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Control panel content */}
      <div className="p-4">
        {activeTab === "PLAY" && (
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

            {/* Playback control */}
            <div className="bg-gray-200 p-4 rounded shadow">
              <div className="text-center font-mono text-sm mb-2">PLAYBACK</div>
              <div className="flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  className={`w-full ${isPlaying ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-900 text-white hover:text-orange-500"} flex items-center justify-center p-2 text-xs font-mono`}
                  onClick={togglePlay}
                >
                  {isPlaying ? <X className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? "STOP" : "PLAY"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full bg-gray-900 text-white p-2 text-xs font-mono hover:text-orange-500 flex items-center justify-center"
                  onClick={resetToStart}
                >
                  <SkipBack className="w-4 h-4 mr-2" />
                  RESET
                </Button>
                <div className="flex justify-center mt-2 space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-orange-500" : "bg-gray-600"}`}></div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>

            {/* Line height control */}
            <div className="bg-gray-200 p-4 rounded shadow">
              <div className="text-center font-mono text-sm mb-2">LINE HEIGHT</div>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
                  onClick={() => adjustLineHeight(-0.1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="font-mono text-xl">{lineHeight.toFixed(1)}</div>
                <Button
                  variant="ghost"
                  className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:text-orange-500"
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
                <Button
                  variant="ghost"
                  className={`${
                    fontStyle.weight === 'normal' ? 'bg-gray-900' : 'bg-gray-700'
                  } text-white p-2 text-xs font-mono hover:text-orange-500`}
                  onClick={() => handleFontStyleChange('normal')}
                >
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
      </div>
    </div>
  )
}

export default ControlPanel

