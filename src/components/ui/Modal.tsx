import React, { useEffect } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  variant?: 'alert' | 'simple' | 'fullscreen' | 'bottom-sheet' | 'side-sheet'
  size?: 'small' | 'medium' | 'large' | 'auto'
  title?: string
  subtitle?: string
  actions?: Array<{
    label: string
    variant?: 'primary' | 'secondary' | 'destructive'
    onClick: () => void
    disabled?: boolean
  }>
  children?: React.ReactNode
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  className?: string
  aiConfirmation?: boolean
  contentGeneration?: boolean
  aiSettings?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  variant = 'alert',
  size = 'medium',
  title,
  subtitle,
  actions = [],
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  aiConfirmation = false,
  contentGeneration = false,
  aiSettings = false,
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

  const baseClass = 'modal-container'
  const variantClass = `modal-${variant}`
  const sizeClass = size !== 'auto' ? `modal-${size}` : ''
  const aiClass = aiConfirmation ? 'modal-ai-confirmation' : ''
  const contentGenerationClass = contentGeneration ? 'modal-content-generation' : ''
  const aiSettingsClass = aiSettings ? 'modal-ai-settings' : ''

  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    aiClass,
    contentGenerationClass,
    aiSettingsClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const renderTitle = () => {
    if (!title) return null
    if (variant === 'simple') {
      return <h2 className="modal-simple-title">{title}</h2>
    }
    if (variant === 'fullscreen') {
      return (
        <div className="modal-fullscreen-header">
          {showCloseButton && (
            <button className="modal-close-button" onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
          <h2 className="modal-fullscreen-title">{title}</h2>
        </div>
      )
    }
    if (variant === 'side-sheet') {
      return (
        <div className="modal-side-sheet-header">
          {showCloseButton && (
            <button className="modal-close-button" onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
          <h2 className="modal-side-sheet-title">{title}</h2>
        </div>
      )
    }
    if (variant === 'bottom-sheet') {
      return (
        <>
          <div className="modal-bottom-sheet-handle" />
          {title && <h2 className="modal-bottom-sheet-title">{title}</h2>}
        </>
      )
    }
    // alert default
    return <h2 className="modal-alert-title">{title}</h2>
  }

  const renderContent = () => {
    if (variant === 'simple') {
      return <ul className="modal-simple-list">{children}</ul>
    }
    if (variant === 'fullscreen') {
      return <div className="modal-fullscreen-content">{children}</div>
    }
    if (variant === 'side-sheet') {
      return <div className="modal-side-sheet-content">{children}</div>
    }
    if (variant === 'bottom-sheet') {
      return <div className="modal-bottom-sheet-content">{children}</div>
    }
    // alert default
    return <div className="modal-alert-content">{children}</div>
  }

  const renderActions = () => {
    if (actions.length === 0) return null

    if (variant === 'fullscreen') {
      return (
        <div className="modal-fullscreen-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`modal-action-${action.variant || 'secondary'}`}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </button>
          ))}
        </div>
      )
    }

    if (variant === 'side-sheet' || variant === 'bottom-sheet') {
      return (
        <div className="modal-side-sheet-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`modal-action-${action.variant || 'secondary'}`}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </button>
          ))}
        </div>
      )
    }

    // alert default
    return (
      <div className="modal-alert-actions">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`modal-action-${action.variant || 'secondary'}`}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} aria-hidden={!isOpen}>
      <div
        className={combinedClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {renderTitle()}
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}
        {renderContent()}
        {renderActions()}
        {showCloseButton && variant !== 'fullscreen' && variant !== 'side-sheet' && (
          <button className="modal-close-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
