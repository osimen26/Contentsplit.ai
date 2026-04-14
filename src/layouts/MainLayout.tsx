import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div className="layout-app">
      <header className="layout-header">
        <div className="layout-fixed">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sys-spacing-lg)' }}>
              <h1 style={{ 
                fontFamily: 'var(--sys-typography-heading-1-font-family)',
                fontSize: 'var(--sys-typography-heading-1-font-size)',
                fontWeight: 'var(--sys-typography-heading-1-font-weight)',
                color: 'var(--sys-color-roles-neutral-color-role-on-neutral-container-role)',
                margin: 0 
              }}>
                ContentSplit
              </h1>
              <span className="badge badge-md badge-ai-model" style={{ marginLeft: 'var(--sys-spacing-sm)' }}>
                🤖 AI-Powered
              </span>
            </div>
            <nav className="responsive-nav-links">
              <Link to="/" className="button button-text">Dashboard</Link>
              <Link to="/create" className="button button-text">Create</Link>
              <Link to="/history" className="button button-text">History</Link>
              <Link to="/settings" className="button button-text">Settings</Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sys-spacing-md)' }}>
              <div className="badge badge-md badge-numeric badge-info">3</div>
              <button className="button button-filled button-medium">Upgrade</button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="layout-main">
        <div className="layout-fixed">
          <Outlet />
        </div>
      </main>
      
      <footer className="layout-footer">
        <div className="layout-fixed">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ 
              fontFamily: 'var(--sys-typography-body-small-text-font-family)',
              fontSize: 'var(--sys-typography-body-small-text-font-size)',
              color: 'var(--sys-color-neutral-60)' 
            }}>
              © {new Date().getFullYear()} ContentSplit.ai. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 'var(--sys-spacing-xl)' }}>
              <a href="#" className="button button-text button-small">Privacy</a>
              <a href="#" className="button button-text button-small">Terms</a>
              <a href="#" className="button button-text button-small">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout