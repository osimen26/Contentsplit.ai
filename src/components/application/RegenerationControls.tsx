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
          padding: '4px 8px',
          borderRadius: '12px',
        }}>
          {remainingUses} left
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sys-spacing-sm)',
        marginBottom: 'var(--sys-spacing-md)',
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
                padding: '8px 14px',
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
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
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
          padding: '12px 20px',
          borderRadius: 'var(--sys-radius-md)',
          border: 'none',
          backgroundColor: regenerateDisabled 
            ? 'var(--sys-color-neutral-85)' 
            : '#2563eb',
          color: '#fff',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: regenerateDisabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
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