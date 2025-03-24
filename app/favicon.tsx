import { ImageResponse } from 'next/og'

// 图标尺寸
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/svg+xml'

// 动态生成favicon
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background rectangle */}
        <rect width="32" height="32" rx="4" fill="#000000" />

        {/* Teleprompter screen */}
        <rect x="6" y="6" width="20" height="20" rx="2" fill="#FFFFFF" />

        {/* Orange indicator line */}
        <rect x="6" y="14" width="20" height="4" fill="#FF5C00" />

        {/* T.P letters */}
        <path d="M11 11H16V13H14.5V21H12.5V13H11V11Z" fill="#000000" />
        <path
          d="M17 11H21C21.6 11 22 11.4 22 12V14C22 14.6 21.6 15 21 15H19V21H17V11ZM19 13V13.5H20.5V13H19Z"
          fill="#000000"
        />
      </svg>
    ),
    { ...size }
  )
} 