import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Wand2, Zap, Palette, Layers, Sparkles } from 'lucide-react'
import { useAuth } from '@contexts/AuthContext'
import '../styles/landing.css'

const LandingPage: React.FC = () => {
  const { user, isLoading } = useAuth()

  // Redirect visitors away if they are already authenticated
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
          <Link to="/login" className="nav-link">Log in</Link>
          <Link to="/register" className="nav-cta">Start Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-label">The AI Single-Paste Engine</div>
        <h1 className="hero-title">
          Repurpose Content <br />
          <span className="hero-title-highlight">Like Magic.</span>
        </h1>
        <p className="hero-subtitle">
          Paste your long-form text once. ContentSplit understands your Brand Voice and instantly formats it for Twitter, LinkedIn, Email, and Instagram. No prompts. No tedious repeating.
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/register" className="cta-primary">
            Start Repurposing Now
          </Link>
        </div>
      </section>

      {/* Features Outline */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">One Paste, Infinite Scale</h2>
          <p className="features-subtitle">Our engine transforms your core idea seamlessly across channels.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Wand2 size={28} />
            </div>
            <h3 className="feature-card-title">Brand Voice Injection</h3>
            <p className="feature-card-text">
              We capture your specific Persona and Tone during onboarding. Every piece of content is specifically crafted to sound exactly like you automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3 className="feature-card-title">Parallel Processing</h3>
            <p className="feature-card-text">
              Instead of generating one post at a time, we run all native platform transformations (Twitter, LinkedIn, IG) concurrently. It's lightning fast.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Layers size={28} />
            </div>
            <h3 className="feature-card-title">Native Formatting</h3>
            <p className="feature-card-text">
              From LinkedIn paragraph breaks to Twitter character constraints and Instagram thread structures, outputs are perfectly optimized for their destinations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Palette size={28} />
            </div>
            <h3 className="feature-card-title">Premium Interface</h3>
            <p className="feature-card-text">
              Spend zero time fighting the UI. Beautiful fluid interactions, robust success validations, and a clean reading interface out of the box.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '48px', textAlign: 'center', color: 'var(--sys-color-neutral-50)', background: 'var(--sys-color-surface-container-lowest)' }}>
        <p>&copy; 2026 ContentSplit.ai. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
