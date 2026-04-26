import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle } from 'lucide-react'
import { Toast } from '@components/ui'
import { apiClient } from '@/services/api-client'

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
    <div className="login-container" style={{ padding: '0px' }}>
      <div className="login-card" style={{ maxWidth: '400px' }}>
        {isSubmitted ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle 
              size={64} 
              color="var(--sys-color-roles-success-color-role-success-color-role)" 
              style={{ margin: '0 auto 24px' }} 
            />
            <h2 className="login-title" style={{ marginBottom: '16px' }}>Check your email</h2>
            <p className="login-subtitle" style={{ marginBottom: '24px' }}>
              We've sent password recovery instructions to <strong>{email}</strong>.
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
            <h2 className="login-title" style={{ marginBottom: '8px' }}>Recover Password</h2>
            <p className="login-subtitle" style={{ marginBottom: '32px' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div style={{ position: 'relative' }}>
                <span className="login-label floating">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  required
                />
              </div>
              <button type="submit" className="login-primary-action" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Recovery Email'}
              </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link to="/login" className="login-link">Back to Login</Link>
            </div>
          </>
        )}
      </div>

      {isToastVisible && (
        <Toast 
          message="Recovery email sent successfully!" 
          type="success" 
          position="bottom-center" 
          onClose={() => setIsToastVisible(false)} 
        />
      )}
    </div>
  )
}

export default RecoverPage
