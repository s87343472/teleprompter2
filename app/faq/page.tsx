"use client"

import Link from "next/link"
import { ArrowLeft, Search, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Logo from "@/components/Logo"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "getting-started", name: "Getting Started" },
    { id: "features", name: "Features & Usage" },
    { id: "troubleshooting", name: "Troubleshooting" }
  ]

  const faqData = [
    { id: "q1", category: "getting-started", question: "What is Teleprompter.today?", answer: "Teleprompter.today is a free online teleprompter system designed for content creators, speakers, and professionals. It helps you deliver smooth presentations by displaying your script at a controlled pace directly in your browser." },
    { id: "q2", category: "getting-started", question: "Do I need to create an account?", answer: "No, you can use all teleprompter features without creating an account. Simply visit the website and start using it immediately." },
    { id: "q3", category: "getting-started", question: "Can I use it on mobile devices?", answer: "Yes, Teleprompter.today is fully responsive and works on desktop computers, tablets, and smartphones." },
    { id: "q4", category: "features", question: "How do I adjust the scrolling speed?", answer: "Use the speed control buttons in the control panel or press the up/down arrow keys on your keyboard." },
    { id: "q5", category: "features", question: "What keyboard shortcuts are available?", answer: "Space = Play/Pause, Arrow Up/Down = Adjust Speed, Arrow Left/Right = Previous/Next Line, Esc = Exit Playback, H = Hide Controls." },
    { id: "q6", category: "features", question: "Can I format my text?", answer: "Currently, we support basic text display. Text formatting features like bold, italics, and custom fonts are planned for future updates." },
    { id: "q7", category: "features", question: "Can I control from another device?", answer: "Remote control functionality is currently under development and will be available soon." },
    { id: "q8", category: "troubleshooting", question: "The teleprompter is lagging. How can I fix this?", answer: "Try refreshing the page, using a more recent browser version, closing other resource-intensive applications, or switching to a device with better performance." },
    { id: "q9", category: "troubleshooting", question: "How do I report a bug?", answer: "You can report bugs through our Contact page. Please provide as much detail as possible." },
    { id: "q10", category: "troubleshooting", question: "Text isn't displaying correctly. What should I do?", answer: "Try adjusting the font size and line spacing in the settings panel. If the issue persists, check your browser's zoom level or try a different browser." }
  ]

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch = searchTerm === "" || faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id])
  }

  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-gray-100">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">FAQ</h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-4 md:mb-8">
            Find answers to common questions
          </p>
          <div className="max-w-2xl mx-auto relative mb-4 md:mb-8">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full p-3 md:p-4 pr-12 rounded-lg text-black text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-orange-500 hover:text-white text-sm md:text-base px-4 md:px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-6 md:py-16 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            <div className="lg:w-1/4">
              <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg shadow-md p-4 md:p-6 md:sticky md:top-4">
                <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white md:text-black">Categories</h3>
                <nav>
                  <ul className="flex flex-wrap md:flex-col gap-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`text-left py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-colors text-xs md:text-base ${
                            activeCategory === category.id
                              ? "bg-orange-500 md:bg-orange-100 text-white md:text-orange-500 font-medium"
                              : "text-gray-400 md:text-gray-700 hover:bg-gray-800 md:hover:bg-gray-100"
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="lg:w-3/4">
              {filteredFAQs.length === 0 ? (
                <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg shadow-md p-6 md:p-8 text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white md:text-black">No Results Found</h3>
                  <p className="text-gray-400 md:text-gray-600 mb-4 text-sm md:text-base">
                    We couldn&apos;t find any questions matching your search criteria.
                  </p>
                  <Button onClick={() => { setSearchTerm(""); setActiveCategory("all"); }} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg shadow-md overflow-hidden border border-gray-800 md:border-none">
                      <button className="w-full text-left p-4 md:p-6 font-bold text-sm md:text-lg flex justify-between items-center text-white md:text-black" onClick={() => toggleQuestion(faq.id)}>
                        {faq.question}
                        {expandedQuestions.includes(faq.id) ? <Minus className="h-4 w-4 md:h-5 md:w-5 text-gray-500 flex-shrink-0" /> : <Plus className="h-4 w-4 md:h-5 md:w-5 text-gray-500 flex-shrink-0" />}
                      </button>
                      {expandedQuestions.includes(faq.id) && (
                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                          <div className="border-t border-gray-700 md:border-gray-200 pt-3 md:pt-4">
                            <p className="text-gray-400 md:text-gray-600 text-xs md:text-base">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gray-900 md:bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-white md:text-black">Still Have Questions?</h2>
          <p className="text-gray-400 md:text-gray-600 text-sm md:text-xl max-w-3xl mx-auto mb-6 md:mb-8">
            We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a href="mailto:support@teleprompter.today">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg w-full sm:w-auto">
                Contact Support
              </Button>
            </a>
            <Link href="/help">
              <Button className="bg-gray-800 md:bg-white text-white md:text-black hover:bg-gray-700 md:hover:bg-gray-200 px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg w-full sm:w-auto">
                Browse Help Center
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
