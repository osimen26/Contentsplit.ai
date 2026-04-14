import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input, TextArea } from './Input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('input-filled')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outlined" />)
    expect(screen.getByRole('textbox')).toHaveClass('input-outlined')

    rerender(<Input variant="standard" />)
    expect(screen.getByRole('textbox')).toHaveClass('input-standard')
  })

  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('Email')).toHaveClass('input-label')
  })

  it('renders with supporting text', () => {
    render(<Input supportingText="This is helper text" />)
    expect(screen.getByText('This is helper text')).toBeInTheDocument()
    expect(screen.getByText('This is helper text')).toHaveClass('input-supporting-text')
  })

  it('renders error state', () => {
    render(<Input error supportingText="Error message" />)
    const input = screen.getByRole('textbox')
    const supportingText = screen.getByText('Error message')
    expect(input).toHaveClass('error')
    expect(supportingText).toHaveClass('error')
  })

  it('renders required field', () => {
    render(<Input label="Required Field" required />)
    const label = screen.getByText('Required Field')
    expect(label).toHaveClass('required')
  })

  it('renders with icon', () => {
    const Icon = () => <span data-testid="icon">🔍</span>
    render(<Input iconLeading={<Icon />} />)
    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
    expect(icon.parentElement).toHaveClass('input-icon-leading')
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with character limit', () => {
    render(<Input characterLimit={100} />)
    expect(screen.getByText('0/100')).toBeInTheDocument()
    expect(screen.getByText('0/100')).toHaveClass('character-counter')
  })

  it('renders different input types', () => {
    const { rerender } = render(<Input type="email" label="Email" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" label="Password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')

    rerender(<Input type="search" label="Search" />)
    const searchInput = screen.getByLabelText('Search')
    expect(searchInput).toHaveAttribute('type', 'search')
    expect(searchInput).toHaveClass('search')
  })

  it('renders disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })
})

describe('TextArea', () => {
  it('renders textarea', () => {
    render(<TextArea rows={4} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('renders with label and supporting text', () => {
    render(<TextArea label="Description" supportingText="Enter a description" />)
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByText('Enter a description')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(<TextArea onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'new description' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with character limit', () => {
    render(<TextArea characterLimit={500} />)
    expect(screen.getByText('0/500')).toBeInTheDocument()
  })
})
