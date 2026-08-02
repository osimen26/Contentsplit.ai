import React from 'react'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const labelStyle: React.CSSProperties = {
  ...dm(11, 600),
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#0F172A', // Changed from accent to dark to match the black pill in design
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  border: '1px solid #E2E8F0',
  borderRadius: '999px',
  padding: '6px 14px',
  marginBottom: '24px',
}

const eyebrowStyle: React.CSSProperties = {
  ...dm(12, 600),
  color: '#64748B',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '16px',
}

const titleStyle: React.CSSProperties = {
  ...syne(32, 600, { color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.2 })
}

const descStyle: React.CSSProperties = {
  ...dm(16, 400, { color: '#64748B', lineHeight: 1.6 })
}

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
  alignItems: 'center',
  marginBottom: '120px',
}

const imageWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: '12px',
}

const LandingFeatureHighlights: React.FC = () => {
  return (
    <section id="features" style={{ background: '#FFFFFF', padding: '128px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div style={labelStyle}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1 6C1 3.35011 3.26589 1.25 6 1.25C8.7341 1.25 11 3.35011 11 6C11 6.93725 10.7478 7.61015 10.1744 7.967C9.6506 8.2931 8.99855 8.2525 8.48785 8.1861C8.30635 8.1625 8.11515 8.1309 7.9358 8.1013C7.85425 8.0878 7.77515 8.07475 7.7005 8.063C7.44855 8.02345 7.2285 7.9956 7.03595 7.9928C6.64885 7.98715 6.52 8.078 6.4472 8.2236C6.40575 8.3066 6.39635 8.4202 6.4616 8.61355C6.5202 8.78715 6.61385 8.95665 6.722 9.1524C6.74135 9.1874 6.76115 9.22325 6.7813 9.26015C6.84125 9.3698 6.90925 9.49835 6.9571 9.62505C7.00105 9.74125 7.0585 9.9313 7.0159 10.1394C6.9636 10.3948 6.788 10.5653 6.58305 10.6536C6.40605 10.7298 6.20065 10.75 6 10.75C3.26589 10.75 1 8.6499 1 6ZM5.25 4.75C5.6642 4.75 6 4.41421 6 4C6 3.58579 5.6642 3.25 5.25 3.25C4.83579 3.25 4.5 3.58579 4.5 4C4.5 4.41421 4.83579 4.75 5.25 4.75ZM4.375 6.125C4.375 6.5392 4.03921 6.875 3.625 6.875C3.21079 6.875 2.875 6.5392 2.875 6.125C2.875 5.7108 3.21079 5.375 3.625 5.375C4.03921 5.375 4.375 5.7108 4.375 6.125ZM7.75 5.5C8.1642 5.5 8.5 5.1642 8.5 4.75C8.5 4.33579 8.1642 4 7.75 4C7.3358 4 7 4.33579 7 4.75C7 5.1642 7.3358 5.5 7.75 5.5Z" fill="currentColor"/>
            </svg>
            FEATURES
          </div>
          <h2 style={{ ...syne(48, 700, { color: '#0F172A', letterSpacing: '-0.02em' }), fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            The engine behind your content empire.
          </h2>
        </div>

        {/* FEATURE 1: Tone Awareness */}
        <div style={rowStyle} className="cs-feature-row">
          <div style={{ paddingRight: '20px' }}>
            <div style={eyebrowStyle}>TONE AWARENESS</div>
            <h3 style={titleStyle}>It writes like you, not like a robot.</h3>
            <p style={descStyle}>
              ContentSplit preserves the voice, vocabulary, and energy of your original post. The LinkedIn version doesn't sound like the Twitter version — because they shouldn't.
            </p>
          </div>
          <div style={imageWrapperStyle}>
            <img src="/images/feature1.png" alt="Tone Awareness Feature" style={imgStyle} />
          </div>
        </div>

        {/* FEATURE 2: Batch Mode */}
        <div style={rowStyle} className="cs-feature-row">
          {/* Visual is on the left for this row */}
          <div style={{ ...imageWrapperStyle, order: -1 }}>
            <img src="/images/feature2.png" alt="Batch Mode Feature" style={imgStyle} />
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <div style={eyebrowStyle}>BATCH MODE</div>
            <h3 style={titleStyle}>Run a whole content calendar in one session.</h3>
            <p style={descStyle}>
              Upload multiple blog posts and queue them. ContentSplit processes each one and returns a full set of outputs per article — ready for scheduling.
            </p>
          </div>
        </div>

        {/* FEATURE 3: Edit Before Export */}
        <div style={{ ...rowStyle, marginBottom: 0 }} className="cs-feature-row">
          <div style={{ paddingRight: '20px' }}>
            <div style={eyebrowStyle}>EDIT BEFORE EXPORT</div>
            <h3 style={titleStyle}>Every output is a starting point, not a final draft.</h3>
            <p style={descStyle}>
              The editor is inline. Click any generated text and edit it directly. No jumping between tabs or copy-pasting into Notion.
            </p>
          </div>
          <div style={imageWrapperStyle}>
            <img src="/images/feature3.png" alt="Edit Before Export Feature" style={imgStyle} />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .cs-feature-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .cs-feature-row > div {
            padding: 0 !important;
          }
          /* On mobile, we always want the image below the text (or above), but let's just reset orders so text is on top */
          .cs-feature-row > div:nth-child(1) { order: 1 !important; }
          .cs-feature-row > div:nth-child(2) { order: 2 !important; }
        }
      `}</style>
    </section>
  )
}

export default LandingFeatureHighlights
