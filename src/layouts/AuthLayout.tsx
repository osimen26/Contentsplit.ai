import React from 'react'
import { Outlet } from 'react-router-dom'
import '@/styles/auth.css'

const AuthLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout
