import React, { useEffect, useState } from 'react'

/**
 * ChatLoadingBubble
 * Sequences through three stages of loading animation:
 * 1. Typing indicator (bouncing dots) — 0–1.5s
 * 2. Progress animation (thin bar) — 1.5–3.5s
 * 3. Skeleton loader (shimmering lines) — 3.5s+
 */

const TypingIndicator: React.FC = () => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 0' }}>
    {[0, 1, 2].map(i => (
      <span
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--sys-color-neutral-50)',
          display: 'inline-block',
          animation: 'chat-dot-bounce 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes chat-dot-bounce {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
        40% { transform: translateY(-6px); opacity: 1; }
      }
    `}</style>
  </div>
)

const ProgressAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(id); return 90 }
        return p + Math.random() * 12
      })
    }, 180)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '6px',
        color: 'var(--sys-color-neutral-50)',
        fontSize: '0.8rem',
      }}>
        <span>Generating content…</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{
        width: '100%', height: 4,
        borderRadius: '9999px',
        backgroundColor: 'var(--sys-color-neutral-90)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          borderRadius: '9999px',
          background: 'linear-gradient(90deg, var(--sys-color-primary-60), var(--sys-color-primary-40))',
          transition: 'width 0.18s ease-out',
          boxShadow: '0 0 8px var(--sys-color-primary-70)',
        }} />
      </div>
    </div>
  )
}

const SkeletonLine: React.FC<{ width?: string; height?: number }> = ({
  width = '100%',
  height = 14,
}) => (
  <div style={{
    width,
    height,
    borderRadius: '4px',
    backgroundColor: 'var(--sys-color-neutral-90)',
    background: 'linear-gradient(90deg, var(--sys-color-neutral-90) 25%, var(--sys-color-neutral-95) 50%, var(--sys-color-neutral-90) 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-shimmer 1.4s infinite',
  }}>
    <style>{`
      @keyframes skeleton-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
)

const SkeletonLoader: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', padding: '4px 0' }}>
    <SkeletonLine width="92%" height={14} />
    <SkeletonLine width="100%" height={14} />
    <SkeletonLine width="78%" height={14} />
    <div style={{ height: 8 }} />
    <SkeletonLine width="95%" height={14} />
    <SkeletonLine width="60%" height={14} />
    <div style={{ height: 8 }} />
    {/* Fake action bar */}
    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
      <SkeletonLine width="60px" height={28} />
      <SkeletonLine width="80px" height={28} />
      <SkeletonLine width="60px" height={28} />
    </div>
  </div>
)

type Stage = 'typing' | 'progress' | 'skeleton'

export const ChatLoadingBubble: React.FC = () => {
  const [stage, setStage] = useState<Stage>('typing')

  useEffect(() => {
    const t1 = setTimeout(() => setStage('progress'), 1500)
    const t2 = setTimeout(() => setStage('skeleton'), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{
      padding: 'var(--sys-spacing-md) var(--sys-spacing-lg)',
      minWidth: '260px',
      maxWidth: '100%',
    }}>
      {stage === 'typing' && <TypingIndicator />}
      {stage === 'progress' && <ProgressAnimation />}
      {stage === 'skeleton' && <SkeletonLoader />}
    </div>
  )
}
