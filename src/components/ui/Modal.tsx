import React, { useEffect } from 'react'
import { cn } from '@utils/cn'
import { Button } from './Button'
import { X } from 'lucide-react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  actions?: Array<{
    label: string
    variant?: 'primary' | 'secondary' | 'ghost'
    onClick: () => void
    disabled?: boolean
  }>
  children?: React.ReactNode
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  actions = [],
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose()
  }

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[95vw] h-[95vh]"
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "relative w-full bg-white rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-200",
          sizes[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {showCloseButton && (
          <button 
            className="absolute right-4 top-4 rounded-full p-1.5 text-text-muted hover:bg-surface-secondary hover:text-ink-950 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
        
        {(title || subtitle) && (
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            {title && <h2 id="modal-title" className="text-xl font-semibold leading-none tracking-tight text-ink-950">{title}</h2>}
            {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
          </div>
        )}
        
        <div className={cn("p-6", (title || subtitle) && "pt-0", size === 'full' && "flex-1 overflow-y-auto")}>
          {children}
        </div>
        
        {actions.length > 0 && (
          <div className="flex items-center justify-end space-x-2 p-6 pt-4 border-t border-divider bg-surface-secondary/50">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'secondary'}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

