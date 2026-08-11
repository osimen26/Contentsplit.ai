import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSocialAccounts, useConnectLinkedIn, useDisconnectLinkedIn } from '@/services/social-hooks'
import { SocialAccount } from '@/services/api-client'

const LinkedInIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

interface LinkedInConnectButtonProps {
  onStatusChange?: (account: SocialAccount | null) => void
}

const LinkedInConnectButton: React.FC<LinkedInConnectButtonProps> = ({ onStatusChange }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: accounts, isLoading, refetch } = useSocialAccounts()
  const connectMutation = useConnectLinkedIn()
  const disconnectMutation = useDisconnectLinkedIn()

  const linkedInAccount = accounts?.find(a => a.platform === 'linkedin') ?? null

  // Handle OAuth callback query params
  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')

    if (connected === 'linkedin' || error) {
      refetch()
      const next = new URLSearchParams(searchParams)
      next.delete('connected')
      next.delete('error')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, refetch, setSearchParams])

  useEffect(() => {
    onStatusChange?.(linkedInAccount)
  }, [linkedInAccount, onStatusChange])

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={skeletonStyle} />
      </div>
    )
  }

  if (linkedInAccount) {
    return (
      <div style={containerStyle}>
        <div style={connectedRowStyle}>
          <div style={accountInfoStyle}>
            <div style={dotStyle} />
            <LinkedInIcon size={15} color="#0A66C2" />
            <span style={usernameStyle}>{linkedInAccount.platform_username}</span>
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
        <LinkedInIcon size={15} color="#fff" />
        {connectMutation.isPending ? 'Redirecting to LinkedIn…' : 'Connect LinkedIn'}
      </button>
      <p style={hintStyle}>Connect your LinkedIn account to publish directly from ContentSplit.</p>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const containerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8 }

const skeletonStyle: React.CSSProperties = {
  height: 40,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.06)',
  animation: 'pulse 1.5s ease-in-out infinite',
}

const connectedRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(10,102,194,0.15)',
  backgroundColor: 'rgba(10,102,194,0.04)',
  gap: 12,
}

const accountInfoStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8 }

const dotStyle: React.CSSProperties = {
  width: 8, height: 8, borderRadius: '50%',
  backgroundColor: '#10b981', flexShrink: 0,
}

const usernameStyle: React.CSSProperties = {
  fontSize: '0.875rem', fontWeight: 600,
  color: '#0F172A', fontFamily: '"DM Sans", sans-serif',
}

const connectedBadgeStyle: React.CSSProperties = {
  fontSize: '0.75rem', fontWeight: 500,
  color: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)',
  padding: '2px 8px', borderRadius: 20,
  fontFamily: '"DM Sans", sans-serif',
}

const disconnectBtnStyle: React.CSSProperties = {
  fontSize: '0.8rem', fontWeight: 500,
  color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.06)',
  border: 'none', borderRadius: 6, padding: '5px 10px',
  cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
  transition: 'background-color 0.15s', flexShrink: 0,
}

const connectBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '10px 18px', borderRadius: 8, border: 'none',
  backgroundColor: '#0A66C2', color: '#fff',
  fontSize: '0.875rem', fontWeight: 600,
  cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
  transition: 'opacity 0.15s', alignSelf: 'flex-start',
}

const hintStyle: React.CSSProperties = {
  fontSize: '0.8rem', color: '#94A3B8',
  margin: 0, fontFamily: '"DM Sans", sans-serif',
}

export default LinkedInConnectButton
