import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SettingsProfile, type SettingsSidebarItem, type SettingsSection } from './SettingsProfile'

describe('SettingsProfile', () => {
  const mockSidebarItems: SettingsSidebarItem[] = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'preferences', label: 'Preferences', icon: 'tune' },
    { id: 'security', label: 'Security', icon: 'lock' },
  ]

  const mockSections: SettingsSection[] = [
    {
      id: 'profile',
      title: 'Profile Settings',
      subtitle: 'Manage your personal information',
      children: <div>Profile content</div>,
    },
    {
      id: 'preferences',
      title: 'Preferences',
      subtitle: 'Customize your experience',
      children: <div>Preferences content</div>,
    },
  ]

  it('renders with default sidebar items and empty sections', () => {
    render(<SettingsProfile />)

    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage your account and preferences')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.getByText('API Keys')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Billing')).toBeInTheDocument()
  })

  it('renders with custom sidebar items and sections', () => {
    render(<SettingsProfile sidebarItems={mockSidebarItems} sections={mockSections} />)

    expect(screen.getByText('Profile Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage your personal information')).toBeInTheDocument()
    expect(screen.getAllByText('Preferences').length).toBe(2)
    expect(screen.getByText('Customize your experience')).toBeInTheDocument()
    expect(screen.queryByText('API Keys')).not.toBeInTheDocument()
  })

  it('shows active section highlight', () => {
    render(<SettingsProfile sidebarItems={mockSidebarItems} activeSection="security" />)

    const securityButton = screen.getByRole('button', { name: /security/i })
    expect(securityButton).toHaveClass('selected')
    const profileButton = screen.getByRole('button', { name: /profile/i })
    expect(profileButton).not.toHaveClass('selected')
  })

  it('calls onSectionChange when sidebar item clicked', () => {
    const handleSectionChange = vi.fn()
    render(
      <SettingsProfile sidebarItems={mockSidebarItems} onSectionChange={handleSectionChange} />
    )

    const preferencesButton = screen.getByRole('button', { name: /preferences/i })
    fireEvent.click(preferencesButton)

    expect(handleSectionChange).toHaveBeenCalledWith('preferences')
  })

  it('renders default profile section when no sections provided', () => {
    render(<SettingsProfile />)

    expect(screen.getByText('Profile Settings')).toBeInTheDocument()
    expect(
      screen.getByText('Manage your personal information and account settings')
    ).toBeInTheDocument()
    expect(screen.getByTestId('full-name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('timezone-select')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders custom sections when provided', () => {
    render(<SettingsProfile sections={mockSections} />)

    expect(screen.getByText('Profile content')).toBeInTheDocument()
    expect(screen.getByText('Preferences content')).toBeInTheDocument()
  })

  it('displays badge on sidebar items', () => {
    const itemsWithBadge: SettingsSidebarItem[] = [
      { id: 'notifications', label: 'Notifications', badge: '3' },
    ]
    render(<SettingsProfile sidebarItems={itemsWithBadge} />)

    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
