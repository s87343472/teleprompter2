"use client"

import Link from "next/link"
import { ArrowLeft, Play, Monitor, Smartphone, Settings, Mic, ArrowRight, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Teleprompter Features</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            A professional teleprompter solution designed for creators, speakers, and professionals
          </p>
          <Link href="/">
            <Button variant="outline" className="text-gray-100 border-gray-100 hover:bg-gray-800 hover:text-orange-500">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Features */}
      <section className="py-16 bg-[#111]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Available Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              title="Customizable Speed"
              description="Adjust reading speed in real-time from 0.5x to 3.0x with precision controls to match your pace."
              icon={<Play className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Line Tracking"
              description="Clear visual indicators help you focus on the current line with highlighted text and dynamic scrolling."
              icon={<Monitor className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Adjustable Display"
              description="Customize font size and line spacing to your preference for optimal readability."
              icon={<Settings className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Local Storage"
              description="Your scripts are automatically saved in your browser's local storage for easy access."
              icon={<ArrowRight className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Low Latency"
              description="Optimized performance ensures smooth scrolling with minimal delay, even on lower-end devices."
              icon={<Zap className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Presentation Timer"
              description="Built-in timer helps you keep track of your presentation duration and stay on schedule."
              icon={<Clock className="w-8 h-8 text-orange-500" />}
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Coming Soon</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Remote Control"
              description="Control your teleprompter from your phone or another device with our synchronized interface."
              icon={<Smartphone className="w-8 h-8 text-orange-500" />}
              comingSoon={true}
            />
            <FeatureCard
              title="Voice Recognition"
              description="Optional voice control for hands-free operation, allowing you to control playback with voice commands."
              icon={<Mic className="w-8 h-8 text-orange-500" />}
              comingSoon={true}
            />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try Our Professional Teleprompter?</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Start using our teleprompter today and elevate your presentations to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editor">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Start Now — It's Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ 
  title, 
  description, 
  icon,
  comingSoon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  comingSoon?: boolean;
}) {
  return (
    <div className="bg-black p-6 rounded-none border border-gray-800 relative">
      {comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-xs border border-gray-500 px-2 py-1 text-gray-400">
            COMING SOON
          </span>
        </div>
      )}
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-mono text-xl mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
} 