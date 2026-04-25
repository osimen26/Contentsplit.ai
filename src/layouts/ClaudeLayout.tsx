import React, { useState, useMemo, useCallback } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useConversions, useCurrentUser } from '@/services/query-hooks'
import {
  Plus,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Menu,
  X as XIcon,
  FileText,
  LogOut,
  Home,
  Wand2,
  History,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import '@/styles/dashboard.css'

export interface ClaudeLayoutProps {
  children?: React.ReactNode
}

const SIDEBAR_W_EXPANDED = 260
const SIDEBAR_W_COLLAPSED = 72

// Sidebar content component - defined outside to avoid recreation
const SidebarContentComponent: React.FC<{
  collapsed: boolean
  inDrawer: boolean
  search: string
  onSearchChange: (v: string) => void
  onToggleCollapse?: () => void
  recentItems: Array<{ id: string; input_text: string }>
  location: ReturnType<typeof useLocation>
  onNavigate: () => void
  onMobileClose: () => void
  onLogout: () => void
  currentUser: { email?: string; tier?: string } | undefined
  isFree: boolean
  isActive: (path: string) => boolean
}> = ({
  collapsed,
  inDrawer,
  search,
  onSearchChange,
  onToggleCollapse,
  recentItems,
  location,
  onNavigate,
  onMobileClose,
  onLogout,
  currentUser,
  isFree,
  isActive,
}) => {
  const username = (currentUser?.email || 'user@example.com').split('@')[0]
  const avatarLetter = (currentUser?.email || 'U')[0].toUpperCase()
  const tier = currentUser?.tier === 'agency' ? 'Enterprise' : currentUser?.tier === 'pro' ? 'Pro' : 'Free'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* ── TOP: Brand + Toggle ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: (!collapsed || inDrawer) ? 'space-between' : 'center',
        padding: '16px 12px 8px',
        flexShrink: 0,
      }}>
        {(!collapsed || inDrawer) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--sys-color-primary-60), var(--sys-color-primary-30))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={15} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--sys-color-neutral-10)' }}>
              ContentSplit
            </span>
          </div>
        )}
        {!inDrawer && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6,
              border: 'none', backgroundColor: 'transparent',
              color: 'var(--sys-color-neutral-50)', cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
        {inDrawer && (
          <button onClick={onMobileClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
            <XIcon size={20} color="var(--sys-color-neutral-40)" />
          </button>
        )}
      </div>

      {/* ── NEW CONVERSION ── */}
      <div style={{ padding: '8px 10px', flexShrink: 0 }}>
        <button
          onClick={onNavigate}
          className="btn-gradient"
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center',
            justifyContent: (collapsed && !inDrawer) ? 'center' : 'flex-start',
            gap: 8,
            padding: (collapsed && !inDrawer) ? '8px' : '10px 12px',
            borderRadius: 10,
            fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          <Plus size={18} strokeWidth={2.5} />
          {(!collapsed || inDrawer) && 'New Conversion'}
        </button>
      </div>

      {/* ── SEARCH ── */}
      {(!collapsed || inDrawer) && (
        <div style={{ padding: '4px 10px 8px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.05)',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
            <Search size={14} color="var(--sys-color-neutral-50)" />
            <input
              type="text"
              placeholder="Search conversions…"
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                fontSize: '0.85rem', color: 'var(--sys-color-neutral-20)',
                width: '100%',
              }}
            />
          </div>
        </div>
      )}

      {/* ── RECENTS ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px' }}>
        {(!collapsed || inDrawer) && (
          <>
            <div style={{
              padding: '4px 8px 4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--sys-color-neutral-50)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 2,
            }}>
              Recents
            </div>
            {recentItems.length === 0 && (
              <p style={{ padding: '8px 10px', fontSize: '0.85rem', color: 'var(--sys-color-neutral-60)' }}>
                {search ? 'No results found.' : 'Your conversions will appear here.'}
              </p>
            )}
            {recentItems.map(item => {
              const active = location.pathname === `/dashboard/c/${item.id}`
              const label = item.input_text.slice(0, 28) + (item.input_text.length > 28 ? '…' : '')
              
              return (
                <Link
                  key={item.id}
                  to={`/dashboard/c/${item.id}`}
                  onClick={onMobileClose}
                  className="sidebar-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 10px',
                    marginBottom: 2,
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#4f46e5' : '#475569',
                    backgroundColor: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                  title={`${item.input_text}`}
                >
                  <span style={{ color: active ? '#6366f1' : '#94a3b8', flexShrink: 0 }}>
                    <FileText size={14} />
                  </span>
                  <span style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {label}
                  </span>
                </Link>
              )
            })}
          </>
        )}
      </div>

      {/* ── FOOTER: Settings + Profile ── */}
      <div style={{
        flexShrink: 0,
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: '8px 6px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <FooterLink
          to="/dashboard/settings"
          icon={<Settings size={16} />}
          label="Settings"
          active={isActive('/settings')}
          collapsed={collapsed && !inDrawer}
          onClick={onMobileClose}
        />
        <FooterLink
          to="/help"
          icon={<HelpCircle size={16} />}
          label="Help & Support"
          active={isActive('/help')}
          collapsed={collapsed && !inDrawer}
          onClick={onMobileClose}
        />
        <FooterAction
          icon={<LogOut size={16} />}
          label="Log out"
          collapsed={collapsed && !inDrawer}
          isDanger={true}
          onClick={() => {
            onLogout()
            if (inDrawer) onMobileClose()
          }}
        />

        {(!collapsed || inDrawer) && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 8px 2px',
            marginTop: 4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', flex: 1 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '12px',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
              }}>
                {avatarLetter}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {username}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                  {tier}
                </div>
              </div>
            </div>

            {isFree && (
              <Link
                to="/dashboard/settings"
                style={{
                  flexShrink: 0,
                  padding: '4px 10px',
                  borderRadius: 20,
                  border: '1px solid #cbd5e1',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  color: '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Upgrade
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Small footer link component
const FooterLink: React.FC<{
  to: string
  icon: React.ReactNode
  label: string
  active: boolean
  collapsed: boolean
  onClick?: () => void
}> = ({ to, icon, label, active, collapsed, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="sidebar-link"
    style={{
      display: 'flex', alignItems: 'center',
      gap: 8,
      padding: '7px 10px',
      marginBottom: 1,
      borderRadius: 7,
      textDecoration: 'none',
      fontSize: '0.88rem',
      fontWeight: active ? 600 : 500,
      color: active ? '#4f46e5' : '#475569',
      backgroundColor: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
      justifyContent: collapsed ? 'center' : 'flex-start',
    }}
    title={collapsed ? label : undefined}
  >
    {icon}
    {!collapsed && label}
  </Link>
)

// Action button for the footer (like logout)
const FooterAction: React.FC<{
  icon: React.ReactNode
  label: string
  collapsed: boolean
  onClick: () => void
  isDanger?: boolean
}> = ({ icon, label, collapsed, onClick, isDanger }) => (
  <button
    onClick={onClick}
    className="sidebar-link"
    style={{
      display: 'flex', alignItems: 'center',
      gap: 8,
      padding: '7px 10px',
      marginBottom: 1,
      borderRadius: 7,
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.88rem',
      fontWeight: 500,
      color: isDanger ? '#ef4444' : '#475569',
      backgroundColor: 'transparent',
      justifyContent: collapsed ? 'center' : 'flex-start',
      width: '100%',
      fontFamily: 'inherit',
    }}
    title={collapsed ? label : undefined}
  >
    {icon}
    {!collapsed && label}
  </button>
)

const ClaudeLayout: React.FC<ClaudeLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const { data: currentUser } = useCurrentUser()
  const { logout } = useAuth()
  const { data: conversionsData } = useConversions(1, 30)
  const conversionsList = useMemo(() => conversionsData?.data || [], [conversionsData])

  // Flat "Recents" list, filtered by search
  const recentItems = useMemo(() => {
    if (!conversionsList.length) return []
    const q = search.toLowerCase()
    return conversionsList
      .slice(0, 25)
      .filter(c => !q || c.input_text.toLowerCase().includes(q))
  }, [conversionsList, search])

  const isFree = !currentUser?.tier || currentUser?.tier === 'free'
  const isActive = useCallback((path: string) => location.pathname === path || location.pathname.startsWith(path + '/'), [location])

  const handleNavigate = useCallback(() => {
    navigate('/dashboard')
    setMobileOpen(false)
  }, [navigate])

  const handleMobileClose = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="dashboard-layout-root">
      {/* ── MOBILE HEADER ── */}
      <header style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 52,
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
      }} className="mobile-header">
        <button
          onClick={() => setMobileOpen(true)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}
        >
          <Menu size={22} color="#1e293b" />
        </button>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>ContentSplit</span>
      </header>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <nav style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        height: 'calc(52px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
      }} className="mobile-tab-bar">
        <Link
          to="/dashboard"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 12px', textDecoration: 'none', color: location.pathname === '/dashboard' ? '#6366f1' : '#64748b' }}
        >
          <Home size={22} />
          <span style={{ fontSize: '10px', fontWeight: 500 }}>Home</span>
        </Link>
        <Link
          to="/create"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 12px', textDecoration: 'none', color: location.pathname === '/create' ? '#6366f1' : '#64748b' }}
        >
          <Wand2 size={22} />
          <span style={{ fontSize: '10px', fontWeight: 500 }}>Create</span>
        </Link>
        <Link
          to="/history"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 12px', textDecoration: 'none', color: location.pathname.includes('/history') ? '#6366f1' : '#64748b' }}
        >
          <History size={22} />
          <span style={{ fontSize: '10px', fontWeight: 500 }}>History</span>
        </Link>
        <Link
          to="/settings"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 12px', textDecoration: 'none', color: location.pathname.includes('/settings') ? '#6366f1' : '#64748b' }}
        >
          <Settings size={22} />
          <span style={{ fontSize: '10px', fontWeight: 500 }}>Settings</span>
        </Link>
      </nav>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 400,
        width: 280,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(0,0,0,0.05)',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        display: 'flex', flexDirection: 'column',
      }} className="mobile-drawer">
        <SidebarContentComponent
          collapsed={collapsed}
          inDrawer
          search={search}
          onSearchChange={setSearch}
          onToggleCollapse={() => setCollapsed(c => !c)}
          recentItems={recentItems}
          location={location}
          onNavigate={handleNavigate}
          onMobileClose={handleMobileClose}
          onLogout={logout}
          currentUser={currentUser}
          isFree={isFree}
          isActive={isActive}
        />
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className={`claude-layout ${collapsed ? 'sidebar-collapsed' : ''}`} style={{ display: 'flex', height: '100dvh', width: '100%', overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <aside style={{
          width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
          minWidth: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
          height: '100dvh',
          transition: 'width 0.22s ease, min-width 0.22s ease',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }} className="claude-sidebar desktop-sidebar dashboard-sidebar">
          <SidebarContentComponent
            collapsed={collapsed}
            inDrawer={false}
            search={search}
            onSearchChange={setSearch}
            onToggleCollapse={() => setCollapsed(c => !c)}
            recentItems={recentItems}
            location={location}
            onNavigate={handleNavigate}
            onMobileClose={handleMobileClose}
            onLogout={logout}
            currentUser={currentUser}
            isFree={isFree}
            isActive={isActive}
          />
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }} className="claude-main dashboard-main">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            {children || <Outlet />}
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .mobile-tab-bar { display: flex !important; }
          .claude-layout { padding-top: 52px; padding-bottom: 60px; }
          .mobile-drawer { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-header { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
        * { scrollbar-width: thin; scrollbar-color: rgba(99, 102, 241, 0.2) transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: rgba(99, 102, 241, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background-color: rgba(99, 102, 241, 0.4); }
      `}</style>
    </div>
  )
}

export default ClaudeLayout