import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'fab'
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing'
  iconOnly?: boolean
  disabled?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  icon,
  iconPosition = 'leading',
  iconOnly = false,
  disabled = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'button'
  const variantClass = variant === 'fab' ? 'button-fab' : `button-${variant}`
  const sizeClass = variant === 'fab' ? `button-fab-${size}` : `button-${size}`
  const disabledClass = disabled ? 'button-disabled' : ''
  const iconOnlyClass = iconOnly ? 'button-icon-only' : ''
  const fullWidthClass = fullWidth ? 'layout-full-width' : ''

  const iconElement = icon ? (
    <span
      className={`button__icon ${iconPosition === 'leading' ? 'button__icon-leading' : 'button__icon-trailing'}`}
    >
      {icon}
    </span>
  ) : null

  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    iconOnlyClass,
    fullWidthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'fab') {
    return (
      <button
        className={combinedClasses}
        disabled={disabled}
        aria-label={iconOnly && typeof children === 'string' ? children : undefined}
        {...props}
      >
        {iconElement || children}
      </button>
    )
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {iconPosition === 'leading' && iconElement}
      {children}
      {iconPosition === 'trailing' && iconElement}
    </button>
  )
}
