import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/services/query-hooks'
import { useAuth } from '@/contexts/AuthContext'
import AuthLayout from '@/components/layout/AuthLayout'
import { Eye, EyeOff } from 'lucide-react'

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { mutateAsync: registerUser, isPending } = useRegister()
  const { notifyLoggedIn } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      setError('You must accept the Terms of Service to continue.')
      return
    }
    setError('')
    try {
      await registerUser({ email, password, firstName, lastName })
      notifyLoggedIn()
      navigate('/onboarding')
    } catch (err: unknown) {
      console.error('Registration error:', err)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const serverMsg: string = (err as any)?.response?.data?.error || (err instanceof Error ? err.message : '')
      if (serverMsg.includes('already registered') || serverMsg.includes('Email already')) {
        setError('An account with this email already exists. Please log in or use a different email.')
      } else if (serverMsg.includes('Password must be at least 8')) {
        setError('Password must be at least 8 characters.')
      } else if (serverMsg.includes('connect') || serverMsg.includes('Network') || !serverMsg) {
        setError('Cannot reach the server. Please make sure the backend is running.')
      } else {
        setError(serverMsg || 'Registration failed. Please try again.')
      }
    }
  }

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  }

  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif' }}>
      <AuthLayout>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[400px]">
            <Link to="/" className="flex justify-center items-center gap-2 mb-8 no-underline hover:opacity-90 transition-opacity w-full">
              <img src="/logo.svg" alt="ContentSplit" className="w-[32px] h-[32px] rounded-[8px]" />
              <span className="text-[1.4rem] font-bold text-slate-900" style={{ fontFamily: '"Syne", sans-serif' }}>ContentSplit</span>
            </Link>
            <h1 className="text-[28px] font-bold text-slate-900 mb-4 text-left w-full" style={{ fontFamily: '"Syne", sans-serif' }}>Create Account 👋</h1>
          <p className="text-[14px] text-slate-600 mb-8 text-left leading-relaxed">
            Turn your long-form content into endless social posts.<br />
            Sign up to start repurposing effortlessly.
          </p>

          <form onSubmit={handleRegister} className="w-full flex flex-col">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center mb-4 font-medium">
                {error}
              </div>
            )}
            
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[14px] font-medium text-slate-900 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 h-[44px] bg-slate-50/50 border border-slate-200 rounded-lg text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[14px] font-medium text-slate-900 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 h-[44px] bg-slate-50/50 border border-slate-200 rounded-lg text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-medium text-slate-900 mb-2">Email</label>
              <input
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 h-[44px] bg-slate-50/50 border border-slate-200 rounded-lg text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-medium text-slate-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-10 h-[44px] bg-slate-50/50 border border-slate-200 rounded-lg text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="w-4 h-4 rounded border-slate-300 text-[#111827] focus:ring-[#111827]"
                />
                <span className="text-sm text-slate-600">
                  I agree to the <Link to="/terms" className="text-[#111827] font-medium hover:underline">Terms</Link> and <Link to="/privacy" className="text-[#111827] font-medium hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full h-[44px] bg-[#111827] hover:bg-slate-800 text-white text-[15px] font-medium rounded-lg transition-colors flex justify-center items-center mb-6"
            >
              {isPending ? 'Creating Account...' : 'Sign up'}
            </button>
          </form>

          <div className="flex items-center w-full mb-6">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <span className="px-4 text-[14px] text-slate-500">Or</span>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          <button 
            onClick={handleGoogleSignUp}
            className="w-full h-[44px] bg-[#F8FAFC] hover:bg-slate-100 text-slate-700 text-[14px] font-medium rounded-lg transition-colors flex justify-center items-center gap-3 mb-8"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <p className="text-center text-[14px] text-slate-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">Log in</Link>
          </p>
          </div>
        </div>
      </AuthLayout>
    </div>
  )
}

export default RegisterPage