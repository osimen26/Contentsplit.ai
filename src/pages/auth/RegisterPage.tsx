import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/services/query-hooks'
import { useAuth } from '@/contexts/AuthContext'
import GoogleAuth from '@/components/auth/GoogleAuth'
import { Eye, EyeOff } from 'lucide-react'
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
    <div className="auth-left">
      <div className="auth-chat-preview">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--sys-color-primary), var(--sys-color-secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Logo size={22} color="white" />
          </div>
          <div>
            <h1 className="auth-brand-title" style={{ marginBottom: 0 }}>ContentSplit</h1>
            <p className="auth-brand-tagline">Transform content for every platform</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="auth-chat-label">Live Demo</div>
          <div className="auth-chat-bubble user">
            Turn my blog post into social media posts
          </div>
          
          <div className="auth-chat-bubble ai">
            <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--sys-color-neutral-10)' }}>Platforms ready:</div>
            <div className="auth-chat-bubble platforms">
              <span className="auth-platform-tag">Twitter</span>
              <span className="auth-platform-tag">LinkedIn</span>
              <span className="auth-platform-tag">Instagram</span>
            </div>
          </div>
          
          <div className="auth-chat-bubble user" style={{ animationDelay: '0.6s' }}>
            Perfect! Generate them now
          </div>
          
          <div className="auth-chat-bubble response" style={{ animationDelay: '1s' }}>
            <p className="auth-chat-bubble response-text">
              Your content is ready for all 3 platforms. Click any tab to copy!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="auth-right">
      <div className="auth-form-container">
        <Link to="/" className="auth-brand-header" style={{ textDecoration: 'none' }}>
          <div className="auth-brand-icon">
            <Logo size={22} color="white" />
          </div>
          <span className="auth-brand-name">ContentSplit</span>
        </Link>
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

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { mutateAsync: registerUser, isPending } = useRegister()
  const { notifyLoggedIn } = useAuth()

  const getPasswordStrength = () => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score += 25
    if (/[A-Z]/.test(password)) score += 25
    if (/[0-9]/.test(password)) score += 25
    if (/[^A-Za-z0-9]/.test(password)) score += 25
    return score
  }

  const strength = getPasswordStrength()
  const strengthClass = strength === 0 ? '' : strength <= 25 ? 'password-strength-weak' : strength <= 50 ? 'password-strength-fair' : strength <= 75 ? 'password-strength-good' : 'password-strength-strong'

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

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join ContentSplit today"
      linkText="Already have an account?"
      linkUrl="/login"
      linkLabel="Log in"
    >
      <form className="auth-form" onSubmit={handleRegister}>
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '8px',
            fontSize: '0.9rem',
            textAlign: 'center',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input
            type="text"
            className="auth-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="auth-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <input
          type="email"
          className="auth-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="auth-input-container">
          <input
            type={showPassword ? "text" : "password"}
            className="auth-input auth-password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        
        {password.length > 0 && (
          <div className="password-strength">
            <div className={`password-strength-fill ${strengthClass}`}></div>
          </div>
        )}

        <label className="auth-terms">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <span>I agree to the <Link to="/terms" className="auth-link">Terms</Link> and <Link to="/privacy" className="auth-link">Privacy Policy</Link></span>
        </label>

        <button type="submit" className="auth-primary-btn" disabled={isPending}>
          {isPending ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-divider">
        <span className="auth-divider-text">OR CONTINUE WITH</span>
      </div>

      <div className="auth-social-buttons">
        <GoogleAuth buttonText="Google" />
      </div>
    </AuthLayout>
  )
}

export default RegisterPage