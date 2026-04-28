import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiClient } from '@/services/api-client'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

const PaymentCallbackPage: React.FC = () => {
  const { reference } = useParams<{ reference: string }>()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('Verifying your payment...')

  useEffect(() => {
    if (!reference) {
      setStatus('error')
      setMessage('No payment reference found.')
      return
    }

    const verifyPayment = async () => {
      try {
        const data = await apiClient.verifyPayment(reference)
        
        if (data.status === 'success') {
          setStatus('success')
          setMessage(`Payment successful! You are now on the ${data.tier} plan.`)
          
          // Redirect to settings after 3 seconds
          setTimeout(() => {
            navigate('/dashboard/settings')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.message || 'Payment verification failed.')
        }
      } catch (err: any) {
        console.error('Payment verification error:', err)
        setStatus('error')
        setMessage(err?.response?.data?.error || 'Payment verification failed. Please contact support.')
      }
    }

    verifyPayment()
  }, [reference, navigate])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: 'var(--sys-color-neutral-99)',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '48px 40px',
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
      }}>
        {status === 'verifying' && (
          <>
            <Loader2 size={48} style={{ color: 'var(--sys-color-primary)', animation: 'spin 1s linear infinite', marginBottom: 24 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: 'var(--sys-color-neutral-10)' }}>
              Verifying Payment
            </h2>
            <p style={{ color: 'var(--sys-color-neutral-50)', fontSize: '0.95rem' }}>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={48} style={{ color: '#10b981', marginBottom: 24 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: 'var(--sys-color-neutral-10)' }}>
              Payment Successful!
            </h2>
            <p style={{ color: 'var(--sys-color-neutral-50)', fontSize: '0.95rem', marginBottom: 24 }}>
              {message}
            </p>
            <p style={{ color: 'var(--sys-color-neutral-60)', fontSize: '0.85rem' }}>
              Redirecting to settings...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={48} style={{ color: '#ef4444', marginBottom: 24 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: 'var(--sys-color-neutral-10)' }}>
              Payment Failed
            </h2>
            <p style={{ color: 'var(--sys-color-neutral-50)', fontSize: '0.95rem', marginBottom: 24 }}>
              {message}
            </p>
            <button
              onClick={() => navigate('/dashboard/settings')}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'var(--sys-color-primary)',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              Go to Settings
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default PaymentCallbackPage
