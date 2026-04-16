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
      // API currently only records email and password based on useRegister hook
      await registerUser({ email, password })
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Registration failed. Please try again.')
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
          <span className="social-button-google" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>G</span> Google
        </button>
        <button type="button" className="social-button">
          <span className="social-button-github" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>git</span> Github
        </button>
      </div>
    </div>
  )
}

export default RegisterPage
