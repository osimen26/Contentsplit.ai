# ContentSplit — Landing Page Build Guide
**Version:** 1.0  
**Author:** Victor (Team 6)  
**Tool:** Antigravity  
**Reference Audit:** durable.com  

---

## 1. What We're Building

A single-page marketing landing page for **ContentSplit** — an AI-powered web app that repurposes long-form blog content into platform-ready formats across Twitter/X, LinkedIn, Instagram, newsletters, YouTube, and blog summaries.

The goal of this page is one thing: **convert a visitor into a free trial user.** Every section exists to serve that goal. Nothing else.

---

## 2. Design Direction

### Aesthetic
Clean, editorial, slightly dark. Think a tool that a serious content creator or growth marketer would trust — not a toy. Not a purple-gradient AI product. Think: precision, restraint, confidence.

**Reference energy:** Linear.app meets Notion meets a well-made SaaS tool. Not Canva. Not Jasper.

### Color Tokens
```
--color-bg:           #0A0A0F        /* near-black canvas */
--color-surface:      #111118        /* card backgrounds */
--color-surface-2:    #1A1A24        /* elevated surfaces */
--color-border:       #2A2A38        /* subtle borders */
--color-accent:       #6C63FF        /* primary purple — used sparingly */
--color-accent-warm:  #FF6B6B        /* red/coral — for highlights only */
--color-text-primary: #F0F0F5        /* headings */
--color-text-secondary: #8888A0     /* body, captions */
--color-text-muted:   #4A4A60       /* placeholder, disabled */
--color-white:        #FFFFFF
```

### Typography
```
Display / Headings:  "Syne" (Google Fonts) — weight 700, 800
Body / UI:           "DM Sans" (Google Fonts) — weight 400, 500
Mono / Code:         "JetBrains Mono" — for any code-style elements
```

### Spacing Scale (8pt grid)
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 128px
```

### Radius
```
--radius-sm:  6px
--radius-md:  12px
--radius-lg:  20px
--radius-pill: 999px
```

---

## 3. Page Sections — Order & Spec

### SECTION 1 — NAV

**Layout:** Fixed top bar. Full width. Height: 64px.

**Left:** Logo — `ContentSplit` in Syne 700. Dot accent (●) in `--color-accent` before the word "Split".

**Center:** Navigation links  
- `Features`  
- `How it works`  
- `Pricing`  
- `Blog`  

Links in DM Sans 500, `--color-text-secondary`. On hover: `--color-text-primary`.

**Right:**  
- `Log in` — ghost text button  
- `Start free` — filled pill button, `--color-accent` bg, white text  

**Border:** 1px bottom border in `--color-border`. Background: `--color-bg` with `backdrop-filter: blur(12px)`.

---

### SECTION 2 — HERO

**Layout:** Centered. Full viewport height (100vh). Max-width 900px centered.

**Badge (top):**  
Small pill above headline: `✦ AI-Powered Content Repurposing`  
Style: border `1px solid --color-border`, bg `--color-surface`, text `--color-text-secondary`, DM Sans 13px.

**Headline:**  
```
One blog post.
Six platforms.
Zero rewrites.
```
Font: Syne 800, size 72px desktop / 40px mobile.  
Color: `--color-text-primary`.  
Line-height: 1.1.  
The word **"Six"** gets `--color-accent` color treatment.

**Subheadline:**  
```
ContentSplit takes your long-form blog and breaks it into 
ready-to-publish content for Twitter, LinkedIn, Instagram, 
newsletters, YouTube, and more. Paste once. Publish everywhere.
```
Font: DM Sans 400, size 18px, `--color-text-secondary`. Max-width 560px centered.

**CTA Group:**  
Two buttons side by side:
- Primary: `Start for free →` — pill button, `--color-accent` bg, white text, DM Sans 500 16px  
- Secondary: `See how it works` — ghost button, border `--color-border`, `--color-text-secondary`  

Below buttons: `No credit card required · 5 free repurposes per day`  
Font: DM Sans 12px, `--color-text-muted`.

**Hero Visual (below CTA):**  
A dark UI mockup card showing the ContentSplit editor interface. Two columns:
- Left column: Blog paste area — plain text block labeled `Your Blog Post`
- Right column: Tabs across the top (`Twitter/X` · `LinkedIn` · `Instagram` · `Newsletter` · `YouTube` · `Summary`). Active tab shows a rendered output card.  

Style: `--color-surface` background, `--color-border` border, `--radius-lg`. Add a subtle gradient glow underneath using `--color-accent` at low opacity (0.15).

**Animation:** On load, fade in headline first (0ms delay), then subheadline (150ms), then CTAs (300ms), then mockup (500ms). Use `opacity: 0 → 1` + `transform: translateY(16px) → 0`.

---

### SECTION 3 — SOCIAL PROOF BAR

**Layout:** Full width. Padding 24px vertical. Background `--color-surface`.

**Content:** One centered line:
```
Trusted by 2,000+ creators, marketers, and content teams
```
Font: DM Sans 14px, `--color-text-muted`.

Followed by a horizontal logo strip (greyscale at 40% opacity) of logos:  
Use placeholder company-type labels as text badges for now:  
`Indie Hackers` · `Product Hunt` · `Growth.design` · `Beehiiv users` · `Substack writers`

Or render these as simple monospaced text labels in `--color-text-muted` with `|` dividers.

---

### SECTION 4 — ROTATING OUTPUT SHOWCASE ("What ContentSplit creates")

**Layout:** Full width. Dark background. Section padding: 96px vertical.

**Section Label (top, left-aligned):**  
`WHAT IT CREATES` — DM Sans 11px, uppercase, letter-spacing 0.12em, `--color-accent`.

**Headline:**  
```
Your blog, everywhere it needs to be.
```
Syne 700, 48px, `--color-text-primary`.

**Subtext:**  
```
Paste your article. In seconds, ContentSplit generates 
six distinct content formats, each optimized for how 
people actually consume content on that platform.
```
DM Sans 16px, `--color-text-secondary`.

**Format Cards Grid:**  
6 cards in a 3×2 grid (desktop) / 2×3 (tablet) / 1 column (mobile).

Each card:
- Icon (platform icon, or a minimal custom glyph)
- Platform name in Syne 600 16px
- One-line description in DM Sans 14px `--color-text-secondary`
- A mini preview of what the output looks like (as styled text, not an image)

Card styles: `--color-surface`, `--color-border` border, `--radius-md`, 24px padding.  
On hover: border changes to `--color-accent` at 50% opacity. Slight `transform: translateY(-4px)` transition.

**Cards:**

| Platform | Icon | Description | Preview style |
|---|---|---|---|
| Twitter / X Thread | 𝕏 | Hook → thread → CTA, tweet by tweet | Numbered tweet bubbles |
| LinkedIn Post | in | Long-form professional tone, formatted for feed | Paragraph with "See more" truncation |
| Instagram Caption | ◻ | Short punchy hook + hashtags | Caption text + 5 hashtags |
| Newsletter | ✉ | Email-ready section with subject line | Subject line + opening paragraph |
| YouTube Script Intro | ▷ | Hook script for first 60 seconds | Spoken paragraph with [CUT] markers |
| Blog Summary | ≡ | 3-sentence TL;DR for SEO and sharing | Condensed 3-liner |

---

### SECTION 5 — HOW IT WORKS

**Layout:** Centered. Max-width 800px. Section padding: 96px vertical.

**Section Label:** `HOW IT WORKS` — same style as above.

**Headline:**  
```
Three steps. Zero friction.
```
Syne 700, 48px.

**Steps:**  
Vertical timeline layout (centered line connecting 3 step nodes).

**Step 1 — Paste your content**  
Write a short description in DM Sans 16px:  
`Drop in your blog post URL or paste the full text. ContentSplit reads it and understands the key ideas, tone, and structure.`

**Step 2 — Choose your platforms**  
`Pick which formats you need — one or all six. ContentSplit generates each one separately, tailored to that platform's content style.`

**Step 3 — Copy and publish**  
`Each output is editable before you copy. Tweak the tone, swap out phrases, and publish directly from the editor.`

Each step has:
- Step number in `--color-accent`, Syne 800, 48px (faint, oversized, behind the heading)
- Heading: Syne 600 20px, `--color-text-primary`
- Body: DM Sans 16px, `--color-text-secondary`

---

### SECTION 6 — LIVE DEMO / INTERACTIVE PREVIEW

**Layout:** Full width. Background `--color-surface`. Section padding: 96px.

**Headline:**  
```
See it work before you sign up.
```
Syne 700, 48px, centered.

**Subtext:**  
```
No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.
```
DM Sans 16px, `--color-text-secondary`, centered.

**Demo Widget:**  
A two-panel dark card. Max-width 900px centered.

Left panel:
- Label: `Blog excerpt` in DM Sans 12px uppercase `--color-text-muted`
- `<textarea>` with placeholder: `Paste a paragraph from any blog post...`
- Style: dark background, `--color-border` border, DM Sans 15px
- Button below: `Generate Twitter Thread →` — accent fill, full width

