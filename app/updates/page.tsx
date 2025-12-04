"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

type BadgeProps = {
  text: string;
  color: "green" | "blue" | "purple" | "orange" | "red";
}

function Badge({ text, color }: BadgeProps) {
  const colorClasses = {
    green: "bg-green-500/20 text-green-400 md:bg-green-100 md:text-green-800",
    blue: "bg-blue-500/20 text-blue-400 md:bg-blue-100 md:text-blue-800",
    purple: "bg-purple-500/20 text-purple-400 md:bg-purple-100 md:text-purple-800",
    orange: "bg-orange-500/20 text-orange-400 md:bg-orange-100 md:text-orange-800",
    red: "bg-red-500/20 text-red-400 md:bg-red-100 md:text-red-800"
  };

  return (
    <span className={`${colorClasses[color]} text-[10px] md:text-xs font-semibold mr-1.5 md:mr-2 px-2 py-0.5 rounded`}>
      {text}
    </span>
  );
}

interface UpdateItemProps {
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  badges?: BadgeProps[];
}

function UpdateItem({ version, date, title, description, features, badges }: UpdateItemProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start relative">
      <div className="md:w-1/4 text-center md:text-right px-4 mb-3 md:mb-0 z-10">
        <div className="font-mono font-bold text-base md:text-lg text-white md:text-gray-900">{version}</div>
        <div className="text-gray-500 text-xs md:text-sm">{date}</div>
      </div>

      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white z-20"></div>

      <div className="w-full md:w-3/4 bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-md p-4 md:p-6 md:ml-8 border border-gray-800 md:border-none">
        <div className="mb-2 md:mb-3 flex flex-wrap gap-1">
          {badges && badges.map((badge, index) => (
            <Badge key={index} text={badge.text} color={badge.color} />
          ))}
        </div>
        <h3 className="text-lg md:text-2xl font-bold mb-1.5 md:mb-2 text-white md:text-black">{title}</h3>
        <p className="text-gray-400 md:text-gray-600 mb-3 text-xs md:text-base">{description}</p>

        <h4 className="font-semibold mb-2 text-xs md:text-base text-gray-300 md:text-black">What&apos;s New:</h4>
        <ul className="list-disc pl-4 md:pl-5 text-gray-400 md:text-gray-600 space-y-1 text-xs md:text-base">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function UpdatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-gray-100">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Product Updates</h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-4 md:mb-8">
            Stay up to date with the latest features and improvements
          </p>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-orange-500 hover:text-white text-sm md:text-base px-4 md:px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-6 md:py-16 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

            <div className="space-y-6 md:space-y-16 relative">
              <UpdateItem
                version="1.1.4"
                date="December 4, 2025"
                title="Mobile Experience Optimization"
                badges={[{ text: "Latest", color: "green" }, { text: "Enhancement", color: "purple" }]}
                description="Completely redesigned mobile editor interface with improved touch interactions"
                features={[
                  "Full-screen settings panel for mobile devices",
                  "Tap-to-pause playback with floating controls",
                  "Improved text wrapping for mobile screens",
                  "Redesigned bottom control bar with centered layout",
                  "Fixed text overlap issues during playback"
                ]}
              />

              <UpdateItem
                version="1.1.3"
                date="December 4, 2025"
                title="Code Quality & Lint Fixes"
                badges={[{ text: "Maintenance", color: "blue" }]}
                description="Improved code quality and fixed all linting issues for better maintainability"
                features={[
                  "Fixed all ESLint errors across the codebase",
                  "Resolved unused variable warnings in editor and components",
                  "Fixed unescaped entity issues in FAQ, Privacy, and Terms pages",
                  "Improved TypeScript type definitions",
                  "Optimized component dependencies"
                ]}
              />

              <UpdateItem
                version="1.0.5"
                date="April 8, 2024"
                title="Script Storage Improvements"
                badges={[{ text: "Feature", color: "purple" }, { text: "Bug Fix", color: "red" }]}
                description="Implemented ID-based script storage system and optimized project dependencies"
                features={[
                  "Replaced URL parameters with localStorage for script content",
                  "Generated unique IDs for each script",
                  "Added auto-save functionality (every 30 seconds)",
                  "Implemented saving of script settings",
                  "Optimized first screen loading speed"
                ]}
              />

              <UpdateItem
                version="1.0.4"
                date="April 1, 2024"
                title="Blog Launch & Navigation"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Launched official blog and improved site navigation"
                features={[
                  "Added official blog at blog.teleprompter.today",
                  "Enhanced navigation with blog link",
                  "Updated sitemap and robots.txt for better SEO"
                ]}
              />

              <UpdateItem
                version="1.0.3"
                date="March 27, 2024"
                title="UI Enhancement & Analytics"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Improved button interactions and added analytics support"
                features={[
                  "Enhanced button hover states with orange highlight",
                  "Improved dark mode button contrast",
                  "Added Google Analytics integration"
                ]}
              />

              <UpdateItem
                version="1.0.2"
                date="March 26, 2024"
                title="Text Controls & Display"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Added new text formatting and display controls"
                features={[
                  "Added font style controls (Normal/Bold, Sans/Serif)",
                  "Implemented text alignment options",
                  "Added mirror mode for professional setups"
                ]}
              />

              <UpdateItem
                version="1.0.1"
                date="March 25, 2024"
                title="Import/Export & Text Tools"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Added file management and text transformation features"
                features={[
                  "Added script import/export functionality",
                  "Implemented Markdown file saving",
                  "Added text transformation tools"
                ]}
              />

              <UpdateItem
                version="1.0.0"
                date="March 24, 2024"
                title="Initial Release"
                badges={[{ text: "Release", color: "orange" }]}
                description="First public release with core teleprompter functionality"
                features={[
                  "Basic teleprompter with speed control (0.1x - 10.0x)",
                  "Real-time preview with adjustable font size",
                  "Keyboard shortcuts for easy control",
                  "Responsive design for all screen sizes"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 py-6 bg-black border-t border-gray-800 md:hidden">
        <div className="flex items-center gap-2 mb-5">
          <Logo variant="light" size={28} withText={true} />
        </div>
        <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
          <p className="text-gray-600 text-[10px]">© 2025 Teleprompter.today. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
