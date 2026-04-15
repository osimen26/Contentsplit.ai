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
      setActiveTab(selectedPlatforms[0])
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
  const mappedPlatforms = platformOptions.map(p => ({ ...p, disabled: false, icon: undefined as any }))
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
            <div style={{
              width: 56, height: 56, borderRadius: 'var(--sys-radius-lg)',
              background: 'linear-gradient(135deg, var(--sys-color-primary-80), var(--sys-color-primary-40))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--sys-spacing-lg)',
              boxShadow: '0 4px 20px var(--sys-color-primary-90)',
            }}>
              <Sparkles size={26} color="white" />
            </div>
            <h1 style={{
              fontFamily: 'var(--sys-typography-headline-large-font-family)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              marginBottom: 'var(--sys-spacing-sm)',
              color: 'var(--sys-color-neutral-10)',
            }}>
              What would you like to create?
            </h1>
            <p style={{ color: 'var(--sys-color-neutral-50)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
              Paste your blog post, article, or any text below. ContentSplit will adapt it for every platform instantly.
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
                  backgroundColor: msg.role === 'user' ? 'var(--sys-color-primary-90)' : 'var(--sys-color-neutral-90)',
                  color: msg.role === 'user' ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-50)',
                }}>
                  {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
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
                        <div style={{ paddingTop: 'var(--sys-spacing-sm)' }}>
                          <button
                            className="button button-filled"
                            onClick={handleGenerate}
                            disabled={selectedPlatforms.length === 0}
                            style={{ minWidth: 160 }}
                          >
                            Generate Content
                          </button>
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
