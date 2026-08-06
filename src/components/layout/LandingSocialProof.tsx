import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const LandingSocialProof: React.FC = () => {
  const logos = ['atlassian.svg', 'bubble.svg', 'instacart.svg', 'openai.svg', 'retool.svg', 'rudderstack.svg']
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Check for reduced motion preference
    const mm = gsap.matchMedia()
    
    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      noReduceMotion: "(prefers-reduced-motion: no-preference)"
    }, (context) => {
      const reduceMotion = context.conditions?.reduceMotion;
      
      if (reduceMotion) return // Skip animation if user prefers reduced motion
      
      // Infinite horizontal scroll
      gsap.to(trackRef.current, {
        xPercent: -50, // Move by exactly half of the total width
        ease: "none",
        duration: 40,
        repeat: -1
      })
    })
  })
  
  return (
    <section className="social-proof-container" style={{ 
      background: '#FFFFFF', // Clean white background
      padding: '56px 24px',
      position: 'relative',
      zIndex: 1, // Let it sit above or below hero smoothly
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '32px' 
      }}>
        <p style={{ ...dm(14, 500, { color: '#94A3B8', textAlign: 'center', margin: 0 }) }}>
          Trusted by 2,000+ creators, marketers, and content teams
        </p>
      </div>

      {/* Marquee Track Container */}
      <div style={{ 
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        marginTop: '32px'
      }}>
        {/* Fading Gradients for the edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '100%', background: 'linear-gradient(to right, #FFFFFF, transparent)', zIndex: 2 }}></div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '100%', background: 'linear-gradient(to left, #FFFFFF, transparent)', zIndex: 2 }}></div>
          
          <div 
            ref={trackRef}
            style={{ 
              display: 'flex', 
              width: 'max-content',
              opacity: 0.6,
              flexShrink: 0, // Prevents the track from shrinking to fit the 100vw parent
            }}
          >
            {/* We render multiple sets of logos to ensure it fills ultra-wide screens, 
                and translating -50% means we need an even number of sets. Let's use 4 sets total. */}
            {[...logos, ...logos, ...logos, ...logos].map((src, i) => (
              <div key={`${src}-${i}`} style={{ padding: '0 40px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <img 
                  src={`/images/logos/${src}`} 
                  alt={`${src.split('.')[0]} logo`} 
                  style={{ 
                    height: '24px', 
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default LandingSocialProof
