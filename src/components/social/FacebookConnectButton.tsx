import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSocialAccounts, useConnectFacebook, useDisconnectFacebook } from '@/services/social-hooks'
import { SocialAccount } from '@/services/api-client'

const FacebookIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

interface FacebookConnectButtonProps {
  onStatusChange?: (account: SocialAccount | null) => void
}

const FacebookConnectButton: React.FC<FacebookConnectButtonProps> = ({ onStatusChange }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: accounts, isLoading, refetch } = useSocialAccounts()
  const connectMutation = useConnectFacebook()
  const disconnectMutation = useDisconnectFacebook()

  const facebookAccount = accounts?.find(a => a.platform === 'facebook') ?? null

  // Handle OAuth callback query params
  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')

    if (connected === 'facebook' || error) {
      refetch()
      const next = new URLSearchParams(searchParams)
      next.delete('connected')
      next.delete('error')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, refetch, setSearchParams])

  useEffect(() => {
    onStatusChange?.(facebookAccount)
  }, [facebookAccount, onStatusChange])

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={skeletonStyle} />
      </div>
    )
  }

  if (facebookAccount) {
    return (
      <div style={containerStyle}>
        <div style={accountCardStyle}>
          <div style={accountInfoStyle}>
            <div style={iconWrapperStyle}>
              <FacebookIcon size={18} color="#fff" />
            </div>
            <div>
              <div style={accountNameStyle}>
                Facebook
              </div>
              <div style={accountHandleStyle}>
                {facebookAccount.platform_username}
              </div>
            </div>
          </div>
          <button
            onClick={() => disconnectMutation.mutate()}
            disabled={disconnectMutation.isPending}
            style={disconnectBtnStyle}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {disconnectMutation.isPending ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
        <p style={hintStyle}>Your Facebook account is connected and ready for publishing.</p>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={unconnectedHeaderStyle}>
        <div style={unconnectedIconWrapperStyle}>
          <FacebookIcon size={20} color="#64748B" />
        </div>
        <div>
          <h3 style={unconnectedTitleStyle}>Connect Facebook</h3>
          <p style={unconnectedDescStyle}>
            Publish directly to Facebook from Contentsplit.
          </p>
        </div>
      </div>
      <button
        onClick={() => connectMutation.mutate()}
        disabled={connectMutation.isPending}
        style={connectBtnStyle}
        onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
      >
        <FacebookIcon size={18} color="#fff" />
        {connectMutation.isPending ? 'Connecting...' : `Connect Facebook`}
      </button>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 24,
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  border: '1px solid #E2E8F0',
}

const unconnectedHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}

const unconnectedIconWrapperStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: '#F1F5F9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const unconnectedTitleStyle: React.CSSProperties = {
  margin: '0 0 4px 0',
  fontSize: '1.05rem',
  fontWeight: 600,
  color: '#0F172A',
  fontFamily: '"Syne", sans-serif',
}

const unconnectedDescStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  color: '#64748B',
  fontFamily: '"DM Sans", sans-serif',
  lineHeight: 1.5,
}

const accountCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  backgroundColor: '#F8FAFC',
  borderRadius: 10,
  border: '1px solid #E2E8F0',
}

const accountInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}

const iconWrapperStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#1877F2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const accountNameStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#0F172A',
  fontFamily: '"DM Sans", sans-serif',
  marginBottom: 2,
}

const accountHandleStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: '#64748B',
  fontFamily: '"DM Sans", sans-serif',
}

const disconnectBtnStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#EF4444',
  border: '1px solid transparent',
  fontSize: '0.85rem',
  fontWeight: 600,
  borderRadius: 6,
  padding: '5px 10px',
  cursor: 'pointer',
  fontFamily: '"DM Sans", sans-serif',
  transition: 'background-color 0.15s',
  flexShrink: 0,
}

const connectBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 18px',
  borderRadius: 8,
  border: 'none',
  backgroundColor: '#1877F2',
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: '"DM Sans", sans-serif',
  transition: 'opacity 0.15s',
  alignSelf: 'flex-start',
}

const skeletonStyle: React.CSSProperties = {
  height: 40,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.06)',
  animation: 'pulse 1.5s ease-in-out infinite',
}

const hintStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#94A3B8',
  margin: 0,
  fontFamily: '"DM Sans", sans-serif',
}

export default FacebookConnectButton
