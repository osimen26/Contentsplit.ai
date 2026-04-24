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
  const isMultiLine = value.includes('\n')

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
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
        gap: '12px',
        padding: '12px 16px',
      }}
    >
      {/* Plus / Attach button */}
      <button
        type="button"
        aria-label="Attach file"
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          border: `1.5px solid ${isFocused ? 'var(--sys-color-primary-60)' : 'var(--sys-color-neutral-70)'}`,
          color: isFocused ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)',
          cursor: 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--sys-color-neutral-90)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Plus size={16} strokeWidth={2.5} />
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
          padding: '4px 0',
          maxHeight: '180px',
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
          width: 34,
          height: 34,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: hasContent
            ? 'var(--sys-color-primary-40)'
            : isFocused
              ? 'var(--sys-color-primary-80)'
              : 'var(--sys-color-neutral-70)',
          border: 'none',
          color: 'white',
          cursor: hasContent ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.2s, transform 0.1s',
          transform: hasContent ? 'scale(1)' : 'scale(0.92)',
        }}
        onMouseEnter={e => {
          if (hasContent) e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-30)'
        }}
        onMouseLeave={e => {
          if (hasContent) e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-40)'
        }}
      >
        <ArrowUp size={17} strokeWidth={2.5} />
      </button>
    </div>
  )
}
