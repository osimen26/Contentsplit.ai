import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Send, CheckCircle2, Inbox } from 'lucide-react'
import { apiClient } from '@/services/api-client'
import { Logo } from '@components/application'
import '@/styles/auth.css'

const RecoverPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError('')
    try {
      const response = await apiClient.request<{ debug?: unknown }>({
        url: '/auth/recover',
        method: 'POST',
        data: { email },
      })
      if (response?.debug) {
        console.log('Recovery link (dev mode):', response.debug)
      }
      setIsSubmitted(true)
    } catch (err) {
      console.error('Recovery error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-split-container">
      <div className="auth-right" style={{ maxWidth: '100%', width: '100%' }}>
        <div className="auth-form-container">

          {/* Brand header */}
          <Link to="/" className="auth-brand-header" style={{ textDecoration: 'none' }}>
            <div className="auth-brand-icon">
              <Logo size={22} color="white" />
            </div>
            <span className="auth-brand-name">ContentSplit</span>
          </Link>

          {!isSubmitted ? (
            /* ── Request Form ── */
            <div style={{ animation: 'authFadeUp 0.4s ease both' }}>
              {/* Icon */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
              }}>
                <Mail size={32} color="#6366f1" strokeWidth={1.5} />
              </div>

              <h1 className="auth-title">Forgot your password?</h1>
              <p className="auth-subtitle" style={{ marginBottom: 32 }}>
                No worries! Enter your email and we'll send you a secure link to reset it.
              </p>

              <form onSubmit={handleSubmit} className="auth-form">
                {error && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textAlign: 'center',
                  }}>
                    {error}
                  </div>
                )}

                <div className="auth-input-container">
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    style={{ textAlign: 'left' }}
                  />
                </div>

                <button
                  type="submit"
                  className="auth-primary-btn"
                  disabled={isLoading || !email}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  {isLoading ? (
                    <>
                      <span style={{
                        width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite'
                      }} />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              <p className="auth-link-text" style={{ marginTop: 24 }}>
                <Link to="/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <ArrowLeft size={14} />
                  Back to Login
                </Link>
              </p>
            </div>
          ) : (
            /* ── Success State ── */
            <div style={{ animation: 'authFadeUp 0.4s ease both', textAlign: 'center' }}>
              {/* Animated success icon */}
              <div style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(16,185,129,0.12))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
              }}>
                <CheckCircle2 size={44} color="#16a34a" strokeWidth={1.5} />
              </div>

              <h1 className="auth-title">Check your inbox</h1>
              <p className="auth-subtitle" style={{ marginBottom: 8 }}>
                We sent a password reset link to
              </p>
              <p style={{
                fontWeight: 700,
                color: '#4f46e5',
                fontSize: '1rem',
                marginBottom: 32,
                wordBreak: 'break-all',
              }}>
                {email}
              </p>

              {/* Tip box */}
              <div style={{
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.12)',
                borderRadius: 14,
                padding: '16px 20px',
                marginBottom: 28,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                textAlign: 'left',
              }}>
                <Inbox size={20} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  The link expires in <strong>1 hour</strong>. If you don't see the email, check your spam or junk folder.
                </p>
              </div>

              <Link to="/login" className="auth-primary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
                <ArrowLeft size={16} />
                Return to Login
              </Link>

              <button
                onClick={() => { setIsSubmitted(false); setEmail('') }}
                style={{
                  background: 'none', border: 'none', marginTop: 16,
                  color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer',
                  textDecoration: 'underline', fontFamily: 'inherit',
                }}
              >
                Use a different email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecoverPage