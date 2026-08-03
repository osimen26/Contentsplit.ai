import React from 'react'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const labelStyle: React.CSSProperties = {
  ...dm(12, 600),
  color: '#475569',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  border: '1px solid #E2E8F0',
  borderRadius: '999px',
  padding: '6px 16px',
  marginBottom: '24px',
}

const SHCARD1 = `
  0px 4px 4px -12px rgba(0,0,0,0.02), 
  0px 12px 12px -6px rgba(0,0,0,0.02), 
  0px 6px 6px -3px rgba(0,0,0,0.02), 
  0px 1px 1px -0.5px rgba(0,0,0,0.04),
  0px 0px 0px 1px rgba(0,0,0,0.06),
  0px 0px 0px 4px rgba(0,0,0,0.02)
`;

const testimonials = [
  {
    paragraphs: [
      '"I write one post a week and now it shows up everywhere. Saves me 3 hours minimum."'
    ],
    name: 'Ravi K. Udeshi',
    role: 'NEDCOMOAKS LTD',
    avatarColor: '#1E293B',
    initials: 'RU'
  },
  {
    paragraphs: [
      `"The LinkedIn output is scary good. It doesn't sound like AI. That's rare."`,
      `Every post perfectly captures my original tone, and we save hours every week thanks to the batch processing.`,
      `It's the best repurposing tool, hands down."`
    ],
    name: 'Michael Villenave',
    role: 'CITADEL VIEWS',
    avatarColor: '#334155',
    initials: 'MV'
  },
  {
    paragraphs: [
      '"ContentSplit has been a game changer for our content strategy."',
      'Even our external partners comment on how engaging and authentic our social channels have become since we started using it."'
    ],
    name: 'Melina Morris',
    role: 'Sr Growth Manager, Bombas',
    avatarColor: '#475569',
    initials: 'MM'
  }
]

const LandingTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials-container" style={{ background: '#FFFFFF', padding: '128px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={labelStyle}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.2918 1.93605C6.18075 1.99665 6.08325 2.05748 6 2.11409C5.91675 2.05748 5.81925 1.99665 5.7082 1.93605C5.30925 1.71845 4.72724 1.5 4 1.5C3.24085 1.5 2.48249 1.80429 1.91648 2.40803C1.34808 3.01433 1 3.89296 1 5C1 6.6724 2.18639 8.05115 3.29094 8.9636C3.85668 9.43095 4.43344 9.80325 4.89585 10.0602C5.12695 10.1885 5.33435 10.2908 5.502 10.3626C5.58535 10.3983 5.66445 10.429 5.73525 10.4516C5.7892 10.4689 5.89205 10.5 6 10.5C6.10795 10.5 6.2108 10.4689 6.26475 10.4516C6.33555 10.429 6.41465 10.3983 6.498 10.3626C6.66565 10.2908 6.87305 10.1885 7.10415 10.0602C7.56655 9.80325 8.1433 9.43095 8.70905 8.9636C9.8136 8.05115 11 6.6724 11 5C11 3.89296 10.6519 3.01433 10.0835 2.40803C9.5175 1.80429 8.75915 1.5 8 1.5C7.27275 1.5 6.69075 1.71845 6.2918 1.93605Z" fill="currentColor"/>
            </svg>
            Wall of Love
          </div>
          <h2 style={{ ...syne(48, 700, { color: '#0F172A', letterSpacing: '-0.02em' }), fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            What creators are saying.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ 
              background: '#FFFFFF', 
              borderRadius: '16px', 
              padding: '32px', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: SHCARD1
            }}>
              
              {/* Quotes */}
              <div style={{ flex: 1, marginBottom: '32px' }}>
                {t.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ 
                    ...dm(16, 400, { color: '#334155', lineHeight: 1.6 }), 
                    marginBottom: idx === t.paragraphs.length - 1 ? 0 : '16px' 
                  }}>
                    {p}
                  </p>
                ))}
              </div>
              
              {/* Profile Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: t.avatarColor,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...dm(14, 600)
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ ...dm(14, 700, { color: '#0F172A', marginBottom: '2px', lineHeight: 1 }) }}>
                    {t.name}
                  </div>
                  <div style={{ ...dm(13, 500, { color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1 }) }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingTestimonials
