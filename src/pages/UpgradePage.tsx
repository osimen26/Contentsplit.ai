import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { apiClient } from '@/services/api-client'
import { useCurrentUser } from '@/services/query-hooks'

const PLANS = {
  monthly: {
    pro: { price: '$12', period: 'USD/month', note: 'billed monthly' },
    agency: { price: '$40', period: 'USD/month', note: 'billed monthly' },
  },
  yearly: {
    pro: { price: '$10', period: 'USD/month', note: 'billed annually', savings: 'Save 17%' },
    agency: { price: '$32', period: 'USD/month', note: 'billed annually', savings: 'Save 20%' },
  },
}

const FREE_FEATURES = [
  '1 conversion per day',
  'All supported platforms',
  'Basic tone options',
  'Copy to clipboard',
]

const PRO_FEATURES = [
  'Unlimited daily conversions',
  'All supported platforms',
  'Advanced tone matching',
  'Priority AI processing',
  'Early access to new platforms',
  'Content history (30 days)',
]

const AGENCY_FEATURES = [
  'Everything in Pro, plus:',
  'Up to 5 team members',
  'Unlimited content history',
  'Custom tone presets',
  'Priority support',
  'Early access to all features',
]

const PlanIcon: React.FC<{ variant: 'free' | 'pro' | 'agency' }> = ({ variant }) => {
  if (variant === 'free') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
  if (variant === 'pro') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4l2.5 8h8.5l-7 5 2.5 8-7-5-7 5 2.5-8-7-5h8.5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  )
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4l2.5 8h8.5l-7 5 2.5 8-7-5-7 5 2.5-8-7-5h8.5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="28" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

const UpgradePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: user } = useCurrentUser()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState<string | null>(null)

  const currentTier = user?.tier || 'free'

  const PAYMENT_LINKS: Record<string, string> = {
    'pro-monthly': 'https://flutterwave.com/pay/kaiatbkk5efs',
    'pro-yearly': 'https://flutterwave.com/pay/p5lme1qqkne7',
    'agency-monthly': 'https://flutterwave.com/pay/ellrx9v3v56p',
    'agency-yearly': 'https://flutterwave.com/pay/qyooicoaepeg',
  }

  const handleUpgrade = (planId: string, billingType?: 'monthly' | 'yearly') => {
    if (planId === 'free') return
    const key = `${planId}-${billingType || billing}`
    const link = PAYMENT_LINKS[key]
    if (link) {
      window.open(link, '_blank')
    }
  }

  const prices = PLANS[billing]

  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#f8f8f7',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Back button */}
      <div className="upgrade-header-nav" style={{ padding: '24px 40px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#666', fontSize: '0.9rem', fontWeight: 500,
            padding: 0, transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#111'}
          onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className="upgrade-content-container" style={{ maxWidth: 960, margin: '0 auto', padding: '0 40px 80px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 className="upgrade-title" style={{
            fontSize: '2rem', fontWeight: 700, color: '#111',
            margin: '0 0 32px', letterSpacing: '-0.02em',
          }}>
            Plans that grow with you
          </h1>

          {/* Monthly / Yearly Toggle */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 100,
            padding: 4,
            gap: 0,
          }}>
            {(['monthly', 'yearly'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: '7px 20px',
                  borderRadius: 100,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  backgroundColor: billing === b ? '#111' : 'transparent',
                  color: billing === b ? 'white' : '#555',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {b === 'monthly' ? 'Monthly' : 'Yearly'}
                {b === 'yearly' && billing !== 'yearly' && (
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: 100,
                  }}>
                    Save ~20%
                  </span>
                )}
                {b === 'yearly' && billing === 'yearly' && (
                  <span style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: 100,
                  }}>
                    Save ~20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="upgrade-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          alignItems: 'stretch',
        }}>

          {/* Free Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.09)',
            borderRadius: 16,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ color: '#555', marginBottom: 16 }}>
              <PlanIcon variant="free" />
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>Free</p>
            <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: '#888' }}>Start repurposing content</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#111' }}>$0</span>
            </div>
            <button
              disabled={currentTier === 'free'}
              style={{
                padding: '11px 0',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.15)',
                backgroundColor: 'white',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: currentTier === 'free' ? 'default' : 'pointer',
                marginBottom: 28,
                opacity: currentTier === 'free' ? 0.6 : 1,
              }}
            >
              {currentTier === 'free' ? 'Current plan' : 'Use for free'}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FREE_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={15} style={{ color: '#888', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Card */}
          <div style={{
            backgroundColor: 'white',
            border: '2px solid #111',
            borderRadius: 16,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
            {/* Monthly/Yearly pill on card */}
            <div className="pro-card-pill" style={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 4,
              backgroundColor: '#f4f4f5',
              padding: 3,
              borderRadius: 100,
            }}>
              {(['monthly', 'yearly'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 100,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: billing === b ? 'white' : 'transparent',
                    color: billing === b ? '#111' : '#888',
                    boxShadow: billing === b ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {b === 'monthly' ? 'Monthly' : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Yearly
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>·Save 17%</span>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div style={{ color: '#111', marginBottom: 16 }}>
              <PlanIcon variant="pro" />
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>Pro</p>
            <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: '#888' }}>Create content at scale</p>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#111' }}>{prices.pro.price}</span>
              <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 6 }}>{prices.pro.period}</span>
            </div>
            <p style={{ margin: '0 0 20px', fontSize: '0.8rem', color: '#aaa' }}>{prices.pro.note}</p>
            <button
              onClick={() => handleUpgrade('pro')}
              disabled={loading === 'pro' || currentTier === 'pro'}
              style={{
                padding: '11px 0',
                borderRadius: 8,
                border: 'none',
                backgroundColor: 'var(--sys-color-primary-40, #6366f1)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: currentTier === 'pro' ? 'default' : 'pointer',
                marginBottom: 28,
                opacity: loading === 'pro' ? 0.7 : 1,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (currentTier !== 'pro' && !loading) {
                  e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-30, #4f46e5)'
                }
              }}
              onMouseLeave={e => {
                if (currentTier !== 'pro' && !loading) {
                  e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-40, #6366f1)'
                }
              }}
            >
              {loading === 'pro' ? 'Redirecting...' : currentTier === 'pro' ? 'Current plan' : 'Get Pro plan'}
            </button>
            <p style={{ margin: '0 0 16px', fontSize: '0.82rem', fontWeight: 600, color: '#111' }}>
              Everything in Free and:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PRO_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={15} style={{ color: '#111', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agency Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.09)',
            borderRadius: 16,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ color: '#555', marginBottom: 16 }}>
              <PlanIcon variant="agency" />
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>Agency</p>
            <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: '#888' }}>Higher limits, team access</p>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>From </span>
              <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#111' }}>{prices.agency.price}</span>
              <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 6 }}>{prices.agency.period}</span>
            </div>
            <p style={{ margin: '0 0 20px', fontSize: '0.8rem', color: '#aaa' }}>{prices.agency.note}</p>
            <button
              onClick={() => handleUpgrade('agency', billing)}
              disabled={loading === 'agency' || currentTier === 'agency'}
              style={{
                padding: '11px 0',
                borderRadius: 8,
                border: 'none',
                backgroundColor: 'var(--sys-color-primary-40, #6366f1)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: currentTier === 'agency' ? 'default' : 'pointer',
                marginBottom: 4,
                opacity: loading === 'agency' ? 0.7 : 1,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (currentTier !== 'agency' && !loading) {
                  e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-30, #4f46e5)'
                }
              }}
              onMouseLeave={e => {
                if (currentTier !== 'agency' && !loading) {
                  e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-40, #6366f1)'
                }
              }}
            >
              {loading === 'agency' ? 'Redirecting...' : currentTier === 'agency' ? 'Current plan' : 'Get Agency plan'}
            </button>
            <p style={{ margin: '0 0 24px', fontSize: '0.78rem', color: '#aaa', textAlign: 'center' }}>
              No commitment · Cancel anytime
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AGENCY_FEATURES.map((f, i) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {i === 0 ? (
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{f}</span>
                  ) : (
                    <>
                      <Check size={15} style={{ color: '#888', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.4 }}>{f}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#aaa', marginTop: 32 }}>
          Prices shown are exclusive of applicable taxes. You can cancel your subscription at any time.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .upgrade-header-nav { padding: 16px 20px !important; }
          .upgrade-content-container { padding: 0 20px 60px !important; }
          .upgrade-title { fontSize: 1.75rem !important; marginBottom: 24px !important; }
          .upgrade-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
          }
          .pro-card-pill {
            position: static !important;
            margin-bottom: 20px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  )
}

export default UpgradePage
