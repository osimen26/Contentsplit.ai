import React from 'react'
import { Outlet } from 'react-router-dom'

export const ProtectedRoute: React.FC = () => {
  // Bypassing auth checks entirely for direct Dashboard access during dev
  return <Outlet />
}
