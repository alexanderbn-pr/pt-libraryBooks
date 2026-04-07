---
name: api-design
description: Design scalable API clients and integrations
category: architecture
level: intermediate
---

## API Client Pattern

```tsx
// api/client.ts
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  get<T>(path: string) {
    return this.request<T>(path, { method: 'GET' });
  }

  post<T>(path: string, data: unknown) {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(path: string, data: unknown) {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

## Resource Services

```tsx
// api/users.ts
import { apiClient } from './client';

interface User {
  id: string;
  name: string;
  email: string;
}

export const usersAPI = {
  list: () => apiClient.get<User[]>('/users'),
  get: (id: string) => apiClient.get<User>(`/users/${id}`),
  create: (data: Omit<User, 'id'>) =>
    apiClient.post<User>('/users', data),
  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};

// Usage in hooks
function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.list(),
  });
}

function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersAPI.get(id),
    enabled: !!id,
  });
}
```

## Error Handling

```tsx
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
  }
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.message, data);
  }

  return response.json();
}

// Usage
function App() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.list(),
  });

  if (query.error instanceof ApiError) {
    return <div>Error {query.error.status}: {query.error.message}</div>;
  }

  if (query.isLoading) return <div>Loading...</div>;
  return <UserList users={query.data} />;
}
```

## Interceptors Pattern

```tsx
class ApiClient {
  private interceptors = {
    request: [] as Array<(config: RequestInit) => RequestInit>,
    response: [] as Array<(response: Response) => Response>,
  };

  addRequestInterceptor(fn: (config: RequestInit) => RequestInit) {
    this.interceptors.request.push(fn);
  }

  addResponseInterceptor(fn: (response: Response) => Response) {
    this.interceptors.response.push(fn);
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    // Apply request interceptors
    let config = options;
    for (const interceptor of this.interceptors.request) {
      config = interceptor(config);
    }

    let response = await fetch(`/api${path}`, config);

    // Apply response interceptors
    for (const interceptor of this.interceptors.response) {
      response = interceptor(response);
    }

    return response.json();
  }
}

// Usage
const apiClient = new ApiClient();
apiClient.addRequestInterceptor((config) => ({
  ...config,
  headers: { ...config.headers, Authorization: `Bearer ${token}` },
}));
```

## Query Key Management

```tsx
// queryKeys.ts
export const queryKeys = {
  users: {
    all: () => ['users'],
    list: () => [...queryKeys.users.all(), 'list'],
    detail: (id: string) => [...queryKeys.users.all(), id],
  },
  posts: {
    all: () => ['posts'],
    list: (userId: string) => [...queryKeys.posts.all(), userId],
  },
};

// Usage
function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: usersAPI.list,
  });
}

function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersAPI.get(id),
  });
}

// Invalidation
queryClient.invalidateQueries({
  queryKey: queryKeys.users.all(),
});
```

## Best Practices

✅ Centralize API calls in services
✅ Use typed responses
✅ Implement proper error handling
✅ Use query key factory for TanStack Query
✅ Separate concerns (API logic vs UI)
✅ Cache strategically
✅ Document endpoints
