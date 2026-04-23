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

    expect(screen.getByRole('heading', { name: /twitter/i })).toBeInTheDocument()
    expect(screen.getAllByText('Twitter').length).toBeGreaterThan(0)
    expect(screen.getAllByText('LinkedIn').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Instagram').length).toBeGreaterThan(0)
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

    expect(screen.getAllByText('Twitter').length).toBeGreaterThan(0)
    expect(screen.getAllByText('LinkedIn').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Instagram').length).toBeGreaterThan(0)
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

    const buttons = screen.getAllByText('LinkedIn')
    fireEvent.click(buttons[0])

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

    const card = screen.getByTestId('generated-content-card')
    expect(card).toBeInTheDocument()
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

    expect(screen.getByText(/13 \/ 280/)).toBeInTheDocument()

    rerender(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="linkedin"
        onTabChange={() => {}}
        content={content}
      />
    )

    expect(screen.getByText(/13 \/ 3000/)).toBeInTheDocument()
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

    const twitterTab = screen.getAllByText('Twitter')
    expect(twitterTab.length).toBeGreaterThan(0)
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

    const card = screen.getByTestId('generated-content-card')
    expect(card).toHaveClass('custom-class')
  })

  it('renders Copy and Regenerate buttons when content is shown', () => {
    const handleRegen = vi.fn()
    render(
      <GeneratedContent
        platforms={mockPlatforms}
        activeTab="twitter"
        onTabChange={() => {}}
        content="Some content"
        onRegenerate={handleRegen}
      />
    )

    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /regenerate/i })).toBeInTheDocument()
  })

  it('does not render Regenerate button when onRegenerate is not provided', () => {
    render(
      <GeneratedContent platforms={[]} activeTab="" onTabChange={() => {}} content="Content" />
    )

    expect(screen.queryByRole('button', { name: /regenerate/i })).not.toBeInTheDocument()
  })
})
