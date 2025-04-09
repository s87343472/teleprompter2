import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Providers } from "./providers"
import GoogleAnalytics from "./components/GoogleAnalytics"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.teleprompter.today"),
  title: {
    default: "Teleprompter.today - Professional Online Teleprompter",
    template: "%s | Teleprompter.today"
  },
  description: "Professional online teleprompter for creators, speakers, and professionals. Free, easy-to-use, and feature-rich.",
  keywords: ["teleprompter", "online teleprompter", "free teleprompter", "professional teleprompter", "speech tool", "presentation tool"],
  authors: [{ name: "Teleprompter.today" }],
  creator: "Teleprompter.today",
  publisher: "Teleprompter.today",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.teleprompter.today",
    siteName: "Teleprompter.today",
    title: "Professional Online Teleprompter",
    description: "Professional online teleprompter for creators, speakers, and professionals. Free, easy-to-use, and feature-rich.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Teleprompter.today - Professional Online Teleprompter",
        type: "image/svg+xml"
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Teleprompter.today - Professional Online Teleprompter",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleprompter.today - Professional Online Teleprompter",
    description: "Professional online teleprompter for creators, speakers, and professionals",
    images: [
      "/twitter-card.svg",
      "/twitter-card.png"
    ]
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <GoogleAnalytics />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

