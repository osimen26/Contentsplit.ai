import React from 'react'
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import {
  apiClient,
  ContentGenerationRequest,
  RegenerationRequest,
  User,
  Conversion,
  Output,
  PaginatedResponse,
} from './api-client'

// Query keys
export const queryKeys = {
  auth: ['auth'],
  user: ['user'],
  conversions: ['conversions'],
  conversion: (id: string) => ['conversions', id],
  outputs: (conversionId: string) => ['outputs', conversionId],
  usage: ['usage'],
}

// Auth hooks
export const useCurrentUser = (options?: UseQueryOptions<User>) => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => apiClient.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await apiClient.login(email, password)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token)
      queryClient.setQueryData(queryKeys.user, data.user)
    },
  })
}

export const useGoogleAuthMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ access_token }: { access_token: string }) => {
      const data = await apiClient.googleAuth(access_token)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token)
      queryClient.setQueryData(queryKeys.user, data.user)
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password, firstName, lastName }: { email: string; password: string; firstName?: string; lastName?: string }) =>
      apiClient.register(email, password, firstName, lastName),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token)
      queryClient.setQueryData(queryKeys.user, data.user)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      try {
        await apiClient.logout()
      } catch (err) {
        console.warn('Backend logout failed, proceeding with local logout', err)
      } finally {
        localStorage.removeItem('auth_token')
      }
    },
    onSettled: () => {
      queryClient.setQueryData(queryKeys.user, null)
      queryClient.clear()
    },
  })
}

// Content Generation hooks
export const useGenerateContent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ContentGenerationRequest) => apiClient.generateContent(data),
    onSuccess: (data) => {
      // Invalidate conversions list
      queryClient.invalidateQueries({ queryKey: queryKeys.conversions })
      // Add new conversion to cache
      queryClient.setQueryData(queryKeys.conversion(data.conversion.id), data.conversion)
      // Cache outputs
      queryClient.setQueryData(queryKeys.outputs(data.conversion.id), data.outputs)
    },
  })
}

export const useRegenerateContent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegenerationRequest) => apiClient.regenerateContent(data),
    onSuccess: (data, variables) => {
      // Update outputs cache for this conversion
      queryClient.setQueryData<Output[]>(queryKeys.outputs(variables.conversion_id), (old = []) => {
        const index = old.findIndex((o) => o.platform === variables.platform)
        if (index >= 0) {
          const updated = [...old]
          updated[index] = data.output
          return updated
        }
        return [...old, data.output]
      })
    },
  })
}

// History hooks
export const useConversions = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: [...queryKeys.conversions, page, pageSize],
    queryFn: () => apiClient.getConversions(page, pageSize),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useConversion = (id: string, options?: UseQueryOptions<Conversion>) => {
  return useQuery({
    queryKey: queryKeys.conversion(id),
    queryFn: () => apiClient.getConversion(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
    ...options,
  })
}

export const useOutputs = (conversionId: string) => {
  return useQuery({
    queryKey: queryKeys.outputs(conversionId),
    queryFn: () => apiClient.getOutputs(conversionId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!conversionId,
  })
}

// User settings hooks
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<User>) => apiClient.updateUserProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data)
    },
  })
}

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tier: 'free' | 'pro' | 'agency') => apiClient.updateSubscription(tier),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data)
    },
  })
}

// Usage stats hook
export const useUsageStats = () => {
  return useQuery({
    queryKey: queryKeys.usage,
    queryFn: () => apiClient.getUsageStats(),
    staleTime: 60 * 1000, // 1 minute
  })
}

// Utility hook for paginated data with infinite scroll
export const useInfiniteConversions = (pageSize = 20) => {
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(1)

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [...queryKeys.conversions, page, pageSize],
    queryFn: () => apiClient.getConversions(page, pageSize),
  })

  const loadMore = () => {
    if (data?.has_more && !isLoading && !isFetching) {
      setPage((prev) => prev + 1)
    }
  }

  const allData = React.useMemo(() => {
    const pages = queryClient.getQueriesData({ queryKey: queryKeys.conversions })
    return pages.flatMap(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_key, pageData]) => (pageData as PaginatedResponse<Conversion>)?.data || []
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, queryClient])

  return {
    data: allData,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore: data?.has_more ?? false,
  }
}
