import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { LoadingOverlay } from '@components/ui/LoadingState'

export const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingOverlay variant="default" message="Verifying session..." />
  }

  // In development mode, allow access with mock user
  if (!user && import.meta.env.VITE_APP_ENV === 'development') {
    return <Outlet />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
