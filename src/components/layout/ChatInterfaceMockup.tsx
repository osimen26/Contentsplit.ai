import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { PanelLeft, Plus, ArrowUp, RefreshCw, Copy, CheckCircle2, CheckCheck } from 'lucide-react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

// ─── Typography helpers ───────────────────────────────────────────────────────
const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

// ─── Platform definitions ─────────────────────────────────────────────────────
const PLATFORMS = [
  { id: 'x',          label: 'X',          color: '#FFFFFF', bg: '#000000', tint: 'rgba(0,0,0,0.08)',         icon: '#000000' },
  { id: 'instagram',  label: 'Instagram',  color: '#FFFFFF', bg: '#E1306C', tint: 'rgba(225,48,108,0.10)',   icon: '#E1306C' },
  { id: 'threads',    label: 'Threads',    color: '#FFFFFF', bg: '#000000', tint: 'rgba(0,0,0,0.08)',         icon: '#000000' },
  { id: 'linkedin',   label: 'LinkedIn',   color: '#FFFFFF', bg: '#0077B5', tint: 'rgba(0,119,181,0.10)',    icon: '#0077B5' },
  { id: 'newsletter', label: 'Newsletter', color: '#FFFFFF', bg: '#FF6B35', tint: 'rgba(255,107,53,0.10)',   icon: '#FF6B35' },
  { id: 'facebook',   label: 'Facebook',   color: '#FFFFFF', bg: '#1877F2', tint: 'rgba(24,119,242,0.10)',   icon: '#1877F2' },
]

const TONES = ['Professional', 'Engaging', 'Educational', 'Persuasive', 'Informative']

// ─── Demo data ────────────────────────────────────────────────────────────────
const DEMOS = [
  {
    prompt: "I just finished a 2,000-word blog post on the future of AI in healthcare.",
    platforms: ['x', 'linkedin'],
    tone: 'Engaging',
    outputs: [
      {
        platformId: 'x',
        workedFor: '11s',
        charCount: '342 / 280',
        content: `1/ AI is about to rewrite healthcare as we know it. Here's what most people are missing 🧵\n\n2/ Today, diagnosis takes days. With AI? Seconds. Models now detect cancers in scans faster than radiologists.\n\n3/ The real shift: AI doesn't just diagnose — it predicts. \n\n4/ The future isn't doctors vs. AI — it's doctors empowered by AI.`,
      },
      {
        platformId: 'linkedin',
        workedFor: '14s',
        charCount: '624 / 3000',
        content: `Healthcare is changing faster than we realize, and the biggest shift isn't in treatment—it's in prediction.\n\nI just finished writing a deep dive on AI in healthcare, and the takeaway is clear: models are now detecting anomalies in scans faster than human radiologists, with fewer false positives.\n\nDoctors won't be replaced by AI. They will be empowered by it. Less time on paperwork means more time with patients.\n\nHow do you feel about AI analyzing your medical data? Let's discuss below. 👇`,
      }
    ]
  },
  {
    prompt: "Here's my YouTube script on 10 productivity hacks that actually changed my life.",
    platforms: ['instagram', 'newsletter'],
    tone: 'Informative',
    outputs: [
      {
        platformId: 'instagram',
        workedFor: '9s',
        charCount: '443 / 2200',
        content: `✨ 10 Productivity Hacks That Actually Work (Save this!)\n\nAfter 3 years of testing systems, here's what survived:\n\n1️⃣ Time-blocking > to-do lists\n2️⃣ The 2-minute rule (do it NOW)\n3️⃣ Single-tasking (multitasking is a myth!)\n\nThe most underrated insight? Systems beat motivation every time. 🛠️\n\nWhich one are you trying this week? Let me know in the comments! 👇`,
      },
      {
        platformId: 'newsletter',
        workedFor: '12s',
        charCount: '705 / ∞',
        content: `Hey everyone 👋\n\nThis week, I want to talk about something we all struggle with: getting things done without burning out. Over the last 3 years, I've tested dozens of productivity systems. Most of them failed. \n\nBut a few stuck. Here are the top hacks that legitimately changed how I work:\n\nTime-Blocking: To-do lists are wishlists. If you don't assign a specific time to a task, it won't get done.\n\nThe 2-Minute Rule: If an email or task takes less than 120 seconds, do it immediately. Don't let micro-tasks clog your brain.\n\nRemember: Motivation is fleeting. Build a system that runs on discipline instead.\n\nReply to this email and let me know your biggest productivity struggle right now!`,
      }
    ]
  },
]

