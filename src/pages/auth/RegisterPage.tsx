import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/services/query-hooks'
import { useAuth } from '@/contexts/AuthContext'
import GoogleAuth from '@/components/auth/GoogleAuth'
import { Eye, EyeOff, Sparkles } from 'lucide-react'

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
      <div className="auth-left-content">
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: 'linear-gradient(135deg, var(--sys-color-primary-40), var(--sys-color-primary-60))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
        }}>
          <Sparkles size={28} color="white" />
        </div>
        <h1 className="auth-brand-title">ContentSplit</h1>
        <p className="auth-brand-desc">Transform your content for every platform in seconds.</p>
        
        <div className="auth-features">
          {['Repurpose content instantly', 'Multi-platform optimization', 'AI-powered quality'].map((feat, i) => (
            <div key={i} className="auth-feature-item">
              <div className="auth-feature-check">✓</div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="auth-right">
      <div className="auth-form-container">
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