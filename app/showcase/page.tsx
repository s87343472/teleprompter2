"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ShowcasePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Showcase</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            See how others are using our teleprompter
          </p>
          <Link href="/">
            <Button variant="outline" className="text-gray-100 border-gray-100 hover:bg-gray-800 hover:text-orange-500">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Use Cases */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Tips & Best Practices */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Tips & Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Example Setup */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Example Setup</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Basic Recording Setup</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <p>Position your camera at eye level, directly behind or beside your screen</p>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <p>Open Teleprompter.today in your browser and enter your script</p>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <p>Adjust text size and scroll speed to your preference</p>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  <p>Practice reading through your script a few times</p>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">5.</span>
                  <p>Start recording and use keyboard shortcuts for control</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Try our teleprompter now and improve your content delivery
          </p>
          <Link href="/editor">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Start Using Teleprompter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function UseCase({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <span className="mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TipCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="font-bold mr-2">{index + 1}.</span>
            <p className="text-gray-700">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  )
} 