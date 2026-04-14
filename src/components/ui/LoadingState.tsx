import React from 'react'

export interface CircularProgressProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  determinate?: boolean
  progress?: number // 0-100 for determinate
  className?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 'md',
  color = 'primary',
  determinate = false,
  progress = 0,
  className = '',
}) => {
  const sizeClass = `progress-circular-${size}`
  const colorClass = color !== 'primary' ? `progress-circular-${color}` : ''
  const determinateClass = determinate ? 'progress-circular-determinate' : ''

  const strokeDasharray = determinate ? `${progress * 2}, 200` : '80, 200'

  return (
    <div
      className={['progress-circular', sizeClass, colorClass, determinateClass, className]
        .filter(Boolean)
        .join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={determinate ? progress : undefined}
    >
      <svg className="progress-circular-svg" viewBox="0 0 50 50">
        <circle className="progress-circular-track" cx="25" cy="25" r="20" />
        <circle
          className="progress-circular-indicator"
          cx="25"
          cy="25"
          r="20"
          style={determinate ? { strokeDasharray } : undefined}
        />
      </svg>
    </div>
  )
}

export interface LinearProgressProps {
  thickness?: 'thin' | 'thick'
  color?: 'primary' | 'success' | 'warning' | 'error'
  determinate?: boolean
  buffer?: boolean
  progress?: number // 0-100 for determinate
  bufferProgress?: number // 0-100 for buffer
  className?: string
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  thickness = 'thin',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  color: _color = 'primary',
  determinate = false,
  buffer = false,
  progress = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bufferProgress: _bufferProgress = 0,
  className = '',
}) => {
  const thicknessClass = thickness === 'thick' ? 'progress-linear-thick' : ''
  const determinateClass = determinate ? 'progress-linear-determinate' : ''
  const bufferClass = buffer ? 'progress-linear-buffer' : ''

  const indicatorStyle = determinate ? { transform: `scaleX(${progress / 100})` } : {}

  return (
    <div
      className={['progress-linear', thicknessClass, determinateClass, bufferClass, className]
        .filter(Boolean)
        .join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={determinate ? progress : undefined}
    >
      <div className="progress-linear-indicator" style={indicatorStyle} />
    </div>
  )
}

export interface SkeletonProps {
  variant?: 'text' | 'image' | 'circle' | 'card' | 'custom'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: string | number
  height?: string | number
  animation?: 'wave' | 'pulse' | 'none'
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  size = 'md',
  width,
  height,
  animation = 'wave',
  className = '',
}) => {
  const variantClass = `skeleton-${variant}`
  const sizeClass = variant === 'text' ? `skeleton-text-${size}` : ''
  const animationClass = animation === 'pulse' ? 'skeleton-pulse' : ''

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  const baseClass = variant === 'custom' ? 'skeleton' : `skeleton ${variantClass}`

  return (
    <div
      className={[baseClass, sizeClass, animationClass, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    />
  )
}

export interface LoadingOverlayProps {
  message?: string
  showProgress?: boolean
  progress?: number
  variant?: 'default' | 'ai-processing' | 'ai-model'
  children?: React.ReactNode
  className?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message,
  showProgress = false,
  progress,
  variant = 'default',
  children,
  className = '',
}) => {
  if (variant === 'ai-processing') {
    return (
      <div className={`loading-ai-processing ${className}`}>
        <div className="loading-ai-processing-indicator">
          <div className="loading-ai-processing-dots">
            <div className="loading-ai-processing-dot" />
            <div className="loading-ai-processing-dot" />
            <div className="loading-ai-processing-dot" />
          </div>
          {message && <div className="loading-ai-processing-message">{message}</div>}
        </div>
      </div>
    )
  }

  if (variant === 'ai-model') {
    return (
      <div className={`loading-ai-model ${className}`}>
        <div className="loading-ai-model-progress" />
        {message && <div className="loading-ai-model-message">{message}</div>}
        {children}
      </div>
    )
  }

  return (
    <div className={`loading-overlay ${className}`}>
      <div className="loading-overlay-content">
        <CircularProgress />
        {showProgress && progress !== undefined && (
          <LinearProgress determinate progress={progress} />
        )}
        {message && <div className="loading-overlay-message">{message}</div>}
        {children}
      </div>
    </div>
  )
}

export interface InlineLoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
  message,
  size = 'md',
  className = '',
}) => (
  <div className={`loading-inline ${className}`}>
    <CircularProgress size={size} />
    {message && <div className="loading-inline-message">{message}</div>}
  </div>
)

export interface ButtonLoadingProps {
  children?: React.ReactNode
  className?: string
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ children, className = '' }) => (
  <div className={`button-loading ${className}`}>{children}</div>
)
