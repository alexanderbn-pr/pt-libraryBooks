---
name: react-query
description: Manage server state with TanStack Query
category: state-management
level: intermediate
---

## Setup
```tsx
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

## Basic Query
```tsx
function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000,
  });
}

function UserList() {
  const { data: users, isLoading, error } = useUsers();
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  return <div>{users.map(u => <UserCard key={u.id} user={u} />)}</div>;
}
```

## Mutations
```tsx
function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUserInput) => 
      fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

function CreateForm() {
  const { mutate, isPending } = useCreateUser();
  return <button onClick={() => mutate(data)} disabled={isPending}>Create</button>;
}
```

## With Suspense
```tsx
function useSuspenseUsers() {
  return useSuspenseQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
}

// In component (no loading state needed)
function UserList() {
  const users = useSuspenseUsers().data;
  return <div>{users.map(u => <UserCard key={u.id} user={u} />)}</div>;
}

// Parent with Suspense
function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserList />
    </Suspense>
  );
}
```

## Query Key Patterns
```tsx
const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), filters],
  detail: (id) => [...userKeys.all, 'detail', id],
};

// Invalidate all user queries
queryClient.invalidateQueries({ queryKey: userKeys.all });
```

## Key Concepts
- **Server state**: Data from API, managed by React Query
- **Caching**: Automatic, configurable via staleTime
- **Background refetch**: Keeps data fresh automatically
- **Deduplication**: Same query runs once if requested multiple times