// ─── Platform SVG icons ───────────────────────────────────────────────────────
const PlatformIcon: React.FC<{ id: string; size?: number }> = ({ id, size = 15 }) => {
  const s: React.CSSProperties = { width: size, height: size, display: 'block', flexShrink: 0, objectFit: 'contain' }
  switch (id) {
    case 'x': return <img src="/images/platforms/twitterbig.png" style={s} alt="X" />
    case 'instagram': return <img src="/images/platforms/Instagrambig.png" style={s} alt="Instagram" />
    case 'threads': return <img src="/images/platforms/threadsbig.png" style={s} alt="Threads" />
    case 'linkedin': return <img src="/images/platforms/LinkedIn-big.png" style={s} alt="LinkedIn" />
    case 'newsletter': return <img src="/images/platforms/emailbg.png" style={s} alt="Newsletter" />
    case 'facebook': return <img src="/images/platforms/Facebookbig.png" style={s} alt="Facebook" />
    default: return null
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────
type AIOutput = {
  platformId: string
  content: string
  workedFor: string
  charCount: string
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content?: string
  outputs?: AIOutput[]
}

// ─── AI Response card (matches product screenshot) ────────────────────────────
const AIResponseCard: React.FC<{ output: AIOutput }> = ({ output }) => {
  const platform = PLATFORMS.find(p => p.id === output.platformId)
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/logo.svg" alt="C" style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <div style={{ ...dm(13, 600, { color: '#0F172A' }) }}>Contentsplit</div>
            <div style={{ ...dm(11, 400, { color: '#94A3B8' }) }}>Worked for {output.workedFor} ›</div>
          </div>
        </div>
        {platform && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '5px', background: platform.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <PlatformIcon id={platform.id} size={13} />
            </div>
            <span style={{ ...dm(12, 600, { color: '#0F172A' }) }}>{platform.label}</span>
          </div>
        )}
      </div>
      {/* Body */}
      <div style={{ padding: '16px', flex: 1, ...dm(13, 400, { color: '#1E293B', lineHeight: 1.75, whiteSpace: 'pre-wrap' }) }}>
        {output.content}
      </div>
      {/* Footer */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAFA' }}>
        <span style={{ ...dm(12, 400, { color: '#94A3B8' }) }}>{output.charCount}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', ...dm(12, 500, { color: '#64748B' }) }}>
            <RefreshCw size={11} /> Regenerate
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0F172A', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', ...dm(12, 600, { color: '#FFFFFF' }) }}>
            <Copy size={11} /> Copy
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Streaming card (while AI generates) ─────────────────────────────────────
const StreamingCard: React.FC<{ text: string; platformId: string; showCursor: boolean }> = ({ text, platformId, showCursor }) => {
  const platform = PLATFORMS.find(p => p.id === platformId)
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/logo.svg" alt="C" style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <div style={{ ...dm(13, 600, { color: '#0F172A' }) }}>Contentsplit</div>
            <div style={{ ...dm(11, 400, { color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px' } as React.CSSProperties) }}>
              <span style={{ letterSpacing: '2px' }}>•••</span> Generating...
            </div>
          </div>
        </div>
        {platform && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '5px', background: platform.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <PlatformIcon id={platform.id} size={13} />
            </div>
            <span style={{ ...dm(12, 600, { color: '#0F172A' }) }}>{platform.label}</span>
          </div>
        )}
      </div>
      <div style={{ padding: '16px', flex: 1, ...dm(13, 400, { color: '#1E293B', lineHeight: 1.75, whiteSpace: 'pre-wrap' }) }}>
        {text}
        <span style={{ display: 'inline-block', width: '2px', height: '1em', background: '#111827', marginLeft: '1px', verticalAlign: 'text-bottom', borderRadius: '1px', opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }} />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
const ChatInterfaceMockup: React.FC = () => {
  const [inputText,         setInputText]         = useState('')
  const [showCursor,        setShowCursor]        = useState(true)
  const [isUserFocused,     setIsUserFocused]     = useState(false)
  
  // Array of selected platforms for multi-select
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  
  const [selectedTone,      setSelectedTone]      = useState<string | null>(null)
  const [chatMessages,      setChatMessages]      = useState<ChatMessage[]>([])
  
  // Streaming state holds a map of platformId -> text
  const [streamedOutputs,   setStreamedOutputs]   = useState<Record<string, string>>({})
  const [isStreaming,       setIsStreaming]       = useState(false)
  const [streamPlatforms,   setStreamPlatforms]   = useState<string[]>([])

  const containerRef      = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const demoIndexRef      = useRef(0)
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  // Cursor blink
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => setShowCursor(p => !p), 530)
    return () => { if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current) }
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatMessages, streamedOutputs])

  // ── Main demo animation ──────────────────────────────────────────────────
  useGSAP(() => {
    if (isUserFocused) return

    let cancelled = false
    const pendingTimeouts: ReturnType<typeof setTimeout>[] = []

    const safeTimeout = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { if (!cancelled) fn() }, ms)
      pendingTimeouts.push(id)
    }

    const runDemo = () => {
      if (cancelled) return

      const demo = DEMOS[demoIndexRef.current % DEMOS.length]
      demoIndexRef.current++

      // Reset everything
      setInputText('');  setSelectedPlatforms([]); setSelectedTone(null)
      setStreamedOutputs({});   setIsStreaming(false)

      // ── Phase 1: type the prompt ────────────────────────────────────────
      const typeTl = gsap.timeline({ defaults: { ease: 'none' } })
      demo.prompt.split('').forEach(char => {
        typeTl.to({}, {
          duration: 0.025 + Math.random() * 0.025,
          onComplete: () => { if (!cancelled) setInputText(prev => prev + char) },
        })
      })

      typeTl.eventCallback('onComplete', () => {
        if (cancelled) return

        // ── Phase 2: select platforms (Multi-select) ──────────────────────
        safeTimeout(() => {
          const selectPlatTl = gsap.timeline()
          demo.platforms.forEach((pId) => {
            selectPlatTl.to({}, {
              duration: 0.4,
              onComplete: () => { if (!cancelled) setSelectedPlatforms(prev => [...prev, pId]) }
            })
          })

          selectPlatTl.eventCallback('onComplete', () => {
            if (cancelled) return

            // ── Phase 3: select tone ───────────────────────────────
            safeTimeout(() => {
              if (!cancelled) setSelectedTone(demo.tone)

              // ── Phase 4: send ─────────────────────────────────────────
              safeTimeout(() => {
                  if (cancelled) return

                  const userMsg: ChatMessage = { role: 'user', content: demo.prompt }
                  setChatMessages(prev => [...prev, userMsg])
                  setInputText(''); setSelectedPlatforms([]); setSelectedTone(null)
                  setIsStreaming(true); setStreamedOutputs({}); setStreamPlatforms(demo.platforms)

                  // ── Phase 5: stream AI responses simultaneously ─────────
                  safeTimeout(() => {
                    if (cancelled) return
                    
                    const streamTl = gsap.timeline({ defaults: { ease: 'none' } })
                    
                    // Find longest output to base timeline duration
                    const maxLen = Math.max(...demo.outputs.map(o => o.content.length))
                    
                    const chunkSize = 3
                    for (let i = 0; i < maxLen; i += chunkSize) {
                      streamTl.to({}, {
                        duration: 0.04,
                        onComplete: () => {
                          if (cancelled) return
                          setStreamedOutputs(prev => {
                            const next = { ...prev }
                            demo.outputs.forEach(output => {
                              if (i < output.content.length) {
                                const chunk = output.content.slice(i, i + chunkSize)
                                next[output.platformId] = (next[output.platformId] || '') + chunk
                              }
                            })
                            return next
                          })
                        }
                      })
                    }

                    streamTl.eventCallback('onComplete', () => {
                      if (cancelled) return
                      setChatMessages(prev => [...prev, {
                        role: 'assistant',
                        outputs: demo.outputs,
                      }])
                      setStreamedOutputs({}); setIsStreaming(false)

                      // ── Phase 6: pause then reset ─────────────────────
                      safeTimeout(() => {
                        if (!cancelled) { setChatMessages([]); runDemo() }
                      }, 5000)
                    })
                    activeTimelineRef.current = streamTl
                  }, 500)
                }, 700)
            }, 600)
          })
        }, 700)
      })

      activeTimelineRef.current = typeTl
    }

    safeTimeout(runDemo, 600)

    return () => {
      cancelled = true
      pendingTimeouts.forEach(clearTimeout)
      activeTimelineRef.current?.kill()
      activeTimelineRef.current = null
      setInputText(''); setSelectedPlatforms([]); setSelectedTone(null)
      setStreamedOutputs({}); setChatMessages([]); setIsStreaming(false)
    }
  }, { scope: containerRef, dependencies: [isUserFocused] })

  const handleBlur = () => setIsUserFocused(false)
  const hasChatContent = chatMessages.length > 0 || isStreaming

  return (
    <div style={{ transform: 'scale(0.9)', transformOrigin: 'center center', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div ref={containerRef} style={{
        width: '1100px', maxWidth: '100%', height: '733px', margin: '0 auto',
        background: '#FBFAF9', borderRadius: '10.47px',
        border: '1px solid rgba(0,0,0,0.04)', display: 'flex', overflow: 'hidden', textAlign: 'left',
      }}>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside style={{
        width: '220px', background: '#FBFAF9', display: 'flex', flexDirection: 'column',
        padding: '20px 16px', flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.05)',
      }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <img src="/logo.svg" alt="ContentSplit" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#0F172A', display: 'flex', padding: '4px' }}>
            <PanelLeft size={20} strokeWidth={2} />
          </button>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <button style={{
            width: '100%', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.13)',
            borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }} className="mockup-btn">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="/bubble-chat-add.svg" alt="" style={{ width: '16px', height: '16px' }} />
              <span style={{ ...dm(13, 600, { color: '#0F172A' }) }}>New Chat</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ ...dm(9, 600, { color: '#94A3B8', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1px 5px', borderRadius: '4px' }) }}>Ctrl</span>
              <span style={{ ...dm(9, 600, { color: '#94A3B8', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1px 5px', borderRadius: '4px' }) }}>K</span>
            </div>
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto' }}>
          <h3 style={{ ...dm(13, 500, { color: '#94A3B8', marginBottom: '16px', paddingLeft: '4px' }) }}>Chats</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['Landing Page Development', 'Shared attachments'].map((label, i) => (
              <li key={i}>
                <button style={{ width: '100%', background: 'transparent', border: 'none', padding: '8px 4px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px' }}>
                  <span style={{ ...dm(14, 400, { color: '#1E293B' }) }}>{label}</span>
                  {i === 1 && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#111827', flexShrink: 0 }} />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <footer style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <img src="/images/trusted-by.jpg" alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <span style={{ ...dm(12, 600, { color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '64px' }) }}>victor os...</span>
          </div>
          <button style={{ background: 'rgba(0,0,0,0.03)', border: 'none', borderRadius: '8px', padding: '2.34px 4.23px', cursor: 'pointer', ...dm(12, 600, { color: '#0F172A' }), transition: 'background 0.2s' }}>
            Upgrade
          </button>
        </footer>
      </aside>

      {/* ── Main chat area ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, background: '#FBFAF9', padding: '2.94px', display: 'flex' }}>
        <main style={{
          flex: 1, background: '#FFFFFF', borderRadius: '10.47px',
          display: 'flex', flexDirection: 'column', position: 'relative',
          boxShadow: '0 4px 24px rgba(0,0,0,0.02)', overflow: 'hidden',
        }}>

          {/* Top bar */}
          <header style={{ padding: '14px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <button style={{
              background: 'rgba(0,0,0,0.03)', border: 'none', borderRadius: '999px',
              padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '6px',
              cursor: 'pointer', ...dm(13, 600, { color: '#3B82F6' }),
            }}>
              <img src="/Img.svg" alt="" style={{ width: '14px', height: '14px' }} />
              Upgrade your plan
            </button>
          </header>

          {/* Chat messages */}
          <div ref={scrollContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
            {!hasChatContent ? (
              /* Enhanced Empty State for Multi-Platform Selection */
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px', paddingBottom: '40px' }}>
                
                <h2 style={{ ...syne(32, 600, { color: '#0F172A', letterSpacing: '-0.02em', margin: 0, marginBottom: '12px' }) }}>
                  Ready to repurpose
                </h2>
                <p style={{ ...dm(16, 400, { color: '#64748B', textAlign: 'center', margin: 0, marginBottom: '40px', maxWidth: '420px', lineHeight: 1.5 }) }}>
                  Paste your long-form content below to effortlessly adapt it for any platform.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '600px' }}>
                  {PLATFORMS.map(p => {
                    const isSelected = selectedPlatforms.includes(p.id)
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setIsUserFocused(true); activeTimelineRef.current?.kill()
                          togglePlatform(p.id)
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '12px 20px', borderRadius: '12px', cursor: 'pointer',
                          background: '#FFFFFF',
                          border: isSelected ? `1.5px solid ${p.bg}` : '1.5px solid #E2E8F0',
                          boxShadow: isSelected ? `inset 0 0 0 0.5px ${p.bg}` : '0 2px 8px rgba(0,0,0,0.02)',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ 
                          width: '28px', height: '28px', borderRadius: '6px', 
                          background: isSelected ? '#FFFFFF' : '#F1F5F9',
                          boxShadow: isSelected ? `inset 0 0 0 1.5px ${p.bg}` : 'none',
                          color: isSelected ? p.bg : '#64748B',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <PlatformIcon id={p.id} size={14} />
                        </div>
                        <span style={{ ...dm(14, 600, { color: isSelected ? '#0F172A' : '#475569' }) }}>
                          {p.label}
                        </span>
                        {isSelected && <CheckCircle2 size={16} color={p.icon} style={{ marginLeft: '4px' }} />}
                      </button>
                    )
                  })}
                </div>

                <div style={{ marginTop: '24px' }}>
                  <button 
                    onClick={() => {
                      setIsUserFocused(true); activeTimelineRef.current?.kill()
                      if (selectedPlatforms.length === PLATFORMS.length) {
                        setSelectedPlatforms([])
                      } else {
                        setSelectedPlatforms(PLATFORMS.map(p => p.id))
                      }
                    }}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      ...dm(14, 500, { color: '#111827' })
                    }}
                  >
                    <CheckCheck size={16} /> 
                    {selectedPlatforms.length === PLATFORMS.length ? 'Deselect all' : 'Select all platforms'}
                  </button>
                </div>

                {/* Tone selection step (appears after platforms are selected) */}
                {selectedPlatforms.length > 0 && (
                  <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.3s ease-out' }}>
                    <h3 style={{ ...syne(20, 600, { color: '#0F172A', letterSpacing: '-0.01em', margin: 0, marginBottom: '16px' }) }}>
                      What tone should we use?
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '500px' }}>
                      {TONES.map(t => (
                        <button
                          key={t}
                          onClick={() => {
                            setIsUserFocused(true); activeTimelineRef.current?.kill()
                            setSelectedTone(t)
                          }}
                          style={{
                            padding: '10px 16px', borderRadius: '10px', cursor: 'pointer',
                            background: selectedTone === t ? '#F1F5F9' : '#FFFFFF',
                            border: selectedTone === t ? '1.5px solid #0F172A' : '1.5px solid #E2E8F0',
                            boxShadow: selectedTone === t ? 'none' : '0 2px 6px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s',
                            ...dm(14, selectedTone === t ? 600 : 500, { color: selectedTone === t ? '#0F172A' : '#64748B' })
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* Message thread */
              <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '16px' }}>
                {chatMessages.map((msg, i) =>
                  msg.role === 'user' ? (
                    /* User bubble */
                    <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        maxWidth: '72%', background: '#F1F5F9', borderRadius: '16px 16px 4px 16px',
                        padding: '12px 16px', ...dm(14, 400, { color: '#1E293B', lineHeight: 1.6 }),
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    /* AI Grid Response for multiple outputs */
                    <div key={i} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: msg.outputs && msg.outputs.length > 1 ? 'repeat(auto-fit, minmax(340px, 1fr))' : 'minmax(0, 600px)', 
                      gap: '16px' 
                    }}>
                      {msg.outputs?.map((out, j) => (
                        <AIResponseCard key={j} output={out} />
                      ))}
                    </div>
                  )
                )}

                {/* Live streaming cards in grid */}
                {isStreaming && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: streamPlatforms.length > 1 ? 'repeat(auto-fit, minmax(340px, 1fr))' : 'minmax(0, 600px)', 
                    gap: '16px' 
                  }}>
                    {streamPlatforms.map((pid) => (
                      <StreamingCard 
                        key={pid} 
                        text={streamedOutputs[pid] || ''} 
                        platformId={pid} 
                        showCursor={showCursor} 
                      />
                    ))}
                  </div>
                )}

                <div style={{ height: '10px' }} />
              </div>
            )}
          </div>

          {/* ── Input area ────────────────────────────────────────────────── */}
          <div style={{ padding: '12px 24px 18px 24px', flexShrink: 0 }}>
            <div className="chat-input-container" style={{
              width: '100%', background: '#FFFFFF',
              border: '0.53px solid rgba(0,0,0,0.13)', borderRadius: '12.68px',
              padding: '14px 16px 10px 16px',
              boxShadow: '0px 2.64px 8.45px -2.11px rgba(0,0,0,0.07)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}>

              {/* Text — demo display or real textarea */}
              {!isUserFocused ? (
                <div
                  onClick={() => { setIsUserFocused(true); activeTimelineRef.current?.kill(); setInputText('') }}
                  style={{
                    width: '100%', minHeight: '48px', cursor: 'text', userSelect: 'none',
                    ...dm(14, 400, { color: inputText ? '#1E293B' : '#94A3B8', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }),
                  }}
                >
                  {inputText || <span style={{ color: '#94A3B8' }}>Paste your blog post or article here...</span>}
                  <span style={{
                    display: 'inline-block', width: '2px', height: '1em', background: '#111827',
                    marginLeft: '1px', verticalAlign: 'text-bottom', borderRadius: '1px',
                    opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s',
                  }} />
                </div>
              ) : (
                <textarea
                  autoFocus value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Paste your blog post or article here..."
                  style={{
                    width: '100%', minHeight: '48px', background: 'transparent',
                    border: 'none', resize: 'none', outline: 'none',
                    color: '#1E293B', caretColor: '#111827',
                    ...dm(14, 400, { lineHeight: 1.6 }), padding: 0, cursor: 'text',
                  }}
                />
              )}

              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Left: attach */}
                <button className="chat-action-btn"><Plus size={18} color="#64748B" /></button>

                {/* Right: send */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

                  {/* Send button */}
                  <button style={{
                    background: (inputText || isUserFocused) ? '#0F172A' : '#E2E8F0',
                    color: '#FFFFFF', border: 'none', borderRadius: '50%',
                    width: '30px', height: '30px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }} className="chat-submit-btn">
                    <ArrowUp size={15} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            <p style={{ ...dm(12, 400, { color: '#94A3B8', textAlign: 'center', marginTop: '10px' }) }}>
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </main>
      </div>

      <style>{`
        .mockup-btn:hover { border-color: rgba(0,0,0,0.2) !important; }
        .chat-input-container:focus-within { border-color: #CBD5E1 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important; }
        .chat-action-btn { background: transparent; border: none; color: #94A3B8; cursor: pointer; padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .chat-action-btn:hover { background: #F1F5F9; }
        .chat-submit-btn:hover { background: #0F172A !important; }
      `}</style>
    </div>
    </div>
  )
}

export default ChatInterfaceMockup
