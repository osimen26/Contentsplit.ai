# ContentSplit.ai - Payment Integration Guide

## Overview

ContentSplit.ai uses **Flutterwave** as the primary payment processor for Nigerian Naira (NGN) transactions. Stripe is included as an optional alternative for international payments.

---

## Flutterwave Integration

### Prerequisites

- Flutterwave account: https://dashboard.flutterwave.com
- Your server must be publicly accessible (for webhooks)

### Step 1: Get API Keys

1. Log in to [Flutterwave Dashboard](https://dashboard.flutterwave.com)
2. Go to **Settings** → **API Keys**
3. Copy the **Secret Key** (starts with `FLW-`)

### Step 2: Generate Secret Hash

1. Go to **Settings** → **Webhooks**
2. Click **Generate Hash** in the "Event Hash" section
3. Copy the generated hash

### Step 3: Configure Environment

Add to `server/.env`:

```env
# Flutterwave Configuration
FLUTTERWAVE_PUBLIC_KEY=your_public_key
FLUTTERWAVE_SECRET_KEY=your_secret_key
FLUTTERWAVE_SECRET_HASH=your_secret_hash

# Your app URL (required for payment redirect)
APP_URL=http://localhost:3000
```

### Step 4: Set Up Webhook

1. In Flutterwave Dashboard → **Settings** → **Webhooks**
2. Click **Add New Webhook**
3. Enter your endpoint URL:
   ```
   https://your-domain.com/api/payments/webhook
   ```
   - For local testing: use ngrok or similar
4. Select events:
   - `charge.completed`
   - `payment.link.created`
5. Add the secret hash from Step 2

### Step 5: Test the Integration

```bash
# Health check to verify Flutterwave is loaded
curl http://localhost:3001/api/health

# Should show: "Payments: Flutterwave"
```

---

## Payment Flow Diagram

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│  Customer  │         │  Frontend  │         │   Backend   │
└──────┬──────┘         └──────┬──────┘         └──────┬──────┘
       │                     │                      │
       │  1. Select Plan    │                      │
       │───────────────────>│                      │
       │                     │                      │
       │              2. POST /api/payments/initiate
       │                     │─────────────────────>│
       │                     │                      │
       │                     │              3. Create Payment Link
       │                     │              (Flutterwave API)
       │                     │<────────────────────│
       │                     │                      │
       │  4. Return Payment URL                      │
       │<───────────────────│                      │
       │                     │                      │
       │  5. Redirect to Flutterwave Checkout       │
       │────────────────────────────────────────>│
       │                     │                      │
       │              6. User completes payment      │
       │<─────────────────────────────────────────│
       │                     │                      │
       │  7. Redirect to /payment-callback          │
       │────────────────────��───────────────────>│
       │                     │                      │
       │              8. Verify Payment        │
       │              GET /api/payments/verify/:ref
       │                     │────────────────────>│
       │                     │                      │
       │ 9. POST /api/payments/webhook        │
       │   (Flutterwave → Backend)            │
       │<─────────────────────────────────────│
       │                     │                      │
       │              10. Update User Tier    │
       │              (Supabase)              │
       │                     │────────────────────>│
```

---

## API Reference

### GET /api/plans

Get available subscription plans.

**Response:**
```json
{
  "plans": [
    { "id": "free", "name": "Free", "price": 0, "features": ["10 conversions/month"] },
    { "id": "pro", "name": "Pro", "price": 5000, "currency": "NGN", "features": ["100 conversions/month"] },
    { "id": "agency", "name": "Agency", "price": 15000, "currency": "NGN", "features": ["Unlimited conversions"] }
  ]
}
```

### POST /api/payments/initiate

Create a Flutterwave payment link. Requires authentication.

**Request:**
```json
{
  "planId": "pro"
}
```

**Response:**
```json
{
  "paymentLink": "https://checkout.flutterwave.com/...",
  "reference": "CS_1234567890_user123"
}
```

### POST /api/payments/webhook

Flutterwave webhook endpoint. Called automatically after payment.

**Headers:**
```
flutterwave-webhook-signature: your_secret_hash
```

**Request Body:**
```json
{
  "event": "charge.completed",
  "data": {
    "tx_ref": "CS_1234567890_user123",
    "amount": 5000,
    "status": "successful"
  }
}
```

**Response:**
```json
{
  "received": true
}
```

### GET /api/payments/verify/:reference

Verify payment after user is redirected back to app.

**Response:**
```json
{
  "success": true,
  "tier": "pro"
}
```

---

## Testing Payments

### Local Testing

1. Use **ngrok** to expose your local server:
   ```bash
   ngrok http 3001
   ```

2. Use the ngrok URL in Flutterwave Dashboard webhook settings

3. Use Flutterwave **Test Mode** cards:
   - Card number: `4181237412354`
   - CVV: `123`
   - PIN: `1234`
   - OTP: `12345`

### Test Checklist

- [ ] Flutterwave API keys added to server/.env
- [ ] APP_URL set to your domain
- [ ] Webhook configured in Flutterwave Dashboard
- [ ] Secret hash matches FLUTTERWAVE_SECRET_HASH
- [ ] Backend logs show "Flutterwave initialized"

---

## Troubleshooting

### "Payment system not configured"

Flutterwave keys are missing or invalid in `server/.env`

### Webhook not firing

1. Check webhook URL is publicly accessible
2. Verify secret hash matches
3. Check Flutterwave Dashboard for webhook logs

### User tier not updating

1. Check webhook is receiving the correct tx_ref format
2. Verify user ID is being extracted correctly
3. Check database connection

### Amount mismatch

The webhook extracts tier from amount:
- ₦15,000+ → agency
- ₦5,000+ → pro
- Less → free

---

## Stripe Alternative

For international payments (USD), configure Stripe:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_AGENCY_PRICE_ID=price_...
```

Stripe uses different endpoints:
- `POST /api/payments/create-subscription`
- `POST /api/payments/webhook` (Stripe webhook)

Contact the maintainer to add Stripe support.