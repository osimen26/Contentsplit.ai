import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PlatformSelector } from './PlatformSelector'

describe('PlatformSelector', () => {
  const mockPlatforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      description: 'Short-form posts',
      icon: '🐦',
      characterLimit: 280,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Professional network',
      icon: '💼',
      characterLimit: 3000,
    },
  ]

  it('renders with default props', () => {
    render(<PlatformSelector platforms={mockPlatforms} selected={[]} onChange={() => {}} />)

    expect(screen.getByText(/select platforms/i)).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('calls onChange when platform is clicked', () => {
    const handleChange = vi.fn()
    render(<PlatformSelector platforms={mockPlatforms} selected={[]} onChange={handleChange} />)

    const twitterButton = screen.getByText('Twitter')
    fireEvent.click(twitterButton)

    expect(handleChange).toHaveBeenCalledWith(['twitter'])
  })

  it('shows selected platforms', () => {
    render(
      <PlatformSelector platforms={mockPlatforms} selected={['twitter']} onChange={() => {}} />
    )

    const twitterButton = screen.getByRole('button', { name: /Twitter/ })
    expect(twitterButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('respects maxSelection limit', () => {
    const handleChange = vi.fn()
    render(
      <PlatformSelector
        platforms={mockPlatforms}
        selected={['twitter']}
        onChange={handleChange}
        maxSelection={1}
      />
    )

    const linkedinButton = screen.getByText('LinkedIn')
    fireEvent.click(linkedinButton)

    // Should not call onChange because maxSelection reached
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('shows loading state', () => {
    render(
      <PlatformSelector
        platforms={mockPlatforms}
        selected={[]}
        onChange={() => {}}
        loading={true}
      />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  it('applies custom className', () => {
    render(
      <PlatformSelector
        platforms={mockPlatforms}
        selected={[]}
        onChange={() => {}}
        className="custom-class"
      />
    )

    const container = screen.getByTestId('platform-selector-container')
    expect(container).toHaveClass('custom-class')
  })
})
