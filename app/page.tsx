/** @jsxImportSource react */
"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Monitor, Play, Settings, Smartphone, ChevronRight } from "lucide-react"
import Logo from "@/components/Logo"
import HomeTeleprompter, { startPlayback } from "@/components/HomeTeleprompter"

export default function Home() {
  // Handler for watch demo button
  const handleWatchDemo = () => {
    startPlayback();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-black text-white py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Logo variant="light" size={36} />
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/features" className="text-sm hover:text-orange-500">
              Features
            </Link>
            <Link href="/faq" className="text-sm hover:text-orange-500">
              FAQ
            </Link>
            <Link href="/updates" className="text-sm hover:text-orange-500">
              Updates
            </Link>
            <a href="https://blog.teleprompter.today/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-orange-500">
              Blog
            </a>
            <Link href="/editor">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-mono">START NOW</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Professional Teleprompter System</h1>
            <p className="text-gray-300 mb-6">
              Fast, reliable, and customizable teleprompter for creators, speakers, and professionals.
            </p>
            <div className="flex space-x-4">
              <Link href="/editor">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-mono">CREATE NEW</Button>
              </Link>
              <Button 
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 font-mono"
                onClick={handleWatchDemo}
              >
                WATCH DEMO
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <HomeTeleprompter />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-white">Professional Features</h2>
            <p className="text-gray-400">Everything you need for perfect prompting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Customizable Speed"
              description="Adjust reading speed in real-time with precision controls"
              icon={<Play className="w-8 h-8" />}
            />
            <FeatureCard
              title="Line Tracking"
              description="Clear indicators help you focus on the current line"
              icon={<Monitor className="w-8 h-8" />}
            />
            <FeatureCard
              title="Remote Control"
              description="Control from your phone or another device"
              icon={<Smartphone className="w-8 h-8" />}
              comingSoon={true}
            />
            <FeatureCard
              title="Multiple Formats"
              description="Import from various document formats or create from scratch"
              icon={<ArrowRight className="w-8 h-8" />}
            />
            <FeatureCard
              title="Adjustable Display"
              description="Customize font, size, colors to your preference"
              icon={<Settings className="w-8 h-8" />}
            />
            <FeatureCard
              title="Voice Recognition"
              description="Optional voice control for hands-free operation"
              icon={<Mic className="w-8 h-8" />}
              comingSoon={true}
            />
          </div>
        </div>
      </div>

      {/* Core FAQ Section */}
      <div className="py-16 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-white">Common Questions</h2>
            <p className="text-gray-400">Quick answers to get you started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <FAQItem
                question="What is Teleprompter.today?"
                answer="A free online teleprompter system that helps you deliver smooth presentations by displaying your script at a controlled pace directly in your browser."
              />
              <FAQItem
                question="Do I need to create an account?"
                answer="No, you can use all teleprompter features without creating an account. Simply visit the website and start using it immediately."
              />
            </div>
            <div className="space-y-6">
              <FAQItem
                question="How do I adjust the scrolling speed?"
                answer="Use the speed control buttons in the control panel or press the up/down arrow keys on your keyboard."
              />
              <FAQItem
                question="What keyboard shortcuts are available?"
                answer="Space = Play/Pause, Arrow Up/Down = Adjust Speed, Arrow Left/Right = Previous/Next Line, Esc = Exit Playback, H = Hide Controls"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-white">Perfect For</h2>
            <p className="text-gray-400">See how others are using our teleprompter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ShowcaseCard
              title="Video Content"
              description="YouTubers and content creators maintain natural eye contact while delivering scripted content"
              features={[
                "Script your content in advance",
                "Maintain natural eye contact",
                "Smooth scrolling for fluid delivery"
              ]}
            />
            <ShowcaseCard
              title="Live Presentations"
              description="Speakers deliver polished presentations while maintaining audience engagement"
              features={[
                "Clear, easy-to-read text",
                "Customizable scroll speed",
                "Distraction-free interface"
              ]}
            />
            <ShowcaseCard
              title="Educational Content"
              description="Educators deliver consistent, well-structured lessons while maintaining student engagement"
              features={[
                "Structured lesson delivery",
                "Easy-to-follow format",
                "Flexible speed control"
              ]}
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Presentations?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and professionals who use our teleprompter daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editor">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Start Using
              </Button>
            </Link>
            <a href="mailto:support@teleprompter.today">
              <Button 
                variant="default"
                className="bg-white text-black hover:bg-gray-200 hover:text-gray-900 border-0 px-8 py-3 text-lg"
              >
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">T.P</h2>
              <p className="text-gray-400">Professional teleprompter for everyone</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-mono mb-4">PRODUCT</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#features" className="hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <Link href="/updates" className="hover:text-white">
                      Updates
                    </Link>
                  </li>
                  <li>
                    <a href="https://blog.teleprompter.today/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono mb-4">SUPPORT</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/help" className="hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:support@teleprompter.today" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono mb-4">LEGAL</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Teleprompter.today. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
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
    <div className="bg-[#111] p-6 rounded-none border border-gray-800 relative">
      {comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-xs border border-gray-500 px-2 py-1 text-gray-400">
            COMING SOON
          </span>
        </div>
      )}
      <div className="text-3xl mb-4 text-orange-500">{icon}</div>
      <h3 className="font-mono text-xl mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-black p-6 rounded-none border border-gray-800">
      <h3 className="font-mono text-lg mb-2 text-white">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  )
}

function ShowcaseCard({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className="bg-[#111] p-6 rounded-none border border-gray-800">
      <h3 className="font-mono text-xl mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-400">
            <ChevronRight className="w-4 h-4 mr-2 text-orange-500" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

