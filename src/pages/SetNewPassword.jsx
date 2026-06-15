import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X } from 'lucide-react'

export default function SetNewPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' })
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 relative">
        {/* Close */}
        <button
          onClick={() => navigate('/login')}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
          id="reset-close-btn"
        >
          <X size={22} />
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Set a new password</h1>
        <p className="text-center text-gray-700 font-medium mb-8">
          Create a new password. Ensure it differs from previous ones for security
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="new-password" className="block text-sm font-semibold text-gray-800 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                name="newPassword"
                type={showNew ? 'text' : 'password'}
                placeholder="Enter Password"
                value={form.newPassword}
                onChange={handleChange}
                className="input-field pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle new password visibility"
              >
                {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-800 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Enter Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-field pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            id="reset-submit-btn"
            type="submit"
            className="btn-blue-gradient w-full py-4 text-base"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
