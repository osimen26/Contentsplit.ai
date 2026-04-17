import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { LoadingOverlay } from '@components/ui/LoadingState'

export const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingOverlay variant="default" message="Verifying session..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
