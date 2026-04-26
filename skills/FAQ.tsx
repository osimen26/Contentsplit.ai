import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const tokens = {
  colorBg: '#0A0A0F',
  colorSurface: '#111118',
  colorBorder: '#2A2A38',
  colorAccent: '#6C63FF',
  colorTextPrimary: '#F0F0F5',
  colorTextSecondary: '#8888A0',
  colorTextMuted: '#4A4A60',
  radiusMd: '12px',
}

const faqs = [
  {
    question: 'Does ContentSplit work with any blog post?',
    answer: 'Yes. Paste raw text or a URL. It works with Substack, Medium, WordPress, Ghost, or plain Google Docs exports.',
  },
  {
    question: 'Will the output actually sound like me?',
    answer: 'ContentSplit uses your original post\'s vocabulary and sentence structure as a reference. The more specific and human your writing, the better the outputs.',
  },
  {
    question: 'Can I edit the outputs before I publish?',
    answer: 'Every output is editable inline. ContentSplit generates a starting draft — you always have the final say.',
  },
  {
    question: 'What platforms are supported?',
    answer: 'Twitter/X threads, LinkedIn posts, Instagram captions, newsletter intros, YouTube script hooks, and blog summaries. More formats are in the roadmap.',
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes. 5 repurposes per day, no credit card required. Upgrade anytime for unlimited access.',
  },
  {
    question: 'What happens to my content after I paste it?',
    answer: 'Your content is used only to generate the outputs in your session. We don\'t train on user data, and nothing is stored after your session ends.',
  },
]

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: tokens.colorSurface,
    padding: '96px 24px',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  headline: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    color: tokens.colorTextPrimary,
    textAlign: 'center',
    marginBottom: '48px',
  },
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  item: {
    background: tokens.colorBg,
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: tokens.radiusMd,
    overflow: 'hidden',
  },
  questionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    cursor: 'pointer',
    gap: '16px',
  },
  question: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: tokens.colorTextPrimary,
    flex: 1,
  },
  chevron: {
    transition: 'transform 0.2s ease',
    flexShrink: 0,
  },
  answer: {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
  },
  answerText: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '15px',
    color: tokens.colorTextSecondary,
    lineHeight: 1.6,
    padding: '0 20px 20px',
  },
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.headline}>
          Questions worth answering.
        </h2>

        <div style={styles.accordion}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={styles.item}
              className="cs-faq-item"
            >
              <div
                style={styles.questionRow}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="cs-faq-question"
              >
                <span style={styles.question}>{faq.question}</span>
                <ChevronDown
                  size={20}
                  color={tokens.colorTextMuted}
                  style={{
                    ...styles.chevron,
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </div>
              <div
                style={{
                  ...styles.answer,
                  maxHeight: openIndex === i ? '200px' : '0',
                }}
              >
                <p style={styles.answerText}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cs-faq-item:hover {
          border-color: ${tokens.colorAccent}40 !important;
        }
        .cs-faq-question:hover {
          background: ${tokens.colorSurface};
        }
      `}</style>
    </section>
  )
}

export default FAQ