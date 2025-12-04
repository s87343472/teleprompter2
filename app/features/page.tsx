"use client"

import Link from "next/link"
import { ArrowLeft, Play, Monitor, Smartphone, Settings, Mic, ArrowRight, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Teleprompter Features</h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-4 md:mb-8">
            A professional teleprompter solution designed for creators, speakers, and professionals
          </p>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-orange-500 hover:text-white text-sm md:text-base px-4 md:px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-8 md:py-16 bg-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 text-center text-white">Available Features</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-8 md:mb-16">
            <FeatureCard title="Customizable Speed" description="Adjust reading speed in real-time from 0.5x to 3.0x" icon={<Play className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} />
            <FeatureCard title="Line Tracking" description="Clear visual indicators help you focus on the current line" icon={<Monitor className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} />
            <FeatureCard title="Adjustable Display" description="Customize font size and line spacing for optimal readability" icon={<Settings className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} />
            <FeatureCard title="Local Storage" description="Scripts auto-saved in your browser for easy access" icon={<ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} />
            <FeatureCard title="Low Latency" description="Smooth scrolling with minimal delay on any device" icon={<Zap className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} />
            <FeatureCard title="Presentation Timer" description="Built-in timer to track your presentation duration" icon={<Clock className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} />
          </div>

          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 text-center text-white">Coming Soon</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            <FeatureCard title="Remote Control" description="Control teleprompter from your phone or another device" icon={<Smartphone className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} comingSoon={true} />
            <FeatureCard title="Voice Recognition" description="Hands-free control with voice commands" icon={<Mic className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />} comingSoon={true} />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Try Our Professional Teleprompter?</h2>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-6 md:mb-8">
            Start using our teleprompter today and elevate your presentations.
          </p>
          <Link href="/editor">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg">
              Start Now — It&apos;s Free
            </Button>
          </Link>
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

function FeatureCard({ title, description, icon, comingSoon }: { title: string; description: string; icon: React.ReactNode; comingSoon?: boolean }) {
  return (
    <div className="bg-black p-3 md:p-6 rounded-xl md:rounded-none border border-gray-800 relative">
      {comingSoon && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4">
          <span className="font-mono text-[8px] md:text-xs border border-gray-500 px-1 md:px-2 py-0.5 md:py-1 text-gray-400">COMING SOON</span>
        </div>
      )}
      <div className="text-xl md:text-3xl mb-2 md:mb-4">{icon}</div>
      <h3 className="font-semibold md:font-mono text-xs md:text-xl mb-1 md:mb-2 text-white">{title}</h3>
      <p className="text-gray-500 md:text-gray-400 text-[10px] md:text-base leading-relaxed">{description}</p>
    </div>
  )
}
