import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, X, Send, AlertCircle, CheckCircle2, Loader2, Link, Image as ImageIcon, Mail } from 'lucide-react'
import { useSocialAccounts, useConnectTwitter, useConnectLinkedIn, useConnectInstagram, usePublishToTwitter, usePublishToLinkedIn, usePublishToInstagram, useUploadMedia, usePublishToNewsletter } from '@/services/social-hooks'
import { useSubscribers } from '@/services/query-hooks'

const CHAR_LIMITS = { twitter: 280, linkedin: 3000, instagram: 2200, email: 100000 } as const
type Platform = keyof typeof CHAR_LIMITS

const XIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.264 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

const LinkedInIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const PLATFORM_CONFIG = {
  twitter: { label: 'X (Twitter)', Icon: XIcon, badgeColor: '#0F172A', urlField: false },
  linkedin: { label: 'LinkedIn',   Icon: LinkedInIcon, badgeColor: '#0A66C2', urlField: true  },
  instagram: { label: 'Instagram', Icon: InstagramIcon, badgeColor: '#E1306C', urlField: false },
  email: { label: 'Newsletter', Icon: Mail, badgeColor: '#10B981', urlField: false },
} as const

interface PublishPanelProps {
  outputId: string
  initialContent: string
  platform: Platform
  onClose: () => void
}

type PanelState = 'idle' | 'publishing' | 'success' | 'error'

