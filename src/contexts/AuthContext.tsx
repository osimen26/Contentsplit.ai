import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useCurrentUser, useLogout, useLogin } from '@services/query-hooks'
import { User } from '@services/api-client'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
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
  const [tokenExists, setTokenExists] = useState(!!localStorage.getItem('auth_token'))
  
  // Listen for storage changes in case of multi-tab or manual token wipes
  useEffect(() => {
    const handleStorageChange = () => {
      setTokenExists(!!localStorage.getItem('auth_token'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const { data: user, isLoading: isUserLoading, refetch } = useCurrentUser({
    // Type override for UseQueryOptions (we are intercepting the options type via generic override)
    enabled: tokenExists,
  } as any)

  const loginMutation = useLogin()
  const logoutMutation = useLogout()

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password })
    setTokenExists(true)
    await refetch()
  }

  const logout = () => {
    logoutMutation.mutate()
    setTokenExists(false)
  }

  const updateUser = (updates: Partial<User>) => {
    console.warn("Please use useUpdateProfile from @services/query-hooks instead of the context", updates)
  }

  // Set isLoading to true if token exists but user data hasn't loaded yet.
  const isLoading = tokenExists && isUserLoading

  return (
    <AuthContext.Provider value={{ user: user || null, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
