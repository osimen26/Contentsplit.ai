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

const TermsPage: React.FC = () => (
  <div style={s.page}>
    <header style={s.header}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="/logo.svg" alt="ContentSplit" style={{ width: 30, height: 30, borderRadius: 7 }} />
        <span style={{ fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>ContentSplit</span>
      </Link>
      <Link to="/login" style={{ ...s.footerLink, color: '#64748B' }}>Back to app →</Link>
    </header>

    <main style={s.main}>
      <h1 style={s.h1}>Terms of Service</h1>
      <p style={s.meta}>Effective date: 1 August 2025 · Last updated: 24 August 2026</p>

      <p style={{ ...s.p, marginBottom: 40 }}>
        Please read these Terms of Service ("Terms") carefully before using ContentSplit.ai (the "Service") operated by ContentSplit.ai ("we", "us", or "our").
        By accessing or using the Service you agree to be bound by these Terms.
      </p>

      <Sec title="1. Acceptance of Terms">
        <p style={s.p}>By creating an account or using the Service in any way, you confirm that you are at least 18 years old, have read and understood these Terms, and agree to be bound by them. If you are using the Service on behalf of an organisation, you represent that you have the authority to bind that organisation.</p>
      </Sec>

      <Sec title="2. Description of Service">
        <p style={s.p}>ContentSplit.ai is an AI-powered content repurposing tool. It takes long-form content (blog posts, articles, newsletters, transcripts) submitted by you and uses AI to generate platform-optimised social media content for Twitter/X, LinkedIn, Instagram, Facebook, Threads, and Email.</p>
        <p style={s.p}>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice.</p>
      </Sec>

      <Sec title="3. User Accounts">
        <p style={s.p}>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must:</p>
        <ul style={s.ul}>
          <li>Provide accurate and complete registration information</li>
          <li>Keep your password secure and not share it with third parties</li>
          <li>Notify us immediately of any unauthorised use of your account</li>
          <li>Not create accounts for the purpose of circumventing usage limits</li>
        </ul>
      </Sec>

      <Sec title="4. Acceptable Use">
        <p style={s.p}>You agree not to use the Service to:</p>
        <ul style={s.ul}>
          <li>Generate, distribute, or promote content that is illegal, harmful, defamatory, obscene, or violates any third party's rights</li>
          <li>Spam social media platforms or violate any platform's terms of service</li>
          <li>Attempt to reverse-engineer, scrape, or extract data from the Service beyond normal use</li>
          <li>Introduce malware, viruses, or other harmful code</li>
          <li>Impersonate any person or entity or misrepresent your affiliation</li>
          <li>Use the Service for any unlawful purpose or in violation of applicable regulations</li>
        </ul>
        <p style={s.p}>We reserve the right to suspend or terminate accounts that violate these guidelines without prior notice.</p>
      </Sec>

      <Sec title="5. Your Content & Intellectual Property">
        <p style={s.p}><strong>Your content:</strong> You retain all intellectual property rights in the content you submit to ContentSplit. You grant us a limited, non-exclusive licence to process your content solely for the purpose of providing the Service to you.</p>
        <p style={s.p}><strong>Generated content:</strong> The AI-generated outputs produced from your submitted content are yours to use. We make no claim to ownership of generated content.</p>
        <p style={s.p}><strong>Our platform:</strong> ContentSplit.ai, its branding, design, software, and underlying technology are protected by intellectual property laws. You may not copy, modify, or create derivative works of the platform itself.</p>
      </Sec>

      <Sec title="6. Subscriptions & Payments">
        <p style={s.p}>ContentSplit offers a Free plan and paid plans (Pro and Agency). Paid plans are billed monthly or yearly and processed securely by Flutterwave.</p>
        <ul style={s.ul}>
          <li><strong>Billing:</strong> Subscriptions renew automatically at the end of each billing period.</li>
          <li><strong>Cancellation:</strong> You may cancel your subscription at any time by contacting us. Access continues until the end of the current billing period.</li>
          <li><strong>Refunds:</strong> Refunds are considered on a case-by-case basis within 7 days of a charge. Contact <a href="mailto:support@contentsplit.ai" style={s.link}>support@contentsplit.ai</a>.</li>
          <li><strong>Tier changes:</strong> Your subscription tier is managed exclusively by our payment webhook. Upgrading takes effect immediately.</li>
          <li><strong>Price changes:</strong> We will provide at least 30 days' notice before changing subscription prices.</li>
        </ul>
      </Sec>

      <Sec title="7. Disclaimer of Warranties">
        <p style={s.p}>The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that AI-generated content will be accurate, complete, or suitable for your purposes.</p>
        <p style={s.p}>You are solely responsible for reviewing and editing AI-generated content before publishing it anywhere.</p>
      </Sec>

      <Sec title="8. Limitation of Liability">
        <p style={s.p}>To the fullest extent permitted by law, ContentSplit.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Service.</p>
        <p style={s.p}>Our total liability for any claim arising from these Terms or your use of the Service shall not exceed the total amount you paid to us in the 12 months preceding the claim.</p>
      </Sec>

      <Sec title="9. Third-Party Social Platforms">
        <p style={s.p}>When you connect social media accounts and use our publishing features, you are also subject to the terms of those platforms (Twitter/X, LinkedIn, Instagram, Facebook, Threads). We are not responsible for any actions those platforms take in relation to content you publish through our Service.</p>
      </Sec>

      <Sec title="10. Privacy">
        <p style={s.p}>Your use of the Service is subject to our <Link to="/privacy" style={s.link}>Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>
      </Sec>

      <Sec title="11. Governing Law & Disputes">
        <p style={s.p}>These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising under these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of Nigeria.</p>
      </Sec>

      <Sec title="12. Changes to Terms">
        <p style={s.p}>We may update these Terms from time to time. We will notify you of material changes by email or in-app notice at least 14 days before they take effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms.</p>
      </Sec>

      <Sec title="13. Contact Us">
        <p style={s.p}>Questions about these Terms? Contact us at:</p>
        <p style={{ ...s.p, marginBottom: 0 }}>
          <strong>ContentSplit.ai</strong><br />
          Email: <a href="mailto:legal@contentsplit.ai" style={s.link}>legal@contentsplit.ai</a>
        </p>
      </Sec>
    </main>

    <footer style={s.footer}>
      <Link to="/" style={s.footerLink}>Home</Link>
      <Link to="/privacy" style={s.footerLink}>Privacy Policy</Link>
      <span style={s.footerLink}>© {new Date().getFullYear()} ContentSplit.ai</span>
    </footer>
  </div>
)

export default TermsPage
