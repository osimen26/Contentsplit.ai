import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContentInput } from './ContentInput'

describe('ContentInput', () => {
  const mockPlatforms = [
    { id: 'twitter', name: 'Twitter', description: 'Short-form posts' },
    { id: 'linkedin', name: 'LinkedIn', description: 'Professional network' },
  ]

  const mockTones = [
    { id: 'professional', name: 'Professional', description: 'Formal and business-like' },
    { id: 'casual', name: 'Casual', description: 'Friendly and relaxed' },
  ]

  it('renders with default props', () => {
    render(<ContentInput platforms={mockPlatforms} tones={mockTones} />)

    expect(screen.getByRole('heading', { name: /content input/i })).toBeInTheDocument()
    expect(screen.getByText(/enter your content and select target platforms/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/paste or type your content here/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generate content/i })).toBeInTheDocument()
  })

  it('renders with custom title and subtitle', () => {
    render(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        title="Custom Title"
        subtitle="Custom Subtitle"
      />
    )

    expect(screen.getByRole('heading', { name: /custom title/i })).toBeInTheDocument()
    expect(screen.getByText(/custom subtitle/i)).toBeInTheDocument()
  })

  it('handles content change', () => {
    const handleContentChange = vi.fn()
    render(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        onContentChange={handleContentChange}
      />
    )

    const textarea = screen.getByPlaceholderText(/paste or type your content here/i)
    fireEvent.change(textarea, { target: { value: 'New content' } })

    expect(handleContentChange).toHaveBeenCalledWith('New content')
  })

  it('updates character count and shows warning/error', () => {
    render(<ContentInput platforms={mockPlatforms} tones={mockTones} characterLimit={100} />)

    const textarea = screen.getByPlaceholderText(/paste or type your content here/i)

    // Within limit
    fireEvent.change(textarea, { target: { value: '50 chars' } })
    expect(screen.getByText(/8 \/ 100 characters/i)).toBeInTheDocument()

    // Warning (>90%)
    fireEvent.change(textarea, { target: { value: 'a'.repeat(95) } })
    expect(screen.getByText(/95 \/ 100 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/95 \/ 100 characters/i)).toHaveClass('warning')

    // Error (>limit)
    fireEvent.change(textarea, { target: { value: 'a'.repeat(105) } })
    expect(screen.getByText(/105 \/ 100 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/105 \/ 100 characters/i)).toHaveClass('error')
  })

  it('handles platform selection change', () => {
    const handlePlatformsChange = vi.fn()
    render(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        onPlatformsChange={handlePlatformsChange}
      />
    )

    // PlatformSelector uses button role; click on platform name
    const twitterButton = screen.getByText('Twitter')
    fireEvent.click(twitterButton)

    expect(handlePlatformsChange).toHaveBeenCalledWith(['twitter'])
  })

  it('handles tone selection change', () => {
    const handleToneChange = vi.fn()
    render(
      <ContentInput platforms={mockPlatforms} tones={mockTones} onToneChange={handleToneChange} />
    )

    // ToneSelector uses button role; click on tone name
    const professionalButton = screen.getByText('Professional')
    fireEvent.click(professionalButton)

    expect(handleToneChange).toHaveBeenCalledWith('professional')
  })

  it('disables generate button when no content or no platforms selected', () => {
    const { rerender } = render(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        initialContent=""
        selectedPlatforms={[]}
      />
    )

    let generateButton = screen.getByRole('button', { name: /generate content/i })
    expect(generateButton).toBeDisabled()

    // With content but no platforms
    rerender(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        initialContent="Some content"
        selectedPlatforms={[]}
      />
    )
    generateButton = screen.getByRole('button', { name: /generate content/i })
    expect(generateButton).toBeDisabled()

    // With platforms but no content
    rerender(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        initialContent=""
        selectedPlatforms={['twitter']}
      />
    )
    generateButton = screen.getByRole('button', { name: /generate content/i })
    expect(generateButton).toBeDisabled()

    // With both content and platforms
    rerender(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        initialContent="Some content"
        selectedPlatforms={['twitter']}
      />
    )
    generateButton = screen.getByRole('button', { name: /generate content/i })
    expect(generateButton).toBeEnabled()
  })

  it('calls onGenerate when button is clicked', () => {
    const handleGenerate = vi.fn()
    render(
      <ContentInput
        platforms={mockPlatforms}
        tones={mockTones}
        initialContent="Some content"
        selectedPlatforms={['twitter']}
        onGenerate={handleGenerate}
      />
    )

    const generateButton = screen.getByRole('button', { name: /generate content/i })
    fireEvent.click(generateButton)

    expect(handleGenerate).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<ContentInput platforms={mockPlatforms} tones={mockTones} className="custom-class" />)

    const container = screen.getByTestId('content-input-container')
    expect(container).toHaveClass('custom-class')
  })
})
