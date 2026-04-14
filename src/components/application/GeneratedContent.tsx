import React from 'react'
import { Card, InlineLoading } from '@components/ui'

interface Platform {
  id: string
  name: string
  icon?: React.ReactNode
  characterLimit?: number
}

export interface GeneratedContentProps {
  platforms: Platform[]
  activeTab: string
  onTabChange: (platformId: string) => void
  content: string
  isLoading?: boolean
  title?: string
  subtitle?: string
  className?: string
}

export const GeneratedContent: React.FC<GeneratedContentProps> = ({
  platforms,
  activeTab,
  onTabChange,
  content,
  isLoading = false,
  title = 'Generated Content',
  subtitle,
  className = '',
}) => {
  const activePlatform = platforms.find((p) => p.id === activeTab)
  const characterCount = content.length
  const characterLimit = activePlatform?.characterLimit || 280

  return (
    <Card variant="elevated" className={`generated-content ${className}`}>
      <div className="generated-content-header">
        <div>
          <h4 className="generated-content-title">{title}</h4>
          {subtitle && <p className="generated-content-subtitle">{subtitle}</p>}
        </div>
      </div>

      {platforms.length > 0 && (
        <div className="generated-content-tabs">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              className={`generated-content-tab ${activeTab === platform.id ? 'selected' : ''}`}
              onClick={() => onTabChange(platform.id)}
            >
              {platform.icon && <span className="generated-content-tab-icon">{platform.icon}</span>}
              {platform.name}
            </button>
          ))}
        </div>
      )}

      <div className="generated-content-panel selected">
        {isLoading ? (
          <InlineLoading message="Loading generated content..." />
        ) : (
          <div className="generated-content-display">
            <p className="generated-content-text">{content}</p>
            <div className="generated-content-character-count">
              {characterCount}/{characterLimit}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
