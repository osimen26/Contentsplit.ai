# ContentSplit — Tier Limits Reference
### Source of Truth: ContentSplit PRD v2.1 Section 8
### Team 6 — 10th Cohort Capstone | April 2026

---

## How to Use This File

This file is the single source of truth for all tier-based limits
in ContentSplit. Any skill, agent, or service that enforces a limit
must reference this file — not hardcode values.

If pricing or limits change, update this file only.

---

## Tier Overview

ContentSplit uses a freemium model with three tiers.
Source: PRD Section 8

| Tier | Name | Price | Target User |
|---|---|---|---|
| Free | Starter | Free | Solo creators testing the product |
| Pro | Pro | $12/month | Active creators and marketing managers |
| Agency | Agency | $35/month | Content agencies managing multiple clients |

---

## Full Limits Table (PRD Section 8)

| Feature | Free — Starter | Pro — $12/month | Agency — $35/month |
|---|---|---|---|
| Conversions per month | 10 | 100 | Unlimited |
| Platforms per conversion | 4 | 4 | 4 |
| Tone modes | Professional only | All 3 modes | All 3 modes |
| Regenerations per output per session | 2 | 10 | Unlimited |
| Conversion history | Last 3 | Last 50 | Unlimited |
| Brand voice profile | No | Yes | Yes (per client) |
| Team members | 1 | 1 | Up to 10 |
| Priority support | No | Email | Chat + Email |

---

## Enforcement Rules

All limits must be enforced at the backend level — not just in the UI.
Source: PRD Section 10.3

### Monthly Conversion Limit Enforcement

Checked in: Skill 1 — Content Conversion, Step 1
Enforced by: User Service (PRD Section 10.3)
Table used: `usage_logs` — count rows where `action_type = 'conversion'`
and `user_id` matches and `timestamp` is within the current month

If limit reached:
- Return error code: `CONVERSION_LIMIT_REACHED`
- Do not proceed with any processing
- Do not call the AI engine

### Tone Mode Enforcement

Checked in: Skill 1 — Content Conversion, Step 4
Enforced by: Conversion Service (PRD Section 10.3)

If a Free tier user submits `casual` or `punchy`:
- Silently override to `professional`
- Do not return an error to the user

### Regeneration Limit Enforcement

Checked in: Skill 4 — Regeneration, Step 1
Enforced by: User Service (PRD Section 10.3)
Table used: `outputs` — read `regeneration_count` for this output

If limit reached:
- Return error code: `REGENERATION_LIMIT_REACHED`
- Do not call the AI engine
- Do not increment `regeneration_count`

### History Limit Enforcement

Enforced by: History Service (PRD Section 10.3)
Applied on: History retrieval query

Query must use `LIMIT` and `ORDER BY created_at DESC` to return
only the allowed number of entries per tier:
- Free: LIMIT 3
- Pro: LIMIT 50
- Agency: no LIMIT

---

## Upgrade Messages by Limit

Use these exact messages when a user hits a limit.
Source: references/error-codes.md

| Limit Hit | Message to Show |
|---|---|
| Monthly conversions | "You have used all [N] conversions for this month. Upgrade to Pro for 100 conversions per month." |
| Regenerations | "You have reached the regeneration limit for this output. Upgrade to Pro for more regenerations." |
| Tone mode | Do not show — silently override to Professional |
| History | Do not show — silently limit query results |

---

## Free Tier Design Note (PRD Section 8)

The free tier is designed to:
- Provide genuine value and build the habit of use
- Act as the natural trigger for the upgrade conversation when
  the 10-conversion limit is hit
- Require no credit card at sign-up

The 10-conversion monthly limit must be generous enough to demonstrate
real value — not so restrictive it frustrates before habit forms.

---

## Pro Tier Design Note (PRD Section 8)

Priced at $12/month to be affordable for solo professionals in African
markets where SaaS purchasing power differs from Western benchmarks.
This is a deliberate strategic decision, not an oversight.

---

## Agency Tier Design Note (PRD Section 8)

Priced at $35/month to fit agency operational budgets without requiring
enterprise procurement cycles. Multi-user workspaces (up to 10 members)
and per-client brand voice profiles are the key differentiators.

Note: Brand voice profiles and team workspaces are v1.0 Agency features
per PRD Section 8 but the detailed implementation is a Phase 4 roadmap
item per PRD Section 7. Confirm with team lead before building.

---

*tier-limits.md — Team 6, 10th Cohort Capstone | April 2026*
*Source of truth: ContentSplit PRD v2.1 Section 8*
