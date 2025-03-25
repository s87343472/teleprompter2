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
                version="v2.0.0" 
                date="Coming Soon" 
                title="Major Update: Collaboration Features"
                badges={[{ text: "Coming Soon", color: "blue" }]}
                description="We're working on a complete overhaul of our collaboration features, allowing teams to work together seamlessly."
                features={[
                  "Real-time collaborative editing",
                  "Team workspaces",
                  "Permission management",
                  "Comment and feedback system",
                  "Version history and comparison",
                  "Advanced sharing options"
                ]}
                imageSrc="/placeholder.jpg"
              />

              <UpdateItem 
                version="v1.8.2" 
                date="March 15, 2024" 
                title="Performance Improvements and Bug Fixes"
                badges={[{ text: "Latest", color: "green" }]}
                description="This update focuses on improving performance and fixing several bugs reported by our users."
                features={[
                  "50% faster script loading times",
                  "Reduced memory usage for large scripts",
                  "Fixed text jumping issue during fast scrolling",
                  "Improved mobile responsiveness",
                  "Fixed font rendering on high-DPI displays",
                  "Added keyboard shortcut guide (press ? to view)"
                ]}
              />

              <UpdateItem 
                version="v1.8.0" 
                date="February 28, 2024" 
                title="Voice Control and Accessibility"
                badges={[{ text: "Feature", color: "purple" }]}
                description="We've added voice control capabilities and improved accessibility across the platform."
                features={[
                  "Voice commands for controlling playback",
                  "Improved screen reader compatibility",
                  "Added high contrast mode",
                  "Keyboard accessibility enhancements",
                  "Custom voice command setup",
                  "Voice-activated navigation"
                ]}
                imageSrc="/placeholder.jpg"
              />

              <UpdateItem 
                version="v1.7.5" 
                date="February 10, 2024" 
                title="New Templates and Export Options"
                description="We've expanded our template library and added new export options."
                features={[
                  "10 new professional script templates",
                  "PDF export with formatting options",
                  "Plain text export",
                  "Import from Google Docs",
                  "Import from Word documents",
                  "Custom template creation"
                ]}
              />

              <UpdateItem 
                version="v1.7.0" 
                date="January 22, 2024" 
                title="Remote Control Update"
                badges={[{ text: "Feature", color: "purple" }]}
                description="Control your teleprompter from a second device with our new remote control feature."
                features={[
                  "QR code pairing for quick connection",
                  "Real-time speed adjustment from remote device",
                  "Play/pause/reset controls",
                  "Line jumping capability",
                  "Multiple remote connections",
                  "Low-latency synchronization"
                ]}
                imageSrc="/placeholder.jpg"
              />

              <UpdateItem 
                version="v1.0.0" 
                date="November 15, 2023" 
                title="Initial Release"
                badges={[{ text: "Launch", color: "orange" }]}
                description="The first public release of our professional teleprompter platform."
                features={[
                  "Basic teleprompter functionality",
                  "Speed control (0.5x - 3.0x)",
                  "Text editing with formatting",
                  "Line tracking",
                  "Full-screen mode",
                  "Basic settings and customization"
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