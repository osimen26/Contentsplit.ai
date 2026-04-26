import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Twitter, Linkedin, Instagram, Mail, FileText, Youtube, List } from 'lucide-react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorSurface2: '#1A1A24',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorAccentWarm: '#FF6B6B',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
  colorWhite: '#FFFFFF',
  radiusSm: '6px',
  radiusMd: '12px',
  radiusLg: '20px',
  radiusPill: '999px',
}

const platformTabs = [
  { id: 'twitter', label: 'Twitter/X', icon: Twitter, active: true },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'summary', label: 'Summary', icon: List },
]

const mockTweets = [
  '🌟 Just discovered the secret to 10x content creation',
  'Most creators spend hours repurposing one piece of content. Here is the better way:',
  '1. Write once 2. Auto-distribute 3. Never repeat yourself',
  'Your time is worth more than editing AI outputs.',
  'The future of content is one-click everywhere. 🚀',
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    background: tokens.colorBg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '120px 24px 80px',
    position: 'relative',
    overflow: 'hidden',
  },
  label: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: tokens.colorAccent,
    marginBottom: '16px',
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeInUp 0.6s ease forwards',
    animationDelay: '0ms',
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    color: tokens.colorTextPrimary,
    textAlign: 'center',
    lineHeight: 1.1,
    maxWidth: '900px',
    marginBottom: '24px',
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeInUp 0.6s ease forwards',
    animationDelay: '150ms',
  },
  subheadline: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: tokens.colorTextSecondary,
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: 1.6,
    marginBottom: '40px',
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeInUp 0.6s ease forwards',
    animationDelay: '300ms',
  },
  ctaRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '16px',
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeInUp 0.6s ease forwards',
    animationDelay: '450ms',
  },
  primaryCta: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: tokens.colorWhite,
    background: tokens.colorAccent,
    border: 'none',
    cursor: 'pointer',
    padding: '16px 32px',
    borderRadius: tokens.radiusPill,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  ghostCta: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    color: tokens.colorTextSecondary,
    background: 'transparent',
    border: `1px solid ${tokens.colorBorder}`,
    cursor: 'pointer',
    padding: '16px 32px',
    borderRadius: tokens.radiusPill,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  belowText: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    color: tokens.colorTextMuted,
    marginBottom: '64px',
    opacity: 0,
    animation: 'fadeInUp 0.6s ease forwards',
    animationDelay: '600ms',
  },
  mockupWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '1000px',
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeInUp 0.6s ease forwards',
    animationDelay: '750ms',
  },
  mockupCard: {
    background: tokens.colorSurface,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusLg,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: `0 0 80px ${tokens.colorAccent}15`,
  },
  mockupHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 20px',
    borderBottom: `1px solid ${tokens.colorBorder}`,
    background: tokens.colorSurface2,
  },
  mockupDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  mockupContent: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    minHeight: '400px',
  },
  inputPanel: {
    padding: '20px',
    borderRight: `1px solid ${tokens.colorBorder}`,
    background: tokens.colorSurface2,
  },
  inputLabel: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: tokens.colorTextMuted,
    marginBottom: '12px',
  },
  inputArea: {
    background: tokens.colorSurface,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusMd,
    padding: '16px',
    height: '320px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: tokens.colorTextSecondary,
    lineHeight: 1.6,
    overflow: 'hidden',
  },
  outputPanel: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  platformTabs: {
    display: 'flex',
    borderBottom: `1px solid ${tokens.colorBorder}`,
    overflowX: 'auto',
  },
  platformTab: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: tokens.colorTextMuted,
    background: 'transparent',
    border: 'none',
    padding: '14px 16px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  outputContent: {
    padding: '24px',
    flex: 1,
    overflow: 'auto',
  },
  tweet: {
    padding: '12px 16px',
    background: tokens.colorSurface,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusMd,
    marginBottom: '12px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: tokens.colorTextPrimary,
    lineHeight: 1.5,
  },
}

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('twitter')

  return (
    <section style={styles.section} id="main">
      {/* Section Label */}
      <span style={styles.label}>Section 2 — Hero</span>

      {/* Headline */}
      <h1 style={styles.headline}>
        Turn one blog post into a week&apos;s worth of content
      </h1>

      {/* Subheadline */}
      <p style={styles.subheadline}>
        Paste your article. ContentSplit transforms it into optimized posts for 
        Twitter, LinkedIn, Instagram, newsletters, and YouTube — all in seconds.
      </p>

      {/* CTA Buttons */}
      <div style={styles.ctaRow}>
        <Link
          to="/register"
          style={styles.primaryCta}
          className="cs-cta-primary"
        >
          Start for free <ArrowRight size={18} />
        </Link>
        <a
          href="#how-it-works"
          style={styles.ghostCta}
          className="cs-cta-ghost"
        >
          See how it works
        </a>
      </div>

      {/* Below CTA Text */}
      <p style={styles.belowText}>
        No credit card required · 5 free repurposes per day
      </p>

      {/* Hero Visual - Mockup */}
      <div style={styles.mockupWrapper} className="cs-hero-mockup">
        <div style={styles.mockupCard}>
          {/* Mockup Header */}
          <div style={styles.mockupHeader}>
            <div style={{ ...styles.mockupDot, background: '#FF5F57' }} />
            <div style={{ ...styles.mockupDot, background: '#FFBD2E' }} />
            <div style={{ ...styles.mockupDot, background: '#28CA41' }} />
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              color: tokens.colorTextMuted,
              marginLeft: '12px',
            }}>
              ContentSplit — editor
            </span>
          </div>

          {/* Mockup Content */}
          <div style={styles.mockupContent}>
            {/* Left: Input Panel */}
            <div style={styles.inputPanel}>
              <div style={styles.inputLabel}>Your Blog Post</div>
              <div style={styles.inputArea}>
                {`The secret to 10x your content creation...

Most creators spend hours repurposeing one piece of content across multiple platforms. But there's a better way.

By treating your content as a reusable asset and using AI to handle the formatting, you can turn one article into weeks worth of social posts.

Here's the framework I use:
1. Write once
2. Adapt for each platform
3. Distribute everywhere

The future of content is one-click everywhere.`}
              </div>
            </div>

            {/* Right: Output Panel */}
            <div style={styles.outputPanel}>
              {/* Platform Tabs */}
              <div style={styles.platformTabs}>
                {platformTabs.map((tab) => (
                  <button
                    key={tab.id}
                    style={{
                      ...styles.platformTab,
                      color: activeTab === tab.id ? tokens.colorAccent : tokens.colorTextMuted,
                      borderBottomColor: activeTab === tab.id ? tokens.colorAccent : 'transparent',
                    }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cs-platform-tab ${tab.id === activeTab ? 'active' : ''}`}
                  >
                    <tab.icon size={14} /> {tab.label}
                  </button>
                ))}
              </div>

              {/* Output Content */}
              <div style={styles.outputContent}>
                {activeTab === 'twitter' && mockTweets.map((tweet, i) => (
                  <div key={i} style={styles.tweet}>
                    <span style={{ color: tokens.colorAccent, marginRight: '8px' }}>{i + 1}</span>
                    {tweet}
                  </div>
                ))}
                {activeTab === 'linkedin' && (
                  <div style={styles.tweet}>
                    {`🌟 Just discovered the secret to 10x content creation

Most creators spend hours repurposing one piece of content across multiple platforms. Here is a better framework:

1. Write once
2. Auto-adapt for each platform  
3. Never repeat yourself

Your time is worth more than editing AI outputs.

What's your content repurposing strategy? 👇`}
                  </div>
                )}
                {activeTab === 'summary' && (
                  <div style={styles.tweet}>
                    {`📝 Content Summary
• Key Insight: One article → multiple platforms
• Framework: Write once, adapt everywhere
• Benefit: 10x your output

Ready to streamline your content creation?`}
                  </div>
                )}
                {['newsletter', 'instagram', 'youtube'].includes(activeTab) && (
                  <div style={{ ...styles.tweet, color: tokens.colorTextMuted, fontStyle: 'italic' }}>
                    Preview for {activeTab} — content would appear here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cs-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px ${tokens.colorAccent}40;
        }

        .cs-cta-ghost:hover {
          color: ${tokens.colorTextPrimary};
          border-color: ${tokens.colorTextMuted};
        }

        .cs-hero-mockup {
          animation: float 4s ease-in-out infinite;
          animation-delay: 750ms;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .cs-platform-tab:hover {
          color: ${tokens.colorTextSecondary} !important;
        }

        @media (max-width: 768px) {
          .cs-mockup-content {
            grid-template-columns: 1fr !important;
          }
          .cs-input-panel {
            border-right: none !important;
            border-bottom: 1px solid ${tokens.colorBorder} !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero