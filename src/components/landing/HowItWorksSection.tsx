import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const TwitterIcon = ({ size = 16, color = '#1DA1F2' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = ({ size = 16, color = '#0077b5' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = ({ size = 16, color = '#E1306C' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const MailIcon = ({ size = 16, color = '#EA4335' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

interface StepCardProps {
  number: string
  badge: string
  badgeColor: string
  heading: string
  description: string
  illustration: React.ReactNode
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  badge,
  badgeColor,
  heading,
  description,
  illustration,
}) => (
  <div className="hiw-card">
    <span className="hiw-step-number">{number}</span>
    <span
      className="hiw-badge"
      style={{ background: badgeColor.background, color: badgeColor.text }}
    >
      {badge}
    </span>
    <h3 className="hiw-heading">{heading}</h3>
    <p className="hiw-description">{description}</p>
    <div className="hiw-illustration">{illustration}</div>
  </div>
)

const ToneSelectorMockup: React.FC = () => (
  <div className="hiw-tone-selector">
    <div className="hiw-tone-pill">Professional</div>
    <div className="hiw-tone-pill hiw-tone-pill-active">Casual</div>
    <div className="hiw-tone-pill">Punchy</div>
  </div>
)

const TextPasteMockup: React.FC = () => (
  <div className="hiw-text-paste">
    <div className="hiw-paste-label">Paste your content here...</div>
    <div className="hiw-paste-line"></div>
    <div className="hiw-paste-cursor"></div>
  </div>
)

const PlatformsMockup: React.FC = () => (
  <>
    <div className="hiw-draft">
      <div className="hiw-draft-label">Draft Ready: LinkedIn Post</div>
      <div className="hiw-draft-line hiw-draft-line-full"></div>
      <div className="hiw-draft-line hiw-draft-line-80"></div>
      <div className="hiw-draft-line hiw-draft-line-60"></div>
      <div className="hiw-draft-line hiw-draft-line-90"></div>
    </div>
    <div className="hiw-platform-badges">
      <div className="hiw-platform-badge">
        <TwitterIcon /> Twitter
      </div>
      <div className="hiw-platform-badge">
        <InstagramIcon /> Instagram
      </div>
      <div className="hiw-platform-badge">
        <MailIcon /> Email
      </div>
    </div>
  </>
)

const HowItWorksSection: React.FC = () => {
  return (
    <section className="hiw-section">
      <div className="hiw-header">
        <h2 className="hiw-title">Reclaim 90% of your publishing time</h2>
        <p className="hiw-subtitle">
          Watch how ContentSplit transforms a chaotic workflow into an organized, automated content
          machine.
        </p>
      </div>

      <div className="hiw-grid">
        <StepCard
          number="01"
          badge="Takes 1 min"
          badgeColor={{
            background: 'var(--sys-color-error-98)',
            text: 'var(--sys-color-error-60)',
          }}
          heading="Define your voice"
          description="Set your Persona and Tone exactly once. We secure and lock in your Brand Voice instantly."
          illustration={<ToneSelectorMockup />}
        />

        <StepCard
          number="02"
          badge="Takes 5 min"
          badgeColor={{
            background: 'var(--sys-color-warning-98)',
            text: 'var(--sys-color-warning-40)',
          }}
          heading="We adopt your context"
          description="No sterile AI robot-speak. ContentSplit inherits your unique cadence organically."
          illustration={<TextPasteMockup />}
        />

        <StepCard
          number="03"
          badge="Save 10+ hours a week"
          badgeColor={{
            background: 'var(--sys-color-primary-98)',
            text: 'var(--sys-color-primary-40)',
          }}
          heading="Publish everywhere"
          description="Drop a single draft. Approve perfectly formatted threads and posts simultaneously."
          illustration={<PlatformsMockup />}
        />
      </div>

      <div className="hiw-cta-wrapper">
        <Link to="/register" className="cta-primary cta-glow">
          Get Started for Free <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  )
}

export default HowItWorksSection
