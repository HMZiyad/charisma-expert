import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login flow
    login({
      name: 'Sarah Jenkins',
      badge: 'NYPD-7492',
      email: form.email || 'officer@aaat.com',
      rank: 'Detective',
      plan: 'Detective Plan'
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 relative">
        {/* Close */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
          id="login-close-btn"
        >
          <X size={22} />
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Login to Account</h1>
        <p className="text-center text-gray-700 font-medium mb-8">
          Please enter your email and password to continue
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="Esteban_schiller@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="input-field pr-12"
                required
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
            id="login-submit-btn"
            type="submit"
            className="btn-blue-gradient w-full py-4 text-base rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
            }}
          >
            Sign In
          </button>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-blue-600"
                id="remember-me"
              />
              <span className="text-blue-600 font-medium">Remember me ?</span>
            </label>
            <Link to="/forgot-password" className="text-blue-600 font-medium hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>

        <p className="text-center text-gray-700 text-sm mt-7">
          don't have an account{' '}
          <Link to="/signup" className="font-bold text-gray-900 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
