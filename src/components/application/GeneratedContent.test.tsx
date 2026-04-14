import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GeneratedContent } from './GeneratedContent'

describe('GeneratedContent', () => {
  const mockPlatforms = [
    { id: 'twitter', name: 'Twitter', characterLimit: 280 },
    { id: 'linkedin', name: 'LinkedIn', characterLimit: 3000 },
    { id: 'instagram', name: 'Instagram', characterLimit: 2200 },
  ]

  const mockPlatformsWithIcons = [
    { id: 'twitter', name: 'Twitter', icon: <span>🐦</span>, characterLimit: 280 },
    { id: 'linkedin', name: 'LinkedIn', icon: <span>💼</span>, characterLimit: 3000 },
  ]

  it('renders with default props', () => {
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Sample generated content"
      />
    )

    expect(screen.getByRole('heading', { name: /generated content/i })).toBeInTheDocument()
    expect(screen.getByText(/sample generated content/i)).toBeInTheDocument()
    expect(screen.getByText(/twitter/i)).toBeInTheDocument()
    expect(screen.getByText(/linkedin/i)).toBeInTheDocument()
    expect(screen.getByText(/instagram/i)).toBeInTheDocument()
    expect(screen.getByText(/\d+\s*\/\s*280/)).toBeInTheDocument()
  })

  it('renders with custom title and subtitle', () => {
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Content"
        title="Custom Title"
        subtitle="Custom subtitle text"
      />
    )

    expect(screen.getByRole('heading', { name: /custom title/i })).toBeInTheDocument()
    expect(screen.getByText(/custom subtitle text/i)).toBeInTheDocument()
  })

  it('shows tabs for each platform', () => {
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Content"
      />
    )

    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })

  it('calls onTabChange when tab is clicked', () => {
    const handleTabChange = vi.fn()
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={handleTabChange}
        content="Content"
      />
    )

    const linkedinTab = screen.getByText('LinkedIn')
    fireEvent.click(linkedinTab)

    expect(handleTabChange).toHaveBeenCalledWith('linkedin')
  })

  it('shows loading state when isLoading is true', () => {
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Content"
        isLoading={true}
      />
    )

    expect(screen.getByText(/loading generated content/i)).toBeInTheDocument()
    expect(
      screen.queryByText('Content', { selector: '.generated-content-text' })
    ).not.toBeInTheDocument()
  })

  it('displays content and character count', () => {
    const content = 'This is a longer piece of generated content that has more characters.'
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content={content}
      />
    )

    expect(screen.getByText(content)).toBeInTheDocument()
    expect(screen.getByText(`${content.length}/280`)).toBeInTheDocument()
  })

  it('calculates character limit from active platform', () => {
    const content = 'Short content'
    const { rerender } = render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content={content}
      />
    )

    expect(screen.getByText(`${content.length}/280`)).toBeInTheDocument()

    rerender(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="linkedin"
        onTabChange={() => {}}
        content={content}
      />
    )

    expect(screen.getByText(`${content.length}/3000`)).toBeInTheDocument()
  })

  it('uses default character limit when platform has no characterLimit', () => {
    const platformsWithoutLimit = [
      { id: 'twitter', name: 'Twitter' },
      { id: 'linkedin', name: 'LinkedIn', characterLimit: 3000 },
    ]
    const content = 'Sample content'

    render(
      <GeneratedContent
        platforms={platformsWithoutLimit}
        activeTab="twitter"
        onTabChange={() => {}}
        content={content}
      />
    )

    expect(screen.getByText(`${content.length}/280`)).toBeInTheDocument()
  })

  it('shows platform icons when provided', () => {
    render(
      <GeneratedContent
        platforms={mockPlatformsWithIcons}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Content"
      />
    )

    const twitterTab = screen.getByText('Twitter')
    expect(twitterTab).toContainHTML('<span>🐦</span>')
  })

  it('applies custom className', () => {
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Content"
        className="custom-class"
      />
    )

    const card = screen
      .getByRole('heading', { name: /generated content/i })
      .closest('.generated-content')
    expect(card).toHaveClass('custom-class')
  })

  it('does not render tabs when platforms array is empty', () => {
    render(
      <GeneratedContent platforms={[]} activeTab="" onTabChange={() => {}} content="Content" />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
