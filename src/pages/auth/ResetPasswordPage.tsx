import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Toast } from '@components/ui'
import { apiClient } from '@/services/api-client'

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
      <div className="login-container" style={{ padding: '0px' }}>
        <div className="login-card" style={{ maxWidth: '400px' }}>
          <h2 className="login-title" style={{ marginBottom: '16px' }}>Invalid Link</h2>
          <p className="login-subtitle" style={{ marginBottom: '24px' }}>
            This password reset link is invalid or has expired.
          </p>
          <Link to="/recover" style={{
            display: 'inline-block',
            width: '100%',
            padding: '12px 24px',
            backgroundColor: 'var(--sys-color-roles-primary-color-role-primary-role)',
            color: 'var(--sys-color-roles-primary-color-role-on-primary-role)',
            borderRadius: '20px',
            textAlign: 'center',
            textDecoration: 'none',
            fontFamily: 'var(--sys-typography-label-small-font-family)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 'var(--sys-typography-label-small-letter-spacing)',
          }}>
            Request New Link
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="login-container" style={{ padding: '0px' }}>
        <div className="login-card" style={{ maxWidth: '400px' }}>
          <CheckCircle 
            size={64} 
            color="var(--sys-color-roles-success-color-role-success-color-role)" 
            style={{ margin: '0 auto 24px' }} 
          />
          <h2 className="login-title" style={{ marginBottom: '16px' }}>Password Reset</h2>
          <p className="login-subtitle" style={{ marginBottom: '24px' }}>
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <Link 
            to="/login" 
            style={{
              display: 'inline-block',
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'var(--sys-color-roles-primary-color-role-primary-role)',
              color: 'var(--sys-color-roles-primary-color-role-on-primary-role)',
              borderRadius: '20px',
              textAlign: 'center',
              textDecoration: 'none',
              fontFamily: 'var(--sys-typography-label-small-font-family)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 'var(--sys-typography-label-small-letter-spacing)',
            }}
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container" style={{ padding: '0px' }}>
      <div className="login-card" style={{ maxWidth: '400px' }}>
        <Lock 
          size={64} 
          color="var(--sys-color-roles-primary-color-role-primary-role)" 
          style={{ margin: '0 auto 24px', display: 'block' }} 
        />
        <h2 className="login-title" style={{ marginBottom: '8px' }}>Set New Password</h2>
        <p className="login-subtitle" style={{ marginBottom: '32px' }}>
          Enter your new password below.
        </p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div style={{ position: 'relative' }}>
            <span className="login-label floating">New password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--sys-color-text-secondary)',
                padding: '4px',
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <span className="login-label floating">Confirm password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login-input"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="login-primary-action" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/login" className="login-link">Back to Login</Link>
        </div>
      </div>

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