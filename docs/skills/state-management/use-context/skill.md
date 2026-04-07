---
name: use-context
description: Implement Context API for state management
category: state-management
level: intermediate
---

## Simple Context

```tsx
// Create context
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggle: () => void;
} | undefined>(undefined);

// Provider
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={{
      theme,
      toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light')
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within provider');
  return context;
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Theme: {theme}</button>;
}
```

## Context with useReducer

For complex state:

```tsx
interface User {
  id: string;
  name: string;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | undefined>(undefined);

function authReducer(state: User | null, action: AuthAction) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, null);

  return (
    <AuthContext.Provider value={{
      user,
      login: (u) => dispatch({ type: 'LOGIN', payload: u }),
      logout: () => dispatch({ type: 'LOGOUT' })
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within provider');
  return context;
}

// Usage
function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Multiple Contexts

```tsx
// Avoid prop drilling with multiple providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Dashboard />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Components use only what they need
function Header() {
  const { theme } = useTheme();
  const { user } = useAuth();
  return <header className={theme}>{user?.name}</header>;
}
```

## When to Use Context

✅ Theme/UI state
✅ User authentication
✅ Language/localization
✅ Modal/dialog state
✅ Sidebar toggle

❌ Frequently changing data
❌ Server state (use React Query)
❌ Form state (use React Hook Form)
❌ Props with performance concerns

## Anti-Patterns

```tsx
// ❌ Bad: Updates too often
const AllStateContext = createContext(appState);

// ✅ Good: Split contexts by change frequency
<ThemeProvider>
  <UserProvider>
    <App />
  </UserProvider>
</ThemeProvider>
```
