import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const LandingHero: React.FC = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      const { isMobile, reduceMotion } = context.conditions as any;

      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-pill", { opacity: 0, y: isMobile ? 15 : 30, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: isMobile ? 20 : 40, duration: 0.8 }, "-=0.4")
        .from(".hero-subtitle", { opacity: 0, y: isMobile ? 15 : 30, duration: 0.6 }, "-=0.5")
        .from(".hero-mockup", { opacity: 0, y: isMobile ? 40 : 90, scale: isMobile ? 0.98 : 0.95, duration: 1.2, ease: "power4.out" }, "-=0.4");
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero-container" style={{
      position: 'relative',
      zIndex: 0,
      width: '100%',
      minHeight: '120vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '160px',
      overflow: 'hidden',
      // Dark fallback so white text is ALWAYS readable even if image fails or crops on mobile
      background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #111827 100%)',
    }}>
      {/* Background Image */}
      <img
        src="/images/hero-back.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          zIndex: -2,
        }}
      />

      {/* Dark scrim behind text — ensures white text is always legible regardless of bg image */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '65%',
        background: 'linear-gradient(to bottom, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.25) 70%, rgba(10,15,28,0) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Gradient Mask for Background Fade */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '45vh',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        zIndex: 20,
        pointerEvents: 'none',
      }} />

      {/* Hero Content Area */}
      <div style={{
        position: 'relative',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '900px',
        padding: '0 20px',
        width: '100%',
      }}>
        {/* Top Badge */}
        <div className="hero-pill" style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '9999px',
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Facebook */}
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, position: 'relative' }}>
              <img src="/images/Facebook.svg" alt="Facebook" style={{ height: '16px', width: '16px' }} />
            </div>
            {/* Instagram */}
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4, position: 'relative', marginLeft: '-8px' }}>
              <img src="/images/Instagram.svg" alt="Instagram" style={{ height: '16px', width: '16px' }} />
            </div>
            {/* YouTube */}
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, position: 'relative', marginLeft: '-8px' }}>
              <img src="/images/Youtube.svg" alt="YouTube" style={{ height: '16px', width: '16px' }} />
            </div>
            {/* Twitter */}
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative', marginLeft: '-8px' }}>
              <img src="/images/Twitter.svg" alt="Twitter" style={{ height: '16px', width: '16px' }} />
            </div>
            {/* LinkedIn */}
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative', marginLeft: '-8px' }}>
              <img src="/images/LinkedIn.svg" alt="LinkedIn" style={{ height: '16px', width: '16px' }} />
            </div>
          </div>
          <span style={{ ...dm(15, 500, { color: '#FFFFFF', marginLeft: '6px' }) }}>One blog post</span>
        </div>

        {/* H1 Heading */}
        <h1 className="hero-title" style={{
          ...syne(72, 800, { color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 24px 0', textAlign: 'center' }),
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          textShadow: '0 2px 16px rgba(0,0,0,0.3)',
        }}>
          One blog post. Six platforms.<br/>Zero rewrites.
        </h1>

        {/* Subheading */}
        <p className="hero-subtitle" style={{
          ...dm(18, 400, { color: 'rgba(255,255,255,0.92)', lineHeight: 1.6, margin: 0, maxWidth: '640px' }),
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          textShadow: '0 1px 8px rgba(0,0,0,0.25)',
        }}>
          ContentSplit takes your long-form blog and breaks it into ready-to-publish content for Twitter/X, LinkedIn, Instagram, newsletters, YouTube, and more. Paste once. Publish everywhere.
        </p>
      </div>

      {/* App Interface Mockup Image */}
      <div className="hero-mockup" style={{
        marginTop: '64px',
        width: '95%',
        maxWidth: '1100px',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        margin: '64px auto 0 auto'
      }}>
        <img 
          src="/images/chat-interface.png" 
          alt="ContentSplit Chat Interface" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '24px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.5)'
          }}
        />
      </div>
    </section>
  )
}

export default LandingHero
