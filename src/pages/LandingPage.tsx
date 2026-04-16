import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Wand2, Zap, Layers, Sparkles, Shield, Lock, CheckCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '@contexts/AuthContext'
import '../styles/landing.css'

const LandingPage: React.FC = () => {
  const { user, isLoading } = useAuth()

  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="landing-wrapper">
      {/* Navigation App Bar */}
      <nav className="landing-navbar">
        <Link to="/" className="landing-logo">
          <Sparkles size={24} color="var(--sys-color-roles-primary-color-role-primary-role)" />
          ContentSplit
        </Link>
        <div className="landing-nav-links">
          <Link to="/login" className="nav-link">Log In</Link>
          <Link to="/register" className="nav-cta">Get started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" style={{ paddingBottom: '40px' }}>
        <h1 className="hero-title">
          Your AI Repurposing Assistant
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--sys-color-neutral-30)', maxWidth: '700px' }}>
          ContentSplit organizes your ideas, drafts social posts, and formats everything with AI workflows.
        </p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '48px', color: 'var(--sys-color-roles-primary-color-role-primary-role)' }}>
          Reclaim 90% of your creation time
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/register" className="cta-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Try ContentSplit Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 3-Step Timeline Section (Jace.ai inspired) */}
      <section style={{ padding: '48px 5%', backgroundColor: 'var(--sys-color-surface-container-lowest)', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>1. Connect your Brand</h3>
            <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
              Securely set your Persona and Tone – setup is instant and effortless.
            </p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>2. ContentSplit onboards itself</h3>
            <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
              No training required – it instantly masters your style and company context better than any human could.
            </p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>3. Review and post</h3>
            <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
              Content organized. Approve drafts instantly across Twitter, LinkedIn, and Email, saving hours each day.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="features-section" style={{ backgroundColor: 'var(--sys-color-primary-99)' }}>
        <div className="features-header">
          <h2 className="features-title">Write less, publish more</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Zap size={28} /></div>
            <h3 className="feature-card-title">AI Content Drafts</h3>
            <p className="feature-card-text">
              Spend 5 seconds reviewing instead of 45 minutes rewriting and formatting for different social rules.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Layers size={28} /></div>
            <h3 className="feature-card-title">Platform Rules</h3>
            <p className="feature-card-text">
              Your personal formatting assistant. Let AI handle Twitter constraints, LinkedIn line-breaks, and Instagram hashtags.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><CheckCircle size={28} /></div>
            <h3 className="feature-card-title">One-Click Export</h3>
            <p className="feature-card-text">
              Copy content directly to your clipboard or send straight to your scheduling tools instantly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Wand2 size={28} /></div>
            <h3 className="feature-card-title">AI Chief of Content</h3>
            <p className="feature-card-text">
              Chat directly with ContentSplit to refine tones, summarize articles, or extract Hooks instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-surface-container-lowest)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="features-title" style={{ marginBottom: '64px' }}>Bank-level privacy for your peace of mind</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', textAlign: 'left' }}>
            <div>
              <Lock size={32} color="var(--sys-color-neutral-40)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Encryption</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)' }}>Your content is encrypted in transit and at rest.</p>
            </div>
            <div>
              <Shield size={32} color="var(--sys-color-neutral-40)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Privacy First</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)' }}>We never train public AI models on your private drafts or internal business data.</p>
            </div>
            <div>
              <CheckCircle size={32} color="var(--sys-color-neutral-40)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Secure. Encrypted.</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)' }}>With industry-leading encryption parameters via our secure proxy layer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-primary-95)', textAlign: 'center' }}>
        <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to reclaim your time?</h2>
        <p style={{ color: 'var(--sys-color-neutral-40)', fontSize: '1.2rem', marginBottom: '40px' }}>
          Join thousands of professionals who've already transformed their creation workflow.
        </p>
        <Link to="/register" className="cta-primary">
          Get Started For Free
        </Link>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '64px 5%', color: 'var(--sys-color-neutral-50)', background: 'var(--sys-color-surface-container-lowest)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <div className="landing-logo" style={{ marginBottom: '16px', fontSize: '1.2rem' }}>
            <Sparkles size={20} color="var(--sys-color-roles-primary-color-role-primary-role)" /> ContentSplit
          </div>
          <p>© 2026 ContentSplit.ai. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <strong style={{ color: 'var(--sys-color-neutral-10)' }}>Product</strong>
            <Link to="/pricing" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Pricing</Link>
            <Link to="/features" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Features</Link>
            <Link to="/changelog" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Changelog</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <strong style={{ color: 'var(--sys-color-neutral-10)' }}>Company</strong>
            <Link to="/about" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>About us</Link>
            <Link to="/terms" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Terms of service</Link>
            <Link to="/privacy" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
