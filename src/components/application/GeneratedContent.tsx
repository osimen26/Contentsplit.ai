import React, { useState, useEffect, useRef } from 'react'
import { Card, Skeleton, Toast } from '@components/ui'
import { Copy, Check, RefreshCw } from 'lucide-react'

interface Platform {
  id: string
  name: string
  icon?: React.ReactNode
  characterLimit?: number
}

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="url(#ig-gradient)">
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

const EmailIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const getPlatformIcon = (platformId: string): React.ReactNode => {
  switch (platformId) {
    case 'twitter': return <TwitterIcon />
    case 'linkedin': return <LinkedInIcon />
    case 'instagram': return <InstagramIcon />
    case 'email': return <EmailIcon />
    default: return <EmailIcon />
  }
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

  const activePlatform = platforms.find(p => p.id === activeTab)
  const displayText = isEditing ? editedContent : streamedText
  const characterCount = displayText.length
  const characterLimit = activePlatform?.characterLimit || 280
  const isOverLimit = characterCount > characterLimit
  const isCopied = copiedId === activeTab
  const currentIcon = platform.icon || getPlatformIcon(activeTab)

  return (
    <Card variant="elevated" className={`generated-content claude-style ${className}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sys-spacing-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sys-spacing-sm)' }}>
          <span style={{ color: 'var(--sys-color-neutral-60)' }}>{currentIcon}</span>
          <h4 style={{ margin: 0, fontSize: 'var(--sys-typography-title-large-font-size)', fontWeight: 600, color: 'var(--sys-color-neutral-20)' }}>{activePlatform?.name || title}</h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sys-spacing-sm)' }}>
          {onRegenerate && !isLoading && (
            <button
              onClick={onRegenerate}
              disabled={isStreaming}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '6px 10px',
                borderRadius: 'var(--sys-radius-md)',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--sys-color-neutral-50)',
                fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <RefreshCw size={12} /> Regenerate
            </button>
          )}
          <button
            onClick={() => handleCopy(activeTab, isEditing ? editedContent : streamedText)}
            disabled={isStreaming}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 14px',
              borderRadius: 'var(--sys-radius-md)',
              border: 'none',
              backgroundColor: isCopied ? 'var(--sys-color-roles-success-color-role-success-role)' : 'var(--sys-color-roles-primary-color-role-primary-role)',
              color: isCopied ? 'var(--sys-color-roles-success-color-role-on-success-role)' : 'var(--sys-color-roles-primary-color-role-on-primary-role)',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isCopied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>
      </div>

      {platforms.length > 1 && (
        <div style={{ display: 'flex', gap: 'var(--sys-spacing-xs)', marginBottom: 'var(--sys-spacing-lg)', borderBottom: '1px solid var(--sys-color-neutral-95)', paddingBottom: 'var(--sys-spacing-xs)' }}>
          {platforms.map(platform => {
            const icon = platform.icon || getPlatformIcon(platform.id)
            return (
              <button
                key={platform.id}
                onClick={() => { onTabChange(platform.id); setIsEditing(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '6px 12px',
                  borderRadius: 'var(--sys-radius-md)',
                  border: 'none',
                  backgroundColor: activeTab === platform.id ? 'var(--sys-color-primary-95)' : 'transparent',
                  color: activeTab === platform.id ? 'var(--sys-color-primary-50)' : 'var(--sys-color-neutral-60)',
                  fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {icon}
                <span>{platform.name}</span>
              </button>
            )
          })}
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: 'var(--sys-spacing-md)', display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-sm)' }}>
          {[40, 24, 32, 28].map((w, i) => (
            <Skeleton key={i} variant="text" height={16} width={`${w}%`} animation="pulse" />
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--sys-color-neutral-98)',
          border: '1px solid var(--sys-color-neutral-90)',
          borderRadius: 'var(--sys-radius-lg)',
          padding: 'var(--sys-spacing-lg)',
          minHeight: '80px',
        }}>
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                padding: 0,
                fontFamily: 'var(--sys-typography-body-medium-font-family)',
                fontSize: 'var(--sys-typography-body-medium-font-size)',
                lineHeight: 1.6,
                resize: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: 'var(--sys-color-neutral-30)',
              }}
            />
          ) : (
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--sys-typography-body-medium-font-family)',
                fontSize: 'var(--sys-typography-body-medium-font-size)',
                lineHeight: 1.6,
                color: 'var(--sys-color-neutral-30)',
                whiteSpace: 'pre-wrap',
              }}
              onClick={() => setIsEditing(true)}
            >
              {displayText}
              {isStreaming && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  backgroundColor: 'var(--sys-color-primary-50)',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 0.7s step-end infinite',
                }} />
              )}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--sys-spacing-sm)' }}>
        <span style={{
          fontSize: '0.75rem',
          color: isOverLimit ? 'var(--sys-color-error-50)' : 'var(--sys-color-neutral-50)',
        }}>
          {characterCount} / {characterLimit}
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {isCopied && (
        <Toast
          message={`${activePlatform?.name || 'Content'} copied to clipboard!`}
          type="success"
          position="bottom-center"
        />
      )}
    </Card>
  )
}
