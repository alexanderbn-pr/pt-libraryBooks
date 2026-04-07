# Testing Guidelines

## Unit Tests with Vitest + React Testing Library

### Core Principles
- Test behavior, not implementation
- Avoid testing internal state
- Prefer screen queries over container queries
- Use data-testid only when semantic queries fail

### Coverage Areas
```tsx
// Component test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('UserCard', () => {
  // 1. Rendering
  it('renders user name', () => {
    render(<UserCard user={{ name: 'John' }} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
  
  // 2. User interactions
  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    render(<UserCard user={{ id: '1' }} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalled();
  });
  
  // 3. Edge cases
  it('handles missing avatar gracefully', () => {
    render(<UserCard user={{ name: 'John' }} />);
    expect(screen.queryByAltText('avatar')).not.toBeInTheDocument();
  });
});
```

## Testing Custom Hooks

```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Mocking API Requests with MSW

Much better than mocking fetch/axios:

```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'John Doe'
    });
  }),
  
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: '123', ...body }, { status: 201 });
  })
];

// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// vitest.config.ts setup
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Now in tests, all fetch requests are intercepted
```

## Integration Tests

Test features end-to-end without E2E tools:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserListPage from './UserListPage';

describe('UserListPage Integration', () => {
  it('loads and displays users', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });
    
    render(
      <QueryClientProvider client={queryClient}>
        <UserListPage />
      </QueryClientProvider>
    );
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
  
  it('filters users after search', async () => {
    // ... setup ...
    
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'John');
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.queryByText('Jane')).not.toBeInTheDocument();
    });
  });
});
```

## Performance Testing

Identify render issues:

```tsx
import { render } from '@testing-library/react';

it('does not re-render unnecessarily', () => {
  const renderSpy = vi.fn();
  
  const Component = () => {
    renderSpy();
    return <div>test</div>;
  };
  
  const { rerender } = render(<Component />);
  expect(renderSpy).toHaveBeenCalledTimes(1);
  
  rerender(<Component />);
  expect(renderSpy).toHaveBeenCalledTimes(1); // should be memoized
});
```

## Snapshot Testing

**Use sparingly** - only for complex UI structures:

```tsx
it('renders correctly', () => {
  const { container } = render(<ComplexForm />);
  expect(container).toMatchSnapshot();
});
```

## Test Data Builders

Clear, maintainable test fixtures:

```tsx
function createUser(overrides?: Partial<User>): User {
  return {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    ...overrides
  };
}

it('handles user with custom email', () => {
  const user = createUser({ email: 'custom@example.com' });
  // ...
});
```