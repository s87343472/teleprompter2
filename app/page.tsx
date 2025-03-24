"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Monitor, Play, Settings, Smartphone } from "lucide-react"
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
            <a href="#features" className="text-sm hover:text-orange-500">
              Features
            </a>
            <a href="#showcase" className="text-sm hover:text-orange-500">
              Showcase
            </a>
            <a href="#faq" className="text-sm hover:text-orange-500">
              FAQ
            </a>
            <a href="#testimonials" className="text-sm hover:text-orange-500">
              Testimonials
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
      <div id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Professional Features</h2>
            <p className="text-gray-600">Everything you need for perfect prompting</p>
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
          <Link href="/editor">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-mono text-lg">
              START FOR FREE
            </Button>
          </Link>
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
                    <a href="#" className="hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Updates
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono mb-4">SUPPORT</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono mb-4">LEGAL</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Teleprompter.today. All rights reserved.
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span>Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span>YouTube</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-mono text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

