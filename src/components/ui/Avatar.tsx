import React from 'react'
import { cn } from '@utils/cn'

interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md', className }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  // Generate a consistent color based on name using brand tokens
  const getColorClass = (name: string) => {
    const colorClasses = [
      'bg-primary',
      'bg-secondary',
      'bg-accent',
      'bg-ink-800',
      'bg-text-secondary',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colorClasses[Math.abs(hash) % colorClasses.length]
  }

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  }

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium text-white shadow-sm ring-2 ring-surface",
        sizes[size],
        !src && getColorClass(name),
        className
      )}
      aria-label={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}

export default Avatar

