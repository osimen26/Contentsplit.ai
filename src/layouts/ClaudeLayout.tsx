import React, { useState, useMemo, useCallback } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useCurrentUser, useDeleteConversion, useConversions } from '@/services/query-hooks'
import {
  Settings,
  HelpCircle,
  Menu,
  X as XIcon,
  LogOut,
  Trash2,
  PanelLeft,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import '@/styles/dashboard.css'

export interface ClaudeLayoutProps {
  children?: React.ReactNode
}

const SIDEBAR_W_EXPANDED = 260
const SIDEBAR_W_COLLAPSED = 72

const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

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
  const deleteMutation = useDeleteConversion()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: '#FBFAF9', padding: '20px 16px' }}>
      
      {/* ── TOP: Brand + Toggle ── */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: (collapsed && !inDrawer) ? 'center' : 'space-between', marginBottom: '32px' }}>
        {(!collapsed || inDrawer) && (
          <img src="/logo.svg" alt="ContentSplit" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
        )}
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {!inDrawer && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer', color: '#0F172A', display: 'flex', padding: '4px'
              }}
            >
              <PanelLeft size={20} strokeWidth={2} />
            </button>
          )}
          {inDrawer && (
            <button onClick={onMobileClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
              <XIcon size={20} color="#0F172A" />
            </button>
          )}
        </div>
      </header>

      {/* ── NEW CONVERSION ── */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={onNavigate}
          className="mockup-btn"
          style={{
            width: '100%', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.13)',
            borderRadius: '8px', padding: (collapsed && !inDrawer) ? '10px' : '6px', display: 'flex', alignItems: 'center',
            justifyContent: (collapsed && !inDrawer) ? 'center' : 'space-between', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'border-color 0.2s',
          }}
        >
          {(!collapsed || inDrawer) ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img src="/bubble-chat-add.svg" alt="" style={{ width: '16px', height: '16px' }} />
                <span style={{ ...dm(13, 600, { color: '#0F172A' }) }}>New Chat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ ...dm(9, 600, { color: '#94A3B8', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1px 5px', borderRadius: '4px' }) }}>Ctrl</span>
                <span style={{ ...dm(9, 600, { color: '#94A3B8', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1px 5px', borderRadius: '4px' }) }}>K</span>
              </div>
            </>
          ) : (
            <img src="/bubble-chat-add.svg" alt="" style={{ width: '20px', height: '20px' }} />
          )}
        </button>
      </div>

      {/* ── RECENTS (Chats) ── */}
      <nav style={{ flex: 1, overflowY: 'auto' }}>
        {(!collapsed || inDrawer) && (
          <h3 style={{ ...dm(13, 500, { color: '#94A3B8', marginBottom: '16px', paddingLeft: '4px', margin: '0 0 16px 0' }) }}>Chats</h3>
        )}

        {isFree ? (
          (!collapsed || inDrawer) ? (
            <div style={{ padding: '16px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center', marginTop: '8px' }}>
              <div style={{ marginBottom: '8px', fontSize: '1.25rem' }}>🔒</div>
              <p style={{ ...dm(12, 500, { color: '#475569', margin: '0 0 8px 0' }) }}>History locked</p>
              <Link to="/settings" onClick={onMobileClose} style={{ ...dm(11, 600, { color: '#2563EB', textDecoration: 'none' }) }}>Upgrade to Pro →</Link>
            </div>
          ) : (
            <div style={{ padding: '8px', textAlign: 'center', fontSize: '1rem', opacity: 0.5 }}>🔒</div>
          )
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {recentItems.length === 0 && (!collapsed || inDrawer) && (
              <li style={{ padding: '8px 4px', ...dm(13, 400, { color: '#94A3B8' }) }}>
                No chats yet.
              </li>
            )}
          {recentItems.map(item => {
            const active = location.pathname === `/dashboard/c/${item.id}`
            const label = item.input_text.slice(0, 28) + (item.input_text.length > 28 ? '…' : '')
            
            return (
              <li key={item.id}>
                <div style={{ 
                  width: '100%', 
                  background: active ? 'rgba(0,0,0,0.03)' : 'transparent', 
                  padding: '8px 8px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px',
                  transition: 'background 0.2s',
                }}>
                  <Link
                    to={`/dashboard/c/${item.id}`}
                    onClick={onMobileClose}
                    style={{
                      flex: 1,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      ...dm(13, active ? 500 : 400, { color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })
                    }}
                    title={item.input_text}
                  >
                    {!collapsed && label}
                    {collapsed && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: active ? '#111827' : '#94A3B8' }} />}
                  </Link>
                  {(!collapsed || inDrawer) && (
                    <button
                      onClick={async (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (confirm('Delete this conversion?')) {
                          setDeletingId(item.id)
                          await deleteMutation.mutateAsync(item.id)
                          setDeletingId(null)
                        }
                      }}
                      disabled={deletingId === item.id}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: deletingId === item.id ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#94A3B8',
                        opacity: deletingId === item.id ? 0.5 : 1,
                      }}
                      title="Delete"
                    >
                      {deletingId === item.id ? (
                        <span style={{ fontSize: '0.75rem' }}>...</span>
                      ) : (
                        <Trash2 size={12} />
                      )}
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        )}
      </nav>

      {/* ── FOOTER: Settings + Profile ── */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link
          to="/dashboard/settings"
          onClick={onMobileClose}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 8px',
            textDecoration: 'none', borderRadius: '8px',
            ...dm(13, isActive('/settings') ? 500 : 400, { color: '#1E293B' }),
            background: isActive('/settings') ? 'rgba(0,0,0,0.03)' : 'transparent',
          }}
        >
          <Settings size={16} color="#64748B" />
          {(!collapsed || inDrawer) && 'Settings'}
        </Link>
        <Link
          to="/help"
          onClick={onMobileClose}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 8px',
            textDecoration: 'none', borderRadius: '8px',
            ...dm(13, isActive('/help') ? 500 : 400, { color: '#1E293B' }),
            background: isActive('/help') ? 'rgba(0,0,0,0.03)' : 'transparent',
          }}
        >
          <HelpCircle size={16} color="#64748B" />
          {(!collapsed || inDrawer) && 'Help & Support'}
        </Link>
        <button
          onClick={() => {
            onLogout()
            if (inDrawer) onMobileClose()
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 8px',
            background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px',
            ...dm(13, 400, { color: '#F87171' }), width: '100%'
          }}
        >
          <LogOut size={16} />
          {(!collapsed || inDrawer) && 'Log out'}
        </button>

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          {(!collapsed || inDrawer) ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0F172A', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...dm(14, 700) }}>
                  {username.charAt(0).toUpperCase()}
                </div>
                <span style={{ ...dm(12, 600, { color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '64px' }) }}>{username}</span>
              </div>
              {isFree && (
                <Link to="/upgrade" style={{ background: 'rgba(0,0,0,0.03)', textDecoration: 'none', borderRadius: '8px', padding: '4px 8px', ...dm(12, 600, { color: '#0F172A' }), transition: 'background 0.2s' }}>
                  Upgrade
                </Link>
              )}
            </>
          ) : (
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0F172A', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', ...dm(14, 700), margin: '0 auto' }}>
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

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
    navigate('/dashboard?new=' + Date.now())
    setMobileOpen(false)
  }, [navigate])

  const handleMobileClose = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="dashboard-layout-root" style={{ background: '#FFFFFF' }}>
      {/* ── MOBILE HEADER ── */}
      <header style={{
        display: 'none',
        position: 'fixed', top:0, left: 0, right: 0, zIndex: 200,
        height: 56,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
      }} className="mobile-header">
        <button
          onClick={() => setMobileOpen(true)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}
        >
          <Menu size={22} color="#0F172A" />
        </button>
        <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', letterSpacing: '-0.01em' }}>ContentSplit</span>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            backgroundColor: 'rgba(0,0,0,0.3)',
            opacity: 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 400,
        width: 280,
        backgroundColor: '#FBFAF9',
        borderRight: '1px solid rgba(0,0,0,0.05)',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
        {/* Desktop Sidebar - fixed */}
        <aside style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
          minWidth: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED,
          transition: 'width 0.22s ease, min-width 0.22s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          zIndex: 100,
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

        {/* Main Content - offset by fixed sidebar */}
        <main style={{ marginLeft: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, transition: 'margin-left 0.22s ease' }} className="claude-main dashboard-main">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            {children || <Outlet key={location.pathname + location.search} />}
          </div>
        </main>
      </div>

<style>{`
        /* Desktop & Laptop */
        @media (min-width: 1200px) {
          .claude-layout { padding-left: 0; }
          .mobile-header { display: none !important; }
        }

        @media (min-width: 1024px) and (max-width: 1199px) {
          .mobile-header { display: none !important; }
        }

        @media (min-width: 769px) and (max-width: 1023px) {
          .mobile-header { display: none !important; }
        }

        /* Tablet & Mobile */
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .claude-layout { padding-top: 56px; }
          .mobile-drawer { display: flex !important; }
          main[class*="claude-main"] { margin-left: 0 !important; }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .mobile-drawer { width: 260px; }
          .mobile-header { height: 52px; }
        }

        * { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.1) transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background-color: rgba(0,0,0,0.2); }

        .mockup-btn:hover { border-color: rgba(0,0,0,0.2) !important; }
      `}</style>
    </div>
  )
}

export default ClaudeLayout
