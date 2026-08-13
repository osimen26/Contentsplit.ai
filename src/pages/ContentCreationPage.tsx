import React, { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { ChatInput, ChatLoadingBubble, LimitReachedBubble, LimitReachedBanner, UpgradeModal } from '@components/application'
import { useGenerateContent, useRegenerateContent, useOutputs, useCurrentUser, useUsageStats } from '@services/query-hooks'
import { RefreshCw, Copy, CheckCircle2, CheckCheck, Send } from 'lucide-react'
import type { Output } from '@services/api-client'
import '@/styles/dashboard.css'

const PublishPanel = lazy(() => import('@/components/social/PublishPanel'))


// --- Types & Constants ---
type MessageType = 'text' | 'loading' | 'result' | 'error' | 'limit_reached' | 'preferences'
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  type: MessageType
  text?: string
}

const PLATFORMS = [
  { id: 'twitter',    label: 'X',          bg: '#000000', icon: '#000000', src: '/images/platforms/twitterbig.png' },
  { id: 'instagram',  label: 'Instagram',  bg: '#E1306C', icon: '#E1306C', src: '/images/platforms/Instagrambig.png' },
  { id: 'linkedin',   label: 'LinkedIn',   bg: '#0077B5', icon: '#0077B5', src: '/images/platforms/LinkedIn-big.png' },
  { id: 'email',      label: 'Newsletter', bg: '#FF6B35', icon: '#FF6B35', src: '/images/platforms/emailbg.png' },
  { id: 'facebook',   label: 'Facebook',   bg: '#1877F2', icon: '#1877F2', src: '/images/platforms/Facebookbig.png' },
  { id: 'threads',    label: 'Threads',    bg: '#000000', icon: '#000000', src: '/images/platforms/threadsbig.png' },
]

const TONES = ['Professional', 'Casual', 'Punchy', 'Friendly']

// --- Styles ---
const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

// --- Components ---
const PlatformIcon: React.FC<{ id: string; size?: number }> = ({ id, size = 15 }) => {
  const s: React.CSSProperties = { width: size, height: size, display: 'block', flexShrink: 0, objectFit: 'contain' }
  const p = PLATFORMS.find(p => p.id === id)
  if (p && p.src) return <img src={p.src} style={s} alt={p.label} />
  return null
}

const AIResponseCard: React.FC<{ output: Output, onRegenerate: () => void, isRegenerating: boolean }> = ({ output, onRegenerate, isRegenerating }) => {
  const platform = PLATFORMS.find(p => p.id === output.platform)
  const [showPublishPanel, setShowPublishPanel] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(output.content)
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/logo.svg" alt="C" style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <div style={{ ...dm(13, 600, { color: '#0F172A' }) }}>Contentsplit</div>
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
        {output.content}
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAFA' }}>
        <span style={{ ...dm(12, 400, { color: '#94A3B8' }) }}>{output.content.length} chars</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={onRegenerate}
            disabled={isRegenerating}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '5px 10px', cursor: isRegenerating ? 'not-allowed' : 'pointer', ...dm(12, 500, { color: '#64748B' }), opacity: isRegenerating ? 0.5 : 1 }}
          >
            <RefreshCw size={11} className={isRegenerating ? 'spin' : ''} /> {isRegenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
          <button
              onClick={handleCopy}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', ...dm(12, 500, { color: '#64748B' }) }}
            >
              <Copy size={11} /> Copy
            </button>
            {/* Publish button */}
            {(['twitter', 'linkedin', 'instagram', 'email', 'facebook', 'threads'].includes(output.platform)) && (
              <button
                onClick={() => setShowPublishPanel(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0F172A', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', ...dm(12, 600, { color: '#FFFFFF' }) }}
                title={output.platform === 'email' ? 'Send Newsletter' : `Publish directly to ${output.platform}`}
              >
                <Send size={11} /> Publish
              </button>
            )}
        </div>
      </div>

      {/* Publish Panel modal */}
      {showPublishPanel && (
        <Suspense fallback={null}>
          <PublishPanel
            outputId={output.id}
            initialContent={output.content}
            platform={output.platform as 'twitter' | 'linkedin' | 'instagram' | 'email'}
            onClose={() => setShowPublishPanel(false)}
          />
        </Suspense>
      )}
    </div>
  )
}


const ResultGrid = ({ conversionId }: { conversionId: string }) => {
  const { data: outputs, isLoading } = useOutputs(conversionId)
  const regenerateMutation = useRegenerateContent()

  const getOutputsArray = (data: unknown): Output[] => {
    if (Array.isArray(data)) return data as Output[]
    if (data && typeof data === 'object' && 'data' in data) {
      const record = data as Record<string, unknown>
      if (Array.isArray(record.data)) return record.data as Output[]
    }
    return []
  }

  const outputsArray = getOutputsArray(outputs)

  if (isLoading) return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: outputsArray.length > 1 ? 'repeat(auto-fit, minmax(340px, 1fr))' : 'minmax(0, 600px)', gap: '16px', width: '100%' }}>
      {outputsArray.map(out => (
        <AIResponseCard 
          key={out.platform} 
          output={out} 
          onRegenerate={() => regenerateMutation.mutate({ conversion_id: conversionId, platform: out.platform as any })}
          isRegenerating={regenerateMutation.isPending && regenerateMutation.variables?.platform === out.platform}
        />
      ))}
    </div>
  )
}

