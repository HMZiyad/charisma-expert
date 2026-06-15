import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

const OTP_LENGTH = 5

export default function OTPVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const isFromSignUp = location.state?.fromSignUp
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const inputs = useRef([])

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFromSignUp) {
      navigate('/login')
    } else {
      navigate('/reset-password')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 relative">
        {/* Close */}
        <button
          onClick={() => navigate(isFromSignUp ? '/signup' : '/forgot-password')}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
          id="otp-close-btn"
        >
          <X size={22} />
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Check Your Email</h1>
        <p className="text-center text-gray-700 font-medium mb-8 leading-relaxed">
          We sent a {isFromSignUp ? 'verification code' : 'reset link'} to contact@dscode…com<br />
          enter 5-digit code that mentioned in the email
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* OTP Boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          <button
            id="otp-verify-btn"
            type="submit"
            className="btn-blue-gradient w-full py-4 text-base"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  )
}
