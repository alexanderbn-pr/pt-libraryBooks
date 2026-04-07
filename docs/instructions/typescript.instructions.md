# TypeScript Rules

## Core Rules
- Always type props explicitly
- Avoid using `any` (use `unknown` if necessary)
- Use interfaces for props, types for data
- Always type API responses
- Use union types when applicable
- Infer types when obvious, but prefer clarity

## Basic Typing

### Props Interface
```tsx
interface UserCardProps {
  name: string
  email: string
  avatar?: string
  onSelect?: (userId: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ name, email }) => (
  <div>{name}</div>
);
```

## Advanced Types

### Generics for Reusable Hooks
```tsx
// Generic hook for any API response
function useData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  return { data, error };
}
