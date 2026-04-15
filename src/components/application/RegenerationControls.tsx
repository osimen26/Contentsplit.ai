import React from 'react'
import { Button } from '@components/ui'
import { Target, Ruler, Palette } from 'lucide-react'

export interface RegenerationOption {
  id: string
  label: string
  icon: React.ReactNode
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

export const RegenerationControls: React.FC<RegenerationControlsProps> = ({
  title = 'Regeneration Options',
  subtitle = 'Choose how to improve your content',
  options = [
    {
      id: 'clarity',
      label: 'Improve Clarity',
      icon: <Target className="regeneration-option-icon" width={20} height={20} />,
      selected: false,
      disabled: false,
      description: undefined,
    },
    {
      id: 'shorter',
      label: 'Make Shorter',
      icon: <Ruler className="regeneration-option-icon" width={20} height={20} />,
      selected: true,
      disabled: false,
      description: undefined,
    },
    {
      id: 'emotion',
      label: 'Add Emotion',
      icon: <Palette className="regeneration-option-icon" width={20} height={20} />,
      selected: false,
      disabled: false,
      description: undefined,
    },
  ],
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
    if (onRegenerate) onRegenerate()
  }

  return (
    <div className={`regeneration-controls ${className}`} style={style}>
      <div className="regeneration-controls-header">
        <div>
          <h3 className="regeneration-controls-title">{title}</h3>
          {subtitle && <p className="regeneration-controls-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="regeneration-primary">
        <Button
          variant="filled"
          className="regenerate-button"
          onClick={handleRegenerate}
          disabled={isLoading || regenerateDisabled}
        >
          {isLoading ? 'Regenerating...' : 'Regenerate Content'}
        </Button>
        <div className="regeneration-count">{remainingUses} uses left today</div>
      </div>

      {options.length > 0 && (
        <div className="regeneration-options">
          {options.map((option) => {
            const isSelected = selectedOptionId ? option.id === selectedOptionId : option.selected
            const optionClass = `regeneration-option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`
            return (
              <div
                key={option.id}
                className={optionClass}
                onClick={() => !option.disabled && handleOptionClick(option.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-disabled={option.disabled}
              >
                <div className="regeneration-option-icon">{option.icon}</div>
                <div className="regeneration-option-label">{option.label}</div>
                {option.description && (
                  <div className="regeneration-option-description">{option.description}</div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
