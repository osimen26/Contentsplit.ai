import React from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorSurface2: '#1A1A24',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
  colorWhite: '#FFFFFF',
  radiusMd: '12px',
  radiusLg: '20px',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    subtitle: 'For creators just getting started',
    features: [
      '5 repurposes per day',
      'Twitter, LinkedIn, Instagram',
      'Copy-to-clipboard export',
      'Basic editor',
    ],
    cta: 'Get started free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    subtitle: 'For teams and serious creators',
    features: [
      'Unlimited repurposes',
      'All 6 output formats',
      'Batch mode (up to 10 posts/session)',
      'Inline editor + version history',
      'Priority AI generation', 
      'Early access to new formats',
    ],
    cta: 'Start Pro free for 7 days',
    popular: true,
  },
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: `${tokens.colorSurface}`,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    color: tokens.colorTextPrimary,
    textAlign: 'center',
    marginBottom: '48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  card: {
    background: tokens.colorBg,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusLg,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardPopular: {
    borderColor: tokens.colorAccent,
    boxShadow: `0 0 40px ${tokens.colorAccent}15`,
  },
  badge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: tokens.colorAccent,
    color: tokens.colorWhite,
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '6px 16px',
    borderRadius: '20px',
  },
  planName: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 600,
    fontSize: '20px',
    color: tokens.colorTextPrimary,
    marginBottom: '8px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '4px',
  },
  price: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: '48px',
    color: tokens.colorText Primary,
  },
  period: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextMuted,
  },
  subtitle: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextSecondary,
    marginBottom: '24px',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
    flex: 1,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextSecondary,
  },
  cta: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 600,
    fontSize: '15px',
    padding: '16px 24px',
    borderRadius: tokens.radiusMd,
    textAlign: 'center',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
  },
  ctaGhost: {
    color: tokens.colorTextSecondary,
    background: 'transparent',
    border: `1px solid ${tokens.colorBorder}`,
  },
  ctaPrimary: {
    color: tokens.colorWhite,
    background: tokens.colorAccent,
  },
  below: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: tokens.colorTextMuted,
    textAlign: 'center',
    marginTop: '24px',
  },
}

const Pricing: React.FC = () => {
  return (
    <section style={styles.section} id="pricing">
      <div style={styles.container}>
        <h2 style={styles.headline}>
          One tool. Every platform.
        </h2>

        <div style={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                ...styles.card,
                ...(plan.popular ? styles.cardPopular : {}),
              }}
            >
              {plan.popular && <div style={styles.badge}>Most popular</div>}
              
              <h3 style={styles.planName}>{plan.name}</h3>
              
              <div style={styles.priceRow}>
                <span style={styles.price}>{plan.price}</span>
                <span style={styles.period}>{plan.period}</span>
              </div>
              
              <p style={styles.subtitle}>{plan.subtitle}</p>
              
              <ul style={styles.features}>
                {plan.features.map((feature, j) => (
                  <li key={j} style={styles.featureItem}>
                    <Check size={16} color={tokens.colorAccent} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                to="/register"
                style={{
                  ...styles.cta,
                  ...(plan.popular ? styles.ctaPrimary : styles.ctaGhost),
                }}
                className={plan.popular ? 'cs-cta-primary' : 'cs-cta-ghost'}
              >
                {plan.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <p style={styles.below}>
          No contracts. Cancel anytime.
        </p>
      </div>

      <style>{`
        .cs-cta-ghost:hover {
          color: ${tokens.colorTextPrimary};
          border-color: ${tokens.colorTextMuted};
        }
        .cs-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px ${tokens.colorAccent}40;
        }
      `}</style>
    </section>
  )
}

export default Pricing