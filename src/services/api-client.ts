import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Types based on database schema
export interface User {
  id: string
  email: string
  tier: 'free' | 'pro' | 'agency'
  created_at: string
  oauth_provider?: string
  displayName?: string
  nickname?: string
  preferences?: string
  persona?: string
  tone?: string
  firstName?: string
  lastName?: string
}

export interface Plan {
  id: string
  name: string
  price: number
  currency?: string
  features: string[]
}

export interface Conversion {
  id: string
  user_id: string
  input_text: string
  tone_mode: 'professional' | 'casual' | 'punchy'
  created_at: string
}

export interface Output {
  id: string
  conversion_id: string
  platform: 'twitter' | 'linkedin' | 'instagram' | 'email'
  content: string
  regeneration_count: number
}

export interface ContentGenerationRequest {
  input_text: string
  tone_mode: 'professional' | 'casual' | 'punchy'
  platforms: ('twitter' | 'linkedin' | 'instagram' | 'email')[]
}

export interface ContentGenerationResponse {
  conversion: Conversion
  outputs: Output[]
}

export interface RegenerationRequest {
  conversion_id: string
  platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'email' | 'summary'
  option?: 'clarity' | 'shorter' | 'emotion'
}

export interface RegenerationResponse {
  output: Output
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
  has_more: boolean
}

export interface SocialAccount {
  id: string
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'threads'
  platform_username: string
  connected_at: string
}

export interface SocialPost {
  id: string
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'threads'
  content: string
  status: 'published' | 'failed'
  published_at: string
  platform_post_id?: string
  platform_post_url?: string
  error_message?: string
}


class ApiClient {
  private client: AxiosInstance

