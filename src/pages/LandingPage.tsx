import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  Zap,
  Layers,
  Sparkles,
  Lock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Mail,
  ChevronDown,
  Star,
  EyeOff,
  Brain,
  Menu,
  X,
  Copy,
} from 'lucide-react'
import { useAuth } from '@contexts/AuthContext'
import HowItWorksSection from '@components/landing/HowItWorksSection'
// Keep Avatar for potential future use in testimonials
import Avatar from '@components/ui/Avatar'
import '../styles/landing.css'

const TwitterIcon = ({ size = 18, color = '#1DA1F2' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = ({ size = 18, color = '#0077b5' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = ({ size = 18, color = '#E1306C' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggle = () => setIsOpen(!isOpen)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div
      style={{
        background: 'var(--sys-color-neutral-99)',
        padding: 'var(--sys-spacing-lg)',
        borderRadius: 'var(--sys-radius-card)',
        border: '1px solid var(--sys-color-neutral-90)',
        cursor: 'pointer',
        transition: 'all var(--sys-motion-duration-medium) var(--sys-motion-easing-standard)',
      }}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--sys-color-primary-40)'
        e.currentTarget.style.background = 'var(--sys-color-primary-98)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--sys-color-neutral-90)'
        e.currentTarget.style.background = 'var(--sys-color-neutral-99)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--sys-spacing-md)',
        }}
      >
        <h4
          style={{
            fontSize: 'var(--sys-font-title-small-regular-font-size)',
            fontWeight: 600,
            margin: 0,
            color: 'var(--sys-color-neutral-10)',
          }}
        >
          {question}
        </h4>
        <ChevronDown
          size={20}
          color="var(--sys-color-neutral-40)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition:
              'transform var(--sys-motion-duration-medium) var(--sys-motion-easing-standard)',
            flexShrink: 0,
          }}
        />
      </div>
      <div
        style={{
          maxHeight: isOpen ? '200px' : '0',
          overflow: 'hidden',
          transition:
            'max-height var(--sys-motion-duration-medium) var(--sys-motion-easing-standard), margin-top var(--sys-motion-duration-medium) var(--sys-motion-easing-standard)',
          marginTop: isOpen ? 'var(--sys-spacing-md)' : '0',
        }}
      >
        <p
          style={{
            color: 'var(--sys-color-neutral-50)',
            lineHeight: 1.6,
            margin: 0,
            fontSize: 'var(--sys-font-body-text-regular-font-size)',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}

const LandingPage: React.FC = () => {
  const { user, isLoading } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="landing-wrapper">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* Navigation App Bar */}
      <nav className="landing-navbar">
        <Link to="/" className="landing-logo" style={{ padding: 0 }}>
          <img src="/logowordmark.svg" alt="ContentSplit" style={{ height: '32px', width: 'auto' }} />
        </Link>
        <div className="landing-nav-links">
          <Link to="/login" className="nav-link">
            Log In
          </Link>
          <Link
            to="/register"
            className="nav-cta"
            style={{ color: 'var(--sys-color-neutral-100)' }}
          >
            Get started
          </Link>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown Overlay */}
        {isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '80px',
              left: '0',
              right: '0',
              background: 'var(--sys-color-neutral-100)',
              backdropFilter: 'blur(16px)',
              padding: '24px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              zIndex: 1001,
              border: '1px solid var(--sys-color-neutral-90)',
              margin: '0 16px',
            }}
          >
            <Link
              to="/login"
              className="nav-link"
              style={{ fontSize: '1.2rem', padding: '12px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="nav-cta"
              style={{
                color: 'var(--sys-color-neutral-100)',
                textAlign: 'center',
                padding: '16px',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="landing-hero animate-fade-in" style={{ paddingBottom: '40px' }}>
        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}>
          Scale your thoughts.
        </h1>
        <p
          className="hero-subtitle"
          style={{
            fontSize: '1.25rem',
            color: 'var(--sys-color-neutral-30)',
            maxWidth: '750px',
            marginTop: '24px',
            marginBottom: '0',
          }}
        >
          Turn a single idea into a week of high-converting content. ContentSplit adopts your
          personal voice to instantly generate native posts for every platform.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px',
          }}
        >
          <Link
            to="/register"
            className="cta-primary cta-glow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '18px 48px',
              fontSize: '1.2rem',
              color: 'var(--sys-color-neutral-100)',
            }}
          >
            Start Creating For Free <ArrowRight size={20} />
          </Link>
        </div>

        {/* Platform Capsules */}
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '800px',
          }}
        >
          <div className="hero-capsule">
            <TwitterIcon size={18} color="#1DA1F2" /> Twitter Threads
          </div>
          <div className="hero-capsule">
            <LinkedinIcon size={18} color="#0077b5" /> LinkedIn Posts
          </div>
          <div className="hero-capsule">
            <Mail size={18} color="#EA4335" /> Professional Email
          </div>
          <div className="hero-capsule">
            <InstagramIcon size={18} color="#E1306C" /> Instagram Captions
          </div>
        </div>
      </section>

      {/* Dashboard Mockup Section */}
      <section
        style={{
          backgroundColor: 'var(--sys-color-primary-99)',
          paddingBottom: '96px',
          marginTop: '-40px',
        }}
      >
        <div className="dashboard-mockup-wrapper animate-float">
          <div className="dashboard-mockup-background mockup-glow"></div>
          <div className="dashboard-mockup-window glass-panel">
            <div className="mock-sidebar">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  marginBottom: '24px',
                }}
              >
                <MessageSquare
                  size={20}
                  color="var(--sys-color-roles-primary-color-role-primary-role)"
                />{' '}
                Chat Board
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--sys-color-neutral-50)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Active Projects
              </div>
              <div
                style={{
                  padding: '10px 12px',
                  background: 'var(--sys-color-primary-95)',
                  color: 'var(--sys-color-roles-primary-color-role-primary-role)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                # Q3-launch-repurpose
              </div>
              <div
                style={{
                  padding: '10px 12px',
                  color: 'var(--sys-color-neutral-40)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                # weekly-newsletter
              </div>
              <div
                style={{
                  padding: '10px 12px',
                  color: 'var(--sys-color-neutral-40)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                # tech-blog-syndication
              </div>
            </div>
            <div className="mock-main">
              <div className="mock-chat-bubble">
                <strong>You:</strong> Transform this 20-page PDF report into a 5-tweet thread and a
                LinkedIn thought leadership post using my minimalist tone.
              </div>
              <div
                className="mock-chat-bubble"
                style={{
                  background: 'var(--sys-color-primary-99)',
                  border: '1px solid var(--sys-color-border-tertiary)',
                  alignSelf: 'flex-start',
                }}
              >
                <strong>ContentSplit:</strong> I've analyzed the report. The key hook is the 40%
                growth metric on page 3. Generation is complete! Formats are attached below.
              </div>
              <div className="mock-input">
                <span>Type a message or paste a link...</span>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'var(--sys-color-roles-primary-color-role-primary-role)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowRight size={18} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorksSection />

      {/* Feature Grid Section */}
      <section
        className="features-section"
        style={{ backgroundColor: 'var(--sys-color-surface-container-lowest)' }}
      >
        <div className="features-header">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'var(--sys-color-primary-95)',
              color: 'var(--sys-color-roles-primary-color-role-primary-role)',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            <Zap size={14} fill="currentColor" /> Features
          </div>
          <h2 className="features-title">
            The engine behind your <span className="hero-title-highlight">content empire</span>
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--sys-color-neutral-50)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Everything you need to transform one piece of content into a multi-channel strategy in
            seconds.
          </p>
        </div>

        <div className="bento-grid">
          <div
            className="bento-card bento-1 bento-card-purple"
            style={{ position: 'relative', border: 'none' }}
          >
            <div
              className="bento-icon"
              style={{
                background: 'rgba(255,255,255,0.2)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
              }}
            >
              <Sparkles size={18} color="white" />
            </div>
            <h3
              style={{
                fontSize: '2.4rem',
                fontWeight: 700,
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              Zero-Prompt Generation
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.6',
                fontSize: '1.1rem',
                maxWidth: '480px',
                marginBottom: '60px',
              }}
            >
              No more battling complex AI prompts. Simply drop your rough ideas, and we'll instantly
              handle the formatting, line breaks, and structure for you.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
              <div className="bento-tag-ai">
                AI <Zap size={12} fill="white" color="white" />
              </div>
              <div className="bento-tag-line"></div>
              <div className="bento-tag-results">Instant Results</div>
            </div>
          </div>

          {/* Card 2: Native Nuance */}
          <div
            className="bento-card bento-2"
            style={{
              background: 'var(--sys-color-neutral-100)',
              border: '1px solid var(--sys-color-neutral-95)',
            }}
          >
            <div
              className="bento-icon"
              style={{
                background: 'var(--sys-color-primary-98)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                color: 'var(--sys-color-primary-40)',
              }}
            >
              <Layers size={20} />
            </div>
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--sys-color-neutral-10)',
              }}
            >
              Native Nuance
            </h3>
            <p
              style={{
                color: 'var(--sys-color-neutral-50)',
                lineHeight: '1.5',
                fontSize: '0.95rem',
                marginBottom: '24px',
              }}
            >
              A Thread isn't just a chopped up post. Outputs are highly optimized for every specific
              destination format.
            </p>
            <div
              className="bento-platform-list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              {[
                {
                  name: 'X Threads',
                  icon: <TwitterIcon size={16} color="#1DA1F2" />,
                  bg: '#e8f4fd',
                  status: 'Thread-Optimized',
                },
                {
                  name: 'LinkedIn Posts',
                  icon: <LinkedinIcon size={16} color="#0077b5" />,
                  bg: '#e8f0f9',
                  status: 'Viral-Ready',
                },
                {
                  name: 'Instagram Captions',
                  icon: <InstagramIcon size={16} color="#E1306C" />,
                  bg: '#fce4ec',
                  status: 'High-Engagement',
                },
                {
                  name: 'Email Intros',
                  icon: <Mail size={16} color="#EA4335" />,
                  bg: '#fce8e6',
                  status: 'Native Tone',
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="bento-platform-item"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: p.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {p.icon}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--sys-color-neutral-10)',
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--sys-color-neutral-50)',
                        fontWeight: 500,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="status-dot"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Instant Export */}
          <div
            className="bento-card bento-3"
            style={{
              background: 'var(--sys-color-neutral-100)',
              border: '1px solid var(--sys-color-neutral-95)',
            }}
          >
            <div
              className="bento-icon"
              style={{
                background: 'var(--sys-color-success-98)',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                color: 'var(--sys-color-success-40)',
                border: '1px solid var(--sys-color-success-90)',
              }}
            >
              <Copy size={20} />
            </div>
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--sys-color-neutral-10)',
              }}
            >
              Instant Export
            </h3>
            <p
              style={{
                color: 'var(--sys-color-neutral-50)',
                lineHeight: '1.6',
                fontSize: '0.95rem',
                marginBottom: 'auto',
              }}
            >
              Read, review, edit inline, and copy high-converting drafts directly to your clipboard
              in one tap. No bloat.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'nowrap',
                marginTop: '28px',
                alignItems: 'center',
              }}
            >
              <div
                className="bento-tag"
                style={{
                  background: 'var(--sys-color-neutral-95)',
                  color: 'var(--sys-color-neutral-50)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                No Export Queue
              </div>
              <div
                className="bento-tag"
                style={{
                  background: 'var(--sys-color-success-98)',
                  color: 'var(--sys-color-success-40)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: '1px solid var(--sys-color-success-90)',
                  whiteSpace: 'nowrap',
                }}
              >
                One-Click Copy
              </div>
            </div>
          </div>

          {/* Card 4: Mass-Parallel Processing */}
          <div
            className="bento-card bento-4"
            style={{
              background: 'var(--sys-color-primary-98)',
              border: '1px solid var(--sys-color-primary-90)',
            }}
          >
            <div
              className="bento-icon"
              style={{
                background: 'var(--sys-color-primary-40)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                color: 'var(--sys-color-neutral-100)',
              }}
            >
              <Zap size={18} fill="var(--sys-color-neutral-100)" />
            </div>
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--sys-color-neutral-10)',
              }}
            >
              Mass-Parallel Processing
            </h3>
            <p
              style={{
                color: 'var(--sys-color-neutral-50)',
                lineHeight: '1.5',
                fontSize: '0.95rem',
                marginBottom: '40px',
              }}
            >
              While other tools force you to generate posts one by one, our backend architecture
              builds your entire multi-channel campaign concurrently.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <div
                className="bento-tag"
                style={{
                  background: 'var(--sys-color-neutral-100)',
                  color: 'var(--sys-color-primary-40)',
                  border: '1px solid var(--sys-color-primary-90)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--sys-color-primary-40)',
                  }}
                ></div>
                4 platforms. Simultaneously.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section
        style={{
          padding: 'var(--sys-spacing-4xl) 5%',
          background: 'var(--sys-color-neutral-99)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'var(--sys-font-heading-2-bold-font-size)',
            fontWeight: 700,
            color: 'var(--sys-color-neutral-10)',
            marginBottom: 'var(--sys-spacing-3xl)',
          }}
        >
          Create content in minutes, not hours
        </h2>

        <style>{`
          .testimonial-card {
            background: var(--sys-color-neutral-100);
            padding: var(--sys-spacing-xl);
            border-radius: var(--sys-radius-lg);
            border: 1px solid var(--sys-color-neutral-90);
            text-align: left;
            transition: all var(--sys-motion-duration-medium) var(--sys-motion-easing-standard);
            min-height: 280px;
            display: flex;
            flex-direction: column;
          }
          .testimonial-card:hover {
            border-color: var(--sys-color-primary-40);
            box-shadow: 0 12px 32px rgba(107, 97, 231, 0.15);
            transform: translateY(-4px);
          }
          .star-rating {
            display: flex;
            gap: 4px;
            margin-bottom: var(--sys-spacing-md);
          }
          .metric-badge {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            background: var(--sys-color-primary-98);
            color: var(--sys-color-primary-40);
            padding: 6px 14px;
            border-radius: var(--sys-radius-full);
            font-size: var(--sys-font-caption-bold-font-size);
            font-weight: 700;
            border: 1px solid var(--sys-color-primary-90);
          }
          .verified-badge {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            background: var(--sys-color-success-98);
            color: var(--sys-color-success-50);
            padding: 6px 14px;
            border-radius: var(--sys-radius-full);
            font-size: var(--sys-font-caption-regular-font-size);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid var(--sys-color-success-90);
          }
          .badge-row {
            display: flex;
            align-items: center;
            gap: var(--sys-spacing-sm);
            margin-bottom: var(--sys-spacing-md);
          }
          .testimonial-body {
            font-style: italic;
            color: var(--sys-color-neutral-50);
            margin-bottom: var(--sys-spacing-lg);
            line-height: var(--sys-font-body-text-regular-line-height);
            font-size: var(--sys-font-body-text-regular-font-size);
            flex: 1;
          }
          .testimonial-user-info {
            display: flex;
            align-items: center;
            gap: var(--sys-spacing-md);
            padding-top: var(--sys-spacing-md);
            border-top: 1px solid var(--sys-color-neutral-95);
          }
        `}</style>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--sys-spacing-lg)',
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          {/* Sarah J. */}
          <div className="testimonial-card">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <div className="badge-row">
              <span className="metric-badge">80% TIME SAVED</span>
              <span className="verified-badge">✓ Active</span>
            </div>
            <p className="testimonial-body">
              "10 hours/week → 2 hours. That's 80% of my time back. I paste rough notes and get
              scroll-ready content instantly."
            </p>
            <div className="testimonial-user-info">
              <Avatar
                size={44}
                name="Sarah"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
              />
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: 'var(--sys-color-neutral-10)',
                    fontSize: 'var(--sys-font-body-text-semi-bold-font-size)',
                  }}
                >
                  Sarah J.
                </div>
                <div
                  style={{
                    color: 'var(--sys-color-neutral-50)',
                    fontSize: 'var(--sys-font-body-text-regular-font-size)',
                  }}
                >
                  Growth Marketer, TechFlow
                </div>
              </div>
            </div>
          </div>

          {/* Marcus D. */}
          <div className="testimonial-card">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <div className="badge-row">
              <span className="metric-badge">47 POSTS</span>
              <span className="verified-badge">✓ Power</span>
            </div>
            <p className="testimonial-body">
              "Finally, an AI that gets my brand voice. Zero edits needed on 47 posts this month. It
              sounds like me, not a robot."
            </p>
            <div className="testimonial-user-info">
              <Avatar
                size={44}
                name="Marcus"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
              />
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: 'var(--sys-color-neutral-10)',
                    fontSize: 'var(--sys-font-body-text-semi-bold-font-size)',
                  }}
                >
                  Marcus D.
                </div>
                <div
                  style={{
                    color: 'var(--sys-color-neutral-50)',
                    fontSize: 'var(--sys-font-body-text-regular-font-size)',
                  }}
                >
                  Founder, LaunchPad
                </div>
              </div>
            </div>
          </div>

          {/* Elena W. */}
          <div className="testimonial-card">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <div className="badge-row">
              <span className="metric-badge">₦60K/YEAR</span>
              <span className="verified-badge">✓ Pro</span>
            </div>
            <p className="testimonial-body">
              "Cut ₦60K/year in social management costs. ROI in week one. For solopreneurs, this is
              a no-brainer."
            </p>
            <div className="testimonial-user-info">
              <Avatar
                size={44}
                name="Elena"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
              />
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: 'var(--sys-color-neutral-10)',
                    fontSize: 'var(--sys-font-body-text-semi-bold-font-size)',
                  }}
                >
                  Elena W.
                </div>
                <div
                  style={{
                    color: 'var(--sys-color-neutral-50)',
                    fontSize: 'var(--sys-font-body-text-regular-font-size)',
                  }}
                >
                  Owner, ContentAgency
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-surface-container-lowest)' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="features-title" style={{ marginBottom: '64px' }}>
            Your content, your control
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                padding: '32px',
                background: 'var(--sys-color-neutral-99)',
                borderRadius: '16px',
                border: '1px solid var(--sys-color-neutral-90)',
              }}
            >
              <Lock
                size={40}
                color="var(--sys-color-primary-40)"
                style={{ marginBottom: '16px' }}
              />
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--sys-color-neutral-10)',
                }}
              >
                Bank-level encryption
              </h3>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
                AES-256 encryption at rest, TLS 1.3 in transit. Same standard banks use to protect
                your data.
              </p>
            </div>
            <div
              style={{
                padding: '32px',
                background: 'var(--sys-color-neutral-99)',
                borderRadius: '16px',
                border: '1px solid var(--sys-color-neutral-90)',
              }}
            >
              <EyeOff
                size={40}
                color="var(--sys-color-primary-40)"
                style={{ marginBottom: '16px' }}
              />
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--sys-color-neutral-10)',
                }}
              >
                We never share your data
              </h3>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
                Your drafts never leave our systems without your permission. Your content stays
                private.
              </p>
            </div>
            <div
              style={{
                padding: '32px',
                background: 'var(--sys-color-neutral-99)',
                borderRadius: '16px',
                border: '1px solid var(--sys-color-neutral-90)',
              }}
            >
              <Brain
                size={40}
                color="var(--sys-color-primary-40)"
                style={{ marginBottom: '16px' }}
              />
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--sys-color-neutral-10)',
                }}
              >
                No AI training on your data
              </h3>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
                We never use your content to train AI models. Your data is yours. Delete anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2
          className="features-title"
          style={{ textAlign: 'center', marginBottom: 'var(--sys-spacing-3xl)' }}
        >
          Simple, transparent pricing
        </h2>

        <div className="pricing-grid">
          {/* Starter Plan */}
          <div className="pricing-card">
            <h3 className="pricing-title">Starter</h3>
            <div className="pricing-price">Free</div>
            <p className="pricing-billing">Forever free</p>
            <ul className="pricing-list">
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> 10 conversions/mo
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> Basic tones
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> Twitter & LinkedIn
              </li>
            </ul>
            <Link to="/register" className="pricing-btn secondary">
              Try Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pro">
            <div className="pricing-badge">Popular</div>
            <h3 className="pricing-title">Pro</h3>
            <div className="pricing-price">
              ₦5,000<span>/mo</span>
            </div>
            <ul className="pricing-list">
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> 100 conversions/mo
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> All tones
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> All platforms
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> Priority support
              </li>
            </ul>
            <Link to="/register?plan=pro" className="pricing-btn primary">
              Start Pro Trial
            </Link>
          </div>

          {/* Agency Plan */}
          <div className="pricing-card">
            <h3 className="pricing-title">Agency</h3>
            <div className="pricing-price">
              ₦15,000<span>/mo</span>
            </div>
            <ul className="pricing-list">
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> Unlimited conversions
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> All tones
              </li>
              <li className="pricing-list-item">
                <CheckCircle size={18} color="var(--sys-color-primary-40)" /> Team access
              </li>
            </ul>
            <Link to="/register?plan=agency" className="pricing-btn secondary">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: 'var(--sys-spacing-4xl) 5%',
          backgroundColor: 'var(--sys-color-primary-99)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            className="features-title"
            style={{ textAlign: 'center', marginBottom: 'var(--sys-spacing-2xl)' }}
          >
            Need help repurposing your content?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-lg)' }}>
            <FAQItem
              question="Is it really just paste and click?"
              answer="Yes. Just paste your content, select your platforms, and click convert. It's that simple."
            />
            <FAQItem
              question="Which platforms does Content Split create content for?"
              answer="ContentSplit creates platform-optimized content for Twitter/X, LinkedIn, Instagram, and Email."
            />
            <FAQItem
              question="Will I really get all four outputs in under 10 seconds?"
              answer="Yes. All 4 outputs are generated in under 10 seconds."
            />
            <FAQItem
              question="Will it actually sound like me?"
              answer="Yes. Each output is styled to match your unique voice and tone."
            />
            <FAQItem
              question="Is my content secure?"
              answer="Yes. Your content is encrypted and never shared with third parties."
            />
            <FAQItem
              question="How much does it cost?"
              answer="ContentSplit offers a free Starter plan with limited usage. Paid plans start at ₦5,000/month."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        style={{
          padding: '96px 5%',
          backgroundColor: 'var(--sys-color-primary-95)',
          textAlign: 'center',
        }}
      >
        <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '24px' }}>
          Ready to reclaim your time?
        </h2>
        <p
          style={{ color: 'var(--sys-color-neutral-40)', fontSize: '1.2rem', marginBottom: '40px' }}
        >
          Join thousands of professionals who've already transformed their creation workflow.
        </p>
        <Link
          to="/register"
          className="cta-primary"
          style={{ color: 'var(--sys-color-neutral-100)' }}
        >
          Get Started For Free
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '64px 5%',
          color: 'var(--sys-color-neutral-50)',
          background: 'var(--sys-color-surface-container-lowest)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div>
          <div className="landing-logo" style={{ marginBottom: '16px' }}>
            <img src="/logowordmark.svg" alt="ContentSplit" style={{ height: '24px', width: 'auto' }} />
          </div>
          <p>© 2026 ContentSplit.ai. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <strong style={{ color: 'var(--sys-color-neutral-10)' }}>Product</strong>
            <Link
              to="/pricing"
              style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}
            >
              Pricing
            </Link>
            <Link
              to="/features"
              style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}
            >
              Features
            </Link>
            <Link
              to="/changelog"
              style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}
            >
              Changelog
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <strong style={{ color: 'var(--sys-color-neutral-10)' }}>Company</strong>
            <Link
              to="/about"
              style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}
            >
              About us
            </Link>
            <Link
              to="/terms"
              style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}
            >
              Terms of service
            </Link>
            <Link
              to="/privacy"
              style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
