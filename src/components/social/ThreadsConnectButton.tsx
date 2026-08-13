import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSocialAccounts, useConnectThreads, useDisconnectThreads } from '@/services/social-hooks'
import { SocialAccount } from '@/services/api-client'

const ThreadsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.002 0c6.627 0 12 5.373 12 12s-5.373 12-12 12c-6.627 0-12-5.373-12-12S5.375 0 12.002 0zm-1.847 16.903c1.782 0 3.195-1.077 3.655-2.617h-.058c-.522.688-1.503 1.137-2.662 1.137-2.316 0-4.004-1.781-4.004-4.225 0-2.43 1.638-4.24 3.99-4.24 1.258 0 2.193.53 2.72 1.253h.057V7.126h3.407v9.645h-3.407v-1.12c-.522.75-1.476 1.252-2.735 1.252zm.478-8.497c-1.03 0-1.784.81-1.784 1.896 0 1.074.755 1.884 1.784 1.884.972 0 1.77-.796 1.77-1.884 0-1.074-.798-1.896-1.77-1.896z" />
  </svg>
)

interface ThreadsConnectButtonProps {
  onStatusChange?: (account: SocialAccount | null) => void
}

const ThreadsConnectButton: React.FC<ThreadsConnectButtonProps> = ({ onStatusChange }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: accounts, isLoading, refetch } = useSocialAccounts()
  const connectMutation = useConnectThreads()
  const disconnectMutation = useDisconnectThreads()

  const threadsAccount = accounts?.find(a => a.platform === 'threads') ?? null

  // Handle OAuth callback query params
  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')

    if (connected === 'threads' || error) {
      refetch()
      const next = new URLSearchParams(searchParams)
      next.delete('connected')
      next.delete('error')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, refetch, setSearchParams])

  useEffect(() => {
    onStatusChange?.(threadsAccount)
  }, [threadsAccount, onStatusChange])

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={skeletonStyle} />
      </div>
    )
  }

  if (threadsAccount) {
    return (
      <div style={containerStyle}>
        <div style={accountCardStyle}>
          <div style={accountInfoStyle}>
            <div style={iconWrapperStyle}>
              <ThreadsIcon size={18} color="#fff" />
            </div>
            <div>
              <div style={accountNameStyle}>
                Threads
              </div>
              <div style={accountHandleStyle}>
                {threadsAccount.platform_username}
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
        <p style={hintStyle}>Your Threads account is connected and ready for publishing.</p>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={unconnectedHeaderStyle}>
        <div style={unconnectedIconWrapperStyle}>
          <ThreadsIcon size={20} color="#64748B" />
        </div>
        <div>
          <h3 style={unconnectedTitleStyle}>Connect Threads</h3>
          <p style={unconnectedDescStyle}>
            Publish directly to Threads from Contentsplit.
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
        <ThreadsIcon size={18} color="#fff" />
        {connectMutation.isPending ? 'Connecting...' : `Connect Threads`}
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
  backgroundColor: '#000000',
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
  backgroundColor: '#000000',
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

export default ThreadsConnectButton