  // Uses relative path so it works on any domain (localhost via Vite proxy, or Vercel production)
  constructor(baseURL = import.meta.env.VITE_API_BASE_URL || '/api') {
    this.client = axios.create({
      baseURL,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Don't redirect on login/register endpoints - let them handle their own errors
        if (error.response?.status === 401 && 
            !error.config?.url?.includes('/auth/login') &&
            !error.config?.url?.includes('/auth/register')) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await this.client.post('/auth/login', { email, password })
    return response.data
  }

  async googleAuth(access_token: string): Promise<{ token: string; user: User }> {
    const response = await this.client.post('/auth/google', { access_token })
    return response.data
  }

  async register(email: string, password: string, firstName?: string, lastName?: string): Promise<{ token: string; user: User }> {
    const response = await this.client.post('/auth/register', { email, password, firstName, lastName })
    return response.data
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get('/auth/me')
    return response.data
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout')
  }

  async recoverPassword(email: string): Promise<{ success: boolean; message: string }> {
    const response = await this.client.post('/auth/recover', { email })
    return response.data
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<{ token: string; user: User }> {
    const response = await this.client.post('/auth/reset-password', { email, token, newPassword })
    return response.data
  }

  // Content Generation
  async generateContent(data: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const response = await this.client.post('/conversions/generate', data)
    return response.data
  }

  async regenerateContent(data: RegenerationRequest): Promise<RegenerationResponse> {
    const response = await this.client.post('/conversions/regenerate', data)
    return response.data
  }

  // History
  async getConversions(page = 1, pageSize = 20): Promise<PaginatedResponse<Conversion>> {
    const response = await this.client.get('/conversions', {
      params: { page, page_size: pageSize },
    })
    return response.data
  }

  async getConversion(id: string): Promise<Conversion> {
    const response = await this.client.get(`/conversions/${id}`)
    return response.data
  }

  async deleteConversion(id: string): Promise<{ success: boolean }> {
    const response = await this.client.delete(`/conversions/${id}`)
    return response.data
  }

  async getOutputs(conversionId: string): Promise<Output[]> {
    const response = await this.client.get(`/conversions/${conversionId}/outputs`)
    return response.data
  }

  // User Settings
  async updateUserProfile(data: Partial<User>): Promise<User> {
    const response = await this.client.patch('/users/profile', data)
    return response.data
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const response = await this.client.post('/auth/update-password', { currentPassword, newPassword })
    return response.data
  }

  async updateSubscription(tier: 'free' | 'pro' | 'agency'): Promise<User> {
    const response = await this.client.post('/users/subscription', { tier })
    return response.data
  }

  async deleteAccount(): Promise<{ success: boolean; message: string }> {
    const response = await this.client.delete('/users/me')
    return response.data
  }

  // Usage Stats
  async getUsageStats(): Promise<{
    daily_usage: number
    daily_limit: number
    conversions_today: number
  }> {
    const response = await this.client.get('/users/usage')
    return response.data
  }

  // Plans & Payments
  async getPlans(): Promise<{ plans: Plan[] }> {
    const response = await this.client.get('/plans')
    return response.data
  }

  async initiatePayment(planId: string): Promise<{ paymentLink: string; reference: string }> {
    const response = await this.client.post('/payments/initiate', { planId })
    return response.data
  }

  async verifyPayment(reference: string): Promise<{ success: boolean; tier: string }> {
    const response = await this.client.get(`/payments/verify/${reference}`)
    return response.data
  }

  // Generic request method
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.request(config)
    return response.data
  }

  // ── Social Publishing ────────────────────────────────────────────────────────

  async getTwitterAuthUrl(): Promise<{ url: string }> {
    const response = await this.client.get('/social/twitter/auth-url')
    return response.data
  }

  async getSocialAccounts(): Promise<SocialAccount[]> {
    const response = await this.client.get('/social/accounts')
    return response.data
  }

  async disconnectTwitter(): Promise<{ success: boolean }> {
    const response = await this.client.delete('/social/twitter/disconnect')
    return response.data
  }

  async publishToTwitter(outputId: string, content: string): Promise<{ success: boolean; post: SocialPost | null; tweet_url: string | null; tweet_id: string | null }> {
    const response = await this.client.post('/social/twitter/publish', { output_id: outputId, content })
    return response.data
  }

  async getSocialPosts(page = 1, pageSize = 20): Promise<PaginatedResponse<SocialPost>> {
    const response = await this.client.get('/social/posts', { params: { page, page_size: pageSize } })
    return response.data
  }

  // ── LinkedIn ─────────────────────────────────────────────────────────────────

  async getLinkedInAuthUrl(): Promise<{ url: string }> {
    const response = await this.client.get('/social/linkedin/auth-url')
    return response.data
  }

  async disconnectLinkedIn(): Promise<{ success: boolean }> {
    const response = await this.client.delete('/social/linkedin/disconnect')
    return response.data
  }

  async publishToLinkedIn(
    outputId: string,
    content: string,
    url?: string
  ): Promise<{ success: boolean; post: SocialPost | null; post_url: string | null; post_id: string | null }> {
    const response = await this.client.post('/social/linkedin/publish', {
      output_id: outputId,
      content,
      url: url || undefined,
    })
    return response.data
  }

  // ── Instagram ────────────────────────────────────────────────────────────────

  async getInstagramAuthUrl(): Promise<{ url: string }> {
    const response = await this.client.get('/social/instagram/auth-url')
    return response.data
  }

  async disconnectInstagram(): Promise<{ success: boolean }> {
    const response = await this.client.delete('/social/instagram/disconnect')
    return response.data
  }

  async publishToInstagram(
    outputId: string,
    content: string,
    mediaUrl: string
  ): Promise<{ success: boolean; post: SocialPost | null; post_url: string | null; post_id: string | null }> {
    const response = await this.client.post('/social/instagram/publish', {
      output_id: outputId,
      content,
      media_url: mediaUrl,
    })
    return response.data
  }

  // ── Media Upload ─────────────────────────────────────────────────────────────

  async uploadMedia(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await this.client.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
  // ── Newsletter ───────────────────────────────────────────────────────────────

  async getSubscribers(): Promise<{ id: string; email: string; name: string | null; created_at: string }[]> {
    const response = await this.client.get('/newsletter/subscribers')
    return response.data
  }

  async addSubscriber(email: string, name?: string): Promise<{ success: boolean }> {
    const response = await this.client.post('/newsletter/subscribers', { email, name })
    return response.data
  }

  async deleteSubscriber(id: string): Promise<{ success: boolean }> {
    const response = await this.client.delete(`/newsletter/subscribers/${id}`)
    return response.data
  }

  async publishToNewsletter(outputId: string, content: string): Promise<{ success: boolean; post: SocialPost | null; message: string }> {
    const response = await this.client.post('/social/newsletter/publish', {
      output_id: outputId,
      content,
    })
    return response.data
  }
}

export const apiClient = new ApiClient()

