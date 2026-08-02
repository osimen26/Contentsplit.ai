import React, { useState } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

// Using the same typography helpers
const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const platformData = {
  LinkedIn: {
    title: 'LinkedIn',
    subtitle: 'Professional thought leadership post',
    features: ['AI-powered demo editor', 'Custom tone of voice'],
    imgSrc: '/images/platforms/LinkedIn-big.png',
    floatingText: 'Professional tone · 3000 chars',
    bgGradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)'
  },
  'Twitter/X': {
    title: 'Twitter/X',
    subtitle: 'Hook → thread → CTA, tweet by tweet',
    features: ['Auto-splits text into 280 chars', 'Maintains thread context'],
    imgSrc: '/images/platforms/twitterbig.png',
    floatingText: '280 chars · 5–10 tweets',
    bgGradient: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)'
  },
  Instagram: {
    title: 'Instagram',
    subtitle: 'Scroll-stopping caption with hashtags',
    features: ['Auto-generates relevant tags', 'Formats with clean line breaks'],
    imgSrc: '/images/platforms/Instagrambig.png',
    floatingText: '2200 chars · 30 hashtags',
    bgGradient: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)'
  },
  Facebook: {
    title: 'Facebook',
    subtitle: 'Engaging community-focused update',
    features: ['Encourages comments & shares', 'Optimized for feed visibility'],
    imgSrc: '/images/platforms/Facebookbig.png',
    floatingText: 'Casual tone · Community focus',
    bgGradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)'
  },
  YouTube: {
    title: 'YouTube',
    subtitle: 'SEO-optimized video description',
    features: ['Generates chapter timestamps', 'Includes keyword tags & CTAs'],
    imgSrc: '/images/platforms/Youtubebig.png',
    floatingText: 'Timestamps · keywords · CTAs',
    bgGradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'
  },
  Threads: {
    title: 'Threads',
    subtitle: 'Punchy text-first conversation starter',
    features: ['Optimized for maximum engagement', 'Captures platform-specific tone'],
    imgSrc: '/images/platforms/threadsbig.png',
    floatingText: 'Conversational · 500 chars',
    bgGradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)'
  },
  Email: {
    title: 'Email',
    subtitle: 'Email-ready section with subject line',
    features: ['Subject line + opening paragraph', 'High-conversion copy structure'],
    imgSrc: '/images/platforms/emailbg.png',
    floatingText: 'Newsletter format · Subject Line',
    bgGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
  }
}

type PlatformKey = keyof typeof platformData;
const platforms = Object.keys(platformData) as PlatformKey[];

const LandingOutputShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlatformKey>('LinkedIn')
  const activeData = platformData[activeTab]

  return (
    <section style={{ background: '#FFFFFF', padding: '128px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Header Badge */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 14px', 
            border: '1px solid #E2E8F0', 
            borderRadius: '999px',
            marginBottom: '24px'
          }}>
            <img src="/images/platforms/fire.svg" alt="fire" style={{ width: 14, height: 14 }} />
            <span style={{ ...dm(11, 600, { color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }) }}>
              What it creates
            </span>
          </div>

          {/* Main Heading */}
          <h2 style={{ 
            ...syne(48, 700, { color: '#0F172A', textAlign: 'center', margin: '0 0 16px 0', lineHeight: 1.1 }), 
            fontSize: 'clamp(2rem, 4vw, 3.5rem)' 
          }}>
            Your blog, everywhere<br/>it needs to be.
          </h2>

          {/* Subheading */}
          <p style={{ 
            ...dm(16, 400, { color: '#64748B', textAlign: 'center', lineHeight: 1.6, maxWidth: '600px', margin: '0 0 48px 0' }) 
          }}>
            Paste your article. In seconds, ContentSplit generates six distinct content formats, each optimised for how people actually consume content on that platform.
          </p>
        </div>

        {/* Tabs Container */}
        <div style={{ 
          background: '#F8FAFC', 
          border: '1px solid #F1F5F9',
          padding: '6px', 
          borderRadius: '999px', 
          display: 'flex', 
          alignItems: 'center',
          gap: '4px',
          marginBottom: '64px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {platforms.map(platform => {
            const isActive = activeTab === platform
            return (
              <button
                key={platform}
                onClick={() => setActiveTab(platform)}
                style={{
                  ...dm(14, 600, { 
                    color: isActive ? '#0F172A' : '#64748B' 
                  }),
                  background: isActive ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {platform}
              </button>
            )
          })}
        </div>

        {/* Content Split Area */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '64px',
          width: '100%',
          alignItems: 'center'
        }} className="cs-showcase-grid">
          
          {/* Left Column: Text & Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ ...dm(32, 600, { color: '#0F172A', margin: '0 0 8px 0' }) }}>
                {activeData.title}
              </h3>
              <p style={{ ...dm(16, 400, { color: '#64748B', margin: 0 }) }}>
                {activeData.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeData.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#0F172A" strokeWidth={2} />
                  <span style={{ ...dm(15, 500, { color: '#0F172A' }) }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: '16px',
              alignSelf: 'flex-start',
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              ...dm(14, 600),
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }} className="cs-get-started-btn">
              Get started <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Visual Card */}
          <div style={{ 
            background: activeData.bgGradient, 
            borderRadius: '32px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '480px',
            width: '100%',
            transition: 'background 0.5s ease'
          }}>
            {/* The 3D platform logo */}
            <img 
              src={activeData.imgSrc} 
              alt={activeData.title} 
              style={{
                width: '100%',
                maxWidth: '280px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.15))',
                animation: 'subtleBounce 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              }}
            />

            {/* The floating stat pill */}
            <div style={{
              position: 'absolute',
              bottom: '32px',
              background: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}>
              <span style={{ color: '#3B82F6', fontWeight: 600 }}>↗</span>
              <span style={{ ...dm(13, 500, { color: '#0F172A' }) }}>
                {activeData.floatingText}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cs-get-started-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        @media (max-width: 768px) {
          .cs-showcase-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}

export default LandingOutputShowcase
