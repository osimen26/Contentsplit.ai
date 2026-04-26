import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/query-hooks'
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
    {/* Left side - Branding */}
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

    {/* Right side - Form */}
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { mutateAsync: login, isPending } = useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err: unknown) {
      console.error(err)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const serverMsg: string = (err as any)?.response?.data?.error || (err instanceof Error ? err.message : '')
      if (serverMsg.includes('Invalid credentials')) {
        setError('Invalid email or password. Please check your credentials.')
      } else if (serverMsg.includes('connect') || serverMsg.includes('Network') || !serverMsg) {
        setError('Cannot reach the server. Make sure the backend is running.')
      } else {
        setError(serverMsg || 'Failed to login. Please try again.')
      }
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to ContentSplit to continue"
      linkText="Don't have an account?"
      linkUrl="/register"
      linkLabel="Create account"
    >
      <form className="auth-form" onSubmit={handleLogin}>
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '8px',
            fontSize: '0.9rem',
            textAlign: 'center',
            marginBottom: '4px',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}
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

        <Link to="/recover" className="auth-forgot-link">Forgot password?</Link>

        <button type="submit" className="auth-primary-btn" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log In'}
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

export default LoginPage