import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Twitter, Linkedin, Instagram } from 'lucide-react'

const tokens = {
  colorSurface: '#111118',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
}

const footerLinks = {
  product: ['Features', 'How it works', 'Pricing', 'Changelog', 'API'],
  resources: ['Blog', 'Templates', 'Use cases', 'Docs'],
  company: ['About', 'Twitter/X', 'Privacy Policy', 'Terms of Service', 'Contact'],
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: tokens.colorSurface,
    borderTop: `1px solid ${tokens.colorBorder}`,
    padding: '48px 24px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr repeat(3, 1fr)',
    gap: '48px',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  logoDot: {
    color: tokens.colorAccent,
    fontSize: '24px',
    fontWeight: 700,
  },
  logoText: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: '18px',
    color: tokens.colorTextPrimary,
  },
  tagline: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextMuted,
    lineHeight: 1.6,
  },
  social: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  socialLink: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'transparent',
    border: `1px solid ${tokens.colorBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorTextMuted,
    transition: 'all 0.2s ease',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  columnTitle: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: tokens.colorTextPrimary,
    marginBottom: '8px',
  },
  link: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextMuted,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  bottom: {
    maxWidth: '1200px',
    margin: '48px auto 0',
    paddingTop: '24px',
    borderTop: `1px solid ${tokens.colorBorder}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    color: tokens.colorTextMuted,
  },
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Column */}
        <div style={styles.brand}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoDot}>●</span>
            <span style={styles.logoText}>ContentSplit</span>
          </Link>
          <p style={styles.tagline}>
            Turn your blog into everywhere.
          </p>
          <div style={styles.social}>
            <a href="https://twitter.com" style={styles.socialLink} target="_blank" rel="noopener">
              <Twitter size={16} />
            </a>
            <a href="https://linkedin.com" style={styles.socialLink} target="_blank" rel="noopener">
              <Linkedin size={16} />
            </a>
            <a href="https://instagram.com" style={styles.socialLink} target="_blank" rel="noopener">
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Product</h4>
          {footerLinks.product.map((link) => (
            <a key={link} href="#" style={styles.link}>{link}</a>
          ))}
        </div>

        {/* Resources Column */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Resources</h4>
          {footerLinks.resources.map((link) => (
            <a key={link} href="#" style={styles.link}>{link}</a>
          ))}
        </div>

        {/* Company Column */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Company</h4>
          {footerLinks.company.map((link) => (
            <a key={link} href="#" style={styles.link}>{link}</a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottom}>
        <p style={styles.copyright}>
          © {currentYear} ContentSplit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer