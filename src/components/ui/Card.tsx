import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'filled' | 'outlined'
  layout?: 'default' | 'media' | 'text-only' | 'actions' | 'dashboard'
  selected?: boolean
  disabled?: boolean
  interactive?: boolean
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  layout = 'default',
  selected = false,
  disabled = false,
  interactive = false,
  children,
  className = '',
  ...props
}) => {
  const baseClass = `card-${variant}`
  const layoutClass = layout !== 'default' ? `card-${layout}` : ''
  const selectedClass = selected ? 'selected' : ''
  const disabledClass = disabled ? 'disabled' : ''
  const interactiveClass = interactive ? 'layout-interactive' : ''

  const combinedClasses = [
    baseClass,
    layoutClass,
    selectedClass,
    disabledClass,
    interactiveClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const role = interactive ? 'button' : undefined
  const tabIndex = interactive ? 0 : undefined

  return (
    <div className={combinedClasses} role={role} tabIndex={tabIndex} {...props}>
      {children}
    </div>
  )
}

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string
  imageAlt?: string
  children?: React.ReactNode
}

export const CardMedia: React.FC<CardMediaProps> = ({
  imageUrl,
  imageAlt,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-media ${className}`} {...props}>
      {imageUrl && <img src={imageUrl} alt={imageAlt || ''} className="card-media-image" />}
      <div className="card-media-content">{children}</div>
    </div>
  )
}

export interface CardHeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

export const CardHeadline: React.FC<CardHeadlineProps> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`card-headline ${className}`} {...props}>
    {children}
  </h3>
)

export interface CardSubheadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

export const CardSubhead: React.FC<CardSubheadProps> = ({ children, className = '', ...props }) => (
  <p className={`card-subhead ${className}`} {...props}>
    {children}
  </p>
)

export interface CardSupportingTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

export const CardSupportingText: React.FC<CardSupportingTextProps> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`card-supporting-text ${className}`} {...props}>
    {children}
  </p>
)

export interface CardMetadataProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardMetadata: React.FC<CardMetadataProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`card-metadata ${className}`} {...props}>
    {children}
  </div>
)

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  alignment?: 'start' | 'end' | 'between'
  children?: React.ReactNode
}

export const CardActions: React.FC<CardActionsProps> = ({
  alignment = 'end',
  children,
  className = '',
  ...props
}) => {
  const alignmentClass = `layout-justify-${alignment}`
  return (
    <div className={`card-actions ${alignmentClass} ${className}`} {...props}>
      {children}
    </div>
  )
}

export interface CardActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
  icon?: React.ReactNode
  children?: React.ReactNode
}

export const CardAction: React.FC<CardActionProps> = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}) => {
  const variantClass = `card-action-${variant}`
  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {icon && <span className="card-action-icon-wrapper">{icon}</span>}
      {children}
    </button>
  )
}
