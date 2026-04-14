import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Icon } from '@components/ui/Icon'
import { Button } from '@/components/ui/Button'

export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  active?: boolean
}

export interface ClaudeLayoutProps {
  children?: React.ReactNode
}

const ClaudeLayout: React.FC<ClaudeLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  const navigationItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Icon variant="filled">dashboard</Icon>,
      path: '/',
    },
    {
      id: 'create',
      label: 'Create',
      icon: <Icon variant="filled">add_circle</Icon>,
      path: '/create',
    },
    {
      id: 'history',
      label: 'History',
      icon: <Icon variant="filled">history</Icon>,
      path: '/history',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Icon variant="filled">settings</Icon>,
      path: '/settings',
    },
  ]

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={`claude-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className="claude-sidebar">
        <div className="claude-sidebar-header">
          <div className="claude-sidebar-brand">
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sys-spacing-sm)' }}>
                <h1 className="claude-sidebar-title">ContentSplit</h1>
                <span
                  className="badge badge-md badge-ai-model"
                  style={{ marginLeft: 'var(--sys-spacing-sm)' }}
                >
                  🤖 AI-Powered
                </span>
              </div>
            )}
            <Button
              variant="text"
              iconOnly
              icon={
                <Icon variant="filled">{sidebarCollapsed ? 'chevron_right' : 'chevron_left'}</Icon>
              }
              onClick={toggleSidebar}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="claude-sidebar-toggle"
            />
          </div>
        </div>
        <nav className="claude-sidebar-nav">
          <ul className="claude-sidebar-list">
            {navigationItems.map((item) => {
              const isActive =
                location.pathname === item.path || location.pathname.startsWith(item.path + '/')
              return (
                <li key={item.id} className="claude-sidebar-item">
                  <Link
                    to={item.path}
                    className={`claude-sidebar-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="claude-sidebar-icon">{item.icon}</span>
                    {!sidebarCollapsed && (
                      <span className="claude-sidebar-label">{item.label}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="claude-sidebar-footer">{/* Optional footer content */}</div>
      </aside>

      {/* Main Content Area */}
      <main className="claude-main">
        <div className="claude-main-container">{children || <Outlet />}</div>
      </main>

      {/* Optional Utility Panel - hidden by default */}
      <aside className="claude-utility-panel">
        {/* Utility panel content can be added here */}
      </aside>
    </div>
  )
}

export default ClaudeLayout
