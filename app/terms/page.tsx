"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-gray-100">
      <header className="bg-black text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Terms of Service</h1>
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
              <h2 className="text-white md:text-black text-lg md:text-2xl">1. Agreement to Terms</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                By accessing or using Teleprompter.today (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">2. Description of Service</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                Teleprompter.today provides an online teleprompter service that allows users to create, edit, and display scripts for presentations, speeches, videos, and other content.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">3. User Content</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                The Service allows you to create, upload, store, and share content. You retain all rights in, and are solely responsible for, your User Content.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">4. Prohibited Uses</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">You agree not to use the Service:</p>
              <ul className="text-gray-300 md:text-gray-700 text-xs md:text-base space-y-1">
                <li>For any unlawful purpose or to violate any laws</li>
                <li>To infringe on intellectual property rights</li>
                <li>To transmit harmful or objectionable material</li>
                <li>To interfere with or disrupt the Service</li>
              </ul>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">5. Intellectual Property</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                The Service and its original content, features, and functionality are the exclusive property of Teleprompter.today and its licensors.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">6. Limitation of Liability</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                In no event shall Teleprompter.today be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">7. Disclaimer</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind.
              </p>

              <h2 className="text-white md:text-black text-lg md:text-2xl mt-6">8. Contact Us</h2>
              <p className="text-gray-300 md:text-gray-700 text-xs md:text-base">
                If you have questions about these Terms, please contact us at:<br />
                Email: legal@teleprompter.today
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8 bg-gray-900 md:bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
            <Link href="/privacy">
              <Button className="bg-gray-800 md:bg-gray-200 text-gray-300 md:text-gray-800 hover:bg-orange-500 hover:text-white md:hover:bg-gray-300 w-full md:w-auto text-sm px-4 py-2">
                Privacy Policy
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
