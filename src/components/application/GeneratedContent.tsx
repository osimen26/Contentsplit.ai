import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@components/ui'
import {
  X, Briefcase, Camera, Mail, Users, Music, Video, FileText, Smartphone,
  Copy, Check, RefreshCw, Pencil, CheckSquare
} from 'lucide-react'

interface Platform {
  id: string
  name: string
  icon?: React.ReactNode
  characterLimit?: number
}

export interface GeneratedContentProps {
  platforms: Platform[]
  activeTab: string
  onTabChange: (platformId: string) => void
  content: string
  isLoading?: boolean
  onRegenerate?: () => void
  title?: string
  subtitle?: string
  className?: string
}

export const GeneratedContent: React.FC<GeneratedContentProps> = ({
  platforms,
  activeTab,
  onTabChange,
  content,
  isLoading = false,
  onRegenerate,
  title = 'Generated Content',
  subtitle,
  className = '',
}) => {
  // --- Copy state ---
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // --- Edit state ---
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // --- Streaming simulation state ---
  const [streamedText, setStreamedText] = useState(content) // initialise with full content to avoid test flash
  const [isStreaming, setIsStreaming] = useState(false)
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const firstRender = useRef(true)

  // When content prop changes after mount, stream it in character by character
  useEffect(() => {
    if (isLoading) return

    // On first render just show content immediately (no animation), keeps tests reliable
    if (firstRender.current) {
      firstRender.current = false
      setStreamedText(content)
      setEditedContent(content)
      setIsEditing(false)
      return
    }

    // Start streaming animation
    setStreamedText('')
    setIsStreaming(true)
    let i = 0
    if (streamRef.current) clearInterval(streamRef.current)

    streamRef.current = setInterval(() => {
      i += 3 // reveal 3 chars at a time for speed
      setStreamedText(content.slice(0, i))
      if (i >= content.length) {
        clearInterval(streamRef.current!)
        setStreamedText(content)
        setIsStreaming(false)
      }
    }, 12) // ~12ms per tick feels smooth

    return () => { if (streamRef.current) clearInterval(streamRef.current) }
  }, [content, isLoading])

  // Auto-resize edit textarea
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [isEditing, editedContent])

  const handleCopy = async (platformId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(platformId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { /* silent fail */ }
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
  }

  const getDefaultPlatformIcon = (platformId: string): React.ReactNode => {
    const s = { width: 18, height: 18, color: 'var(--sys-color-neutral-60)' }
    switch (platformId) {
      case 'twitter':   return <X style={s} />
      case 'linkedin':  return <Briefcase style={s} />
      case 'instagram': return <Camera style={s} />
      case 'email':     return <Mail style={s} />
      case 'facebook':  return <Users style={s} />
      case 'tiktok':    return <Music style={s} />
      case 'youtube':   return <Video style={s} />
      case 'blog':      return <FileText style={s} />
      default:          return <Smartphone style={s} />
    }
  }

  const activePlatform = platforms.find(p => p.id === activeTab)
  const displayText = isEditing ? editedContent : streamedText
  const characterCount = displayText.length
  const characterLimit = activePlatform?.characterLimit || 280
  const isOverLimit = characterCount > characterLimit
  const isCopied = copiedId === activeTab

  return (
    <Card variant="elevated" className={`generated-content ${className}`}>
      {/* Header */}
      <div className="generated-content-header">
        <div>
          <h4 className="generated-content-title">{title}</h4>
          {subtitle && <p className="generated-content-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* Platform Tabs */}
      {platforms.length > 0 && (
        <div className="generated-content-tabs">
          {platforms.map(platform => {
            const icon = platform.icon || getDefaultPlatformIcon(platform.id)
            return (
              <button
                key={platform.id}
                className={`generated-content-tab ${activeTab === platform.id ? 'selected' : ''}`}
                onClick={() => { onTabChange(platform.id); setIsEditing(false) }}
              >
                <span className="generated-content-tab-icon">{icon}</span>
                {platform.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Content Panel */}
      <div className="generated-content-panel selected">
        {isLoading ? (
          <div style={{ padding: 'var(--sys-spacing-lg)', color: 'var(--sys-color-neutral-50)' }}>
            Loading…
          </div>
        ) : (
          <div className="generated-content-display">

            {/* Text or Edit Textarea */}
            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={editedContent}
                onChange={e => setEditedContent(e.target.value)}
                style={{
                  width: '100%',
                  border: '1.5px solid var(--sys-color-primary-80)',
                  borderRadius: 'var(--sys-radius-md)',
                  padding: 'var(--sys-spacing-md)',
                  fontFamily: 'var(--sys-typography-body-large-font-family)',
                  fontSize: 'var(--sys-typography-body-large-font-size)',
                  lineHeight: '1.6',
                  resize: 'none',
                  outline: 'none',
                  backgroundColor: 'var(--sys-color-neutral-99)',
                  color: 'var(--sys-color-neutral-10)',
                  overflow: 'hidden',
                }}
              />
            ) : (
              <p
                className="generated-content-text"
                style={{ cursor: 'text', minHeight: '60px' }}
              >
                {displayText}
                {/* Blinking cursor while streaming */}
                {isStreaming && (
                  <span style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    backgroundColor: 'var(--sys-color-primary-40)',
                    marginLeft: '2px',
                    verticalAlign: 'text-bottom',
                    animation: 'blink-cursor 0.7s step-end infinite'
                  }} />
                )}
                <style>{`
                  @keyframes blink-cursor {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}</style>
              </p>
            )}

            {/* Footer: char count + actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--sys-spacing-md)', flexWrap: 'wrap', gap: 'var(--sys-spacing-sm)' }}>
              <div
                className="generated-content-character-count"
                style={{ color: isOverLimit ? 'var(--sys-color-error-50)' : undefined }}
              >
                {characterCount}/{characterLimit}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                {/* Edit / Save button */}
                <button
                  onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
                  aria-label={isEditing ? 'Save edit' : 'Edit content'}
                  title={isEditing ? 'Save' : 'Edit'}
                  disabled={isStreaming}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '5px 10px',
                    borderRadius: 'var(--sys-radius-md)',
                    border: '1px solid var(--sys-color-border-tertiary)',
                    backgroundColor: isEditing ? 'var(--sys-color-primary-95)' : 'transparent',
                    color: isEditing ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)',
                    fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {isEditing ? <><CheckSquare size={13} /> Save</> : <><Pencil size={13} /> Edit</>}
                </button>

                {/* Regenerate button */}
                {onRegenerate && (
                  <button
                    onClick={onRegenerate}
                    aria-label="Regenerate content"
                    title="Regenerate"
                    disabled={isStreaming}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '5px 10px',
                      borderRadius: 'var(--sys-radius-md)',
                      border: '1px solid var(--sys-color-border-tertiary)',
                      backgroundColor: 'transparent',
                      color: 'var(--sys-color-neutral-40)',
                      fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sys-color-neutral-95)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <RefreshCw size={13} /> Regenerate
                  </button>
                )}

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(activeTab, isEditing ? editedContent : streamedText)}
                  aria-label={`Copy ${activePlatform?.name || activeTab} content`}
                  title="Copy to clipboard"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '5px 10px',
                    borderRadius: 'var(--sys-radius-md)',
                    border: '1px solid var(--sys-color-border-tertiary)',
                    backgroundColor: isCopied ? 'var(--sys-color-success-95)' : 'transparent',
                    color: isCopied ? 'var(--sys-color-success-30)' : 'var(--sys-color-neutral-40)',
                    fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!isCopied) e.currentTarget.style.backgroundColor = 'var(--sys-color-neutral-95)' }}
                  onMouseLeave={e => { if (!isCopied) e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  {isCopied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
