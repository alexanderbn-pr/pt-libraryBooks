# 📚 React Professional Learning Guide

Knowledge base para aprender React como **Senior Developer**. Estructura clara, concisa y sin redundancias.

## 📊 Estructura (13 Consolidated Skills)

```
docs/
├── instructions/          # Guías fundamentales mejoradas
│   ├── architecture.instructions.md
│   ├── naming.instructions.md
│   ├── react.instructions.md        ✅ Enhanced
│   ├── style.instructions.md
│   ├── testing.instructions.md      ✅ Enhanced
│   └── typescript.instructions.md   ✅ Enhanced
│
└── skills/               # Ejercicios prácticos (80-150 líneas cada uno)
    │
    ├── fundamentals/
    │   ├── create-component/
    │   ├── create-hook/
    │   └── component-patterns/
    │
    ├── state-management/
    │   ├── use-context/
    │   ├── zustand-store/
    │   └── react-query/             ✅ Consolidated
    │
    ├── forms/
    │   └── react-hook-form/         ✅ Consolidated
    │
    ├── testing/
    │   └── generate-test/           ✅ Consolidated
    │
    └── advanced/
        ├── error-boundary/          ✅ Condensed
        ├── performance-optimization/ ✅ Condensed
        └── refactor-component/      ✅ Condensed
```

## 🎯 Learning Path

### Level 1: Fundamentals (Beginner)
Learn React basics with focused examples:
- **create-component**: Basic component structure, JSX, props
- **create-hook**: useState, useEffect, cleanup, dependencies
- **component-patterns**: Compound, Render Props, HOC, Controlled/Uncontrolled

### Level 2: State Management (Intermediate)
Master different state approaches:
- **use-context**: Context API + useReducer for shared state
- **zustand-store**: Simple client state management
- **react-query**: Server state with queries, mutations, suspense

### Level 3: Forms (Intermediate)
Build robust forms:
- **react-hook-form**: Form handling + Zod validation + dynamic fields

### Level 4: Testing (Intermediate)
Write reliable tests:
- **generate-test**: Unit tests + integration tests + MSW mocking

### Level 5: Advanced
Professional patterns:
- **error-boundary**: Error handling & recovery
- **performance-optimization**: Memoization, code splitting, metrics
- **refactor-component**: Extract logic, remove prop drilling, reduce complexity

## 📏 Quality Standards

Each skill file:
- **Length**: 80-150 lines (concise, focused)
- **Examples**: 2-3 essential examples per concept
- **Structure**: Problem → Solution → Best practices
- **No redundancy**: All duplicate content consolidated

## 📖 Instructions Guide

Enhanced with professional patterns:
- **react.instructions.md**: React 18+ features, hooks, performance
- **typescript.instructions.md**: Generics, utility types, type guards
- **testing.instructions.md**: MSW setup, custom hooks, integration tests

## 💡 How to Use

1. **Beginners**: Start with `fundamentals/` folder
2. **Intermediate**: Move to `state-management/` and `forms/`
3. **Advanced**: Study `advanced/` for professional patterns
4. **Deep Dive**: Use `instructions/` for detailed guidance

## 🚀 Total Knowledge Base

- **Skills**: 13 files (consolidated from 33)
- **Instructions**: 6 core files + point-1 future expansion
- **Coverage**: React 18+, TypeScript 5, Testing, Performance, Architecture
- **Format**: All examples are copy-paste ready
- **Size**: Average 100 lines per skill (80-150 range)

## ⚡ Recent Consolidations

✅ `react-query-fetch` + `react-query-suspense` → `react-query/`
✅ `react-hook-form` + `form-validation` → single file with Zod
✅ `generate-test` + `mock-api-requests` → single testing file
✅ All advanced skills condensed to 70-110 lines

## 🎓 Technologies Covered

**Core**:
- React 18+ (hooks, batching, transitions)
- TypeScript 5 (generics, utility types)
- Vite (bundling, optimization)

**State Management**:
- React Query / TanStack Query
- Zustand
- Context API + useReducer

**Forms & Validation**:
- React Hook Form
- Zod

**Testing**:
- Vitest
- React Testing Library
- Mock Service Worker

**Performance**:
- Code splitting & lazy loading
- Memoization (memo, useMemo, useCallback)
- Virtual scrolling
- Web Vitals

## 📝 Future: Point 1 (Unified Instructions)

Planned consolidated instruction files:
- `performance.instructions.md`
- `forms.instructions.md`
- `state-management.instructions.md`
- `accessibility.instructions.md`
- `api-integration.instructions.md`

---

**Created for**: Professional React learning with AI assistance
**Best for**: Senior-level development, code review, architectural decisions
