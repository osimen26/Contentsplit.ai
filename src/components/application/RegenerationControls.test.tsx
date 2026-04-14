import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RegenerationControls } from './RegenerationControls'

describe('RegenerationControls', () => {
  const mockOptions = [
    {
      id: 'clarity',
      label: 'Improve Clarity',
      icon: '🎯',
      description: 'Make your content clearer',
    },
    { id: 'shorter', label: 'Make Shorter', icon: '📏', selected: true },
    { id: 'emotion', label: 'Add Emotion', icon: '🎨', disabled: true },
  ]

  it('renders with default props', () => {
    render(<RegenerationControls />)

    expect(screen.getByRole('heading', { name: /regeneration options/i })).toBeInTheDocument()
    expect(screen.getByText(/choose how to improve your content/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /regenerate content/i })).toBeInTheDocument()
    expect(screen.getByText(/15 uses left today/i)).toBeInTheDocument()
    expect(screen.getByText('Improve Clarity')).toBeInTheDocument()
    expect(screen.getByText('Make Shorter')).toBeInTheDocument()
    expect(screen.getByText('Add Emotion')).toBeInTheDocument()
  })

  it('renders with custom title and subtitle', () => {
    render(<RegenerationControls title="Custom Title" subtitle="Custom subtitle text" />)

    expect(screen.getByRole('heading', { name: /custom title/i })).toBeInTheDocument()
    expect(screen.getByText(/custom subtitle text/i)).toBeInTheDocument()
  })

  it('renders with custom options', () => {
    render(<RegenerationControls options={mockOptions} />)

    expect(screen.getByText('Improve Clarity')).toBeInTheDocument()
    expect(screen.getByText('Make Shorter')).toBeInTheDocument()
    expect(screen.getByText('Add Emotion')).toBeInTheDocument()
    expect(screen.getByText(/make your content clearer/i)).toBeInTheDocument()
  })

  it('shows selected option based on selectedOptionId', () => {
    render(<RegenerationControls options={mockOptions} selectedOptionId="clarity" />)

    const clarityOption = screen.getByText('Improve Clarity').closest('[role="button"]')
    expect(clarityOption).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onOptionSelect when option is clicked', () => {
    const handleOptionSelect = vi.fn()
    render(<RegenerationControls options={mockOptions} onOptionSelect={handleOptionSelect} />)

    const clarityOption = screen.getByText('Improve Clarity').closest('[role="button"]')
    fireEvent.click(clarityOption!)

    expect(handleOptionSelect).toHaveBeenCalledWith('clarity')
  })

  it('does not call onOptionSelect when option is disabled', () => {
    const handleOptionSelect = vi.fn()
    render(<RegenerationControls options={mockOptions} onOptionSelect={handleOptionSelect} />)

    const emotionOption = screen.getByText('Add Emotion').closest('[role="button"]')
    fireEvent.click(emotionOption!)

    expect(handleOptionSelect).not.toHaveBeenCalled()
  })

  it('calls onRegenerate when regenerate button is clicked', () => {
    const handleRegenerate = vi.fn()
    render(<RegenerationControls onRegenerate={handleRegenerate} />)

    const regenerateButton = screen.getByRole('button', { name: /regenerate content/i })
    fireEvent.click(regenerateButton)

    expect(handleRegenerate).toHaveBeenCalledTimes(1)
  })

  it('shows remaining uses', () => {
    const { rerender } = render(<RegenerationControls remainingUses={5} />)

    expect(screen.getByText(/5 uses left today/i)).toBeInTheDocument()

    rerender(<RegenerationControls remainingUses={0} />)
    expect(screen.getByText(/0 uses left today/i)).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    render(<RegenerationControls isLoading={true} />)

    const regenerateButton = screen.getByRole('button', { name: /regenerating/i })
    expect(regenerateButton).toBeInTheDocument()
    expect(regenerateButton).toBeDisabled()
  })

  it('disables regenerate button when regenerateDisabled is true', () => {
    render(<RegenerationControls regenerateDisabled={true} />)

    const regenerateButton = screen.getByRole('button', { name: /regenerate content/i })
    expect(regenerateButton).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<RegenerationControls className="custom-class" />)

    const container = screen
      .getByRole('heading', { name: /regeneration options/i })
      .closest('.regeneration-controls')
    expect(container).toHaveClass('custom-class')
  })

  it('applies custom style', () => {
    render(<RegenerationControls style={{ marginTop: '20px' }} />)

    const container = screen
      .getByRole('heading', { name: /regeneration options/i })
      .closest('.regeneration-controls')
    expect(container).toHaveStyle('margin-top: 20px')
  })

  it('does not render options when options array is empty', () => {
    render(<RegenerationControls options={[]} />)

    expect(screen.queryByRole('button', { name: /improve clarity/i })).not.toBeInTheDocument()
  })

  it('uses default selected option when selectedOptionId is not provided', () => {
    render(<RegenerationControls options={mockOptions} />)

    const shorterOption = screen.getByText('Make Shorter').closest('[role="button"]')
    expect(shorterOption).toHaveAttribute('aria-pressed', 'true')
  })
})
