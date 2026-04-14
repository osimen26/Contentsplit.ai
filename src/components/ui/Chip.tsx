import React from 'react'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'input'
    | 'choice'
    | 'filter'
    | 'action'
    | 'assist'
    | 'ai-suggestion'
    | 'category'
    | 'model'
    | 'tone'
    | 'language'
    | 'template'
    | 'suggestion'
  selected?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  avatar?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  badge?: React.ReactNode
  loading?: boolean
  className?: string
  children: React.ReactNode
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'input',
  selected = false,
  disabled = false,
  icon,
  avatar,
  removable = false,
  onRemove,
  badge,
  loading = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'chip'
  const variantClass = `chip-${variant}`
  const selectedClass = selected ? 'selected' : ''
  const disabledClass = disabled ? 'disabled' : ''
  const loadingClass = loading ? 'loading' : ''

  const combinedClasses = [
    baseClass,
    variantClass,
    selectedClass,
    disabledClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconElement = icon ? <span className="chip-icon">{icon}</span> : null

  const avatarElement = avatar ? <div className="chip-input-avatar">{avatar}</div> : null

  const badgeElement = badge ? <div className="chip-assist-badge">{badge}</div> : null

  const removeButton = removable ? (
    <button
      className="chip-input-remove"
      aria-label="Remove"
      onClick={(e) => {
        e.stopPropagation()
        onRemove?.()
      }}
      type="button"
    >
      ×
    </button>
  ) : null

  const labelElement = <span className="chip-label">{children}</span>

  return (
    <div className={combinedClasses} {...props}>
      {avatarElement}
      {iconElement}
      {labelElement}
      {removeButton}
      {badgeElement}
    </div>
  )
}

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'choice' | 'filter' | 'scrollable'
  label?: string
  description?: string
  singleSelect?: boolean
  className?: string
  children: React.ReactNode
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  variant,
  label,
  description,
  singleSelect = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'chip-group'
  const variantClass = variant ? `chip-group-${variant}` : ''
  const combinedClasses = [baseClass, variantClass, className].filter(Boolean).join(' ')

  return (
    <div className={combinedClasses} data-single-select={singleSelect} {...props}>
      {label && <span className="chip-group-label">{label}</span>}
      {children}
      {description && <span className="chip-group-description">{description}</span>}
    </div>
  )
}
