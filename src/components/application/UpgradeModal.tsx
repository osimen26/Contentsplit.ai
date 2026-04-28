import React, { useEffect, useRef, useState } from 'react'
import { X, Sparkles, Check, ArrowRight, Lock, Zap } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: (tier: 'pro' | 'agency') => void
  dailyUsage: number
  dailyLimit: number
  isFreeTier: boolean
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  dailyUsage,
  dailyLimit,
  isFreeTier,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimated(true))
      })
    } else {
      setIsAnimated(false)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isVisible) return null

  const progress = (dailyUsage / dailyLimit) * 100
  const isUnlimited = dailyLimit >= 999999

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isAnimated ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '24px',
          maxWidth: 520,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
          transform: isAnimated ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isAnimated ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'
            e.currentTarget.style.color = '#0f172a'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'
            e.currentTarget.style.color = '#64748b'
          }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        <div style={{ padding: '40px 32px 32px' }}>
          {/* Header Icon */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
          }}>
            <Lock size={28} color="white" />
          </div>

          {/* Title */}
          <h2 style={{
            margin: '0 0 8px',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.3,
          }}>
            Daily Limit Reached
          </h2>

          {/* Subtitle */}
          <p style={{
            margin: '0 0 24px',
            fontSize: '0.95rem',
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            You've used {dailyUsage}/{dailyLimit} conversions today
          </p>

          {/* Progress Bar */}
          {!isUnlimited && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '12px',
              height: '12px',
              marginBottom: '28px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${Math.min(progress, 100)}%`,
                height: '100%',
                background: progress >= 100
                  ? 'linear-gradient(90deg, #ef4444, #f97316)'
                  : 'linear-gradient(90deg, #6366f1, #a855f7)',
                borderRadius: '12px',
                transition: 'width 0.5s ease, background 0.3s ease',
              }} />
            </div>
          )}

          {/* Plans */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {/* Pro Plan */}
            <div
              onClick={() => onUpgrade('pro')}
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                    Pro Plan
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#6366f1', fontWeight: 600 }}>
                    ₦5,000/month
                  </p>
                </div>
                <ArrowRight size={20} style={{ color: '#6366f1' }} />
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.8 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  100 conversions per day
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  All tones & platforms
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  Priority support
                </li>
              </ul>
            </div>

            {/* Agency Plan */}
            <div
              onClick={() => onUpgrade('agency')}
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(99, 102, 241, 0.05))',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 85, 247, 0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                      Agency Plan
                    </h3>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(168, 85, 247, 0.1)',
                      color: '#a855f7',
                    }}>
                      POPULAR
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#a855f7', fontWeight: 600 }}>
                    ₦15,000/month
                  </p>
                </div>
                <ArrowRight size={20} style={{ color: '#a855f7' }} />
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.8 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  Unlimited conversions per day
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  Team access & API access
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  Priority support
                </li>
              </ul>
            </div>
          </div>

          {/* Tips for Free Users */}
          {isFreeTier && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <p style={{
                margin: '0 0 8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#6366f1',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
              }}>
                Tips for Free Users
              </p>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '0.8rem',
                color: '#475569',
                lineHeight: 1.6,
              }}>
                <li>Choose specific platforms to generate only what you need</li>
                <li>Limits reset at midnight (local time)</li>
                <li>Copy outputs immediately - they won't be saved on the free plan</li>
              </ul>
            </div>
          )}

          {/* Reset Timer */}
          {isFreeTier && (
            <p style={{
              margin: '0 0 16px',
              fontSize: '0.8rem',
              color: '#94a3b8',
              textAlign: 'center',
            }}>
              <Zap size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Limits reset at midnight · Come back tomorrow for 5 more conversions
            </p>
          )}

          {/* Continue with limited access button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0',
              backgroundColor: 'transparent',
              color: '#475569',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)'
              e.currentTarget.style.borderColor = '#cbd5e1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = '#e2e8f0'
            }}
          >
            Continue with limited access
          </button>
        </div>
      </div>
    </div>
  )
}