Right panel:
- Label: `Generated Twitter/X Thread`
- Animated output area: shows numbered tweets one by one (simulate streaming with typing effect or fade-in per tweet)
- Footer of panel: small `Copy all` button

**Note to Antigravity:** For the demo, use the Anthropic API with a compact system prompt. Pass the user's pasted text and return a 5-tweet thread in JSON format (`[{tweet: "..."}, ...]`). Stream if possible, otherwise reveal tweets with staggered fade-in (100ms each).

---

### SECTION 7 — FEATURE HIGHLIGHTS

**Layout:** Alternating two-column rows. Max-width 1100px. Section padding: 96px.

Three feature rows. Each row: 50/50 split, text left + visual right (alternate on even rows).

**Feature 1 — Tone Awareness**  
Headline: `It writes like you, not like a robot.`  
Body: `ContentSplit preserves the voice, vocabulary, and energy of your original post. The LinkedIn version doesn't sound like the Twitter version — because they shouldn't.`  
Visual: Side-by-side output comparison (two small cards: same content, two different tones rendered)

**Feature 2 — Batch Mode**  
Headline: `Run a whole content calendar in one session.`  
Body: `Upload multiple blog posts and queue them. ContentSplit processes each one and returns a full set of outputs per article — ready for scheduling.`  
Visual: A list/queue view with progress indicators

**Feature 3 — Edit Before You Export**  
Headline: `Every output is a starting point, not a final draft.`  
Body: `The editor is inline. Click any generated text and edit it directly. No jumping between tabs or copy-pasting into Notion.`  
Visual: Inline edit state on a tweet card

---

### SECTION 8 — TESTIMONIALS

**Layout:** Centered. Max-width 960px. Section padding: 96px.

**Headline:**  
```
What creators are saying.
```
Syne 700, 48px.

**Layout:** 3-column card grid on desktop, 1 column on mobile.

**Testimonial cards:** `--color-surface`, `--color-border` border, `--radius-md`, 24px padding.

Content per card:
- Quote in DM Sans 400 16px, `--color-text-secondary`, italic
- Author name in DM Sans 600 14px, `--color-text-primary`
- Role/handle in DM Sans 400 13px, `--color-text-muted`
- Star row (5 stars) in `--color-accent`

**Placeholder testimonials (replace with real ones):**

> "I write one post a week and now it shows up everywhere. Saves me 3 hours minimum."  
> — **Adaeze O.**, Content Strategist

> "The LinkedIn output is scary good. It doesn't sound like AI. That's rare."  
> — **Marcus T.**, Indie Hacker & Newsletter Writer

> "I use it for every Substack issue. Twitter thread → newsletter intro → Instagram caption. Done."  
> — **Priya K.**, Growth Marketer at a B2B SaaS

---

### SECTION 9 — PRICING

**Layout:** Centered. Max-width 900px. Section padding: 96px.

**Headline:**  
```
One tool. Every platform.
```
Syne 700, 48px.

**Pricing Cards:** Two cards side by side.

**Free**
- Price: `$0 / month`
- Subtitle: `For creators just getting started`
- Features:
  - 5 repurposes per day
  - Twitter, LinkedIn, Instagram
  - Copy-to-clipboard export
  - Basic editor
- CTA: `Get started free` (ghost button)

**Pro**
- Badge: `Most popular`
- Price: `$12 / month` (or your actual pricing)
- Subtitle: `For teams and serious creators`
- Features:
  - Unlimited repurposes
  - All 6 output formats
  - Batch mode (up to 10 posts/session)
  - Inline editor + version history
  - Priority AI generation
  - Early access to new formats
- CTA: `Start Pro free for 7 days` (accent filled button)

Card style: Pro card gets `--color-accent` border at 1px and a subtle glow. Free card is `--color-border`.

**Below cards:**  
`No contracts. Cancel anytime.` — DM Sans 13px, `--color-text-muted`, centered.

---

### SECTION 10 — FAQ

**Layout:** Centered. Max-width 680px. Section padding: 96px.

**Headline:**  
```
Questions worth answering.
```
Syne 700, 40px.

**Accordion component** — click to expand. One open at a time.

Questions:
1. `Does ContentSplit work with any blog post?`  
   Yes. Paste raw text or a URL. It works with Substack, Medium, WordPress, Ghost, or plain Google Docs exports.

2. `Will the output actually sound like me?`  
   ContentSplit uses your original post's vocabulary and sentence structure as a reference. The more specific and human your writing, the better the outputs.

3. `Can I edit the outputs before I publish?`  
   Every output is editable inline. ContentSplit generates a starting draft — you always have the final say.

