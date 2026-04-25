import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/query-hooks'
import GoogleAuth from '@/components/auth/GoogleAuth'
import { Eye, EyeOff } from 'lucide-react'

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
    } catch (err: any) {
      console.error(err)
      const errorMessage = err.response?.data?.error || err.message || ''
      if (errorMessage.includes('Invalid credentials') || errorMessage.includes('401')) {
      // Axios wraps the real server message in err.response.data.error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const serverMsg: string = (err as any)?.response?.data?.error || (err instanceof Error ? err.message : '')
      if (serverMsg.includes('Invalid credentials')) {
        setError('Invalid email or password. Please check your credentials.')
      } else if (serverMsg.includes('connect') || serverMsg.includes('Network') || !serverMsg) {
        setError('Cannot reach the server. Make sure the backend is running.')
      } else {
        setError(errorMessage || 'Failed to login. Please try again.')
      }
    }
  }

  return (
    <div className="login-card">
      <h1 className="login-title">Welcome back</h1>
      <p className="login-subtitle">Log in to ContentSplit to continue</p>
      
      <form className="login-form" onSubmit={handleLogin}>
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
        <div className="login-input-container">
          <input 
            type="email" 
            className="login-input" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="login-input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            className="login-input password-input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="login-primary-action" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="login-secondary-actions">
        <Link to="/register" className="login-link">Create account</Link>
        <Link to="/recover" className="login-link">Forgot password?</Link>
      </div>

      <div className="login-divider">
        <span className="login-divider-text">OR CONTINUE WITH</span>
      </div>

      <div className="social-auth-buttons">
        <GoogleAuth buttonText="Google" />
      </div>
    </div>
  )
}

export default LoginPage
