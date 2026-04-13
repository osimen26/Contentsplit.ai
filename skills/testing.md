# ContentSplit Testing System

## Overview

The ContentSplit Testing System establishes guidelines for comprehensive, maintainable testing across the application. Following Google's testing principles and Material Design 3's emphasis on consistency, this system ensures that all components, especially AI-powered features, behave predictably and accessibly.

## Testing Principles

### Core Principles
1. **Confidence Over Coverage**: Tests should increase confidence, not just meet metrics
2. **Readable Tests**: Tests should document behavior and be understandable
3. **Fast Feedback**: Tests should run quickly to enable iterative development
4. **Realistic Scenarios**: Test real user interactions, not implementation details
5. **Accessibility First**: Ensure all components are accessible by default

## Testing Pyramid

### 1. Unit Tests (Foundation)
Test individual functions, utilities, and hooks in isolation.

**Scope:** Pure functions, utility functions, custom hooks
**Tools:** Vitest, Jest
**Location:** Co-located with source files or in `__tests__` folders
**Goal:** Fast, isolated verification of business logic

### 2. Component Tests (Mid-layer)
Test React components in isolation with realistic interactions.

**Scope:** Individual UI components
**Tools:** React Testing Library, Vitest
**Location:** Co-located with components or in `*.test.tsx` files
**Goal:** Verify component behavior and rendering

### 3. Integration Tests (Mid-layer)
Test interactions between multiple components or modules.

**Scope:** Component compositions, form flows, API integrations
**Tools:** React Testing Library, Vitest, MSW (Mock Service Worker)
**Location:** `__tests__/integration/` or feature test files
**Goal:** Verify combined functionality works correctly

### 4. E2E Tests (Top-layer)
Test complete user flows across the application.

**Scope:** Critical user journeys, AI workflows
**Tools:** Playwright, Cypress
**Location:** `e2e/` directory
**Goal:** Verify real user scenarios work end-to-end

## Testing Tools & Setup

### Test Runner: Vitest
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts',
      ],
    },
  },
});
```

### Testing Library Setup
```javascript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

### MSW for API Mocking
```javascript
// src/test/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Unit Testing Patterns

### Pure Function Testing
```javascript
// utils/formatDate.test.ts
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats ISO date string to human readable format', () => {
    const result = formatDate('2024-01-15T10:30:00Z');
    expect(result).toBe('Jan 15, 2024');
  });

  it('handles invalid date gracefully', () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('Invalid date');
  });

  it('accepts custom format options', () => {
    const result = formatDate('2024-01-15T10:30:00Z', { 
      month: 'long', 
      year: 'numeric' 
    });
    expect(result).toBe('January 2024');
  });
});
```

### Custom Hook Testing
```javascript
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('increments the counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements the counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('resets the counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});
```

### Utility Function Testing
```javascript
// utils/validation.test.ts
import { validateEmail, validatePassword } from './validation';

describe('validation utilities', () => {
  describe('validateEmail', () => {
    it('returns true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('returns false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('returns true for strong password', () => {
      expect(validatePassword('StrongPass123!')).toBe(true);
    });

    it('returns false for weak password', () => {
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('weakpass')).toBe(false);
      expect(validatePassword('WEAKPASS')).toBe(false);
    });
  });
});
```

## Component Testing Patterns

### Basic Component Test
```javascript
// components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-primary');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with icon', () => {
    render(<Button icon="plus">Add Item</Button>);
    
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });
});
```

### Form Component Test
```javascript
// components/Form/FormField.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label and input', () => {
    render(
      <FormField
        label="Email"
        name="email"
        type="email"
        value=""
        onChange={() => {}}
      />
    );
    
    const label = screen.getByText('Email');
    const input = screen.getByLabelText('Email');
    
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('shows error message when invalid', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        error="Email is required"
        onChange={() => {}}
      />
    );
    
    const errorMessage = screen.getByText('Email is required');
    const input = screen.getByLabelText('Email');
    
    expect(errorMessage).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(
      <FormField
        label="Search"
        name="search"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Search');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(handleChange).toHaveBeenCalledWith('test query');
  });

  it('shows helper text', () => {
    render(
      <FormField
        label="Password"
        name="password"
        value=""
        helperText="Must be at least 8 characters"
        onChange={() => {}}
      />
    );
    
    const helperText = screen.getByText('Must be at least 8 characters');
    expect(helperText).toBeInTheDocument();
  });
});
```

### Component with Context Test
```javascript
// components/ThemeToggle/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

