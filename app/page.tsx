"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause, Minus, Plus, ChevronRight, Mail, Zap, Target, FileText, Palette, Smartphone, Mic, ArrowRight, Monitor, Settings, X, Menu, LogOut } from "lucide-react"
import Logo from "@/components/Logo"
import HomeTeleprompter, { startPlayback } from "@/components/HomeTeleprompter"
import { useAuth } from "@/contexts/AuthContext"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [fontSize, setFontSize] = useState(36)
  const [speed, setSpeed] = useState(1.0)
  const [currentLine, setCurrentLine] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, signIn, signOut } = useAuth()

  const demoLines = [
    "There is no better school than adversity.",
    "Every defeat, every heartbreak, every loss,",
    "contains its own seed,",
    "its own lesson on how to improve my performance next time.",
    "Never again will I contribute to my downfall."
  ]

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          if (prev >= demoLines.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 2000 / speed)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, speed, demoLines.length])

  const handleWatchDemo = () => {
    startPlayback()
  }

  return (
    <>
      <div className="md:hidden min-h-screen bg-black text-white">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="flex justify-between items-center px-4 py-3">
            <Logo variant="light" size={32} withText={true} />
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center">
                    <Image src={user.photoURL || ''} alt="" width={32} height={32} className="w-8 h-8 rounded-full" unoptimized />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-gray-700">
                        <p className="text-sm font-medium truncate">{user.displayName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button onClick={() => { signOut(); setShowUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-800">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => signIn()} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Sign in
                </button>
              )}
              <Link href="/editor">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg">
                  Create Now
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <section className="pt-20 pb-6 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-3 leading-tight">
              Professional Teleprompter System
            </h1>
            <p className="text-gray-400 text-sm mb-5 px-4">
              Fast, reliable, and customizable teleprompter for creators, speakers, and professionals.
            </p>
            <Link href="/editor">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-base">
                Create Now
              </Button>
            </Link>
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden">
            <div>
              <div className="p-5 min-h-[240px] flex flex-col justify-center relative">
                <h2 className="text-lg font-bold text-center mb-4">
                  There is no better school than adversity.
                </h2>
                <div className="space-y-2 text-center relative">
                  {demoLines.map((line, index) => (
                    <div key={index} className="relative">
                      {index === currentLine && (
                        <div className="absolute inset-0 bg-orange-500/20 border-l-4 border-orange-500 -mx-2 px-2 rounded-r" />
                      )}
                      <p
                        className={`relative text-sm py-1 transition-all duration-300 ${
                          index === currentLine
                            ? 'text-white font-medium'
                            : index < currentLine
                              ? 'text-gray-500'
                              : 'text-gray-600'
                        }`}
                      >
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 px-4 py-4 border-t border-gray-800">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 bg-gray-800 rounded-lg px-2 py-1.5">
                    <button
                      onClick={() => setFontSize(Math.max(20, fontSize - 2))}
                      className="p-1 hover:bg-gray-700 rounded text-gray-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono w-10 text-center text-white">{fontSize}pt</span>
                    <button
                      onClick={() => setFontSize(Math.min(72, fontSize + 2))}
                      className="p-1 hover:bg-gray-700 rounded text-gray-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="text-sm font-medium">Start !</span>
                  </Button>

                  <div className="flex items-center gap-1 bg-gray-800 rounded-lg px-2 py-1.5">
                    <button
                      onClick={() => setSpeed(Math.max(0.5, +(speed - 0.1).toFixed(1)))}
                      className="p-1 hover:bg-gray-700 rounded text-gray-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono w-10 text-center text-white">{speed.toFixed(1)}x</span>
                    <button
                      onClick={() => setSpeed(Math.min(3, +(speed + 0.1).toFixed(1)))}
                      className="p-1 hover:bg-gray-700 rounded text-gray-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 bg-[#0a0a0a]">
          <h2 className="text-xl font-bold text-center mb-1">Professional Features</h2>
          <p className="text-gray-500 text-center text-xs mb-6">Everything you need for perfect prompting !</p>

          <div className="grid grid-cols-2 gap-3">
            <MobileFeatureCard icon={<Zap className="w-5 h-5" />} title="Customizable Speed" description="Adjust reading speed in real-time with precision controls" />
            <MobileFeatureCard icon={<Target className="w-5 h-5" />} title="Line Tracking" description="Clear indicators help you focus on the current line" />
            <MobileFeatureCard icon={<FileText className="w-5 h-5" />} title="Multiple Formats" description="Import from various document formats or create from scratch" />
            <MobileFeatureCard icon={<Palette className="w-5 h-5" />} title="Adjustable Display" description="Customize font, size, colors to your preference" />
            <MobileFeatureCard icon={<Smartphone className="w-5 h-5" />} title="Remote Control" description="Control from your phone or another device" comingSoon />
            <MobileFeatureCard icon={<Mic className="w-5 h-5" />} title="Voice Recognition" description="Optional voice control for hands-free operation" comingSoon />
          </div>
        </section>

        <section className="px-4 py-10 bg-black">
          <h2 className="text-xl font-bold text-center mb-1">FAQ</h2>
          <p className="text-gray-500 text-center text-xs mb-6">Quick answers to get you started</p>

          <div className="space-y-3">
            <MobileFAQItem number="01" question="What is Teleprompter.today?" answer="A free online teleprompter system that helps you deliver smooth presentations by displaying your script at a controlled pace directly in your browser." />
            <MobileFAQItem number="02" question="How do I adjust the scrolling speed?" answer="Use the speed control buttons in the control panel or press the up/down arrow keys on your keyboard." />
            <MobileFAQItem number="03" question="Do I need to create an account?" answer="No, you can use all teleprompter features without creating an account. Simply visit the website and start using it immediately." />
            <MobileFAQItem number="04" question="What keyboard shortcuts are available?" answer="Space = Play/Pause, Arrow Up/Down = Adjust Speed, Arrow Left/Right = Previous/Next Line, Esc = Exit Playback, H = Hide Controls" />
          </div>
        </section>

        <section className="px-4 py-10 bg-[#0a0a0a]">
          <h2 className="text-xl font-bold text-center mb-1">Perfect For</h2>
          <p className="text-gray-500 text-center text-xs mb-6">See how others are using our teleprompter</p>

          <div className="space-y-3">
            <MobileUseCaseCard title="Video Content" description="YouTubers and content creators maintain natural eye contact while delivering scripted content" features={["Script your content in advance", "Maintain natural eye contact", "Smooth scrolling for fluid delivery"]} />
            <MobileUseCaseCard title="Live Presentations" description="Speakers deliver polished presentations while maintaining audience engagement" features={["Clear, easy-to-read text", "Customizable scroll speed", "Distraction-free interface"]} />
            <MobileUseCaseCard title="Educational Content" description="Educators deliver consistent, well-structured lessons while maintaining student engagement" features={["Structured lesson delivery", "Easy-to-follow format", "Flexible speed control"]} />
          </div>
        </section>

        <section className="px-4 py-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Improve Your Presentations?</h2>
            <p className="text-gray-400 text-xs mb-6 px-4">Join thousands of creators and professionals who use our teleprompter daily.</p>
            <div className="flex flex-col gap-3">
              <Link href="/editor">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                  Create Now <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:support@teleprompter.today">
                <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                  Contact Us <Mail className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <footer className="px-4 py-6 bg-black border-t border-gray-800">
          <div className="flex items-center gap-2 mb-5">
            <Logo variant="light" size={28} withText={true} />
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs mb-5">
            <div>
              <h4 className="text-gray-500 text-[10px] mb-2 uppercase">Product</h4>
              <ul className="space-y-1.5 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/updates" className="hover:text-white">Updates</Link></li>
                <li><a href="https://blog.teleprompter.today" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-[10px] mb-2 uppercase">Support</h4>
              <ul className="space-y-1.5 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-[10px] mb-2 uppercase">Legal</h4>
              <ul className="space-y-1.5 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
            <p className="text-gray-600 text-[10px]">© 2025 Teleprompter.today. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <div className="hidden md:flex flex-col min-h-screen bg-gray-100">
        <nav className="bg-black text-white py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center">
              <Logo variant="light" size={36} />
            </div>

            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/features" className="text-sm hover:text-orange-500">Features</Link>
              <Link href="/faq" className="text-sm hover:text-orange-500">FAQ</Link>
              <Link href="/updates" className="text-sm hover:text-orange-500">Updates</Link>
              <a href="https://blog.teleprompter.today/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-orange-500">Blog</a>
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 hover:opacity-80">
                    <Image src={user.photoURL || ''} alt="" width={32} height={32} className="w-8 h-8 rounded-full" unoptimized />
                    <span className="text-sm">{user.displayName?.split(' ')[0]}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-700">
                        <p className="font-medium">{user.displayName}</p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href="/editor" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 text-sm hover:bg-gray-800 rounded">
                          My Scripts
                        </Link>
                        <button onClick={() => { signOut(); setShowUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => signIn()} className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 text-sm px-4 py-2 rounded-lg font-medium">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Sign in with Google
                </button>
              )}
              <Link href="/editor">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-mono">START NOW</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-900 border-t border-gray-800">
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <Link href="/features" className="text-white hover:text-orange-500 py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                <Link href="/faq" className="text-white hover:text-orange-500 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                <Link href="/updates" className="text-white hover:text-orange-500 py-2" onClick={() => setMobileMenuOpen(false)}>Updates</Link>
                <a href="https://blog.teleprompter.today/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 py-2">Blog</a>
                <Link href="/editor" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-mono w-full">START NOW</Button>
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="bg-black text-white py-16">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Professional Teleprompter System</h1>
              <p className="text-gray-300 mb-6">Fast, reliable, and customizable teleprompter for creators, speakers, and professionals.</p>
              <div className="flex space-x-4">
                <Link href="/editor">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-mono">CREATE NEW</Button>
                </Link>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 font-mono" onClick={handleWatchDemo}>WATCH DEMO</Button>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <HomeTeleprompter />
            </div>
          </div>
        </div>

        <div id="features" className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2 text-white">Professional Features</h2>
              <p className="text-gray-400">Everything you need for perfect prompting</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard title="Customizable Speed" description="Adjust reading speed in real-time with precision controls" icon={<Play className="w-8 h-8" />} />
              <FeatureCard title="Line Tracking" description="Clear indicators help you focus on the current line" icon={<Monitor className="w-8 h-8" />} />
              <FeatureCard title="Remote Control" description="Control from your phone or another device" icon={<Smartphone className="w-8 h-8" />} comingSoon={true} />
              <FeatureCard title="Multiple Formats" description="Import from various document formats or create from scratch" icon={<ArrowRight className="w-8 h-8" />} />
              <FeatureCard title="Adjustable Display" description="Customize font, size, colors to your preference" icon={<Settings className="w-8 h-8" />} />
              <FeatureCard title="Voice Recognition" description="Optional voice control for hands-free operation" icon={<Mic className="w-8 h-8" />} comingSoon={true} />
            </div>
          </div>
        </div>

        <div className="py-16 bg-[#111]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2 text-white">Common Questions</h2>
              <p className="text-gray-400">Quick answers to get you started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <FAQItem question="What is Teleprompter.today?" answer="A free online teleprompter system that helps you deliver smooth presentations by displaying your script at a controlled pace directly in your browser." />
                <FAQItem question="Do I need to create an account?" answer="No, you can use all teleprompter features without creating an account. Simply visit the website and start using it immediately." />
              </div>
              <div className="space-y-6">
                <FAQItem question="How do I adjust the scrolling speed?" answer="Use the speed control buttons in the control panel or press the up/down arrow keys on your keyboard." />
                <FAQItem question="What keyboard shortcuts are available?" answer="Space = Play/Pause, Arrow Up/Down = Adjust Speed, Arrow Left/Right = Previous/Next Line, Esc = Exit Playback, H = Hide Controls" />
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2 text-white">Perfect For</h2>
              <p className="text-gray-400">See how others are using our teleprompter</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ShowcaseCard title="Video Content" description="YouTubers and content creators maintain natural eye contact while delivering scripted content" features={["Script your content in advance", "Maintain natural eye contact", "Smooth scrolling for fluid delivery"]} />
              <ShowcaseCard title="Live Presentations" description="Speakers deliver polished presentations while maintaining audience engagement" features={["Clear, easy-to-read text", "Customizable scroll speed", "Distraction-free interface"]} />
              <ShowcaseCard title="Educational Content" description="Educators deliver consistent, well-structured lessons while maintaining student engagement" features={["Structured lesson delivery", "Easy-to-follow format", "Flexible speed control"]} />
            </div>
          </div>
        </div>

        <div className="bg-black text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Presentations?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join thousands of creators and professionals who use our teleprompter daily.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/editor">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">Start Using</Button>
              </Link>
              <a href="mailto:support@teleprompter.today">
                <Button className="bg-white text-black hover:bg-orange-500 hover:text-white px-8 py-3 text-lg">Contact Us</Button>
              </a>
            </div>
          </div>
        </div>

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
                    <li><a href="#features" className="hover:text-white">Features</a></li>
                    <li><Link href="/updates" className="hover:text-white">Updates</Link></li>
                    <li><a href="https://blog.teleprompter.today/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Blog</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono mb-4">SUPPORT</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                    <li><a href="mailto:support@teleprompter.today" className="hover:text-white">Contact</a></li>
                    <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono mb-4">LEGAL</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                    <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Teleprompter.today. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

function MobileFeatureCard({ icon, title, description, comingSoon }: { icon: React.ReactNode; title: string; description: string; comingSoon?: boolean }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3 relative">
      {comingSoon && <span className="absolute top-2 right-2 text-[8px] text-gray-500 border border-gray-700 px-1 py-0.5 rounded">Coming soon</span>}
      <div className="text-orange-500 mb-2">{icon}</div>
      <h3 className="font-semibold text-xs mb-1">{title}</h3>
      <p className="text-gray-500 text-[10px] leading-relaxed">{description}</p>
    </div>
  )
}

function MobileFAQItem({ number, question, answer }: { number: string; question: string; answer: string }) {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-3">
      <div className="flex items-start gap-2">
        <span className="text-orange-500 font-bold text-xs">{number}.</span>
        <div>
          <h3 className="font-semibold text-xs mb-1">{question}</h3>
          <p className="text-gray-500 text-[10px] leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function MobileUseCaseCard({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-3">
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-gray-500 text-[10px] mb-2">{description}</p>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <ChevronRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeatureCard({ title, description, icon, comingSoon }: { title: string; description: string; icon: React.ReactNode; comingSoon?: boolean }) {
  return (
    <div className="bg-[#111] p-6 rounded-none border border-gray-800 relative">
      {comingSoon && <div className="absolute top-4 right-4"><span className="font-mono text-xs border border-gray-500 px-2 py-1 text-gray-400">COMING SOON</span></div>}
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
