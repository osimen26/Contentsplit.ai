import React from 'react'
import { Twitter, Linkedin, Instagram, Mail, Youtube, FileText, ArrowRight } from 'lucide-react'

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
  radiusMd: '12px',
  radiusLg: '20px',
}

const formats = [
  {
    id: 'twitter',
    icon: Twitter,
    label: 'Twitter/X',
    color: '#1DA1F2',
    format: 'Thread',
    description: 'Engaging thread with hooks and CTAs',
    stats: '280 chars · 5-10 tweets',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    color: '#0A66C2',
    format: 'Post',
    description: 'Professional thought leadership post',
    stats: 'Professional tone · 3000 chars',
  },
  {
    id: 'instagram',
    icon: Instagram,
    label: 'Instagram',
    color: '#E1306C',
    format: 'Caption',
    description: 'Scroll-stopping caption with hashtags',
    stats: '2200 chars · 30 hashtags',
  },
  {
    id: 'newsletter',
    icon: Mail,
    label: 'Newsletter',
    color: '#EA4335',
    format: 'Email',
    description: 'Email-ready section with subject line',
    stats: 'Subject line + opening paragraph',
  },
  {
    id: 'youtube',
    icon: Youtube,
    label: 'YouTube',
    color: '#FF0000',
    format: 'Description',
    description: 'SEO-optimized video description',
    stats: 'Timestamps · keywords · CTAs',
  },
  {
    id: 'summary',
    icon: FileText,
    label: 'Summary',
    color: '#6C63FF',
    format: 'TL;DR',
    description: 'Quick summary for busy readers',
    stats: '3-5 bullet points',
  },
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorBg,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '1200px',
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
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    color: tokens.colorTextPrimary,
    marginBottom: '16px',
  },
  subtext: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '1.1rem',
    color: tokens.colorTextSecondary,
    maxWidth: '600px',
    lineHeight: 1.6,
    marginBottom: '48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px',
  },
}

const OutputShowcase: React.FC = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <span style={styles.label}>Section 4 — What It Creates</span>
        
        <h2 style={styles.headline}>
          Your blog, everywhere it needs to be.
        </h2>
        
        <p style={styles.subtext}>
          Paste your article. In seconds, ContentSplit generates 
          six distinct content formats, each optimized for how 
          people actually consume content on that platform.
        </p>

        <div style={styles.grid}>
          {formats.map((format) => (
            <div
              key={format.id}
              style={{
                background: tokens.colorSurface,
                border: `1px solid ${tokens.colorBorder}`,
                borderRadius: tokens.radiusLg,
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="cs-format-card"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: tokens.radiusMd,
                    background: `${format.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <format.icon size={20} color={format.color} />
                  </div>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: tokens.colorTextPrimary,
                  }}>
                    {format.label}
                  </span>
                </div>
                <ArrowRight size={16} color={tokens.colorTextMuted} />
              </div>

              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: tokens.colorTextPrimary,
                marginBottom: '8px',
              }}>
                {format.format}
              </div>

              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                color: tokens.colorTextSecondary,
                lineHeight: 1.5,
                marginBottom: '16px',
              }}>
                {format.description}
              </p>

              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                color: tokens.colorTextMuted,
                padding: '8px 12px',
                background: tokens.colorSurface2,
                borderRadius: '8px',
                display: 'inline-block',
              }}>
                {format.stats}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cs-format-card:hover {
          border-color: ${tokens.colorAccent}40 !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 32px ${tokens.colorAccent}15;
        }
      `}</style>
    </section>
  )
}

export default OutputShowcase