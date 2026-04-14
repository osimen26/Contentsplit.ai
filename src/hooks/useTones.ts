import { useMemo } from 'react'

export interface Tone {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  color?: 'formal' | 'casual' | 'professional' | 'creative' | 'persuasive' | 'friendly'
  previewText?: string
}

/**
 * Custom hook that provides tone/voice data for the application.
 * @returns Array of tone objects
 */
export function useTones(): Tone[] {
  return useMemo(
    () => [
      {
        id: 'professional',
        label: 'Professional',
        description: 'Formal and business-like',
        icon: '💼',
        color: 'professional',
        previewText: 'Our quarterly results demonstrate robust growth across all key metrics.',
      },
      {
        id: 'casual',
        label: 'Casual',
        description: 'Friendly and relaxed',
        icon: '😊',
        color: 'casual',
        previewText: 'Hey there! Just wanted to share some awesome news with you.',
      },
      {
        id: 'punchy',
        label: 'Punchy',
        description: 'Bold and attention‑grabbing',
        icon: '⚡',
        color: 'creative',
        previewText: 'BREAKING: This will change everything you know about content creation.',
      },
      {
        id: 'friendly',
        label: 'Friendly',
        description: 'Warm and approachable',
        icon: '🤝',
        color: 'friendly',
        previewText: 'We’re so excited to share this with our amazing community!',
      },
      {
        id: 'formal',
        label: 'Formal',
        description: 'Official and structured',
        icon: '📜',
        color: 'formal',
        previewText: 'It is with great pleasure that we announce the following developments.',
      },
      {
        id: 'persuasive',
        label: 'Persuasive',
        description: 'Convincing and compelling',
        icon: '🎯',
        color: 'persuasive',
        previewText: 'Don’t miss this opportunity to transform your content strategy today.',
      },
    ],
    []
  )
}

/**
 * Hook to get tone by ID.
 * @param id - Tone ID
 * @returns Tone object or undefined
 */
export function useTone(id: string): Tone | undefined {
  const tones = useTones()
  return useMemo(() => tones.find((t) => t.id === id), [tones, id])
}
