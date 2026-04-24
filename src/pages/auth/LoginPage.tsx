import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/query-hooks'
import GoogleAuth from '@/components/auth/GoogleAuth'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      // Axios wraps the real server message in err.response.data.error
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
    <div className="login-card">
      <h1 className="login-title">Welcome back</h1>
      <p className="login-subtitle">Log in to ContentSplit to continue</p>
      
      <form className="login-form" onSubmit={handleLogin}>
        {error && (
          <div className="auth-error" style={{ color: 'var(--sys-color-roles-error-color-role-error-role)', fontSize: '0.875rem', marginBottom: '8px', textAlign: 'center' }}>
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
            type="password" 
            className="login-input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-primary-action" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log In'}
        </button>

        <div className="login-secondary-actions">
          <Link to="/register" className="login-link">Create account</Link>
          <Link to="/recover" className="login-link">Forgot password?</Link>
        </div>
      </form>

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
