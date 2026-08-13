import React, { useState } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSocialPosts } from '@/services/social-hooks'
import { SocialPost } from '@/services/api-client'

const XIcon: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.264 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

const PLATFORM_LABEL: Record<string, string> = {
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  threads: 'Threads',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const StatusBadge: React.FC<{ status: SocialPost['status'] }> = ({ status }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 20,
    fontFamily: '"DM Sans", sans-serif',
    ...(status === 'published'
      ? { color: '#065f46', backgroundColor: 'rgba(16,185,129,0.1)' }
      : { color: '#991b1b', backgroundColor: 'rgba(239,68,68,0.1)' }
    ),
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: '50%',
      backgroundColor: status === 'published' ? '#10b981' : '#ef4444',
      flexShrink: 0,
    }} />
    {status === 'published' ? 'Published' : 'Failed'}
  </span>
)

const PostsHistoryPanel: React.FC = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useSocialPosts(page)

  const posts = data?.data ?? []
  const total = data?.total ?? 0
  const hasMore = data?.has_more ?? false
  const pageSize = data?.page_size ?? 20

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        {[1, 2, 3].map(i => (
          <div key={i} style={skeletonRowStyle} />
        ))}
      </div>
    )
  }

  if (isError) {
    return <p style={emptyStyle}>Failed to load post history. Please try again.</p>
  }

  if (posts.length === 0) {
    return (
      <div style={emptyContainerStyle}>
        <XIcon size={28} />
        <p style={emptyStyle}>No posts yet. Generate content and click "Publish →" to get started.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Table */}
      <div style={tableWrapStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Platform</th>
              <th style={{ ...thStyle, width: '40%' }}>Content</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Published</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={post.id} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <XIcon size={13} />
                    <span style={cellTextStyle}>{PLATFORM_LABEL[post.platform] ?? post.platform}</span>
                  </div>
                </td>
                <td style={tdStyle}>
                  <p style={contentPreviewStyle}>
                    {post.content.length > 100 ? post.content.slice(0, 100) + '…' : post.content}
                  </p>
                  {post.status === 'failed' && post.error_message && (
                    <p style={errorHintStyle}>Error: {post.error_message}</p>
                  )}
                </td>
                <td style={tdStyle}>
                  <StatusBadge status={post.status} />
                </td>
                <td style={tdStyle}>
                  <span style={cellTextStyle}>{formatDate(post.published_at)}</span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  {post.platform_post_url ? (
                    <a
                      href={post.platform_post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      title="View on X"
                    >
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span style={{ color: '#CBD5E1', fontSize: '0.8rem' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > pageSize && (
        <div style={paginationStyle}>
          <span style={pageInfoStyle}>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} posts
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ ...pageBtnStyle, opacity: page === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!hasMore}
              style={{ ...pageBtnStyle, opacity: !hasMore ? 0.4 : 1 }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const tableWrapStyle: React.CSSProperties = {
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: 10,
  overflow: 'hidden',
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: '"DM Sans", sans-serif',
}

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#94A3B8',
  textAlign: 'left',
  backgroundColor: '#F8FAFC',
  borderBottom: '1px solid rgba(0,0,0,0.07)',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
}

const tdStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderBottom: '1px solid rgba(0,0,0,0.04)',
  verticalAlign: 'top',
}

const cellTextStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: '#334155',
  fontFamily: '"DM Sans", sans-serif',
}

const contentPreviewStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.82rem',
  color: '#475569',
  lineHeight: 1.5,
  fontFamily: '"DM Sans", sans-serif',
}

const errorHintStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: '0.75rem',
  color: '#ef4444',
  fontFamily: '"DM Sans", sans-serif',
}

const linkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  color: '#64748B',
  textDecoration: 'none',
}

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const skeletonRowStyle: React.CSSProperties = {
  height: 44,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.04)',
  animation: 'pulse 1.5s ease-in-out infinite',
}

const emptyContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  padding: '32px 0',
  color: '#CBD5E1',
}

const emptyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  color: '#94A3B8',
  textAlign: 'center',
  fontFamily: '"DM Sans", sans-serif',
}

const paginationStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 12,
}

const pageInfoStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#94A3B8',
  fontFamily: '"DM Sans", sans-serif',
}

const pageBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  color: '#475569',
}

export default PostsHistoryPanel
