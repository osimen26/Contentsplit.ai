import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Chip, ChipGroup } from './Chip'

const getChipContainer = (text: string) => screen.getByText(text).closest('.chip')

describe('Chip', () => {
  it('renders with default props', () => {
    render(<Chip>Tag</Chip>)
    const chip = getChipContainer('Tag')
    expect(chip).toBeInTheDocument()
    expect(chip).toHaveClass('chip')
    expect(chip).toHaveClass('chip-input')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Chip variant="choice">Choice</Chip>)
    expect(getChipContainer('Choice')).toHaveClass('chip-choice')

    rerender(<Chip variant="filter">Filter</Chip>)
    expect(getChipContainer('Filter')).toHaveClass('chip-filter')

    rerender(<Chip variant="action">Action</Chip>)
    expect(getChipContainer('Action')).toHaveClass('chip-action')

    rerender(<Chip variant="assist">Assist</Chip>)
    expect(getChipContainer('Assist')).toHaveClass('chip-assist')

    rerender(<Chip variant="ai-suggestion">AI Suggestion</Chip>)
    expect(getChipContainer('AI Suggestion')).toHaveClass('chip-ai-suggestion')
  })

  it('renders selected state', () => {
    render(<Chip selected>Selected Chip</Chip>)
    const chip = getChipContainer('Selected Chip')
    expect(chip).toHaveClass('selected')
  })

  it('renders disabled state', () => {
    render(<Chip disabled>Disabled Chip</Chip>)
    const chip = getChipContainer('Disabled Chip')
    expect(chip).toHaveClass('disabled')
  })

  it('renders with icon', () => {
    render(<Chip icon={<span data-testid="icon">🎨</span>}>With Icon</Chip>)
    const chip = getChipContainer('With Icon')
    expect(chip).toBeInTheDocument()
    const iconWrapper = chip!.querySelector('.chip-icon')
    expect(iconWrapper).toBeInTheDocument()
    expect(iconWrapper).toContainElement(screen.getByTestId('icon'))
  })

  it('renders with avatar', () => {
    render(<Chip avatar={<span data-testid="avatar">A</span>}>With Avatar</Chip>)
    const chip = getChipContainer('With Avatar')
    expect(chip).toBeInTheDocument()
    const avatarWrapper = chip!.querySelector('.chip-input-avatar')
    expect(avatarWrapper).toBeInTheDocument()
    expect(avatarWrapper).toContainElement(screen.getByTestId('avatar'))
  })

  it('renders removable chip with remove button', () => {
    const handleRemove = vi.fn()
    render(
      <Chip removable onRemove={handleRemove}>
        Removable
      </Chip>
    )
    const removeButton = screen.getByRole('button', { name: /remove/i })
    expect(removeButton).toBeInTheDocument()
    expect(removeButton).toHaveClass('chip-input-remove')

    fireEvent.click(removeButton)
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('renders with badge', () => {
    render(<Chip badge={<span data-testid="badge">3</span>}>With Badge</Chip>)
    const chip = getChipContainer('With Badge')
    expect(chip).toBeInTheDocument()
    const badgeWrapper = chip!.querySelector('.chip-assist-badge')
    expect(badgeWrapper).toBeInTheDocument()
    expect(badgeWrapper).toContainElement(screen.getByTestId('badge'))
  })

  it('renders loading state', () => {
    render(<Chip loading>Loading Chip</Chip>)
    const chip = getChipContainer('Loading Chip')
    expect(chip).toHaveClass('loading')
  })
})

describe('ChipGroup', () => {
  it('renders chip group with children', () => {
    render(
      <ChipGroup>
        <Chip>One</Chip>
        <Chip>Two</Chip>
      </ChipGroup>
    )
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(screen.getByText('One').closest('.chip-group')).toBeInTheDocument()
  })

  it('renders chip group with variant', () => {
    render(
      <ChipGroup variant="choice">
        <Chip variant="choice">Choice</Chip>
      </ChipGroup>
    )
    const group = screen.getByText('Choice').closest('.chip-group')
    expect(group).toHaveClass('chip-group-choice')
  })

  it('renders chip group with label and description', () => {
    render(
      <ChipGroup label="Filter by" description="Select one or more">
        <Chip>Option</Chip>
      </ChipGroup>
    )
    expect(screen.getByText('Filter by')).toBeInTheDocument()
    expect(screen.getByText('Select one or more')).toBeInTheDocument()
  })

  it('applies single-select data attribute', () => {
    render(
      <ChipGroup singleSelect>
        <Chip>Option</Chip>
      </ChipGroup>
    )
    const group = screen.getByText('Option').closest('.chip-group')
    expect(group).toHaveAttribute('data-single-select', 'true')
  })
})
