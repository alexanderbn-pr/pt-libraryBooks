---
name: performance-optimization
description: Optimize React applications for speed and responsiveness
category: advanced
level: intermediate
---

## Memoization

Prevent unnecessary re-renders:

```tsx
// Component memoization
const UserCard = React.memo(({ user }: Props) => (
  <div>{user.name}</div>
));

// Value memoization
function Dashboard({ items }: Props) {
  const filtered = useMemo(
    () => items.filter(item => item.active),
    [items]
  );
  return <List items={filtered} />;
}

// Callback memoization
function Search() {
  const handleSearch = useCallback((term: string) => {
    fetchResults(term);
  }, []);
  
  return <SearchInput onChange={handleSearch} />;
}
```

## Code Splitting & Lazy Loading

```tsx
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
```

## Virtualization (Long Lists)

```tsx
import { FixedSizeList } from 'react-window';

function LargeList({ items }: Props) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
```

## Bundle Analysis

```bash
# Find large dependencies
npm install --save-dev rollup-plugin-visualizer

# Analyze bundle
vite build --analyze
```

## Image Optimization

```tsx
// Responsive images
<picture>
  <source srcSet={mobileImg} media="(max-width: 640px)" />
  <img src={desktopImg} alt="content" />
</picture>

// Next.js Image
<Image
  src={img}
  alt="content"
  width={1200}
  height={800}
  priority={false}
/>
```

## React DevTools Profiler

1. Open React DevTools → Profiler tab
2. Record interactions
3. Check component render counts
4. Identify unnecessary re-renders

## Transitions & Deferred Values

```tsx
function Search() {
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const results = useDeferredValue(input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setInput(e.target.value);
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results term={results} />
    </>
  );
}
```

## Performance Metrics

```tsx
// Web Vitals
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

onCLS(console.log);  // Layout Shift
onFID(console.log);  // First Input Delay
onFCP(console.log);  // First Contentful Paint
onLCP(console.log);  // Largest Contentful Paint
onTTFB(console.log); // Time to First Byte
```

## Key Points
- Profile before optimizing
- Use React.memo for expensive components
- Split code by routes
- Virtualize long lists
- Lazy load images
- Monitor Core Web Vitals


