---
name: error-handling
description: Implement error boundaries and error handling
category: advanced
level: intermediate
---

## Error Boundaries

Catch rendering errors at component level:

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
    // Log to Sentry, DataDog, etc
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

## Usage
```tsx
// Global
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Feature-level (prevents entire app crash)
<ErrorBoundary fallback={<ErrorUI />}>
  <Dashboard />
</ErrorBoundary>
```

## What It Catches
✅ Rendering errors
✅ Constructor errors
✅ Lifecycle method errors

❌ Event handlers (use try-catch)
❌ Async code (use error state)
❌ Server rendering

## With Suspense
```tsx
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
```

## Event Handler Error Handling
```tsx
function Component() {
  const handleClick = async () => {
    try {
      await action();
    } catch (error) {
      setError(error);
      toast.error(error.message);
    }
  };

  return <button onClick={handleClick}>Action</button>;
}
```

## Key Points
- One boundary per feature
- Provide recovery options
- Log to error tracking service
- Don't suppress errors silently


