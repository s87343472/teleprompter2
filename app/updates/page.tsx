"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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
            <Button variant="outline" className="text-white border-white hover:bg-gray-800">
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
                version="Coming Soon" 
                date="In Development" 
                title="Remote Control & Voice Recognition"
                badges={[
                  { text: "Coming Soon", color: "blue" },
                  { text: "New Feature", color: "purple" }
                ]}
                description="We are developing two important new features to enhance your teleprompter experience"
                features={[
                  "Remote Control: Control teleprompter from your phone or another device",
                  "- Real-time speed adjustment",
                  "- Play/pause/reset controls",
                  "- Multi-device connection support",
                  "Voice Recognition: Control with voice commands",
                  "- Hands-free operation",
                  "- Custom voice commands",
                  "- Multi-language support"
                ]}
              />

              <UpdateItem 
                version="v0.1.2" 
                date="March 26, 2024" 
                title="Enhanced Playback Controls & UI Optimization"
                badges={[{ text: "Latest", color: "green" }]}
                description="Improved playback experience with new text controls and streamlined interface"
                features={[
                  "Added text alignment controls (left, center, right)",
                  "Added mirror display options (horizontal, vertical)",
                  "Reorganized playback control bar for better usability",
                  "Optimized FONT panel layout in editor",
                  "Added visual feedback for active controls",
                  "Improved control bar grouping and spacing",
                  "Added tooltips for all control buttons",
                  "Unified button sizes and styles"
                ]}
              />

              <UpdateItem 
                version="v0.1.1" 
                date="March 24, 2024" 
                title="Core Features Optimization"
                badges={[{ text: "Update", color: "orange" }]}
                description="Optimized core teleprompter functionality and user experience"
                features={[
                  "Added click sound feedback",
                  "Optimized teleprompter component state initialization",
                  "Fixed empty text issue in teleprompter preview",
                  "Fixed 404 error for audio resources",
                  "Fixed dynamic style rendering deployment issues"
                ]}
              />

              <UpdateItem 
                version="v0.1.0" 
                date="March 24, 2024" 
                title="Initial Release"
                badges={[{ text: "Release", color: "orange" }]}
                description="First public release with basic teleprompter functionality"
                features={[
                  "Created basic Next.js application framework",
                  "Implemented homepage UI design and layout",
                  "Added HomeTeleprompter preview component",
                  "Added basic editor page",
                  "Added playback controls",
                  "Optimized text scrolling and display logic",
                  "Fixed prompt bar positioning",
                  "Fixed text playback positioning issues",
                  "Fixed state reset issues after playback ends"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter to get notified about new features and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-md"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Subscribe
              </Button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              We'll never share your email. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

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
  imageSrc?: string;
}

function UpdateItem({ version, date, title, description, features, badges, imageSrc }: UpdateItemProps) {
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
        
        {imageSrc && (
          <div className="mb-4">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
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