# ContentSplit API Integration Guidelines

## Overview

The ContentSplit API Integration Guidelines follow Google Material Design 3 principles for seamless data integration with user interfaces. These guidelines ensure consistent handling of loading states, errors, and data transformations across the application.

## API Integration Patterns

### 1. Data Fetching Pattern
```jsx
// Using React Query example
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return <UserCard user={data} />;
}
```

### 2. Data Mutation Pattern
```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function UpdateUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showSuccessToast('User updated successfully');
    },
    onError: (error) => {
      showErrorToast(`Update failed: ${error.message}`);
    },
  });

  return (
    <Button 
      onClick={() => mutation.mutate(userData)}
      loading={mutation.isPending}
    >
      Update User
    </Button>
  );
}
```

## Loading States (Material Design 3)

### Skeleton Screens
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--sys-color-neutral-95) 25%,
    var(--sys-color-neutral-90) 50%,
    var(--sys-color-neutral-95) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-image {
  height: 200px;
  border-radius: 12px;
}
```

### Progress Indicators
```css
/* Linear Progress */
.progress-linear {
  height: 4px;
  background-color: var(--sys-color-neutral-90);
  border-radius: 2px;
  overflow: hidden;
}

.progress-linear-fill {
  height: 100%;
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  animation: progressAnimation 2s ease-in-out infinite;
}

@keyframes progressAnimation {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

/* Circular Progress */
.progress-circular {
  width: 40px;
  height: 40px;
  border: 3px solid var(--sys-color-neutral-90);
  border-top-color: var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Loading Button States
```css
.button-loading {
  position: relative;
  color: transparent;
}

.button-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-top: -8px;
  margin-left: -8px;
  border: 2px solid var(--sys-color-roles-primary-color-role-on-primary-role);
  border-top-color: transparent;
  border-radius: 50%;
  animation: buttonSpin 0.8s linear infinite;
}
```

## Error Handling

### Error Display Patterns
```css
.error-banner {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.error-icon {
  color: var(--sys-color-roles-error-color-role-error-role);
  flex-shrink: 0;
}

.error-retry-button {
  margin-top: 12px;
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: var(--sys-color-roles-error-color-role-on-error-color-role);
}
```

### Error States by Component
```css
/* Input Error State */
.input-error {
  border-color: var(--sys-color-roles-error-color-role-error-role);
}

.input-error-message {
  color: var(--sys-color-roles-error-color-role-error-role);
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  margin-top: 4px;
}

/* Card Error State */
.card-error {
  border: 1px solid var(--sys-color-roles-error-color-role-error-role);
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
}
```

## Data Transformation

### Formatting Utilities
```javascript
// Date formatting
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Currency formatting
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Number formatting
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};
```

### Data Normalization
```javascript
// Normalize API response
const normalizeUser = (apiUser) => ({
  id: apiUser.id,
  name: `${apiUser.first_name} ${apiUser.last_name}`,
  email: apiUser.email_address,
  avatar: apiUser.profile_image_url,
  role: apiUser.user_role.toLowerCase(),
  createdAt: new Date(apiUser.created_at),
  updatedAt: new Date(apiUser.updated_at),
});

// Normalize array of items
const normalizeUsers = (apiUsers) => 
  apiUsers.map(normalizeUser);
```

## API Configuration

### HTTP Client Setup
```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Error Types
```javascript
class APIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
  }
}

// Usage
try {
  await apiClient.post('/users', userData);
} catch (error) {
  if (error instanceof APIError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        showValidationErrors(error.details);
        break;
      case 'RATE_LIMITED':
        showRateLimitWarning();
        break;
      default:
        showGenericError(error.message);
    }
  }
}
```

## Performance Optimization

### Request Debouncing
```javascript
import { debounce } from 'lodash';

const searchUsers = debounce(async (query) => {
  const response = await apiClient.get('/users/search', {
    params: { q: query },
  });
  return response.data;
}, 300);
```

### Request Caching
```javascript
const cache = new Map();

async function fetchWithCache(url, options) {
  const cacheKey = JSON.stringify({ url, options });
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await fetch(url, options);
  const data = await response.json();
  
  cache.set(cacheKey, data);
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000); // 5 minute cache
  
  return data;
}
```

### Pagination Pattern
```javascript
const usePaginatedData = (endpoint, pageSize = 20) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { data, isLoading } = useQuery({
    queryKey: [endpoint, page],
    queryFn: () => apiClient.get(endpoint, {
      params: { page, limit: pageSize },
    }),
  });
  
  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  };
  
  return { data, isLoading, loadMore, hasMore };
};
```

## Security Considerations

### Input Validation
```javascript
const validateUserInput = (input) => {
  const errors = {};
  
  if (!input.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!input.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Valid email is required';
  }
  
  return errors;
};
```

### XSS Protection
```javascript
// Sanitize user input
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Safe HTML rendering
const SafeHtml = ({ html }) => {
  const sanitized = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

## File Structure

- `api/` - API client configuration and utilities
- `hooks/` - Custom React hooks for data fetching
- `utils/` - Data transformation and formatting utilities
- `components/feedback/` - Loading and error components

## Testing API Integration

### Mock Service Worker Setup
```javascript
// test/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
        ],
      })
    );
  }),
];
```

### Integration Tests
```javascript
describe('User API Integration', () => {
  it('fetches user data and displays it', async () => {
    render(<UserProfile userId="1" />);
    
    // Show loading state
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    
    // Wait for data
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

## References

- [Material Design Loading Patterns](https://m3.material.io/components/progress-indicators)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Mock Service Worker](https://mswjs.io/)