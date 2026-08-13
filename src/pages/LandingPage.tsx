import React, { useState } from 'react'
import LandingNav from '../components/layout/LandingNav'
import LandingHero from '../components/layout/LandingHero'
import LandingSocialProof from '../components/layout/LandingSocialProof'
import LandingOutputShowcase from '../components/layout/LandingOutputShowcase'
import LandingHowItWorks from '../components/layout/LandingHowItWorks'
import LandingSeeItWork from '../components/layout/LandingSeeItWork'
import LandingFeatureHighlights from '../components/layout/LandingFeatureHighlights'
import LandingTestimonials from '../components/layout/LandingTestimonials'
import LandingPricing from '../components/layout/LandingPricing'
import LandingFAQ from '../components/layout/LandingFAQ'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

import {
  TwitterIcon as TwIcon,
  LinkedInIcon as LiIcon,
} from '@components/ui/SocialIcons'

import '../styles/landing-mobile.css'

// ─── Design tokens (ContentSplit BUILD_GUIDE v1.0) ───────────────────────────
const T = {
  bg:          '#FFFFFF',
  surface:     '#F8FAFC',
  surface2:    '#F1F5F9',
  border:      '#E2E8F0',
  accent:      '#111827',
  accentWarm:  '#FF6B6B',
  textPrimary:   '#0F172A',
  textSecondary: '#475569',
  textMuted:     '#94A3B8',
  white:       '#FFFFFF',
  rSm:  '6px',
  rMd:  '12px',
  rLg:  '20px',
  rPill:'999px',
}


// ─── Utility styles ───────────────────────────────────────────────────────────
const syne  = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})


// ─────────────────────────────────────────────────────────────────────────────






// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const cols = [
    { 
      title: 'General', 
      links: ['Home', 'Pricing', 'Blog', 'Help Center', 'Contact'] 
    },
    { 
      title: 'Product', 
      links: ['Core Repurposing', 'AI Thread Builder', 'AI LinkedIn Post', 'Analytics'] 
    },
    { 
      title: 'Use Cases', 
      links: ['For Creators', 'For Founders', 'For Agencies', 'For Marketers', 'For Podcasters'] 
    }
  ]

  return (
    <footer style={{ background: '#222222', color: '#A1A1AA', padding: '80px 24px 40px', borderTop: '1px solid #333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="cs-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '32px', marginBottom: '80px' }}>
          
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                  <img src="/logo.svg" alt="C" style={{ width: '18px', height: '18px' }} />
                </div>
                <span style={{ ...syne(22, 700, { color: '#FFFFFF' }) }}>Contentsplit</span>
              </Link>
              <p style={{ ...dm(14, 400, { color: '#A1A1AA', lineHeight: 1.5 }) }}>The all-in-one content solution</p>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '64px' }}>
              <a href="#" style={{ color: '#A1A1AA', transition: 'color 0.2s' }} className="cs-social-hover" aria-label="LinkedIn">
                <LiIcon size={22} />
              </a>
              <a href="#" style={{ color: '#A1A1AA', transition: 'color 0.2s' }} className="cs-social-hover" aria-label="X (Twitter)">
                <TwIcon size={22} />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          {cols.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ ...dm(15, 600, { color: '#E5E7EB', marginBottom: '4px' }) }}>{col.title}</h4>
              {col.links.map((l, i) => (
                <a key={i} href="#" style={{ ...dm(14, 400, { color: '#A1A1AA', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }) }} className="cs-link-hover">
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#333333', marginBottom: '32px' }} />

        {/* Bottom Bar */}
        <div className="cs-footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          
          <div style={{ display: 'flex', gap: '24px', ...dm(14, 400, { color: '#A1A1AA' }) }}>
            <Link to="/privacy" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s', padding: 0, font: 'inherit' }} className="cs-link-hover">Privacy</Link>
            <Link to="/terms" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s', padding: 0, font: 'inherit' }} className="cs-link-hover">Terms</Link>
            <span>© {new Date().getFullYear()} Contentsplit, Inc.</span>
          </div>

        </div>
      </div>
      <style>{`
        .cs-social-hover:hover { color: #FFFFFF !important; }
        .cs-link-hover:hover { color: #FFFFFF !important; }
        .cs-social-hover:focus, .cs-link-hover:focus { outline: none; }
        .cs-social-hover:focus-visible, .cs-link-hover:focus-visible { 
          background: rgba(17, 24, 39, 0.15);
          box-shadow: 0 0 0 4px rgba(17, 24, 39, 0.15);
          border-radius: 4px;
          color: #FFFFFF !important;
        }
        @media (max-width: 1024px) {
          .cs-footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .cs-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-footer-bottom { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .cs-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  return (
    <div style={{ background: T.bg, minHeight:'100vh', fontFamily:'"DM Sans", sans-serif', color: T.textPrimary, overflowX:'hidden' }}>
      <a href="#main-content" className="cs-skip-link">Skip to main content</a>
      <LandingNav />
      <main id="main-content">
        <LandingHero />
        <LandingSocialProof />
        <LandingOutputShowcase />
        <LandingHowItWorks />
        <LandingSeeItWork />
        <LandingFeatureHighlights />
        <LandingTestimonials />
        <LandingPricing />
        <LandingFAQ />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
