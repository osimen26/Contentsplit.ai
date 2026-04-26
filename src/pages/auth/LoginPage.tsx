import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/services/query-hooks'

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
    } catch (err: any) {
      console.error(err)
      const errorMessage = err.response?.data?.error || err.message || ''
      if (errorMessage.includes('Invalid credentials') || errorMessage.includes('401')) {
        setError('Invalid email or password. Please check your credentials.')
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
        <button type="button" className="social-button">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Google
        </button>
      </div>
    </div>
  )
}

export default LoginPage