const PublishPanel: React.FC<PublishPanelProps> = ({ outputId, initialContent, platform, onClose }) => {
  const MAX_CHARS = CHAR_LIMITS[platform]
  const config = PLATFORM_CONFIG[platform]
  const [content, setContent] = useState(initialContent)
  const [articleUrl, setArticleUrl] = useState('')
  const [panelState, setPanelState] = useState<PanelState>('idle')
  const [postUrl, setPostUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: accounts } = useSocialAccounts()
  const connectTwitter = useConnectTwitter()
  const connectLinkedIn = useConnectLinkedIn()
  const connectInstagram = useConnectInstagram()
  const publishTwitter = usePublishToTwitter()
  const publishLinkedIn = usePublishToLinkedIn()
  const publishInstagram = usePublishToInstagram()
  const publishNewsletter = usePublishToNewsletter()
  const uploadMedia = useUploadMedia()
  const { data: subscribers } = useSubscribers()

  const account = platform === 'email' ? { platform_username: `${subscribers?.length || 0} Subscribers` } : accounts?.find(a => a.platform === platform) ?? null
  const connectMutation = platform === 'twitter' ? connectTwitter : platform === 'linkedin' ? connectLinkedIn : connectInstagram
  const charsLeft = MAX_CHARS - content.length
  const isOverLimit = charsLeft < 0
  
  // Instagram MUST have media
  const hasRequiredMedia = platform === 'instagram' ? !!mediaUrl : true
  // Newsletter MUST have subscribers
  const hasSubscribers = platform === 'email' ? (subscribers && subscribers.length > 0) : true
  
  const canPost = !isOverLimit && content.trim().length > 0 && !!account && hasRequiredMedia && hasSubscribers

  useEffect(() => { textareaRef.current?.focus() }, [])

  const handlePublish = () => {
    if (!canPost || panelState === 'publishing') return
    setPanelState('publishing')
    setErrorMsg(null)

    const onSuccess = (url: string | null) => {
      setPanelState('success')
      setPostUrl(url)
    }
    const onError = (err: any) => {
      setPanelState('error')
      setErrorMsg(err?.response?.data?.error || err?.message || 'Failed to publish. Please try again.')
    }

    if (platform === 'twitter') {
      const finalContent = mediaUrl ? `${content}\n\n${mediaUrl}` : content
      publishTwitter.mutate({ outputId, content: finalContent }, { onSuccess: (d) => onSuccess(d.tweet_url), onError })
    } else if (platform === 'linkedin') {
      const finalContent = mediaUrl ? `${content}\n\n${mediaUrl}` : content
      publishLinkedIn.mutate(
        { outputId, content: finalContent, url: articleUrl.trim() || undefined },
        { onSuccess: (d) => onSuccess(d.post_url), onError }
      )
    } else if (platform === 'instagram') {
      publishInstagram.mutate(
        { outputId, content, mediaUrl: mediaUrl! },
        { onSuccess: (d) => onSuccess(d.post_url), onError }
      )
    } else if (platform === 'email') {
      publishNewsletter.mutate(
        { outputId, content: mediaUrl ? `${content}\n\n${mediaUrl}` : content },
        { onSuccess: () => onSuccess(null), onError }
      )
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const res = await uploadMedia.mutateAsync(file)
      setMediaUrl(res.url)
    } catch (err) {
      setErrorMsg('Failed to upload media. Please try again.')
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={panelStyle} role="dialog" aria-modal="true" aria-label="Publish to X">

        {/* Header */}
        <div style={headerStyle}>
          <div style={headerLeftStyle}>
            <div style={{ ...xBadgeStyle, backgroundColor: config.badgeColor }}>
              <config.Icon size={14} color="#fff" />
            </div>
            <span style={headerTitleStyle}>Publish to {config.label}</span>
          </div>
          <button onClick={onClose} style={closeBtnStyle} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Content editor */}
        <div style={editorWrapStyle}>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={e => {
              setContent(e.target.value)
              if (panelState === 'error') { setPanelState('idle'); setErrorMsg(null) }
            }}
            disabled={panelState === 'publishing' || panelState === 'success'}
            rows={6}
            placeholder="Write your tweet…"
            style={{
              ...textareaStyle,
              borderColor: isOverLimit ? '#ef4444' : panelState === 'error' ? '#ef4444' : 'rgba(0,0,0,0.1)',
            }}
          />
          {/* Char counter */}
          <div style={charRowStyle}>
            <span style={{ ...charCountStyle, color: isOverLimit ? '#ef4444' : charsLeft <= 20 ? '#f59e0b' : '#94A3B8' }}>
              {charsLeft} characters remaining
            </span>
          </div>

          {/* Media Upload */}
          <div style={mediaUploadWrapStyle}>
            <input type="file" accept="image/*,video/*" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
            {mediaUrl ? (
              <div style={mediaPreviewStyle}>
                <ImageIcon size={14} color="#10b981" />
                <span style={mediaPreviewTextStyle}>Media attached</span>
                <button onClick={() => setMediaUrl(null)} style={mediaClearBtnStyle} aria-label="Remove media"><X size={12} /></button>
              </div>
            ) : (
              <button 
                onClick={() => fileInputRef.current?.click()} 
                style={mediaUploadBtnStyle}
                disabled={uploadMedia.isPending || panelState === 'publishing' || panelState === 'success'}
              >
                {uploadMedia.isPending ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <ImageIcon size={14} />}
                {uploadMedia.isPending ? 'Uploading...' : platform === 'instagram' ? 'Attach Media (Required)' : 'Attach Media'}
              </button>
            )}
          </div>
        </div>

        {/* Account row */}
        <div style={accountRowStyle}>
          {account ? (
            <div style={connectedAccountStyle}>
              <div style={greenDotStyle} />
              <config.Icon size={13} color="#0F172A" />
              <span style={accountHandleStyle}>
                {platform === 'email' ? account.platform_username : account.platform_username}
              </span>
            </div>
          ) : (
            <div style={connectPromptStyle}>
              <AlertCircle size={13} color="#f59e0b" />
              <span style={connectPromptTextStyle}>
                {platform === 'email' 
                  ? 'No subscribers. Go to Settings to add some.'
                  : `No ${config.label} account connected.`}
              </span>
              {platform !== 'email' && (
                <button
                  onClick={() => connectMutation.mutate()}
                  disabled={connectMutation.isPending}
                  style={inlineConnectBtnStyle}
                >
                  {connectMutation.isPending ? 'Redirecting…' : 'Connect now →'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* LinkedIn-only: optional article URL field */}
        {config.urlField && (
          <div style={{ padding: '0 20px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8 }}>
              <Link size={13} color="#94A3B8" style={{ flexShrink: 0 }} />
              <input
                type="url"
                value={articleUrl}
                onChange={e => setArticleUrl(e.target.value)}
                placeholder="Optional: paste an article URL to share"
                disabled={panelState === 'publishing' || panelState === 'success'}
                style={urlInputStyle}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {panelState === 'error' && errorMsg && (
          <div style={errorBoxStyle}>
            <AlertCircle size={14} color="#ef4444" style={{ flexShrink: 0 }} />
            <span style={errorTextStyle}>{errorMsg}</span>
          </div>
        )}

        {/* Success state */}
        {panelState === 'success' && (
          <div style={successBoxStyle}>
            <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} />
            <span style={successTextStyle}>Posted successfully!</span>
            {postUrl && (
              <a href={postUrl} target="_blank" rel="noopener noreferrer" style={viewTweetLinkStyle}>
                View post <ExternalLink size={11} />
              </a>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div style={footerStyle}>
          <button onClick={onClose} style={cancelBtnStyle}>
            {panelState === 'success' ? 'Done' : 'Cancel'}
          </button>
          {panelState !== 'success' && (
            <button
              onClick={handlePublish}
              disabled={!canPost || panelState === 'publishing'}
              style={{
                ...postBtnStyle,
                opacity: (!canPost || panelState === 'publishing') ? 0.5 : 1,
                cursor: (!canPost || panelState === 'publishing') ? 'not-allowed' : 'pointer',
              }}
            >
              {panelState === 'publishing' ? (
                <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Posting…</>
              ) : (
                <><Send size={13} /> Post Now</>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 16,
  backdropFilter: 'blur(2px)',
}

const panelStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  width: '100%',
  maxWidth: 480,
  boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  animation: 'fadeIn 0.2s ease-out',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
}

const headerLeftStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}

const xBadgeStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 7,
  backgroundColor: '#0F172A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const headerTitleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#0F172A',
  fontFamily: '"DM Sans", sans-serif',
}

const closeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#94A3B8',
  display: 'flex',
  alignItems: 'center',
  padding: 4,
  borderRadius: 6,
}

const editorWrapStyle: React.CSSProperties = {
  padding: '16px 20px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: 10,
  resize: 'vertical',
  fontSize: '0.9rem',
  fontFamily: '"DM Sans", sans-serif',
  color: '#1E293B',
  lineHeight: 1.6,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
  minHeight: 120,
}

const charRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
}

const charCountStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontFamily: '"DM Sans", sans-serif',
  transition: 'color 0.15s',
}

const mediaUploadWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 4,
}

const mediaUploadBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px dashed rgba(0,0,0,0.2)',
  backgroundColor: '#F8FAFC',
  color: '#64748B',
  fontSize: '0.8rem',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: '"DM Sans", sans-serif',
}

const mediaPreviewStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 12px',
  borderRadius: 6,
  backgroundColor: 'rgba(16,185,129,0.1)',
  border: '1px solid rgba(16,185,129,0.2)',
}

const mediaPreviewTextStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#065f46',
  fontWeight: 500,
  fontFamily: '"DM Sans", sans-serif',
}

const mediaClearBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 2,
  cursor: 'pointer',
  color: '#065f46',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 4,
}

const accountRowStyle: React.CSSProperties = {
  padding: '8px 20px 12px',
}

const connectedAccountStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '5px 10px',
  backgroundColor: '#F8FAFC',
  borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.06)',
}

const greenDotStyle: React.CSSProperties = {
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: '#10b981',
}

const accountHandleStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#0F172A',
  fontFamily: '"DM Sans", sans-serif',
}

const connectPromptStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
}

const connectPromptTextStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: '#64748B',
  fontFamily: '"DM Sans", sans-serif',
}

const inlineConnectBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--sys-color-primary-40, #0F172A)',
  fontSize: '0.82rem',
  fontWeight: 600,
  fontFamily: '"DM Sans", sans-serif',
  padding: 0,
  textDecoration: 'underline',
}

const errorBoxStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  margin: '0 20px 12px',
  padding: '10px 14px',
  backgroundColor: 'rgba(239,68,68,0.06)',
  border: '1px solid rgba(239,68,68,0.2)',
  borderRadius: 8,
}

const errorTextStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: '#b91c1c',
  fontFamily: '"DM Sans", sans-serif',
  lineHeight: 1.5,
}

const successBoxStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  margin: '0 20px 12px',
  padding: '10px 14px',
  backgroundColor: 'rgba(16,185,129,0.06)',
  border: '1px solid rgba(16,185,129,0.2)',
  borderRadius: 8,
}

const successTextStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: '#065f46',
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 500,
}

const viewTweetLinkStyle: React.CSSProperties = {
  marginLeft: 'auto',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  fontSize: '0.8rem',
  color: 'var(--sys-color-primary-40, #0F172A)',
  fontWeight: 600,
  textDecoration: 'none',
  fontFamily: '"DM Sans", sans-serif',
}

const footerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
  padding: '12px 20px 16px',
  borderTop: '1px solid rgba(0,0,0,0.06)',
}

const cancelBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.1)',
  backgroundColor: 'transparent',
  color: '#64748B',
  fontSize: '0.875rem',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: '"DM Sans", sans-serif',
}

const postBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 18px',
  borderRadius: 8,
  border: 'none',
  backgroundColor: '#0F172A',
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 600,
  fontFamily: '"DM Sans", sans-serif',
  transition: 'opacity 0.15s',
}

export default PublishPanel
