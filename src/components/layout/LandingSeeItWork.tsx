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
        
        {/* Header — clamp so it never overflows on mobile */}
        <h2 style={{ 
          ...syne(48, 700, { color: '#0F172A', margin: '0 0 16px 0', letterSpacing: '-0.02em' }),
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.15,
        }}>
          See it work before you sign up.
        </h2>
        
        <p style={{ 
          ...dm(18, 400, { color: '#64748B', maxWidth: '560px', margin: '0 auto 64px auto', lineHeight: 1.6 }),
          fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
        }}>
          No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.
        </p>

        {/* Mockup wrapper — scales down on mobile */}
        <div className="siw-mockup-wrapper">
          <div className="siw-mockup-inner">
            <ChatInterfaceMockup />
          </div>
        </div>

      </div>

      <style>{`
        /* ── Mockup scale container ── */
        .siw-mockup-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .siw-mockup-inner {
          background: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 32px 84px rgba(0,0,0,0.06);
          box-sizing: border-box;
          /* Default: full size */
          transform-origin: top center;
        }

        /* Tablet: scale to fit */
        @media (max-width: 1180px) {
          .siw-mockup-inner {
            padding: 16px;
            transform: scale(0.88);
            margin-bottom: -80px; /* compensate for scale collapsing */
          }
        }

        /* Mobile: scale aggressively + hide sidebar in mockup */
        @media (max-width: 768px) {
          .siw-mockup-inner {
            padding: 8px;
            /* Scale so the 1100px mockup fits a ~375px screen */
            transform: scale(0.32);
            transform-origin: top center;
            margin-bottom: -500px;
          }
          /* Hide the sidebar column inside the mockup on mobile */
          .siw-mockup-inner aside {
            display: none !important;
          }
          /* Full width for the main chat area */
          .siw-mockup-inner > div > div {
            width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .siw-mockup-inner {
            transform: scale(0.28);
            margin-bottom: -535px;
          }
        }
      `}</style>
    </section>
  )
}

export default LandingSeeItWork
