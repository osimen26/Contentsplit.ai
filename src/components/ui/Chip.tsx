import React from 'react'
import { cn } from '@utils/cn'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  selected?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  avatar?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(({
  variant = 'secondary',
  selected = false,
  disabled = false,
  icon,
  avatar,
  removable = false,
  onRemove,
  className,
  children,
  ...props
}, ref) => {
  const variants = {
    primary: "bg-primary text-white border-transparent",
    secondary: "bg-surface-secondary text-ink-800 border-transparent",
    outline: "bg-transparent text-ink-800 border-border",
    ghost: "bg-transparent text-ink-800 border-transparent hover:bg-surface-secondary"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-colors",
        variants[variant],
        selected && "bg-ink-950 text-white border-ink-950",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {avatar && <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 -ml-1">{avatar}</div>}
      {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span className="truncate">{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          className="ml-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </div>
  )
})
Chip.displayName = "Chip"

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  description?: string
}

export const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(({
  label,
  description,
  className,
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {label && <span className="text-sm font-medium text-ink-950">{label}</span>}
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
      {description && <span className="text-xs text-text-secondary">{description}</span>}
    </div>
  )
})
ChipGroup.displayName = "ChipGroup"

