import React from 'react'
import { Star } from 'lucide-react'

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

const testimonials = [
  {
    quote: "I write one post a week and now it shows up everywhere. Saves me 3 hours minimum.",
    author: 'Adaeze O.',
    role: 'Content Strategist',
  },
  {
    quote: "The LinkedIn output is scary good. It doesn't sound like AI. That's rare.",
    author: 'Marcus T.',
    role: 'Indie Hacker & Newsletter Writer',
  },
  {
    quote: "I use it for every Substack issue. Twitter thread → newsletter intro → Instagram caption. Done.",
    author: 'Priya K.',
    role: 'Growth Marketer at a B2B SaaS',
  },
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorBg,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '960px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    background: tokens.colorSurface,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusMd,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  stars: {
    display: 'flex',
    gap: '4px',
  },
  quote: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    fontStyle: 'italic',
    color: tokens.colorTextSecondary,
    lineHeight: 1.6,
    flex: 1,
  },
  author: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: tokens.colorTextPrimary,
  },
  role: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: tokens.colorTextMuted,
  },
}

const Testimonials: React.FC = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.headline}>
          What creators are saying.
        </h2>

        <div style={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} style={styles.card} className="cs-testimonial-card">
              <div style={styles.stars}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} fill={tokens.colorAccent} color={tokens.colorAccent} />
                ))}
              </div>
              <p style={styles.quote}>"{t.quote}"</p>
              <div>
                <div style={styles.author}>{t.author}</div>
                <div style={styles.role}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cs-testimonial-card:hover {
          border-color: ${tokens.colorAccent}40 !important;
          transform: translateY(-4px);
          transition: all 0.2s ease;
        }
      `}</style>
    </section>
  )
}

export default Testimonials