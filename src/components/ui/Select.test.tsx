import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './Select'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]

describe('Select', () => {
  it('renders with default props', () => {
    render(<Select options={mockOptions} />)
    const trigger = screen.getByRole('button', { name: /select an option/i })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass('select-filled-trigger')
  })

  it('renders with label', () => {
    render(<Select label="Choose option" options={mockOptions} />)
    expect(screen.getByText('Choose option')).toBeInTheDocument()
  })

  it('opens menu when trigger clicked', () => {
    render(<Select options={mockOptions} />)
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('selects an option', () => {
    const handleChange = vi.fn()
    render(<Select options={mockOptions} onChange={handleChange} />)
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    const option = screen.getByText('Option 1')
    fireEvent.click(option)
    expect(handleChange).toHaveBeenCalledWith('option1')
  })

  it('renders disabled state', () => {
    render(<Select options={mockOptions} disabled />)
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('disabled')
    fireEvent.click(trigger)
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('renders error state', () => {
    render(<Select options={mockOptions} error errorMessage="Invalid selection" />)
    expect(screen.getByText('Invalid selection')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('error')
  })

  it('renders multi-select variant', () => {
    render(<Select variant="multi" options={mockOptions} />)
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('select-multi-trigger')
  })

  it('selects multiple options in multi-select', () => {
    const handleChange = vi.fn()
    render(<Select variant="multi" options={mockOptions} onChange={handleChange} />)
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    const option1 = screen.getByText('Option 1')
    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith(['option1'])
    const option2 = screen.getByText('Option 2')
    fireEvent.click(option2)
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2'])
  })

  it('renders autocomplete variant', () => {
    render(<Select variant="autocomplete" options={mockOptions} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('select-autocomplete-input')
  })
})
