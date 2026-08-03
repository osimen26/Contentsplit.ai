import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Toast } from '@components/ui'
import { apiClient } from '@/services/api-client'
import AuthLayout from '@/components/layout/AuthLayout'
import '@/styles/auth.css'

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token || !email) {
      setToast({ message: 'Invalid reset link', type: 'error' })
      return
    }

    if (password !== confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' })
      return
    }

    if (password.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' })
      return
    }

    setIsLoading(true)
    try {
      await apiClient.resetPassword(email, token, password)
      setIsSuccess(true)
    } catch (err) {
      console.error('Reset password error:', err)
      setToast({ message: 'Failed to reset password. The link may have expired.', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  // Common wrapper with AuthLayout for all states
  const renderContent = (content: React.ReactNode) => (
    <div style={{ fontFamily: '"DM Sans", sans-serif' }}>
      <AuthLayout>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[400px]">
            {/* Brand header */}
            <Link to="/" className="flex justify-center items-center gap-2 mb-8 no-underline hover:opacity-90 transition-opacity w-full">
              <img src="/logo.svg" alt="ContentSplit" className="w-[32px] h-[32px] rounded-[8px]" />
              <span className="text-[1.4rem] font-bold text-slate-900" style={{ fontFamily: '"Syne", sans-serif' }}>ContentSplit</span>
            </Link>
            {content}
          </div>
        </div>
      </AuthLayout>
    </div>
  )

  if (!token || !email) {
    return renderContent(
      <div style={{ animation: 'authFadeUp 0.4s ease both', textAlign: 'center' }}>
        <h1 className="text-[28px] font-bold text-slate-900 mb-2 text-center w-full" style={{ fontFamily: '"Syne", sans-serif' }}>Invalid Link</h1>
        <p className="text-[14px] text-slate-600 mb-8 text-center leading-relaxed">
          This password reset link is invalid or has expired.
        </p>
        <Link to="/recover" className="auth-primary-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Request New Link
        </Link>
      </div>
    )
  }

  if (isSuccess) {
    return renderContent(
      <div style={{ animation: 'authFadeUp 0.4s ease both', textAlign: 'center' }}>
        <CheckCircle 
          size={64} 
          color="#16a34a" 
          style={{ margin: '0 auto 24px' }} 
        />
        <h1 className="text-[28px] font-bold text-slate-900 mb-2 text-center w-full" style={{ fontFamily: '"Syne", sans-serif' }}>Password Reset</h1>
        <p className="text-[14px] text-slate-600 mb-8 text-center leading-relaxed">
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <Link to="/login" className="auth-primary-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Go to Login
        </Link>
      </div>
    )
  }

  return renderContent(
    <div style={{ animation: 'authFadeUp 0.4s ease both' }}>
      <Lock 
        size={64} 
        color="#111827" 
        style={{ margin: '0 auto 24px', display: 'block' }} 
      />
      
      <h1 className="text-[28px] font-bold text-slate-900 mb-2 text-center w-full" style={{ fontFamily: '"Syne", sans-serif' }}>Set New Password</h1>
      <p className="text-[14px] text-slate-600 mb-8 text-center leading-relaxed">
        Enter your new password below
      </p>

      <form onSubmit={handleSubmit} className="auth-form w-full">
        <div className="auth-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            placeholder="New password"
            required
            minLength={6}
          />
          <button
            type="button"
            className="auth-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="auth-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            placeholder="Confirm password"
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="auth-primary-btn" disabled={isLoading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="auth-link-text" style={{ marginTop: 24, textAlign: 'center' }}>
        Remember your password? <Link to="/login" className="auth-link">Log in</Link>
      </p>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          position="bottom-center" 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}

export default ResetPasswordPage