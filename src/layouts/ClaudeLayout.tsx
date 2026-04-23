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
} from 'lucide-react'



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
  currentUser,
  isFree,
  isActive,
}) => {
  const username = (currentUser?.email || 'user@example.com').split('@')[0]
  const avatarLetter = (currentUser?.email || 'U')[0].toUpperCase()
  const tier = currentUser?.tier === 'agency' ? 'Enterprise' : currentUser?.tier === 'pro' ? 'Pro' : 'Free'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center',
            justifyContent: (collapsed && !inDrawer) ? 'center' : 'flex-start',
            gap: 8,
            padding: (collapsed && !inDrawer) ? '8px' : '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--sys-color-border-tertiary)',
            backgroundColor: 'transparent',
            color: 'var(--sys-color-neutral-20)',
            fontWeight: 500, fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
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
            border: '1px solid var(--sys-color-border-tertiary)',
            backgroundColor: 'var(--sys-color-neutral-95)',
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
              const active = location.pathname === `/c/${item.id}`
              const label = item.input_text.slice(0, 28) + (item.input_text.length > 28 ? '…' : '')
              
              return (
                <Link
                  key={item.id}
                  to={`/c/${item.id}`}
                  onClick={onMobileClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 10px',
                    marginBottom: 1,
                    borderRadius: 7,
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: active ? 500 : 400,
                    color: active ? 'var(--sys-color-neutral-10)' : 'var(--sys-color-neutral-30)',
                    backgroundColor: active ? 'var(--sys-color-neutral-90)' : 'transparent',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                  title={`${item.input_text}`}
                >
                  <span style={{ color: 'var(--sys-color-primary-50)', flexShrink: 0 }}>
                    <FileText size={12} />
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
        borderTop: '1px solid var(--sys-color-border-tertiary)',
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

        {(!collapsed || inDrawer) && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 8px 2px',
            marginTop: 4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', flex: 1 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                backgroundColor: 'var(--sys-color-primary-30)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '12px',
              }}>
                {avatarLetter}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sys-color-neutral-10)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {username}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--sys-color-neutral-50)' }}>
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
                  border: '1px solid var(--sys-color-border-tertiary)',
                  backgroundColor: 'transparent',
                  color: 'var(--sys-color-neutral-20)',
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
    style={{
      display: 'flex', alignItems: 'center',
      gap: 8,
      padding: '7px 10px',
      marginBottom: 1,
      borderRadius: 7,
      textDecoration: 'none',
      fontSize: '0.88rem',
      fontWeight: active ? 500 : 400,
      color: active ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)',
      backgroundColor: active ? 'var(--sys-color-primary-95)' : 'transparent',
      justifyContent: collapsed ? 'center' : 'flex-start',
      transition: 'background-color 0.15s',
    }}
    title={collapsed ? label : undefined}
  >
    {icon}
    {!collapsed && label}
  </Link>
)

const ClaudeLayout: React.FC<ClaudeLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const { data: currentUser } = useCurrentUser()
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
    navigate('/')
    setMobileOpen(false)
  }, [navigate])

  const handleMobileClose = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      {/* ── MOBILE HEADER ── */}
      <header style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 52,
        backgroundColor: 'var(--sys-color-neutral-99)',
        borderBottom: '1px solid var(--sys-color-border-tertiary)',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
      }} className="mobile-header">
        <button
          onClick={() => setMobileOpen(true)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}
        >
          <Menu size={22} color="var(--sys-color-neutral-30)" />
        </button>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--sys-color-neutral-10)' }}>ContentSplit</span>
      </header>

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
        backgroundColor: 'var(--sys-color-neutral-98)',
        borderRight: '1px solid var(--sys-color-border-tertiary)',
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
          currentUser={currentUser}
          isFree={isFree}
          isActive={isActive}
        />
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className={`claude-layout ${collapsed ? 'sidebar-collapsed' : ''}`} style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <aside style={{
          width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
          minWidth: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
          height: '100vh',
          backgroundColor: 'var(--sys-color-neutral-98)',
          borderRight: '1px solid var(--sys-color-border-tertiary)',
          transition: 'width 0.22s ease, min-width 0.22s ease',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }} className="claude-sidebar desktop-sidebar">
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
            currentUser={currentUser}
            isFree={isFree}
            isActive={isActive}
          />
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="claude-main">
          <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
            {children || <Outlet />}
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .claude-layout { padding-top: 52px; }
          .mobile-drawer { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-header { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
        * { scrollbar-width: thin; scrollbar-color: var(--sys-color-neutral-85) transparent; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: var(--sys-color-neutral-85); border-radius: 4px; }
      `}</style>
    </>
  )
}

export default ClaudeLayout