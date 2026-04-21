import React from 'react'

interface AvatarProps {
  name: string
  src?: string
  size?: number | 'sm' | 'md' | 'lg'
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md', className = '' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const getSize = () => {
    if (typeof size === 'number') return `${size}px`
    switch (size) {
      case 'sm': return '32px'
      case 'lg': return '56px'
      case 'md':
      default: return '44px'
    }
  }

  const getFontSize = () => {
    if (typeof size === 'number') return `${size * 0.4}px`
    switch (size) {
      case 'sm': return '0.75rem'
      case 'lg': return '1.25rem'
      case 'md':
      default: return '1rem'
    }
  }

  // Generate a consistent color based on name
  const getColor = (name: string) => {
    const colors = [
      '#6750A4', // Primary
      '#625B71', // Secondary
      '#7D5260', // Tertiary
      '#BA1A1A', // Error
      '#006A6A', // Custom Teal
      '#605D62', // Neutral variant
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const avatarSize = getSize()
  const backgroundColor = getColor(name)

  return (
    <div
      className={`avatar-container ${className}`}
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: src ? 'transparent' : backgroundColor,
        color: 'white',
        fontWeight: 600,
        fontSize: getFontSize(),
        flexShrink: 0,
        border: '2px solid var(--sys-color-surface-container-lowest)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}

export default Avatar
