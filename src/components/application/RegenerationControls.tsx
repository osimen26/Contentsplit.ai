import React from 'react'
import { RefreshCw, Wand2, Scissors, Heart, Sparkles } from 'lucide-react'

export interface RegenerationOption {
  id: string
  label: string
  icon?: React.ReactNode
  description?: string
  selected?: boolean
  disabled?: boolean
}

export interface RegenerationControlsProps {
  title?: string
  subtitle?: string
  options?: RegenerationOption[]
  selectedOptionId?: string
  onOptionSelect?: (optionId: string) => void
  onRegenerate?: () => void
  remainingUses?: number
  isLoading?: boolean
  regenerateDisabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_OPTIONS: RegenerationOption[] = [
  { id: 'improve', label: 'Improve', icon: <Wand2 size={16} /> },
  { id: 'shorter', label: 'Shorter', icon: <Scissors size={16} /> },
  { id: 'emotion', label: 'Add emotion', icon: <Heart size={16} /> },
]

export const RegenerationControls: React.FC<RegenerationControlsProps> = ({
  title = 'Regenerate',
  options = DEFAULT_OPTIONS,
  selectedOptionId,
  onOptionSelect,
  onRegenerate,
  remainingUses = 15,
  isLoading = false,
  regenerateDisabled = false,
  className = '',
  style,
}) => {
  const handleOptionClick = (optionId: string) => {
    if (onOptionSelect) onOptionSelect(optionId)
  }

  const handleRegenerate = () => {
    if (onRegenerate && !isLoading && !regenerateDisabled) {
      onRegenerate()
    }
  }

  return (
    <div className={className} style={style}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--sys-spacing-md)',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <h4 style={{
          margin: 0,
          fontSize: 'var(--sys-typography-title-small-font-size)',
          fontWeight: 600,
          color: 'var(--sys-color-neutral-20)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Sparkles size={16} style={{ color: 'var(--sys-color-primary-50)' }} />
          {title}
        </h4>
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--sys-color-neutral-50)',
          backgroundColor: 'var(--sys-color-neutral-92)',
          padding: '4px 10px',
          borderRadius: '12px',
          whiteSpace: 'nowrap',
        }}>
          {remainingUses} left
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: 'var(--sys-spacing-md)',
        flexWrap: 'wrap',
      }}>
        {options.map((option) => {
          const isSelected = selectedOptionId ? option.id === selectedOptionId : option.selected
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={option.disabled || isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '20px',
                border: '1.5px solid',
                borderColor: isSelected 
                  ? 'var(--sys-color-primary-50)' 
                  : 'var(--sys-color-border-tertiary)',
                backgroundColor: isSelected 
                  ? 'var(--sys-color-primary-95)' 
                  : 'transparent',
                color: isSelected 
                  ? 'var(--sys-color-primary-50)' 
                  : 'var(--sys-color-neutral-60)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                minHeight: 40,
                whiteSpace: 'nowrap',
              }}
            >
              {option.icon}
              {option.label}
            </button>
          )
        })}
      </div>

      <button
        onClick={handleRegenerate}
        disabled={isLoading || regenerateDisabled}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px 20px',
          borderRadius: 'var(--sys-radius-md)',
          border: 'none',
          backgroundColor: regenerateDisabled 
            ? 'var(--sys-color-neutral-85)' 
            : 'var(--sys-color-primary)',
          color: '#fff',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: regenerateDisabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          minHeight: 48,
          letterSpacing: '0.01em',
          boxShadow: regenerateDisabled 
            ? 'none' 
            : '0 4px 12px rgba(99, 102, 241, 0.3)',
        }}
        onMouseEnter={e => {
          if (!regenerateDisabled && !isLoading) {
            e.currentTarget.style.backgroundColor = 'var(--sys-color-primary-30)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={e => {
          if (!regenerateDisabled) {
            e.currentTarget.style.backgroundColor = 'var(--sys-color-primary)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
        {isLoading ? 'Regenerating...' : 'Regenerate'}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}