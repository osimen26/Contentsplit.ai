import React, { useState } from 'react'
import { HelpCircle, MessageCircle, Mail, Zap, Send, Hash, Target, Sparkles, ChevronDown, Search, FileText, Clock, CreditCard, Shield, Sparkles as SparklesIcon, ArrowRight } from 'lucide-react'

const FAQ_TOPICS = [
  { id: 'general', label: 'General', icon: <HelpCircle size={18} />, questions: [
    { q: 'How does ContentSplit work?', a: 'Paste your blog post, article, or long-form content into the input. Select your target platforms (Twitter, LinkedIn, Facebook, Instagram, Newsletter) and choose a tone. Click Generate to instantly repurpose your content for each platform.' },
    { q: 'What platforms are supported?', a: 'We support Twitter/X threads, Facebook posts, LinkedIn articles, Instagram captions, Newsletter intros, and blog summaries. More platforms are coming soon!' },
    { q: 'Is my content secure?', a: 'Absolutely. We don\'t store your content longer than necessary for generation. Your data is encrypted and never shared with third parties.' },
  ]},
  { id: 'billing', label: 'Billing', icon: <CreditCard size={18} />, questions: [
    { q: 'How many conversions do I get?', a: 'Free tier: 10/month. Pro tier: 100/month. Agency tier: Unlimited.' },
    { q: 'Can I upgrade anytime?', a: 'Yes! Click Upgrade in the header to change your plan. Changes take effect immediately.' },
    { q: 'How do I cancel?', a: 'Go to Settings > Billing > Cancel Plan. Your access continues until the end of your billing period.' },
  ]},
  { id: 'content', label: 'Content', icon: <FileText size={18} />, questions: [
    { q: 'Can I edit generated content?', a: 'Yes! Click directly on any generated content to edit before copying. Your edits are auto-saved.' },
    { q: 'How do I change the tone?', a: 'After pasting your content, select your desired tone from Casual, Professional, Witty, or Educational.' },
    { q: 'What counts as a conversion?', a: 'Each time you generate content for a platform counts as one conversion. Editing doesn\'t use conversions.' },
  ]},
]

const PLATFORM_TIPS = [
  { id: 'twitter', title: 'Twitter/X', color: '#1DA1F2', icon: <Hash size={20} />, tips: ['Keep it under 280 characters', 'Use threads for longer content', 'Add clear CTAs', 'Include 1-2 relevant hashtags', 'Ask questions to drive engagement'] },
  { id: 'linkedin', title: 'LinkedIn', color: '#0A66C2', icon: <Target size={20} />, tips: ['Professional tone works best', 'Use line breaks for readability', 'Add a call-to-action', '3000 character limit', 'Share personal stories'] },
  { id: 'facebook', title: 'Facebook', color: '#1877F2', icon: <MessageCircle size={20} />, tips: ['Keep it conversational', 'Use emojis sparingly', 'Ask engagement questions', '63,206 character limit', 'Add photos when possible'] },
  { id: 'instagram', title: 'Instagram', color: '#E4405F', icon: <Sparkles size={20} />, tips: ['Use all 30 hashtags', 'Keep captions short', 'First line is crucial', 'Add CTAs at end', 'Mix with stories'] },
  { id: 'newsletter', title: 'Newsletter', color: '#6B61E7', icon: <Send size={20} />, tips: ['Hook readers immediately', 'Keep it scannable', 'One CTA max', 'Personal tone works', 'Write a great subject line'] },
]

const QUICK_HELP = [
  { id: 'faq', title: 'FAQs', desc: 'Find answers to common questions', icon: <HelpCircle size={24} />, color: '#6B61E7' },
  { id: 'tips', title: 'Platform Tips', desc: 'Best practices for each platform', icon: <Zap size={24} />, color: '#0B87C1' },
  { id: 'contact', title: 'Contact Us', desc: 'Get help from our team', icon: <Mail size={24} />, color: '#22C35D' },
]

const HelpPage: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState('general')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredQuestions = searchQuery 
    ? FAQ_TOPICS.flatMap(t => t.questions.filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase())).map(q => ({ ...q, topic: t.id })))
    : []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sys-color-neutral-99)' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'var(--sys-color-primary)', 
        padding: '48px 24px 64px',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: '0 0 12px', fontSize: '2rem', fontWeight: 700, color: 'white' }}>
          How can we help?
        </h1>
        <p style={{ margin: 0, fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto' }}>
          Search for answers or browse topics below
        </p>
        
        {/* Search Box */}
        <div style={{ 
          maxWidth: 560, 
          margin: '24px auto 0', 
          position: 'relative',
        }}>
          <Search size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--sys-color-neutral-50)' }} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 16px 16px 48px',
              fontSize: '1rem',
              borderRadius: 12,
              border: 'none',
              outline: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div style={{ maxWidth: 700, margin: '-24px auto 32px', padding: '0 24px' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 600 }}>
              {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} found
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredQuestions.map((faq, i) => (
                <div key={i} style={{ padding: 16, background: 'var(--sys-color-neutral-98)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>{faq.q}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--sys-color-neutral-50)' }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Links - Only show when not searching */}
      {!searchQuery && (
        <div style={{ maxWidth: 900, margin: '-24px auto 32px', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {QUICK_HELP.map(item => (
              <div 
                key={item.id}
                className="quick-help-card"
                style={{ 
                  background: 'white', 
                  borderRadius: 20, 
                  padding: 28, 
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                }}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div style={{ 
                  width: 56, height: 56, borderRadius: 16, 
                  background: `${item.color}15`, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: item.color,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 600 }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--sys-color-neutral-50)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {!searchQuery && (
        <section id="faq" style={{ maxWidth: 800, margin: '0 auto 48px', padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Frequently Asked Questions</h2>
          
          {/* Topic Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {FAQ_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  background: activeTopic === topic.id ? 'var(--sys-color-primary)' : 'white',
                  color: activeTopic === topic.id ? 'white' : 'var(--sys-color-neutral-60)',
                  transition: 'all 0.2s',
                }}
              >
                {topic.icon}
                {topic.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ_TOPICS.find(t => t.id === activeTopic)?.questions.map((faq, i) => (
              <div 
                key={i}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--sys-color-neutral-20)',
                  }}
                >
                  {faq.q}
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.2s',
                      color: 'var(--sys-color-neutral-40)',
                      flexShrink: 0,
                    }} 
                  />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.95rem', color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Platform Tips Section */}
      {!searchQuery && (
        <section id="tips" style={{ maxWidth: 1000, margin: '0 auto 48px', padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Platform-Specific Tips</h2>
          <p style={{ fontSize: '1rem', color: 'var(--sys-color-neutral-50)', textAlign: 'center', marginBottom: 32 }}>
            Get the most out of your content on each platform
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PLATFORM_TIPS.map(platform => (
              <div 
                key={platform.id}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ 
                    width: 48, height: 48, borderRadius: 14, 
                    background: platform.color, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white',
                  }}>
                    {platform.icon}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{platform.title}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {platform.tips.map((tip, j) => (
                    <li 
                      key={j} 
                      style={{ 
                        padding: '8px 0', 
                        fontSize: '0.9rem', 
                        color: 'var(--sys-color-neutral-60)',
                        borderBottom: j < platform.tips.length - 1 ? '1px solid var(--sys-color-neutral-90)' : 'none',
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                      }}
                    >
                      <span style={{ color: platform.color, fontSize: '0.75rem', marginTop: 2 }}>•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      {!searchQuery && (
        <section id="contact" style={{ maxWidth: 800, margin: '0 auto 64px', padding: '0 24px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--sys-color-primary) 0%, #8B5CF6 100%)', 
            borderRadius: 24, 
            padding: 48, 
            textAlign: 'center',
            color: 'white',
          }}>
            <SparklesIcon size={40} style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>Still need help?</h2>
            <p style={{ fontSize: '1rem', marginBottom: 24, opacity: 0.9 }}>
              Our support team is here to assist you
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a 
                href="mailto:support@contentsplit.ai"
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', 
                  background: 'white', 
                  color: 'var(--sys-color-primary)', 
                  borderRadius: 12, 
                  textDecoration: 'none', 
                  fontWeight: 600,
                  transition: 'transform 0.2s',
                }}
              >
                <Mail size={18} />
                Email Support
              </a>
              <a 
                href="https://discord.gg/contentsplit"
                target="_blank"
                rel="noopener"
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  borderRadius: 12, 
                  textDecoration: 'none', 
                  fontWeight: 600,
                  transition: 'transform 0.2s',
                }}
              >
                <MessageCircle size={18} />
                Join Discord
              </a>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .quick-help-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important;
        }
        .quick-help-card:active {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}

export default HelpPage