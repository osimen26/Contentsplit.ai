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
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Failed to login. Please check your credentials.')
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
          <span className="social-button-google" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>G</span> Google
        </button>
        <button type="button" className="social-button">
          <span className="social-button-github" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>git</span> Github
        </button>
        <button type="button" className="social-button">
          <span className="social-button-apple" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}></span> Apple
        </button>
      </div>
    </div>
  )
}

export default LoginPage
