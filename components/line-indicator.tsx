interface LineIndicatorProps {
  lines: string[]
  currentLine: number
  fontSize: number
  lineHeight: number
}

const LineIndicator = ({ lines, currentLine, fontSize, lineHeight }: LineIndicatorProps) => {
  return (
    <div className="line-indicator flex">
      {/* Left side line numbers and LED indicator */}
      <div className="line-numbers w-10 bg-gray-900 flex flex-col items-center">
        {lines.map((_, index) => (
          <div
            key={index}
            className={`line-number w-full text-center flex items-center justify-center ${currentLine === index ? "text-orange-500" : "text-gray-600"}`}
            style={{ height: `${fontSize * lineHeight}px` }}
          >
            {currentLine === index && (
              <div className="te-led w-2 h-2 rounded-full bg-orange-500 mr-1 animate-pulse"></div>
            )}
            <span className="text-xs font-mono">{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Text content area */}
      <div className="line-content flex-1 overflow-hidden">
        <div
          className="content-container transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${currentLine * fontSize * lineHeight}px)` }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className={`text-line py-2 whitespace-pre-wrap ${
                currentLine === index ? "bg-gray-800 text-white font-bold" : "text-gray-400"
              }`}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                height: `${fontSize * lineHeight}px`,
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
  )
}

export default LineIndicator

