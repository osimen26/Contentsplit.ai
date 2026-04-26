import React from 'react'
import { 
  Sparkles, ArrowRight, Twitter, Linkedin, Instagram, Mail, 
  Clock, Zap, Edit3, CheckCircle, Users, TrendingUp 
} from 'lucide-react'

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

const features = [
  {
    id: 1,
    title: 'Tone Awareness',
    headline: 'It writes like you, not like a robot.',
    description: 'ContentSplit preserves the voice, vocabulary, and energy of your original post. The LinkedIn version doesn\'t sound like the Twitter version — because they shouldn\'t.',
    visual: 'comparison',
  },
  {
    id: 2,
    title: 'Batch Mode',
    headline: 'Run a whole content calendar in one session.',
    description: 'Upload multiple blog posts and queue them. ContentSplit processes each one and returns a full set of outputs per article — ready for scheduling.',
    visual: 'queue',
  },
  {
    id: 3,
    title: 'Edit Before Export',
    headline: 'Every output is a starting point, not a final draft.',
    description: 'The editor is inline. Click any generated text and edit it directly. No jumping between tabs or copy-pasting into Notion.',
    visual: 'editor',
  },
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorBg,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '1100px',
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
    marginBottom: '48px',
  },
  featureRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
    padding: '48px 0',
    borderBottom: `1px solid ${tokens.colorBorder}`,
  },
  featureText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  featureLabel: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: tokens.colorAccent,
  },
  featureTitle: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 600,
    fontSize: '24px',
    color: tokens.colorTextPrimary,
  },
  featureDesc: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    color: tokens.colorTextSecondary,
    lineHeight: 1.6,
  },
}

const FeatureHighlights: React.FC = () => {
  return (
    <section style={styles.section} id="features">
      <div style={styles.container}>
        <span style={styles.label}>Section 7 — Feature Highlights</span>
        
        <h2 style={styles.headline}>
          The engine behind your content empire.
        </h2>

        {features.map((feature, i) => (
          <div
            key={feature.id}
            style={{
              ...styles.featureRow,
              flexDirection: i % 2 === 1 ? 'row-reverse' : 'row',
            }}
            className="cs-feature-row"
          >
            {/* Text Side */}
            <div style={styles.featureText}>
              <span style={styles.featureLabel}>Feature {feature.id}</span>
              <h3 style={styles.featureTitle}>{feature.headline}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </div>

            {/* Visual Side */}
            <div style={{
              background: tokens.colorSurface,
              border: `1px solid ${tokens.colorBorder}`,
              borderRadius: tokens.radiusLg,
              padding: '24px',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {feature.visual === 'comparison' && (
                <>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '8px',
                  }}>
                    <Twitter size={16} color="#1DA1F2" />
                    <Linkedin size={16} color="#0A66C2" />
                  </div>
                  <div style={{
                    padding: '12px',
                    background: tokens.colorSurface2,
                    borderRadius: tokens.radiusMd,
                    border: `1px solid ${tokens.colorBorder}`,
                  }}>
                    <span style={{
                      fontSize: '11px',
                      color: tokens.colorTextMuted,
                      textTransform: 'uppercase',
                    }}>Twitter version</span>
                    <p style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '13px',
                      color: tokens.colorTextPrimary,
                      marginTop: '8px',
                    }}>
                      🚀 Just discovered the secret to 10x your content creation. Here is the framework:
                    </p>
                  </div>
                  <div style={{
                    padding: '12px',
                    background: tokens.colorSurface2,
                    borderRadius: tokens.radiusMd,
                    border: `1px solid ${tokens.colorBorder}`,
                  }}>
                    <span style={{
                      fontSize: '11px',
                      color: tokens.colorTextMuted,
                      textTransform: 'uppercase',
                    }}>LinkedIn version</span>
                    <p style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '13px',
                      color: tokens.colorTextPrimary,
                      marginTop: '8px',
                    }}>
                      I'm excited to share a framework that has transformed my content creation workflow. After months of experimentation, here is what actually works...
                    </p>
                  </div>
                </>
              )}
              {feature.visual === 'queue' && (
                <>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: tokens.colorTextSecondary,
                    }}>Content Queue</span>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '11px',
                      color: tokens.colorAccent,
                    }}>3 posts processing</span>
                  </div>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{
                      padding: '12px',
                      background: tokens.colorSurface2,
                      borderRadius: tokens.radiusMd,
                      border: `1px solid ${tokens.colorBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: n === 1 ? tokens.colorAccent : tokens.colorBorder,
                      }} />
                      <span style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '13px',
                        color: tokens.colorTextPrimary,
                        flex: 1,
                      }}>
                        {n === 1 ? 'SEO framework blog post...' : n === 2 ? 'Announcing new feature...' : 'Weekly newsletter #42...'}
                      </span>
                      {n === 1 && (
                        <Zap size={14} color={tokens.colorAccent} />
                      )}
                    </div>
                  ))}
                </>
              )}
              {feature.visual === 'editor' && (
                <>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: tokens.colorTextSecondary,
                    }}>Tweet #1</span>
                    <Edit3 size={14} color={tokens.colorTextMuted} />
                  </div>
                  <div style={{
                    padding: '12px',
                    background: tokens.colorSurface2,
                    borderRadius: tokens.radiusMd,
                    border: `2px solid ${tokens.colorAccent}`,
                  }}>
                    <textarea
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '13px',
                        color: tokens.colorTextPrimary,
                        resize: 'none',
                        outline: 'none',
                        minHeight: '80px',
                      }}
                      defaultValue="🚀 Just discovered the secret to 10x your content creation. Here is the framework:"
                    />
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    fontSize: '12px',
                    color: tokens.colorAccent,
                  }}>
                    <CheckCircle size={12} /> Changes auto-saved
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cs-feature-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default FeatureHighlights