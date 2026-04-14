import React from 'react'
import { ContentInput, RegenerationControls, GeneratedContent } from '@components/application'
import { useGenerateContent, useOutputs } from '@services/query-hooks'

// Platform options
const platformOptions = [
  { id: 'twitter', name: 'Twitter/X', description: '280 chars per tweet' },
  { id: 'linkedin', name: 'LinkedIn', description: 'Professional posts' },
  { id: 'instagram', name: 'Instagram', description: 'Visual captions' },
  { id: 'email', name: 'Email', description: 'Newsletter style' },
]

// Tone options
const toneOptions = [
  { id: 'professional', name: 'Professional', description: 'Formal business tone' },
  { id: 'casual', name: 'Casual', description: 'Friendly and relaxed' },
  { id: 'punchy', name: 'Punchy', description: 'Energetic and engaging' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
]

const ContentCreationPage: React.FC = () => {
  const [content, setContent] = React.useState('')
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>(['twitter'])
  const [selectedTone, setSelectedTone] = React.useState('casual')
  const [activeTab, setActiveTab] = React.useState('twitter')

  const generateMutation = useGenerateContent()
  // Mock conversion ID for demonstration
  const conversionId = 'mock-conversion-id'
  const { data: outputs, isLoading: outputsLoading } = useOutputs(conversionId)

  const handleGenerate = () => {
    if (!content.trim() || selectedPlatforms.length === 0) return

    generateMutation.mutate({
      input_text: content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tone_mode: selectedTone as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      platforms: selectedPlatforms as any,
    })
  }

  const generatedContent =
    outputs?.find((output) => output.platform === activeTab)?.content ||
    'Your generated content will appear here. Enter some content above and select your preferences.'

  return (
    <div className="layout-split">
      <div>
        <h2 className="dashboard-section-title">Create New Content</h2>

        <ContentInput
          initialContent={content}
          platforms={platformOptions}
          tones={toneOptions}
          selectedPlatforms={selectedPlatforms}
          selectedTone={selectedTone}
          onContentChange={setContent}
          onPlatformsChange={setSelectedPlatforms}
          onToneChange={setSelectedTone}
          onGenerate={handleGenerate}
          title="Enter Your Content"
          subtitle="Paste your article, blog post, or any content you want to adapt"
          placeholder="Paste your article, blog post, or any content you want to adapt..."
          characterLimit={5000}
        />
      </div>

      <div>
        <h2 className="dashboard-section-title">Generated Content</h2>

        <GeneratedContent
          platforms={platformOptions
            .filter((p) => selectedPlatforms.includes(p.id))
            .map((p) => ({
              id: p.id,
              name: p.name,
              characterLimit:
                p.id === 'twitter'
                  ? 280
                  : p.id === 'linkedin'
                    ? 3000
                    : p.id === 'instagram'
                      ? 2200
                      : 5000,
            }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          content={generatedContent}
          isLoading={outputsLoading}
          title="Preview"
        />

        <RegenerationControls
          onRegenerate={handleGenerate}
          isLoading={generateMutation.isPending}
          regenerateDisabled={!content.trim() || selectedPlatforms.length === 0}
          remainingUses={15}
          options={[
            { id: 'clarity', label: 'Improve Clarity', icon: '🎯' },
            { id: 'shorter', label: 'Make Shorter', icon: '📏', selected: true },
            { id: 'emotion', label: 'Add Emotion', icon: '🎨' },
          ]}
          selectedOptionId="shorter"
          onOptionSelect={(optionId) => console.log('Selected option:', optionId)}
          style={{ marginTop: 'var(--sys-spacing-2xl)' }}
        />

        <div
          className="ai-suggestion-container ai-suggestion-deepseek"
          style={{ marginTop: 'var(--sys-spacing-2xl)' }}
        >
          <div className="ai-suggestion-header">
            <span className="ai-suggestion-badge">🤖 AI Suggestion</span>
          </div>
          <div className="ai-suggestion-content">
            "Consider adding a call-to-action to increase engagement. You could ask a question or
            encourage users to share their thoughts."
          </div>
          <div className="ai-suggestion-actions">
            <button className="ai-suggestion-accept">Accept</button>
            <button className="ai-suggestion-modify">Modify</button>
            <button className="ai-suggestion-reject">Reject</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCreationPage
