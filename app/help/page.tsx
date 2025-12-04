"use client"

import Link from "next/link"
import { ArrowLeft, Book, MessageCircle, FileText, Keyboard, Settings, Play, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-gray-100">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Help Center</h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-4 md:mb-8">
            Find answers and learn how to use our teleprompter
          </p>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-orange-500 hover:text-white text-sm md:text-base px-4 md:px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-6 md:py-12 md:-mt-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-lg p-4 md:p-8">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center text-white md:text-black">How can we help you today?</h2>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <Link href="/faq" className="bg-gray-800 md:bg-gray-50 hover:bg-orange-500/20 md:hover:bg-orange-50 rounded-xl md:rounded-lg p-3 md:p-6 flex flex-col items-center text-center transition-all border border-transparent hover:border-orange-500">
                <div className="mb-2 md:mb-4"><FileText className="h-6 w-6 md:h-8 md:w-8 text-orange-500" /></div>
                <h3 className="font-bold text-xs md:text-base mb-0.5 md:mb-1 text-white md:text-black">FAQ</h3>
                <p className="text-gray-400 md:text-gray-600 text-[10px] md:text-sm">Quick answers</p>
              </Link>
              <a href="mailto:support@teleprompter.today" className="bg-gray-800 md:bg-gray-50 hover:bg-orange-500/20 md:hover:bg-orange-50 rounded-xl md:rounded-lg p-3 md:p-6 flex flex-col items-center text-center transition-all border border-transparent hover:border-orange-500">
                <div className="mb-2 md:mb-4"><MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-orange-500" /></div>
                <h3 className="font-bold text-xs md:text-base mb-0.5 md:mb-1 text-white md:text-black">Support</h3>
                <p className="text-gray-400 md:text-gray-600 text-[10px] md:text-sm">Get help</p>
              </a>
              <Link href="/editor" className="bg-gray-800 md:bg-gray-50 hover:bg-orange-500/20 md:hover:bg-orange-50 rounded-xl md:rounded-lg p-3 md:p-6 flex flex-col items-center text-center transition-all border border-transparent hover:border-orange-500">
                <div className="mb-2 md:mb-4"><Book className="h-6 w-6 md:h-8 md:w-8 text-orange-500" /></div>
                <h3 className="font-bold text-xs md:text-base mb-0.5 md:mb-1 text-white md:text-black">Try It</h3>
                <p className="text-gray-400 md:text-gray-600 text-[10px] md:text-sm">Start now</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div id="getting-started" className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-2xl font-bold border-b border-gray-700 md:border-gray-200 pb-2 mb-4 md:mb-6 text-white md:text-black">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <HelpCard
                icon={<Play className="w-5 h-5 text-orange-500" />}
                step="1"
                title="Create Your Script"
                description="Go to the Editor page and type or paste your script content. You can also import text from files."
              />
              <HelpCard
                icon={<Settings className="w-5 h-5 text-orange-500" />}
                step="2"
                title="Adjust Settings"
                description="Set your preferred font size, scroll speed, and display options in the settings panel."
              />
              <HelpCard
                icon={<Monitor className="w-5 h-5 text-orange-500" />}
                step="3"
                title="Start Playback"
                description="Click the Play button or press Space to start the teleprompter. Your script will scroll automatically."
              />
              <HelpCard
                icon={<Keyboard className="w-5 h-5 text-orange-500" />}
                step="4"
                title="Use Shortcuts"
                description="Control playback with keyboard: Space (play/pause), Arrow keys (speed/navigation), Esc (exit)."
              />
            </div>
          </div>

          <div id="shortcuts" className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-2xl font-bold border-b border-gray-700 md:border-gray-200 pb-2 mb-4 md:mb-6 text-white md:text-black">Keyboard Shortcuts</h2>
            <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-md p-4 md:p-6 border border-gray-800 md:border-none">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <ShortcutItem keys="Space" action="Play / Pause" />
                <ShortcutItem keys="↑ / ↓" action="Adjust Speed" />
                <ShortcutItem keys="← / →" action="Jump Line" />
                <ShortcutItem keys="Esc" action="Exit Playback" />
                <ShortcutItem keys="F" action="Fullscreen" />
                <ShortcutItem keys="M" action="Mirror Mode" />
              </div>
            </div>
          </div>

          <div id="tips" className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-2xl font-bold border-b border-gray-700 md:border-gray-200 pb-2 mb-4 md:mb-6 text-white md:text-black">Tips for Best Results</h2>
            <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-md p-4 md:p-6 border border-gray-800 md:border-none">
              <ul className="space-y-3 text-gray-400 md:text-gray-600 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Position your camera at eye level, close to the teleprompter display for natural eye contact.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Use larger font sizes for easier reading, especially if the screen is far from you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Practice with your script a few times to find the optimal scroll speed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Use Chrome, Firefox, or Safari for the best performance and compatibility.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gray-900 md:bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Still Need Help?</h2>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-6 md:mb-8">
            Our support team is ready to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a href="mailto:support@teleprompter.today">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg w-full sm:w-auto">
                Contact Support
              </Button>
            </a>
            <Link href="/faq">
              <Button className="bg-gray-800 md:bg-white text-white md:text-black hover:bg-gray-700 md:hover:bg-gray-200 px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg w-full sm:w-auto">
                View FAQ
              </Button>
            </Link>
          </div>
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

function HelpCard({ icon, step, title, description }: { icon: React.ReactNode; step: string; title: string; description: string }) {
  return (
    <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-md p-4 md:p-6 border border-gray-800 md:border-none">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-sm">
          {step}
        </div>
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-bold text-sm md:text-lg text-white md:text-black">{title}</h3>
        </div>
      </div>
      <p className="text-gray-400 md:text-gray-600 text-xs md:text-base pl-11">{description}</p>
    </div>
  )
}

function ShortcutItem({ keys, action }: { keys: string; action: string }) {
  return (
    <div className="flex items-center gap-2">
      <kbd className="bg-gray-800 md:bg-gray-100 text-white md:text-black px-2 py-1 rounded text-xs md:text-sm font-mono min-w-[40px] text-center">
        {keys}
      </kbd>
      <span className="text-gray-400 md:text-gray-600 text-xs md:text-sm">{action}</span>
    </div>
  )
}
