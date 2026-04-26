import React from 'react'

interface LogoProps {
  size?: number
  className?: string
  color?: string
}

/**
 * ContentSplit Official Logo Mark
 * Replicates the "split hashtag" design from the provided branding.
 */
export const Logo: React.FC<LogoProps> = ({ size = 24, className = '', color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 
        The logo is a hashtag (#) split by a diagonal line from bottom-left to top-right.
        We draw the 8 separate segments of the bars.
      */}
      
      {/* VERTICAL BARS */}
      {/* Top Left Vertical */}
      <rect x="35" y="10" width="12" height="35" rx="2" fill={color} />
      {/* Bottom Left Vertical */}
      <rect x="35" y="55" width="12" height="35" rx="2" fill={color} />
      
      {/* Top Right Vertical */}
      <rect x="55" y="10" width="12" height="45" rx="2" fill={color} />
      {/* Bottom Right Vertical */}
      <rect x="55" y="65" width="12" height="25" rx="2" fill={color} />
      
      {/* HORIZONTAL BARS */}
      {/* Top Left Horizontal */}
      <rect x="10" y="35" width="25" height="12" rx="2" fill={color} />
      {/* Top Right Horizontal */}
      <rect x="45" y="35" width="45" height="12" rx="2" fill={color} />
      
      {/* Bottom Left Horizontal */}
      <rect x="10" y="55" width="45" height="12" rx="2" fill={color} />
      {/* Bottom Right Horizontal */}
      <rect x="65" y="55" width="25" height="12" rx="2" fill={color} />
      
      {/* Diagonal Split Visual Hint (Subtle) */}
      <path 
        d="M15 85 L85 15" 
        stroke="transparent" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
    </svg>
  )
}

export const FullLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.25,
        background: 'linear-gradient(135deg, var(--sys-color-primary-60), var(--sys-color-primary-30))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        <Logo size={size * 0.65} color="white" />
      </div>
      <span style={{ 
        fontWeight: 700, 
        fontSize: `${size * 0.55}px`, 
        color: 'var(--sys-color-neutral-10)',
        letterSpacing: '-0.02em',
        fontFamily: 'var(--sys-typography-title-large-font-family, var(--sys-font-title-large-regular-font-family, "Plus Jakarta Sans", sans-serif))'
      }}>
        ContentSplit
      </span>
    </div>
  )
}
