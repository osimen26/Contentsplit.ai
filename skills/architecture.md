# ContentSplit Architecture Overview

## System Architecture

ContentSplit follows a modular, component-based architecture with a centralized design token system. The architecture is designed for scalability, maintainability, and consistency across the entire application ecosystem.

## Core Architectural Principles

### 1. Design Token First
- All styling originates from the design token system (`--sys-*` CSS custom properties)
- Tokens are defined in `design-tokens-ultimate.css` and sourced from `design-tokens.tokens.json`
- Components reference tokens, never hard-coded values

### 2. Component-Based UI
- UI built from reusable, self-contained components
- Components follow Material Design 3 specifications
- Each component has clear API, states, and accessibility requirements

### 3. Separation of Concerns
- **Design Tokens**: Visual styling constants (colors, typography, spacing, elevation)
- **Components**: Reusable UI elements with defined behavior
- **Layouts**: Page structures and responsive grids
- **Utilities**: Helper functions and mixins

### 4. Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experiences with modern browser features
- Graceful degradation for older browsers

## Architecture Layers

### 1. Foundation Layer (Design Tokens)
```
┌─────────────────────────────────────┐
│         Design Token System          │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │  Color  │ │   Typo  │ │ Elev.  │ │
│  │ Tokens  │ │ Tokens  │ │ Tokens │ │
│  └─────────┘ └─────────┘ └────────┘ │
└─────────────────────────────────────┘
```

**Key Files:**
- `design-tokens.tokens.json` - Source tokens from Figma
- `convert-tokens-ultimate.js` - Token conversion script
- `design-tokens-ultimate.css` - Generated CSS custom properties
- `skills/color.md`, `skills/typography.md`, `skills/elevation.md` - Documentation

### 2. Component Layer (UI Building Blocks)
```
┌─────────────────────────────────────┐
│         Component Library            │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│  │Button│ │Input│ │Card │ │Icon │    │
│  └─────┘ └─────┘ └─────┘ └─────┘    │
└─────────────────────────────────────┘
```

**Key Files:**
- `skills/button.md` - Button component specifications
- `skills/input.md` - Input component specifications
- `skills/card.md` - Card component specifications
- `skills/icons.md` - Icon system specifications
- `skills/component-specification.md` - General component patterns
- `skills/table.md` - Table component specifications
- `skills/toast.md` - Toast component specifications
- `skills/modal.md` - Modal component specifications
- `skills/select.md` - Select component specifications
- `skills/navigation.md` - Navigation component specifications
- `skills/chips.md` - Chip component specifications
- `skills/tooltips.md` - Tooltip component specifications

### 3. Pattern Layer (Common UI Patterns)
```
┌─────────────────────────────────────┐
│           UI Patterns                │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ Forms   │ │ Navigation │ Layouts│ │
│  │ Patterns│ │ Patterns │ Patterns│ │
│  └─────────┘ └─────────┘ └────────┘ │
└─────────────────────────────────────┘
```

**Key Files:**
- `skills/form-field.md` - Form field patterns
- `skills/navigation.md` - Navigation patterns
- `skills/ux-usage.md` - UX usage patterns
- `skills/onboarding-login-flow.md` - Authentication flows
- `skills/api-integration.md` - API integration patterns

### 4. Application Layer (Feature Implementation)
```
┌─────────────────────────────────────┐
│         Application Features         │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │Content  │ │  AI     │ │Safety  │ │
│  │Management│ │Features │ │Features│ │
│  └─────────┘ └─────────┘ └────────┘ │
└─────────────────────────────────────┘
```

**Key Files:**
- `skills/ai-integration.md` - AI feature integration
- `skills/content-safety.md` - Content moderation and safety
- `skills/database.md` - Data models and storage

## Technical Stack

### Frontend Architecture
```javascript
// Component Structure Example
const Component = {
  // Design Token Integration
  styles: {
    backgroundColor: 'var(--sys-color-primary-40)',
    color: 'var(--sys-color-primary-100)',
    fontFamily: 'var(--sys-typography-body-text-font-family)',
    boxShadow: 'var(--sys-elevation-1)'
  },
  
  // Component API
  props: {
    variant: 'primary' | 'secondary' | 'tertiary',
    size: 'small' | 'medium' | 'large',
    disabled: boolean
  },
  
  // Accessibility
  a11y: {
    role: 'button',
    ariaLabel: 'string',
    keyboardNavigation: true
  }
};
```

### Design Token Pipeline
```
Figma Design Tokens
        ↓
design-tokens.tokens.json
        ↓
convert-tokens-ultimate.js
        ↓
design-tokens-ultimate.css
        ↓
CSS Custom Properties (--sys-*)
        ↓
Component Implementation
```

### Build and Deployment
- **CSS Processing**: PostCSS with custom properties polyfill for older browsers
- **Component Bundling**: Module bundler with tree-shaking
- **Performance Optimization**: Critical CSS extraction, code splitting
- **Testing**: Visual regression tests, accessibility audits

## File Organization

```
contentsplit.ai/
├── design-tokens.tokens.json          # Source design tokens
├── convert-tokens-ultimate.js         # Token conversion script
├── design-tokens-ultimate.css         # Generated CSS tokens
├── agent.md                           # AI agent guide
└── skills/
    ├── architecture.md                # This file
    ├── skill.md                       # Engineering standards
    ├── documentation.md               # Documentation standards
    ├── testing.md                     # Testing system
    ├── validation.md                  # Validation system
    │
    ├── Foundation/
    │   ├── color.md                   # Color system
    │   ├── typography.md              # Typography system
    │   ├── elevation.md               # Elevation system
    │   ├── spacing.md                 # Spacing system
    │   └── radius.md                  # Radius system
    │
    ├── Components/
    │   ├── button.md                  # Button components
    │   ├── input.md                   # Input components
    │   ├── card.md                    # Card components
    │   ├── icons.md                   # Icon system
    │   ├── form-field.md              # Form field patterns
    │   ├── component-specification.md # Component patterns
    │   ├── table.md                   # Table components
    │   ├── toast.md                   # Toast components
    │   ├── modal.md                   # Modal components
    │   ├── select.md                  # Select components
    │   ├── navigation.md              # Navigation components
    │   ├── chips.md                   # Chip components
    │   └── tooltips.md                # Tooltip components
    │
    ├── State & Feedback/
    │   ├── notification.md            # Notification system
    │   ├── loading-state.md           # Loading states
    │   ├── progress-state.md          # Progress states
    │   ├── progress.md                # Progress indicators
    │   └── empty-states.md            # Empty states
    │
    ├── Layout & Responsive/
    │   ├── layout.md                  # Layout grid system
    │   ├── mobile.md                  # Mobile design
    │   └── responsive.md              # Responsive design
    │
    ├── UX & Strategy/
    │   ├── ux-usage.md                # UX patterns
    │   ├── ux-experience.md           # UX strategy
    │   └── errorusage.md              # Error handling
    │
    └── Integration & Data/
        ├── api-integration.md         # API patterns
        ├── ai-integration.md          # AI integration
        ├── content-safety.md          # Safety features
        ├── database.md                # Data models
        └── onboarding-login-flow.md   # Auth flows
```

## Development Workflow

### 1. Design Token Updates
1. Update tokens in Figma
2. Export to `design-tokens.tokens.json`
3. Run `node convert-tokens-ultimate.js`
4. Verify changes in `design-tokens-ultimate.css`
5. Update relevant documentation

### 2. Component Development
1. Reference design tokens in component styles
2. Follow component specifications in skills/*.md files
3. Implement accessibility requirements
4. Test across browsers and devices
5. Document usage examples

### 3. Feature Implementation
1. Use existing components and patterns
2. Follow UX guidelines in `skills/ux-usage.md`
3. Implement error handling per `skills/errorusage.md`
4. Integrate AI features per `skills/ai-integration.md`
5. Follow security patterns in `skills/content-safety.md`

## Performance Considerations

### CSS Performance
- Use CSS custom properties for theming
- Minimize specificity conflicts
- Implement critical CSS for above-the-fold content
- Use CSS containment for complex components

### JavaScript Performance
- Lazy load non-critical components
- Implement virtual scrolling for long lists
- Use requestAnimationFrame for animations
- Implement proper memory management

### Asset Optimization
- Optimize images and icons
- Implement responsive images
- Use modern image formats (WebP, AVIF)
- Implement font loading strategies

## Accessibility Architecture

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA attributes where necessary
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### Accessibility Testing
- Automated testing with axe-core
- Manual keyboard navigation testing
- Screen reader testing (NVDA, VoiceOver)
- Color contrast verification

## Security Architecture

### Frontend Security
- Content Security Policy (CSP)
- XSS protection through input sanitization
- CSRF token implementation
- Secure cookie handling

### Data Protection
- Client-side encryption for sensitive data
- Secure API communication (HTTPS, TLS 1.3)
- Data validation and sanitization
- Privacy-by-design principles

## Scalability Considerations

### Design System Scalability
- Token system supports theme variants
- Component system supports composition
- Documentation system supports growth
- Versioning strategy for breaking changes

### Performance Scalability
- Progressive loading for large datasets
- Virtualization for complex UIs
- Caching strategies for static assets
- CDN integration for global distribution

## Monitoring and Maintenance

### Health Monitoring
- Performance metrics collection
- Error tracking and reporting
- User interaction analytics
- Accessibility compliance monitoring

### Maintenance Strategy
- Regular dependency updates
- Security vulnerability scanning
- Performance optimization cycles
- Documentation updates with changes

## Integration Points

### External Systems
- **Authentication Providers**: OAuth, SAML, OpenID Connect
- **AI Services**: GPT, Claude, custom ML models
- **Storage Solutions**: S3, Cloud Storage, CDN
- **Analytics**: Google Analytics, Mixpanel, custom

### Internal Integration
- Design token system with component library
- Component library with application framework
- UX patterns with feature implementation
- Documentation with code implementation

## Future Architecture Considerations

### Planned Enhancements
- **Dark Mode Support**: Token system ready, implementation pending
- **Internationalization**: RTL support, localization patterns
- **Advanced Animations**: Motion design system
- **Design System API**: Programmatic access to tokens and components

### Technical Debt Management
- Regular architecture reviews
- Refactoring cycles for legacy code
- Documentation maintenance
- Test coverage improvement

---

*This architecture document provides the foundation for all ContentSplit development. All team members should follow these architectural principles and patterns to maintain consistency and quality across the application.*