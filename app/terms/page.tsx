"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Teleprompter.today",
  description: "Read our terms of service to understand the rules and guidelines for using our professional teleprompter system.",
  keywords: ["terms of service", "user agreement", "legal terms", "service terms", "conditions"],
  openGraph: {
    title: "Terms of Service - Teleprompter.today",
    description: "Understand our terms of service for using our professional teleprompter system",
  }
}

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Last Updated: March 24, 2024
          </p>
          <Link href="/">
            <Button variant="outline" className="text-gray-100 border-gray-100 hover:bg-gray-800 hover:text-orange-500">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using Teleprompter.today (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Teleprompter.today provides an online teleprompter service that allows users to create, edit, and display scripts for presentations, speeches, videos, and other content. The Service may include various features, tools, and functionality, which may be modified, updated, or discontinued at our discretion.
              </p>

              <h2>3. Account Registration</h2>
              <p>
                To access certain features of the Service, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>

              <h2>4. User Content</h2>
              <p>
                The Service allows you to create, upload, store, and share content, including text, scripts, and other materials ("User Content"). You retain all rights in, and are solely responsible for, your User Content.
              </p>
              <p>
                By uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and display your User Content for the sole purpose of providing the Service to you.
              </p>
              <p>
                You represent and warrant that:
              </p>
              <ul>
                <li>You own or have the necessary rights to use and authorize us to use your User Content</li>
                <li>Your User Content does not violate any third party's intellectual property or other rights</li>
                <li>Your User Content complies with these Terms and applicable law</li>
              </ul>

              <h2>5. Prohibited Uses</h2>
              <p>
                You agree not to use the Service:
              </p>
              <ul>
                <li>For any unlawful purpose or to violate any laws or regulations</li>
                <li>To infringe on or violate the intellectual property rights or other rights of others</li>
                <li>To transmit any material that is harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>To impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity</li>
                <li>To engage in any activity that interferes with or disrupts the Service</li>
                <li>To attempt to circumvent any security measures or features of the Service</li>
                <li>To harvest, collect, or gather user data without consent</li>
              </ul>

              <h2>6. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Teleprompter.today and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Teleprompter.today.
              </p>

              <h2>7. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall Teleprompter.today, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul>
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>

              <h2>9. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@teleprompter.today<br />
                Address: 123 Innovation Drive, Tech City, TC 12345
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/privacy">
              <Button variant="outline" className="w-full md:w-auto">
                Privacy Policy
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full md:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 