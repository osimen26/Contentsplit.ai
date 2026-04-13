# Software Engineering Standards

## Overview
This document defines engineering standards and practices for building maintainable, scalable, and high-quality software systems. These rules prioritize readability, maintainability, and safety over premature feature development.

## Priority Levels
- **P0 (Mandatory)**: Critical for safety, security, and basic functionality
- **P1 (Strongly Recommended)**: Essential for maintainability and team collaboration
- **P2 (Recommended)**: Best practices for quality and long-term sustainability

## Principles Over Tools
The standards in this document emphasize **principles over specific tools**. Examples may reference specific technologies (React, TypeScript, etc.) to illustrate patterns, but the underlying principles apply across technology stacks. Teams should select tools that best implement these principles for their specific context.

## Core Principles

### 1. General Skills Rule (P1)
**Prioritize foundational engineering skills over framework-specific knowledge.**
- Understand computer science fundamentals (algorithms, data structures, system design)
- Master language-agnostic concepts (clean code, testing, debugging, system thinking)
- Learn principles that transfer across technologies
- Stay current with evolving best practices while maintaining core competency

**Why this is necessary:** Framework-specific knowledge becomes obsolete quickly. Foundational skills ensure long-term adaptability and problem-solving capability.

### 2. Code Organization (P1)
**Structure code for discoverability and logical grouping.**
- Group related functionality together
- Separate concerns (business logic, UI, data access)
- Use clear directory hierarchies that reflect domain concepts

**Example structure:**
```
src/
├── components/     # UI components
├── features/       # Feature modules
├── lib/           # Shared utilities
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

**What to remove:** Avoid "utils" directories that become dumping grounds. Instead, create purpose-specific directories (e.g., `formatters/`, `validators/`).

### 3. Version Control Practices (P0)
**Maintain clean, descriptive git history for effective collaboration.**
- Use Conventional Commits format: `type(scope): description`
- Keep commits atomic and focused on single change
- Write meaningful commit messages that explain "why" not just "what"
- Use feature branches with descriptive names: `feature/short-description`, `fix/issue-123`
- Perform interactive rebase to squash fixup commits before merging
- Require pull request reviews for all changes to main branches

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix  
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons)
- `refactor`: Code refactoring without functional changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, build tools

**Example:**
```bash
git commit -m "feat(auth): add password reset functionality"
git commit -m "fix(api): handle null response in user endpoint"
git commit -m "docs(readme): update installation instructions"
```

**Why:** Clean git history enables effective debugging, code reviews, and automated changelog generation.

### 4. File Size Management (P1)
**Avoid large files (> 300 lines).**
- Split large components into smaller, focused components
- Extract helper functions and custom hooks
- Use composition over inheritance

**Why:** Large files are difficult to understand, test, and maintain. They often violate single responsibility principle.

### 5. Readability and Maintainability (P1)
**Prioritize readable, maintainable code over clever optimizations.**
- Write code that is easy to understand at a glance
- Use descriptive variable and function names
- Add comments for "why" not "what"
- Keep functions small and focused (≤ 20 lines)

**What to add:** Code reviews should focus on readability. Use tools like ESLint, Prettier, and SonarQube to enforce standards.

### 6. Feature Organization (P1)
**Organize features into small, focused modules.**
- Each feature should be self-contained
- Minimize cross-feature dependencies
- Use feature flags for gradual rollout

**Example:**
```
features/
├── authentication/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types.ts
├── dashboard/
└── settings/
```

**Why:** Isolated features are easier to develop, test, and remove if necessary.

### 7. Naming Conventions (P0)
**Consistent naming across the codebase.**

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `user-profile.tsx` |
| Directories | kebab-case | `feature-flags/` |
| Components | PascalCase | `UserProfile` |
| Functions | camelCase | `formatUserName()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Interfaces/Types | PascalCase (no `I` prefix) | `UserProfileProps` |
| Custom Hooks | camelCase (use prefix) | `useUserProfile()` |

**Why:** Consistent naming reduces cognitive load and improves code navigation.

### 8. Data Validation (P0)
**Validate all external and internal data.**
- Validate API responses with schema validation libraries
- Validate user input before processing
- Use TypeScript for compile-time validation
- Add runtime validation for critical paths

