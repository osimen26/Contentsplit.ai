import React from 'react'

export type EmptyStateType =
  | 'first-use'
  | 'no-results'
  | 'no-data'
  | 'error'
  | 'no-permissions'
  | 'ai-no-content'
  | 'ai-processing'
  | 'ai-error'

export type EmptyStateLayout = 'centered' | 'side-by-side' | 'compact'

export interface EmptyStateAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'link'
  icon?: string
}

export interface EmptyStatesProps {
  type?: EmptyStateType
  layout?: EmptyStateLayout
  title?: string
  description?: string
  icon?: React.ReactNode
  illustration?: React.ReactNode
  actions?: EmptyStateAction[]
  className?: string
}

const getTypeClass = (type: EmptyStateType): string => {
  switch (type) {
    case 'first-use':
      return 'empty-first-use'
    case 'no-results':
      return 'empty-no-results'
    case 'no-data':
      return 'empty-no-data'
    case 'error':
      return 'empty-error'
    case 'no-permissions':
      return 'empty-no-permissions'
    case 'ai-no-content':
      return 'empty-ai-no-content'
    case 'ai-processing':
      return 'empty-ai-processing'
    case 'ai-error':
      return 'empty-ai-error'
    default:
      return 'empty-first-use'
  }
}

const getLayoutClass = (layout: EmptyStateLayout): string => {
  switch (layout) {
    case 'centered':
      return 'empty-centered'
    case 'side-by-side':
      return 'empty-side-by-side'
    case 'compact':
      return 'empty-compact'
    default:
      return 'empty-centered'
  }
}

const getDefaultTitle = (type: EmptyStateType): string => {
  switch (type) {
    case 'first-use':
      return 'Welcome to ContentSplit.ai!'
    case 'no-results':
      return 'No results found'
    case 'no-data':
      return 'No data available'
    case 'error':
      return 'Something went wrong'
    case 'no-permissions':
      return 'Access restricted'
    case 'ai-no-content':
      return 'No AI content generated yet'
    case 'ai-processing':
      return 'Processing your request'
    case 'ai-error':
      return 'AI processing failed'
    default:
      return ''
  }
}

const getDefaultDescription = (type: EmptyStateType): string => {
  switch (type) {
    case 'first-use':
      return 'Get started by creating your first AI-powered content adaptation. Transform your content for any platform with a single click.'
    case 'no-results':
      return 'Try adjusting your search or filter to find what you’re looking for.'
    case 'no-data':
      return 'There is no data to display here yet. Check back later or create some content.'
    case 'error':
      return 'We encountered an error while loading this page. Please try again later.'
    case 'no-permissions':
      return 'You don’t have permission to view this content. Contact your administrator for access.'
    case 'ai-no-content':
      return 'Start by entering your content and selecting platforms to generate AI-optimized versions.'
    case 'ai-processing':
      return 'Our AI is working on your request. This usually takes a few seconds.'
    case 'ai-error':
      return 'The AI service encountered an error. Please try again or contact support if the issue persists.'
    default:
      return ''
  }
}

const getDefaultIcon = (type: EmptyStateType): React.ReactNode => {
  const icons: Record<EmptyStateType, string> = {
    'first-use': '🚀',
    'no-results': '🔍',
    'no-data': '📊',
    error: '⚠️',
    'no-permissions': '🔒',
    'ai-no-content': '🤖',
    'ai-processing': '⏳',
    'ai-error': '❌',
  }
  return <span style={{ fontSize: '48px' }}>{icons[type]}</span>
}

export const EmptyStates: React.FC<EmptyStatesProps> = ({
  type = 'first-use',
  layout = 'centered',
  title,
  description,
  icon,
  illustration,
  actions = [],
  className = '',
}) => {
  const typeClass = getTypeClass(type)
  const layoutClass = getLayoutClass(layout)
  const finalTitle = title || getDefaultTitle(type)
  const finalDescription = description || getDefaultDescription(type)
  const finalIcon = icon || getDefaultIcon(type)

  const renderActions = () => {
    if (actions.length === 0) {
      return null
    }

    return (
      <div
        style={{
          display: 'flex',
          gap: 'var(--sys-spacing-md)',
          marginTop: 'var(--sys-spacing-xl)',
        }}
      >
        {actions.map((action, index) => {
          const actionClass = `empty-action-${action.variant || 'primary'}`
          return (
            <button
              key={index}
              className={actionClass}
              onClick={action.onClick}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sys-spacing-sm)' }}
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </button>
          )
        })}
      </div>
    )
  }

  if (layout === 'side-by-side') {
    return (
      <div className={`${typeClass} ${layoutClass} ${className}`}>
        <div className="empty-side-by-side-illustration">{illustration || finalIcon}</div>
        <div className="empty-side-by-side-content">
          <h3 className="empty-title-large">{finalTitle}</h3>
          <p className="empty-description-large">{finalDescription}</p>
          {renderActions()}
        </div>
      </div>
    )
  }

  // Centered or compact layout
  return (
    <div className={`${typeClass} ${layoutClass} ${className}`}>
      <div className={type === 'first-use' ? 'empty-first-use-illustration' : 'empty-icon-large'}>
        {illustration || finalIcon}
      </div>
      <h3
        className={
          type === 'first-use'
            ? 'empty-first-use-title'
            : type === 'no-results'
              ? 'empty-no-results-title'
              : 'empty-title-medium'
        }
      >
        {finalTitle}
      </h3>
      <p
        className={
          type === 'first-use'
            ? 'empty-first-use-description'
            : type === 'no-results'
              ? 'empty-no-results-description'
              : 'empty-description-medium'
        }
      >
        {finalDescription}
      </p>
      {renderActions()}
    </div>
  )
}
