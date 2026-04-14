import React from 'react'

export interface Tone {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  color?: 'formal' | 'casual' | 'professional' | 'creative' | 'persuasive' | 'friendly'
  previewText?: string
}

export interface ToneSelectorProps {
  tones: Tone[]
  selected: string[]
  onChange: (selectedIds: string[]) => void
  variant?: 'default' | 'compact' | 'expanded' | 'scrollable'
  selectionMode?: 'single' | 'multiple'
  title?: string
  subtitle?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  showPreview?: boolean
  className?: string
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  tones,
  selected,
  onChange,
  variant = 'default',
  selectionMode = 'multiple',
  title = 'Select Tone',
  subtitle,
  required = false,
  error = false,
  errorMessage,
  disabled = false,
  showPreview = false,
  className = '',
}) => {
  const handleToneClick = (toneId: string) => {
    if (disabled) return

    let newSelected
    if (selectionMode === 'single') {
      newSelected = selected.includes(toneId) ? [] : [toneId]
    } else {
      if (selected.includes(toneId)) {
        newSelected = selected.filter((id) => id !== toneId)
      } else {
        newSelected = [...selected, toneId]
      }
    }
    onChange(newSelected)
  }

  const containerClass = `tone-selector ${variant !== 'default' ? `tone-selector-${variant}` : ''} ${error ? 'tone-selector-error' : ''} ${disabled ? 'tone-selector-disabled' : ''} ${className}`
  const chipGroupClass = `tone-chip-group ${selectionMode === 'single' ? 'tone-chip-group-single-select' : ''}`

  const selectedTone = tones.find((t) => t.id === selected[0])

  return (
    <div className={containerClass} data-testid="tone-selector-container">
      <div className="tone-selector-header">
        <div>
          <h3 className="tone-selector-title">{title}</h3>
          {subtitle && <p className="tone-selector-subtitle">{subtitle}</p>}
        </div>
        {required && <span className="tone-selector-required">Required</span>}
      </div>

      <div className={chipGroupClass}>
        {tones.map((tone) => {
          const isSelected = selected.includes(tone.id)
          const toneColorClass = tone.color ? `tone-chip-${tone.color}` : ''
          const chipClass = `tone-chip ${toneColorClass} ${isSelected ? 'selected' : ''} ${tone.icon ? 'tone-chip-with-icon' : ''}`

          return (
            <div
              key={tone.id}
              className={chipClass}
              onClick={() => handleToneClick(tone.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-disabled={disabled}
            >
              {tone.icon && <span className="tone-chip-icon">{tone.icon}</span>}
              <span className="tone-chip-label">{tone.label}</span>
            </div>
          )
        })}
      </div>

      {error && errorMessage && <div className="tone-selector-error-message">{errorMessage}</div>}

      {showPreview && selectedTone?.previewText && (
        <div className="tone-preview">
          <div className="tone-preview-title">Preview: {selectedTone.label}</div>
          <p>{selectedTone.previewText}</p>
        </div>
      )}
    </div>
  )
}
