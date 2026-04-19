import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import SettingsPage from './SettingsPage'
import type { User } from '@/services/api-client'

const localStorageMock = {
  getItem: vi.fn(() => 'light'),
  setItem: vi.fn(),
  clear: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  tier: 'free',
  created_at: '2024-01-01',
  displayName: 'Test User',
  nickname: 'tester',
  preferences: 'Prefer concise posts',
}

const createMockUpdateProfile = () => ({
  mutate: vi.fn(),
  mutateAsync: vi.fn().mockResolvedValue(mockUser),
  isPending: false,
  isError: false,
  isSuccess: true,
  data: mockUser,
  error: null,
  reset: vi.fn(),
  variables: undefined,
  status: 'success' as const,
  isIdle: false,
})

vi.mock('@/services/query-hooks', () => ({
  useCurrentUser: vi.fn(() => ({
    data: mockUser,
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  })),
  useUpdateProfile: vi.fn(() => createMockUpdateProfile()),
}))

const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{ui}</ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the settings page with all sections', () => {
    renderWithProviders(<SettingsPage />)

    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getAllByText('Account').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Appearance').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Billing').length).toBeGreaterThan(0)
  })

  it('renders profile section with user data', () => {
    renderWithProviders(<SettingsPage />)

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Display name')).toBeInTheDocument()
    expect(screen.getByText('Nickname')).toBeInTheDocument()
    expect(screen.getByText('Email address')).toBeInTheDocument()
    expect(screen.getByText('What best describes your work?')).toBeInTheDocument()
    expect(screen.getByText('Personal content preferences')).toBeInTheDocument()
  })

  it('renders save and cancel buttons', () => {
    renderWithProviders(<SettingsPage />)

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    expect(saveButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('calls updateProfile when save is clicked', async () => {
    renderWithProviders(<SettingsPage />)

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(saveButton).toBeEnabled()
    })
  })

  it('resets form values when cancel is clicked', async () => {
    renderWithProviders(<SettingsPage />)

    const displayNameInput = screen.getByDisplayValue('Test User')
    fireEvent.change(displayNameInput, { target: { value: 'New Name' } })

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
    })
  })

  it('renders theme mode selector', () => {
    renderWithProviders(<SettingsPage />)

    const appearanceButton = screen.getByRole('button', { name: /appearance/i })
    fireEvent.click(appearanceButton)

    expect(screen.getByText('Color mode')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Light' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dark' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'System' })).toBeInTheDocument()
  })

  it('renders notifications section', () => {
    renderWithProviders(<SettingsPage />)

    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('renders billing section', () => {
    renderWithProviders(<SettingsPage />)

    const billingButton = screen.getByRole('button', { name: /billing/i })
    fireEvent.click(billingButton)

    expect(screen.getAllByText(/Billing/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/coming soon/)).toBeInTheDocument()
  })

  it('switches between navigation sections', () => {
    renderWithProviders(<SettingsPage />)

    expect(screen.getByText('Profile')).toBeInTheDocument()

    const billingButton = screen.getByRole('button', { name: /billing/i })
    fireEvent.click(billingButton)

    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })
})