const TestWrapper = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeToggle', () => {
  it('toggles theme when clicked', () => {
    render(<ThemeToggle />, { wrapper: TestWrapper });
    
    const toggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows correct label for current theme', () => {
    render(<ThemeToggle />, { wrapper: TestWrapper });
    
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAccessibleName('Switch to dark theme');
    
    fireEvent.click(toggle);
    expect(toggle).toHaveAccessibleName('Switch to light theme');
  });
});
```

## Integration Testing Patterns

### Form Submission Test
```javascript
// __tests__/integration/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../../components/ContactForm';
import { http, HttpResponse } from 'msw';

describe('ContactForm', () => {
  it('submits form successfully', async () => {
    server.use(
      http.post('/api/contact', () => {
        return HttpResponse.json({ success: true });
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Verify success state
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
    
    // Verify form is reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });

  it('shows validation errors', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Verify validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
    
    // Verify form was not submitted
    expect(screen.queryByText(/message sent successfully/i)).not.toBeInTheDocument();
  });

  it('handles server error', async () => {
    server.use(
      http.post('/api/contact', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
```

### API Integration Test
```javascript
// __tests__/integration/AIContentGeneration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AIContentGenerator } from '../../components/AIContentGenerator';
import { http, HttpResponse } from 'msw';

describe('AIContentGenerator', () => {
  it('generates content successfully', async () => {
    server.use(
      http.post('/api/generate-content', () => {
        return HttpResponse.json({
          content: 'Generated content based on your prompt.',
          tokensUsed: 42,
        });
      })
    );

    render(<AIContentGenerator />);
    const user = userEvent.setup();

    // Enter prompt
    await user.type(
      screen.getByLabelText(/prompt/i),
      'Write a short story about AI'
    );
    
    // Select options
    await user.selectOptions(screen.getByLabelText(/tone/i), 'creative');
    await user.click(screen.getByLabelText(/include examples/i));
    
    // Generate content
    await user.click(screen.getByRole('button', { name: /generate content/i }));
    
    // Verify loading state
    expect(screen.getByText(/generating content/i)).toBeInTheDocument();
    
    // Verify generated content
    await waitFor(() => {
      expect(screen.getByText(/generated content based on your prompt/i)).toBeInTheDocument();
    });
    
    // Verify tokens used
    expect(screen.getByText(/42 tokens used/i)).toBeInTheDocument();
  });

  it('handles streaming responses', async () => {
    server.use(
      http.post('/api/generate-stream', () => {
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue('Hello ');
            setTimeout(() => controller.enqueue('World'), 100);
            setTimeout(() => controller.close(), 200);
          },
        });
        
        return new HttpResponse(stream, {
          headers: { 'Content-Type': 'text/event-stream' },
        });
      })
    );

    render(<AIContentGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/prompt/i), 'Say hello');
    await user.click(screen.getByRole('button', { name: /generate content/i }));
    
    // Verify streaming content appears gradually
    await waitFor(() => {
      expect(screen.getByText(/hello/i)).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
  });
});
```

## E2E Testing Patterns

### Critical User Journey Test
```javascript
// e2e/content-creation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Content Creation Flow', () => {
  test('user can create and save AI-generated content', async ({ page }) => {
    // Navigate to content creation page
    await page.goto('/content/new');
    
    // Enter prompt
    await page.fill('[data-testid="prompt-input"]', 'Write a blog post about AI ethics');
    
    // Select options
    await page.selectOption('[data-testid="tone-select"]', 'professional');
    await page.fill('[data-testid="word-count-input"]', '500');
    
    // Generate content
    await page.click('[data-testid="generate-button"]');
    
    // Wait for generation to complete
    await expect(page.locator('[data-testid="generated-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="loading-indicator"]')).not.toBeVisible();
    
    // Edit generated content
    await page.fill('[data-testid="content-editor"]', 'Edited: AI ethics are important...');
    
    // Save content
    await page.click('[data-testid="save-button"]');
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    
    // Verify navigation to content list
    await expect(page).toHaveURL('/content');
    await expect(page.locator('[data-testid="content-list"]')).toContainText('AI ethics');
  });

  test('user receives validation errors for invalid input', async ({ page }) => {
    await page.goto('/content/new');
    
    // Try to generate with empty prompt
    await page.click('[data-testid="generate-button"]');
    
    // Verify validation error
    await expect(page.locator('[data-testid="prompt-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="prompt-error"]')).toContainText('Prompt is required');
    
    // Verify generation didn't start
    await expect(page.locator('[data-testid="generated-content"]')).not.toBeVisible();
  });
});
```

### Accessibility E2E Test
```javascript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should have no automatic accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('content creation form should be accessible', async ({ page }) => {
    await page.goto('/content/new');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="prompt-input"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="tone-select"]')).toBeFocused();
    
    // Test form labels
    await expect(page.locator('[data-testid="prompt-input"]')).toHaveAttribute(
      'aria-label',
      'Content prompt'
    );
    
    // Test error states
    await page.click('[data-testid="generate-button"]');
    await expect(page.locator('[data-testid="prompt-input"]')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
```

## Mocking Strategies

### API Response Mocking
```javascript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock AI content generation
  http.post('/api/generate-content', async ({ request }) => {
    const body = await request.json();
    
    return HttpResponse.json({
      content: `Generated content based on: ${body.prompt}`,
      tokensUsed: 50,
      model: 'gpt-4',
    });
  }),

  // Mock user authentication
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        token: 'fake-jwt-token',
        user: { id: 1, email, name: 'Test User' },
      });
    }
    
    return new HttpResponse(null, { status: 401 });
  }),

  // Mock file upload
  http.post('/api/upload', () => {
    return HttpResponse.json({
      url: 'https://example.com/uploaded-file.jpg',
      size: 1024,
      type: 'image/jpeg',
    });
  }),
];
```

### Component Mocking
```javascript
// src/test/mocks/components.tsx
import { vi } from 'vitest';

// Mock complex components
export const MockAIContentGenerator = vi.fn(({ onGenerate }) => (
  <div data-testid="mock-ai-generator">
    <button onClick={() => onGenerate('Mock generated content')}>
      Generate Mock Content
    </button>
  </div>
));

// Mock context providers
export const MockThemeProvider = ({ children }) => (
  <div data-testid="mock-theme-provider">
    {children}
  </div>
);

// Mock hooks
export const mockUseAI = vi.fn(() => ({
  generateContent: vi.fn(),
  isLoading: false,
  error: null,
  data: null,
}));
```

### Environment Mocking
```javascript
// src/test/mocks/env.ts
import { vi } from 'vitest';

// Mock environment variables
vi.stubEnv('VITE_API_URL', 'http://test-api.example.com');
vi.stubEnv('VITE_AI_MODEL', 'gpt-4-test');

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## Accessibility Testing

### Component Accessibility Tests
```javascript
// components/Button/Button.accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('is keyboard accessible', async () => {
    const { container } = render(<Button>Keyboard Button</Button>);
    const results = await axe(container, {
      rules: {
        'button-name': { enabled: true },
        'keyboard-access': { enabled: true },
      },
    });
    
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA attributes when disabled', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
    expect(container.querySelector('button')).toHaveAttribute('aria-disabled', 'true');
  });
});
```

### Form Accessibility Tests
```javascript
// components/Form/FormField.accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { FormField } from './FormField';

describe('FormField Accessibility', () => {
  it('has proper label association', async () => {
    const { container } = render(
      <FormField
        label="Email Address"
        name="email"
        value=""
        onChange={() => {}}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const input = container.querySelector('input');
    const label = container.querySelector('label');
    
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input?.id);
  });

  it('announces errors to screen readers', async () => {
    const { container } = render(
      <FormField
        label="Email"
        name="email"
        value=""
        error="Invalid email address"
        onChange={() => {}}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
```

## Performance Testing

### Component Performance Tests
```javascript
// components/HeavyComponent/HeavyComponent.performance.test.tsx
import { render } from '@testing-library/react';
import { HeavyComponent } from './HeavyComponent';

describe('HeavyComponent Performance', () => {
  it('renders within performance budget', () => {
    const startTime = performance.now();
    
    render(<HeavyComponent items={Array(1000).fill('item')} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(100); // Should render in < 100ms
  });

  it('does not cause layout thrashing', () => {
    const layoutShifts = [];
    
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        layoutShifts.push(entry.value);
      });
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
    
    render(<HeavyComponent items={Array(100).fill('item')} />);
    
    observer.disconnect();
    
    const totalLayoutShift = layoutShifts.reduce((sum, shift) => sum + shift, 0);
    expect(totalLayoutShift).toBeLessThan(0.1); // Should have minimal layout shift
  });
});
```

## Best Practices

### ✅ Do
- Write tests that resemble how users interact with your application
- Keep tests focused on one behavior or scenario
- Use descriptive test names that document expected behavior
- Mock at the appropriate level (network > service > component)
- Test error states and edge cases
- Run tests in CI/CD pipeline
- Keep tests fast and independent
- Use TypeScript for type safety in tests
- Test accessibility by default
- Update tests when requirements change

### ❌ Don't
- Don't test implementation details
- Don't write fragile tests that break with minor changes
- Don't rely on test order or shared state
- Don't skip testing error handling
- Don't test third-party libraries
- Don't write tests that are too slow to run frequently
- Don't ignore flaky tests - fix or remove them
- Don't test everything - focus on critical paths
- Don't write tests without clear assertions
- Don't commit code without running tests

## Test File Structure

### Component Test Structure
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   ├── Button.test.tsx          # Unit/component tests
│   │   ├── Button.accessibility.test.tsx
│   │   └── index.ts
│   └── Form/
│       ├── FormField.tsx
│       ├── FormField.test.tsx
│       └── index.ts
├── hooks/
│   ├── useValidation.ts
│   └── useValidation.test.ts        # Hook tests
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts           # Utility tests
└── __tests__/
    ├── integration/
    │   └── ContentCreation.test.tsx # Integration tests
    └── mocks/
        └── handlers.ts              # MSW handlers
```

### E2E Test Structure
```
e2e/
├── fixtures/
│   └── test-data.json
├── pages/
│   └── content-creation.page.ts
├── specs/
│   ├── content-creation.spec.ts
│   ├── user-authentication.spec.ts
│   └── accessibility.spec.ts
├── utils/
│   └── helpers.ts
└── playwright.config.ts
```

## CI/CD Integration

### GitHub Actions Example
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Run component tests
        run: npm run test:components
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Test Scripts in package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:components": "vitest components/",
    "test:hooks": "vitest hooks/",
    "test:utils": "vitest utils/",
    "test:integration": "vitest __tests__/integration/",
    "test:a11y": "vitest **/*.accessibility.test.*",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui"
  }
}
```

## Testing AI Components

### AI Component Test Pattern
```javascript
// components/AIContentGenerator/AIContentGenerator.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AIContentGenerator } from './AIContentGenerator';
import { http, HttpResponse } from 'msw';

describe('AIContentGenerator', () => {
  it('generates content with proper loading states', async () => {
    server.use(
      http.post('/api/ai/generate', () => {
        return HttpResponse.json({
          content: 'Generated AI content',
          tokens: 150,
        });
      })
    );

    render(<AIContentGenerator />);
    const user = userEvent.setup();

    // Enter prompt
    await user.type(screen.getByLabelText(/prompt/i), 'Test prompt');
    
    // Click generate
    await user.click(screen.getByRole('button', { name: /generate/i }));
    
    // Verify loading state
    expect(screen.getByText(/generating/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeDisabled();
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText(/generated ai content/i)).toBeInTheDocument();
    });
    
    // Verify loading state cleared
    expect(screen.queryByText(/generating/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeEnabled();
  });

  it('handles AI API errors gracefully', async () => {
    server.use(
      http.post('/api/ai/generate', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<AIContentGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/prompt/i), 'Test prompt');
    await user.click(screen.getByRole('button', { name: /generate/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/failed to generate content/i)).toBeInTheDocument();
    });
    
    // Verify retry option
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('validates prompt before generation', async () => {
    render(<AIContentGenerator />);
    const user = userEvent.setup();

    // Try to generate with empty prompt
    await user.click(screen.getByRole('button', { name: /generate/i }));
    
    expect(screen.getByText(/prompt is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/generating/i)).not.toBeInTheDocument();
    
    // Enter valid prompt
    await user.type(screen.getByLabelText(/prompt/i), 'Valid prompt');
    expect(screen.queryByText(/prompt is required/i)).not.toBeInTheDocument();
  });
});
```

---

*This testing system ensures comprehensive, maintainable, and accessible testing across ContentSplit. All tests should follow these patterns and principles to maintain confidence in the application's behavior, especially for AI-powered features.*