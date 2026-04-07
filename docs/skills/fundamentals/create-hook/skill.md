---
name: hooks
description: Create reusable custom hooks
category: fundamentals
level: beginner
---

## Custom Hooks

Always start with `use` prefix, return typed values, handle cleanup.

### Simple State Hook
```tsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  return { count, increment, decrement };
}
```

### Hook with Effects
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = useCallback((val: T) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }, [key]);

  return [value, setStoredValue] as const;
}
```

### Hook with Cleanup
```tsx
function useEventListener(eventName: string, handler: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName, handler]);
}
```

## Testing
```tsx
const { result } = renderHook(() => useCounter());
act(() => result.current.increment());
expect(result.current.count).toBe(1);
```

## Rules
- Name with `use` prefix
- One concern per hook
- Always cleanup side effects
- Type everything
- Dependencies matter
