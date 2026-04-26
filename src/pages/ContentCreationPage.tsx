import React, { useState, useRef, useEffect } from 'react'
import { ChatInput, ChatLoadingBubble, PlatformSelector, ToneSelector, GeneratedContent, RegenerationControls, Logo } from '@components/application'
import { useGenerateContent, useRegenerateContent, useOutputs } from '@services/query-hooks'
import { Target, Ruler, Palette, User, Sparkles, FileText, Zap, Globe } from 'lucide-react'
import type { Output } from '@services/api-client'
import '@/styles/dashboard.css'

const platformOptions = [
  { id: 'twitter', name: 'Twitter/X', description: '280 chars per tweet' },
  { id: 'facebook', name: 'Facebook', description: 'Community posts' },
  { id: 'linkedin', name: 'LinkedIn', description: 'Professional posts' },
  { id: 'instagram', name: 'Instagram', description: 'Visual captions' },
  { id: 'email', name: 'Email', description: 'Newsletter style' },
  { id: 'summary', name: 'Summary', description: 'TL;DR bullet points' },
]

// Brand SVG icons for each platform
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="url(#ig-gradient)">
    <defs>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.955 10.125 11.884v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.952H17.945c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.028 24 18.062 24 12.073z" />
  </svg>
)

const SummaryIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h10" />
  </svg>
)

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
  email: <EmailIcon />,
  summary: <SummaryIcon />,
}

const toneOptions = [
  { id: 'professional', name: 'Professional', description: 'Formal business tone' },
  { id: 'casual', name: 'Casual', description: 'Friendly and relaxed' },
  { id: 'punchy', name: 'Punchy', description: 'Energetic and engaging' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
]

// Quick-start suggestions on the empty state
const SUGGESTIONS = [
  { icon: <FileText size={18} />, text: 'Convert a blog post to social media posts' },
  { icon: <Zap size={18} />, text: 'Turn a newsletter into short tweet threads' },
  { icon: <Globe size={18} />, text: 'Repurpose an article for LinkedIn' },
  { icon: <Sparkles size={18} />, text: 'Create captions for my latest Instagram post' },
]

type MessageType = 'text' | 'preferences' | 'loading' | 'result' | 'error'
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  type: MessageType
  text?: string
}

