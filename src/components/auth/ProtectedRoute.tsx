import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { LoadingOverlay } from '@components/ui/LoadingState'

export const ProtectedRoute: React.FC = () => {
  // Bypassing auth checks entirely for direct Dashboard access during dev
  return <Outlet />
}
