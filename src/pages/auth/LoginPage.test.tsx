import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoginPage from './LoginPage'

const queryClient = new QueryClient()

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  )
}

describe('LoginPage', () => {
  it('renders login form properly', () => {
    renderWithProviders(<LoginPage />)
    
    expect(screen.getByText('Welcome back')).toBeInTheDocument()
    expect(screen.getByText('Log in to ContentSplit to continue')).toBeInTheDocument()
    
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument()
  })

  it('allows user to input email and password', () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByPlaceholderText('Email address') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('contains links to register and recover', () => {
    renderWithProviders(<LoginPage />)
    
    expect(screen.getByText('Create account')).toHaveAttribute('href', '/register')
    expect(screen.getByText('Forgot password?')).toHaveAttribute('href', '/recover')
  })
})
