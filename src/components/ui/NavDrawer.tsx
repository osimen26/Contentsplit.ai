import React from 'react'

export interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
  disabled?: boolean
}

export interface NavDrawerProps {
  isOpen: boolean
  onClose?: () => void
  items?: NavItem[]
  header?: React.ReactNode
  footer?: React.ReactNode
  variant?: 'standard' | 'modal' | 'dismissible'
  width?: string
  children?: React.ReactNode
  className?: string
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  items = [],
  header,
  footer,
  variant = 'standard',
  width,
  children,
  className = '',
}) => {
  const handleItemClick = (item: NavItem) => {
    if (item.disabled) return
    if (item.onClick) item.onClick()
    if (onClose) onClose()
  }

  const drawerClass = `nav-drawer ${isOpen ? 'open' : ''} ${variant === 'modal' ? 'nav-drawer-modal' : ''} ${className}`
  const style = width ? { width } : undefined

  return (
    <div className={drawerClass} style={style} aria-hidden={!isOpen}>
      {header && <div className="nav-drawer-header">{header}</div>}
      <div className="nav-drawer-content">
        {children ? (
          children
        ) : items.length > 0 ? (
          <ul className="nav-drawer-list">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href || '#'}
                  className={`nav-drawer-item ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleItemClick(item)
                  }}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.icon && <span className="nav-drawer-icon">{item.icon}</span>}
                  <span className="nav-drawer-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {footer && <div className="nav-drawer-footer">{footer}</div>}
    </div>
  )
}
