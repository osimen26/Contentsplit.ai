import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react'

// Design tokens from BUILD_GUIDE
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

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    background: `${tokens.colorBg}cc`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${tokens.colorBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 48px',
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
    textDecoration: 'none',
  },
  logoDot: {
    color: tokens.colorAccent,
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1,
    marginRight: '2px',
  },
  logoText: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    color: tokens.colorTextPrimary,
  },
  logoSplit: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    color: tokens.colorTextPrimary,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: tokens.colorTextSecondary,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  ghostButton: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: tokens.colorTextSecondary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: tokens.radiusSm,
    transition: 'all 0.2s ease',
  },
  pillButton: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: tokens.colorWhite,
    background: tokens.colorAccent,
    border: 'none',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: tokens.radiusPill,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
  },
  mobileMenuButton: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: tokens.colorTextPrimary,
  },
  mobileDrawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `${tokens.colorBg}ee`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    gap: '24px',
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '48px',
  },
  mobileNavLink: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    color: tokens.colorTextPrimary,
    textDecoration: 'none',
    padding: '12px 0',
    borderBottom: `1px solid ${tokens.colorBorder}`,
  },
  mobileNavRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: 'auto',
  },
  mobileGhostButton: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    color: tokens.colorTextSecondary,
    background: 'transparent',
    border: `1px solid ${tokens.colorBorder}`,
    cursor: 'pointer',
    padding: '14px 20px',
    borderRadius: tokens.radiusMd,
    width: '100%',
    textAlign: 'center' as const,
  },
  mobilePillButton: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    color: tokens.colorWhite,
    background: tokens.colorAccent,
    border: 'none',
    cursor: 'pointer',
    padding: '14px 20px',
    borderRadius: tokens.radiusMd,
    width: '100%',
    textAlign: 'center' as const,
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: tokens.colorTextPrimary,
  },
}

const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
  ]

  return (
    <>
      <nav style={styles.nav} className="cs-nav">
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoDot}>●</span>
          <span style={styles.logoText}>Content</span>
          <span style={styles.logoSplit}>Split</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul style={{ ...styles.navLinks, display: 'flex' }} className="cs-nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                style={styles.navLink}
                className="cs-nav-link"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Nav Right */}
        <div style={{ ...styles.navRight, display: 'flex' }} className="cs-nav-right">
          <button
            style={styles.ghostButton}
            className="cs-ghost-btn"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
          <Link
            to="/register"
            style={styles.pillButton}
            className="cs-pill-btn"
          >
            Start free →
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{ ...styles.mobileMenuButton, display: 'none' }}
          className="cs-mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={styles.mobileDrawer} className="cs-mobile-drawer">
          <button
            style={styles.closeButton}
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>

          <div style={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div style={styles.mobileNavRight}>
            <button
              style={styles.mobileGhostButton}
              onClick={() => {
                navigate('/login')
                setMobileOpen(false)
              }}
            >
              Log in
            </button>
            <Link
              to="/register"
              style={styles.mobilePillButton}
              onClick={() => setMobileOpen(false)}
            >
              Start free →
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono&display=swap');

        .cs-nav-link {
          position: relative;
        }

        .cs-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${tokens.colorAccent};
          transition: width 0.2s ease;
        }

        .cs-nav-link:hover {
          color: ${tokens.colorTextPrimary} !important;
        }

        .cs-nav-link:hover::after {
          width: 100%;
        }

        .cs-ghost-btn:hover {
          color: ${tokens.colorTextPrimary};
          background: ${tokens.colorSurface};
        }

        .cs-pill-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 20px ${tokens.colorAccent}40;
        }

        @media (max-width: 768px) {
          .cs-nav-links { display: none !important; }
          .cs-nav-right { display: none !important; }
          .cs-mobile-menu-btn { display: flex !important; }
        }

        @media (min-width: 769px) {
          .cs-mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Nav