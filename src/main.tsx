import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root')!)

if (!googleClientId || googleClientId === 'missing_google_client_id_fallback') {
  console.error('VITE_GOOGLE_CLIENT_ID is not set! Google OAuth will be disabled.')
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  )
}
