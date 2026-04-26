import React, { useState } from 'react'
import { Sparkles, Copy, ArrowRight, Check } from 'lucide-react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorSurface2: '#1A1A24',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
  colorWhite: '#FFFFFF',
  radiusMd: '12px',
  radiusLg: '20px',
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorSurface,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    color: tokens.colorTextPrimary,
    textAlign: 'center',
    marginBottom: '16px',
  },
  subtext: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    color: tokens.colorTextSecondary,
    textAlign: 'center',
    marginBottom: '48px',
  },
  widget: {
    background: tokens.colorBg,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusLg,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    overflow: 'hidden',
  },
  panel: {
    padding: '24px',
  },
  panelLeft: {
    borderRight: `1px solid ${tokens.colorBorder}`,
  },
  panelLabel: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: tokens.colorTextMuted,
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    height: '200px',
    background: tokens.colorSurface2,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusMd,
    padding: '16px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '15px',
    color: tokens.colorTextSecondary,
    resize: 'none',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  generateBtn: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    color: tokens.colorWhite,
    background: tokens.colorAccent,
    border: 'none',
    cursor: 'pointer',
    padding: '14px 24px',
    borderRadius: tokens.radiusMd,
    marginTop: '16px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  outputArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '320px',
    overflow: 'auto',
  },
  tweet: {
    padding: '12px 16px',
    background: tokens.colorSurface2,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusMd,
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextPrimary,
    lineHeight: 1.5,
  },
  tweetNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: tokens.colorAccent,
    color: tokens.colorWhite,
    fontSize: '11px',
    fontWeight: 600,
    marginRight: '8px',
  },
  copyBtn: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 500,
    fontSize: '13px',
    color: tokens.colorTextSecondary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  placeholder: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: tokens.colorTextMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '48px 24px',
  },
}

const LiveDemo: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateThread = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    setOutput([])
    
    try {
      const response = await fetch('/api/generate-thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input }),
      })
      
      const data = await response.json()
      
      if (data.tweets) {
        const tweets = data.tweets
        setOutput([])
        for (let i = 0; i < tweets.length; i++) {
          await new Promise(r => setTimeout(r, 100))
          setOutput(prev => [...prev, tweets[i]])
        }
      }
    } catch (err) {
      console.error('Demo error:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyAll = () => {
    const text = output.map((t, i) => `${i + 1}. ${t}`).join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.headline}>
          See it work before you sign up.
        </h2>
        
        <p style={styles.subtext}>
          No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.
        </p>

        <div style={styles.widget}>
          {/* Left Panel */}
          <div style={{ ...styles.panel, ...styles.panelLeft }}>
            <div style={styles.panelLabel}>Blog excerpt</div>
            <textarea
              style={styles.textarea}
              placeholder="Paste a paragraph from any blog post..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="cs-textarea"
            />
            <button
              style={styles.generateBtn}
              onClick={generateThread}
              disabled={loading || !input.trim()}
              className="cs-generate-btn"
            >
              {loading ? (
                <>Generating...</>
              ) : (
                <>Generate Twitter Thread → <ArrowRight size={16} /></>
              )}
            </button>
          </div>

          {/* Right Panel */}
          <div style={styles.panel}>
            <div style={styles.panelLabel}>Generated Twitter/X Thread</div>
            {output.length > 0 ? (
              <div style={styles.outputArea}>
                {output.map((tweet, i) => (
                  <div key={i} style={styles.tweet}>
                    <span style={styles.tweetNumber}>{i + 1}</span>
                    {tweet}
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.placeholder}>
                Generated output will appear here...
              </div>
            )}
            {output.length > 0 && (
              <button
                style={styles.copyBtn}
                onClick={copyAll}
                className="cs-copy-btn"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy all'}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cs-textarea:focus {
          border-color: ${tokens.colorAccent} !important;
        }

        .cs-generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px ${tokens.colorAccent}40;
        }

        .cs-generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cs-copy-btn:hover {
          background: ${tokens.colorSurface};
        }

        @media (max-width: 640px) {
          .cs-widget {
            grid-template-columns: 1fr !important;
          }
          .cs-panel-left {
            border-right: none !important;
            border-bottom: 1px solid ${tokens.colorBorder} !important;
          }
        }
      `}</style>
    </section>
  )
}

export default LiveDemo