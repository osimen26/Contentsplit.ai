import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import {
  ArrowRight, Mail, FileText, List,
  Menu, X, Copy, Zap, ChevronDown, Star, Check
} from 'lucide-react'
import { Logo } from '@components/application'
import '../styles/landing.css'

const tokens = {
  colorBg: 'var(--sys-color-neutral-99)',
  colorSurface: 'var(--sys-color-neutral-100)',
  colorSurface2: 'var(--sys-color-neutral-95)',
  colorBorder: 'var(--sys-color-neutral-90)',
  colorAccent: 'var(--sys-color-primary)',
  colorTextPrimary: 'var(--sys-color-neutral-10)',
  colorTextSecondary: 'var(--sys-color-neutral-50)',
  colorTextMuted: 'var(--sys-color-neutral-60)',
  colorWhite: '#FFFFFF',
  radiusSm: 'var(--sys-radius-sm)',
  radiusMd: 'var(--sys-radius-md)',
  radiusLg: 'var(--sys-radius-lg)',
  radiusPill: 'var(--sys-radius-full)',
}

const landingIcons = {
  Twitter: ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Instagram: ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  Youtube: ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M23.498 6.186a3.013 3.013 0 00-2.182-2.186C19.791 3 12 3 12 3s-7.791 0-9.316.762A3.013 3.013 0 00.492 6.186C0 8.07 0 12 0 12s0 3.93.492 5.814a3.013 3.013 0 002.182 2.186C4.209 20.268 12 20.268 12 20.268s7.791 0 9.316-.762a3.013 3.013 0 002.182-2.186C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Facebook: ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.955 10.125 11.884v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.952H17.945c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.028 24 18.062 24 12.073z" />
    </svg>
  ),
}

const platformTabs = [
  { id: 'twitter', label: 'Twitter/X', icon: landingIcons.Twitter, active: true },
  { id: 'linkedin', label: 'LinkedIn', icon: landingIcons.Linkedin },
  { id: 'instagram', label: 'Instagram', icon: landingIcons.Instagram },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
  { id: 'summary', label: 'Summary', icon: List },
]

const mockTweets = [
  '🌟 Just discovered the secret to 10x content creation',
  'Most creators spend hours repurposing one piece of content. Here is the better way:',
  '1. Write once 2. Auto-distribute 3. Never repeat yourself',
  'Your time is worth more than editing AI outputs.',
  'The future of content is one-click everywhere. 🚀',
]

const formats = [
  { id: 'twitter', icon: landingIcons.Twitter, label: 'Twitter/X', color: '#1DA1F2', format: 'Thread', description: 'Engaging thread with hooks and CTAs', stats: '280 chars · 5-10 tweets' },
  { id: 'linkedin', icon: landingIcons.Linkedin, label: 'LinkedIn', color: '#0A66C2', format: 'Post', description: 'Professional thought leadership post', stats: 'Professional tone · 3000 chars' },
  { id: 'facebook', icon: landingIcons.Facebook, label: 'Facebook', color: '#1877F2', format: 'Post', description: 'Engaging post for your audience', stats: 'Community focus · 63206 chars' },
  { id: 'instagram', icon: landingIcons.Instagram, label: 'Instagram', color: '#E1306C', format: 'Caption', description: 'Scroll-stopping caption with hashtags', stats: '2200 chars · 30 hashtags' },
  { id: 'newsletter', icon: Mail, label: 'Newsletter', color: '#EA4335', format: 'Email', description: 'Email-ready section with subject line', stats: 'Subject line + opening paragraph' },
  { id: 'summary', icon: FileText, label: 'Summary', color: '#6B61E7', format: 'TL;DR', description: 'Quick summary for busy readers', stats: '3-5 bullet points' },
]

const steps = [
  { step: 1, title: 'Paste your content', description: 'Drop in your blog post URL or paste the full text. ContentSplit reads it and understands the key ideas, tone, and structure.', icon: FileText },
  { step: 2, title: 'Choose your platforms', description: 'Pick which formats you need — one or all six. ContentSplit generates each one separately, tailored to each platform.', icon: Zap },
  { step: 3, title: 'Copy and publish', description: 'Each output is editable before you copy. Tweak the tone, swap out phrases, and publish directly.', icon: Copy },
]

const testimonials = [
  { quote: "I write one post a week and now it shows up everywhere. Saves me 3 hours minimum.", author: 'Adaeze O.', role: 'Content Strategist' },
  { quote: "The LinkedIn output is scary good. It doesn't sound like AI. That's rare.", author: 'Marcus T.', role: 'Indie Hacker & Newsletter Writer' },
  { quote: "I use it for every Substack issue. Twitter thread → newsletter intro → Instagram caption. Done.", author: 'Priya K.', role: 'Growth Marketer at a B2B SaaS' },
]

const faqs = [
  { question: 'Does ContentSplit work with any blog post?', answer: 'Yes. Paste raw text or a URL. It works with Substack, Medium, WordPress, Ghost, or plain Google Docs exports.' },
  { question: 'Will the output actually sound like me?', answer: "ContentSplit uses your original post's vocabulary and sentence structure as a reference. The more specific and human your writing, the better the outputs." },
  { question: 'Can I edit the outputs before I publish?', answer: 'Every output is editable inline. ContentSplit generates a starting draft — you always have the final say.' },
  { question: 'What platforms are supported?', answer: 'Twitter/X threads, Facebook posts, LinkedIn posts, Instagram captions, newsletter intros, and blog summaries. More formats are in the roadmap.' },
  { question: 'Is there a free plan?', answer: 'Yes. 5 repurposes per day, no credit card required. Upgrade anytime for unlimited access.' },
  { question: 'What happens to my content after I paste it?', answer: 'Your content is used only to generate the outputs in your session. We do not train on user data, and nothing is stored after your session ends.' },
]

