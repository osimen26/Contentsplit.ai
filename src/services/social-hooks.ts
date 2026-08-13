import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, SocialAccount, SocialPost, PaginatedResponse } from './api-client'

// ── Query Keys ────────────────────────────────────────────────────────────────
export const socialKeys = {
  accounts: ['social', 'accounts'] as const,
  posts: (page?: number) => ['social', 'posts', page] as const,
}

// ── useSocialAccounts — fetch all connected social accounts ──────────────────
export function useSocialAccounts() {
  return useQuery<SocialAccount[]>({
    queryKey: socialKeys.accounts,
    queryFn: () => apiClient.getSocialAccounts(),
    staleTime: 2 * 60 * 1000,
  })
}

// ── useConnectTwitter — initiate OAuth 2.0 PKCE redirect ────────────────────
export function useConnectTwitter() {
  return useMutation<{ url: string }, Error>({
    mutationFn: () => apiClient.getTwitterAuthUrl(),
    onSuccess: ({ url }) => { window.location.href = url },
  })
}

// ── useDisconnectTwitter ──────────────────────────────────────────────────────
export function useDisconnectTwitter() {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error>({
    mutationFn: () => apiClient.disconnectTwitter(),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: socialKeys.accounts }) },
  })
}

// ── usePublishToTwitter ───────────────────────────────────────────────────────
export function usePublishToTwitter() {
  const queryClient = useQueryClient()
  return useMutation<
    { success: boolean; post: SocialPost | null; tweet_url: string | null; tweet_id: string | null },
    Error,
    { outputId: string; content: string }
  >({
    mutationFn: ({ outputId, content }) => apiClient.publishToTwitter(outputId, content),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['social', 'posts'] }) },
  })
}

// ── useSocialPosts — paginated published post history ────────────────────────
export function useSocialPosts(page = 1) {
  return useQuery<PaginatedResponse<SocialPost>>({
    queryKey: socialKeys.posts(page),
    queryFn: () => apiClient.getSocialPosts(page),
    staleTime: 60 * 1000,
  })
}

// ── LinkedIn hooks ────────────────────────────────────────────────────────────

export function useConnectLinkedIn() {
  return useMutation<{ url: string }, Error>({
    mutationFn: () => apiClient.getLinkedInAuthUrl(),
    onSuccess: ({ url }) => { window.location.href = url },
  })
}

export function useDisconnectLinkedIn() {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error>({
    mutationFn: () => apiClient.disconnectLinkedIn(),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: socialKeys.accounts }) },
  })
}

export function usePublishToLinkedIn() {
  const queryClient = useQueryClient()
  return useMutation<
    { success: boolean; post: SocialPost | null; post_url: string | null; post_id: string | null },
    Error,
    { outputId: string; content: string; url?: string }
  >({
    mutationFn: ({ outputId, content, url }) => apiClient.publishToLinkedIn(outputId, content, url),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['social', 'posts'] }) },
  })
}

// ── Instagram hooks ───────────────────────────────────────────────────────────

export function useConnectInstagram() {
  return useMutation<{ url: string }, Error>({
    mutationFn: () => apiClient.getInstagramAuthUrl(),
    onSuccess: ({ url }) => { window.location.href = url },
  })
}

export function useDisconnectInstagram() {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error>({
    mutationFn: () => apiClient.disconnectInstagram(),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: socialKeys.accounts }) },
  })
}

export function usePublishToInstagram() {
  const queryClient = useQueryClient()
  return useMutation<
    { success: boolean; post: SocialPost | null; post_url: string | null; post_id: string | null },
    Error,
    { outputId: string; content: string; mediaUrl: string }
  >({
    mutationFn: ({ outputId, content, mediaUrl }) => apiClient.publishToInstagram(outputId, content, mediaUrl),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['social', 'posts'] }) },
  })
}

// ── Media Upload hook ─────────────────────────────────────────────────────────

export function useUploadMedia() {
  return useMutation<{ url: string }, Error, File>({
    mutationFn: (file: File) => apiClient.uploadMedia(file),
  })
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export function usePublishToNewsletter() {
  const queryClient = useQueryClient()
  return useMutation<
    { success: boolean; post: SocialPost | null; message: string },
    Error,
    { outputId: string; content: string }
  >({
    mutationFn: ({ outputId, content }) => apiClient.publishToNewsletter(outputId, content),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['social', 'posts'] }) },
  })
}

// ── Facebook hooks ────────────────────────────────────────────────────────────

export function useConnectFacebook() {
  return useMutation<{ url: string }, Error>({
    mutationFn: () => apiClient.getFacebookAuthUrl(),
    onSuccess: ({ url }) => { window.location.href = url },
  })
}

export function useDisconnectFacebook() {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error>({
    mutationFn: () => apiClient.disconnectFacebook(),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: socialKeys.accounts }) },
  })
}

export function usePublishToFacebook() {
  const queryClient = useQueryClient()
  return useMutation<
    { success: boolean; post: SocialPost | null; post_url: string | null; post_id: string | null },
    Error,
    { outputId: string; content: string }
  >({
    mutationFn: ({ outputId, content }) => apiClient.publishToFacebook(outputId, content),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['social', 'posts'] }) },
  })
}

// ── Threads hooks ─────────────────────────────────────────────────────────────

export function useConnectThreads() {
  return useMutation<{ url: string }, Error>({
    mutationFn: () => apiClient.getThreadsAuthUrl(),
    onSuccess: ({ url }) => { window.location.href = url },
  })
}

export function useDisconnectThreads() {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error>({
    mutationFn: () => apiClient.disconnectThreads(),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: socialKeys.accounts }) },
  })
}

export function usePublishToThreads() {
  const queryClient = useQueryClient()
  return useMutation<
    { success: boolean; post: SocialPost | null; post_url: string | null; post_id: string | null },
    Error,
    { outputId: string; content: string }
  >({
    mutationFn: ({ outputId, content }) => apiClient.publishToThreads(outputId, content),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['social', 'posts'] }) },
  })
}

