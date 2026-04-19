import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RegenerationControls } from './RegenerationControls'

const mockOptions = [
  { id: 'improve', label: 'Improve Clarity', icon: '🎯' },
  { id: 'shorter', label: 'Make Shorter', icon: '📏', selected: true },
  { id: 'emotion', label: 'Add Emotion', icon: '🎨', disabled: true },
]

describe('RegenerationControls', () => {
  it('renders regenerate button', () => {
    render(<RegenerationControls />)
    expect(screen.getByRole('button', { name: /regenerate/i })).toBeInTheDocument()
  })

  it('calls onRegenerate when button is clicked', () => {
    const handleRegenerate = vi.fn()
    render(<RegenerationControls onRegenerate={handleRegenerate} />)

    fireEvent.click(screen.getByRole('button', { name: /regenerate/i }))
    expect(handleRegenerate).toHaveBeenCalledTimes(1)
  })

  it('disables regenerate button when isLoading', () => {
    render(<RegenerationControls isLoading={true} />)
    expect(screen.getByRole('button', { name: /regenerating/i })).toBeDisabled()
  })

  it('displays remaining uses count', () => {
    render(<RegenerationControls remainingUses={5} />)
    expect(screen.getByText(/5 left/i)).toBeInTheDocument()
  })

  it('calls onOptionSelect when option is clicked', () => {
    const handleOption = vi.fn()
    render(
      <RegenerationControls
        options={mockOptions}
        onOptionSelect={handleOption}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /improve clarity/i }))
    expect(handleOption).toHaveBeenCalledWith('improve')
  })

  it('disables regenerate button when regenerateDisabled is true', () => {
    render(<RegenerationControls regenerateDisabled={true} />)
    expect(screen.getByRole('button', { name: /regenerate/i })).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<RegenerationControls className="custom-class" />)
    const container = screen.getByRole('button', { name: /regenerate/i }).closest('div')
    expect(container).toHaveClass('custom-class')
  })
})