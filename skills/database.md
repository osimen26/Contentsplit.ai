# ContentSplit Database Guidelines

## Overview

The ContentSplit Database Guidelines provide standards for data modeling, schema design, and data flow patterns that support the UI/UX requirements following Google Material Design 3 principles. These guidelines ensure data consistency, performance, and seamless integration with frontend components.

## Data Modeling Principles

### 1. UI-First Design
- Model data to match UI component structures
- Optimize for common UI patterns and workflows
- Include fields needed for rendering and interaction

### 2. Consistency Across Layers
- Maintain consistent naming between database, API, and UI
- Use similar data structures across related entities
- Support both detailed and summary views

### 3. Performance by Design
- Structure data to minimize frontend processing
- Include calculated fields where appropriate
- Support efficient pagination and filtering

## Core Data Models

### User Model
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(512),
  role VARCHAR(50) DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

### Content Model
```sql
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  tags VARCHAR(50)[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for filtering and sorting
CREATE INDEX idx_content_user_id ON content(user_id);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_published_at ON content(published_at DESC);
CREATE INDEX idx_content_tags ON content USING GIN(tags);
```

### Media Model
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  url VARCHAR(512) NOT NULL,
  type VARCHAR(50) NOT NULL,
  width INTEGER,
  height INTEGER,
  size_bytes INTEGER,
  alt_text VARCHAR(500),
  caption TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for media lookup by content
CREATE INDEX idx_media_content_id ON media(content_id);
```

## Data Relationships

### One-to-Many Relationships
```sql
-- User has many content items
SELECT 
  u.*,
  json_agg(c.*) as content_items
FROM users u
LEFT JOIN content c ON u.id = c.user_id
GROUP BY u.id;

-- Content has many media items
SELECT
  c.*,
  json_agg(m.*) as media_items
FROM content c
LEFT JOIN media m ON c.id = m.content_id
GROUP BY c.id;
```

### Many-to-Many Relationships
```sql
CREATE TABLE content_categories (
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (content_id, category_id)
);

-- Junction table query
SELECT
  c.*,
  json_agg(cat.*) as categories
FROM content c
JOIN content_categories cc ON c.id = cc.content_id
JOIN categories cat ON cc.category_id = cat.id
GROUP BY c.id;
```

## Data for UI Components

### Card Data Structure
```json
{
  "id": "uuid",
  "title": "Card Title",
  "subtitle": "Card Subtitle",
  "description": "Brief description...",
  "image": {
    "url": "https://...",
    "alt": "Image description",
    "width": 400,
    "height": 300
  },
  "metadata": {
    "author": "User Name",
    "date": "2024-01-15",
    "readTime": "5 min"
  },
  "stats": {
    "views": 1234,
    "likes": 56,
    "shares": 12
  },
  "actions": {
    "canEdit": true,
    "canDelete": false,
    "canShare": true
  },
  "status": "published"
}
```

### List Data Structure
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Item Title",
      "description": "Short description",
      "icon": "icon-name",
      "badge": "New",
      "timestamp": "2024-01-15T10:30:00Z",
      "selected": false,
      "disabled": false
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "hasNext": true,
    "hasPrevious": false
  },
  "sorting": {
    "field": "created_at",
    "direction": "desc"
  },
  "filters": {
    "status": ["published", "draft"],
    "category": ["technology", "design"]
  }
}
```

### Form Data Structure
```json
{
  "fields": [
    {
      "name": "email",
      "type": "email",
      "label": "Email Address",
      "placeholder": "Enter your email",
      "value": "user@example.com",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      },
      "error": null
    },
    {
      "name": "password",
      "type": "password",
      "label": "Password",
      "placeholder": "Enter your password",
      "required": true,
      "validation": {
        "minLength": 8,
        "message": "Password must be at least 8 characters"
      },
      "error": "Password is too short"
    }
  ],
  "state": {
    "isSubmitting": false,
    "isValid": false,
    "isDirty": true,
    "touched": ["email", "password"]
  }
}
```

## Data Transformation Patterns

### API Response Normalization
```javascript
// Normalize database row to UI format
const normalizeUser = (dbUser) => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  avatar: dbUser.avatar_url,
  role: dbUser.role,
  status: dbUser.status,
  createdAt: new Date(dbUser.created_at).toISOString(),
  updatedAt: new Date(dbUser.updated_at).toISOString(),
  // Derived fields
  initials: dbUser.name.split(' ').map(n => n[0]).join(''),
  isActive: dbUser.status === 'active',
  canEdit: ['admin', 'editor'].includes(dbUser.role)
});

// Normalize content with media
const normalizeContent = (dbContent, mediaItems) => ({
  id: dbContent.id,
  title: dbContent.title,
  description: dbContent.description,
  type: dbContent.content_type,
  status: dbContent.status,
  tags: dbContent.tags || [],
  metadata: dbContent.metadata || {},
  stats: {
    views: dbContent.view_count,
    likes: dbContent.like_count,
    shares: dbContent.share_count
  },
  media: mediaItems.map(m => ({
    url: m.url,
    type: m.type,
    alt: m.alt_text,
    caption: m.caption
  })),
  publishedAt: dbContent.published_at,
  createdAt: dbContent.created_at
});
```

