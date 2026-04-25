import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useGoogleAuthMutation } from '@/services/query-hooks'
import { useAuth } from '@/contexts/AuthContext'

interface GoogleAuthProps {
  buttonText?: string
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ buttonText = 'Continue with Google' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const googleAuthMutation = useGoogleAuthMutation()
  const { setTokenExists, refetch } = useAuth()
  const navigate = useNavigate()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true)
        setError(null)
        // Note: we are passing the access token to backend which will verify it.
        // Or if we need an id_token, we should use GoogleLogin component or Implicit Flow.
        // Wait, useGoogleLogin by default returns an access_token. Let's send the access_token.
        // Actually, the easiest way to get an id_token is using the credentialResponse from <GoogleLogin />.
        // But for custom buttons, we can get the access token, and the backend can fetch user info.
        
        await googleAuthMutation.mutateAsync({ access_token: tokenResponse.access_token })
        
        setTokenExists(true)
        await refetch()
        navigate('/onboarding')
      } catch (err: unknown) {
        console.error('Google auth error:', err)
        const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
        setError(errorMessage || 'Failed to authenticate with Google')
      } finally {
        setIsLoading(false)
      }
    },
    onError: (errorResponse) => {
      console.error('Google login failed', errorResponse)
      setError('Google Sign-In was cancelled or failed.')
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
      {error && (
        <div style={{ 
          padding: '10px 12px', 
          backgroundColor: '#fee2e2', 
          color: '#b91c1c', 
          borderRadius: '8px', 
          fontSize: '0.85rem' 
        }}>
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {isLoading ? 'Connecting...' : buttonText}
      </button>
    </div>
  )
}

export default GoogleAuth
