"use client"

import Link from "next/link"
import { ArrowLeft, Play, Monitor, Smartphone, Settings, Mic, ArrowRight, Globe, Clock, Shield, Zap, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Teleprompter Features</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            A professional teleprompter solution designed for creators, speakers, and professionals
          </p>
          <Link href="/">
            <Button variant="outline" className="text-white border-white hover:bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
          
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
              title="Remote Control"
              description="Control your teleprompter from your phone or another device with our synchronized interface."
              icon={<Smartphone className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Multiple Formats"
              description="Import content from various document formats or create scripts from scratch in our editor."
              icon={<ArrowRight className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Adjustable Display"
              description="Customize font, size, colors, and background to your preference for optimal readability."
              icon={<Settings className="w-8 h-8 text-orange-500" />}
            />
            <FeatureCard
              title="Voice Recognition"
              description="Optional voice control for hands-free operation, allowing you to control playback with voice commands."
              icon={<Mic className="w-8 h-8 text-orange-500" />}
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-12 text-center">Advanced Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Mirror Mode"
              description="Flip text horizontally for traditional teleprompter setups using beam splitters or mirror reflections."
              icon={<ArrowLeft className="w-8 h-8 text-indigo-500" />}
            />
            <FeatureCard
              title="Multiple Languages"
              description="Full support for international character sets and right-to-left languages."
              icon={<Globe className="w-8 h-8 text-indigo-500" />}
            />
            <FeatureCard
              title="Countdown Timer"
              description="Built-in timer helps you keep track of your presentation duration and stay on schedule."
              icon={<Clock className="w-8 h-8 text-indigo-500" />}
            />
            <FeatureCard
              title="Script Encryption"
              description="Optional encryption for sensitive content to ensure your scripts remain private and secure."
              icon={<Shield className="w-8 h-8 text-indigo-500" />}
            />
            <FeatureCard
              title="Low Latency"
              description="Optimized performance ensures smooth scrolling with minimal delay, even on lower-end devices."
              icon={<Zap className="w-8 h-8 text-indigo-500" />}
            />
            <FeatureCard
              title="Cloud Sync"
              description="Save your scripts to the cloud and access them from any device, anywhere."
              icon={<Cloud className="w-8 h-8 text-indigo-500" />}
            />
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-center">Free</th>
                  <th className="py-4 px-6 text-center">Pro</th>
                  <th className="py-4 px-6 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow feature="Basic Teleprompter" free={true} pro={true} enterprise={true} />
                <ComparisonRow feature="Speed Control" free={true} pro={true} enterprise={true} />
                <ComparisonRow feature="Line Tracking" free={true} pro={true} enterprise={true} />
                <ComparisonRow feature="Custom Fonts" free={false} pro={true} enterprise={true} />
                <ComparisonRow feature="Remote Control" free={false} pro={true} enterprise={true} />
                <ComparisonRow feature="Script Storage" free="3 scripts" pro="Unlimited" enterprise="Unlimited" />
                <ComparisonRow feature="Voice Control" free={false} pro={true} enterprise={true} />
                <ComparisonRow feature="Team Collaboration" free={false} pro={false} enterprise={true} />
                <ComparisonRow feature="Script Encryption" free={false} pro={false} enterprise={true} />
                <ComparisonRow feature="API Access" free={false} pro={false} enterprise={true} />
                <ComparisonRow feature="Priority Support" free={false} pro={true} enterprise="24/7 Support" />
                <ComparisonRow feature="White Labeling" free={false} pro={false} enterprise={true} />
              </tbody>
            </table>
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
            <Link href="/pricing">
              <Button variant="outline" className="text-white border-white hover:bg-gray-800 px-8 py-3 text-lg">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-mono text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ComparisonRow({ 
  feature, 
  free, 
  pro, 
  enterprise 
}: { 
  feature: string, 
  free: boolean | string, 
  pro: boolean | string, 
  enterprise: boolean | string 
}) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6 font-medium">{feature}</td>
      <td className="py-4 px-6 text-center">
        {typeof free === 'boolean' 
          ? (free ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>)
          : <span>{free}</span>
        }
      </td>
      <td className="py-4 px-6 text-center">
        {typeof pro === 'boolean' 
          ? (pro ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>)
          : <span>{pro}</span>
        }
      </td>
      <td className="py-4 px-6 text-center">
        {typeof enterprise === 'boolean' 
          ? (enterprise ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>)
          : <span>{enterprise}</span>
        }
      </td>
    </tr>
  )
} 