### Data Denormalization for Performance
```sql
-- Materialized view for dashboard cards
CREATE MATERIALIZED VIEW dashboard_content AS
SELECT
  c.id,
  c.title,
  c.description,
  c.content_type,
  c.status,
  c.tags,
  c.view_count,
  c.like_count,
  c.share_count,
  c.published_at,
  u.name as author_name,
  u.avatar_url as author_avatar,
  COUNT(DISTINCT m.id) as media_count,
  ARRAY_AGG(DISTINCT cat.name) as category_names
FROM content c
JOIN users u ON c.user_id = u.id
LEFT JOIN media m ON c.id = m.content_id
LEFT JOIN content_categories cc ON c.id = cc.content_id
LEFT JOIN categories cat ON cc.category_id = cat.id
WHERE c.status = 'published'
GROUP BY c.id, u.id;

-- Refresh materialized view periodically
REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_content;
```

## Pagination Strategies

### Cursor-Based Pagination
```sql
-- Get next page after cursor
SELECT *
FROM content
WHERE 
  published_at < :cursor_date
  OR (published_at = :cursor_date AND id < :cursor_id)
ORDER BY published_at DESC, id DESC
LIMIT :page_size;

-- Response format
{
  "items": [...],
  "nextCursor": "2024-01-15T10:30:00Z_uuid",
  "hasNext": true,
  "pageSize": 20
}
```

### Offset-Based Pagination
```sql
SELECT *
FROM content
WHERE status = 'published'
ORDER BY published_at DESC
LIMIT :limit OFFSET :offset;

-- With total count
SELECT 
  *,
  COUNT(*) OVER() as total_count
FROM content
WHERE status = 'published'
ORDER BY published_at DESC
LIMIT :limit OFFSET :offset;
```

## Data Validation Rules

### Schema Validation
```sql
-- Check constraints
ALTER TABLE users ADD CONSTRAINT valid_email 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE content ADD CONSTRAINT valid_status
CHECK (status IN ('draft', 'published', 'archived', 'deleted'));

ALTER TABLE content ADD CONSTRAINT valid_content_type
CHECK (content_type IN ('article', 'video', 'image', 'audio', 'document'));
```

### Business Logic Validation
```sql
-- Function to validate content publishing
CREATE OR REPLACE FUNCTION validate_content_publish(content_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  content_record RECORD;
BEGIN
  SELECT * INTO content_record FROM content WHERE id = content_id;
  
  -- Must have title
  IF content_record.title IS NULL OR TRIM(content_record.title) = '' THEN
    RETURN FALSE;
  END IF;
  
  -- Must have at least one media item for certain types
  IF content_record.content_type IN ('video', 'image') THEN
    IF NOT EXISTS (SELECT 1 FROM media WHERE content_id = content_id) THEN
      RETURN FALSE;
    END IF;
  END IF;
  
  -- Must have valid tags
  IF array_length(content_record.tags, 1) = 0 THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

## Data Migration Patterns

### Schema Migrations
```sql
-- Version 1: Initial schema
CREATE TABLE users (...);

-- Version 2: Add new column with default
ALTER TABLE users ADD COLUMN timezone VARCHAR(50) DEFAULT 'UTC';

-- Version 3: Migrate data
UPDATE users 
SET preferences = preferences || '{"timezone": "UTC"}'::jsonb
WHERE preferences->>'timezone' IS NULL;

-- Version 4: Backfill missing data
UPDATE content 
SET view_count = COALESCE(view_count, 0),
    like_count = COALESCE(like_count, 0),
    share_count = COALESCE(share_count, 0);
```

### Data Backfills
```sql
-- Backfill user initials
UPDATE users 
SET initials = UPPER(
  LEFT(SPLIT_PART(name, ' ', 1), 1) || 
  COALESCE(LEFT(SPLIT_PART(name, ' ', 2), 1), '')
)
WHERE initials IS NULL;

-- Backfill content statistics
WITH content_stats AS (
  SELECT 
    content_id,
    COUNT(*) as view_count,
    SUM(CASE WHEN action = 'like' THEN 1 ELSE 0 END) as like_count,
    SUM(CASE WHEN action = 'share' THEN 1 ELSE 0 END) as share_count
  FROM user_actions
  GROUP BY content_id
)
UPDATE content c
SET 
  view_count = COALESCE(cs.view_count, 0),
  like_count = COALESCE(cs.like_count, 0),
  share_count = COALESCE(cs.share_count, 0)
FROM content_stats cs
WHERE c.id = cs.content_id;
```

## Performance Optimization

### Indexing Strategy
```sql
-- B-tree indexes for equality and range queries
CREATE INDEX idx_content_published_status ON content(published_at, status);

-- GIN indexes for array columns
CREATE INDEX idx_content_tags_gin ON content USING GIN(tags);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(status) WHERE status = 'active';

-- Composite indexes for common query patterns
CREATE INDEX idx_user_content ON content(user_id, status, published_at DESC);
```

### Query Optimization
```sql
-- Use EXPLAIN ANALYZE to understand query performance
EXPLAIN ANALYZE
SELECT * FROM content 
WHERE status = 'published'
ORDER BY published_at DESC
LIMIT 20;

-- Use CTEs for complex queries
WITH user_stats AS (
  SELECT 
    user_id,
    COUNT(*) as content_count,
    SUM(view_count) as total_views
  FROM content
  WHERE status = 'published'
  GROUP BY user_id
)
SELECT 
  u.*,
  us.content_count,
  us.total_views
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id
ORDER BY us.total_views DESC NULLS LAST;
```

## File Structure

- `database/schema/` - SQL migration files
- `database/models/` - Data model definitions
- `database/seeders/` - Seed data for development
- `database/migrations/` - Migration scripts
- `database/indexes/` - Index optimization scripts

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Design for UI Applications](https://www.oreilly.com/library/view/database-design-for/9781491978610/)
- [Material Design Data Tables](https://m3.material.io/components/data-tables)
- [JSON Schema Validation](https://json-schema.org/)