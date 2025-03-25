"use client"

import Link from "next/link"
import { ArrowLeft, Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Have questions or need help? We're here for you
          </p>
          <Link href="/">
            <Button variant="outline" className="text-white border-white hover:bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Contact Info */}
              <div className="bg-gray-900 text-white p-8 md:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form or contact us directly using the information below.
                </p>
                
                <div className="space-y-6">
                  <ContactInfo 
                    icon={<Mail className="h-6 w-6 text-orange-500" />}
                    title="Email Us"
                    content="support@teleprompter.today"
                    link="mailto:support@teleprompter.today"
                  />
                  
                  <ContactInfo 
                    icon={<MessageCircle className="h-6 w-6 text-orange-500" />}
                    title="Live Chat"
                    content="Available 9AM - 5PM ET"
                    link="#"
                  />
                  
                  <ContactInfo 
                    icon={<MapPin className="h-6 w-6 text-orange-500" />}
                    title="Office"
                    content="123 Innovation Drive, Tech City, TC 12345"
                  />
                  
                  <ContactInfo 
                    icon={<Clock className="h-6 w-6 text-orange-500" />}
                    title="Working Hours"
                    content="Monday - Friday, 9AM - 5PM ET"
                  />
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <span className="sr-only">YouTube</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="p-8 md:w-2/3">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Describe your issue or question in detail..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-bold mb-2">What are your support hours?</h3>
              <p className="text-gray-600">
                Our support team is available Monday through Friday, 9AM to 5PM Eastern Time. We strive to respond to all inquiries within 24 business hours.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-bold mb-2">How do I request a feature?</h3>
              <p className="text-gray-600">
                You can request new features by filling out the contact form on this page. Please be as detailed as possible about the feature you'd like to see and how it would benefit your workflow.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-bold mb-2">Do you offer phone support?</h3>
              <p className="text-gray-600">
                Phone support is available for Enterprise plan customers. If you're on a different plan, please use our contact form or live chat for assistance.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <Link href="/faq">
                <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactInfo({ 
  icon, 
  title, 
  content, 
  link 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  link?: string;
}) {
  const ContentComponent = link ? 'a' : 'div';
  const contentProps = link ? { href: link, className: "hover:text-orange-400" } : {};
  
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <ContentComponent {...contentProps}>
          <p className="text-gray-400">{content}</p>
        </ContentComponent>
      </div>
    </div>
  );
} 