const plans = [
  { name: 'Free', price: '$0', period: '/month', subtitle: 'For creators just getting started', features: ['5 repurposes per day', 'Twitter, Facebook, LinkedIn, Instagram', 'Copy-to-clipboard export', 'Basic editor'], cta: 'Get started free', popular: false },
  { name: 'Pro', price: '$12', period: '/month', subtitle: 'For creators ready to scale', features: ['Unlimited repurposes', 'All 6 output formats', 'Batch mode (up to 10 posts)', 'Inline editor + version history', 'Priority AI generation', 'Early access to new formats'], cta: 'Start Pro free', popular: true },
  { name: 'Agency', price: '$49', period: '/month', subtitle: 'For teams and content agencies', features: ['Unlimited team members', 'Custom brand templates', 'API access', 'Dedicated support', 'Advanced analytics', 'White-label reports'], cta: 'Contact sales', popular: false },
]

const socialLogos = ['Indie Hackers', 'Product Hunt', 'Growth.design', 'Beehiiv', 'Substack']

const LandingPage: React.FC = () => {
  const { user, isLoading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('twitter')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [demoInput, setDemoInput] = useState('')
  const [demoOutput, setDemoOutput] = useState<string[]>([])
  const [demoLoading, setDemoLoading] = useState(false)
const [demoCopied, setDemoCopied] = useState(false)

const ToneAwarenessIcon = ({ size, color }: { size?: number; color?: string }) => <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
const BatchModeIcon = ({ size, color }: { size?: number; color?: string }) => <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill={color}><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
const EditBeforeExportIcon = ({ size, color }: { size?: number; color?: string }) => <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill={color}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>

const FEATURES = [
  { title: 'Tone Awareness', icon: ToneAwarenessIcon, iconColor: '#6B61E7', headline: 'It writes like you, not like a robot.', description: 'ContentSplit preserves your unique voice across every platform.', stats: '5 platform tones', visual: 'comparison' },
  { title: 'Batch Mode', icon: BatchModeIcon, iconColor: '#0B87C1', headline: 'Run a whole content calendar in one session.', description: 'Queue multiple articles and process them all at once.', stats: 'Up to 10 articles/batch', visual: 'queue' },
  { title: 'Edit Before Export', icon: EditBeforeExportIcon, iconColor: '#22C35D', headline: 'Every output is a starting point, not a final draft.', description: 'Edit directly in the app before exporting.', stats: 'Auto-saved edits', visual: 'editor' },
]

useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      :root {
        --sys-color-primary: #6B61E7;
        --sys-color-primary-rgb: 107, 97, 231;
        --sys-color-secondary: #0B87C1;
        --sys-color-neutral: #858993;
        --sys-color-neutral-10: #1A1D23;
        --sys-color-neutral-20: #24272E;
        --sys-color-neutral-30: #32363E;
        --sys-color-neutral-40: #464A53;
        --sys-color-neutral-50: #5E636E;
        --sys-color-neutral-60: #858993;
        --sys-color-neutral-70: #93979F;
        --sys-color-neutral-80: #AEB1B7;
        --sys-color-neutral-90: #CDD0D5;
        --sys-color-neutral-95: #E3E4E8;
        --sys-color-neutral-98: #F1F2F4;
        --sys-color-neutral-99: #F9FAFB;
        --sys-color-neutral-100: #FFFFFF;
        --sys-radius-sm: 6px;
        --sys-radius-md: 12px;
        --sys-radius-lg: 20px;
        --sys-radius-full: 999px;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: var(--sys-color-neutral-99); color: var(--sys-color-neutral-10); font-family: 'Inter', sans-serif; }

      /* Color opacity utilities for testing - use hex + 2 digit alpha */
      /* Twitter/X blue: #1DA1F2 */
      /* LinkedIn blue: #0A66C2 */
      /* Instagram pink: #E1306C */
      /* Newsletter red: #EA4335 */
      /* YouTube red: #FF0000 */
      /* Purple accent: #6B61E7 */

      /* Color opacity format: #RRGGBBAA where AA is hex 
         05 = 5/255 = ~2% | 08 = 3% | 10 = 6% | 15 = 8% | 20 = 12% | 30 = 19% | 50 = 31%
      */

      /* Base animations */
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(107, 97, 231, 0.4); }
        50% { box-shadow: 0 0 0 10px rgba(107, 97, 231, 0); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }
      @keyframes accordionOpen {
        from { max-height: 0; opacity: 0; }
        to { max-height: 200px; opacity: 1; }
      }

      /* Section styling */
      .lp-section { padding: 96px 24px; }
      .lp-container { max-width: 1200px; margin: 0 auto; }
      .lp-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sys-color-primary); }
      .lp-headline { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: clamp(2rem, 5vw, 3rem); color: var(--sys-color-neutral-10); }
      .lp-subtext { font-size: 1.1rem; color: var(--sys-color-neutral-50); line-height: 1.6; }
      .lp-card { background: var(--sys-color-neutral-100); border: 1px solid var(--sys-color-neutral-90); border-radius: var(--sys-radius-lg); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      
      /* Social bounce animation - staggered gentle bounce */
      .lp-social-bounce { 
        animation: bounce 2s ease-in-out infinite; 
      }
      
      /* Floating hero icons */
      .lp-float-icon {
        animation: floatIcon 6s ease-in-out infinite;
      }
      @keyframes floatIcon {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(3deg); }
        50% { transform: translateY(-5px) rotate(-2deg); }
        75% { transform: translateY(-12px) rotate(2deg); }
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-6px); }
        50% { transform: translateY(-3px); }
        70% { transform: translateY(-4px); }
        85% { transform: translateY(-1px); }
      }

      /* Hero animations - enhanced page load */
      .lp-hero-content > * { 
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        opacity: 0; 
        transform: translateY(30px);
      }
      .lp-hero-content > *:nth-child(1) { animation-delay: 0ms; }
      .lp-hero-content > *:nth-child(2) { animation-delay: 100ms; }
      .lp-hero-content > *:nth-child(3) { animation-delay: 200ms; }
      .lp-hero-content > *:nth-child(4) { animation-delay: 300ms; }
      .lp-hero-content > *:nth-child(5) { animation-delay: 400ms; }
      .lp-hero-mockup { 
        animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards, float 6s ease-in-out infinite; 
        animation-delay: 600ms, 1600ms; 
        opacity: 0; 
        transform: translateY(40px) scale(0.95);
        transform-origin: center center;
      }

      /* Hero background effect */
      .lp-hero-bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .lp-hero-bg::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(ellipse at 30% 20%, rgba(107, 97, 231, 0.08) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 80%, rgba(11, 135, 193, 0.06) 0%, transparent 50%);
        animation: heroGlow 8s ease-in-out infinite alternate;
      }
      @keyframes heroGlow {
        0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        100% { transform: translate(-5%, -5%) scale(1.1); opacity: 1; }
      }

      /* Floating elements in hero */
      .lp-float-1, .lp-float-2, .lp-float-3 {
        position: absolute;
        border-radius: 50%;
        filter: blur(40px);
        animation: floatBlob 10s ease-in-out infinite;
        opacity: 0;
        animation-fill-mode: forwards;
      }
      .lp-float-1 {
        width: 300px; height: 300px;
        background: rgba(107, 97, 231, 0.12);
        top: 10%; right: 10%;
        animation-delay: 1200ms;
      }
      .lp-float-2 {
        width: 200px; height: 200px;
        background: rgba(11, 135, 193, 0.1);
        bottom: 20%; left: 5%;
        animation-delay: 1400ms;
        animation-duration: 12s;
      }
      .lp-float-3 {
        width: 150px; height: 150px;
        background: rgba(107, 97, 231, 0.08);
        top: 50%; left: 30%;
        animation-delay: 1600ms;
        animation-duration: 14s;
      }
      @keyframes floatBlob {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(20px, -30px) rotate(5deg); }
        50% { transform: translate(-10px, 20px) rotate(-3deg); }
        75% { transform: translate(15px, 10px) rotate(2deg); }
      }

      /* Scroll-triggered reveal animations */
      .lp-reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .lp-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Hero text gradient - solid color instead */
      .lp-hero-gradient {
        color: var(--sys-color-primary);
      }

      /* CTA button pulse ring */
      .lp-btn-ring {
        position: absolute;
        inset: -4px;
        border-radius: inherit;
        border: 2px solid var(--sys-color-primary);
        opacity: 0;
        animation: btnRing 2s ease-out infinite;
      }
      @keyframes btnRing {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.15); opacity: 0; }
      }

      /* Card hover effects */
      .lp-card:hover { border-color: var(--sys-color-primary); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(107, 97, 231, 0.12); }
      
      /* Button animations */
      .lp-btn { position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .lp-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); background-size: 200% 100%; opacity: 0; transition: opacity 0.3s; }
      .lp-btn:hover::before { opacity: 1; animation: shimmer 1.5s infinite; }
      .lp-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(107, 97, 231, 0.25); }
      .lp-btn:active { transform: translateY(0); }

      /* Nav animations */
      .lp-nav { transition: all 0.3s ease; }
      .lp-nav-link { position: relative; }
      .lp-nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--sys-color-primary); transition: width 0.3s ease; }
      .lp-nav-link:hover::after { width: 100%; }

      /* FAQ accordion */
      .lp-faq-item { overflow: hidden; transition: all 0.3s ease; }
      .lp-faq-item:hover { border-color: var(--sys-color-primary-70); }
      .lp-faq-content { transition: max-height 0.3s ease, opacity 0.3s ease; }

      /* Feature row animations */
      .lp-feature-row { opacity: 0; animation: fadeInUp 0.6s ease forwards; }
      .lp-feature-row:nth-child(2) { animation-delay: 150ms; }
      .lp-feature-row:nth-child(3) { animation-delay: 300ms; }

      /* Stacked feature cards */
      .lp-feature-stack { perspective: 1000px; }
      .lp-feature-card:hover { transform: translateY(-8px) scale(1.02) !important; opacity: 1 !important; z-index: 100 !important; }

      /* Testimonial card stagger */
      .lp-testimonial { opacity: 0; animation: fadeInUp 0.6s ease forwards; }
      .lp-testimonial:nth-child(1) { animation-delay: 0ms; }
      .lp-testimonial:nth-child(2) { animation-delay: 150ms; }
      .lp-testimonial:nth-child(3) { animation-delay: 300ms; }

      /* Platform tabs */
      .lp-platform-tab { transition: all 0.2s ease; }
      .lp-platform-tab:hover { background: var(--sys-color-neutral-95); }
      
      /* Social proof bar */
      .lp-social-logo { transition: all 0.3s ease; }
      .lp-social-logo:hover { opacity: 1; transform: scale(1.05); }

      /* Pricing card popular */
      .lp-popular { animation: pulse 2s infinite; }

      /* Input focus */
      .lp-input { transition: all 0.2s ease; }
      .lp-input:focus { border-color: var(--sys-color-primary); box-shadow: 0 0 0 3px rgba(107, 97, 231, 0.1); }

      /* Mobile menu */
      .lp-mobile-menu { animation: fadeIn 0.3s ease; }

      /* Responsive */
      @media (max-width: 768px) { 
        .lp-grid-2 { grid-template-columns: 1fr !important; } 
        .lp-grid-3 { grid-template-columns: 1fr !important; } 
        .lp-hero-mockup { animation: none; opacity: 1; }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  if (user && !isLoading) return <Navigate to="/dashboard" replace />

  const generateDemo = async () => {
    if (!demoInput.trim()) return
    setDemoLoading(true)
    setDemoOutput([])
    try {
      const res = await fetch('/api/generate-thread', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: demoInput }) })
      const data = await res.json()
      if (data.tweets) {
        for (let i = 0; i < data.tweets.length; i++) {
          await new Promise(r => setTimeout(r, 100))
          setDemoOutput(prev => [...prev, data.tweets[i]])
        }
      }
    } catch (e) { console.error(e) }
    finally { setDemoLoading(false) }
  }

  const copyDemo = () => {
    navigator.clipboard.writeText(demoOutput.map((t, i) => `${i+1}. ${t}`).join('\n\n'))
    setDemoCopied(true)
    setTimeout(() => setDemoCopied(false), 2000)
  }

  return (
    <div className="lp-wrapper" style={{ background: tokens.colorBg, minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px' }}>Skip to content</a>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, background: `${tokens.colorBg}cc`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${tokens.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', zIndex: 1000 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--sys-color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Logo size={20} color="white" />
          </div>
          <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 20, color: tokens.colorTextPrimary }}>ContentSplit</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="lp-nav-links">
          <a href="#features" style={{ color: tokens.colorTextSecondary, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Features</a>
          <a href="#how-it-works" style={{ color: tokens.colorTextSecondary, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>How it works</a>
          <a href="#pricing" style={{ color: tokens.colorTextSecondary, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Pricing</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="lp-nav-right">
          <Link to="/login" style={{ color: tokens.colorTextSecondary, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Log in</Link>
          <Link to="/register" style={{ background: tokens.colorAccent, color: tokens.colorWhite, padding: '10px 20px', borderRadius: tokens.radiusPill, textDecoration: 'none', fontSize: 14, fontWeight: 600 }} className="lp-btn">Start free →</Link>
        </div>
        <button style={{ display: 'none', background: 'transparent', border: 'none', color: tokens.colorTextPrimary, cursor: 'pointer', padding: 8 }} className="lp-mobile-toggle" onClick={() => setMobileOpen(true)}><Menu size={24} /></button>
      </nav>

      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: `${tokens.colorBg}ee`, zIndex: 1001, padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}><button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none', color: tokens.colorTextPrimary, cursor: 'pointer' }}><X size={24}/></button></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 48 }}>
            <a href="#features" onClick={() => setMobileOpen(false)} style={{ color: tokens.colorTextPrimary, fontSize: 18, padding: '12px 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>Features</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} style={{ color: tokens.colorTextPrimary, fontSize: 18, padding: '12px 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>How it works</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} style={{ color: tokens.colorTextPrimary, fontSize: 18, padding: '12px 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>Pricing</a>
            <Link to="/login" onClick={() => setMobileOpen(false)} style={{ color: tokens.colorTextSecondary, fontSize: 16, padding: '12px 0' }}>Log in</Link>
            <Link to="/register" onClick={() => setMobileOpen(false)} style={{ background: tokens.colorAccent, color: tokens.colorWhite, padding: 14, borderRadius: tokens.radiusMd, textAlign: 'center', fontWeight: 600 }} className="lp-btn">Start free →</Link>
          </div>
        </div>
      )}

<section id="main" style={{ minHeight: '100vh', padding: '120px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        <div className="lp-hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <span className="lp-label" style={{ marginBottom: 20 }}>AI-Powered Content Repurposing</span>
          <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: tokens.colorTextPrimary, lineHeight: 1.1, maxWidth: 900, marginBottom: 24 }}>
            Turn one blog post into a week&apos;s worth of <span className="lp-hero-gradient">content</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: tokens.colorTextSecondary, maxWidth: 600, lineHeight: 1.6, margin: '0 auto 40px', textAlign: 'center' }}>
            Paste your article. ContentSplit transforms it into optimized posts for Twitter, Facebook, LinkedIn, Instagram, and newsletters — all in seconds.
          </p>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/register" style={{ background: tokens.colorAccent, color: tokens.colorWhite, padding: '16px 32px', borderRadius: tokens.radiusPill, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }} className="lp-btn">
              <span className="lp-btn-ring" />
              Start for free <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" style={{ border: `1px solid ${tokens.colorBorder}`, color: tokens.colorTextSecondary, padding: '16px 32px', borderRadius: tokens.radiusPill, textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>See how it works</a>
          </div>
          <p style={{ fontSize: 12, color: tokens.colorTextMuted, marginBottom: 40 }}>No credit card required · 5 free repurposes per day</p>
        
          {/* Supported platforms - clean aligned row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--sys-color-neutral-40)', letterSpacing: '0.05em', textTransform: 'uppercase', marginRight: 4 }}>We support</span>
            {[
              { icon: landingIcons.Twitter, color: '#1DA1F2', name: 'Twitter' },
              { icon: landingIcons.Facebook, color: '#1877F2', name: 'Facebook' },
              { icon: landingIcons.Linkedin, color: '#0A66C2', name: 'LinkedIn' },
              { icon: landingIcons.Instagram, color: '#E1306C', name: 'Instagram' },
              { icon: Mail, color: '#EA4335', name: 'Newsletter' },
            ].map((social, i) => (
              <div 
                key={social.name}
                className="lp-social-bounce"
                style={{
                  animationDelay: `${i * 150}ms`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  background: `${social.color}12`,
                  borderRadius: 10,
                  border: `1px solid ${social.color}30`,
                }}
              >
                <social.icon size={20} color={social.color} />
                <span style={{ fontSize: 13, fontWeight: 600, color: social.color }}>{social.name}</span>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 900, width: '100%' }}>
            <div className="lp-card" style={{ background: tokens.colorSurface, overflow: 'hidden', boxShadow: `0 0 80px ${tokens.colorAccent}15` }}>
              {/* Platform tabs */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${tokens.colorBorder}`, overflowX: 'auto', background: tokens.colorSurface2 }}>
                {platformTabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '16px 20px', background: 'transparent', border: 'none', borderBottom: activeTab === tab.id ? `3px solid ${tokens.colorAccent}` : '3px solid transparent', color: activeTab === tab.id ? tokens.colorAccent : tokens.colorTextMuted, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <tab.icon size={16} /> {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Preview content */}
              <div style={{ padding: 32 }}>
                {activeTab === 'twitter' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {mockTweets.map((t, i) => (
                      <div key={i} style={{ padding: '16px 20px', background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd, fontSize: 14, color: tokens.colorTextPrimary, lineHeight: 1.5 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: tokens.colorAccent, color: tokens.colorWhite, fontSize: 12, fontWeight: 700, marginRight: 12 }}>{i+1}</span>
                        {t}
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'linkedin' && (
                  <div style={{ padding: 24, background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd }}>
                    <div style={{ fontSize: 14, color: tokens.colorTextPrimary, fontWeight: 600, marginBottom: 8 }}>Marcus T.</div>
                    <div style={{ fontSize: 14, color: tokens.colorTextSecondary, lineHeight: 1.6 }}>{mockTweets[0]} {mockTweets.slice(1).join(' ')}</div>
                  </div>
                )}
                {activeTab === 'instagram' && (
                  <div style={{ padding: 24, background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--sys-color-primary)' }} />
                      <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colorTextPrimary }}>Your Account</div>
                    </div>
                    <div style={{ fontSize: 14, color: tokens.colorTextSecondary, lineHeight: 1.6 }}>{mockTweets[0].replace('🌟 ', '')}</div>
                    <div style={{ marginTop: 12, fontSize: 12, color: tokens.colorTextMuted }}>#content creation #AI #productivity</div>
                  </div>
                )}
                {activeTab === 'newsletter' && (
                  <div style={{ padding: 24, background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd }}>
                    <div style={{ fontSize: 12, color: tokens.colorTextMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: tokens.colorTextPrimary, marginBottom: 16 }}>The secret to 10x your content creation</div>
                    <div style={{ fontSize: 14, color: tokens.colorTextSecondary, lineHeight: 1.6 }}>{mockTweets[0]} {mockTweets.slice(1).join(' ')}</div>
                  </div>
                )}
                {activeTab === 'summary' && (
                  <div style={{ padding: 24, background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: tokens.colorTextPrimary, marginBottom: 16 }}>📝 Content Summary</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      <li style={{ fontSize: 14, color: tokens.colorTextSecondary, padding: '8px 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>• Key Insight: One article → multiple platforms</li>
                      <li style={{ fontSize: 14, color: tokens.colorTextSecondary, padding: '8px 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>• Framework: Write once, adapt everywhere</li>
                      <li style={{ fontSize: 14, color: tokens.colorTextSecondary, padding: '8px 0' }}>• Benefit: 10x your output</li>
                    </ul>
                  </div>
                )}
                {['newsletter', 'instagram', 'youtube'].includes(activeTab) && <div style={{ color: tokens.colorTextMuted, fontStyle: 'italic', padding: 24 }}>Preview for {activeTab}...</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: tokens.colorSurface, padding: '24px 0', borderTop: `1px solid ${tokens.colorBorder}`, borderBottom: `1px solid ${tokens.colorBorder}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: tokens.colorTextMuted, marginBottom: 16 }}>Trusted by 2,000+ creators, marketers, and content teams</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', opacity: 0.4 }}>
            {socialLogos.map((logo, i) => (<React.Fragment key={logo}><span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: tokens.colorTextMuted }}>{logo}</span>{i < socialLogos.length - 1 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: tokens.colorTextMuted }} />}</React.Fragment>))}
          </div>
        </div>
      </section>

      <section className="lp-section" style={{ background: tokens.colorBg }}>
        <div className="lp-container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="lp-label" style={{ display: 'inline-block', marginBottom: 16, padding: '6px 16px', background: 'var(--sys-color-primary)', color: 'var(--sys-color-neutral-100)', borderRadius: 'var(--sys-radius-full)', fontSize: 12, fontWeight: 600 }}>WHAT IT CREATES</span>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: tokens.colorTextPrimary, marginBottom: 16, maxWidth: 700, margin: '0 auto 16px', lineHeight: 1.2 }}>Your blog, everywhere it needs to be.</h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: tokens.colorTextSecondary, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>Paste your article. In seconds, ContentSplit generates six distinct content formats, each optimized for how people actually consume content on that platform.</p>
          </div>

          {/* Grid layout - previous design */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {formats.map((f) => (
              <div key={f.id} className="lp-card" style={{ padding: 28, position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${f.color}08 0%, var(--sys-color-neutral-100) 100%)` }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: f.color }} />
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <f.icon size={22} color={f.color} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--sys-color-neutral-50)' }}>{f.label}</span>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={14} color={f.color} />
                  </div>
                </div>
                
                <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--sys-color-neutral-10)', marginBottom: 10, letterSpacing: -0.3 }}>{f.format}</h3>
                
                <p style={{ fontSize: 14, color: 'var(--sys-color-neutral-60)', lineHeight: 1.6, marginBottom: 20, minHeight: 42 }}>{f.description}</p>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--sys-color-neutral-95)', borderRadius: 8, border: '1px solid var(--sys-color-neutral-90)' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--sys-color-neutral-40)', fontWeight: 500 }}>{f.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="lp-section" style={{ background: tokens.colorBg }}>
        <div className="lp-container" style={{ maxWidth: 900 }}>
          <span className="lp-label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>HOW IT WORKS</span>
          <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: tokens.colorTextPrimary, textAlign: 'center', marginBottom: 48 }}>Three steps. Zero friction.</h2>
          
          {/* Steps with connecting line and cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
            {/* Vertical connecting line */}
            <div style={{ position: 'absolute', left: 32, top: 80, bottom: 80, width: 2, background: 'var(--sys-color-neutral-90)', zIndex: 0 }} />
            
            {steps.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1, paddingBottom: i < 2 ? 48 : 0 }}>
                {/* Step number badge */}
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(107, 97, 231, 0.3)' }}>
                  <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 24, color: 'var(--sys-color-neutral-100)' }}>{s.step}</span>
                </div>
                
                {/* Content card */}
                <div style={{ flex: 1, background: tokens.colorSurface, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusLg, padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--sys-color-neutral-95)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <s.icon size={28} color={tokens.colorAccent} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: 18, color: tokens.colorTextPrimary, marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: tokens.colorTextSecondary, lineHeight: 1.6 }}>{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section" style={{ background: tokens.colorSurface }}>
        <div className="lp-container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: tokens.colorTextPrimary, textAlign: 'center', marginBottom: 16 }}>See it work before you sign up.</h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: tokens.colorTextSecondary, textAlign: 'center', marginBottom: 48, maxWidth: 600, margin: '0 auto' }}>No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: tokens.colorBg, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusLg, overflow: 'hidden' }} className="lp-grid-2">
            <div style={{ padding: 24, borderRight: `1px solid ${tokens.colorBorder}` }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: tokens.colorTextMuted }}>Blog excerpt</span>
              <textarea value={demoInput} onChange={e => setDemoInput(e.target.value)} placeholder="Paste a paragraph from any blog post..." style={{ width: '100%', height: 200, background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd, padding: 16, fontFamily: '"Inter", sans-serif', fontSize: 15, color: tokens.colorTextSecondary, resize: 'none', outline: 'none', marginTop: 12 }} />
              <button onClick={generateDemo} disabled={demoLoading || !demoInput.trim()} style={{ width: '100%', padding: 14, background: tokens.colorAccent, color: tokens.colorWhite, border: 'none', borderRadius: tokens.radiusMd, fontWeight: 600, cursor: demoLoading ? 'not-allowed' : 'pointer', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>{demoLoading ? 'Generating...' : <>Generate Twitter Thread → <ArrowRight size={16} /></>}</button>
            </div>
            <div style={{ padding: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: tokens.colorTextMuted }}>Generated Twitter/X Thread</span>
              {demoOutput.length > 0 ? (
                <div style={{ marginTop: 12 }}>
                  {demoOutput.map((t, i) => (
                    <div key={i} style={{ padding: '12px 16px', background: tokens.colorSurface2, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd, marginBottom: 12, fontSize: 14, color: tokens.colorTextPrimary }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: tokens.colorAccent, color: tokens.colorWhite, fontSize: 11, fontWeight: 600, marginRight: 8 }}>{i+1}</span>
                      {t}
                    </div>
                  ))}
                  <button onClick={copyDemo} style={{ background: 'transparent', border: 'none', color: demoCopied ? tokens.colorAccent : tokens.colorTextSecondary, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>{demoCopied ? <><Check size={14} />Copied!</> : <><Copy size={14} />Copy all</>}</button>
                </div>
              ) : (
                <div style={{ marginTop: 24, color: tokens.colorTextMuted, fontStyle: 'italic', textAlign: 'center' }}>Generated output will appear here...</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="lp-section" style={{ background: 'var(--sys-color-neutral-99)' }}>
        <div className="lp-container" style={{ maxWidth: 1100 }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="lp-label" style={{ display: 'inline-block', marginBottom: 16, padding: '6px 16px', background: 'var(--sys-color-primary)', color: 'var(--sys-color-neutral-100)', borderRadius: 'var(--sys-radius-full)', fontSize: 12, fontWeight: 600 }}>FEATURES</span>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--sys-color-neutral-10)', marginBottom: 16, maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.2 }}>The engine behind your content empire.</h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--sys-color-neutral-50)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>Three powerful features that set ContentSplit apart from basic AI writers.</p>
          </div>

          {/* Feature cards - alternating layout */}
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', padding: '48px 0', borderBottom: i < 2 ? '1px solid var(--sys-color-neutral-90)' : 'none' }} className="lp-feature-row">
              {/* Text side */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                {/* Feature icon */}
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${f.iconColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <f.icon size={28} color={f.iconColor} />
                </div>
                
                {/* Feature label + title */}
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: f.iconColor, marginBottom: 8, padding: '4px 12px', background: `${f.iconColor}15`, borderRadius: 6 }}>Feature {i+1}</span>
                <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 26, color: 'var(--sys-color-neutral-10)', marginBottom: 12, letterSpacing: -0.3, lineHeight: 1.2 }}>{f.headline}</h3>
                <p style={{ fontSize: 15, color: 'var(--sys-color-neutral-50)', lineHeight: 1.7, marginBottom: 20, maxWidth: 420 }}>{f.description}</p>
                
                {/* Stats pill */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'var(--sys-color-neutral-100)', borderRadius: 10, border: '1px solid var(--sys-color-neutral-90)' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 600, color: f.iconColor }}>{f.stats}</span>
                </div>
              </div>

              {/* Visual side */}
              <div className="lp-card" style={{ padding: 28, minHeight: 300, order: i % 2 === 0 ? 2 : 1, background: 'var(--sys-color-neutral-100)' }}>
                {f.visual === 'comparison' && (
                  <>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#1DA1F215', borderRadius: 8 }}>
                        <landingIcons.Twitter size={16} color="#1DA1F2" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1DA1F2' }}>Twitter</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#1877F215', borderRadius: 8 }}>
                        <landingIcons.Facebook size={16} color="#1877F2" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1877F2' }}>Facebook</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#0A66C215', borderRadius: 8 }}>
                        <landingIcons.Linkedin size={16} color="#0A66C2" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#0A66C2' }}>LinkedIn</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#E1306C15', borderRadius: 8 }}>
                        <landingIcons.Instagram size={16} color="#E1306C" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#E1306C' }}>Instagram</span>
                      </div>
                    </div>
                    <div style={{ padding: 16, background: 'var(--sys-color-neutral-95)', borderRadius: 12, border: '1px solid var(--sys-color-neutral-90)', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1DA1F2' }} />
                        <span style={{ fontSize: 11, color: 'var(--sys-color-neutral-50)', letterSpacing: '0.05em' }}>TWITTER</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--sys-color-neutral-10)', lineHeight: 1.5 }}>🚀 Just discovered the secret to 10x content creation. Here is the framework that changed everything...</p>
                    </div>
                    <div style={{ padding: 16, background: 'var(--sys-color-neutral-95)', borderRadius: 12, border: '1px solid var(--sys-color-neutral-90)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1877F2' }} />
                        <span style={{ fontSize: 11, color: 'var(--sys-color-neutral-50)', letterSpacing: '0.05em' }}>FACEBOOK</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--sys-color-neutral-10)', lineHeight: 1.5 }}>I am excited to share a framework that has transformed my content creation workflow. After months of experimentation...</p>
                    </div>
                  </>
                )}
                {f.visual === 'queue' && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-color-neutral-30)' }}>Content Queue</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#0B87C1', padding: '4px 10px', background: '#0B87C115', borderRadius: 6 }}>3 processing</span>
                    </div>
                    {[{ title: 'SEO framework blog post...', status: 'active', icon: '#0B87C1' }, { title: 'Announcing new feature...', status: 'waiting', icon: 'var(--sys-color-neutral-40)' }, { title: 'Weekly newsletter #42...', status: 'waiting', icon: 'var(--sys-color-neutral-40)' }].map((item, n) => (
                      <div key={n} style={{ padding: 14, background: item.status === 'active' ? '#0B87C115' : 'var(--sys-color-neutral-95)', borderRadius: 12, border: `1px solid ${item.status === 'active' ? '#0B87C130' : 'var(--sys-color-neutral-90)'}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.icon }} />
                        <span style={{ fontSize: 13, color: 'var(--sys-color-neutral-10)', flex: 1 }}>{item.title}</span>
                        {item.status === 'active' && <Zap size={14} color={item.icon} />}
                      </div>
                    ))}
                  </>
                )}
                {f.visual === 'editor' && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--sys-color-neutral-50)' }}>Tweet #1</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#22C35D' }}><Check size={12} /> Auto-saved</span>
                    </div>
                    <div style={{ padding: 16, background: 'var(--sys-color-neutral-95)', borderRadius: 14, border: '2px solid #22C35D' }}>
                      <textarea defaultValue="🚀 Just discovered the secret to 10x your content creation. Here is the framework that changed everything:" style={{ width: '100%', background: 'transparent', border: 'none', fontSize: 14, color: 'var(--sys-color-neutral-10)', lineHeight: 1.6, resize: 'none', outline: 'none', minHeight: 100, fontFamily: '"Inter", sans-serif' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 12, color: 'var(--sys-color-neutral-50)' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C35D' }} />
                      Changes are saved automatically
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-section" style={{ background: 'var(--sys-color-neutral-99)' }}>
        <div className="lp-container" style={{ maxWidth: 1100 }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="lp-label" style={{ display: 'inline-block', marginBottom: 16, padding: '6px 16px', background: 'var(--sys-color-primary)', color: 'var(--sys-color-neutral-100)', borderRadius: 'var(--sys-radius-full)', fontSize: 12, fontWeight: 600 }}>TESTIMONIALS</span>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--sys-color-neutral-10)', textAlign: 'center', marginBottom: 16, maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.2 }}>What creators are saying.</h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--sys-color-neutral-50)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>Join 2,000+ creators who have transformed their content workflow.</p>
          </div>

          {/* Featured testimonial - larger, centered */}
          <div className="lp-card" style={{ padding: 48, marginBottom: 32, maxWidth: 800, margin: '0 auto 32px', textAlign: 'center', background: 'var(--sys-color-neutral-100)', border: '1px solid var(--sys-color-neutral-90)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {/* Quote mark decoration */}
            <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 80, color: 'var(--sys-color-primary)', opacity: 0.15, lineHeight: 0.5, marginBottom: 24 }}>"</div>
            
            {/* Stars */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
              {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="var(--sys-color-primary)" color="var(--sys-color-primary)" />)}
            </div>
            
            {/* Quote - better contrast */}
            <p style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', fontWeight: 500, color: 'var(--sys-color-neutral-10)', lineHeight: 1.5, marginBottom: 28, fontStyle: 'italic', fontFamily: '"Plus Jakarta Sans", sans-serif', maxWidth: 600, margin: '0 auto' }}>
              "{testimonials[0].quote}"
            </p>
            
            {/* Author info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              {/* Avatar placeholder */}
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sys-color-neutral-100)', fontWeight: 700, fontSize: 20, boxShadow: '0 4px 12px rgba(107, 97, 231, 0.3)' }}>
                {testimonials[0].author.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--sys-color-neutral-10)', fontSize: 16 }}>{testimonials[0].author}</div>
                <div style={{ fontSize: 14, color: 'var(--sys-color-neutral-50)' }}>{testimonials[0].role}</div>
              </div>
            </div>
          </div>

          {/* Other testimonials - 2-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {[testimonials[1], testimonials[2]].map((t, i) => (
              <div key={i} className="lp-card" style={{ padding: 32, position: 'relative', background: 'var(--sys-color-neutral-100)', border: '1px solid var(--sys-color-neutral-90)' }}>
                {/* Quote icon - badge style */}
                <div style={{ position: 'absolute', top: -14, left: 28, width: 36, height: 36, borderRadius: '50%', background: 'var(--sys-color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(107, 97, 231, 0.3)' }}>
                  <Star size={14} fill="var(--sys-color-neutral-100)" color="var(--sys-color-neutral-100)" />
                </div>
                
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: 20, marginTop: 8 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--sys-color-primary)" color="var(--sys-color-primary)" />)}
                </div>
                
                {/* Quote - improved contrast */}
                <p style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--sys-color-neutral-30)', lineHeight: 1.7, marginBottom: 24 }}>"{t.quote}"</p>
                
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? 'var(--sys-color-secondary)' : 'var(--sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sys-color-neutral-100)', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--sys-color-neutral-10)', fontSize: 14 }}>{t.author}</div>
                    <div style={{ color: 'var(--sys-color-neutral-50)', fontSize: 13 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="lp-section" style={{ background: tokens.colorSurface }}>
        <div className="lp-container" style={{ maxWidth: 1000 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: tokens.colorTextPrimary, textAlign: 'center', marginBottom: 12 }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: tokens.colorTextSecondary, textAlign: 'center' }}>Start free, upgrade when you're ready.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="lp-pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className="lp-card" style={{ background: tokens.colorBg, padding: '32px 28px', borderRadius: 16, textAlign: 'center', position: 'relative', ...(plan.popular ? { border: `2px solid ${tokens.colorAccent}` } : { border: `1px solid ${tokens.colorBorder}` }) }}>
                {plan.popular && <span style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: tokens.colorAccent, color: tokens.colorWhite, padding: '6px 16px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most popular</span>}
                <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: 20, color: tokens.colorTextMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
                  <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 48, color: tokens.colorTextPrimary, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: 16, color: tokens.colorTextMuted, marginTop: 8 }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 13, color: tokens.colorTextSecondary, marginBottom: 24, minHeight: 36 }}>{plan.subtitle}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, textAlign: 'left' }}>
                  {plan.features.map((f, j) => (<li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: tokens.colorTextSecondary, lineHeight: 1.4 }}><Check size={16} color={tokens.colorAccent} style={{ flexShrink: 0, marginTop: 2 }} />{f}</li>))}
                </ul>
                <Link to="/register" style={{ width: '100%', padding: '14px 24px', borderRadius: 12, textDecoration: 'none', fontWeight: 600, textAlign: 'center', display: 'block', ...(plan.popular ? { background: tokens.colorAccent, color: tokens.colorWhite } : { background: tokens.colorSurface2, color: tokens.colorTextPrimary, border: `1px solid ${tokens.colorBorder}` }) }} className="lp-btn">{plan.cta}</Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: tokens.colorTextMuted }}>No contracts. Cancel anytime. Secure payment.</p>
        </div>
      </section>

      <section className="lp-section" style={{ background: tokens.colorSurface }}>
        <div className="lp-container" style={{ maxWidth: 680 }}>
          <h2 className="lp-headline" style={{ textAlign: 'center', marginBottom: 48 }}>Questions worth answering.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: tokens.colorBg, border: `1px solid ${tokens.colorBorder}`, borderRadius: tokens.radiusMd, overflow: 'hidden' }}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, cursor: 'pointer' }}>
                  <span style={{ fontWeight: 600, color: tokens.colorTextPrimary, flex: 1 }}>{faq.question}</span>
                  <ChevronDown size={20} color={tokens.colorTextMuted} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                </div>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s' }}>
                  <p style={{ padding: '0 20px 20px', fontSize: 15, color: tokens.colorTextSecondary, lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 24px', background: tokens.colorBg, textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: tokens.colorTextPrimary, marginBottom: 24, lineHeight: 1.1 }}>Your next blog post<br />should be everywhere.</h2>
        <p style={{ fontSize: 16, color: tokens.colorTextSecondary, marginBottom: 40 }}>Start free. No credit card. No setup. Just paste and go.</p>
        <Link to="/register" style={{ background: tokens.colorAccent, color: tokens.colorWhite, padding: '18px 40px', borderRadius: tokens.radiusPill, textDecoration: 'none', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }} className="lp-btn">Start repurposing for free → <ArrowRight size={20} /></Link>
        <p style={{ marginTop: 24, fontSize: 12, color: tokens.colorTextMuted }}>5 free repurposes daily · Cancel Pro anytime · Built by creators, for creators</p>
      </section>

      <footer style={{ background: tokens.colorSurface, borderTop: `1px solid ${tokens.colorBorder}`, padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 48 }} className="lp-grid-3">
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <span style={{ color: tokens.colorAccent, fontSize: 24, fontWeight: 700 }}>●</span>
              <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 18, color: tokens.colorTextPrimary }}>ContentSplit</span>
            </Link>
            <p style={{ fontSize: 14, color: tokens.colorTextMuted, lineHeight: 1.6, marginBottom: 16 }}>Turn your blog into everywhere.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="https://twitter.com" target="_blank" rel="noopener" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${tokens.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.colorTextMuted }}><landingIcons.Twitter size={16} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${tokens.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.colorTextMuted }}><landingIcons.Facebook size={16} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${tokens.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.colorTextMuted }}><landingIcons.Linkedin size={16} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${tokens.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.colorTextMuted }}><landingIcons.Instagram size={16} /></a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: tokens.colorTextPrimary, marginBottom: 16 }}>Product</h4>
            {['Features', 'How it works', 'Pricing', 'Changelog', 'API'].map(l => <a key={l} href="#" style={{ display: 'block', color: tokens.colorTextMuted, textDecoration: 'none', fontSize: 14, marginBottom: 12 }}>{l}</a>)}
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: tokens.colorTextPrimary, marginBottom: 16 }}>Resources</h4>
            {['Blog', 'Templates', 'Use cases', 'Docs'].map(l => <a key={l} href="#" style={{ display: 'block', color: tokens.colorTextMuted, textDecoration: 'none', fontSize: 14, marginBottom: 12 }}>{l}</a>)}
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: tokens.colorTextPrimary, marginBottom: 16 }}>Company</h4>
            {['About', 'Twitter/X', 'Privacy Policy', 'Terms of Service', 'Contact'].map(l => <a key={l} href="#" style={{ display: 'block', color: tokens.colorTextMuted, textDecoration: 'none', fontSize: 14, marginBottom: 12 }}>{l}</a>)}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '48px auto 0', paddingTop: 24, borderTop: `1px solid ${tokens.colorBorder}`, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: tokens.colorTextMuted }}>© {new Date().getFullYear()} ContentSplit. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .lp-nav-links, .lp-nav-right { display: none !important; }
          .lp-mobile-toggle { display: flex !important; }
          .lp-container > div { grid-template-columns: 1fr !important; }
          .lp-pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default LandingPage