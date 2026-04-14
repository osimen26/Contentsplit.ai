import React, { useEffect, useState } from 'react'

export interface ToastProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'ai-processing' | 'ai-success' | 'ai-error'
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number // milliseconds, 0 = persistent
  onClose?: () => void
  position?: 'bottom-center' | 'top-center' | 'bottom-start' | 'bottom-end'
  stacked?: boolean
  icon?: React.ReactNode
  showProgress?: boolean
  className?: string
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  action,
  duration = 5000,
  onClose,
  position = 'bottom-center',
  stacked = false,
  icon,
  showProgress = false,
  className = '',
}) => {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) onClose()
      }, duration)

      const progressInterval = showProgress
        ? setInterval(() => {
            setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0))
          }, 100)
        : undefined

      return () => {
        clearTimeout(timer)
        if (progressInterval) clearInterval(progressInterval)
      }
    }
  }, [duration, onClose, showProgress])

  if (!visible) return null

  const positionClass = `toast-container-${position.replace('-', '-')}`
  const typeClass = `toast-${type}`
  const stackedClass = stacked ? 'toast-stacked' : ''
  const progressBar = showProgress ? (
    <div className="toast-progress-bar" style={{ width: `${progress}%` }} />
  ) : null

  const defaultIcons: Record<string, React.ReactNode> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    'ai-processing': '🤖',
    'ai-success': '🎉',
    'ai-error': '🚨',
  }

  const toastIcon = icon || defaultIcons[type]

  return (
    <div className={`toast-container ${positionClass}`}>
      <div className={`toast ${typeClass} ${stackedClass} ${className}`}>
        {toastIcon && <span className="toast-icon">{toastIcon}</span>}
        <p className="toast-message">{message}</p>
        {action && (
          <button className="toast-action-button" onClick={action.onClick}>
            {action.label}
          </button>
        )}
        {progressBar}
      </div>
    </div>
  )
}
