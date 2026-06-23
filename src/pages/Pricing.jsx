import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Lock, Loader2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { listPlans } from '../api/subscriptions'

export default function Pricing() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPlans()
      .then(({ data }) => setPlans(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

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
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No subscription plans found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 items-stretch">
              {plans.map((plan, idx) => {
                const isPopular = idx === 1 || plan.name?.toLowerCase().includes('detective');
                
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl border-2 p-10 xl:p-12 flex flex-col bg-white min-h-[600px] ${
                      isPopular
                        ? 'border-navy-800 shadow-2xl md:scale-105 z-10'
                        : 'border-gray-200 shadow-sm z-0'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-navy-800 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.display_name}</h2>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {plan.description || 'Access essential law enforcement reporting tools.'}
                      </p>
                    </div>

                    <div className="mb-10 flex items-baseline">
                      <span className="text-6xl font-extrabold text-gray-900 tracking-tight">
                        ${plan.price_monthly}
                      </span>
                      <span className="text-gray-500 text-lg font-medium ml-1">/mo</span>
                    </div>

                    <ul className="space-y-4 mb-10 flex-1">
                      <li className="flex items-center gap-3">
                        <Check size={20} className="text-emerald-500 shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">AI Incident Reports</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check size={20} className="text-emerald-500 shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">
                          {plan.document_limit === -1 ? 'Unlimited' : plan.document_limit} Document Saves / Month
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        {plan.can_search_warrant ? (
                          <Check size={20} className="text-emerald-500 shrink-0" />
                        ) : (
                          <X size={20} className="text-gray-300 shrink-0" />
                        )}
                        <span className={`text-sm ${plan.can_search_warrant ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                          AI Search Warrants
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        {plan.can_arrest_warrant ? (
                          <Check size={20} className="text-emerald-500 shrink-0" />
                        ) : (
                          <X size={20} className="text-gray-300 shrink-0" />
                        )}
                        <span className={`text-sm ${plan.can_arrest_warrant ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                          AI Arrest Warrants
                        </span>
                      </li>
                    </ul>

                    <button
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                        isPopular
                          ? 'bg-navy-800 text-white hover:bg-navy-700'
                          : 'border-2 border-gray-200 text-gray-700 hover:border-navy-800 hover:text-navy-800'
                      }`}
                    >
                      {isPopular ? 'Start Detective Plan' : 'Select Plan'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
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
                The AI Search Warrant module requires a higher tier subscription. Upgrade your account to access advanced investigative documentation tools.
              </p>
              <Link
                to="/signup"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Create Account
              </Link>
            </div>
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
