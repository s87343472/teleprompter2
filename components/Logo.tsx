import type React from "react"

interface LogoProps {
  size?: number
  variant?: "default" | "light" | "dark"
  withText?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 40, variant = "default", withText = true, className = "" }) => {
  // Color configurations based on variant
  const colors = {
    default: {
      primary: "#000000",
      secondary: "#FF5C00",
      text: "#FFFFFF",
    },
    light: {
      primary: "#FFFFFF",
      secondary: "#FF5C00",
      text: "#000000",
    },
    dark: {
      primary: "#000000",
      secondary: "#FF5C00",
      text: "#FFFFFF",
    },
  }

  const { primary, secondary, text } = colors[variant]

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Main logo shape - a stylized teleprompter screen */}
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background rectangle */}
          <rect width="40" height="40" rx="4" fill={primary} />

          {/* Teleprompter screen */}
          <rect x="8" y="8" width="24" height="24" rx="2" fill={text} />

          {/* Orange indicator line */}
          <rect x="8" y="18" width="24" height="4" fill={secondary} />

          {/* T.P letters */}
          <path d="M14 14H20V16H18V26H16V16H14V14Z" fill={primary} />
          <path
            d="M22 14H26C27.1 14 28 14.9 28 16V18C28 19.1 27.1 20 26 20H24V26H22V14ZM24 16V18H26V16H24Z"
            fill={primary}
          />
        </svg>
      </div>

      {withText && (
        <div className="ml-2 flex flex-col">
          <span className="text-xl font-bold" style={{ color: variant === "light" ? primary : text }}>
            T.P
          </span>
          <span className="text-xs font-mono" style={{ color: variant === "light" ? "#666666" : "#999999" }}>
            teleprompter.today
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo 