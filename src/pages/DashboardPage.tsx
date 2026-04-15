import React from 'react'
import { TierUsagePanel } from '@components/application'
import {
  TrendingUp,
  Zap,
  CheckCircle,
  FolderKanban,
  Plus,
  Upload,
  FileText,
  MessageSquare,
  Briefcase,
  Mail,
  Clock,
  AlertCircle,
} from 'lucide-react'

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-section">
      <h2 className="dashboard-section-title">Dashboard Overview</h2>

      <div className="dashboard-stats">
        {[
          {
            value: '1,234',
            label: 'Total Conversions',
            icon: <TrendingUp size={20} />,
            trend: '+12% this month',
            trendPositive: true,
          },
          {
            value: '567',
            label: 'Credits Used',
            icon: <Zap size={20} />,
            trend: '-8% this month',
            trendPositive: false,
          },
          {
            value: '89%',
            label: 'Success Rate',
            icon: <CheckCircle size={20} />,
            trend: '+3% this month',
            trendPositive: true,
          },
          {
            value: '24',
            label: 'Active Projects',
            icon: <FolderKanban size={20} />,
            trend: '+5 this month',
            trendPositive: true,
          },
        ].map((stat, index) => (
          <div className="dashboard-stat" key={index}>
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon">{stat.icon}</div>
              <h3 className="dashboard-stat-value">{stat.value}</h3>
            </div>
            <p className="dashboard-stat-label">{stat.label}</p>
            <div
              className={`dashboard-stat-trend ${stat.trendPositive ? 'trend-positive' : 'trend-negative'}`}
            >
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-actions">
        <button className="button button-filled button-large">
          <Plus size={20} style={{ marginRight: 'var(--sys-spacing-sm)' }} />
          New content
        </button>
        <button className="button button-outlined button-large">
          <Upload size={20} style={{ marginRight: 'var(--sys-spacing-sm)' }} />
          Import
        </button>
      </div>

      <div
        className="dashboard-grid-2-col dashboard-grid-2-col-aside"
        style={{ marginTop: 'var(--sys-spacing-2xl)' }}
      >
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h4 className="dashboard-card-title">Recent Conversions</h4>
            <span className="badge badge-md badge-success">Live</span>
          </div>
          <div className="dashboard-card-content">
            <div className="conversion-list">
              {[
                {
                  title: 'Blog Post - AI Trends',
                  platform: 'Twitter',
                  platformIcon: <MessageSquare size={16} />,
                  timestamp: '2 hours ago',
                  status: 'Done',
                  statusColor: 'success',
                  fileIcon: <FileText size={20} />,
                },
                {
                  title: 'Product Announcement',
                  platform: 'LinkedIn',
                  platformIcon: <Briefcase size={16} />,
                  timestamp: '5 hours ago',
                  status: 'Processing',
                  statusColor: 'warning',
                  fileIcon: <FileText size={20} />,
                },
                {
                  title: 'Email Newsletter',
                  platform: 'Email',
                  platformIcon: <Mail size={16} />,
                  timestamp: '1 day ago',
                  status: 'Done',
                  statusColor: 'success',
                  fileIcon: <FileText size={20} />,
                },
              ].map((conversion, index) => (
                <div className="conversion-item" key={index}>
                  <div className="conversion-item-icon">{conversion.fileIcon}</div>
                  <div className="conversion-item-content">
                    <div className="conversion-item-header">
                      <strong className="conversion-item-title">{conversion.title}</strong>
                      <span className={`badge badge-sm badge-${conversion.statusColor}`}>
                        {conversion.status === 'Processing' ? (
                          <AlertCircle size={12} style={{ marginRight: 4 }} />
                        ) : (
                          <CheckCircle size={12} style={{ marginRight: 4 }} />
                        )}
                        {conversion.status}
                      </span>
                    </div>
                    <div className="conversion-item-meta">
                      <span className="conversion-item-platform">
                        {conversion.platformIcon}
                        {conversion.platform}
                      </span>
                      <span className="conversion-item-timestamp">
                        <Clock size={14} style={{ marginRight: 4 }} />
                        {conversion.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h4 className="dashboard-card-title">Quick Actions</h4>
            <span className="badge badge-md badge-neutral">Tips</span>
          </div>
          <div className="dashboard-card-content">
            <div className="layout-list">
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>📝</span>
                Create new content
              </button>
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>🔄</span>
                Regenerate previous
              </button>
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>📊</span>
                View analytics
              </button>
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>📋</span>
                View templates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription & Usage Panel */}
      <div style={{ marginTop: 'var(--sys-spacing-2xl)' }}>
        <TierUsagePanel
          currentPlan={{
            title: 'Pro Plan',
            badge: 'Active',
            description:
              'Your current plan includes 10,000 credits per month with access to all AI models and priority support.',
            features: [
              { id: '1', text: '10,000 credits/month' },
              { id: '2', text: 'All AI models (GPT-4, Claude 3, Gemini)' },
              { id: '3', text: 'Priority email support' },
              { id: '4', text: 'Advanced analytics dashboard' },
            ],
          }}
          usageStats={[
            {
              id: 'credits',
              title: 'Credits Used',
              value: '1,234',
              label: 'of 10,000 total',
              progress: 65,
            },
            {
              id: 'conversions',
              title: 'Conversions',
              value: '42',
              label: 'this month',
              progress: 42,
            },
            { id: 'success', title: 'Success Rate', value: '89%', label: 'average', progress: 89 },
          ]}
          upgradeOptions={[
            {
              id: 'enterprise',
              title: 'Enterprise',
              price: '$99',
              period: 'month',
              features: [
                { id: 'f1', text: 'Unlimited credits' },
                { id: 'f2', text: 'Custom AI models' },
                { id: 'f3', text: 'Dedicated support' },
                { id: 'f4', text: 'Team collaboration' },
              ],
              buttonText: 'Contact Sales',
            },
          ]}
          billingInfo={{
            nextBillingDate: '2025-05-14',
            paymentMethod: 'Visa **** 4242',
            billingEmail: 'john@example.com',
          }}
        />
      </div>
    </div>
  )
}

export default DashboardPage
