/**
 * Analytics utility for tracking user interactions and page views.
 * Can be extended to integrate with Google Analytics, Mixpanel, etc.
 */

interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp?: number
}

interface AnalyticsConfig {
  enabled: boolean
  debug: boolean
  service?: 'google-analytics' | 'mixpanel' | 'custom'
}

class Analytics {
  private config: AnalyticsConfig = {
    enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG_LOGGING === 'true',
    service: 'custom',
  }

  private queue: AnalyticsEvent[] = []

  constructor() {
    this.init()
  }

  private init(): void {
    if (!this.config.enabled) {
      if (this.config.debug) {
        console.log('[Analytics] Analytics is disabled')
      }
      return
    }

    if (this.config.debug) {
      console.log('[Analytics] Initialized with config:', this.config)
    }

    // Initialize any third-party analytics services here
    this.initThirdPartyServices()

    // Process any queued events
    this.processQueue()
  }

  private initThirdPartyServices(): void {
    // Initialize Google Analytics if configured
    if (this.config.service === 'google-analytics' && import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      this.initGoogleAnalytics()
    }

    // Initialize Mixpanel if configured
    if (this.config.service === 'mixpanel' && import.meta.env.VITE_MIXPANEL_TOKEN) {
      this.initMixpanel()
    }
  }

  private initGoogleAnalytics(): void {
    // Google Analytics initialization would go here
    if (this.config.debug) {
      console.log('[Analytics] Google Analytics would be initialized')
    }
  }

  private initMixpanel(): void {
    // Mixpanel initialization would go here
    if (this.config.debug) {
      console.log('[Analytics] Mixpanel would be initialized')
    }
  }

  private processQueue(): void {
    if (this.queue.length === 0) return

    if (this.config.debug) {
      console.log(`[Analytics] Processing ${this.queue.length} queued events`)
    }

    for (const event of this.queue) {
      this.trackEventInternal(event)
    }

    this.queue = []
  }

  private trackEventInternal(event: AnalyticsEvent): void {
    if (!this.config.enabled) return

    const timestamp = event.timestamp || Date.now()
    const eventWithTimestamp = { ...event, timestamp }

    // Send to third-party services based on configuration
    this.sendToThirdPartyServices(eventWithTimestamp)

    if (this.config.debug) {
      console.log('[Analytics] Event tracked:', eventWithTimestamp)
    }
  }

  private sendToThirdPartyServices(event: AnalyticsEvent): void {
    switch (this.config.service) {
      case 'google-analytics':
        this.sendToGoogleAnalytics(event)
        break
      case 'mixpanel':
        this.sendToMixpanel(event)
        break
      default:
        // Custom implementation or just log
        if (this.config.debug) {
          console.log('[Analytics] Event would be sent to:', this.config.service, event)
        }
    }
  }

  private sendToGoogleAnalytics(event: AnalyticsEvent): void {
    // Google Analytics implementation would go here
    if (this.config.debug) {
      console.log('[Analytics] Would send to Google Analytics:', event)
    }
  }

  private sendToMixpanel(event: AnalyticsEvent): void {
    // Mixpanel implementation would go here
    if (this.config.debug) {
      console.log('[Analytics] Would send to Mixpanel:', event)
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(name: string, properties?: Record<string, unknown>): void {
    const event: AnalyticsEvent = { name, properties }

    if (!this.config.enabled) {
      if (this.config.debug) {
        console.log('[Analytics] Event queued (analytics disabled):', event)
      }
      this.queue.push(event)
      return
    }

    this.trackEventInternal(event)
  }

  /**
   * Track a page view
   */
  trackPageView(page: string, properties?: Record<string, unknown>): void {
    this.trackEvent('page_view', { page, ...properties })
  }

  /**
   * Track a button click
   */
  trackButtonClick(buttonId: string, properties?: Record<string, unknown>): void {
    this.trackEvent('button_click', { button_id: buttonId, ...properties })
  }

  /**
   * Track a form submission
   */
  trackFormSubmit(formId: string, properties?: Record<string, unknown>): void {
    this.trackEvent('form_submit', { form_id: formId, ...properties })
  }

  /**
   * Track content generation
   */
  trackContentGeneration(properties?: Record<string, unknown>): void {
    this.trackEvent('content_generation', properties)
  }

  /**
   * Track content regeneration
   */
  trackContentRegeneration(properties?: Record<string, unknown>): void {
    this.trackEvent('content_regeneration', properties)
  }

  /**
   * Set user properties for user identification
   */
  setUserProperties(userId: string, properties?: Record<string, unknown>): void {
    this.trackEvent('user_identify', { user_id: userId, ...properties })
  }

  /**
   * Enable or disable analytics
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled
    if (enabled) {
      this.init()
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): AnalyticsConfig {
    return { ...this.config }
  }
}

// Create a singleton instance
export const analytics = new Analytics()

// React hook for analytics
export const useAnalytics = () => {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackFormSubmit: analytics.trackFormSubmit.bind(analytics),
    trackContentGeneration: analytics.trackContentGeneration.bind(analytics),
    trackContentRegeneration: analytics.trackContentRegeneration.bind(analytics),
    setUserProperties: analytics.setUserProperties.bind(analytics),
    setEnabled: analytics.setEnabled.bind(analytics),
    getConfig: analytics.getConfig.bind(analytics),
  }
}

export default analytics
