"use client"

import Link from "next/link"
import { ArrowLeft, Search, Book, Video, MessageCircle, FileText, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Find answers to common questions and learn how to use our teleprompter
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for articles, tutorials, or FAQs..."
              className="w-full p-4 pr-12 rounded-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-500 w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/">
              <Button variant="outline" className="text-white border-white hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Links */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">How can we help you today?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <QuickLink 
                icon={<Book className="h-8 w-8 text-orange-500" />}
                title="User Guides"
                description="Detailed guides on using the teleprompter"
                href="#guides"
              />
              <QuickLink 
                icon={<Video className="h-8 w-8 text-orange-500" />}
                title="Video Tutorials"
                description="Step-by-step video instructions"
                href="#tutorials"
              />
              <QuickLink 
                icon={<MessageCircle className="h-8 w-8 text-orange-500" />}
                title="Contact Support"
                description="Get help from our support team"
                href="/contact"
              />
              <QuickLink 
                icon={<FileText className="h-8 w-8 text-orange-500" />}
                title="FAQ"
                description="Answers to common questions"
                href="/faq"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Categories */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a href="#getting-started" className="text-gray-700 hover:text-orange-500 flex items-center">
                        Getting Started
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="#features" className="text-gray-700 hover:text-orange-500 flex items-center">
                        Features & Controls
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="#account" className="text-gray-700 hover:text-orange-500 flex items-center">
                        Account Management
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="#troubleshooting" className="text-gray-700 hover:text-orange-500 flex items-center">
                        Troubleshooting
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a href="#advanced" className="text-gray-700 hover:text-orange-500 flex items-center">
                        Advanced Features
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:w-3/4">
              {/* Getting Started Section */}
              <div id="getting-started" className="mb-12">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">Getting Started</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <HelpCard 
                    title="Creating Your First Script"
                    description="Learn how to create and format your first teleprompter script."
                    link="#"
                  />
                  <HelpCard 
                    title="Teleprompter Basics"
                    description="Understanding the interface and basic controls."
                    link="#"
                  />
                  <HelpCard 
                    title="Quick Start Guide"
                    description="Get up and running in less than 5 minutes."
                    link="#"
                  />
                  <HelpCard 
                    title="Setting Up Your Environment"
                    description="Tips for setting up an optimal teleprompter environment."
                    link="#"
                  />
                </div>
              </div>

              {/* Features & Controls Section */}
              <div id="features" className="mb-12">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">Features & Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <HelpCard 
                    title="Speed Control"
                    description="Mastering speed control for different speaking styles."
                    link="#"
                  />
                  <HelpCard 
                    title="Keyboard Shortcuts"
                    description="Full list of keyboard shortcuts for efficient usage."
                    link="#"
                  />
                  <HelpCard 
                    title="Formatting Options"
                    description="Learn about all text formatting options available."
                    link="#"
                  />
                  <HelpCard 
                    title="Remote Control Features"
                    description="How to control your teleprompter from another device."
                    link="#"
                  />
                </div>
              </div>

              {/* Troubleshooting Section */}
              <div id="troubleshooting" className="mb-12">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">Troubleshooting</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <HelpCard 
                    title="Performance Issues"
                    description="Solutions for lag, stuttering, or slow performance."
                    link="#"
                  />
                  <HelpCard 
                    title="Text Display Problems"
                    description="Fixing issues with text display or formatting."
                    link="#"
                  />
                  <HelpCard 
                    title="Connection Problems"
                    description="Troubleshooting remote control connection issues."
                    link="#"
                  />
                  <HelpCard 
                    title="Browser Compatibility"
                    description="Browser-specific issues and recommended settings."
                    link="#"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section id="tutorials" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VideoTutorial 
              title="Getting Started with Teleprompter.today"
              duration="5:32"
              thumbnail="/placeholder.jpg"
              link="#"
            />
            <VideoTutorial 
              title="Advanced Speed Control Techniques"
              duration="8:17"
              thumbnail="/placeholder.jpg"
              link="#"
            />
            <VideoTutorial 
              title="Setting Up Remote Control"
              duration="6:45"
              thumbnail="/placeholder.jpg"
              link="#"
            />
          </div>
          <div className="text-center mt-8">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              View All Tutorials
            </Button>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Our support team is ready to assist you with any questions or issues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Contact Support
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline" className="text-white border-white hover:bg-gray-800 px-8 py-3 text-lg">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickLink({ icon, title, description, href }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string;
}) {
  return (
    <a 
      href={href}
      className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center transition-all"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  );
}

function HelpCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <a href={link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="flex items-center text-orange-500 font-medium">
        Read More
        <ExternalLink className="ml-1 h-4 w-4" />
      </div>
    </a>
  );
}

function VideoTutorial({ title, duration, thumbnail, link }: { 
  title: string; 
  duration: string; 
  thumbnail: string; 
  link: string;
}) {
  return (
    <a href={link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-orange-500 bg-opacity-80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold">{title}</h3>
      </div>
    </a>
  );
} 