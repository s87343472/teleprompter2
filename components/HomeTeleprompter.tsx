"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Plus, Minus } from "lucide-react"

// Sample text with shorter lines for better display
const DEMO_TEXT = `Welcome to Teleprompter.today.
Professional teleprompter system.
Clear display of your content.
Auto-tracking of current line.
Adjustable speed and settings.
Create professional presentations!`

// Create a ref to store the toggle function
let globalTogglePlayFn: (() => void) | null = null;

export default function HomeTeleprompter() {
  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const [currentLine, setCurrentLine] = useState(0)
  const [scriptLines, setScriptLines] = useState<string[]>(DEMO_TEXT.split('\n'))
  const [buttonFeedback, setButtonFeedback] = useState({ minus: false, plus: false, play: false })
  const [isHovered, setIsHovered] = useState(false)
  
  // Constants for layout - keep fixed sizes
  const LINE_HEIGHT = 30;
  const DISPLAY_HEIGHT = 180;
  const CENTER_POSITION = DISPLAY_HEIGHT / 2 - LINE_HEIGHT / 2;
  
  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Handle play/pause (can be triggered externally)
  const togglePlay = () => {
    // Provide button feedback
    setButtonFeedback(prev => ({ ...prev, play: true }))
    setTimeout(() => setButtonFeedback(prev => ({ ...prev, play: false })), 150)
    
    // If at the end, reset to beginning
    if (currentLine >= scriptLines.length - 1) {
      setCurrentLine(0)
    }
    
    // Toggle playing state
    setIsPlaying(!isPlaying)
  }
  
  // Store the togglePlay function in the global ref
  useEffect(() => {
    globalTogglePlayFn = togglePlay;
    
    // Listen for external play commands
    const handleExternalPlay = () => {
      if (!isPlaying) {
        togglePlay();
      }
    };
    
    window.addEventListener('teleprompter:play', handleExternalPlay);
    
    return () => {
      globalTogglePlayFn = null;
      window.removeEventListener('teleprompter:play', handleExternalPlay);
    };
  }, [isPlaying, togglePlay]);
  
  // Adjust speed
  const adjustSpeed = (amount: number) => {
    // Provide button feedback
    if (amount < 0) {
      setButtonFeedback(prev => ({ ...prev, minus: true }))
      setTimeout(() => setButtonFeedback(prev => ({ ...prev, minus: false })), 150)
    } else {
      setButtonFeedback(prev => ({ ...prev, plus: true }))
      setTimeout(() => setButtonFeedback(prev => ({ ...prev, plus: false })), 150)
    }
    
    // Adjust speed value
    setSpeed((prev) => {
      const newSpeed = Number.parseFloat((prev + amount).toFixed(1))
      return Math.max(0.5, Math.min(3.0, newSpeed))
    })
  }
  
  // Playback logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          if (prev >= scriptLines.length - 1) {
            setIsPlaying(false)
            return prev; // Stay on last line rather than resetting
          }
          return prev + 1
        })
      }, 1800 / speed) // Speed affects interval
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, speed, scriptLines.length])
  
  return (
    <div 
      className={`bg-gray-800 p-6 rounded-lg w-full max-w-md relative ${
        isHovered ? "shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interaction hint */}
      {!isPlaying && isHovered && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg text-sm animate-bounce">
          Click to try demo
        </div>
      )}
      
      {/* Pulsing border - only when hovering and not playing */}
      {isHovered && !isPlaying && (
        <div className="absolute inset-0 rounded-lg border-2 border-orange-500 animate-pulse"></div>
      )}
      
      <div className="bg-black p-4 rounded flex flex-col items-center relative z-10">
        <div className="font-mono text-4xl mb-4">{speed.toFixed(1)}x</div>
        
        {/* Text display area */}
        <div 
          className="w-full h-[180px] bg-gray-900 rounded mb-4 overflow-hidden relative"
          style={{ 
            cursor: !isPlaying && isHovered ? "pointer" : "default"
          }}
          onClick={!isPlaying ? togglePlay : undefined}
        >
          {/* Static highlight bar in center */}
          <div 
            className="absolute w-full pointer-events-none z-10"
            style={{ 
              top: `${CENTER_POSITION}px`,
              height: `${LINE_HEIGHT}px`,
              backgroundColor: "rgba(234, 88, 12, 0.2)", // Transparent orange
              borderLeft: "4px solid #f97316" // Solid orange border
            }}
          ></div>
          
          {/* Text container with centering calculation */}
          <div 
            className="absolute w-full transition-transform duration-500"
            style={{ 
              transform: `translateY(${CENTER_POSITION - currentLine * LINE_HEIGHT}px)`,
            }}
          >
            {scriptLines.map((line, index) => (
              <div 
                key={index} 
                className={`px-4 text-center font-sans whitespace-nowrap flex items-center justify-center ${
                  currentLine === index ? "text-white font-medium" : "text-gray-400"
                }`}
                style={{ 
                  fontSize: "16px",
                  height: `${LINE_HEIGHT}px`,
                  lineHeight: `${LINE_HEIGHT}px`
                }}
              >
                {line || " "}
              </div>
            ))}
          </div>
          
          {/* Click hint - only when hovering and not playing */}
          {!isPlaying && isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
              <Play className="w-12 h-12 text-orange-500" />
            </div>
          )}
        </div>
        
        {/* Control buttons */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <Button 
            variant="ghost" 
            className={`bg-gray-700 p-2 rounded text-center font-mono transition-transform ${
              buttonFeedback.minus ? "scale-95 bg-gray-600" : "hover:bg-gray-600"
            }`}
            onClick={() => adjustSpeed(-0.1)}
            title="Decrease Speed"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button 
            className={`bg-orange-500 p-2 rounded text-center font-mono transition-transform ${
              buttonFeedback.play ? "scale-95 bg-orange-600" : "hover:bg-orange-600"
            }`}
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4 mx-auto" /> : <Play className="w-4 h-4 mx-auto" />}
          </Button>
          <Button 
            variant="ghost" 
            className={`bg-gray-700 p-2 rounded text-center font-mono transition-transform ${
              buttonFeedback.plus ? "scale-95 bg-gray-600" : "hover:bg-gray-600"
            }`}
            onClick={() => adjustSpeed(0.1)}
            title="Increase Speed"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Status indicator */}
        <div className="flex justify-center mt-4">
          <div className={`w-2 h-2 rounded-full transition-colors ${isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}></div>
        </div>
      </div>
    </div>
  )
}

// Export a function that can be used to control this component from outside
export const startPlayback = () => {
  const event = new CustomEvent('teleprompter:play');
  window.dispatchEvent(event);
} 