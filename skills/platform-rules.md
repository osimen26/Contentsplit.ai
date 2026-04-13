# ContentSplit — Platform Rules Reference
### Source of Truth: ContentSplit PRD v2.1 Section 6.2 and Section 11
### Team 6 — 10th Cohort Capstone | April 2026

---

## How to Use This File

This file contains the formatting rules for all four platforms
ContentSplit supports. These rules are injected into every AI prompt
and enforced during output validation.

All limits are stored as configurable backend constants. Never hardcode
these values in code. If a platform changes its rules, update the
constant — not the codebase.

Source: PRD v2.1 Section 11

---

## Platform 1 — Twitter/X

### Configurable Constant
```
TWITTER_CHAR_LIMIT = 280
```

### Rules (PRD Section 6.2)

| Rule | Value | Notes |
|---|---|---|
| Character limit per tweet | 280 | Strictly enforced — no exceptions |
| Format | Numbered thread | Each tweet starts with N/ |
| Sequence | Must read in logical order | Tweet 1 of N to Tweet N of N |
| Content coverage | Must cover full scope of input | Do not truncate the original content |

### Prompt Instruction to Inject
```
Generate a numbered Twitter/X thread. Rules:
- Split the content into a numbered sequence of tweets
- Each individual tweet must be strictly under 280 characters — no exceptions
- Number tweets sequentially: start each tweet with "N/" where N is the tweet number
- Tweets must read in logical order from first to last
- Do not combine ideas from different parts of the content into the same tweet
- The thread must cover the full scope of the original content
```

### Validation Rules
- Every tweet in the array must be under `TWITTER_CHAR_LIMIT` characters
- The array must be non-empty
- Each tweet must begin with its sequence number in the format `N/`

### Frontend Display (PRD Section 6.2)
- Thread preview shows tweets in reading sequence
- Tab badge shows total tweet count before user opens the tab
  Source: PRD Section 6.10

### Risk Note (PRD Section 11)
If Twitter changes its character limit, update `TWITTER_CHAR_LIMIT`
in backend config only. No code changes required.

---

## Platform 2 — LinkedIn

### Configurable Constant
```
LINKEDIN_CHAR_LIMIT = 1300
```

### Rules (PRD Section 6.2)

| Rule | Value | Notes |
|---|---|---|
| Character limit | 1,300 | Enforced in output and editable view |
| Tone | Professional | Structured paragraph format |
| Opening | Hook required | First sentence must compel reader to continue |
| Closing | CTA required | Final element must direct reader to take action |

### Prompt Instruction to Inject
```
Generate a LinkedIn post. Rules:
- Use a professional tone with structured paragraph format
- Maximum 1,300 characters total — this is a hard limit
- The first sentence must be a compelling hook that makes the reader
  want to continue
- The final element must be a clear call-to-action directing the reader
  to take a next step
- Use line breaks between paragraphs for readability
```

### Validation Rules
- Total character count must not exceed `LINKEDIN_CHAR_LIMIT`
- Output must be a non-empty string
- Must contain an identifiable opening hook
- Must contain an identifiable closing CTA
- Do not truncate text manually to hit the limit — request a revision

### Risk Note (PRD Section 11)
If LinkedIn changes its recommended post length, update
`LINKEDIN_CHAR_LIMIT` in backend config only.

---

## Platform 3 — Instagram

### Configurable Constants
```
INSTAGRAM_HASHTAG_MIN = 10
INSTAGRAM_HASHTAG_MAX = 15
```

### Rules (PRD Section 6.2)

| Rule | Value | Notes |
|---|---|---|
| Tone | Casual, conversational | Appropriate for Instagram |
| Hashtag count | 10 to 15 | Based on actual content topic |
| Hashtag format | Separate field | Never embedded in caption body |
| Emojis | Contextually placed | Not forced — not on every line |
| Hashtag quality | Topic-relevant only | No generic tags like #viral or #content |

### Prompt Instruction to Inject
```
Generate an Instagram caption. Rules:
- Use a casual, conversational tone appropriate for Instagram
- Place emojis where they feel natural and contextually appropriate
  — do not force them
- Do not place an emoji on every line
- Generate between 10 and 15 relevant hashtags based on the specific
  content topic
- Hashtags must reflect the actual topic — do not use generic tags
  like #viral or #content
- Return the caption body and the hashtags as separate fields — do not
  embed hashtags inside the caption body
```

### Validation Rules
- `instagram.caption` must be a non-empty string
- `instagram.hashtags` must be an array
- Hashtag count must be between `INSTAGRAM_HASHTAG_MIN` and `INSTAGRAM_HASHTAG_MAX`
- Every hashtag must begin with `#`
- Hashtags must not be embedded inside the caption string

### Frontend Display (PRD Section 6.9)
- Caption and hashtags have separate Copy buttons
- The separate hashtag copy button is a NICE TO HAVE feature in v1.0
- This separation is why hashtags must always be a separate array field

---

## Platform 4 — Email Newsletter Intro

### Rules (PRD Section 6.2)

| Rule | Value | Notes |
|---|---|---|
| Length | One paragraph only | Not a full email body |
| Tone | Warm and direct | Designed to hook subscribers |
| Subject line | Not included | Not defined in PRD v2.1 |
| Ending | Curiosity gap | Reader must want to click through |
| Purpose | Drive click-through | Not to summarise the full content |

### Prompt Instruction to Inject
```
Generate an email newsletter intro paragraph. Rules:
- Write one opening paragraph only — not a full email, not multiple
  paragraphs
- Use a warm and direct tone designed to hook the subscriber immediately
- Do not include a subject line
- End the paragraph at a natural curiosity gap — the reader must feel
  compelled to click through to read the full content
- Do not summarise the full content — leave the reader wanting more
```

### Validation Rules
- Output must be a non-empty string
- Output must read as a single paragraph — not multiple paragraphs
- Output must not include a subject line
- Output must end at an open point — not a conclusion

---

## Tone Definitions (PRD Section 6.3)

Tone applies across all four platform outputs simultaneously.
One tone selection affects all four outputs.

| Tone | Instruction | Available To |
|---|---|---|
| `professional` | Structured, formal, appropriate for business audiences | All tiers |
| `casual` | Conversational, relaxed, approachable | Pro and Agency only |
| `punchy` | Short sentences, bold statements, high energy | Pro and Agency only |

Free tier users are locked to `professional` only.
Source: PRD Section 8

---

## Out of Scope Platforms — v1.0

The following platforms are explicitly excluded from v1.0.
Do not add rules for these without a formal scope review.
Source: PRD Section 4.2

- TikTok
- Facebook
- YouTube
- Pinterest
- Any platform beyond the four defined above

---

*platform-rules.md — Team 6, 10th Cohort Capstone | April 2026*
*Source of truth: ContentSplit PRD v2.1 Sections 6.2, 6.3, 6.9, 6.10, 8, 11*
