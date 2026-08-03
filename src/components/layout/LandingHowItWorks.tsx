import React, { useState } from 'react'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const SHCARD1 = '0px 4px 4px -12px rgba(0,0,0,0.02), 0px 12px 12px -6px rgba(0,0,0,0.02), 0px 6px 6px -3px rgba(0,0,0,0.02), 0px 1px 1px -0.5px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(0,0,0,0.06), 0px 0px 0px 3px rgba(255,255,255,0.8), 0px 0px 0px 4px rgba(0,0,0,0.05)'

const steps = [
  { 
    id: 1, 
    title: 'Paste your content',     
    desc: 'Drop in your blog post URL or paste the full text. ContentSplit reads it and understands the key ideas, tone, and structure.',
    type: 'icon',
    imgSrc: '/images/paste.svg'
  },
  { 
    id: 2, 
    title: 'Choose your platforms',  
    desc: "Pick which formats you need — one or all six. ContentSplit generates each one separately, tailored to that platform's content style.",
    type: 'social'
  },
  { 
    id: 3, 
    title: 'Copy and publish',       
    desc: 'Each output is editable before you copy. Tweak the tone, swap out phrases, and publish directly from the editor.',
    type: 'icon',
    imgSrc: '/images/copy+publish.svg'
  },
]



const LandingHowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3) // Default to step 3 as seen in screenshot

  return (
    <section id="how-it-works" className="how-it-works-container" style={{ background: '#FFFFFF', padding: '128px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '64px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 14px', 
            border: '1px solid #E2E8F0', 
            borderRadius: '999px',
            marginBottom: '24px'
          }}>
            <img src="/images/platforms/fire.svg" alt="icon" style={{ width: 14, height: 14 }} />
            <span style={{ ...dm(11, 600, { color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }) }}>
              How it works
            </span>
          </div>

          <h2 style={{ ...syne(48, 700, { color: '#0F172A', textAlign: 'center', margin: '0 0 16px 0', lineHeight: 1.1 }), fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Three steps. Zero friction.
          </h2>
          <p style={{ ...dm(17, 400, { color: '#64748B', textAlign: 'center', margin: 0 }) }}>
            Elevate your brand with each customer touch point.
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.5fr', 
          gap: '48px', 
          alignItems: 'center' 
        }} className="cs-hiw-grid">
          
          {/* Left Column: Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map(step => {
              const isActive = activeStep === step.id
              return (
                <div 
                  key={step.id} 
                  onClick={() => setActiveStep(step.id)}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid transparent', // Use transparent since we have the 1px ring in the shadow now
                    borderRadius: '16px',
                    padding: '24px',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: isActive ? 10 : 1,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: SHCARD1,
                    transform: isActive ? 'scale(1.02)' : 'scale(1)'
                  }}
                  className="cs-step-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Icon Box */}
                    {step.type === 'social' ? (
                      <img src="/images/socialpill.png" alt="Platforms" style={{ height: '38px', width: 'auto' }} />
                    ) : (
                      <div style={{ 
                        background: '#FBFBFB', 
                        border: '1px solid #EBEBEB',
                        borderRadius: '8px', 
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.03)'
                      }}>
                        {step.imgSrc && <img src={step.imgSrc} alt="icon" style={{ width: '20px', height: '20px' }} />}
                      </div>
                    )}
                    
                    {/* Title */}
                    <h3 style={{ ...dm(18, 600, { color: '#0F172A', margin: 0 }) }}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Expanded Description */}
                  <div style={{
                    maxHeight: isActive ? '200px' : '0px',
                    opacity: isActive ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <p style={{ 
                      ...dm(15, 400, { color: '#64748B', lineHeight: 1.6, margin: '16px 0 0 0' }) 
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Showcase */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            maxWidth: '616px',
            margin: '0 auto'
          }}>
            <img 
              src="/images/HOW IT 1.png" 
              alt="ContentSplit App Mockup" 
              style={{
                width: '100%',
                height: 'auto',
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>

        </div>
      </div>

      <style>{`
        .cs-step-card:hover { border-color: #CBD5E1; }
        @media (max-width: 900px) {
          .cs-hiw-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
        }
      `}</style>
    </section>
  )
}

export default LandingHowItWorks
