import React, { useRef, useEffect, useState } from 'react'
import { Plus, ArrowUp } from 'lucide-react'

export interface ChatInputProps {
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask anything',
  disabled = false,
  className = '',
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
    <div
      className={`chat-input-container chat-input-pill-wrapper ${className}`}
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
        placeholder={placeholder}
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

      {/* Send button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!hasContent || disabled}
        aria-label="Send message"
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
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
