import React, { useState, useEffect } from 'react'
import { Zap, X, ArrowRight, Clock } from 'lucide-react'

interface LimitReachedBannerProps {
  dailyUsage: number
  dailyLimit: number
  isFreeTier: boolean
  onUpgrade: () => void
  onNewChat: () => void
}

function getResetTimeString(): string {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diffMs = midnight.getTime() - now.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`
  }
  return `${diffMins}m`
}

export const LimitReachedBanner: React.FC<LimitReachedBannerProps> = ({
  dailyUsage,
  dailyLimit,
  isFreeTier,
  onUpgrade,
  onNewChat,
}) => {
  const [dismissed, setDismissed] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState(getResetTimeString())
  const [isVisible, setIsVisible] = useState(false)

  // Animate in on mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilReset(getResetTimeString())
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  const isUnlimited = dailyLimit >= 999999
  if (dismissed || isUnlimited) return null

  const planLabel = isFreeTier ? 'Free' : 'Pro'

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => setDismissed(true), 250)
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '14px',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        boxShadow: '0 2px 16px rgba(99, 102, 241, 0.10), 0 1px 4px rgba(0,0,0,0.06)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: icon + message */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
        <div
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap size={16} color="white" fill="white" />
        </div>

        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#1e1b4b',
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            You've reached the {planLabel} limit for conversions
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: '0.78rem',
              color: '#64748b',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={11} style={{ flexShrink: 0 }} />
            Resets in {timeUntilReset} · Used {dailyUsage}/{dailyLimit} today
          </p>
        </div>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          id="limit-banner-new-chat-btn"
          onClick={onNewChat}
          style={{
            padding: '7px 14px',
            borderRadius: '10px',
            border: '1.5px solid #e2e8f0',
            backgroundColor: 'white',
            color: '#374151',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#cbd5e1'
            e.currentTarget.style.backgroundColor = '#f8fafc'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#e2e8f0'
            e.currentTarget.style.backgroundColor = 'white'
          }}
        >
          New chat
        </button>

        <button
          id="limit-banner-upgrade-btn"
          onClick={onUpgrade}
          style={{
            padding: '7px 14px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: 'white',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.35)',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.5)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.35)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Upgrade
          <ArrowRight size={13} />
        </button>

        {/* Dismiss */}
        <button
          id="limit-banner-dismiss-btn"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          style={{
            width: 28,
            height: 28,
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'
            e.currentTarget.style.color = '#475569'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#94a3b8'
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
