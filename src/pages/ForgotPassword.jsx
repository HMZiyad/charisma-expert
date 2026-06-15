import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/verify-otp')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 relative">
        {/* Close */}
        <button
          onClick={() => navigate('/login')}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
          id="forgot-close-btn"
        >
          <X size={22} />
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Forgot Password</h1>
        <p className="text-center text-gray-700 font-medium mb-8">
          Please enter your email to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="forgot-email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <input
              id="forgot-email"
              name="email"
              type="email"
              placeholder="Esteban_schiller@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button
            id="forgot-send-btn"
            type="submit"
            className="btn-blue-gradient w-full py-4 text-base"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