**Example:**
```typescript
// Using schema validation library
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().min(0).max(120)
});

type User = z.infer<typeof UserSchema>;

function processUser(data: unknown): User {
  return UserSchema.parse(data); // Throws if invalid
}
```

**What to add:** Always validate data at system boundaries (API endpoints, file imports, user inputs).

### 9. Error Handling Strategy (P0)
**Implement structured error handling for reliability and debuggability.**
- Classify errors: operational (expected) vs. programming (unexpected)
- Create custom error types for domain-specific errors
- Use try/catch blocks only where errors can be meaningfully handled
- Never swallow errors silently - log or rethrow with context
- Provide user-friendly messages for operational errors
- Include sufficient context for debugging (request IDs, user IDs, timestamps)

**Error Handling Patterns:**
```typescript
// Custom error type
class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Structured error response
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
  };
}

// Graceful degradation
function getDataWithFallback() {
  try {
    return await fetchData();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return getCachedData(); // Fallback
  }
}
```

**Logging Guidelines:**
- Use appropriate log levels: DEBUG, INFO, WARN, ERROR
- Never log sensitive data (passwords, tokens, PII)
- Include correlation IDs for tracing distributed requests
- Structure logs as JSON for machine parsing

**Why:** Proper error handling prevents silent failures, improves debugging, and enhances user experience through graceful degradation.

### 10. Compliance Enforcement (P1)
**Enforce rules automatically where possible.**
- Use linting tools for code quality
- Use code formatters for consistent styling
- Use git hooks for pre-commit validation
- Use CI/CD pipelines for automated testing

**Configuration guidelines:**
- Set maximum file size limits (e.g., 300 lines)
- Enforce complexity thresholds (cyclomatic complexity < 10)
- Limit function parameters (e.g., maximum 3 parameters)
- Configure automatic formatting rules
- Integrate security scanning in the pipeline

**Why:** Automated enforcement ensures consistency and catches issues early.

### 11. Documentation Standards (P1)
**Maintain comprehensive documentation for knowledge transfer and maintenance.**
- Write self-documenting code with clear naming and structure
- Add comments only for complex logic, business rules, or non-obvious decisions
- Document public APIs with JSDoc/TSDoc including examples
- Keep README files updated with setup, deployment, and contribution guidelines
- Maintain changelog following Keep a Changelog format
- Document architecture decisions using ADRs (Architecture Decision Records)

**README Structure:**
```markdown
# Project Name
Brief description

## Features
- Key features

## Getting Started
### Prerequisites
### Installation
### Development Setup

## Architecture
High-level overview

## Deployment
Instructions

## Contributing
Guidelines

## License
```

**Code Documentation Example:**
```typescript
/**
 * Calculates user engagement score based on activity metrics.
 * @param activities - Array of user activity objects
 * @param timeframe - Time period to consider (in days)
 * @returns Engagement score between 0 and 100
 * @throws {ValidationError} If activities is empty or timeframe is invalid
 * @example
 * const score = calculateEngagementScore(userActivities, 30);
 */
function calculateEngagementScore(activities: Activity[], timeframe: number): number {
  // Implementation
}
```

**Why:** Good documentation reduces onboarding time, enables maintenance, and prevents knowledge silos.

### 12. Performance Optimization Guidelines (P1)
**Proactively optimize for performance throughout development.**
- Implement code splitting and lazy loading for large bundles
- Use memoization (React.memo, useMemo, useCallback) for expensive computations
- Optimize images (compression, modern formats, responsive sizing)
- Minimize re-renders with proper state management
- Implement virtualized lists for large datasets
- Use Web Workers for CPU-intensive tasks

**Performance Budgets:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms  
- Cumulative Layout Shift (CLS): < 0.1
- Bundle size: < 200KB initial, < 1MB total

**Optimization Examples:**
```typescript
// Lazy loading components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Memoization
const ExpensiveComponent = React.memo(({ data }) => {
  const processed = useMemo(() => processData(data), [data]);
  return <div>{processed}</div>;
});

// Image optimization
<img
  src="image.jpg"
  srcSet="image-400.jpg 400w, image-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Descriptive alt text"
  loading="lazy"
/>
```

**Why:** Performance directly impacts user experience, conversion rates, and SEO rankings.

