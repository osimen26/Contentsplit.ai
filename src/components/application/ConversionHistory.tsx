import React, { useState } from 'react'

export interface ConversionItem {
  id: string
  title: string
  status: 'success' | 'pending' | 'failed'
  platform: string
  platformIcon?: string
  originalLength: number
  convertedLength: number
  date: string
  time: string
  creditsUsed: number
}

export interface ConversionStats {
  totalConversions: number
  creditsUsed: number
  avgConversionTime: string
  successRate: number
  change?: {
    value: number
    direction: 'positive' | 'negative'
  }
}

export interface ConversionFilter {
  platform?: string
  status?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface ConversionHistoryProps {
  conversions: ConversionItem[]
  stats?: ConversionStats
  loading?: boolean
  filters?: ConversionFilter
  onFilterChange?: (filters: ConversionFilter) => void
  onViewDetail?: (id: string) => void
  onRegenerate?: (id: string) => void
  onDelete?: (id: string) => void
  onPageChange?: (page: number) => void
  currentPage?: number
  totalPages?: number
  itemsPerPage?: number
}

export const ConversionHistory: React.FC<ConversionHistoryProps> = ({
  conversions,
  stats,
  loading = false,
  filters,
  onFilterChange,
  onViewDetail,
  onRegenerate,
  onDelete,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
}) => {
  const [selectedConversion, setSelectedConversion] = useState<string | null>(null)
  const [localFilters, setLocalFilters] = useState<ConversionFilter>(filters || {})

  const handleFilterChange = (
    key: keyof ConversionFilter,
    value: ConversionFilter[keyof ConversionFilter]
  ) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleViewDetail = (id: string) => {
    setSelectedConversion(selectedConversion === id ? null : id)
    onViewDetail?.(id)
  }

  const getStatusClass = (status: ConversionItem['status']) => {
    switch (status) {
      case 'success':
        return 'success'
      case 'pending':
        return 'pending'
      case 'failed':
        return 'failed'
      default:
        return ''
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  // Calculate pagination
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, conversions.length)

  return (
    <div className="conversion-history">
      {/* Header */}
      <div className="conversion-history-header">
        <div>
          <h2 className="conversion-history-title">Conversion History</h2>
          <p className="conversion-history-subtitle">Track your AI content conversions and usage</p>
        </div>
        <div className="conversion-history-actions">
          <button className="button button-outlined button-small">Export CSV</button>
          <button className="button button-filled button-small">New Conversion</button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="conversion-history-stats">
          <div className="conversion-history-stat">
            <div className="conversion-history-stat-value">
              {formatNumber(stats.totalConversions)}
            </div>
            <div className="conversion-history-stat-label">Total Conversions</div>
            {stats.change && (
              <div className={`conversion-history-stat-change ${stats.change.direction}`}>
                {stats.change.direction === 'positive' ? '↑' : '↓'} {Math.abs(stats.change.value)}%
              </div>
            )}
          </div>
          <div className="conversion-history-stat">
            <div className="conversion-history-stat-value">{formatNumber(stats.creditsUsed)}</div>
            <div className="conversion-history-stat-label">Credits Used</div>
          </div>
          <div className="conversion-history-stat">
            <div className="conversion-history-stat-value">{stats.avgConversionTime}</div>
            <div className="conversion-history-stat-label">Avg. Time</div>
          </div>
          <div className="conversion-history-stat">
            <div className="conversion-history-stat-value">{stats.successRate}%</div>
            <div className="conversion-history-stat-label">Success Rate</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="conversion-history-filters">
        <div className="conversion-history-filter-group">
          <label className="conversion-history-filter-label">Platform</label>
          <select
            className="input-filled"
            value={localFilters.platform || ''}
            onChange={(e) => handleFilterChange('platform', e.target.value || undefined)}
          >
            <option value="">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        <div className="conversion-history-filter-group">
          <label className="conversion-history-filter-label">Status</label>
          <select
            className="input-filled"
            value={localFilters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="conversion-history-filter-group">
          <label className="conversion-history-filter-label">Date Range</label>
          <select
            className="input-filled"
            value={localFilters.dateRange ? 'custom' : 'all'}
            onChange={(e) => {
              if (e.target.value === 'all') {
                handleFilterChange('dateRange', undefined)
              }
            }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="conversion-history-loading">
          <div className="conversion-history-loading-indicator">⏳</div>
          <p className="conversion-history-loading-text">Loading conversions...</p>
        </div>
      ) : conversions.length === 0 ? (
        <div className="conversion-history-empty">
          <div className="conversion-history-empty-icon">📊</div>
          <h3 className="conversion-history-empty-title">No conversions yet</h3>
          <p className="conversion-history-empty-description">
            Start creating AI-powered content to see your conversion history here.
          </p>
        </div>
      ) : (
        <>
          <div className="conversion-history-table-container">
            <table className="conversion-history-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Platform</th>
                  <th>Length</th>
                  <th>Date & Time</th>
                  <th>Credits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {conversions.slice(startItem - 1, endItem).map((conversion) => (
                  <React.Fragment key={conversion.id}>
                    <tr>
                      <td>
                        <strong>{conversion.title}</strong>
                      </td>
                      <td>
                        <span
                          className={`conversion-history-status ${getStatusClass(
                            conversion.status
                          )}`}
                        >
                          {conversion.status.charAt(0).toUpperCase() + conversion.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="conversion-history-platform">
                          {conversion.platformIcon && (
                            <span className="conversion-history-platform-icon">
                              {conversion.platformIcon}
                            </span>
                          )}
                          {conversion.platform}
                        </div>
                      </td>
                      <td>
                        {conversion.originalLength} → {conversion.convertedLength} chars
                      </td>
                      <td>
                        {conversion.date}
                        <br />
                        <small>{conversion.time}</small>
                      </td>
                      <td>{conversion.creditsUsed} credits</td>
                      <td>
                        <div className="conversion-history-actions-cell">
                          <button
                            className="button button-text button-small conversion-history-action-button"
                            onClick={() => handleViewDetail(conversion.id)}
                          >
                            View
                          </button>
                          <button
                            className="button button-text button-small conversion-history-action-button"
                            onClick={() => onRegenerate?.(conversion.id)}
                          >
                            Regenerate
                          </button>
                          <button
                            className="button button-text button-small conversion-history-action-button"
                            onClick={() => onDelete?.(conversion.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {selectedConversion === conversion.id && (
                      <tr>
                        <td colSpan={7}>
                          <div className="conversion-history-detail">
                            <div className="conversion-history-detail-header">
                              <h3 className="conversion-history-detail-title">
                                Conversion Details
                              </h3>
                              <button
                                className="button button-text button-small"
                                onClick={() => setSelectedConversion(null)}
                              >
                                Close
                              </button>
                            </div>
                            <div className="conversion-history-detail-content">
                              <div className="conversion-history-detail-section">
                                <span className="conversion-history-detail-label">
                                  Original Length
                                </span>
                                <span className="conversion-history-detail-value">
                                  {conversion.originalLength} characters
                                </span>
                              </div>
                              <div className="conversion-history-detail-section">
                                <span className="conversion-history-detail-label">
                                  Converted Length
                                </span>
                                <span className="conversion-history-detail-value">
                                  {conversion.convertedLength} characters
                                </span>
                              </div>
                              <div className="conversion-history-detail-section">
                                <span className="conversion-history-detail-label">
                                  Compression Ratio
                                </span>
                                <span className="conversion-history-detail-value">
                                  {(
                                    (conversion.convertedLength / conversion.originalLength) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                              <div className="conversion-history-detail-section">
                                <span className="conversion-history-detail-label">
                                  Credits Used
                                </span>
                                <span className="conversion-history-detail-value">
                                  {conversion.creditsUsed} credits
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="conversion-history-pagination">
              <div className="conversion-history-pagination-info">
                Showing {startItem}-{endItem} of {conversions.length} conversions
              </div>
              <div className="conversion-history-pagination-controls">
                <button
                  className="button button-text button-medium conversion-history-pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => onPageChange?.(currentPage - 1)}
                >
                  ←
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`button button-text button-medium conversion-history-pagination-button ${
                        currentPage === pageNum ? 'active' : ''
                      }`}
                      onClick={() => onPageChange?.(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                <button
                  className="button button-text button-medium conversion-history-pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange?.(currentPage + 1)}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
