# ContentSplit.ai

AI-powered content adaptation platform that transforms your content across platforms with intelligent tone matching and optimization.

## Features

- **AI-Powered Content Adaptation**: Transform content for different platforms (Twitter, LinkedIn, Instagram, Email)
- **Tone Matching**: Professional, Casual, or Punchy tone options
- **Clean Claude-Inspired UI**: 3-zone layout with collapsible sidebar
- **Material Design 3**: Comprehensive design system with 904 design tokens
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Real-time Content Generation**: Instant AI-powered content adaptation
- **Usage Analytics**: Track monthly usage and limits
- **User Profiles**: Manage settings and subscription tiers

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Zustand, React Query (TanStack)
- **Routing**: React Router DOM v7
- **Styling**: CSS Modules with Material Design 3 tokens
- **Testing**: Vitest, React Testing Library
- **API Client**: Axios with interceptors
- **Build Tool**: Vite with path aliases

## Project Structure

```
Contentsplit.ai/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Core MD3 UI components
│   │   └── application/    # Application-specific components
│   ├── layouts/            # Layout components (ClaudeLayout, MainLayout)
│   ├── pages/              # Page components
│   ├── services/           # API client and query hooks
│   ├── contexts/           # React contexts (Auth, Theme)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles
├── components/             # CSS component library (25+ components)
├── design-tokens-ultimate.css # 904 MD3 design tokens
├── skills/                # MD documentation (40+ design system files)
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Contentsplit.ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Design System

ContentSplit.ai uses a comprehensive Material Design 3 (MD3) design system:

### Design Tokens

- **904 design tokens** in `design-tokens-ultimate.css`
- Typography scale with 5 display sizes, 3 headline sizes, 3 title sizes, 3 body sizes
- Color system with semantic roles (primary, secondary, error, success, warning)
- Spacing system (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Elevation levels (0-5)
- Border radius tokens

### Component Library

- **25+ CSS components** implementing MD3 specifications
- React components with TypeScript interfaces
- Accessibility compliant (WCAG 2.1)
- Responsive behavior for all screen sizes

### Layout System

- **3-zone Claude-inspired layout**: Sidebar Navigation, Main Content, Utility Panel
- Collapsible sidebar (240px expanded / 72px collapsed)
- Max-width constrained main content area (960px-1200px)
- Smooth animations and transitions

## Architecture

### Layout Components

- **`ClaudeLayout`**: Primary 3-zone layout with collapsible sidebar
- **Navigation**: Hierarchical navigation with primary sections (Dashboard, Create, History, Settings)
- **Responsive Design**: Mobile-first approach with breakpoints at 320px, 641px, 1025px

### API Integration

- **`ApiClient`**: Axios-based client with interceptors for auth and error handling
- **React Query**: Data fetching, caching, and synchronization
- **Environment Variables**: Configurable API base URLs and timeouts

### State Management

- **Zustand**: Lightweight store for global state
- **React Context**: For theme and authentication
- **Local Storage**: Persistent auth token storage

## Testing

The project includes comprehensive test coverage:

- **175 tests** across all application components
- Vitest with React Testing Library
- MSW for API mocking
- Test coverage reporting

Run tests:

```bash
npm run test              # Run all tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Generate coverage report
```

## Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting
- **Path Aliases**: Clean import paths (`@/`, `@components/`, etc.)

## Deployment

### Production Build

1. Build the application:

   ```bash
   npm run build
   ```

2. The build output will be in the `dist/` directory.

3. Preview the production build:
   ```bash
   npm run preview
   ```

### Deployment Options

- **Static Hosting**: Deploy `dist/` to Netlify, Vercel, GitHub Pages, or S3
- **Docker**: Create a Docker container with Nginx
- **Traditional Hosting**: Serve with any web server (Nginx, Apache)

### Environment Configuration

Create environment files for different environments:

- `.env.local` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

Required environment variables (see `.env.example`):

- `VITE_API_BASE_URL` - API base URL
- `VITE_API_TIMEOUT` - API request timeout
- `VITE_AUTH_TOKEN_KEY` - Local storage key for auth token

## Performance

- **Bundle Size**: ~280kB CSS, ~236kB JavaScript (gzipped)
- **Lazy Loading**: Route-based code splitting
- **Optimized Assets**: Vite-optimized images and fonts
- **Minimal Dependencies**: Carefully selected dependency tree

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels and roles
- Focus management
- Color contrast compliance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC License

## Payment System

ContentSplit.ai integrates with **Flutterwave** for Nigerian Naira (NGN) payments, with support for **Stripe** as an alternative.

### Subscription Tiers

| Tier | Price (NGN) | Conversions/Month | Features |
|------|--------------|------------------|----------|
| Free | ₦0 | 10/month | Basic tones |
| Pro | ₦5,000 | 100/month | All tones, Priority support |
| Agency | ₦15,000 | Unlimited | All tones, Team access, Priority support |

### Flutterwave Setup

1. **Get API Keys**
   - Go to [Flutterwave Dashboard](https://dashboard.flutterwave.com/dashboard/settings/apis)
   - Copy your **Public Key** and **Secret Key**

2. **Configure Environment Variables**
   ```bash
   # server/.env
   FLUTTERWAVE_PUBLIC_KEY=your_public_key
   FLUTTERWAVE_SECRET_KEY=your_secret_key
   FLUTTERWAVE_SECRET_HASH=your_secret_hash
   APP_URL=http://localhost:3000
   ```

3. **Set Up Webhook** (for automatic payment verification)
   - Go to Flutterwave Dashboard → Settings → Webhooks
   - Add URL: `https://your-server.com/api/payments/webhook`
   - Set the secret hash you generated

### Payment Flow

```
1. User selects plan in app
2. App calls POST /api/payments/initiate
3. Server creates Flutterwave payment link
4. User redirected to Flutterwave checkout
5. User completes payment
6. Flutterwave sends webhook to server
7. Server updates user tier in database
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/api/plans` | Get available subscription plans |
| POST | `/api/payments/initiate` | Create payment link (requires auth) |
| POST | `/api/payments/webhook` | Flutterwave webhook handler |
| GET | `/api/payments/verify/:reference` | Verify payment after redirect |

### Stripe Backup (Optional)

Stripe can be used as an alternative. Add keys:

```bash
# server/.env
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PRO_PRICE_ID=price_...
STRIPE_AGENCY_PRICE_ID=price_...
```

---

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/osimen26/Contentsplit.ai/issues).
