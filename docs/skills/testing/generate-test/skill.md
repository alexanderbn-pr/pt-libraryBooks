---
name: generate-test
description: Write unit, integration, and API mocking tests
category: testing
level: intermediate
---

## Component Testing

```tsx
describe('UserCard', () => {
  it('renders user name', () => {
    const { getByText } = render(
      <UserCard user={{ id: '1', name: 'John' }} />
    );
    expect(getByText('John')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <UserCard user={{ id: '1', name: 'John' }} onSelect={onSelect} />
    );
    fireEvent.click(container.firstChild);
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

## Custom Hook Testing

```tsx
describe('useUserManagement', () => {
  it('fetches users on mount', async () => {
    const { result } = renderHook(() => useUserManagement());
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.users.length).toBeGreaterThan(0);
  });
});
```

## MSW Setup (Mock Service Worker)

```tsx
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ]);
  }),

  http.post('/api/users', async ({ request }) => {
    const user = await request.json();
    return HttpResponse.json({ id: '3', ...user }, { status: 201 });
  }),
];

// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// vitest.config.ts
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Integration Testing

```tsx
describe('UserDashboard Integration', () => {
  it('fetches and displays users', async () => {
    const { getByText, getByDisplayValue } = render(<UserDashboard />);
    
    // Loading state
    expect(getByText('Loading...')).toBeInTheDocument();
    
    // Wait for users to load
    await waitFor(() => {
      expect(getByText('John')).toBeInTheDocument();
    });
    
    // Filter users
    const input = getByDisplayValue('');
    fireEvent.change(input, { target: { value: 'Jane' } });
    
    expect(getByText('Jane')).toBeInTheDocument();
    expect(queryByText('John')).not.toBeInTheDocument();
  });
});
```

## Async Testing Patterns

```tsx
// Testing promises
it('handles async operations', async () => {
  const { getByText } = render(<AsyncComponent />);
  
  const button = getByText('Load');
  fireEvent.click(button);
  
  // Wait for promises to resolve
  await waitFor(() => {
    expect(getByText('Loaded')).toBeInTheDocument();
  });
});

// Testing error states
it('handles errors', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    })
  );

  const { getByText } = render(<UserDashboard />);
  
  await waitFor(() => {
    expect(getByText('Error loading users')).toBeInTheDocument();
  });
});
```

## Snapshot & Performance

```tsx
// Snapshot testing
it('renders correctly', () => {
  const { container } = render(<UserCard user={testUser} />);
  expect(container).toMatchSnapshot();
});

// Performance testing
it('renders large list efficiently', () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
  }));

  const { container } = render(<VirtualList items={items} />);
  
  // Check only visible items are rendered
  const renderedItems = container.querySelectorAll('.list-item');
  expect(renderedItems.length).toBeLessThan(50);
});
```

## Testing Best Practices

✅ Use MSW for API mocking (not .mock.ts)
✅ Test behavior, not implementation
✅ Use waitFor for async operations
✅ Clear handlers between tests
✅ Test error & loading states
✅ Avoid implementation details (getByTestId last resort)
✅ Mock external dependencies

❌ Don't test internals
❌ Don't use timeouts (use waitFor)
❌ Don't mock components (test real components)
