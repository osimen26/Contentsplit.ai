import React from 'react'
import loginArt from '../../../Image/asset/Login Art.png'
import ChatInterfaceMockup from './ChatInterfaceMockup'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-white flex overflow-hidden" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      {/* Left side - Dynamic UI Preview (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative bg-[#1A1A1A] overflow-hidden items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('${loginArt}')`,
            backgroundPosition: 'center',
          }}
        />
        
        {/* Interactive Chat Mockup */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto" style={{ transform: 'scale(0.62)', transformOrigin: 'center' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <ChatInterfaceMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto flex flex-col p-8 sm:p-12 xl:p-24 relative bg-white">
        <div className="w-full max-w-md m-auto">
          {children}
        </div>

        <div className="mt-8 text-center w-full max-w-md mx-auto">
          <p className="text-[13px] text-slate-400 font-medium">
            © 2026 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
