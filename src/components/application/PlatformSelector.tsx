import React from 'react'

export interface Platform {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  characterLimit?: number
  disabled?: boolean
  color?: string
}

export interface PlatformSelectorProps {
  platforms: Platform[]
  selected: string[]
  onChange: (selectedIds: string[]) => void
  variant?: 'grid' | 'chip'
  layout?: 'compact' | 'expanded' | 'default'
  title?: string
  subtitle?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  loading?: boolean
  maxSelection?: number
  className?: string
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platforms,
  selected,
  onChange,
  variant = 'grid',
  layout = 'default',
  title = 'Select Platforms',
  subtitle,
  required = false,
  error = false,
  errorMessage,
  loading = false,
  maxSelection,
  className = '',
}) => {
  const handlePlatformClick = (platformId: string) => {
    if (loading) return
    const platform = platforms.find((p) => p.id === platformId)
    if (platform?.disabled) return

    let newSelected
    if (selected.includes(platformId)) {
      newSelected = selected.filter((id) => id !== platformId)
    } else {
      if (maxSelection && selected.length >= maxSelection) {
        // Optionally notify user about max selection
        return
      }
      newSelected = [...selected, platformId]
    }
    onChange(newSelected)
  }

  const containerClass = `platform-selector ${error ? 'platform-selector-error' : ''} ${loading ? 'platform-selector-loading' : ''} ${className}`
  const gridClass = `platform-grid ${layout === 'compact' ? 'platform-grid-compact' : layout === 'expanded' ? 'platform-grid-expanded' : ''}`

  return (
    <div className={containerClass} data-testid="platform-selector-container">
      <div className="platform-selector-header">
        <div>
          <h3 className="platform-selector-title">{title}</h3>
          {subtitle && <p className="platform-selector-subtitle">{subtitle}</p>}
        </div>
        {required && <span className="platform-selector-required">Required</span>}
      </div>

      {variant === 'grid' ? (
        <div className={gridClass}>
          {platforms.map((platform) => {
            const isSelected = selected.includes(platform.id)
            const platformCardClass = `platform-card ${isSelected ? 'selected' : ''} ${platform.disabled ? 'disabled' : ''}`
            return (
              <div
                key={platform.id}
                className={platformCardClass}
                onClick={() => handlePlatformClick(platform.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-disabled={platform.disabled || loading}
              >
                <div className="platform-card-selected-indicator">✓</div>
                <div
                  className={`platform-icon ${platform.color ? `platform-icon-${platform.id}` : ''}`}
                >
                  {platform.icon}
                </div>
                <div className="platform-name">{platform.name}</div>
                {platform.description && (
                  <div className="platform-description">{platform.description}</div>
                )}
                {platform.characterLimit && (
                  <div className="platform-limits">{platform.characterLimit} characters</div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="platform-chip-group">
          {platforms.map((platform) => {
            const isSelected = selected.includes(platform.id)
            const chipClass = `platform-chip ${isSelected ? 'selected' : ''} ${platform.disabled ? 'disabled' : ''}`
            return (
              <div
                key={platform.id}
                className={chipClass}
                onClick={() => handlePlatformClick(platform.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-disabled={platform.disabled || loading}
              >
                {platform.icon && <span className="platform-chip-icon">{platform.icon}</span>}
                <span>{platform.name}</span>
              </div>
            )
          })}
        </div>
      )}

      {error && errorMessage && (
        <div className="platform-selector-error-message">{errorMessage}</div>
      )}
    </div>
  )
}
