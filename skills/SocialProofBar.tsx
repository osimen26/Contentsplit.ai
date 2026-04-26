import React from 'react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
}

const logos = ['Indie Hackers', 'Product Hunt', 'Growth.design', 'Beehiiv', 'Substack']

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorSurface,
    padding: '24px 0',
    borderTop: `1px solid ${tokens.colorBorder}`,
    borderBottom: `1px solid ${tokens.colorBorder}`,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  text: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextMuted,
    textAlign: 'center',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    opacity: 0.4,
  },
  logo: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '12px',
    color: tokens.colorTextMuted,
    letterSpacing: '0.05em',
  },
  divider: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: tokens.colorTextMuted,
    opacity: 0.3,
  },
}

const SocialProofBar: React.FC = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <p style={styles.text}>
          Trusted by 2,000+ creators, marketers, and content teams
        </p>
        <div style={styles.logoRow}>
          {logos.map((logo, i) => (
            <React.Fragment key={logo}>
              <span style={styles.logo}>{logo}</span>
              {i < logos.length - 1 && <span style={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProofBar