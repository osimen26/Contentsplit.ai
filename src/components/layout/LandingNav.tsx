import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const T = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  border: '#E2E8F0',
  accent: '#111827',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  white: '#FFFFFF',
  rSm: '6px',
  rMd: '12px',
  rPill: '9999px',
}


const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const LandingNav: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid rgba(255,255,255,0.4)`,
        borderRadius: T.rPill,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px 8px 24px',
        width: '90%', maxWidth: '900px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
      }} className="cs-nav">
        <style>{`
          .cs-nav-logo-img { height: 32px; }
          @media (max-width: 767px) {
            .cs-nav-logo-img { height: 24px; }
          }
        `}</style>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px' }}>
          <img src="/images/nav-content.svg" alt="ContentSplit Logo" className="cs-nav-logo-img" />
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }} className="cs-nav-links">
          {navItems.map(({ label: l, href }) => (
            <li key={href}>
              <a href={href} style={{ ...dm(15, 500, { color: '#4B5563', textDecoration: 'none' }) }} className="cs-nav-link">{l}</a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="cs-nav-right">
          <button onClick={() => navigate('/login')} style={{ ...dm(15, 500, { color: '#4B5563' }), background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: T.rPill }} className="cs-ghost-btn">
            Log in
          </button>
          <Link to="/register" style={{ ...dm(15, 500, { color: '#FFFFFF' }), background: '#000000', border: 'none', padding: '10px 20px', borderRadius: T.rPill, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="cs-pill-btn">
            Get started <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button aria-label="Open menu" onClick={() => setOpen(true)} style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: '#000000' }} className="cs-mobile-btn">
          <Menu size={24} aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          zIndex: 1001, display: 'flex', flexDirection: 'column', padding: '24px',
        }} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button aria-label="Close menu" onClick={() => setOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'transparent', border: 'none', cursor: 'pointer', color: '#000000' }}><X size={24} aria-hidden="true" /></button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '80px' }}>
            {navItems.map(({ label: l, href }) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                style={{ ...dm(20, 500, { color: '#000000', textDecoration: 'none' }), padding: '16px 0', borderBottom: `1px solid ${T.border}` }}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
            <button onClick={() => { navigate('/login'); setOpen(false) }}
              style={{ ...dm(16, 500, { color: '#4B5563' }), background: 'transparent', border: `1px solid ${T.border}`, cursor: 'pointer', padding: '14px', borderRadius: T.rMd }}>
              Log in
            </button>
            <Link to="/register" onClick={() => setOpen(false)}
              style={{ ...dm(16, 500, { color: '#FFFFFF' }), background: '#000000', padding: '14px', borderRadius: T.rMd, textDecoration: 'none', textAlign: 'center' }}>
              Get started →
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .cs-nav-link:hover { color:#000000 !important; }
        .cs-ghost-btn:hover { color:#000000 !important; background:rgba(0,0,0,0.05) !important; }
        .cs-pill-btn:hover { background:#333333 !important; }
        @media (max-width: 768px) {
          .cs-nav-links, .cs-nav-right { display:none !important; }
          .cs-mobile-btn { display:flex !important; }
          .cs-nav { width: 95% !important; padding: 12px 16px !important; }
        }
      `}</style>
    </>
  )
}

export default LandingNav
