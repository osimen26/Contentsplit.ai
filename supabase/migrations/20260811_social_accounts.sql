-- ─────────────────────────────────────────────────────────────────
-- ContentSplit.ai — Social Publishing Integration
-- Migration: 20260811_social_accounts
-- ─────────────────────────────────────────────────────────────────

-- Connected social accounts (stores encrypted OAuth tokens per user per platform)
-- Designed to support multiple platforms: twitter, linkedin, instagram, facebook, threads
CREATE TABLE IF NOT EXISTS social_accounts (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform          TEXT        NOT NULL,             -- 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'threads'
  platform_user_id  TEXT        NOT NULL,             -- platform-specific user ID
  platform_username TEXT,                             -- @handle or display name
  access_token      TEXT        NOT NULL,             -- AES-256 encrypted before storage
  refresh_token     TEXT,                             -- AES-256 encrypted before storage
  token_expires_at  TIMESTAMPTZ,
  connected_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Published posts log (records every post successfully sent to a platform)
CREATE TABLE IF NOT EXISTS social_posts (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  output_id         UUID        REFERENCES outputs(id) ON DELETE SET NULL,
  platform          TEXT        NOT NULL,             -- 'twitter' | 'linkedin' | etc.
  content           TEXT        NOT NULL,
  status            TEXT        NOT NULL DEFAULT 'published',  -- 'published' | 'failed'
  published_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  platform_post_id  TEXT,                             -- ID returned from the platform API after posting
  platform_post_url TEXT,                             -- Direct URL to the live post
  error_message     TEXT,                             -- Populated if status = 'failed'
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id    ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_status     ON social_posts(status);

-- Row-level security: users can only see and modify their own records
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own social accounts"
  ON social_accounts FOR ALL
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users see own social posts"
  ON social_posts FOR ALL
  USING (auth.uid()::text = user_id::text);
