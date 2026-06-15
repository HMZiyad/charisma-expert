import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X } from 'lucide-react'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to OTP verification instead of directly to login
    navigate('/verify-otp', { state: { fromSignUp: true } })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 relative">
        {/* Close */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
          id="signup-close-btn"
        >
          <X size={22} />
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Create a new Account</h1>
        <p className="text-center text-gray-700 font-medium mb-8">
          Please enter your information to create account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-username" className="block text-sm font-semibold text-gray-800 mb-2">
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="Enter name here"
              value={form.username}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Esteban_schiller@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="signup-phone" className="block text-sm font-semibold text-gray-800 mb-2">
              Phone
            </label>
            <input
              id="signup-phone"
              name="phone"
              type="tel"
              placeholder="Enter phone"
              value={form.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="input-field pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            id="signup-submit-btn"
            type="submit"
            className="btn-blue-gradient w-full py-4 text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-7">
          Already have a account{' '}
          <Link to="/login" className="font-bold text-gray-900 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
