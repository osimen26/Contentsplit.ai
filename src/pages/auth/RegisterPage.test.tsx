import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RegisterPage from './RegisterPage'

const queryClient = new QueryClient()

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  )
}

describe('RegisterPage', () => {
  it('renders registration form properly', () => {
    renderWithProviders(<RegisterPage />)
    
    expect(screen.getByText('Create Account', { selector: 'h1' })).toBeInTheDocument()
    expect(screen.getByText('Join ContentSplit today')).toBeInTheDocument()
    
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument()
  })

  it('allows filling the form and checking terms', () => {
    renderWithProviders(<RegisterPage />)
    
    const emailInput = screen.getByPlaceholderText('Email address') as HTMLInputElement
    const termsCheckbox = screen.getByRole('checkbox') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } })
    fireEvent.click(termsCheckbox)

    expect(emailInput.value).toBe('newuser@example.com')
    expect(termsCheckbox.checked).toBe(true)
  })

  it('shows password requirements dynamically', () => {
    renderWithProviders(<RegisterPage />)
    
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement
    
    // Initial state
    const charReq = screen.getByText('8+ characters')
    expect(charReq).not.toHaveClass('met')

    // Type a strong password
    fireEvent.change(passwordInput, { target: { value: 'StrongPass1' } })
    
    expect(charReq).toHaveClass('met')
  })
})
