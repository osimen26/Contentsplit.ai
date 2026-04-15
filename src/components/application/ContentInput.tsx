import React, { useState, useEffect, useRef } from 'react'
import { PlatformSelector, type Platform } from './PlatformSelector'
import { ToneSelector, type Tone } from './ToneSelector'
import { Button } from '@components/ui'
import { X, Briefcase, Camera, Mail, Users, Music, Video, FileText, Smartphone } from 'lucide-react'

export interface PlatformOption {
  id: string
  name: string
  icon?: React.ReactNode
  description?: string
}

export interface ToneOption {
  id: string
  name: string
  description?: string
}

export interface ContentInputProps {
  initialContent?: string
  platforms: PlatformOption[]
  tones: ToneOption[]
  selectedPlatforms?: string[]
  selectedTone?: string
  characterLimit?: number
  onContentChange?: (content: string) => void
  onPlatformsChange?: (platformIds: string[]) => void
  onToneChange?: (toneId: string) => void
  onGenerate?: () => void
  title?: string
  subtitle?: string
  placeholder?: string
  className?: string
}

export const ContentInput: React.FC<ContentInputProps> = ({
  initialContent = '',
  platforms,
  tones,
  selectedPlatforms = [],
  selectedTone = '',
  characterLimit = 5000,
  onContentChange,
  onPlatformsChange,
  onToneChange,
  onGenerate,
  title = 'Content Input',
  subtitle = 'Enter your content and select target platforms',
  placeholder = 'Paste or type your content here...',
  className = '',
}) => {
  const [content, setContent] = useState(initialContent)
  const [localSelectedPlatforms, setLocalSelectedPlatforms] = useState<string[]>(selectedPlatforms)
  const [localSelectedTone, setLocalSelectedTone] = useState(selectedTone)

  const prevSelectedPlatformsRef = useRef(selectedPlatforms)
  useEffect(() => {
    if (
      selectedPlatforms.length !== prevSelectedPlatformsRef.current.length ||
      selectedPlatforms.some((p, i) => p !== prevSelectedPlatformsRef.current[i])
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSelectedPlatforms(selectedPlatforms)
      prevSelectedPlatformsRef.current = selectedPlatforms
    }
  }, [selectedPlatforms])

  const prevSelectedToneRef = useRef(selectedTone)
  useEffect(() => {
    if (selectedTone !== prevSelectedToneRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSelectedTone(selectedTone)
      prevSelectedToneRef.current = selectedTone
    }
  }, [selectedTone])

  const prevInitialContentRef = useRef(initialContent)
  useEffect(() => {
    if (initialContent !== prevInitialContentRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(initialContent)
      prevInitialContentRef.current = initialContent
    }
  }, [initialContent])

  // Helper functions for platform icons and limits
  const getDefaultPlatformIcon = (platformId: string): React.ReactNode => {
    const iconSize = 20
    const iconColor = 'var(--sys-color-neutral-60)'
    const iconStyle = { width: iconSize, height: iconSize, color: iconColor }

    switch (platformId) {
      case 'twitter':
        return <X style={iconStyle} />
      case 'linkedin':
        return <Briefcase style={iconStyle} />
      case 'instagram':
        return <Camera style={iconStyle} />
      case 'email':
        return <Mail style={iconStyle} />
      case 'facebook':
        return <Users style={iconStyle} />
      case 'tiktok':
        return <Music style={iconStyle} />
      case 'youtube':
        return <Video style={iconStyle} />
      case 'blog':
        return <FileText style={iconStyle} />
      default:
        return <Smartphone style={iconStyle} />
    }
  }

  const getPlatformCharacterLimit = (platformId: string): number | undefined => {
    switch (platformId) {
      case 'twitter':
        return 280
      case 'linkedin':
        return 3000
      case 'instagram':
        return 2200
      case 'email':
        return 5000
      default:
        return undefined
    }
  }

  const getToneColor = (toneId: string): Tone['color'] => {
    switch (toneId) {
      case 'professional':
        return 'professional'
      case 'casual':
        return 'casual'
      case 'punchy':
        return 'creative'
      case 'friendly':
        return 'friendly'
      case 'formal':
        return 'formal'
      case 'persuasive':
        return 'persuasive'
      default:
        return 'casual'
    }
  }

  // Map PlatformOption[] to Platform[]
  const mappedPlatforms: Platform[] = platforms.map((platform) => ({
    id: platform.id,
    name: platform.name,
    description: platform.description || '',
    icon: platform.icon || getDefaultPlatformIcon(platform.id),
    characterLimit: getPlatformCharacterLimit(platform.id),
    disabled: false,
  }))

  // Map ToneOption[] to Tone[]
  const mappedTones: Tone[] = tones.map((tone) => ({
    id: tone.id,
    label: tone.name,
    description: tone.description,
    color: getToneColor(tone.id),
  }))

  const handlePlatformsChange = (platformIds: string[]) => {
    setLocalSelectedPlatforms(platformIds)
    if (onPlatformsChange) onPlatformsChange(platformIds)
  }

  const handleTonesChange = (toneIds: string[]) => {
    const toneId = toneIds[0] || ''
    setLocalSelectedTone(toneId)
    if (onToneChange) onToneChange(toneId)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    if (onContentChange) onContentChange(newContent)
  }

  const characterCount = content.length
  const characterCountClass =
    characterCount > characterLimit
      ? 'error'
      : characterCount > characterLimit * 0.9
        ? 'warning'
        : ''

  return (
    <div className={`content-input-container ${className}`} data-testid="content-input-container">
      <div className="content-input-header">
        <div>
          <h3 className="content-input-title">{title}</h3>
          <p className="content-input-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="content-input-area">
        <textarea
          className="content-input-textarea"
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder}
          rows={8}
        />
        <div className={`content-input-character-count ${characterCountClass}`}>
          {characterCount} / {characterLimit} characters
        </div>
      </div>

      {platforms.length > 0 && (
        <PlatformSelector
          platforms={mappedPlatforms}
          selected={localSelectedPlatforms}
          onChange={handlePlatformsChange}
          variant="grid"
          layout="compact"
          title="Select Platforms"
          subtitle="Choose where to publish your content"
          required
          maxSelection={5}
          className="content-input-platform-section"
        />
      )}

      {tones.length > 0 && (
        <ToneSelector
          tones={mappedTones}
          selected={localSelectedTone ? [localSelectedTone] : []}
          onChange={handleTonesChange}
          variant="default"
          selectionMode="single"
          title="Select Tone"
          subtitle="Choose the voice for your content"
          required
          showPreview={false}
          className="content-input-tone-section"
        />
      )}

      <div className="content-input-actions">
        <Button
          variant="filled"
          onClick={onGenerate}
          disabled={characterCount === 0 || localSelectedPlatforms.length === 0}
        >
          Generate Content
        </Button>
      </div>
    </div>
  )
}
