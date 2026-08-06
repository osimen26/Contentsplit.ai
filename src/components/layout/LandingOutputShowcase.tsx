import React, { useState } from 'react'
import { CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react'

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

        {/* ── TABS ── */}
        <div className="cs-tabs-wrapper">
          <div className="cs-tabs-strip">
            {platforms.map(platform => {
              const isActive = activeTab === platform
              return (
                <button
                  key={platform}
                  onClick={() => setActiveTab(platform)}
                  className={`cs-tab-btn${isActive ? ' cs-tab-active' : ''}`}
                >
                  {platform}
                </button>
              )
            })}
          </div>

          {/* Mobile Dropdown */}
          <div className="cs-mobile-dropdown">
            <button 
              className="cs-mobile-dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{activeTab}</span>
              <ChevronDown size={20} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            
            {isDropdownOpen && (
              <div className="cs-mobile-dropdown-menu">
                {platforms.map(platform => (
                  <button
                    key={platform}
                    onClick={() => {
                      setActiveTab(platform)
                      setIsDropdownOpen(false)
                    }}
                    className={`cs-mobile-dropdown-item ${activeTab === platform ? 'active' : ''}`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Split Area */}
        <div className="cs-showcase-grid">
          
          {/* Left Column: Text & Features */}
          <div className="cs-showcase-text">
            <div>
              <h3 style={{ ...dm(32, 600, { color: '#0F172A', margin: '0 0 8px 0', fontSize: 'clamp(1.75rem, 6vw, 2rem)' }) }}>
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

            <button className="cs-get-started-btn">
              Get started <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Visual Card */}
          <div className="cs-showcase-card" style={{ background: activeData.bgGradient }}>
            <img 
              src={activeData.imgSrc} 
              alt={activeData.title} 
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.15))',
                animation: 'subtleBounce 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              }}
              className="cs-showcase-img"
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
        /* ── Tab strip ── */
        .cs-tabs-wrapper {
          width: 100%;
          margin-bottom: 64px;
          display: flex;
          justify-content: center;
        }
        .cs-mobile-dropdown { display: none; }
        .cs-tabs-strip {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #F8FAFC;
          border: 1px solid #F1F5F9;
          padding: 6px;
          border-radius: 999px;
        }
        .cs-tab-btn {
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #64748B;
          background: transparent;
          border: none;
          padding: 10px 24px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .cs-tab-btn:hover { color: #0F172A; }
        .cs-tab-active {
          background: #FFFFFF !important;
          color: #0F172A !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        /* ── Showcase grid ── */
        .cs-showcase-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          width: 100%;
          align-items: center;
        }
        .cs-showcase-text {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .cs-showcase-card {
          border-radius: 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 480px;
          width: 100%;
          transition: background 0.5s ease;
        }
        .cs-showcase-img {
          max-width: 280px;
        }

        /* ── CTA button ── */
        .cs-get-started-btn {
          margin-top: 16px;
          align-self: flex-start;
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .cs-get-started-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        /* ── Animation ── */
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .cs-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          /* Show card FIRST on mobile so the visual lands before the text */
          .cs-showcase-card { order: -1; height: 320px !important; }
          .cs-showcase-text { order: 1; }
          .cs-get-started-btn { align-self: stretch !important; justify-content: center; }
        }

        /* ── MOBILE: dropdown tab ── */
        @media (max-width: 768px) {
          .cs-tabs-wrapper {
            justify-content: center;
            width: 100%;
            margin-bottom: 40px;
          }
          .cs-tabs-strip { display: none; }
          .cs-mobile-dropdown {
            display: block;
            position: relative;
            width: 100%;
            max-width: 320px;
            z-index: 50;
          }
          .cs-mobile-dropdown-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            padding: 14px 20px;
            border-radius: 12px;
            font-family: "DM Sans", sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #0F172A;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            cursor: pointer;
          }
          .cs-mobile-dropdown-menu {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            width: 100%;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .cs-mobile-dropdown-item {
            padding: 14px 20px;
            text-align: left;
            background: transparent;
            border: none;
            border-bottom: 1px solid #F1F5F9;
            font-family: "DM Sans", sans-serif;
            font-size: 15px;
            font-weight: 500;
            color: #475569;
            cursor: pointer;
          }
          .cs-mobile-dropdown-item:last-child { border-bottom: none; }
          .cs-mobile-dropdown-item.active {
            color: #0F172A;
            background: #F8FAFC;
            font-weight: 600;
          }

          .cs-showcase-card { height: 260px !important; border-radius: 20px !important; }
          .cs-showcase-img { max-width: 180px !important; }
        }

        @media (max-width: 480px) {
          .cs-showcase-card { height: 220px !important; }
        }
      `}</style>
    </section>
  )
}

export default LandingOutputShowcase
