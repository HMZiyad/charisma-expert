import { Link } from 'react-router-dom'
import { Check, X, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Patrol',
    description: 'Essential reporting tools for individual patrol officers.',
    price: '$49',
    period: '/month',
    popular: false,
    ctaLabel: 'Start Patrol Plan',
    features: [
      { label: 'AI Incident Reports', included: true },
      { label: '50 Document Saves / Month', included: true },
      { label: 'Standard Support', included: true },
      { label: 'AI Search Warrants', included: false },
      { label: 'AI Arrest Warrants', included: false },
      { label: 'Admin Dashboard', included: false },
    ],
  },
  {
    name: 'Detective',
    description: 'Advanced investigative documentation for detectives.',
    price: '$99',
    period: '/month',
    popular: true,
    ctaLabel: 'Start Detective Plan',
    features: [
      { label: 'AI Incident Reports', included: true },
      { label: 'Unlimited Document Saves', included: true },
      { label: 'Priority Support', included: true },
      { label: 'AI Search Warrants', included: true },
      { label: 'AI Arrest Warrants', included: true },
      { label: 'Admin Dashboard', included: false },
    ],
  },
  {
    name: 'Department',
    description: 'Enterprise deployment for entire agencies and precincts.',
    price: 'Custom',
    period: '',
    popular: false,
    ctaLabel: 'Contact Sales',
    features: [
      { label: 'All AI Modules Included', included: true },
      { label: 'Unlimited Document Saves', included: true },
      { label: '24/7 Dedicated Support', included: true },
      { label: 'Custom Model Fine-Tuning', included: true },
      { label: 'Admin Dashboard & Analytics', included: true },
      { label: 'API Access & Integration', included: true },
    ],
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-6 bg-white text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Transparent, Secure Pricing</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Choose the plan that fits your operational needs. All plans run on our secure, isolated law enforcement infrastructure.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="w-full px-6 lg:px-10 xl:px-20 2xl:px-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl border-2 p-10 xl:p-12 flex flex-col bg-white min-h-[600px] ${
                  plan.popular
                    ? 'border-navy-800 shadow-2xl md:scale-105 z-10'
                    : 'border-gray-200 shadow-sm z-0'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-navy-800 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-10">
                  {plan.price === 'Custom' ? (
                    <span className="text-5xl font-extrabold text-gray-900 tracking-tight">Custom</span>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-6xl font-extrabold text-gray-900 tracking-tight">{plan.price}</span>
                      <span className="text-gray-500 text-lg font-medium ml-1">{plan.period}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map(({ label, included }) => (
                    <li key={label} className="flex items-center gap-3">
                      {included ? (
                        <Check size={20} className="text-emerald-500 shrink-0" />
                      ) : (
                        <X size={20} className="text-gray-300 shrink-0" />
                      )}
                      <span className={`text-sm ${included ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-navy-800 text-white hover:bg-navy-700'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-navy-800 hover:text-navy-800'
                  }`}
                >
                  {plan.ctaLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Module Locked Example */}
      <section className="py-12 bg-gray-50">
        <div className="w-full px-6 lg:px-10 xl:px-20 2xl:px-32">
          <div className="border border-gray-200 rounded-3xl p-8 xl:p-10 bg-white shadow-sm">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
              <Lock size={15} className="text-yellow-500" />
              System Notification Example
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
              <Lock size={36} className="text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Module Locked</h3>
              <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6">
                The AI Search Warrant module requires a Detective or Department tier subscription. Upgrade your account to access advanced investigative documentation tools.
              </p>
              <Link
                to="/pricing"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Upgrade Plan Now
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              * This is an example of the restriction prompt shown to Patrol-tier users attempting to access Detective-tier features.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-10 bg-white text-center">
        <p className="text-gray-500 mb-2">Have questions about billing, security, or CJIS compliance?</p>
        <Link to="/faq" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          Read our Frequently Asked Questions →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
