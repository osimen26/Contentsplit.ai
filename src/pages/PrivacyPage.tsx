import React from 'react'
import { Link } from 'react-router-dom'

const s = {
  page: { minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: '"DM Sans", system-ui, sans-serif' } as React.CSSProperties,
  header: { borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
  main: { maxWidth: 720, margin: '0 auto', padding: '56px 40px 80px' } as React.CSSProperties,
  h1: { fontFamily: 'ui-serif, Georgia, serif', fontSize: '2rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 10px' } as React.CSSProperties,
  meta: { fontSize: '0.85rem', color: '#94A3B8', margin: '0 0 48px' } as React.CSSProperties,
  h2: { fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 12px', paddingBottom: 10, borderBottom: '1px solid rgba(0,0,0,0.06)' } as React.CSSProperties,
  p: { fontSize: '0.9rem', color: '#475569', lineHeight: 1.8, margin: '0 0 12px' } as React.CSSProperties,
  ul: { paddingLeft: 20, margin: '8px 0 12px', fontSize: '0.9rem', color: '#475569', lineHeight: 1.8 } as React.CSSProperties,
  section: { marginBottom: 44 } as React.CSSProperties,
  link: { color: '#0F172A', fontWeight: 500 } as React.CSSProperties,
  footer: { borderTop: '1px solid rgba(0,0,0,0.06)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 } as React.CSSProperties,
  footerLink: { fontSize: '0.85rem', color: '#94A3B8', textDecoration: 'none' } as React.CSSProperties,
}

const Sec: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section style={s.section}>
    <h2 style={s.h2}>{title}</h2>
    {children}
  </section>
)

const PrivacyPage: React.FC = () => (
  <div style={s.page}>
    <header style={s.header}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="/logo.svg" alt="ContentSplit" style={{ width: 30, height: 30, borderRadius: 7 }} />
        <span style={{ fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>ContentSplit</span>
      </Link>
      <Link to="/login" style={{ ...s.footerLink, color: '#64748B' }}>Back to app →</Link>
    </header>

    <main style={s.main}>
      <h1 style={s.h1}>Privacy Policy</h1>
      <p style={s.meta}>Effective date: 1 August 2025 · Last updated: 24 August 2026</p>

      <p style={{ ...s.p, marginBottom: 40 }}>
        ContentSplit.ai ("ContentSplit", "we", "us", or "our") operates the ContentSplit.ai web application (the "Service").
        This Privacy Policy explains how we collect, use, share, and protect your information when you use our Service.
      </p>

      <Sec title="1. Information We Collect">
        <p style={s.p}><strong>Account Information:</strong> When you register, we collect your email address, name, and a hashed password. If you sign up via Google OAuth we receive your name, email, and profile picture from Google.</p>
        <p style={s.p}><strong>Content You Submit:</strong> We process the long-form text you paste into ContentSplit to generate social media content. This content is passed to our AI provider (DeepSeek) and stored in your conversion history according to your plan limits.</p>
        <p style={s.p}><strong>Usage Data:</strong> We collect information about how you interact with the Service — conversions made, platforms selected, tone preferences, and feature usage.</p>
        <p style={s.p}><strong>Payment Information:</strong> Payments are processed by Flutterwave. We do not store your card details. We only receive a transaction confirmation and your resulting subscription tier.</p>
        <p style={s.p}><strong>Social Media Tokens:</strong> If you connect social accounts (Twitter/X, LinkedIn, Instagram, Facebook, Threads), we store encrypted OAuth access tokens to enable direct publishing. Tokens are encrypted with AES-256-GCM before storage.</p>
      </Sec>

      <Sec title="2. How We Use Your Information">
        <ul style={s.ul}>
          <li>To provide and improve the ContentSplit Service</li>
          <li>To authenticate your account and manage sessions securely</li>
          <li>To generate AI-powered content from your submitted text</li>
          <li>To store your conversion history per your subscription tier</li>
          <li>To process payments and manage your subscription</li>
          <li>To send account-related emails (password recovery, billing receipts)</li>
          <li>To analyse aggregate usage patterns and improve the product</li>
        </ul>
        <p style={s.p}>We do not sell your personal data to third parties, and we do not use your content to train AI models.</p>
      </Sec>

      <Sec title="3. Third-Party Services">
        <p style={s.p}>We use the following third-party providers to operate ContentSplit. Each has its own privacy policy:</p>
        <ul style={s.ul}>
          <li><strong>Supabase</strong> — Database and file storage (EU/US data centres)</li>
          <li><strong>DeepSeek</strong> — AI content generation. Your submitted text is sent to DeepSeek's API for processing.</li>
          <li><strong>Flutterwave</strong> — Payment processing for African markets</li>
          <li><strong>Vercel</strong> — Hosting and serverless functions</li>
          <li><strong>Google OAuth</strong> — Optional social sign-in</li>
          <li><strong>Twitter/X, LinkedIn, Instagram, Facebook, Threads</strong> — Optional direct publishing (only when you explicitly connect an account)</li>
        </ul>
      </Sec>

      <Sec title="4. Data Retention">
        <p style={s.p}>We retain your data for as long as your account is active. When you delete your account (Settings → Danger Zone), we permanently delete your profile, conversion history, and social media tokens within 30 days.</p>
        <p style={s.p}>Conversion history is stored according to your plan: Free (last 3), Pro (last 50), Agency (unlimited). Anonymised aggregate analytics may be retained for up to 12 months.</p>
      </Sec>

      <Sec title="5. Your Rights">
        <p style={s.p}>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul style={s.ul}>
          <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
          <li><strong>Correction:</strong> Update or correct inaccurate information via Settings</li>
          <li><strong>Deletion:</strong> Delete your account and all associated data via Settings → Danger Zone</li>
          <li><strong>Portability:</strong> Request a machine-readable export of your conversion history</li>
          <li><strong>Objection:</strong> Object to certain types of data processing</li>
        </ul>
        <p style={s.p}>
          These rights are provided under GDPR (EU/EEA residents) and NDPR (Nigeria residents).
          To exercise any right, email <a href="mailto:privacy@contentsplit.ai" style={s.link}>privacy@contentsplit.ai</a>.
        </p>
      </Sec>

      <Sec title="6. Cookies & Local Storage">
        <p style={s.p}>ContentSplit does not use third-party tracking cookies. We use browser <code style={{ background: '#F1F5F9', padding: '1px 5px', borderRadius: 4, fontSize: '0.85em' }}>localStorage</code> to store your authentication token and UI preferences. This data never leaves your browser unless transmitted to our servers as part of a normal authenticated API request.</p>
      </Sec>

      <Sec title="7. Security">
        <p style={s.p}>We implement industry-standard security measures including:</p>
        <ul style={s.ul}>
          <li>bcrypt password hashing (cost factor 12)</li>
          <li>AES-256-GCM encryption for stored social media OAuth tokens</li>
          <li>HTTPS (TLS 1.2+) for all data in transit</li>
          <li>Row Level Security (RLS) enforced on all Supabase database tables</li>
          <li>Rate limiting on all authentication and content generation endpoints</li>
          <li>JWT token denylist for immediate session invalidation on logout</li>
        </ul>
      </Sec>

      <Sec title="8. Changes to This Policy">
        <p style={s.p}>We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a notice within the application. Continued use of the Service after changes take effect constitutes your acceptance of the updated policy.</p>
      </Sec>

      <Sec title="9. Contact Us">
        <p style={s.p}>Questions about this Privacy Policy? Contact us at:</p>
        <p style={{ ...s.p, marginBottom: 0 }}>
          <strong>ContentSplit.ai</strong><br />
          Email: <a href="mailto:privacy@contentsplit.ai" style={s.link}>privacy@contentsplit.ai</a>
        </p>
      </Sec>
    </main>

    <footer style={s.footer}>
      <Link to="/" style={s.footerLink}>Home</Link>
      <Link to="/terms" style={s.footerLink}>Terms of Service</Link>
      <span style={s.footerLink}>© {new Date().getFullYear()} ContentSplit.ai</span>
    </footer>
  </div>
)

export default PrivacyPage
