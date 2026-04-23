import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/services/query-hooks'

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { mutateAsync: registerUser, isPending } = useRegister()

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
      navigate('/onboarding')
    } catch (err: unknown) {
      console.error('Registration error:', err)
      const errorMessage = err instanceof Error ? err.message : ''
      if (errorMessage.includes('already registered') || errorMessage.includes('Email already')) {
        setError('An account with this email already exists. Please log in or use a different email.')
      } else if (errorMessage.includes('Password must be at least 8')) {
        setError('Password must be at least 8 characters.')
      } else {
        setError('Registration failed. Please try again.')
      }
    }
  }

  return (
    <div className="login-card">
      <h1 className="login-title">Create Account</h1>
      <p className="login-subtitle">Join ContentSplit today</p>
      
      <div className="registration-stepper">
        <div className="registration-step">
          <div className="step-indicator active">1</div>
          <span className="step-label active">Account</span>
        </div>
        <div className="registration-step">
          <div className="step-indicator">2</div>
          <span className="step-label">Details</span>
        </div>
        <div className="registration-step">
          <div className="step-indicator">3</div>
          <span className="step-label">Complete</span>
        </div>
      </div>

      <form className="login-form" onSubmit={handleRegister}>
        {error && (
          <div className="auth-error" style={{ color: 'var(--sys-color-roles-error-color-role-error-role)', fontSize: '0.875rem', marginBottom: '8px', textAlign: 'center', gridColumn: '1 / -1' }}>
            {error}
          </div>
        )}
        <div className="registration-form">
          <div className="login-input-container">
            <input 
              type="text" 
              className="login-input" 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="login-input-container">
            <input 
              type="text" 
              className="login-input" 
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="login-input-container registration-field-full">
            <input 
              type="email" 
              className="login-input" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="login-input-container registration-field-full">
            <input 
              type="password" 
              className="login-input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password.length > 0 && (
              <div className="password-strength">
                <div className={`password-strength-fill ${strengthClass}`}></div>
              </div>
            )}
            <div className="password-requirements">
              <div className={`password-requirement ${password.length >= 8 ? 'met' : ''}`}>
                8+ characters
              </div>
              <div className={`password-requirement ${/[A-Z]/.test(password) && /[0-9]/.test(password) ? 'met' : ''}`}>
                Uppercase letter & number
              </div>
            </div>
          </div>

          <div className="registration-terms">
            <label className="terms-checkbox">
              <input 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span className="terms-text">
                I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </span>
            </label>
          </div>
        </div>

        <button type="submit" className="login-primary-action" disabled={isPending}>
          {isPending ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="login-secondary-actions" style={{ justifyContent: 'center' }}>
          <span style={{ fontSize: 'var(--sys-typography-body-small-text-font-size)', color: 'var(--sys-color-neutral-60)' }}>
            Already have an account? <Link to="/login" className="login-link">Log in</Link>
          </span>
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

export default RegisterPage
