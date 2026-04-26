import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/query-hooks'
import GoogleAuth from '@/components/auth/GoogleAuth'
import { Eye, EyeOff } from 'lucide-react'

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
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>
      <div className="auth-orb auth-orb-3"></div>
      
      <div className="auth-chat-preview">
        <div>
          <h1 className="auth-brand-title">ContentSplit</h1>
          <p className="auth-brand-tagline">Transform content for every platform</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="auth-chat-label">Demo Conversation</div>
          <div className="auth-chat-bubble user">
            Convert my blog post into Twitter, LinkedIn and Instagram versions
          </div>
          
          <div className="auth-chat-bubble ai">
            <div style={{ fontWeight: 600, marginBottom: 8, color: 'white' }}>Select your platforms:</div>
            <div className="auth-chat-bubble platforms">
              <span className="auth-platform-tag">Twitter</span>
              <span className="auth-platform-tag">LinkedIn</span>
              <span className="auth-platform-tag">Instagram</span>
            </div>
          </div>
          
          <div className="auth-chat-bubble user" style={{ animationDelay: '0.8s' }}>
            Great! Generate the content
          </div>
          
          <div className="auth-chat-bubble response" style={{ animationDelay: '1.3s' }}>
            <p className="auth-chat-bubble response-text">
              "Stop writing the same content for every platform. With ContentSplit, you can adapt one piece into perfectly formatted posts for each channel in seconds."
            </p>
          </div>
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