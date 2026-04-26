import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Toast } from '@components/ui'
import { apiClient } from '@/services/api-client'
import { Logo } from '@components/application'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  linkText: string
  linkUrl: string
  linkLabel: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkUrl,
  linkLabel,
}) => (
  <div className="auth-split-container">
    <div className="auth-right">
      <div className="auth-form-container">
        <div className="auth-brand-header">
          <div className="auth-brand-icon">
            <Logo size={22} color="white" />
          </div>
          <span className="auth-brand-name">ContentSplit</span>
        </div>
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
        <p className="auth-link-text">
          {linkText} <Link to={linkUrl} className="auth-link">{linkLabel}</Link>
        </p>
      </div>
    </div>
  </div>
)

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

  if (!token || !email) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="This password reset link is invalid or has expired"
        linkText="Need a new link?"
        linkUrl="/recover"
        linkLabel="Request New Link"
      >
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
            This password reset link is invalid or has expired.
          </p>
          <Link to="/recover" className="auth-primary-btn" style={{ width: '100%' }}>
            Request New Link
          </Link>
        </div>
      </AuthLayout>
    )
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Password Reset"
        subtitle="Your password has been reset successfully"
        linkText="Ready to log in?"
        linkUrl="/login"
        linkLabel="Go to Login"
      >
        <div style={{ textAlign: 'center' }}>
          <CheckCircle 
            size={64} 
            color="var(--sys-color-roles-success-color-role-success-color-role)" 
            style={{ margin: '0 auto 24px' }} 
          />
          <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <Link to="/login" className="auth-primary-btn" style={{ width: '100%' }}>
            Go to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Enter your new password below"
      linkText="Remember your password?"
      linkUrl="/login"
      linkLabel="Log in"
    >
      <Lock 
        size={64} 
        color="var(--sys-color-roles-primary-color-role-primary-role)" 
        style={{ margin: '0 auto 24px', display: 'block' }} 
      />
      <form onSubmit={handleSubmit} className="auth-form">
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

        <button type="submit" className="auth-primary-btn" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          position="bottom-center" 
          onClose={() => setToast(null)} 
        />
      )}
    </AuthLayout>
  )
}

export default ResetPasswordPage