const ContentCreationPage: React.FC = () => {
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter'])
  const [selectedTone, setSelectedTone] = useState('casual')
  const [currentConversionId, setCurrentConversionId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('twitter')
  const [selectedRegenerationOption, setSelectedRegenerationOption] = useState('shorter')

  const generateMutation = useGenerateContent()
  const regenerateMutation = useRegenerateContent()
  const conversionId = currentConversionId || ''
  const { data: outputs, isLoading: outputsLoading } = useOutputs(conversionId)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    if (outputsLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, outputsLoading])

  useEffect(() => {
    if (!selectedPlatforms.includes(activeTab) && selectedPlatforms.length > 0) {
      requestAnimationFrame(() => {
        setActiveTab(selectedPlatforms[0])
      })
    }
  }, [selectedPlatforms, activeTab])

  const handleInputSubmit = () => {
    if (!inputText.trim()) return
    setMessages(prev => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', type: 'text', text: inputText },
      { id: crypto.randomUUID(), role: 'assistant', type: 'preferences' }
    ])
    setInputText('')
  }

  const handleSuggestion = (text: string) => {
    setInputText(text)
  }

  const handleGenerate = () => {
    const userMsg = [...messages].reverse().find(m => m.role === 'user' && m.type === 'text')
    if (!userMsg?.text || selectedPlatforms.length === 0) return
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', type: 'loading' }])
    generateMutation.mutate(
      {
        input_text: userMsg.text,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tone_mode: selectedTone as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        platforms: selectedPlatforms as any,
      },
      {
        onSuccess: (data) => {
          setCurrentConversionId(data.conversion.id)
          setMessages(prev => [
            ...prev.filter(m => m.type !== 'loading' && m.type !== 'preferences'),
            { id: crypto.randomUUID(), role: 'assistant', type: 'result' }
          ])
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          const errorMsg = err?.response?.data?.error || err?.message || 'Failed to generate content'
          setMessages(prev => [
            ...prev.filter(m => m.type !== 'loading'),
            { id: crypto.randomUUID(), role: 'assistant', type: 'error', text: errorMsg }
          ])
        },
      }
    )
  }

  const handleRegenerate = () => {
    if (!currentConversionId || !activeTab) return
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', type: 'loading' }])
    regenerateMutation.mutate({
      conversion_id: currentConversionId,
      platform: activeTab as 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'email' | 'summary',
    }, {
      onSuccess: () => {
        setMessages(prev => prev.filter(m => m.type !== 'loading'))
      }
    })
  }

  const getOutputsArray = (data: unknown): Output[] => {
    if (Array.isArray(data)) return data as Output[]
    if (data && typeof data === 'object' && 'data' in data) {
      const record = data as Record<string, unknown>
      if (Array.isArray(record.data)) return record.data as Output[]
    }
    return []
  }

  const outputsArray = getOutputsArray(outputs)
  const generatedContent = outputsArray.find(o => o.platform === activeTab)?.content || ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedPlatforms = platformOptions.map(p => ({ ...p, disabled: false, icon: PLATFORM_ICONS[p.id] as any }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedTones = toneOptions.map(t => ({ id: t.id, label: t.name, description: t.description, color: 'casual' as any }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative' }}>

      {/* ── ZONE 1: Empty State / Welcome Screen ── */}
      {!hasMessages && (
        <div className="welcome-content-container" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          gap: 'var(--sys-spacing-2xl)',
          padding: '24px var(--sys-spacing-xl)',
          width: '100%', overflowY: 'auto',
        }}>
          <div style={{ textAlign: 'center', width: '100%', padding: 0 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '16px',
              background: 'var(--sys-color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.25)',
            }}>
              <Logo size={28} color="white" />
            </div>
            <h1 className="suggestions-card-title" style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: '16px',
              lineHeight: 1.2,
              paddingBottom: '12px',
              color: 'var(--sys-color-neutral-10)',
              letterSpacing: '-0.02em',
              overflow: 'visible',
              width: '100%',
              padding: '0 16px',
              boxSizing: 'border-box',
            }}>
              Ready to repurpose?
            </h1>
            <p style={{ color: 'var(--sys-color-neutral-50)', width: '100%', padding: '0 16px', boxSizing: 'border-box', lineHeight: 1.6, fontSize: '1rem' }}>
               Paste your long-form content below to effortlessly adapt it for any platform.
            </p>
          </div>

          {/* Quick-start suggestions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            width: '100%',
            maxWidth: 680,
          }} className="quick-suggestions">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(s.text)}
                className="glass-card glass-card-hoverable suggestions-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  color: 'var(--sys-color-neutral-20)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                  border: 'none'
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: 10,
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  color: '#6366f1', flexShrink: 0
                }}>
                  {s.icon}
                </div>
                {s.text}
              </button>
            ))}
          </div>
        </div>
      )}

{/* ── ZONE 2: AI Chat / Processing Stream ── */}
      {hasMessages && (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
          <div style={{ flex: 1, overflowY: 'auto', paddingTop: 32 }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '16px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>

                {/* Avatar */}
                <div style={{
                  width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: msg.role === 'user' ? 'var(--sys-color-primary)' : 'rgba(255,255,255,0.6)',
                  color: msg.role === 'user' ? 'white' : '#6366f1',
                  boxShadow: msg.role === 'user' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                  border: msg.role === 'assistant' ? '1px solid rgba(99, 102, 241, 0.1)' : 'none'
                }}>
                  {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
                </div>

                {/* Bubble */}
                <div style={{ flex: 1, maxWidth: '90%' }}>

                  {/* ── Input Area message (user bubble) ── */}
                  {msg.type === 'text' && (
                    <div className="user-msg-bubble" style={{
                      padding: '16px 20px',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                    }}>
                      {msg.text}
                    </div>
                  )}

                  {/* ── Preferences (Platform + Tone selectors) ── */}
                  {msg.type === 'preferences' && (
                    <div className="glass-card ai-msg-bubble" style={{
                      padding: '28px',
                    }}>
                      <p style={{ marginBottom: '24px', color: '#334155', fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.5 }}>
                        Great! I've received your content. Now let's configure the output — choose your target platforms and tone.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <PlatformSelector
                          platforms={mappedPlatforms}
                          selected={selectedPlatforms}
                          onChange={setSelectedPlatforms}
                          variant="grid" layout="compact"
                          title="1. Target Platforms" subtitle="Where will this content live?" required maxSelection={5}
                        />
                        <ToneSelector
                          tones={mappedTones}
                          selected={[selectedTone]}
                          onChange={vals => setSelectedTone(vals[0] || '')}
                          variant="default" selectionMode="single" showPreview={false}
                          title="2. Voice & Tone" subtitle="How should it sound?" required
                        />
                        <div style={{
                          paddingTop: '24px',
                          borderTop: '1px solid rgba(0,0,0,0.05)',
                          marginTop: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                        }}>
                          <button
                            className="btn-gradient"
                            onClick={handleGenerate}
                            disabled={selectedPlatforms.length === 0 || generateMutation.isPending}
                            style={{
                              padding: '14px 32px',
                              minWidth: 200,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 10,
                              color: 'white',
                              borderRadius: '12px',
                            }}
                          >
                            <Sparkles size={18} className={generateMutation.isPending ? 'spin' : ''} />
                            {generateMutation.isPending ? 'Generating...' : 'Generate Content'}
                          </button>
                          {selectedPlatforms.length === 0 && (
                            <span style={{ fontSize: '0.85rem', color: 'var(--sys-color-tertiary)', fontWeight: 500 }}>
                              Select at least one platform
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Loading States ── */}
                  {msg.type === 'loading' && <ChatLoadingBubble />}

                  {/* ── Error State ── */}
                  {msg.type === 'error' && (
                    <div style={{
                      padding: '20px',
                      borderRadius: '16px',
                      backgroundColor: '#fee2e2',
                      border: '1px solid #fecaca',
                      color: '#b91c1c',
                      boxShadow: '0 4px 12px rgba(185, 28, 28, 0.05)'
                    }}>
                      <p style={{ fontWeight: 600, marginBottom: 8, fontSize: '1rem' }}>Generation failed</p>
                      <p style={{ fontSize: '0.95rem' }}>{msg.text}</p>
                    </div>
                  )}

                  {/* ── ZONE 3: Output Tabs (GeneratedContent + Regeneration) ── */}
                  {msg.type === 'result' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <GeneratedContent
                          platforms={platformOptions
                            .filter(p => selectedPlatforms.includes(p.id))
                            .map(p => ({
                              id: p.id,
                              name: p.name,
                              characterLimit: p.id === 'twitter' ? 280 : p.id === 'linkedin' ? 3000 : 2200,
                            }))}
                          activeTab={activeTab}
                          onTabChange={setActiveTab}
                          content={generatedContent}
                          isLoading={outputsLoading}
                          onRegenerate={handleRegenerate}
                        />
                      </div>
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <RegenerationControls
                          onRegenerate={handleRegenerate}
                          isLoading={regenerateMutation.isPending || generateMutation.isPending}
                          regenerateDisabled={!currentConversionId || !activeTab}
                          remainingUses={15}
                          options={[
                            { id: 'clarity', label: 'Improve Clarity', icon: <Target width={20} height={20} />, selected: selectedRegenerationOption === 'clarity', disabled: false },
                            { id: 'shorter', label: 'Make Shorter', icon: <Ruler width={20} height={20} />, selected: selectedRegenerationOption === 'shorter', disabled: false },
                            { id: 'emotion', label: 'Add Emotion', icon: <Palette width={20} height={20} />, selected: selectedRegenerationOption === 'emotion', disabled: false },
                          ]}
                          selectedOptionId={selectedRegenerationOption}
                          onOptionSelect={setSelectedRegenerationOption}
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* ── Input Area (persistently docked) ── */}
      <div className="chat-input-area-container" style={{
        flexShrink: 0, zIndex: 10,
        padding: '24px 24px 32px',
        background: 'transparent',
        pointerEvents: 'none',
      }}>
        <div style={{ width: '100%', maxWidth: 840, margin: '0 auto', pointerEvents: 'auto' }}>
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleInputSubmit}
            placeholder="Paste your blog post or article here to convert…"
          />
          <p className="chat-input-helper-text" style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: 'var(--sys-color-tertiary)', fontWeight: 500 }}>
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

    </div>
  )
}

export default ContentCreationPage
