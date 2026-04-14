import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalytics } from '@/utils/analytics'

/**
 * Component that tracks page views when the route changes.
 * Should be placed inside the Router component.
 */
export const PageViewTracker = () => {
  const location = useLocation()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname, {
      search: location.search,
      hash: location.hash,
      referrer: document.referrer,
    })
  }, [location, trackPageView])

  // This component doesn't render anything
  return null
}

export default PageViewTracker
