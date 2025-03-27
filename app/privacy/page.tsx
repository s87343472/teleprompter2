"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
              <h2>Introduction</h2>
              <p>
                At Teleprompter.today, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By using our services, you consent to the practices described in this policy.
              </p>

              <h2>Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <h3>Personal Information</h3>
              <ul>
                <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
                <li><strong>Billing Information:</strong> For paid plans, we collect payment information through our secure payment processors.</li>
                <li><strong>Profile Information:</strong> Any additional information you provide in your profile, such as a profile picture or organization name.</li>
              </ul>

              <h3>Content and Usage Data</h3>
              <ul>
                <li><strong>Script Content:</strong> The scripts and content you create and store using our teleprompter service.</li>
                <li><strong>Usage Information:</strong> Information about how you use our service, including features used, frequency of use, and device information.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system, and other technical details.</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience and collect usage information.</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul>
                <li>To provide and maintain our services</li>
                <li>To process payments and manage subscriptions</li>
                <li>To improve and personalize your experience</li>
                <li>To communicate with you about service updates, offers, and support</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2>Data Storage and Security</h2>
              <p>
                Your data is stored on secure servers and we implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and content.
              </p>
              <p>
                We retain your personal information for as long as necessary to provide our services and as required by law. You can request deletion of your account and associated data at any time.
              </p>

              <h2>Sharing Your Information</h2>
              <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our services (e.g., payment processors, hosting providers).</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, safety, or property.</li>
                <li><strong>With Your Consent:</strong> In other cases with your explicit consent.</li>
              </ul>

              <h2>Your Rights and Choices</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Correct inaccurate personal information</li>
                <li>Delete your personal information</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of certain data collection and use</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@teleprompter.today.
              </p>

              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your activity on our site. You can control cookies through your browser settings, but disabling cookies may limit your ability to use some features of our service.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we discover that a child under 16 has provided us with personal information, we will promptly delete it.
              </p>

              <h2>International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take appropriate safeguards to ensure your information remains protected.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@teleprompter.today<br />
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
            <Link href="/terms">
              <Button variant="outline" className="w-full md:w-auto">
                Terms of Service
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