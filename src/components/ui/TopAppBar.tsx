import React from 'react'

export interface TopAppBarProps {
  title?: string
  leadingIcon?: React.ReactNode
  onLeadingIconClick?: () => void
  actions?: Array<{
    icon: React.ReactNode
    onClick: () => void
    label: string
    active?: boolean
  }>
  variant?: 'fixed' | 'static' | 'prominent'
  children?: React.ReactNode
  className?: string
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  leadingIcon,
  onLeadingIconClick,
  actions = [],
  variant = 'fixed',
  children,
  className = '',
}) => {
  const variantClass = variant === 'prominent' ? 'top-app-bar-prominent' : ''
  const fixedClass = variant === 'fixed' ? 'top-app-bar-fixed' : ''
  const staticClass = variant === 'static' ? 'top-app-bar-static' : ''

  return (
    <header className={`top-app-bar ${variantClass} ${fixedClass} ${staticClass} ${className}`}>
      <div className="top-app-bar-content">
        {leadingIcon && (
          <button
            className="top-app-bar-icon"
            onClick={onLeadingIconClick}
            aria-label="Navigation menu"
          >
            {leadingIcon}
          </button>
        )}
        {title && <h1 className="top-app-bar-title">{title}</h1>}
        {children}
        {actions.length > 0 && (
          <div className="top-app-bar-actions">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`top-app-bar-icon ${action.active ? 'active' : ''}`}
                onClick={action.onClick}
                aria-label={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
