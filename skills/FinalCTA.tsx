import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
  colorWhite: '#FFFFFF',
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: `linear-gradient(180deg, ${tokens.colorBg} 0%, ${tokens.colorSurface} 100%)`,
    padding: '96px 24px',
    textAlign: 'center',
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: tokens.colorTextPrimary,
    marginBottom: '24px',
    lineHeight: 1.1,
  },
  subtext: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    color: tokens.colorTextSecondary,
    marginBottom: '40px',
  },
  cta: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 600,
    fontSize: '18px',
    color: tokens.colorWhite,
    background: tokens.colorAccent,
    border: 'none',
    cursor: 'pointer',
    padding: '18px 40px',
    borderRadius: '999px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  below: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    color: tokens.colorTextMuted,
    marginTop: '24px',
  },
}

const FinalCTA: React.FC = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.headline}>
        Your next blog post<br />should be everywhere.
      </h2>
      
      <p style={styles.subtext}>
        Start free. No credit card. No setup. Just paste and go.
      </p>
      
      <Link to="/register" style={styles.cta} className="cs-final-cta">
        Start repurposing for free → <ArrowRight size={20} />
      </Link>
      
      <p style={styles.below}>
        5 free repurposes daily · Cancel Pro anytime · Built by creators, for creators
      </p>

      <style>{`
        .cs-final-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px ${tokens.colorAccent}50;
        }
      `}</style>
    </section>
  )
}

export default FinalCTA