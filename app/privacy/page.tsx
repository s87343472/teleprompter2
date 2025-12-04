"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-gray-100">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-4 md:mb-8">
            Last Updated: March 24, 2024
          </p>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-orange-500 hover:text-white text-sm md:text-base px-4 md:px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-6 md:py-16 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gray-900 md:bg-white rounded-xl md:rounded-lg md:shadow-lg p-4 md:p-12">
            <div className="prose prose-sm md:prose-lg max-w-none prose-invert md:prose-gray">
              <h2 className="text-white md:text-black text-lg md:text-2xl">Introduction</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                At Teleprompter.today, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">Information We Collect</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">We collect the following types of information:</p>
              <ul className="text-gray-300 md:text-gray-700 text-xs md:text-base space-y-1">
                <li><strong>Account Information:</strong> Name, email address, and password when you create an account.</li>
                <li><strong>Script Content:</strong> The scripts and content you create using our service.</li>
                <li><strong>Usage Information:</strong> How you use our service, including features used and device information.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and other technical details.</li>
              </ul>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">How We Use Your Information</h2>
              <ul className="text-gray-300 md:text-gray-700 text-xs md:text-base space-y-1">
                <li>To provide and maintain our services</li>
                <li>To improve and personalize your experience</li>
                <li>To communicate with you about updates and support</li>
                <li>To monitor and analyze usage patterns</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">Data Storage and Security</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                Your data is stored on secure servers and we implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">Your Rights</h2>
              <ul className="text-gray-300 md:text-gray-700 text-xs md:text-base space-y-1">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate personal information</li>
                <li>Delete your personal information</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of certain data collection</li>
              </ul>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">Contact Us</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                If you have questions about this Privacy Policy, please contact us at:<br />
                Email: privacy@teleprompter.today
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8 bg-gray-900 md:bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
            <Link href="/terms">
              <Button className="bg-gray-800 md:bg-gray-200 text-gray-300 md:text-gray-800 hover:bg-orange-500 hover:text-white md:hover:bg-gray-300 w-full md:w-auto text-sm px-4 py-2">
                Terms of Service
              </Button>
            </Link>
            <a href="mailto:support@teleprompter.today">
              <Button className="bg-gray-800 md:bg-gray-200 text-gray-300 md:text-gray-800 hover:bg-orange-500 hover:text-white md:hover:bg-gray-300 w-full md:w-auto text-sm px-4 py-2">
                Contact Us
              </Button>
            </a>
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
