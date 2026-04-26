import React, { useState, useRef, useEffect } from 'react'
import { ChatInput, ChatLoadingBubble, PlatformSelector, ToneSelector, GeneratedContent, RegenerationControls } from '@components/application'
import { useGenerateContent, useRegenerateContent, useOutputs } from '@services/query-hooks'
import { Target, Ruler, Palette, User, Sparkles, FileText, Zap, Globe } from 'lucide-react'
import type { Output } from '@services/api-client'

const platformOptions = [
  { id: 'twitter', name: 'Twitter/X', description: '280 chars per tweet' },
  { id: 'linkedin', name: 'LinkedIn', description: 'Professional posts' },
  { id: 'instagram', name: 'Instagram', description: 'Visual captions' },
  { id: 'email', name: 'Email', description: 'Newsletter style' },
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

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  twitter: <TwitterIcon />,
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
  email: <EmailIcon />,
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

type MessageType = 'text' | 'preferences' | 'loading' | 'result'
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
    const filtered = messages.filter(m => m.type !== 'preferences')
    setMessages([...filtered, { id: crypto.randomUUID(), role: 'assistant', type: 'loading' }])
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
            ...prev.filter(m => m.type !== 'loading'),
            { id: crypto.randomUUID(), role: 'assistant', type: 'result' }
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
      platform: activeTab as 'twitter' | 'linkedin' | 'instagram' | 'email',
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: 'var(--sys-color-neutral-99)' }}>

      {/* ── ZONE 1: Empty State / Welcome Screen ── */}
      {!hasMessages && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '100px',
          gap: 'var(--sys-spacing-2xl)',
          padding: '0 var(--sys-spacing-xl) 100px',
        }}>
          {/* Hero */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ margin: '0 auto var(--sys-spacing-lg)' }}>
              <img src="/icon_copy.svg" alt="ContentSplit" style={{ width: 160, height: 160 }} />
            </div>
            <h1 style={{
              fontFamily: 'var(--sys-typography-headline-large-font-family)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              marginBottom: 'var(--sys-spacing-sm)',
              color: 'var(--sys-color-neutral-10)',
            }}>
              Ready to repurpose?
            </h1>
            <p style={{ color: 'var(--sys-color-neutral-50)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
               Paste your long-form content to get started.
            </p>
          </div>

          {/* Quick-start suggestions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--sys-spacing-md)',
            width: '100%',
            maxWidth: 640,
          }}>
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(s.text)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sys-spacing-md)',
                  padding: 'var(--sys-spacing-md) var(--sys-spacing-lg)',
                  borderRadius: 'var(--sys-radius-lg)',
                  border: '1px solid var(--sys-color-border-tertiary)',
                  backgroundColor: 'var(--sys-color-neutral-98)',
                  color: 'var(--sys-color-neutral-30)',
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--sys-color-primary-80)'
                  e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-98)'
                  e.currentTarget.style.color = 'var(--sys-color-primary-30)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--sys-color-border-tertiary)'
                  e.currentTarget.style.backgroundColor = 'var(--sys-color-neutral-98)'
                  e.currentTarget.style.color = 'var(--sys-color-neutral-30)'
                }}
              >
                <span style={{ color: 'var(--sys-color-primary-50)', flexShrink: 0 }}>{s.icon}</span>
                {s.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ZONE 2: AI Chat / Processing Stream ── */}
      {hasMessages && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--sys-spacing-2xl) var(--sys-spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-2xl)' }}>

            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: 'var(--sys-spacing-md)', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>

                {/* Avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: msg.role === 'user' ? 'var(--sys-color-primary-90)' : 'transparent',
                  color: msg.role === 'user' ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-50)',
                }}>
                  {msg.role === 'user' ? <User size={18} /> : <img src="/icon_copy.svg" alt="ContentSplit" style={{ width: 32, height: 32, borderRadius: 8 }} />}
                </div>

                {/* Bubble */}
                <div style={{ flex: 1, maxWidth: '90%' }}>

                  {/* ── Input Area message (user bubble) ── */}
                  {msg.type === 'text' && (
                    <div style={{
                      padding: 'var(--sys-spacing-md) var(--sys-spacing-lg)',
                      borderRadius: 'var(--sys-radius-lg)',
                      backgroundColor: msg.role === 'user' ? 'var(--sys-color-primary-98)' : 'transparent',
                      border: '1px solid',
                      borderColor: msg.role === 'user' ? 'var(--sys-color-primary-90)' : 'var(--sys-color-border-tertiary)',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      color: 'var(--sys-color-neutral-20)',
                    }}>
                      {msg.text}
                    </div>
                  )}

                  {/* ── Preferences (Platform + Tone selectors) ── */}
                  {msg.type === 'preferences' && (
                    <div style={{
                      padding: 'var(--sys-spacing-xl)',
                      borderRadius: 'var(--sys-radius-xl)',
                      border: '1px solid var(--sys-color-border-tertiary)',
                      backgroundColor: 'var(--sys-color-neutral-99)',
                    }}>
                      <p style={{ marginBottom: 'var(--sys-spacing-xl)', color: 'var(--sys-color-neutral-30)', fontWeight: 500, lineHeight: 1.5 }}>
                        Great! I've received your content. Now let's configure the output — choose your target platforms and tone.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-xl)' }}>
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
                          paddingTop: 'var(--sys-spacing-lg)',
                          borderTop: '1px solid var(--sys-color-border-tertiary)',
                          marginTop: 'var(--sys-spacing-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--sys-spacing-md)',
                        }}>
                          <button
                            className="button button-filled"
                            onClick={handleGenerate}
                            disabled={selectedPlatforms.length === 0}
                            style={{
                              padding: '12px 32px',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              minWidth: 180,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <Sparkles size={16} />
                            Generate Content
                          </button>
                          {selectedPlatforms.length === 0 && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--sys-color-neutral-60)' }}>
                              Select at least one platform
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Loading States ── */}
                  {msg.type === 'loading' && <ChatLoadingBubble />}

                  {/* ── ZONE 3: Output Tabs (GeneratedContent + Regeneration) ── */}
                  {msg.type === 'result' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-xl)', width: '100%' }}>
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
                  )}

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* ── Input Area (persistently docked) ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'var(--sys-spacing-lg) var(--sys-spacing-xl) var(--sys-spacing-xl)',
        background: 'linear-gradient(to top, var(--sys-color-neutral-99) 55%, transparent)',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', pointerEvents: 'auto' }}>
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleInputSubmit}
            placeholder="Paste your blog post or article here to convert…"
          />
          <p style={{ textAlign: 'center', marginTop: 'var(--sys-spacing-sm)', fontSize: '0.75rem', color: 'var(--sys-color-neutral-60)' }}>
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

    </div>
  )
}

export default ContentCreationPage
