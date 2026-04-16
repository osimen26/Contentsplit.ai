import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './styles/global.css'

// Layouts
import ClaudeLayout from '@/layouts/ClaudeLayout'

// Pages (lazy loaded)
import { lazy, Suspense } from 'react'
import { LoadingOverlay } from '@components/ui/LoadingState'

// Error Boundary
import { ErrorBoundary } from '@components/ui/ErrorBoundary'

// Analytics
import { PageViewTracker } from '@components/analytics/PageViewTracker'

const ContentCreationPage = lazy(() => import('@pages/ContentCreationPage'))
const SettingsPage = lazy(() => import('@pages/SettingsPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))
const OnboardingPage = lazy(() => import('./pages/onboarding/OnboardingPage'))

// Contexts
import { ThemeProvider } from '@contexts/ThemeContext'
import { AuthProvider } from '@contexts/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <PageViewTracker />
            <ErrorBoundary>
              <Suspense fallback={<LoadingOverlay variant="ai-processing" />}>
                <Routes>
                  <Route path="/" element={<ClaudeLayout />}>
                    <Route index element={<ContentCreationPage />} />
                    <Route path="create" element={<ContentCreationPage />} />
                    <Route path="settings/*" element={<SettingsPage />} />
                  </Route>
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Route>
                  <Route path="/onboarding" element={<OnboardingPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Router>
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
