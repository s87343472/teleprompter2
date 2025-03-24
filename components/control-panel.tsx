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
        {["EDIT", "PLAY", "FONT", "DISPLAY"].map((tab) => (
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
              <div className="flex justify-center mt-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              </div>
            </div>

            {/* Playback control */}
            <div className="bg-gray-200 p-4 rounded shadow">
              <div className="text-center font-mono text-sm mb-2">PLAYBACK</div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="ghost"
                  className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                  onClick={resetToStart}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  className={`w-12 h-12 ${isPlaying ? "bg-orange-500 hover:bg-orange-600" : "bg-black hover:bg-gray-800"} text-white flex items-center justify-center`}
                  onClick={togglePlay}
                >
                  {isPlaying ? <X className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-gray-800"
                  onClick={() => setCurrentLine(Math.min(currentLine + 1, scriptLines.length - 1))}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center mt-2 space-x-2">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-orange-500" : "bg-gray-600"}`}></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
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
      </div>
    </div>
  )
}

export default ControlPanel

