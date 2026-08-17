import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSocialAccounts, useConnectTwitter, useDisconnectTwitter } from '@/services/social-hooks'
import { SocialAccount } from '@/services/api-client'

const XIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.264 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

interface TwitterConnectButtonProps {
  onStatusChange?: (account: SocialAccount | null) => void
}

const TwitterConnectButton: React.FC<TwitterConnectButtonProps> = ({ onStatusChange }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: accounts, isLoading, refetch } = useSocialAccounts()
  const connectMutation = useConnectTwitter()
  const disconnectMutation = useDisconnectTwitter()

  const twitterAccount = accounts?.find(a => a.platform === 'twitter') ?? null

  // Handle OAuth callback query params
  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')

    if (error) {
      alert(`Twitter Connection Error: ${error}\n\nPlease verify your TWITTER_CLIENT_SECRET in server/.env is up to date, as changing the App Type to Web App in the Twitter Developer Portal resets the secret!`)
    }

    if (connected === 'twitter' || error) {
      // Refresh accounts list after redirect back from X
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
    onStatusChange?.(twitterAccount)
  }, [twitterAccount, onStatusChange])

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={skeletonStyle} />
      </div>
    )
  }

  if (twitterAccount) {
    return (
      <div style={containerStyle}>
        <div style={connectedRowStyle}>
          <div style={accountInfoStyle}>
            <div style={dotStyle} />
            <XIcon size={15} color="#0F172A" />
            <span style={usernameStyle}>@{twitterAccount.platform_username}</span>
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
        <XIcon size={15} color="#fff" />
        {connectMutation.isPending ? 'Redirecting to X…' : 'Connect X Account'}
      </button>
      <p style={hintStyle}>Connect your X account to publish directly from ContentSplit.</p>
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
  backgroundColor: 'rgba(29,155,240,0.95)',
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

export default TwitterConnectButton
