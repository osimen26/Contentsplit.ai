import React from 'react'

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'filled' | 'outlined' | 'rounded' | 'sharp'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'disabled'
    | 'on-primary'
    | 'on-secondary'
    | 'on-surface'
    | 'on-neutral'
  interactive?: boolean
  decorative?: boolean
  className?: string
  children: React.ReactNode
}

export const Icon: React.FC<IconProps> = ({
  variant = 'filled',
  size = 'md',
  color,
  interactive = false,
  decorative = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'icon'
  const variantClass = `icon-${variant}`
  const sizeClass = `icon-${size}`
  const colorClass = color ? `icon-${color}` : ''
  const interactiveClass = interactive ? 'icon-interactive' : ''
  const decorativeClass = decorative ? 'icon-decorative' : ''

  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    colorClass,
    interactiveClass,
    decorativeClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const ariaHidden = decorative ? { 'aria-hidden': true } : {}

  return (
    <span className={combinedClasses} {...ariaHidden} {...props}>
      {children}
    </span>
  )
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'rounded' | 'sharp'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'disabled'
    | 'on-primary'
    | 'on-secondary'
    | 'on-surface'
    | 'on-neutral'
  selected?: boolean
  className?: string
  children: React.ReactNode
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'filled',
  size = 'md',
  color,
  selected = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'icon-button'
  const selectedClass = selected ? 'selected' : ''
  const combinedClasses = [baseClass, selectedClass, className].filter(Boolean).join(' ')

  return (
    <button className={combinedClasses} {...props}>
      <Icon variant={variant} size={size} color={color}>
        {children}
      </Icon>
    </button>
  )
}

export interface IconToggleProps extends IconButtonProps {
  toggled?: boolean
}

export const IconToggle: React.FC<IconToggleProps> = ({
  toggled = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'icon-toggle'
  const toggledClass = toggled ? 'selected' : ''
  const combinedClasses = [baseClass, toggledClass, className].filter(Boolean).join(' ')

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}

export interface IconWithTextProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  text: React.ReactNode
  position?: 'left' | 'right'
  gap?: string
  className?: string
}

export const IconWithText: React.FC<IconWithTextProps> = ({
  icon,
  text,
  position = 'left',
  gap,
  className = '',
  ...props
}) => {
  const style = gap ? { gap } : undefined
  const combinedClasses = ['icon-with-text', className].filter(Boolean).join(' ')

  return (
    <div className={combinedClasses} style={style} {...props}>
      {position === 'left' && icon}
      {text}
      {position === 'right' && icon}
    </div>
  )
}
