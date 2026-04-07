---
name: folder-structure
description: Organize React projects for scalability and maintainability
category: architecture
level: intermediate
---

## Feature-Based Structure (Recommended)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── Register.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authAPI.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types.ts
│   │   └── index.ts (exports)
│   │
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── types.ts
│
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── types/
│       └── common.ts
│
├── config/
│   ├── constants.ts
│   └── theme.ts
│
├── App.tsx
└── main.tsx
```

## Advantages

✅ **Scalability**: Easy to add features
✅ **Isolation**: Features don't know about each other
✅ **Testability**: Mock entire features easily
✅ **Team friendly**: Clear ownership
✅ **Easy cleanup**: Delete folder → delete feature

## Alternative: Layer-Based (Older Apps)

```
src/
├── components/     # All UI components
├── pages/          # Page components
├── hooks/          # All custom hooks
├── services/       # All API calls
├── store/          # All state management
├── utils/          # Utilities
├── types/          # Type definitions
└── App.tsx
```

**Drawbacks**: Gets messy with large projects, hard to find related code

## Naming Conventions

```
Components:
- PascalCase: UserCard.tsx, LoginForm.tsx
- Index pattern: features/users/components/index.ts

Hooks:
- camelCase with prefix: useAuth.ts, usePagination.ts
- Location: features/*/hooks/ or shared/hooks/

Services:
- camelCase with API suffix: usersAPI.ts, authAPI.ts
- Location: features/*/services/

Utils:
- camelCase: formatters.ts, validators.ts
- Location: shared/utils/

Types:
- PascalCase: User.ts, Post.ts
- Location: feature/types.ts or shared/types/
```

## Import Strategy

```tsx
// ✅ Good: Local imports within feature
import { LoginForm } from './components/LoginForm';
import { useAuth } from './hooks/useAuth';

// ✅ Good: Shared via barrel exports
import { Button, Modal } from '@/shared/components';
import { formatDate } from '@/shared/utils';

// ❌ Avoid: Cross-feature imports
import UserCard from '@/features/users/components/UserCard';

// ✅ Better: Use shared if needed by multiple features
import { UserCard } from '@/shared/components';
```

## Barrel Exports (index.ts)

```tsx
// features/auth/index.ts
export { LoginForm, Register } from './components';
export { useAuth } from './hooks/useAuth';
export { authAPI } from './services/authAPI';
export type { AuthState, User } from './types';

// Usage
import { useAuth, LoginForm } from '@/features/auth';
```

## Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

## As Project Grows

```
src/
├── features/
│   └── orders/
│       ├── pages/
│       │   ├── OrdersList.tsx
│       │   └── OrderDetail.tsx
│       ├── components/
│       │   ├── OrderCard.tsx
│       │   └── OrderForm.tsx
│       ├── hooks/
│       │   ├── useOrders.ts
│       │   └── useOrderForm.ts
│       ├── services/
│       │   └── ordersAPI.ts
│       ├── store/
│       │   └── ordersStore.ts
│       ├── constants/
│       │   └── orderStatuses.ts
│       ├── types.ts
│       └── index.ts
```

## Quick Checklist

- [ ] Group by feature, not file type
- [ ] Use barrel exports (index.ts)
- [ ] Set up path aliases
- [ ] Keep shared folder minimal
- [ ] One feature per folder
- [ ] Use consistent naming
- [ ] Document folder structure in README
