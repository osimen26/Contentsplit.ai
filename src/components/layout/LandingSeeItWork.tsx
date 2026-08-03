import React from 'react'
import ChatInterfaceMockup from './ChatInterfaceMockup'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const LandingSeeItWork: React.FC = () => {
  return (
    <section id="see-it-work" className="see-it-work-container" style={{ background: '#F8FAFC', padding: '128px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Header */}
        <h2 style={{ 
          ...syne(48, 700, { color: '#0F172A', margin: '0 0 16px 0', letterSpacing: '-0.02em' }) 
        }}>
          See it work before you sign up.
        </h2>
        
        <p style={{ 
          ...dm(18, 400, { color: '#64748B', maxWidth: '600px', margin: '0 auto 64px auto', lineHeight: 1.6 }) 
        }}>
          No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.
        </p>

        {/* Interactive Mock / Image Showcase */}
        <div className="see-it-work-mockup" style={{
          position: 'relative',
          width: 'fit-content',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.06)',
          background: 'rgba(255, 255, 255, 0.5)',
          padding: '14.54px',
          borderRadius: '16px',
          boxSizing: 'border-box',
        }}>
          <ChatInterfaceMockup />
        </div>

      </div>
    </section>
  )
}

export default LandingSeeItWork