4. `What platforms are supported?`  
   Twitter/X threads, LinkedIn posts, Instagram captions, newsletter intros, YouTube script hooks, and blog summaries. More formats are in the roadmap.

5. `Is there a free plan?`  
   Yes. 5 repurposes per day, no credit card required. Upgrade anytime for unlimited access.

6. `What happens to my content after I paste it?`  
   Your content is used only to generate the outputs in your session. We don't train on user data, and nothing is stored after your session ends.

---

### SECTION 11 — FINAL CTA

**Layout:** Full width. Background: subtle gradient from `--color-bg` to `--color-surface`. Section padding: 96px.

**Headline:**  
```
Your next blog post
should be everywhere.
```
Syne 800, 64px desktop / 40px mobile. Centered. `--color-text-primary`.

**Subtext:**  
```
Start free. No credit card. No setup. Just paste and go.
```
DM Sans 16px, `--color-text-secondary`.

**CTA Button:**  
`Start repurposing for free →` — large pill button, `--color-accent` bg, white Syne 600 18px. Padding: 18px 40px.

**Below button:**  
`5 free repurposes daily · Cancel Pro anytime · Built by creators, for creators`  
DM Sans 12px, `--color-text-muted`.

---

### SECTION 12 — FOOTER

**Layout:** Full width. `--color-surface` background. Border top `--color-border`. Padding: 48px.

**Four columns:**

**Column 1 — Brand**  
Logo + tagline: `Turn your blog into everywhere.`  
DM Sans 14px, `--color-text-muted`.  
Social icons: Twitter/X, LinkedIn, Instagram (icon only, link out).

**Column 2 — Product**  
Links: Features · How it works · Pricing · Changelog · API (coming soon)

**Column 3 — Resources**  
Links: Blog · Templates · Use cases · Docs

**Column 4 — Company**  
Links: About · Twitter/X · Privacy Policy · Terms of Service · Contact

**Bottom bar:**  
`© 2025 ContentSplit. All rights reserved.`  
DM Sans 12px, `--color-text-muted`. Right-aligned.

---

## 4. Interactions & Motion

| Element | Interaction |
|---|---|
| Nav links | Underline slide-in on hover (CSS `::after`) |
| CTA buttons | Scale 1.03 + slight shadow lift on hover |
| Feature cards | translateY(-4px) on hover, border-color transition |
| Accordion | Max-height expand with ease-in-out 300ms |
| Demo output | Staggered fade-in per tweet (100ms offset each) |
| Hero mockup | Subtle floating animation — `translateY: 0 → -8px → 0` loop, 4s ease-in-out |
| Page load | Staggered reveal: nav (0ms) → badge (100ms) → headline (200ms) → sub (350ms) → CTA (500ms) → mockup (700ms) |

---

## 5. Responsive Breakpoints

```
Mobile:   < 640px
Tablet:   640px – 1024px
Desktop:  > 1024px
```

**Key adjustments:**
- Hero headline drops from 72px → 40px on mobile
- 3-col grids → 1 col on mobile, 2 col on tablet
- Nav collapses to hamburger on mobile (slide-in drawer)
- Demo widget stacks vertically on mobile
- Pricing cards stack vertically on mobile

---

## 6. Tech Notes for Antigravity

- Framework: React + Tailwind (or plain HTML/CSS if simpler for this build)
- Fonts: Load from Google Fonts — `Syne`, `DM Sans`, `JetBrains Mono`
- Icons: Lucide React or Heroicons (minimal set — no heavy icon libraries)
- Demo section: Use Anthropic API (`claude-sonnet-4-20250514`) with a Twitter thread system prompt. Return JSON array of tweet objects.
- No animations library needed — CSS transitions and keyframes handle everything here
- All colors via CSS custom properties (defined on `:root`)
- Do not use any stock photography — UI mockups only, rendered in code

---

## 7. Copy Principles (for Antigravity reference)

- No phrase starting with "Harness the power of..."
- No use of "supercharge", "unleash", "game-changing"
- No passive voice in CTAs
- Every headline should be specific, not clever-for-the-sake-of-it
- Write like the product is already trusted and proven
- Platform names are always spelled exactly: Twitter/X · LinkedIn · Instagram

---

## 8. Assets Needed (placeholder until ready)

| Asset | Description |
|---|---|
| `hero-mockup.png` | Dark UI screenshot of the ContentSplit editor (2-panel layout) |
| `cs-logo.svg` | ContentSplit wordmark in Syne 700 |
| `platform-icons/` | Minimal line icons for 6 platforms |
| `testimonial-avatars/` | 3 creator avatars (can use initials as placeholder) |

---

*End of BUILD_GUIDE.md — v1.0*
