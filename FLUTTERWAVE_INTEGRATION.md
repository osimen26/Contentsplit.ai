# Flutterwave Integration & Daily Usage Limits

## Overview
This document describes the Flutterwave payment integration for ContentSplit.ai with daily generation limits based on user tiers.

## Tier Structure & Daily Limits

| Tier | Daily Limit | Monthly Equivalent | Price (NGN) | Features |
|------|--------------|---------------------|----------------|----------|
| Free | 5 conversions/day | ~150/month | ₦0 | Basic tones, single user |
| Pro | 100 conversions/day | ~3,000/month | ₦5,000/month | All tones, priority support |
| Agency | Unlimited/day | Unlimited | ₦15,000/month | Team access, API access |

## Architecture

### Backend (server/index.js)
1. **Daily Usage Tracking** - Counts conversions from `00:00:00` to `23:59:59` local time
2. **Usage Endpoint** - `GET /api/users/usage` returns:
   ```json
   {
     "daily_usage": 3,
     "daily_limit": 5,
     "conversions_today": 3
   }
   ```
3. **Limit Enforcement** - `POST /api/conversions/generate` checks daily limit before generating
4. **Payment Initiation** - `POST /api/payments/initiate` creates Flutterwave payment link
5. **Webhook Handler** - `POST /api/payments/webhook` updates user tier on successful payment

### Frontend
1. **PaymentCallbackPage** - Handles Flutterwave redirect after payment
2. **SettingsPage** - Displays usage stats via TierUsagePanel
3. **ContentCreationPage** - Shows limit warnings, prevents generation when limit reached

## Database

### Users Table (existing)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'agency')),
  -- ... other fields
);
```

### Optional: Daily Usage Table (for performance)
```sql
CREATE TABLE IF NOT EXISTS public.daily_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  conversion_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, usage_date)
);

-- Auto-increment trigger
CREATE OR REPLACE FUNCTION increment_daily_usage()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.daily_usage (user_id, usage_date, conversion_count)
  VALUES (NEW.user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, usage_date) 
  DO UPDATE SET conversion_count = daily_usage.conversion_count + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_daily_usage
  AFTER INSERT ON public.conversions
  FOR EACH ROW EXECUTE FUNCTION increment_daily_usage();
```

## API Endpoints

### GET /api/users/usage
Returns daily usage statistics.
```json
{
  "daily_usage": 3,
  "daily_limit": 5,
  "conversions_today": 3
}
```

### POST /api/conversions/generate
Returns `429 Too Many Requests` when daily limit is reached:
```json
{
  "error": "Daily limit reached. You've used 5/5 conversions today. Upgrade your plan for more.",
  "limit_reached": true,
  "daily_usage": 5,
  "daily_limit": 5
}
```

### POST /api/payments/initiate
Initiates Flutterwave payment session.
```json
{
  "link": "https://checkout.flutterwave.com/..."
}
```

### POST /api/payments/webhook
Handles Flutterwave webhook events (`charge.completed`).

### GET /api/payments/verify/:reference
Verifies payment status after redirect.
```json
{
  "status": "success",
  "tier": "pro",
  "message": "Payment verified successfully"
}
```

## Environment Variables

```env
# Flutterwave
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxxxxxxxxxxxxxxxxxx-X
FLUTTERWAVE_SECRET_KEY=FLWSECK-xxxxxxxxxxxxxxxxxxxxx-X
FLUTTERWAVE_WEBHOOK_SECRET=your_webhook_secret

# Client URL for redirects
CLIENT_URL=http://localhost:5173
```

## Payment Flow

1. User clicks "Upgrade" in SettingsPage
2. Frontend calls `POST /api/payments/initiate` with `{ plan: 'pro' }`
3. Backend creates Flutterwave payment link with:
   - `tx_ref`: `CS_{timestamp}_{userId}`
   - `amount`: Plan amount (5000 for Pro, 15000 for Agency)
   - `redirect_url`: `{CLIENT_URL}/payment-callback/{reference}`
4. User redirected to Flutterwave checkout
5. After payment, Flutterwave redirects to `/payment-callback/{reference}`
6. PaymentCallbackPage verifies payment via `GET /api/payments/verify/:reference}`
7. On success, user tier updated in database
8. Webhook also updates tier (idempotent)

## Frontend Integration

### SettingsPage
```tsx
import { TierUsagePanel } from '@components/application'

// Inside SettingsPage
<TierUsagePanel
  currentTier={user?.tier || 'free'}
  dailyUsage={usageStats?.daily_usage || 0}
  dailyLimit={usageStats?.daily_limit || 5}
  onUpgrade={(tier) => {
    apiClient.initiatePayment(tier)
      .then(data => {
        window.location.href = data.link // Redirect to Flutterwave
      })
  }}
/>
```

### PaymentCallbackPage
Handles `/payment-callback/:reference` route:
- Shows loading spinner while verifying
- Displays success message with new tier
- Redirects to settings after 3 seconds
- Shows error message if verification fails

## Testing

### Test Daily Limits
1. Set user tier to 'free'
2. Make 5 generation requests (should succeed)
3. 6th request should return `429` with `limit_reached: true`

### Test Payment Flow
1. Use Flutterwave test cards: https://developer.flutterwave.com/docs/test-cards
2. Initiate payment for Pro plan (₦5,000)
3. Complete payment with test card
4. Verify user tier updated to 'pro'
5. Verify daily limit increased to 100

## Deployment Checklist

- [ ] Set Flutterwave environment variables in Vercel
- [ ] Configure Flutterwave webhook URL: `https://your-api.vercel.app/api/payments/webhook`
- [ ] Test payment flow in Flutterwave test mode
- [ ] Switch Flutterwave to live mode for production
- [ ] Update landing page to reflect daily limits (5/day for free)
- [ ] Monitor webhook deliveries in Flutterwave dashboard

## Files Modified/Created

| File | Action | Description |
|------|--------|-------------|
| `server/index.js` | Modified | Daily usage tracking, limit enforcement, updated `/api/users/usage` |
| `src/pages/PaymentCallbackPage.tsx` | Created | Handles Flutterwave redirect |
| `src/pages/SettingsPage.tsx` | Modified | Integrated TierUsagePanel |
| `src/services/api-client.ts` | Modified | Updated usage types, verifyPayment method |
| `src/services/query-hooks.ts` | Modified | Updated useUsageStats hook |
| `FLUTTERWAVE_INTEGRATION.md` | Created | This documentation |

## Known Issues & TODOs

1. **Timezone Handling**: Daily reset uses server local time (`setHours(0,0,0,0)`). Consider using UTC or user timezone.
2. **Race Conditions**: Concurrent requests might bypass limit. Use database transaction or row locking.
3. **Webhook Retries**: Flutterwave may send duplicate webhooks. Ensure idempotent handling.
4. **Anonymous Users**: Currently bypass limit checks. Consider limiting by IP address.

## References

- [Flutterwave Checkout Docs](https://developer.flutterwave.com/docs/quickstart/checkout)
- [Flutterwave Webhooks](https://developer.flutterwave.com/docs/verify-payments/webhooks)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
