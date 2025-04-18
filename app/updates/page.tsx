"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type BadgeProps = {
  text: string;
  color: "green" | "blue" | "purple" | "orange" | "red";
}

function Badge({ text, color }: BadgeProps) {
  const colorClasses = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800"
  };

  return (
    <span className={`${colorClasses[color]} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded`}>
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
    <div className="flex flex-col md:flex-row items-center md:items-start">
      {/* Version & Date (Left side on desktop) */}
      <div className="md:w-1/4 text-center md:text-right px-4 mb-4 md:mb-0">
        <div className="font-mono font-bold text-lg text-gray-900">{version}</div>
        <div className="text-gray-500">{date}</div>
      </div>

      {/* Circle on timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white"></div>
      
      {/* Content (Right side on desktop) */}
      <div className="md:w-3/4 bg-white rounded-lg shadow-md p-6 md:ml-8">
        <div className="mb-4">
          {badges && badges.map((badge, index) => (
            <Badge key={index} text={badge.text} color={badge.color} />
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <h4 className="font-semibold mb-2">What's New:</h4>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Updates</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Stay up to date with the latest features and improvements
          </p>
          <Link href="/">
            <Button 
              variant="default"
              className="bg-white text-black hover:bg-orange-500 hover:text-white border-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Updates Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

            {/* Update Items */}
            <div className="space-y-16 relative">
              <UpdateItem 
                version="1.0.5" 
                date="April 8, 2024" 
                title="Script Storage Improvements & Dependency Optimization"
                badges={[{ text: "Latest", color: "green" }, { text: "Feature", color: "purple" }, { text: "Bug Fix", color: "red" }]}
                description="Implemented ID-based script storage system and optimized project dependencies"
                features={[
                  "Replaced URL parameters with localStorage for script content storage",
                  "Generated unique IDs for each script instead of passing full content in URL",
                  "Added auto-save functionality that saves scripts every 30 seconds",
                  "Added manual save button for instant script saving",
                  "Implemented saving of script settings (speed, font size, line height)",
                  "Removed unused components and dependencies to resolve React 19 compatibility issues",
                  "Optimized first screen loading speed and performance"
                ]}
              />

              <UpdateItem 
                version="1.0.4" 
                date="April 1, 2024" 
                title="Blog Launch & Navigation Updates"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Launched official blog and improved site navigation"
                features={[
                  "Added official blog at blog.teleprompter.today",
                  "Enhanced navigation with blog link in header and footer",
                  "Updated sitemap and robots.txt for better SEO",
                  "Improved accessibility for all navigation elements"
                ]}
              />

              <UpdateItem 
                version="1.0.3" 
                date="March 27, 2024" 
                title="UI Enhancement & Analytics Integration"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Improved button interactions and added analytics support"
                features={[
                  "Enhanced button hover states with orange text highlight for better visibility",
                  "Improved dark mode button contrast and accessibility",
                  "Added Google Analytics integration",
                  "Updated help center documentation"
                ]}
              />

              <UpdateItem 
                version="1.0.2" 
                date="March 26, 2024" 
                title="Text Controls & Display Options"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Added new text formatting and display controls"
                features={[
                  "Added font style controls (Normal/Bold, Sans/Serif)",
                  "Implemented text alignment options",
                  "Added mirror mode for professional setups",
                  "Enhanced playback controls"
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
                  "Added text transformation tools (UPPERCASE/lowercase)",
                  "Improved tracking indicators"
                ]}
              />

              <UpdateItem 
                version="1.0.0" 
                date="March 24, 2024" 
                title="Initial Release"
                badges={[{ text: "Release", color: "orange" }]}
                description="First public release with core teleprompter functionality"
                features={[
                  "Basic teleprompter functionality with speed control (0.1x - 10.0x)",
                  "Real-time preview with adjustable font size",
                  "Keyboard shortcuts for easy control",
                  "Responsive design for all screen sizes",
                  "Line-by-line tracking system"
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 