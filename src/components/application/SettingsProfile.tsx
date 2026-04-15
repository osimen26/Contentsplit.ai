import React from 'react'
import { User, Settings, Lock, Key, Bell, CreditCard } from 'lucide-react'

export interface SettingsSidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string
}

export interface SettingsSection {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

export interface SettingsProfileProps {
  activeSection?: string
  sidebarItems?: SettingsSidebarItem[]
  sections?: SettingsSection[]
  onSectionChange?: (id: string) => void
}

export const SettingsProfile: React.FC<SettingsProfileProps> = ({
  activeSection = 'profile',
  sidebarItems = [
    { id: 'profile', label: 'Profile', icon: <User size={20} />, badge: undefined },
    { id: 'preferences', label: 'Preferences', icon: <Settings size={20} />, badge: undefined },
    { id: 'security', label: 'Security', icon: <Lock size={20} />, badge: undefined },
    { id: 'api', label: 'API Keys', icon: <Key size={20} />, badge: undefined },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, badge: undefined },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={20} />, badge: undefined },
  ],
  sections = [],
  onSectionChange,
}) => {
  const handleSidebarItemClick = (id: string) => {
    onSectionChange?.(id)
  }

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="settings-sidebar">
        <div className="settings-sidebar-header">
          <h2 className="settings-sidebar-title">Settings</h2>
          <p className="settings-sidebar-subtitle">Manage your account and preferences</p>
        </div>
        <nav className="settings-sidebar-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`settings-sidebar-item ${activeSection === item.id ? 'selected' : ''}`}
              onClick={() => handleSidebarItemClick(item.id)}
            >
              {item.icon && <span className="settings-sidebar-item-icon">{item.icon}</span>}
              {item.label}
              {item.badge && <span className="settings-sidebar-item-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="settings-content">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div key={section.id} className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">{section.title}</h3>
                  {section.subtitle && (
                    <p className="settings-section-subtitle">{section.subtitle}</p>
                  )}
                </div>
              </div>
              {section.children}
            </div>
          ))
        ) : (
          <div className="settings-section">
            <div className="settings-section-header">
              <div>
                <h3 className="settings-section-title">Profile Settings</h3>
                <p className="settings-section-subtitle">
                  Manage your personal information and account settings
                </p>
              </div>
            </div>
            <div className="settings-profile">
              <div className="settings-profile-avatar">
                <img
                  src="https://via.placeholder.com/120"
                  alt="Profile"
                  className="settings-profile-avatar-image"
                />
                <button className="settings-profile-avatar-change">✎</button>
              </div>
              <div className="settings-profile-form">
                <div className="claude-form-field">
                  <label className="claude-form-label">Full Name</label>
                  <input
                    type="text"
                    className="claude-form-input"
                    defaultValue="John Doe"
                    data-testid="full-name-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="claude-form-field">
                  <label className="claude-form-label">Email Address</label>
                  <input
                    type="email"
                    className="claude-form-input"
                    defaultValue="john@example.com"
                    data-testid="email-input"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="claude-form-field">
                  <label className="claude-form-label">Timezone</label>
                  <select
                    className="claude-form-input claude-form-select"
                    data-testid="timezone-select"
                  >
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>
                <div className="claude-form-actions">
                  <button className="button button-filled">Save Changes</button>
                  <button className="button button-outlined">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
