---
name: refactor-component
description: Improve and refactor React components
category: advanced
level: intermediate
---

## Extract Complex Logic into Hooks

```tsx
// Before: 200+ lines, mixed concerns
function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState('name');
  // ... more state and fetch logic

  return <div>{/* rendering */}</div>;
}

// After: Split into hooks and components
function useUserManagement() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(res => setUsers(res));
  }, []);
  return { users };
}

function UserDashboard() {
  const { users } = useUserManagement();
  const { paged, page, setPage } = usePagination(users, 10);

  return (
    <>
      <UserList users={paged} />
      <Pagination page={page} onChange={setPage} />
    </>
  );
}
```

## Break Down Large Components

```tsx
// Split responsibilities
function UserDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { users } = useUserManagement();

  return (
    <div>
      <UserListSection users={users} onSelect={setSelectedUser} />
      {selectedUser && <UserDetailSection user={selectedUser} />}
    </div>
  );
}

// Focused components
const UserListSection = ({ users, onSelect }: Props) => (
  <div>
    <h2>Users</h2>
    <UserList users={users} onSelect={onSelect} />
  </div>
);
```

## Remove Prop Drilling

```tsx
// Before: Props passing through multiple levels
function App({ user, theme, language }: Props) {
  return <Layout user={user} theme={theme} language={language} />;
}

// After: Use Context
const UserContext = createContext<User | null>(null);

function App({ user, theme }: Props) {
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function Sidebar() {
  const user = useContext(UserContext);
  return <div>{user?.name}</div>;
}
```

## Reduce State Complexity

```tsx
// Before: Multiple related states
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');

// After: Single reducer
const [formData, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  },
  initialState
);
```

## Guard Clauses Over Nested Ternaries

```tsx
// Before: Callback hell
return (
  <div>
    {isLoading ? (
      <Spinner />
    ) : error ? (
      <Error />
    ) : data.length > 0 ? (
      <List />
    ) : (
      <Empty />
    )}
  </div>
);

// After: Early returns
function ListContainer() {
  const { data, isLoading, error } = useQuery(...);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  if (data.length === 0) return <Empty />;

  return <List data={data} />;
}
```

## Type Safety

```tsx
// Before
function UserCard(props: any) {
  return <div>{props.user.name}</div>;
}

// After
interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => (
  <div onClick={() => onSelect?.(user.id)}>{user.name}</div>
);
```

## Refactoring Checklist
- ✅ Component < 100 lines
- ✅ Single responsibility
- ✅ Reusable hooks extracted
- ✅ Props < 5 items
- ✅ No prop drilling
- ✅ Clear naming
