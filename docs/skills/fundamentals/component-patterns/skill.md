---
name: advanced-patterns
description: Advanced component composition patterns
category: fundamentals
level: intermediate
---

## Compound Components
Components that work together:
```tsx
const Tabs = ({ children, defaultTab }) => {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
};

// <Tabs><Tab.Panel>...</Tab.Panel></Tabs>
```

## Render Props
Pass render logic as prop:
```tsx
<DataFetcher>{({ data, loading }) => <List data={data} />}</DataFetcher>
```

## Higher-Order Components
Wrap component with logic:
```tsx
export default withAuth(Dashboard); // Adds user prop
```

## When to Use
| Pattern | For |
|---------|-----|
| Compound | Related components sharing state |
| Render Props | Flexible rendering logic |
| HOC | Auth, theme, cross-cutting concerns |
| Controlled | Forms with validation |
| Uncontrolled | Simple inputs, file uploads |
