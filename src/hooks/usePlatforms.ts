import { useMemo } from 'react'

export interface Platform {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  characterLimit?: number
  disabled?: boolean
  color?: string
}

/**
 * Custom hook that provides platform data for the application.
 * @returns Array of platform objects
 */
export function usePlatforms(): Platform[] {
  return useMemo(
    () => [
      {
        id: 'twitter',
        name: 'Twitter',
        description: 'Short-form posts (280 characters)',
        icon: '🐦',
        characterLimit: 280,
        color: 'twitter',
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        description: 'Professional network (3000 characters)',
        icon: '💼',
        characterLimit: 3000,
        color: 'linkedin',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        description: 'Social network',
        icon: '👤',
        characterLimit: 63206,
        color: 'facebook',
      },
      {
        id: 'instagram',
        name: 'Instagram',
        description: 'Photo and video sharing',
        icon: '📸',
        characterLimit: 2200,
        color: 'instagram',
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        description: 'Short‑form video',
        icon: '🎵',
        characterLimit: 2200,
        color: 'tiktok',
      },
      {
        id: 'youtube',
        name: 'YouTube',
        description: 'Video platform',
        icon: '📺',
        characterLimit: 5000,
        color: 'youtube',
      },
      {
        id: 'email',
        name: 'Email',
        description: 'Email newsletters',
        icon: '📧',
        characterLimit: 5000,
        color: 'email',
      },
      {
        id: 'blog',
        name: 'Blog',
        description: 'Long‑form articles',
        icon: '📝',
        characterLimit: 10000,
        color: 'blog',
      },
    ],
    []
  )
}

/**
 * Hook to get platform by ID.
 * @param id - Platform ID
 * @returns Platform object or undefined
 */
export function usePlatform(id: string): Platform | undefined {
  const platforms = usePlatforms()
  return useMemo(() => platforms.find((p) => p.id === id), [platforms, id])
}
