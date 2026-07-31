import React, { createContext, useContext, useEffect, ReactNode } from 'react'

type ThemeMode = 'light'

interface ThemeContextType {
  theme: ThemeMode
  resolvedTheme: 'light'
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme: ThemeMode = 'light'
  const resolvedTheme = 'light'

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-light')
    root.classList.remove('theme-dark')
  }, [])

  // Dummy functions to prevent breaking existing components that call them
  const setTheme = () => {}
  const toggleTheme = () => {}

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
