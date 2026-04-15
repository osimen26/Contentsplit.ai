import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import {
  LayoutDashboard,
  CirclePlus,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

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
      icon: <LayoutDashboard size={20} />,
      path: '/',
    },
    {
      id: 'create',
      label: 'Create',
      icon: <CirclePlus size={20} />,
      path: '/create',
    },
    {
      id: 'history',
      label: 'History',
      icon: <History size={20} />,
      path: '/history',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
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
              icon={sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
        <div className="claude-sidebar-footer">
          <div className="sidebar-credit-usage">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--sys-spacing-xs)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--sys-typography-label-small-font-family)',
                  fontSize: 'var(--sys-typography-label-small-font-size)',
                  color: 'var(--sys-color-neutral-60)',
                }}
              >
                Credits used
              </span>
              <span
                style={{
                  fontFamily: 'var(--sys-typography-label-small-font-family)',
                  fontSize: 'var(--sys-typography-label-small-font-size)',
                  fontWeight: 600,
                  color: 'var(--sys-color-neutral-30)',
                }}
              >
                65%
              </span>
            </div>
            <div className="progress-linear">
              <div className="progress-linear-indicator" style={{ width: '65%' }}></div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'var(--sys-spacing-xs)',
                fontFamily: 'var(--sys-typography-label-small-font-family)',
                fontSize: 'var(--sys-typography-label-small-font-size)',
                color: 'var(--sys-color-neutral-60)',
              }}
            >
              <span>350 used</span>
              <span>500 total</span>
            </div>
          </div>
        </div>
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
