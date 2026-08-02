import React, { useState } from 'react'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const faqs = [
  { q: 'Does ContentSplit work with any blog post?',      a: 'Yes. Paste raw text or a URL. It works with Substack, Medium, WordPress, Ghost, or plain Google Docs exports.' },
  { q: 'Will the output actually sound like me?',         a: "ContentSplit uses your original post's vocabulary and sentence structure as a reference. The more specific and human your writing, the better the outputs." },
  { q: 'Can I edit the outputs before I publish?',        a: 'Every output is editable inline. ContentSplit generates a starting draft — you always have the final say.' },
  { q: 'What platforms are supported?',                   a: 'Twitter/X threads, LinkedIn posts, Instagram captions, newsletter intros, YouTube script hooks, and blog summaries. More formats are in the roadmap.' },
  { q: 'Is there a free plan?',                           a: 'Yes. 5 repurposes per day, no credit card required. Upgrade anytime for unlimited access.' },
  { q: 'What happens to my content after I paste it?',   a: "Your content is used only to generate the outputs in your session. We don't train on user data, and nothing is stored after your session ends." },
]

const PlusCircleIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg 
    width="20" height="20" viewBox="0 0 24 24" fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}
  >
    <circle cx="12" cy="12" r="10" stroke="#0F172A" strokeWidth="1.5"/>
    <path d="M12 8V16" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12H16" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const LandingFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" style={{ background: '#FFFFFF', padding: '128px 24px' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '64px',
        alignItems: 'start'
      }} className="cs-faq-container">
        
        {/* Left Column: Title */}
        <div>
          <h2 style={{ 
            ...syne(40, 700, { color: '#0F172A', lineHeight: 1.2, letterSpacing: '-0.02em' }), 
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            maxWidth: '300px'
          }}>
            Frequently<br />Asked<br />Questions
          </h2>
        </div>

        {/* Right Column: Q&A List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                style={{ 
                  borderBottom: '1px solid #F1F5F9',
                  padding: '24px 0'
                }}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    width: '100%', 
                    background: 'none', 
                    border: 'none', 
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ ...dm(16, 600, { color: '#0F172A', paddingRight: '24px' }) }}>
                    {faq.q}
                  </span>
                  <PlusCircleIcon isOpen={isOpen} />
                </button>
                
                {/* Answer with smooth height transition would normally use CSS grid or max-height. 
                    Using simple conditional rendering here for clean code, or a wrapper. */}
                <div style={{ 
                  maxHeight: isOpen ? '500px' : '0px', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out',
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? '16px' : '0px'
                }}>
                  <p style={{ ...dm(15, 400, { color: '#475569', lineHeight: 1.6, margin: 0 }) }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .cs-faq-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .cs-faq-container h2 {
            br { display: none; }
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}

export default LandingFAQ
