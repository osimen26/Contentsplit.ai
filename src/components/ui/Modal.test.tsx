import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Content
      </Modal>
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders with default alert variant', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        Modal content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toHaveClass('modal-alert-title')
    expect(screen.getByText('Modal content')).toHaveClass('modal-alert-content')
  })

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdropClick={true}>
        Content
      </Modal>
    )
    const backdrop = screen.getByRole('dialog').parentElement
    fireEvent.click(backdrop!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when backdrop clicked and closeOnBackdropClick is false', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
        Content
      </Modal>
    )
    const backdrop = screen.getByRole('dialog').parentElement
    fireEvent.click(backdrop!)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders actions', () => {
    const actions = [
      { label: 'Cancel', variant: 'secondary' as const, onClick: () => {} },
      { label: 'Confirm', variant: 'primary' as const, onClick: () => {} },
    ]
    render(
      <Modal isOpen={true} onClose={() => {}} actions={actions}>
        Content
      </Modal>
    )
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toHaveClass('modal-action-secondary')
    expect(screen.getByText('Confirm')).toHaveClass('modal-action-primary')
  })

  it('renders close button when showCloseButton is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showCloseButton={true}>
        Content
      </Modal>
    )
    expect(screen.getByLabelText('Close')).toBeInTheDocument()
  })

  it('does not render close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
        Content
      </Modal>
    )
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
  })

  it('renders different variants', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} variant="simple">
        Content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toHaveClass('modal-simple')

    rerender(
      <Modal isOpen={true} onClose={() => {}} variant="fullscreen">
        Content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toHaveClass('modal-fullscreen')

    rerender(
      <Modal isOpen={true} onClose={() => {}} variant="bottom-sheet">
        Content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toHaveClass('modal-bottom-sheet')

    rerender(
      <Modal isOpen={true} onClose={() => {}} variant="side-sheet">
        Content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toHaveClass('modal-side-sheet')
  })

  it('applies AI confirmation class when aiConfirmation is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} aiConfirmation={true}>
        Content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toHaveClass('modal-ai-confirmation')
  })
})
