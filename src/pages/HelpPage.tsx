import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, ChevronDown, ChevronRight, BookOpen, CreditCard, Zap, Settings, MessageCircle, Mail } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to use ContentSplit to repurpose your content.',
    icon: <BookOpen size={24} />,
    color: '#6366f1',
    articleCount: 5,
    articles: [
      {
        id: 'gs-1',
        title: 'How does ContentSplit work?',
        body: 'Paste your blog post, article, or long-form content into the input field on the dashboard. Select your target platforms (Twitter/X, LinkedIn, Facebook, Instagram, Newsletter) and choose a tone that suits your brand. Click Generate and ContentSplit will instantly repurpose your content for each selected platform using AI.',
      },
      {
        id: 'gs-2',
        title: 'What platforms are supported?',
        body: 'ContentSplit currently supports: Twitter/X threads, LinkedIn articles & posts, Facebook posts, Instagram captions (with hashtag suggestions), Newsletter intros, and Blog summaries. We are continuously adding more platforms — stay tuned!',
      },
      {
        id: 'gs-3',
        title: 'How do I choose a tone?',
        body: 'After pasting your content and selecting your platforms, you will see a Tone selector. Choose from Casual (friendly, conversational), Professional (business-ready), Witty (playful with personality), or Educational (clear and informative). The AI will adapt the generated output to match your chosen tone.',
      },
      {
        id: 'gs-4',
        title: 'Can I edit the generated content?',
        body: 'Yes! Every generated output is fully editable. Simply click on the text inside any generated output card and start typing. Your edits are reflected live and do not consume any additional conversions.',
      },
      {
        id: 'gs-5',
        title: 'Is my content secure?',
        body: 'Your privacy is important to us. ContentSplit processes your content to generate outputs but does not store it long-term. All data is encrypted in transit and at rest, and we never sell or share your content with third parties.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    description: 'Understand your plan, limits, and manage your subscription.',
    icon: <CreditCard size={24} />,
    color: '#10b981',
    articleCount: 4,
    articles: [
      {
        id: 'b-1',
        title: 'What is included in the Free plan?',
        body: 'The Free plan gives you 5 content conversions per day. You have access to all supported platforms and tone options. It is a great way to get started and experience the power of ContentSplit before upgrading.',
      },
      {
        id: 'b-2',
        title: 'What does the Pro plan include?',
        body: 'The Pro plan ($15/month) includes unlimited daily conversions, priority AI processing, advanced tone matching, and early access to new platform integrations. It is perfect for content creators and marketing professionals who publish daily.',
      },
      {
        id: 'b-3',
        title: 'How do I upgrade my plan?',
        body: 'Click the "Upgrade" button in the bottom-left sidebar, or navigate to Settings > Billing. You will be taken to our secure payment page where you can enter your card details. Upgrades take effect immediately after payment.',
      },
      {
        id: 'b-4',
        title: 'How do I cancel my subscription?',
        body: 'You can cancel anytime by going to Settings > Billing and clicking "Cancel Plan". Your Pro access will continue until the end of your current billing period. We do not offer refunds for partial months, but you will never be charged again after cancellation.',
      },
    ],
  },
  {
    id: 'platform-tips',
    title: 'Platform Best Practices',
    description: 'Tips and tricks to get the best results on each platform.',
    icon: <Zap size={24} />,
    color: '#f59e0b',
    articleCount: 5,
    articles: [
      {
        id: 'pt-1',
        title: 'Tips for Twitter/X',
        body: 'Twitter/X has a 280-character limit per tweet. ContentSplit automatically formats long content into threads. For best engagement: ask a question in the first tweet, use 1–2 relevant hashtags (not more), keep each tweet as a standalone thought, and always include a clear call-to-action in the final tweet.',
      },
      {
        id: 'pt-2',
        title: 'Tips for LinkedIn',
        body: 'LinkedIn favors long-form, professional content. Use line breaks to make posts scannable, start with a strong hook in the first line (it appears before the "see more" cutoff), and share personal stories or lessons learned. Posts between 1,500–2,000 characters tend to perform best.',
      },
      {
        id: 'pt-3',
        title: 'Tips for Instagram',
        body: 'Instagram captions work best when they are short and punchy, with the most important text in the first two lines. ContentSplit will suggest up to 30 hashtags — mixing high-volume and niche hashtags gives the best reach. Always end with a clear CTA like "Link in bio".',
      },
      {
        id: 'pt-4',
        title: 'Tips for Facebook',
        body: 'Facebook rewards content that sparks conversation. Keep your posts conversational and end with an open question. Emojis can improve readability but do not overdo it. Facebook posts with 40–80 characters get 86% higher engagement, so keep it concise even though the limit is much higher.',
      },
      {
        id: 'pt-5',
        title: 'Tips for Newsletters',
        body: 'A great newsletter intro hooks the reader in the first sentence. ContentSplit generates a compelling opening paragraph designed to keep subscribers reading. Make sure your subject line (written separately) matches the tone of your intro. Always include one primary CTA per newsletter.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Your Account',
    description: 'Manage your profile, password, and preferences.',
    icon: <Settings size={24} />,
    color: '#8b5cf6',
    articleCount: 3,
    articles: [
      {
        id: 'acc-1',
        title: 'How do I update my profile?',
        body: 'Go to Settings > General to update your display name, nickname, and personal content preferences. These preferences help ContentSplit tailor the AI outputs to better reflect your style. Click "Save changes" when done.',
      },
      {
        id: 'acc-2',
        title: 'How do I change my password?',
        body: 'Go to Settings > Password. Enter your current password, then your new password (minimum 8 characters), and confirm it. Click "Update password" to save. If you have forgotten your current password, use the "Forgot password" link on the login page to reset it via email.',
      },
      {
        id: 'acc-3',
        title: 'How do I delete my account?',
        body: 'Account deletion is permanent and cannot be undone. To delete your account, go to Settings > Danger Zone and click "Delete account". You will be asked to confirm before anything is removed. All your content, conversions, and data will be permanently erased.',
      },
    ],
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

const Accordion: React.FC<{ article: { id: string; title: string; body: string } }> = ({ article }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#111', lineHeight: 1.4 }}>
          {article.title}
        </span>
        <ChevronDown
          size={18}
          style={{
            flexShrink: 0,
            color: '#888',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
      </button>
      {open && (
        <div style={{
          paddingBottom: 20,
          fontSize: '0.9rem',
          color: '#555',
          lineHeight: 1.7,
        }}>
          {article.body}
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const HelpPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCollection, setActiveCollection] = useState<string | null>(null)

  const activeCol = COLLECTIONS.find(c => c.id === activeCollection)

  const searchResults = searchQuery
    ? COLLECTIONS.flatMap(col =>
        col.articles
          .filter(a =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.body.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(a => ({ ...a, collectionTitle: col.title, collectionId: col.id }))
      )
    : []

  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* Top nav */}
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button
          onClick={() => activeCollection ? setActiveCollection(null) : navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            color: '#555',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#111'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}
        >
          <ArrowLeft size={18} />
          {activeCollection ? 'All Collections' : 'Back to Dashboard'}
        </button>

        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#111', letterSpacing: '-0.01em' }}>
          ContentSplit Help Center
        </span>

        <div style={{ width: 140 }} /> {/* spacer */}
      </header>

      {/* Hero */}
      {!activeCollection && (
        <div style={{
          padding: '64px 40px 48px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: 'white',
        }}>
          <p style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Help Center
          </p>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#111', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            How can we help?
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#666', marginBottom: 32 }}>
            Advice and answers from the ContentSplit team
          </p>

          {/* Search */}
          <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                fontSize: '0.95rem',
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: 10,
                outline: 'none',
                backgroundColor: '#fafafa',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--sys-color-primary-40, #6366f1)'
                e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(0,0,0,0.12)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 40px 80px' }}>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 24 }}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<strong style={{ color: '#111' }}>{searchQuery}</strong>"
            </p>
            {searchResults.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                <p style={{ fontSize: '1rem' }}>No articles found. Try a different search term.</p>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                {searchResults.map((article, i) => (
                  <button
                    key={article.id}
                    onClick={() => { setSearchQuery(''); setActiveCollection(article.collectionId) }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 24px',
                      borderBottom: i < searchResults.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div>
                      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>{article.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#888' }}>{article.collectionTitle}</p>
                    </div>
                    <ChevronRight size={16} style={{ color: '#ccc', flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collections Grid */}
        {!searchQuery && !activeCollection && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}>
              {COLLECTIONS.map(col => (
                <button
                  key={col.id}
                  onClick={() => setActiveCollection(col.id)}
                  style={{
                    textAlign: 'left',
                    padding: '28px 24px',
                    backgroundColor: 'white',
                    border: '1px solid rgba(0,0,0,0.07)',
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    backgroundColor: `${col.color}15`,
                    color: col.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {col.icon}
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 600, color: '#111' }}>{col.title}</p>
                    <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>{col.description}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa', fontWeight: 500 }}>
                      {col.articleCount} article{col.articleCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Contact Section */}
            <div style={{
              marginTop: 48,
              padding: '36px',
              backgroundColor: 'white',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}>
              <div>
                <h2 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 600, color: '#111' }}>
                  Still need help?
                </h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                  Our team is here to help you get the most out of ContentSplit.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="mailto:support@contentsplit.ai"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px',
                    backgroundColor: 'var(--sys-color-primary-40, #6366f1)',
                    color: 'white',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <Mail size={16} />
                  Email Support
                </a>
                <a
                  href="https://discord.gg/contentsplit"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px',
                    backgroundColor: '#f4f4f5',
                    color: '#333',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <MessageCircle size={16} />
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Collection Detail View */}
        {!searchQuery && activeCollection && activeCol && (
          <div>
            {/* Collection Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
              <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                backgroundColor: `${activeCol.color}15`,
                color: activeCol.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {activeCol.icon}
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>
                  {activeCol.title}
                </h1>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#666' }}>
                  {activeCol.description}
                </p>
              </div>
            </div>

            {/* Articles Accordion */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 12,
              padding: '0 24px',
            }}>
              {activeCol.articles.map(article => (
                <Accordion key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HelpPage