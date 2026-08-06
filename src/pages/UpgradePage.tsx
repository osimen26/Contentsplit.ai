import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LandingPricing from '@/components/layout/LandingPricing'

const UpgradePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#f8f8f7',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Back button */}
      <div className="upgrade-header-nav" style={{ padding: '24px 40px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#666', fontSize: '0.9rem', fontWeight: 500,
            padding: 0, transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#111'}
          onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Main Content */}
      <LandingPricing />
    </div>
  )
}

export default UpgradePage