### 13. Dependency Management (P0)
**Manage dependencies securely and efficiently.**
- Regularly update dependencies using automated tools (Dependabot, Renovate)
- Audit dependencies for security vulnerabilities weekly
- Pin dependency versions in package.json (use exact versions, not ranges)
- Remove unused dependencies to reduce attack surface
- Verify license compatibility for all dependencies
- Maintain a lock file (package-lock.json, yarn.lock) and commit it

**Update Process:**
1. Automated PR from dependency bot
2. Run tests to verify compatibility
3. Manual review of changelogs for breaking changes
4. Deploy to staging for integration testing
5. Merge and deploy to production

**Security Checks:**
- Use `npm audit` or `yarn audit` regularly
- Integrate security scanning in CI/CD pipeline
- Monitor for reported vulnerabilities in dependencies
- Have a rollback plan for critical vulnerability patches

**Why:** Unmanaged dependencies are a major security risk and source of technical debt.

### 14. User Interface Rules (P1)
**Build accessible, responsive, and intuitive interfaces.**
- Follow WCAG accessibility guidelines
- Use semantic HTML
- Implement responsive design (mobile-first)
- Ensure keyboard navigation works
- Provide appropriate ARIA labels

**What to remove:** Custom UI components that replicate native browser functionality without added value.

### 15. Product Safety (P0)
**Prioritize user safety and data protection.**
- Never log sensitive data (passwords, tokens, PII)
- Use HTTPS for all communications
- Implement proper authentication and authorization
- Sanitize user inputs to prevent XSS
- Use parameterized queries to prevent SQL injection

**Critical safety checks:**
- Validate file uploads (type, size, content)
- Implement rate limiting
- Use CSP headers
- Regular security dependency audits

### 16. Testing Expectations (P1)
**Comprehensive testing at all levels.**

| Test Type | Coverage Target | Tool Category |
|-----------|----------------|---------------|
| Unit Tests | 80%+ | Unit testing frameworks |
| Integration Tests | Critical paths | Integration testing tools |
| E2E Tests | User journeys | E2E testing frameworks |
| Performance Tests | Key metrics | Performance measurement tools |

**Testing principles:**
- Test behavior, not implementation
- Use meaningful test descriptions
- Avoid testing third-party libraries
- Mock external dependencies

## Code Review Checklist
### Code Quality
- [ ] Follows naming conventions (kebab-case files, PascalCase components, camelCase functions)
- [ ] File size ≤ 300 lines
- [ ] Functions ≤ 20 lines
- [ ] No commented-out code or dead code
- [ ] Code is self-documenting with clear naming

### Testing & Validation
- [ ] Adequate test coverage for new functionality
- [ ] Data validation at system boundaries
- [ ] Error handling with proper logging and user feedback
- [ ] Edge cases and error scenarios tested

### Security & Safety
- [ ] Security reviewed (authentication, authorization, input sanitization)
- [ ] No sensitive data in logs or error messages
- [ ] Dependency versions pinned and audited
- [ ] Performance implications considered

### Documentation
- [ ] Public APIs documented
- [ ] Complex logic explained with comments
- [ ] README updated if necessary
- [ ] Architecture decisions documented for significant changes

### Compliance
- [ ] Accessibility considerations (semantic HTML, ARIA labels, keyboard navigation)
- [ ] Performance budgets respected (LCP, FID, CLS, bundle size)
- [ ] Follows established patterns and conventions
- [ ] No unnecessary dependencies added

## Adoption and Evolution

### Enforcement Mechanisms
- **Code Reviews**: Use checklist as mandatory review criteria
- **Automated Checks**: Integrate linting, testing, and security scanning in CI/CD
- **Regular Audits**: Quarterly review of compliance with standards
- **Training**: Onboarding sessions for new team members
- **Exception Process**: Documented process for requesting rule exceptions with justification

### Evolution Process
These rules should evolve with the project. Regular retrospectives should assess:
- What rules are working well
- What rules need adjustment or removal
- New practices that should be adopted
- Tooling changes that affect enforcement

**Goal**: Continuous improvement, not rigid adherence. The standards should serve the team, not hinder productivity.

### Rule Prioritization
- **P0 (Mandatory)**: Non-negotiable for safety, security, and collaboration
- **P1 (Strongly Recommended)**: Expected for all new code; exceptions require approval
- **P2 (Recommended)**: Best practices; encouraged but not strictly enforced

*Living document - Last reviewed: When significant changes occur*