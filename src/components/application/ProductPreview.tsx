import React, { useState, useEffect } from 'react'
import { Plus, ArrowUp, Sparkles } from 'lucide-react'
import { Logo } from '@components/application'

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-2.063-2.065 2.064 2.064 0 012.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="url(#ig-gradient)">
    <defs>
      <linearGradient id="ig-gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.667.07-4.947.196-4.354 2.618-6.78 6.98-6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X', icon: <TwitterIcon />, color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedinIcon />, color: '#0A66C2' },
  { id: 'instagram', name: 'Instagram', icon: <InstagramIcon />, color: '#E1306C' },
  { id: 'email', name: 'Email', icon: <MailIcon />, color: '#EA4335' },
]

const TONES = ['Professional', 'Casual', 'Punchy', 'Friendly']

export const ProductPreview: React.FC = () => {
  const [input, setInput] = useState('')
  const [showPrefs, setShowPrefs] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter'])
  const [selectedTone, setSelectedTone] = useState('Casual')
  const [hasResult, setHasResult] = useState(false)

  const handleSubmit = () => {
    if (!input.trim()) return
    setShowPrefs(true)
  }

  const handleGenerate = () => {
    setShowPrefs(false)
    setHasResult(true)
  }

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const demoText = "How to build a consistent coding habit in 30 days — practical tips for developers..."
    let currentText = ""
    let typingInterval: ReturnType<typeof setInterval>
    let timeouts: ReturnType<typeof setTimeout>[] = []

    const startSequence = () => {
      setInput('')
      setShowPrefs(false)
      setHasResult(false)
      currentText = ""

      timeouts.push(setTimeout(() => {
        let i = 0
        typingInterval = setInterval(() => {
          if (i < demoText.length) {
            currentText += demoText[i]
            setInput(currentText)
            i++
          } else {
            clearInterval(typingInterval)
            timeouts.push(setTimeout(() => {
              setShowPrefs(true)
              timeouts.push(setTimeout(() => {
                setShowPrefs(false)
                setHasResult(true)
                timeouts.push(setTimeout(() => {
                  startSequence()
                }, 6000))
              }, 2000))
            }, 800))
          }
        }, 40)
      }, 1000))
    }

    startSequence()

    return () => {
      clearInterval(typingInterval)
      timeouts.forEach(clearTimeout)
    }
  }, [])


  return (
    <>
    <style>{`
      @keyframes chatSlideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(20px)',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.5)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Logo size={18} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1e293b' }}>ContentSplit</span>
        <div style={{
          marginLeft: 'auto',
          display: 'flex', gap: 8,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 20,
            background: 'rgba(99,102,241,0.1)',
            color: '#6366f1',
          }}>Free</span>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {/* Welcome */}
        {!showPrefs && !hasResult && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
              Ready to repurpose?
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
              Paste your content below to adapt it for any platform.
            </p>
          </div>
        )}

        {/* User Message */}
        {(showPrefs || hasResult) && (
          <div style={{ display: 'flex', gap: 12, flexDirection: 'row-reverse', animation: 'chatSlideUp 0.4s ease-out forwards' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 12,
              background: '#6366f1', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
            }}>U</div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '20px 20px 4px 20px',
              padding: '14px 18px',
              color: '#1e1b4b',
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: '85%',
            }}>
              {input || "How to build a consistent coding habit in 30 days — practical tips for developers..."}
            </div>
          </div>
        )}

        {/* Preferences Panel */}
        {showPrefs && (
          <div style={{ display: 'flex', gap: 12, animation: 'chatSlideUp 0.4s ease-out forwards', animationDelay: '0.1s', opacity: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 12,
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6366f1', flexShrink: 0,
            }}><Sparkles size={16} /></div>
            <div style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '20px 20px 20px 4px',
              padding: '16px 20px',
              flex: 1,
            }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 10 }}>
                  1. Target Platforms
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PLATFORMS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 14px', borderRadius: 10,
                        border: selectedPlatforms.includes(p.id)
                          ? '2px solid #6366f1'
                          : '1px solid rgba(0,0,0,0.08)',
                        background: selectedPlatforms.includes(p.id)
                          ? 'rgba(99,102,241,0.08)'
                          : 'rgba(255,255,255,0.6)',
                        color: selectedPlatforms.includes(p.id) ? '#6366f1' : '#475569',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      {p.icon}
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 10 }}>
                  2. Tone
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {TONES.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTone(t)}
                      style={{
                        padding: '6px 14px', borderRadius: 8,
                        border: selectedTone === t
                          ? '2px solid #6366f1'
                          : '1px solid rgba(0,0,0,0.08)',
                        background: selectedTone === t
                          ? 'rgba(99,102,241,0.08)'
                          : 'rgba(255,255,255,0.6)',
                        color: selectedTone === t ? '#6366f1' : '#475569',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                style={{
                  width: '100%', padding: '10px', borderRadius: 10,
                  background: '#6366f1', color: 'white',
                  border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                }}
              >
                Generate →
              </button>
            </div>
          </div>
        )}

        {/* Generated Result */}
        {hasResult && (
          <div style={{ display: 'flex', gap: 12, animation: 'chatSlideUp 0.5s ease-out forwards', animationDelay: '0.1s', opacity: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 12,
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6366f1', flexShrink: 0,
            }}><Sparkles size={16} /></div>
            <div style={{ flex: 1 }}>
              {/* Tabs */}
              <div style={{
                display: 'flex', gap: 4, marginBottom: 12,
                background: 'rgba(255,255,255,0.4)', borderRadius: 10, padding: 4,
              }}>
                {selectedPlatforms.map(p => {
                  const platform = PLATFORMS.find(pl => pl.id === p)
                  return (
                    <div key={p} style={{
                      flex: 1, padding: '8px 12px', borderRadius: 8,
                      background: '#ffffff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      color: '#6366f1', fontSize: 13, fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
                    }}>
                      {platform?.icon}
                      {platform?.name}
                    </div>
                  )
                })}
              </div>
              {/* Generated content preview */}
              <div style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 12, padding: '16px 20px',
                fontSize: 14, lineHeight: 1.6, color: '#1e293b',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <TwitterIcon />
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#1DA1F2' }}>Twitter/X</span>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6 }}>
                  🚀 Building a coding habit in 30 days? Here's the secret: start small, stay consistent, and track your progress. 💻
                </p>
                <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6 }}>
                  Day 1-10: Code for just 20 mins daily. Day 11-20: Bump it to 45 mins. Day 21-30: Hit that 1-hour sweet spot! ⏱️
                </p>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                  Pro tip: Pair program with a friend for accountability! Who's joining the challenge? 👇 #CodingHabits #30DayChallenge
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button style={{
                  padding: '8px 16px', borderRadius: 8,
                  background: '#6366f1', color: 'white',
                  border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                }}>Copy</button>
                <button style={{
                  padding: '8px 16px', borderRadius: 8,
                  background: 'transparent', border: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer', fontWeight: 500, fontSize: 13, color: '#475569',
                }}>Edit</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(24px)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 12,
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 32, padding: '12px 16px',
        }}>
          <button style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1.5px solid #94a3b8',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', flexShrink: 0,
          }}><Plus size={16} /></button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your blog post, article, or content here..."
            style={{
              flex: 1, border: 'none', background: 'transparent',
              resize: 'none', outline: 'none',
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: '#1e293b', lineHeight: 1.5, minHeight: 20,
            }}
            rows={1}
          />
          <button
            onClick={handleSubmit}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: input.trim() ? '#6366f1' : '#cbd5e1',
              border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', flexShrink: 0,
              transform: input.trim() ? 'scale(1)' : 'scale(0.92)',
            }}
          ><ArrowUp size={17} strokeWidth={2.5} /></button>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 12,
          marginTop: 8, fontSize: 11, color: '#94a3b8',
        }}>
          <span>#contentcreation</span>
          <span>#AI</span>
          <span>#productivity</span>
        </div>
      </div>
    </div>
    </>
  )
}
