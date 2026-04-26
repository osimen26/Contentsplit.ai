import React from 'react'
import { FileText, Layers, Copy, ArrowRight } from 'lucide-react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorSurface2: '#1A1A24',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
  radiusMd: '12px',
}

const steps = [
  {
    step: 1,
    title: 'Paste your content',
    description: 'Drop in your blog post URL or paste the full text. ContentSplit reads it and understands the key ideas, tone, and structure.',
    icon: FileText,
  },
  {
    step: 2,
    title: 'Choose your platforms',
    description: 'Pick which formats you need — one or all six. ContentSplit generates each one separately, tailored to that platform\'s content style.',
    icon: Layers,
  },
  {
    step: 3,
    title: 'Copy and publish',
    description: 'Each output is editable before you copy. Tweak the tone, swap out phrases, and publish directly from the editor.',
    icon: Copy,
  },
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorBg,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  label: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: tokens.colorAccent,
    marginBottom: '16px',
    textAlign: 'center',
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    color: tokens.colorTextPrimary,
    marginBottom: '48px',
    textAlign: 'center',
  },
  timeline: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    top: '0',
    bottom: '0',
    width: '2px',
    background: tokens.colorBorder,
    transform: 'translateX(-50%)',
    zIndex: 0,
  },
}

const HowItWorks: React.FC = () => {
  return (
    <section style={styles.section} id="how-it-works">
      <div style={styles.container}>
        <span style={styles.label}>Section 5 — How It Works</span>
        
        <h2 style={styles.headline}>
          Three steps. Zero friction.
        </h2>

        <div style={styles.timeline}>
          <div style={styles.timelineLine} />
          
          {steps.map((s, i) => (
            <div
              key={s.step}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
                alignItems: 'center',
              }}
              className="cs-step"
            >
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: '120px',
                color: tokens.colorAccent,
                opacity: 0.08,
                lineHeight: 1,
                pointerEvents: 'none',
              }}>
                {s.step}
              </div>

              {/* Step Content */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}>
                {/* Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: tokens.radiusMd,
                  background: tokens.colorSurface,
                  border: `1px solid ${tokens.colorBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <s.icon size={24} color={tokens.colorAccent} />
                </div>

                {/* Text */}
                <div>
                  <h3 style={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: tokens.colorTextPrimary,
                    marginBottom: '8px',
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    color: tokens.colorTextSecondary,
                    lineHeight: 1.6,
                    maxWidth: '400px',
                  }}>
                    {s.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cs-step {
          perspective: 1000px;
        }

        @media (max-width: 640px) {
          .cs-timeline-line {
            left: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default HowItWorks