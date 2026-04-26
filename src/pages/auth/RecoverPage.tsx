import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle } from 'lucide-react'
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

const RecoverPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    try {
      const response = await apiClient.request<{ debug?: unknown }>({
        url: '/auth/recover',
        method: 'POST',
        data: { email },
      })
      console.log('Recovery response:', response)
      if (response?.debug) {
        alert('Debug info: ' + JSON.stringify(response.debug, null, 2))
      }
      setIsSubmitted(true)
      setIsToastVisible(true)
    } catch (err) {
      console.error('Recovery error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Recover Password"
      subtitle="Enter your email to reset your password"
      linkText="Remember your password?"
      linkUrl="/login"
      linkLabel="Log in"
    >
      {isSubmitted ? (
        <div style={{ textAlign: 'center' }}>
          <CheckCircle 
            size={64} 
            color="var(--sys-color-roles-success-color-role-success-color-role)" 
            style={{ margin: '0 auto 24px' }} 
          />
          <h2 className="auth-title" style={{ marginBottom: '16px' }}>Check your email</h2>
          <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
            We've sent password recovery instructions to <strong>{email}</strong>.
          </p>
          <Link 
            to="/login" 
            className="auth-primary-btn"
            style={{ width: '100%' }}
          >
            Return to Login
          </Link>
        </div>
      ) : (
        <>
          <Mail 
            size={64} 
            color="var(--sys-color-roles-primary-color-role-primary-role)" 
            style={{ margin: '0 auto 24px', display: 'block' }} 
          />
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-container">
              <input
                type="email"
                className="auth-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-primary-btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Recovery Email'}
            </button>
          </form>
        </>
      )}

      {isToastVisible && (
        <Toast 
          message="Recovery email sent successfully!" 
          type="success" 
          position="bottom-center" 
          onClose={() => setIsToastVisible(false)} 
        />
      )}
    </AuthLayout>
  )
}

export default RecoverPage