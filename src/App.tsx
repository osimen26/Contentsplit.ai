import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/global.css'

// Layouts
import ClaudeLayout from '@/layouts/ClaudeLayout'

// Pages (lazy loaded)
import { lazy, Suspense } from 'react'

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(m => ({ default: m.ReactQueryDevtools }))
)
import { LoadingOverlay } from '@components/ui/LoadingState'

// Error Boundary
import { ErrorBoundary } from '@components/ui/ErrorBoundary'

// Analytics
import { PageViewTracker } from '@components/analytics/PageViewTracker'

const ContentCreationPage = lazy(() => import('@pages/ContentCreationPage'))
const ConversionDetailPage = lazy(() => import('@pages/ConversionDetailPage'))
const SettingsPage = lazy(() => import('@pages/SettingsPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const RecoverPage = lazy(() => import('./pages/auth/RecoverPage'))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))
const OnboardingPage = lazy(() => import('./pages/onboarding/OnboardingPage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const HelpPage = lazy(() => import('./pages/HelpPage'))

import { ProtectedRoute } from '@components/auth/ProtectedRoute'

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
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <PageViewTracker />
            <ErrorBoundary>
              <Suspense fallback={<LoadingOverlay variant="default" />}>
                <Routes>
                  {/* Public Landing Page */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/privacy" element={<LandingPage />} />
                  <Route path="/terms" element={<LandingPage />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/help" element={<HelpPage />} />

                    <Route path="/dashboard" element={<ClaudeLayout />}>
                      <Route index element={<ContentCreationPage />} />

                      <Route path="create" element={<ContentCreationPage />} />
                      <Route path="c/:id" element={<ConversionDetailPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
                    <Route path="/onboarding" element={<OnboardingPage />} />
                  </Route>

                  {/* Public Authentication Routes */}
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/recover" element={<RecoverPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </ThemeProvider>
        </AuthProvider>
      </Router>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}

export default App
