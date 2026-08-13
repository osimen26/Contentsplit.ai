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
interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
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
            <button onClick={() => onOpenLegal('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s', padding: 0, font: 'inherit' }} className="cs-link-hover">Privacy</button>
            <button onClick={() => onOpenLegal('terms')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s', padding: 0, font: 'inherit' }} className="cs-link-hover">Terms</button>
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
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

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
      <Footer onOpenLegal={setLegalModal} />

      {legalModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px'
        }} onClick={() => setLegalModal(null)}>
          <div style={{
            background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '700px',
            maxHeight: '90vh', overflowY: 'auto', padding: '40px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setLegalModal(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={16} color="#64748B" />
            </button>
            <h2 style={{ fontFamily: '"Syne", sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '24px', color: '#0F172A' }}>
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h2>
            <div style={{ ...dm(15, 400, { color: '#475569', lineHeight: 1.7 }) }}>
              {legalModal === 'privacy' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>1. Information We Collect</h3>
                  <p>At Contentsplit, we collect information you provide directly to us when you create an account, connect social media profiles, or use our content repurposing features. This may include your name, email address, payment information, and the content you submit for processing.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>2. How We Use Your Information</h3>
                  <p>We use the information we collect to operate and improve our services, process your content repurposing requests using AI models, and communicate with you about your account. Your submitted content is processed strictly for the purpose of generating the requested outputs and is not used to train our AI models without your explicit consent.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>3. Third-Party Integrations</h3>
                  <p>If you connect third-party platforms (such as X, LinkedIn, or Facebook) to Contentsplit, we may access certain information from those accounts as permitted by their respective APIs and your privacy settings on those platforms.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>4. Data Security</h3>
                  <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>5. Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us at privacy@contentsplit.ai.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>1. Acceptance of Terms</h3>
                  <p>By accessing and using Contentsplit, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>2. Use of Service</h3>
                  <p>Contentsplit provides AI-powered content repurposing tools. You agree to use these services only for lawful purposes. You retain all ownership rights to the original content you submit to Contentsplit.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>3. User Accounts</h3>
                  <p>You are responsible for maintaining the confidentiality of your account credentials. You must immediately notify us of any unauthorized use of your account.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>4. AI Generation and Liability</h3>
                  <p>While our AI models strive to produce high-quality content, we do not guarantee the accuracy, completeness, or suitability of generated content. You are responsible for reviewing and verifying all generated content before publishing it on any platform.</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>5. Modifications to Service</h3>
                  <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
