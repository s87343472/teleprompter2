"use client"

import Link from "next/link"
import { ArrowLeft, Search, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  // Categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "getting-started", name: "Getting Started" },
    { id: "features", name: "Features & Usage" },
    { id: "troubleshooting", name: "Troubleshooting" }
  ];

  // FAQ data
  const faqData = [
    {
      id: "q1",
      category: "getting-started",
      question: "What is Teleprompter.today?",
      answer: "Teleprompter.today is a free online teleprompter system designed for content creators, speakers, and professionals. It helps you deliver smooth presentations by displaying your script at a controlled pace directly in your browser."
    },
    {
      id: "q2",
      category: "getting-started",
      question: "Do I need to create an account to use the teleprompter?",
      answer: "No, you can use all teleprompter features without creating an account. Simply visit the website and start using it immediately."
    },
    {
      id: "q3",
      category: "getting-started",
      question: "Can I use Teleprompter.today on mobile devices?",
      answer: "Yes, Teleprompter.today is fully responsive and works on desktop computers, tablets, and smartphones. The interface adapts to different screen sizes for optimal viewing."
    },
    {
      id: "q4",
      category: "features",
      question: "How do I adjust the scrolling speed?",
      answer: "You can adjust the scrolling speed using the speed control buttons in the control panel or by pressing the up/down arrow keys on your keyboard. Remote control feature from a second device is coming soon."
    },
    {
      id: "q5",
      category: "features",
      question: "What keyboard shortcuts are available?",
      answer: "We offer several keyboard shortcuts for efficient control: Space = Play/Pause, Arrow Up/Down = Adjust Speed, Arrow Left/Right = Previous/Next Line, Esc = Exit Playback, H = Hide Controls."
    },
    {
      id: "q6",
      category: "features",
      question: "Can I format my text?",
      answer: "Currently, we support basic text display. Text formatting features like bold, italics, and custom fonts are planned for future updates."
    },
    {
      id: "q7",
      category: "features",
      question: "Is it possible to control the teleprompter from another device?",
      answer: "Remote control functionality is currently under development and will be available soon. This feature will allow you to control the teleprompter from a second device, which is particularly useful for presentations."
    },
    {
      id: "q8",
      category: "troubleshooting",
      question: "The teleprompter is lagging or stuttering. How can I fix this?",
      answer: "Performance issues can be caused by various factors. Try refreshing the page, using a more recent browser version, closing other resource-intensive applications, or switching to a device with better performance."
    },
    {
      id: "q9",
      category: "troubleshooting",
      question: "How do I report a bug or request a feature?",
      answer: "You can report bugs or request features through our Contact page. Please provide as much detail as possible, including steps to reproduce the issue, your device/browser information, and any error messages you received."
    },
    {
      id: "q10",
      category: "troubleshooting",
      question: "The text isn't displaying correctly on my screen. What should I do?",
      answer: "Try adjusting the font size and line spacing in the settings panel. If the issue persists, you might need to check your browser's zoom level or try a different browser."
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Toggle question expansion
  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => 
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Find answers to common questions about our teleprompter service
          </p>
          <div className="max-w-2xl mx-auto relative mb-8">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full p-4 pr-12 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-500 w-5 h-5" />
            </div>
          </div>
          <Link href="/">
            <Button 
              variant="default"
              className="bg-white text-black hover:bg-orange-500 hover:text-white border-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <nav>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                            activeCategory === category.id 
                              ? "bg-orange-100 text-orange-500 font-medium" 
                              : "text-gray-700 hover:bg-gray-100"
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

            {/* FAQ List */}
            <div className="lg:w-3/4">
              {filteredFAQs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">No Results Found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any questions matching your search criteria.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div 
                      key={faq.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button 
                        className="w-full text-left p-6 font-bold text-lg flex justify-between items-center"
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        {faq.question}
                        {expandedQuestions.includes(faq.id) ? (
                          <Minus className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <Plus className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedQuestions.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-600">{faq.answer}</p>
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

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-8">
            We're here to help! If you couldn't find what you were looking for, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Contact Support
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-200 px-8 py-3 text-lg">
                Browse Help Center
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 