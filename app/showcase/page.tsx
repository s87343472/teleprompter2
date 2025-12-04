"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default function ShowcasePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-gray-100">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Showcase</h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-4 md:mb-8">
            See how others are using our teleprompter
          </p>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-orange-500 hover:text-white text-sm md:text-base px-4 md:px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-6 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-lg md:text-3xl font-bold mb-4 md:mb-12 text-center text-white md:text-black">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
            <UseCase
              title="Video Content Creation"
              description="Perfect for YouTubers and content creators who need to maintain eye contact while delivering scripted content."
              features={[
                "Script your content in advance",
                "Maintain natural eye contact",
                "Smooth scrolling for fluid delivery",
                "Adjustable text size and speed"
              ]}
            />
            <UseCase
              title="Live Presentations"
              description="Ideal for speakers who want to deliver polished presentations while maintaining audience engagement."
              features={[
                "Clear, easy-to-read text",
                "Customizable scroll speed",
                "Line highlighting for focus",
                "Distraction-free interface"
              ]}
            />
            <UseCase
              title="Educational Content"
              description="Help educators deliver consistent, well-structured lessons while maintaining student engagement."
              features={[
                "Structured lesson delivery",
                "Easy-to-follow format",
                "Maintain eye contact with students",
                "Flexible speed control"
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-6 md:py-16 bg-[#0a0a0a] md:bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-lg md:text-3xl font-bold mb-4 md:mb-12 text-center text-white md:text-black">Tips & Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
            <TipCard
              title="Preparation"
              tips={[
                "Practice with your script before recording",
                "Adjust font size for comfortable reading",
                "Set scroll speed slightly slower than your natural pace",
                "Use short paragraphs for better readability"
              ]}
            />
            <TipCard
              title="During Recording"
              tips={[
                "Position your camera close to the teleprompter text",
                "Take breaks between long segments",
                "Use keyboard shortcuts for quick adjustments",
                "Keep a consistent distance from the screen"
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-6 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-lg md:text-3xl font-bold mb-4 md:mb-12 text-center text-white md:text-black">Example Setup</h2>
          <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-lg overflow-hidden border border-gray-800 md:border-none">
            <div className="p-4 md:p-6">
              <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4 text-white md:text-black">Basic Recording Setup</h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Position your camera at eye level, directly behind or beside your screen",
                  "Open Teleprompter.today in your browser and enter your script",
                  "Adjust text size and scroll speed to your preference",
                  "Practice reading through your script a few times",
                  "Start recording and use keyboard shortcuts for control"
                ].map((step, index) => (
                  <li key={index} className="flex items-start text-xs md:text-base">
                    <span className="font-bold mr-2 text-orange-500">{index + 1}.</span>
                    <p className="text-gray-400 md:text-gray-700">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gray-900 md:bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-6">Ready to Get Started?</h2>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-6 md:mb-8">
            Try our teleprompter now and improve your content delivery
          </p>
          <Link href="/editor">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg">
              Start Using Teleprompter
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

function UseCase({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-md p-4 md:p-6 border border-gray-800 md:border-none">
      <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 text-white md:text-black">{title}</h3>
      <p className="text-gray-400 md:text-gray-600 mb-3 md:mb-4 text-xs md:text-base">{description}</p>
      <ul className="space-y-1.5 md:space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-400 md:text-gray-700 text-xs md:text-base">
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 text-orange-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TipCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className="bg-gray-900 md:bg-gray-50 rounded-xl md:rounded-lg p-4 md:p-6 border border-gray-800 md:border-none">
      <h3 className="text-sm md:text-xl font-bold mb-3 md:mb-4 text-white md:text-black">{title}</h3>
      <ul className="space-y-2 md:space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start text-xs md:text-base">
            <span className="font-bold mr-2 text-orange-500">{index + 1}.</span>
            <p className="text-gray-400 md:text-gray-700">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
