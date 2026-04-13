# ContentSplit — Database Schema Reference

---

## Overview

ContentSplit uses Supabase (PostgreSQL) as its database.
All persistent data — user accounts, conversion history, tier status,
output content, and usage logs — is stored in Supabase.

All tables use Supabase's built-in row-level security (RLS) policies
to ensure users can only access their own data.



---

## Table 1 — users

Stores user account details and current subscription tier.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. Auto-generated. |
| `email` | TEXT | User's email address. Unique. |
| `tier` | TEXT | One of: `free`, `pro`, `agency`. Default: `free`. |
| `created_at` | TIMESTAMP | Account creation time. Auto-set. |
| `oauth_provider` | TEXT | `google` if signed in via Google OAuth. Null for email/password users. |

### RLS Policy
Users can only read and update their own row.
`auth.uid() = id`

### Written By
Supabase Auth on sign-up. User Service on tier upgrade.

---

## Table 2 — conversions

Stores the original input for each conversion.
TEXT type supports up to 5,000-word inputs without truncation.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. Auto-generated. |
| `user_id` | UUID | Foreign key → users.id |
| `input_text` | TEXT | The sanitised blog post content submitted by the user. |
| `tone_mode` | TEXT | One of: `professional`, `casual`, `punchy`. |
| `created_at` | TIMESTAMP | Conversion time. Auto-set. |

### RLS Policy
Users can only read and write their own conversions.
`auth.uid() = user_id`

### Written By
Skill 1 — Content Conversion, Step 8.
Written automatically after every successful conversion.
No manual save action required from the user.


### History Limits by Tier 

The History Service enforces how many rows are returned per user:
- Free: last 3 conversions
- Pro: last 50 conversions
- Agency: unlimited

Rows are not deleted — they are filtered on retrieval.

---

## Table 3 — outputs

Stores the generated content for each of the four platform outputs
per conversion. Each conversion produces four rows in this table —
one per platform.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. Auto-generated. |
| `conversion_id` | UUID | Foreign key → conversions.id |
| `platform` | TEXT | One of: `twitter`, `linkedin`, `instagram`, `email`. |
| `content` | TEXT | The generated output content for this platform. For Instagram, stores JSON string with `caption` and `hashtags`. |
| `regeneration_count` | INTEGER | Number of times this output has been regenerated. Starts at 0. |

### RLS Policy
Users can only read and write outputs belonging to their own conversions.
`auth.uid() = (SELECT user_id FROM conversions WHERE id = conversion_id)`

### Written By
Skill 1 — Content Conversion, Step 8.
Four rows written per conversion — one for each platform.

### Updated By
Skill 4 — Regeneration, Step 6.
The `content` field is replaced and `regeneration_count` is incremented
after every successful regeneration.

### Important
`regeneration_count` must be updated in Supabase after every successful
regeneration — not just tracked in memory. If only tracked in memory,
the count resets when the user refreshes the page.


---

## Table 4 — usage_logs

Tracks conversion and regeneration counts per user for tier-based
rate limiting enforcement.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. Auto-generated. |
| `user_id` | UUID | Foreign key → users.id |
| `action_type` | TEXT | One of: `conversion`, `regeneration`, `conversion_retry`, `regeneration_retry`. |
| `timestamp` | TIMESTAMP | Action time. Auto-set. |

### RLS Policy
Users can only read their own logs. Write access is backend-only.
`auth.uid() = user_id`

### Written By
Skill 1 — Step 8 on successful conversion.
Skill 3 — Step 6 on retry attempt.
Skill 3 — Step 7 on failed retry.
Skill 4 — Step 6 on successful regeneration.

### Used For
- Counting monthly conversions per user to enforce tier limits
- Auditing retry rates to monitor AI quality 
- Tracking regeneration rates per output 

---

## Foreign Key Relationships

```
users
  └── id ←── conversions.user_id
                └── id ←── outputs.conversion_id
  └── id ←── usage_logs.user_id
```

---

## History Retrieval 

When a user opens the History panel, the History Service retrieves
conversions in reverse chronological order (newest first).

Each history entry displays:
- The date of conversion (`conversions.created_at`)
- The first 60 words of the original input (`conversions.input_text`)
- All four saved outputs (`outputs.content` for all four platforms)

The user can restore any past conversion to the active workspace
with a single click. 

---

## Security Notes 

- All data in transit is encrypted over HTTPS with SSL/TLS
- Supabase Auth handles password hashing using bcrypt
- JWT session tokens are managed by Supabase Auth
- RLS policies are enforced at the database level — not just
  application code
- DeepSeek API keys are stored as server-side environment variables
  and never sent to the frontend

---

