import React from 'react'

export interface SettingsSidebarItem {
  id: string
  label: string
  icon?: string
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
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'preferences', label: 'Preferences', icon: 'tune' },
    { id: 'security', label: 'Security', icon: 'lock' },
    { id: 'api', label: 'API Keys', icon: 'key' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'billing', label: 'Billing', icon: 'credit_card' },
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
                <div className="form-field">
                  <div className="field-container">
                    <input
                      type="text"
                      className="field-input"
                      placeholder=" "
                      defaultValue="John Doe"
                      data-testid="full-name-input"
                    />
                    <label className="field-label floating">Full Name</label>
                  </div>
                </div>
                <div className="form-field">
                  <div className="field-container">
                    <input
                      type="email"
                      className="field-input"
                      placeholder=" "
                      defaultValue="john@example.com"
                      data-testid="email-input"
                    />
                    <label className="field-label floating">Email Address</label>
                  </div>
                </div>
                <div className="form-field">
                  <div className="field-container">
                    <select className="field-input field-select" data-testid="timezone-select">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                    <label className="field-label floating">Timezone</label>
                  </div>
                </div>
                <div className="settings-actions">
                  <button className="button button-filled">Save Changes</button>
                  <button className="button button-text">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
