import React, { createContext, useState, useContext, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  tier: 'free' | 'pro' | 'agency'
  credits: number
}

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
  const [user, setUser] = useState<User | null>({
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    tier: 'pro',
    credits: 350,
  })
  const [isLoading, setIsLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: 'user-123',
      name: 'John Doe',
      email,
      tier: 'pro',
      credits: 350,
    })
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
