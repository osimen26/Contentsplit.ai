import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser, useLogout, useLogin } from '@services/query-hooks'
import { User } from '@services/api-client'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (accessToken: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  notifyLoggedIn: () => void
  setTokenExists: (exists: boolean) => void
  refetch: () => Promise<unknown>
  isError: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const [tokenExists, setTokenExists] = useState(!!localStorage.getItem('auth_token'))
  
  // Listen for storage changes in case of multi-tab or manual token wipes
  useEffect(() => {
    const handleStorageChange = () => {
      setTokenExists(!!localStorage.getItem('auth_token'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const { data: user, isLoading: isUserLoading, isError, refetch } = useCurrentUser({
    queryKey: ['user'],
    enabled: tokenExists,
  })

  const loginMutation = useLogin()
  const logoutMutation = useLogout()
  const googleAuthMutation = useGoogleAuthMutation()

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password })
    setTokenExists(true)
    await refetch()
  }

  const loginWithGoogle = async (accessToken: string) => {
    await googleAuthMutation.mutateAsync({ access_token: accessToken })
    setTokenExists(true)
    await refetch()
  }

  const logout = () => {
    logoutMutation.mutate()
    setTokenExists(false)
    navigate('/')
  }

  // Called after registration (token already set in localStorage by useRegister onSuccess)
  const notifyLoggedIn = () => {
    setTokenExists(true)
    refetch()
  }

  const updateUser = (updates: Partial<User>) => {
    console.warn("Please use useUpdateProfile from @services/query-hooks instead of the context", updates)
  }

  // Set isLoading to true if token exists but user data hasn't loaded yet.
  // We use (!user && !isError) to catch the transition state where tokenExists is true
  // but React Query hasn't populated the user data or started the fetch yet.
  const isLoading = tokenExists && (isUserLoading || (!user && !isError))

  return (
    <AuthContext.Provider value={{ user: user || null, isLoading, login, loginWithGoogle, logout, updateUser, notifyLoggedIn, setTokenExists, refetch, isError }}>
      {children}
    </AuthContext.Provider>
  )
}
