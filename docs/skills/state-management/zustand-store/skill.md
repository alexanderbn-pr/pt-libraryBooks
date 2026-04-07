---
name: zustand-store
description: Lightweight client state management with Zustand
category: state-management
level: intermediate
---

## Basic Store

```tsx
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage
function Header() {
  const { user, logout } = useUserStore();
  return (
    <div>
      {user && (
        <>
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
```

## Store with Actions

```tsx
interface CountStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  add: (n: number) => void;
}

export const useCountStore = create<CountStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  add: (n) => set((state) => ({ count: state.count + n })),
}));

// Usage
function Counter() {
  const { count, increment, reset } = useCountStore();
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
```

## Async Actions

```tsx
interface TodoStore {
  todos: Todo[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (title: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/todos');
      const todos = await res.json();
      set({ todos, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  add: (title) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), title, done: false }],
    })),
}));

// Usage
function TodoList() {
  const { todos, loading, fetch } = useTodoStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) return <div>Loading...</div>;
  return <ul>{todos.map((t) => <li key={t.id}>{t.title}</li>)}</ul>;
}
```

## Middleware (Persist)

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create<ThemeStore>(
  persist(
    (set) => ({
      theme: 'light' as const,
      toggle: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
      storage: localStorage,
    }
  )
);
```

## Multiple Stores

```tsx
// Store 1
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Store 2
export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggle: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// Usage
function App() {
  const user = useUserStore((state) => state.user);
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  
  return <Layout user={user} sidebarOpen={sidebarOpen} />;
}
```

## Selectors & Performance

```tsx
// Avoid re-renders: use selectors
function UserName() {
  // Only re-render if name changes
  const name = useUserStore((state) => state.user?.name);
  return <div>{name}</div>;
}

// Multiple selectors
function UserProfile() {
  const name = useUserStore((state) => state.user?.name);
  const role = useUserStore((state) => state.user?.role);
  return <div>{name} ({role})</div>;
}
```

## When to Use

✅ Client UI state (theme, sidebar)
✅ User preferences
✅ Simple cache
✅ Lightweight alternatives to Redux

❌ Server state (use React Query)
❌ Complex async flows
❌ Large apps with many stores

**Benefits**: Simple API, tiny bundle size, TypeScript friendly, devtools
