import React, { useRef, useEffect, useState } from 'react'
import { Plus, ArrowUp, Zap, X, Sparkles } from 'lucide-react'

export interface ChatInputProps {
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  
  // Batch Mode props
  isBatchMode?: boolean
  onToggleBatchMode?: (mode: boolean) => void
  batchItems?: string[]
  onRemoveBatchItem?: (index: number) => void
  onGenerateBatch?: () => void
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask anything',
  disabled = false,
  className = '',
  isBatchMode = false,
  onToggleBatchMode,
  batchItems = [],
  onRemoveBatchItem,
  onGenerateBatch,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const hasContent = value.trim().length > 0

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (hasContent && !disabled) {
        onSubmit()
      }
    }
  }

  return (
    <div className={`chat-input-container ${className}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      
      {/* Batch Mode Header / Toggle */}
      {onToggleBatchMode && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sys-color-neutral-30)' }}>
              {isBatchMode ? 'Batch Mode Enabled' : 'Single Post Mode'}
            </span>
            <button
              onClick={() => onToggleBatchMode(!isBatchMode)}
              style={{
                background: isBatchMode ? 'var(--sys-color-primary-95)' : 'transparent',
                border: `1px solid ${isBatchMode ? 'var(--sys-color-primary-80)' : 'var(--sys-color-neutral-80)'}`,
                color: isBatchMode ? 'var(--sys-color-primary)' : 'var(--sys-color-neutral-50)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              <Zap size={12} fill={isBatchMode ? "currentColor" : "none"} />
              {isBatchMode ? 'Switch to Single' : 'Enable Batch Mode'}
            </button>
          </div>
        </div>
      )}

      {/* Batch Queue UI */}
      {isBatchMode && batchItems.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '8px',
          background: 'var(--sys-color-neutral-98)',
          border: '1px solid var(--sys-color-neutral-90)',
          borderRadius: '12px',
          marginBottom: '4px'
        }}>
          {batchItems.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              border: '1px solid var(--sys-color-neutral-80)',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: 'var(--sys-color-neutral-20)',
              maxWidth: '200px'
            }}>
              <FileIcon size={14} color="var(--sys-color-primary)" />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                {item.substring(0, 30)}...
              </span>
              <button 
                onClick={() => onRemoveBatchItem && onRemoveBatchItem(idx)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: 'var(--sys-color-neutral-50)' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          <button
            onClick={onGenerateBatch}
            disabled={disabled}
            style={{
              marginLeft: 'auto',
              background: 'var(--sys-color-primary)',
              color: 'white',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: disabled ? 0.7 : 1,
              boxShadow: '0 2px 8px rgba(17, 24, 39, 0.25)'
            }}
          >
            <Sparkles size={14} /> Generate Batch ({batchItems.length})
          </button>
        </div>
      )}

      {/* Main Input Wrapper */}
      <div
        className="chat-input-pill-wrapper"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          padding: '10px 14px',
        }}
      >
        {/* Plus / Attach button */}
        <button
          type="button"
          aria-label="Attach file"
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: `1.5px solid ${isFocused ? 'var(--sys-color-primary-60)' : 'var(--sys-color-neutral-70)'}`,
            color: isFocused ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)',
            cursor: 'pointer',
            transition: 'background-color 0.15s',
            minWidth: 36,
            minHeight: 36,
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--sys-color-neutral-90)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isBatchMode ? "Paste an article here, then add to queue..." : placeholder}
          disabled={disabled}
          rows={1}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            resize: 'none',
            padding: '6px 0',
            maxHeight: '120px',
            overflowY: 'auto',
            outline: 'none',
            fontFamily: 'var(--sys-typography-body-large-font-family)',
            fontSize: '1rem',
            lineHeight: 1.5,
            color: 'var(--sys-color-neutral-10)',
          }}
        />

        {/* Send / Add button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!hasContent || disabled}
          aria-label={isBatchMode ? "Add to Batch" : "Send message"}
          title={isBatchMode ? "Add to Batch" : "Send"}
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: hasContent
              ? 'var(--sys-color-primary)'
              : isFocused
                ? 'var(--sys-color-primary-80)'
                : 'var(--sys-color-neutral-70)',
            border: 'none',
            color: 'white',
            cursor: hasContent ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s, transform 0.1s',
            transform: hasContent ? 'scale(1)' : 'scale(0.92)',
            minWidth: 36,
            minHeight: 36,
          }}
          onMouseEnter={e => {
            if (hasContent) e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-30)'
          }}
          onMouseLeave={e => {
            if (hasContent) e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-40)'
          }}
        >
          {isBatchMode ? <Plus size={18} strokeWidth={2.5} /> : <ArrowUp size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  )
}

const FileIcon = ({ size = 18, color = "currentColor" }: { size?: number, color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
)
