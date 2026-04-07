---
name: components
description: Create and compose React components with TypeScript
category: fundamentals
level: beginner
---

## Creating Components

### Basic Structure
```tsx
interface UserCardProps {
  name: string;
  email: string;
  onSelect?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, onSelect }) => (
  <div className="user-card">
    <h3>{name}</h3>
    <p>{email}</p>
    {onSelect && <button onClick={() => onSelect(id)}>Select</button>}
  </div>
);

export default UserCard;
```

**Rules:**
- Always type props explicitly
- Use PascalCase for components
- One component per file
- Co-locate styles (CSS module or SCSS)

---

## Component Patterns

### Compound Components
Related components that share state:
```tsx
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }) => <div className="tab-list">{children}</div>;
const TabPanel = ({ id, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === id ? <div>{children}</div> : null;
};

// Usage: <Tabs><TabList>...<TabPanel></Tabs>
```

### Controlled vs Uncontrolled
```tsx
// Controlled: Parent controls value
<input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled: Component controls itself
<input ref={ref} defaultValue="initial" />
```

## Output

- Component with props interface
- Optional: pattern implementation
- Clean, focused code
