import React from 'react'
import { Lock, Sparkles, ArrowRight, Lightbulb } from 'lucide-react'

interface LimitReachedBubbleProps {
  dailyUsage: number
  dailyLimit: number
  onUpgrade: () => void
  isFreeTier: boolean
}

export const LimitReachedBubble: React.FC<LimitReachedBubbleProps> = ({
  dailyUsage,
  dailyLimit,
  onUpgrade,
  isFreeTier
}) => {
  const progress = (dailyUsage / dailyLimit) * 100
  const isUnlimited = dailyLimit >= 999999

  if (isUnlimited) return null

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.08))',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      maxWidth: 520,
      width: '100%',
      boxShadow: '0 4px 16px rgba(99, 102, 241, 0.08)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Lock size={20} color="white" />
        </div>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#1e1b4b',
            lineHeight: 1.3,
          }}>
            Daily Limit Reached
          </h3>
          <p style={{
            margin: '2px 0 0',
            fontSize: '0.85rem',
            color: '#6366f1',
            fontWeight: 500,
          }}>
            {dailyUsage}/{dailyLimit} conversions used today
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '8px',
        height: '8px',
        marginBottom: '20px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${Math.min(progress, 100)}%`,
          height: '100%',
          background: progress >= 100 
            ? 'linear-gradient(90deg, #ef4444, #f97316)' 
            : 'linear-gradient(90deg, #6366f1, #a855f7)',
          borderRadius: '8px',
          transition: 'width 0.5s ease, background 0.3s ease',
        }} />
      </div>

      {/* Message */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '8px',
        }}>
          <Lightbulb size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#334155',
            lineHeight: 1.6,
          }}>
            {isFreeTier 
              ? "You've used all your free conversions for today. Upgrade to Pro for 100 conversions/day or go unlimited with Agency."
              : "You've reached your daily limit. Upgrade to Agency for unlimited conversions."
            }
          </p>
        </div>
      </div>

      {/* Tips for Free Users */}
      {isFreeTier && (
        <div style={{
          background: 'rgba(99, 102, 241, 0.05)',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '20px',
        }}>
          <p style={{
            margin: '0 0 10px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#6366f1',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
          }}>
            Tips to make the most of your remaining conversions:
          </p>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '0.85rem',
            color: '#475569',
            lineHeight: 1.8,
          }}>
            <li>Choose specific platforms to generate only what you need</li>
            <li>Use "Improve Clarity" to refine content without regenerating</li>
            <li>Copy outputs immediately - they won't be saved on the free plan</li>
          </ul>
        </div>
      )}

      {/* Upgrade Button */}
      <button
        onClick={onUpgrade}
        style={{
          width: '100%',
          padding: '14px 24px',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          color: 'white',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.2s ease',
          minHeight: 48,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <Sparkles size={18} />
        Upgrade to {isFreeTier ? 'Pro' : 'Agency'}
        <ArrowRight size={16} />
      </button>

      {/* Reset Timer (for free users) */}
      {isFreeTier && (
        <p style={{
          margin: '12px 0 0',
          fontSize: '0.8rem',
          color: '#94a3b8',
          textAlign: 'center',
        }}>
          Limits reset at midnight (local time) · Come back tomorrow for 5 more conversions
        </p>
      )}
    </div>
  )
}
