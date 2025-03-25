"use client"

import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Choose the plan that works best for you and your team
          </p>
          <Link href="/">
            <Button variant="outline" className="text-white border-white hover:bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Pricing Plans */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-gray-600 mb-6">Perfect for individual creators</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500 ml-2">forever</span>
                </div>
                <Link href="/editor" className="w-full">
                  <Button className="w-full bg-gray-800 hover:bg-gray-700">Get Started</Button>
                </Link>
              </div>
              <div className="bg-gray-50 p-8">
                <h4 className="font-semibold mb-4">Features include:</h4>
                <ul className="space-y-3">
                  <PricingFeature included={true} feature="Basic teleprompter functionality" />
                  <PricingFeature included={true} feature="Speed control (0.5x - 3.0x)" />
                  <PricingFeature included={true} feature="Line tracking" />
                  <PricingFeature included={true} feature="Up to 3 saved scripts" />
                  <PricingFeature included={true} feature="Standard fonts" />
                  <PricingFeature included={false} feature="Custom fonts" />
                  <PricingFeature included={false} feature="Remote control" />
                  <PricingFeature included={false} feature="Voice commands" />
                  <PricingFeature included={false} feature="Team collaboration" />
                  <PricingFeature included={false} feature="Priority support" />
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-orange-500 transform scale-105 z-10">
              <div className="p-8">
                <div className="bg-orange-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-gray-600 mb-6">For professionals and content creators</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-gray-500 ml-2">per month</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Subscribe Now</Button>
              </div>
              <div className="bg-gray-50 p-8">
                <h4 className="font-semibold mb-4">Everything in Free, plus:</h4>
                <ul className="space-y-3">
                  <PricingFeature included={true} feature="Unlimited scripts" />
                  <PricingFeature included={true} feature="Custom fonts" />
                  <PricingFeature included={true} feature="Remote control via mobile device" />
                  <PricingFeature included={true} feature="Voice commands" />
                  <PricingFeature included={true} feature="Mirror mode" />
                  <PricingFeature included={true} feature="Script templates" />
                  <PricingFeature included={true} feature="Priority email support" />
                  <PricingFeature included={true} feature="No watermarks" />
                  <PricingFeature included={false} feature="Team collaboration" />
                  <PricingFeature included={false} feature="API access" />
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For teams and organizations</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-500 ml-2">per month</span>
                </div>
                <Button className="w-full bg-gray-800 hover:bg-gray-700">Contact Sales</Button>
              </div>
              <div className="bg-gray-50 p-8">
                <h4 className="font-semibold mb-4">Everything in Pro, plus:</h4>
                <ul className="space-y-3">
                  <PricingFeature included={true} feature="Team collaboration" />
                  <PricingFeature included={true} feature="User management" />
                  <PricingFeature included={true} feature="Script sharing & permissions" />
                  <PricingFeature included={true} feature="Script encryption" />
                  <PricingFeature included={true} feature="API access" />
                  <PricingFeature included={true} feature="White labeling" />
                  <PricingFeature included={true} feature="Premium integrations" />
                  <PricingFeature included={true} feature="24/7 dedicated support" />
                  <PricingFeature included={true} feature="Custom features on request" />
                  <PricingFeature included={true} feature="Training & onboarding" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Can I try before I buy?</h3>
                <p className="text-gray-600">
                  Absolutely! Our Free plan is always available, and you can upgrade at any time. We also offer a 14-day money-back guarantee on all paid plans.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">How does billing work?</h3>
                <p className="text-gray-600">
                  You can choose between monthly and annual billing. Annual billing gives you a 20% discount. You can cancel your subscription at any time.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Do you offer discounts?</h3>
                <p className="text-gray-600">
                  We offer special discounts for educational institutions, non-profits, and annual subscriptions. Contact our sales team for more information.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">What happens when I upgrade or downgrade?</h3>
                <p className="text-gray-600">
                  When you upgrade, you'll immediately gain access to all the features in your new plan. If you downgrade, you'll keep your current features until the end of your billing cycle.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Is there a limit to how many scripts I can create?</h3>
                <p className="text-gray-600">
                  The Free plan allows up to 3 saved scripts. Pro and Enterprise plans offer unlimited script creation and storage.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">How secure are my scripts?</h3>
                <p className="text-gray-600">
                  We take security seriously. Your data is encrypted in transit and at rest. Enterprise plans include additional script encryption options for sensitive content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Join thousands of creators and professionals who rely on our teleprompter daily
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editor">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Start For Free
              </Button>
            </Link>
            <Button variant="outline" className="text-white border-white hover:bg-gray-800 px-8 py-3 text-lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function PricingFeature({ included, feature }: { included: boolean; feature: string }) {
  return (
    <li className="flex items-start">
      {included ? (
        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
      )}
      <span className={included ? 'text-gray-700' : 'text-gray-400'}>{feature}</span>
    </li>
  )
} 