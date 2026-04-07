# React Best Practices

## Fundamentals
- Always use functional components
- Prefer hooks over class components
- Keep components small and reusable
- Separate logic from UI when possible
- Use custom hooks for reusable logic
- Avoid prop drilling (use context when needed)
- Use meaningful and descriptive names

## Render Optimization

### React.memo
Use when a component receives the same props and you want to skip re-renders:
```jsx
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});
```
**When to use**: expensive components, prevents re-renders from parent

### useMemo
Memoize expensive calculations:
```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```
**When to use**: heavy computations, sorting/filtering large lists
**Don't use for**: primitive values or simple operations

### useCallback
Memoize function references to pass stable functions to memoized children:
```jsx
const handleClick = useCallback(() => {
  doSomething(data);
}, [data]);
```
**When to use**: passing callbacks to React.memo components
**Don't use for**: inline event handlers without memo children

## React 18+ Features

### Batching
React 18 automatically batches state updates:
```jsx
// Both updates batched together (1 render instead of 2)
setCount(c => c + 1);
setName('John');
```

### useTransition
Mark updates as non-urgent (for slow transitions):
```jsx
const [isPending, startTransition] = useTransition();

const handleSearch = (value) => {
  startTransition(() => {
    setSearchResults(filterData(value)); // non-blocking
  });
};
```
**Use case**: search with large datasets, filtering

### useDeferredValue
Defer re-rendering of a value until urgent updates complete:
```jsx
const deferredValue = useDeferredValue(searchInput);
// Use deferredValue in expensive component
```

## Custom Hook Patterns

### Extracting Logic
```jsx
// Good: Logic in hook
const useUserData = (userId) => {
  const [user, setUser] = useState(null);
  // ... logic here
  return user;
};
```


## Data Fetching

- DO NOT use fetch inside useEffect directly
- ALWAYS use TanStack Query (React Query) for server state
- NEVER fetch inside components directly
- Use custom hooks to encapsulate queries
- Use query keys properly
- Handle caching and invalidation correctly

## Query Types

- **useQuery**: GET requests, read-only data
- **useInfiniteQuery**: Pagination, infinite scrolling
- **useSuspenseQuery**: Suspense integration (optional)
- **useMutation**: POST/PUT/DELETE operations

## Query Key Conventions
```jsx
// Single user
['users', userId]

// User list with filters
['users', { status: 'active' }]

// Paginated
['users', { page: 1 }]

// Nested resources
['users', userId, 'posts']
```

## UX and Loading States

- Use React Suspense when applicable
- Prefer skeletons over spinners
- Avoid layout shifts
- Keep UI responsive during loading

## Patterns

- Wrap async components with Suspense
- Provide fallback skeleton UI

## Performance
- Use React.memo when appropriate
- Avoid unnecessary re-renders
- Use useMemo and useCallback when needed (not by default)
- Use code splitting (React.lazy)
- Avoid unnecessary global state
- Memoize expensive computations
- Prefer server state over client state


## Error Handling

- Use Error Boundaries for UI crashes
- Never swallow errors silently
- Log errors for monitoring (Sentry, DataDog)
- Provide user-friendly error messages
- Use try-catch in event handlers and callbacks

```jsx
try {
  await mutation.mutateAsync(data);
} catch (error) {
  console.error('Failed to submit:', error);
  toast.error('Something went wrong');
}
```