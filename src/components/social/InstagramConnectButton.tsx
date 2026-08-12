import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSocialAccounts, useConnectInstagram, useDisconnectInstagram } from '@/services/social-hooks'
import { SocialAccount } from '@/services/api-client'

interface InstagramConnectButtonProps {
  onStatusChange?: (account: SocialAccount | null) => void
}

const InstagramIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const InstagramConnectButton: React.FC<InstagramConnectButtonProps> = ({ onStatusChange }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: accounts, isLoading, refetch } = useSocialAccounts()
  const connectMutation = useConnectInstagram()
  const disconnectMutation = useDisconnectInstagram()

  const instagramAccount = accounts?.find(a => a.platform === 'instagram') ?? null

  // Handle OAuth callback query params
  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')

    if (connected === 'instagram' || error) {
      // Refresh accounts list after redirect back from Instagram
      refetch()
      // Clean up query params so the URL stays tidy
      const next = new URLSearchParams(searchParams)
      next.delete('connected')
      next.delete('error')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, refetch, setSearchParams])

  // Notify parent when account changes
  useEffect(() => {
    onStatusChange?.(instagramAccount)
  }, [instagramAccount, onStatusChange])

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={skeletonStyle} />
      </div>
    )
  }

  if (instagramAccount) {
    return (
      <div style={containerStyle}>
        <div style={connectedRowStyle}>
          <div style={accountInfoStyle}>
            <div style={dotStyle} />
            <InstagramIcon size={15} color="#E1306C" />
            <span style={usernameStyle}>@{instagramAccount.platform_username || 'Connected Account'}</span>
            <span style={connectedBadgeStyle}>Connected</span>
          </div>
          <button
            onClick={() => disconnectMutation.mutate()}
            disabled={disconnectMutation.isPending}
            style={disconnectBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.06)' }}
          >
            {disconnectMutation.isPending ? 'Disconnecting…' : 'Disconnect'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={() => connectMutation.mutate()}
        disabled={connectMutation.isPending}
        style={connectBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        <InstagramIcon size={15} color="#fff" />
        {connectMutation.isPending ? 'Redirecting to Instagram…' : 'Connect Instagram Account'}
      </button>
      <p style={hintStyle}>Connect your Instagram Professional account (must be linked to a Facebook Page).</p>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const connectedRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.08)',
  backgroundColor: '#F8FAFC',
  gap: 12,
}

const accountInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}

const dotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#10b981',
  flexShrink: 0,
}

const usernameStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#0F172A',
  fontFamily: '"DM Sans", sans-serif',
}

const connectedBadgeStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#10b981',
  backgroundColor: 'rgba(16,185,129,0.1)',
  padding: '2px 8px',
  borderRadius: 20,
  fontFamily: '"DM Sans", sans-serif',
}

const disconnectBtnStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 500,
  color: '#ef4444',
  backgroundColor: 'rgba(239,68,68,0.06)',
  border: 'none',
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
  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
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

export default InstagramConnectButton
