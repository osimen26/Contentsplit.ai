import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ToneSelector } from './ToneSelector'

describe('ToneSelector', () => {
  const mockTones = [
    {
      id: 'professional',
      label: 'Professional',
      description: 'Formal and business-like',
      color: 'professional' as const,
    },
    {
      id: 'casual',
      label: 'Casual',
      description: 'Friendly and relaxed',
      color: 'casual' as const,
    },
  ]

  it('renders with default props', () => {
    render(<ToneSelector tones={mockTones} selected={[]} onChange={() => {}} />)

    expect(screen.getByText(/select tone/i)).toBeInTheDocument()
    expect(screen.getByText('Professional')).toBeInTheDocument()
    expect(screen.getByText('Casual')).toBeInTheDocument()
  })

  it('calls onChange when tone is clicked (single selection)', () => {
    const handleChange = vi.fn()
    render(
      <ToneSelector
        tones={mockTones}
        selected={[]}
        onChange={handleChange}
        selectionMode="single"
      />
    )

    const professionalButton = screen.getByText('Professional')
    fireEvent.click(professionalButton)

    expect(handleChange).toHaveBeenCalledWith(['professional'])
  })

  it('calls onChange when tone is clicked (multiple selection)', () => {
    const handleChange = vi.fn()
    render(
      <ToneSelector
        tones={mockTones}
        selected={[]}
        onChange={handleChange}
        selectionMode="multiple"
      />
    )

    const professionalButton = screen.getByText('Professional')
    fireEvent.click(professionalButton)

    expect(handleChange).toHaveBeenCalledWith(['professional'])
  })

  it('shows selected tones', () => {
    render(<ToneSelector tones={mockTones} selected={['professional']} onChange={() => {}} />)

    const professionalButton = screen.getByRole('button', { name: /Professional/ })
    expect(professionalButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows preview text when showPreview is true', () => {
    const toneWithPreview = {
      ...mockTones[0],
      previewText: 'Sample preview text',
    }
    render(
      <ToneSelector
        tones={[toneWithPreview]}
        selected={['professional']}
        onChange={() => {}}
        showPreview={true}
      />
    )

    expect(screen.getByText('Sample preview text')).toBeInTheDocument()
  })

  it('disables interaction when disabled prop is true', () => {
    const handleChange = vi.fn()
    render(<ToneSelector tones={mockTones} selected={[]} onChange={handleChange} disabled={true} />)

    const professionalButton = screen.getByText('Professional')
    fireEvent.click(professionalButton)

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(
      <ToneSelector tones={mockTones} selected={[]} onChange={() => {}} className="custom-class" />
    )

    const container = screen.getByTestId('tone-selector-container')
    expect(container).toHaveClass('custom-class')
  })
})
