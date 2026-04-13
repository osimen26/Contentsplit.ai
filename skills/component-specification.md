# ContentSplit Component Specification

## Overview

The ContentSplit Component Specification defines standards for creating consistent, reusable UI components following Google Material Design 3 guidelines. This specification ensures all components maintain visual consistency, accessibility, and developer experience.

## Component Design Principles

### 1. Atomic Design
- **Atoms:** Basic building blocks (Button, Input, Icon)
- **Molecules:** Groups of atoms (SearchBar, UserChip)
- **Organisms:** Complex components (Header, Sidebar, CardGrid)
- **Templates:** Page layouts
- **Pages:** Complete views

### 2. Composition Over Inheritance
- Build complex components from simple ones
- Use props for configuration, not inheritance
- Support children and slots for flexibility

### 3. Unstyled Foundation
- Separate logic from presentation
- Provide unstyled base components
- Allow custom styling through CSS variables

## Component Anatomy

### Required Parts
1. **Container:** Outer wrapper with layout and spacing
2. **Content:** Main visual elements
3. **Interactive Elements:** Buttons, inputs, toggles
4. **Feedback Elements:** Loading, error, empty states
5. **Accessibility Elements:** ARIA attributes, focus management

### Optional Parts
1. **Icons:** Visual indicators
2. **Images:** Media content
3. **Metadata:** Supplemental information
4. **Actions:** Contextual operations

## Props Interface

### Standard Props Pattern
```typescript
interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  // Variant props
  variant?: 'filled' | 'outlined' | 'text' | 'tonal' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  
  // State props
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  
  // Content props
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  
  // Event props
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (value: any) => void;
}
```

### Prop Validation
```typescript
import PropTypes from 'prop-types';

Component.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined', 'text', 'tonal', 'elevated']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Component.defaultProps = {
  variant: 'filled',
  size: 'medium',
  disabled: false,
};
```

## Styling System

### CSS Variables Pattern
```css
.component {
  --component-bg: var(--sys-color-roles-primary-color-role-primary-role);
  --component-color: var(--sys-color-roles-primary-color-role-on-primary-role);
  --component-border-radius: 12px;
  --component-padding: 12px 24px;
  
  background-color: var(--component-bg);
  color: var(--component-color);
  border-radius: var(--component-border-radius);
  padding: var(--component-padding);
}

.component[data-variant="outlined"] {
  --component-bg: transparent;
  border: 1px solid var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Size Tokens
```css
.component[data-size="small"] {
  --component-padding: 8px 16px;
  font-size: var(--sys-typography-body-small-text-font-size);
}

.component[data-size="medium"] {
  --component-padding: 12px 24px;
  font-size: var(--sys-typography-body-text-font-size);
}

.component[data-size="large"] {
  --component-padding: 16px 32px;
  font-size: var(--sys-typography-title-small-font-size);
}
```

### Color Tokens
```css
.component[data-color="primary"] {
  --component-bg: var(--sys-color-roles-primary-color-role-primary-role);
  --component-color: var(--sys-color-roles-primary-color-role-on-primary-role);
}

.component[data-color="secondary"] {
  --component-bg: var(--sys-color-roles-secondary-color-role-secondary-role);
  --component-color: var(--sys-color-roles-secondary-color-role-on-secondary-role);
}

.component[data-color="error"] {
  --component-bg: var(--sys-color-roles-error-color-role-error-role);
  --component-color: var(--sys-color-roles-error-color-role-on-error-color-role);
}
```

## Accessibility Requirements

### Keyboard Navigation
```typescript
const Component = ({ onClick, disabled }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
    />
  );
};
```

### Screen Reader Support
```jsx
<button
  aria-label={label || children}
  aria-describedby={descriptionId}
  aria-expanded={isExpanded}
  aria-controls={controlledElementId}
  aria-pressed={isSelected}
>
  {icon && <span aria-hidden="true">{icon}</span>}
  {children}
</button>
```

### Focus Management
```css
.component:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}

.component:focus:not(:focus-visible) {
  outline: none;
}

.component:focus-visible {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

## Interactive States

### State Management
```css
/* Default state */
.component {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover state */
.component:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Active state */
.component:active:not(:disabled) {
  opacity: 0.8;
  transform: translateY(0);
}

/* Disabled state */
.component:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Loading State
```jsx
const Component = ({ loading, children }) => {
  return (
    <div className="component" data-loading={loading}>
      {loading ? (
        <div className="component-loading">
          <Spinner size="small" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
```

### Error State
```jsx
const Component = ({ error, children }) => {
  return (
    <div className="component" data-error={!!error}>
      {children}
      {error && (
        <div className="component-error" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};
```

## Component Composition

### Slot Pattern
```jsx
const Card = ({ header, footer, children }) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// Usage
<Card
  header={<CardHeader title="User Profile" />}
  footer={<CardActions>
    <Button>Save</Button>
    <Button variant="text">Cancel</Button>
  </CardActions>}
>
  <UserForm />
</Card>
```

### Compound Components
```jsx
const List = ({ children }) => {
  return <ul className="list">{children}</ul>;
};

List.Item = ({ children, onClick }) => {
  return (
    <li className="list-item" onClick={onClick}>
      {children}
    </li>
  );
};

// Usage
<List>
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
</List>
```

## Testing Standards

### Unit Tests
```javascript
describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Accessibility Tests
```javascript
describe('Button Accessibility', () => {
  it('has proper ARIA attributes', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog');
  });

  it('is keyboard navigable', async () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
```

## Documentation Requirements

### Component Documentation Template
```markdown
# ComponentName

## Overview
Brief description of component purpose and usage.

## Import
```js
import { ComponentName } from '@contentsplit/ui';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|

## Examples
### Basic Usage
```jsx
<ComponentName />
```

### With Customization
```jsx
<ComponentName variant="outlined" size="large" />
```

## Accessibility
- Keyboard: Supports Enter and Space keys
- Screen readers: Announces as [role]
- Focus: Custom focus ring with 3:1 contrast

## Design Tokens
- Background: `--sys-color-roles-primary-color-role-primary-role`
- Text: `--sys-color-roles-primary-color-role-on-primary-role`
- Border radius: `12px`

## Changelog
### v1.0.0
- Initial release
```

## File Structure

### Component Directory Structure
```
components/
├── ComponentName/
│   ├── index.ts              # Main export
│   ├── ComponentName.tsx     # Component implementation
│   ├── ComponentName.css     # Component styles
│   ├── ComponentName.test.tsx # Component tests
│   ├── ComponentName.stories.tsx # Storybook stories
│   └── README.md            # Component documentation
```

### Export Structure
```typescript
// components/index.ts
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Card } from './Card';

// types/index.ts
export * from './types';
```

## Performance Optimization

### Code Splitting
```javascript
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Memoization
```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => processData(data), [data]);
  const handleClick = useCallback(() => {
    // handle click
  }, []);
  
  return <div onClick={handleClick}>{processedData}</div>;
});
```

## References

- [Material Design 3 Component Guidelines](https://m3.material.io/components)
- [React Component Patterns](https://reactpatterns.com/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)