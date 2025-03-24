import { ImageResponse } from 'next/og'

// 图标尺寸 - 苹果设备推荐尺寸
export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

// 动态生成apple-touch-icon
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background rectangle */}
        <rect width="180" height="180" rx="25" fill="#000000" />

        {/* Teleprompter screen */}
        <rect x="33.75" y="33.75" width="112.5" height="112.5" rx="10" fill="#FFFFFF" />

        {/* Orange indicator line */}
        <rect x="33.75" y="78.75" width="112.5" height="22.5" fill="#FF5C00" />

        {/* T.P letters */}
        <path d="M61.875 61.875H90V73.125H81.5625V118.125H70.3125V73.125H61.875V61.875Z" fill="#000000" />
        <path
          d="M95.625 61.875H118.125C121.5 61.875 123.75 64.125 123.75 67.5V78.75C123.75 82.125 121.5 84.375 118.125 84.375H106.875V118.125H95.625V61.875ZM106.875 73.125V75.9375H115.3125V73.125H106.875Z"
          fill="#000000"
        />
      </svg>
    ),
    { ...size }
  )
} 