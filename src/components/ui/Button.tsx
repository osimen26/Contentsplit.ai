import React from 'react'
import { cn } from '@utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing'
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'leading',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    primary: "bg-primary text-white border border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5",
    secondary: "bg-white text-ink-950 border border-border shadow-sm hover:bg-surface-secondary",
    ghost: "bg-transparent text-ink-800 hover:bg-surface-secondary"
  }

  const sizes = {
    small: "h-8 px-3 text-sm rounded-md gap-1.5",
    medium: "h-10 px-4 text-base rounded-lg gap-2",
    large: "h-12 px-6 text-lg rounded-xl gap-2.5"
  }

  const iconElement = icon ? (
    <span className={cn(
      "shrink-0",
      size === 'small' && "w-4 h-4",
      size === 'medium' && "w-5 h-5",
      size === 'large' && "w-6 h-6"
    )}>
      {icon}
    </span>
  ) : null

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {iconPosition === 'leading' && iconElement}
      {children}
      {iconPosition === 'trailing' && iconElement}
    </button>
  )
})

Button.displayName = 'Button'