const PreferencesBubble: React.FC<{
  onGenerate: (platforms: string[], tone: string) => void
  isGenerating: boolean
}> = ({ onGenerate, isGenerating }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter'])
  const [selectedTone, setSelectedTone] = useState<string>('Casual')

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  return (
    <div style={{ maxWidth: '700px', width: '100%', animation: 'fadeIn 0.3s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', width: '100%' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src="/logo.svg" alt="AI" style={{ width: '22px', height: '22px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '32px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%', maxWidth: '600px' }}>
              {PLATFORMS.map(p => {
                const isSelected = selectedPlatforms.includes(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        padding: '12px 10px', borderRadius: '12px', cursor: 'pointer',
                        background: '#FFFFFF',
                        border: isSelected ? `2px solid ${p.bg}` : '1.5px solid #E2E8F0',
                        boxShadow: isSelected && p.id === 'twitter' ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${p.bg}` : 'none',
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

            {selectedPlatforms.length > 0 && (
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.3s ease-out', width: '100%' }}>
                <h3 style={{ ...syne(20, 600, { color: '#0F172A', letterSpacing: '-0.01em', margin: 0, marginBottom: '16px' }) }}>
                  What tone should we use?
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '500px' }}>
                  {TONES.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTone(t)}
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
                
                <button
                  onClick={() => onGenerate(selectedPlatforms, selectedTone)}
                  disabled={isGenerating}
                  style={{
                    marginTop: '32px',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    opacity: isGenerating ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', gap: '8px',
                    ...dm(15, 600)
                  }}
                >
                  {isGenerating ? <><RefreshCw size={18} className="spin" /> Generating...</> : 'Generate Content'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ContentCreationPage: React.FC = () => {
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  
  const [currentConversionId, setCurrentConversionId] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const [isBatchMode, setIsBatchMode] = useState(false)
  const [batchItems, setBatchItems] = useState<string[]>([])
  const [isBatchGenerating] = useState(false)
  
  const { data: user } = useCurrentUser()
  const { data: usageStats } = useUsageStats()
  const isFreeTier = user?.tier === 'free' || !user?.tier
  const dailyUsage = usageStats?.daily_usage || 0
  const dailyLimit = usageStats?.daily_limit || 1
  const limitReached = isFreeTier && dailyUsage >= dailyLimit
  
  const generateMutation = useGenerateContent()
  const { isLoading: outputsLoading } = useOutputs(currentConversionId || '')
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    if (outputsLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, outputsLoading])

  const handleNewChat = () => {
    setMessages([])
    setInputText('')
    setCurrentConversionId(null)
  }

  const handleGenerate = async (selectedPlatforms: string[], selectedTone: string) => {
    // Find the last user message text
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user' && m.type === 'text')
    const textToProcess = lastUserMessage?.text

    if (!textToProcess || selectedPlatforms.length === 0) return

    if (dailyUsage >= dailyLimit) {
      setShowUpgradeModal(true)
      const limitId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
      setMessages(prev => [...prev.filter(m => m.type !== 'preferences'), { id: limitId, role: 'assistant', type: 'limit_reached' }])
      return
    }

    const loadingId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    setMessages(prev => [...prev.filter(m => m.type !== 'preferences'), { id: loadingId, role: 'assistant', type: 'loading' }])
    
    generateMutation.mutate(
      {
        input_text: textToProcess,
        tone_mode: selectedTone.toLowerCase() as any,
        platforms: selectedPlatforms as any,
      },
      {
        onSuccess: (data) => {
          setCurrentConversionId(data.conversion.id)
          const resultId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
          setMessages(prev => [
            ...prev.filter(m => m.type !== 'loading'),
            { id: resultId, role: 'assistant', type: 'result', text: data.conversion.id }
          ])
        },
        onError: (err: any) => {
          const errorMsg = err?.response?.data?.error || err?.message || 'Failed to generate content'
          if (err?.response?.data?.limit_reached) {
            setShowUpgradeModal(true)
            const limitId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
            setMessages(prev => [
              ...prev.filter(m => m.type !== 'loading'),
              { id: limitId, role: 'assistant', type: 'limit_reached' }
            ])
          } else {
            const errorId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
            setMessages(prev => [
              ...prev.filter(m => m.type !== 'loading'),
              { id: errorId, role: 'assistant', type: 'error', text: errorMsg }
            ])
          }
        },
      }
    )
  }

  const handleInputSubmit = () => {
    if (!inputText.trim()) return
    
    if (isBatchMode) {
      setBatchItems(prev => [...prev, inputText])
      setInputText('')
      return
    }

    const userId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    const prefId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    
    setMessages(prev => [
      ...prev, 
      { id: userId, role: 'user', type: 'text', text: inputText },
      { id: prefId, role: 'assistant', type: 'preferences' }
    ])
    
    setInputText('')
  }
  
  const handleGenerateBatch = async () => {
    // Note: Batch mode is simplified for this demo to just show a preference bubble too. 
    // Usually it would ask for preferences first as well.
    if (batchItems.length === 0) return
    
    const userId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    const prefId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    
    setMessages(prev => [
      ...prev,
      { id: userId, role: 'user', type: 'text', text: `BATCH QUEUE (${batchItems.length} items):\n\n${batchItems.map((item, i) => `${i+1}. ${item.substring(0, 50)}...`).join('\n')}` },
      { id: prefId, role: 'assistant', type: 'preferences' }
    ])
    
    setBatchItems([])
    setIsBatchMode(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative' }}>
      
      {/* ── ZONE 1: Empty State / Welcome Screen ── */}
      {!hasMessages && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <h2 style={{ ...syne(32, 600, { color: '#0F172A', letterSpacing: '-0.02em', margin: 0, marginBottom: '12px' }) }}>
            Ready to repurpose
          </h2>
          <p style={{ ...dm(16, 400, { color: '#64748B', textAlign: 'center', margin: 0, marginBottom: '40px', maxWidth: '420px', lineHeight: 1.5 }) }}>
            Paste your long-form content below to effortlessly adapt it for any platform.
          </p>
        </div>
      )}

      {/* ── ZONE 2: AI Chat / Processing Stream ── */}
      {hasMessages && (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', paddingBottom: '16px' }}>
          <div style={{ flex: 1, overflowY: 'auto', paddingTop: '20px', paddingBottom: '16px', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  
                  {msg.type === 'text' && (
                    <div style={{
                      maxWidth: '72%', background: '#F1F5F9', borderRadius: '16px 16px 4px 16px',
                      padding: '12px 16px', ...dm(14, 400, { color: '#1E293B', lineHeight: 1.6 }),
                      whiteSpace: 'pre-wrap',
                    }}>
                      {msg.text}
                    </div>
                  )}

                  {msg.type === 'preferences' && (
                    <PreferencesBubble 
                      onGenerate={handleGenerate} 
                      isGenerating={generateMutation.isPending} 
                    />
                  )}

                  {msg.type === 'loading' && <ChatLoadingBubble />}

                  {msg.type === 'error' && (
                    <div style={{
                      padding: '20px', borderRadius: '16px', backgroundColor: '#fee2e2',
                      border: '1px solid #fecaca', color: '#b91c1c', boxShadow: '0 4px 12px rgba(185, 28, 28, 0.05)',
                      width: '100%', maxWidth: '600px'
                    }}>
                      <p style={{ fontWeight: 600, marginBottom: 8, fontSize: '1rem' }}>Generation failed</p>
                      <p style={{ fontSize: '0.95rem' }}>{msg.text}</p>
                    </div>
                  )}

                  {msg.type === 'limit_reached' && (
                    <div style={{ maxWidth: '600px', width: '100%' }}>
                      <LimitReachedBubble
                        dailyUsage={dailyUsage}
                        dailyLimit={dailyLimit}
                        onUpgrade={() => setShowUpgradeModal(true)}
                        isFreeTier={isFreeTier}
                      />
                    </div>
                  )}

                  {msg.type === 'result' && (
                    <ResultGrid conversionId={msg.text || currentConversionId || ''} />
                  )}

                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* ── Input Area ── */}
      <div style={{ padding: '0 24px 24px', flexShrink: 0 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {limitReached && (
            <LimitReachedBanner
              dailyUsage={dailyUsage} dailyLimit={dailyLimit} isFreeTier={isFreeTier}
              onUpgrade={() => setShowUpgradeModal(true)} onNewChat={handleNewChat}
            />
          )}
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleInputSubmit}
            placeholder={isBatchMode ? "Paste an article here, then add to queue..." : "Paste your content here..."}
            isBatchMode={isBatchMode}
            onToggleBatchMode={setIsBatchMode}
            batchItems={batchItems}
            onRemoveBatchItem={(idx) => setBatchItems(prev => prev.filter((_, i) => i !== idx))}
            onGenerateBatch={handleGenerateBatch}
            disabled={isBatchGenerating || generateMutation.isPending}
          />
          <div style={{ textAlign: 'center', marginTop: '12px', ...dm(11, 400, { color: '#94A3B8' }) }}>
            Contentsplit can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={() => setShowUpgradeModal(false)}
        dailyUsage={dailyUsage}
        dailyLimit={dailyLimit}
        isFreeTier={isFreeTier}
      />
    </div>
  )
}
export default ContentCreationPage
