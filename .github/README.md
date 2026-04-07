# 📚 AI Learning Knowledge Base

Guía completa y profesional para desarrollo React de nivel Senior. Esta carpeta contiene instrucciones consolidadas y skills prácticos para trabajar con asistentes de IA.

## 📖 Instrucciones (6 archivos)

Las instrucciones son guías fundamentales que unifican conceptos clave:

### 1. **react.instructions.md**
Mejores prácticas de React 18+, incluyendo:
- Fundamentals y hooks avanzados
- Render optimization (React.memo, useMemo, useCallback)
- React 18 features (Suspense, transitions, batching)
- Custom hooks patterns
- Memory management y cleanup

### 2. **typescript.instructions.md**
TypeScript avanzado para React:
- Generics y tipos parametrizados
- Utility types (Partial, Pick, Omit, etc.)
- Type guards y type predicates
- Discriminated unions
- Tipos complejos para React patterns

### 3. **testing.instructions.md**
Estrategia de testing profesional:
- Vitest setup y configuration
- React Testing Library patterns
- MSW (Mock Service Worker) setup
- Custom hook testing
- Integration tests y E2E basics

### 4. **architecture.instructions.md**
Diseño y organización de aplicaciones:
- Feature-based folder structure
- Component architecture patterns
- State management organization
- API client design
- Scalability best practices

### 5. **naming.instructions.md**
Convenciones de nombres profesionales:
- Variables, funciones, componentes
- Files y folders
- CSS classes (BEM)
- Constants y enums
- Type/Interface naming

### 6. **style.instructions.md**
Guía de estilos CSS/SCSS:
- CSS-in-JS vs SCSS
- Naming conventions
- Responsive design
- Performance optimization
- Accessibility considerations

### 7. **scss.instructions.md** ⭐
SCSS profesional con BEM y mixins:
- File organization y naming
- BEM methodology (Block, Element, Modifier)
- Anidamiento máximo 3 niveles
- Flex responsive mixins
- Patrones comunes y best practices

---

## 🎯 Skills (13 archivos consolidados)

Los skills son ejercicios prácticos y ejemplos copy-paste ready. Organizados por nivel de complejidad:

### Fundamentals (3 skills)
Conceptos básicos que todo React developer debe dominar:

#### 1. **fundamentals/create-component/**
Crear componentes React profesionales:
- Functional components
- Props interface
- Compound patterns basics
- TypeScript typing

#### 2. **fundamentals/create-hook/**
Custom hooks esenciales:
- useState, useEffect basics
- Cleanup functions
- Hook composition
- Hook testing

#### 3. **fundamentals/component-patterns/**
Patrones de componentes avanzados:
- Compound Components
- Render Props
- HOC (Higher Order Components)
- Controlled/Uncontrolled

### State Management (3 skills)
Gestión de estado para diferentes casos:

#### 1. **state-management/react-query/** ✨
Server state con TanStack Query:
- Queries y mutations básicas
- Suspense integration
- Query key management
- Caching strategies

#### 2. **state-management/use-context/**
Context API para UI state:
- Simple context setup
- useReducer integration
- Provider patterns
- Multiple contexts

#### 3. **state-management/zustand-store/**
Client state ligero con Zustand:
- Store creation
- Async actions
- Middleware (persist)
- Selectors y performance

### Forms (1 skill)
Manejo profesional de formularios:

#### **forms/react-hook-form/** ✨
React Hook Form + Zod validation:
- Form setup y validation
- Dynamic fields
- Conditional logic
- Zod schema patterns

### Testing (1 skill)
Testing completo de componentes y hooks:

#### **testing/generate-test/** ✨
Vitest + RTL + MSW:
- Component testing
- Hook testing
- API mocking con MSW
- Async patterns y best practices

### Advanced (4 skills)
Técnicas avanzadas para aplicaciones grandes:

#### 1. **advanced/error-boundary/**
Manejo de errores en React:
- Error boundaries basics
- Error recovery
- Logging
- Suspense integration

#### 2. **advanced/performance-optimization/**
Optimización de performance:
- Memoization strategies
- Code splitting y lazy loading
- Virtualization
- Web Vitals monitoring

#### 3. **advanced/refactor-component/**
Refactorización profesional:
- Extract hooks y components
- Reduce prop drilling
- Simplify state
- Type safety improvements

#### 4. **advanced/seo/** ✨
Search Engine Optimization:
- Meta tags y OG tags
- Structured data
- XML sitemap
- Robot.txt
- Core Web Vitals
- Technical SEO

### Architecture (2 skills)
Diseño de aplicaciones escalables:

#### 1. **architecture/api-design/**
Cliente API y integración:
- API client patterns
- Resource services
- Error handling
- Interceptors y middleware

#### 2. **architecture/folder-structure/**
Organización de proyectos:
- Feature-based structure
- Barrel exports
- Import aliases
- Scalability patterns

---

## 🎓 Cómo Usar

### Con AI/Copilot
```bash
# Referencia en prompts
"Sigue las prácticas de .github/instructions/react.instructions.md"
"Usa el patrón de .github/skills/state-management/react-query/"
```

### Learning Path (Recomendado)
1. **Día 1-2**: Lee `react.instructions.md` + `typescript.instructions.md`
2. **Día 3-4**: Práctica con fundamentals skills (3 archivos)
3. **Día 5-6**: State management (3 skills)
4. **Día 7**: Forms + Testing (2 skills)
5. **Semana 2**: Advanced (3 skills)
6. **Semana 3**: Architecture (2 skills)

### Para Refactorizar Código
1. Consulta `architecture.instructions.md`
2. Revisa `advanced/refactor-component/skill.md`
3. Aplica patterns de `architecture/folder-structure/`

### Para Nuevas Features
1. Revisa skill relevante (ej: `forms/react-hook-form/`)
2. Consulta instruction correspondiente (`testing.instructions.md`, etc.)
3. Copia el ejemplo y adapta a tu caso

---

## 📊 Estadísticas

- **Total Files**: 21 (7 instructions + 14 skills)
- **Total Lines**: ~4500 líneas de código y documentación
- **Coverage**: React 18+, TypeScript 5, Testing, Performance, Architecture, SEO
- **Format**: Markdown + Code examples copy-paste ready
- **Quality**: Production-ready patterns from senior developers

---

## 🎯 Key Features

✅ **Consolidado**: 14 skills sin redundancias (reducido 60%)
✅ **Profesional**: Patrones para aplicaciones grandes
✅ **Type-Safe**: TypeScript completo en todos los ejemplos
✅ **AI-Friendly**: Formatos optimizados para LLM prompting
✅ **Copy-Paste Ready**: Código que funciona inmediatamente
✅ **Best Practices**: Convenciones senior-level
✅ **Responsive**: Incluye patrones mobile-first
✅ **Testeado**: Ejemplos de testing incluidos

---

## 📝 Convenciones

### Nombres de Archivos
- Instrucciones: `{topic}.instructions.md`
- Skills: `{category}/skill.md`
- CSS: mismo nombre que componente en lowercase

### BEM CSS
```scss
.block {}           // Componente
.block__element {}  // Elemento dentro
.block__element--modifier {} // Variante
```

### Typescript
```tsx
interface ComponentProps {
  // props
}

interface State {
  // local state
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  // component
};
```

---

## 🚀 Próximas Mejoras (Point 1)

Instruction files planificados:
- `performance.instructions.md` - Web Vitals, optimization
- `api-integration.instructions.md` - REST/GraphQL patterns
- `accessibility.instructions.md` - WCAG compliance
- `security.instructions.md` - XSS, CSRF, data protection

---

## 📚 Recursos Externos

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Testing Library](https://testing-library.com/)
- [MSW (Mock Service Worker)](https://mswjs.io/)

---

**Última actualización**: 7 de abril de 2026
**Versión**: 1.0 (Consolidada)
**Nivel**: Senior React Developer
