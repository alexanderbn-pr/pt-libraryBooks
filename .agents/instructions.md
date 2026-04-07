# GitHub Copilot Agent Instructions

Este archivo configura las instrucciones y skills que Claude debe usar al asistir en este proyecto.

## 📚 Instrucciones Globales

Cuando el usuario haga preguntas sobre React, TypeScript, testing, estilos o arquitectura, utiliza siempre estas guías:

### React Best Practices
Referencia: `.github/instructions/react.instructions.md`

**Puntos clave:**
- Componentes funcionales siempre
- Hooks para toda la lógica
- React.memo, useMemo, useCallback para optimización
- React 18 features: Suspense, useTransition, useDeferredValue
- Custom hooks para lógica reutilizable

### TypeScript Best Practices
Referencia: `.github/instructions/typescript.instructions.md`

**Puntos clave:**
- Generics para tipos parametrizados
- Utility types: Partial, Pick, Omit, Record, etc.
- Type guards y type predicates
- Discriminated unions para state
- Tipos exactos, nunca `any`

### Testing Best Practices
Referencia: `.github/instructions/testing.instructions.md`

**Puntos clave:**
- Vitest para tests unitarios
- React Testing Library (no enzyme)
- MSW para API mocking
- Test behavior, not implementation
- Custom hook testing patterns

### Architecture Best Practices
Referencia: `.github/instructions/architecture.instructions.md`

**Puntos clave:**
- Feature-based folder structure
- Barrel exports (index.ts)
- Path aliases (@/)
- Separation of concerns
- Scalable organization

### Naming Conventions
Referencia: `.github/instructions/naming.instructions.md`

**Puntos clave:**
- Components: PascalCase (UserCard.tsx)
- Hooks: camelCase con prefijo (useAuth.ts)
- Files: lowercase kebab-case
- Constants: UPPER_SNAKE_CASE
- CSS classes: BEM naming

### CSS/SCSS Best Practices
Referencia: `.github/instructions/style.instructions.md`

**Puntos clave:**
- CSS modules o SCSS
- BEM methodology
- Responsive design mobile-first
- Utility functions
- Performance optimization

### SCSS Style Guide
Referencia: `.github/instructions/scss.instructions.md`

**Puntos clave:**
- BEM naming: .block, .block__element, .block__element--modifier
- Máximo 3 niveles de anidamiento
- Mixins para flexbox responsive
- Global styles: _variables.scss, _mixins.scss
- Component styles: componentName.scss (mismo nombre que TSX)

---

## 🎯 Skills Prácticos

Cuando el usuario pida ejemplos o quiera implementar algo específico, referencia el skill correspondiente:

### Fundamentals
Para conceptos básicos:

1. **Create Component** (`.github/skills/fundamentals/create-component/skill.md`)
   - Crear componentes TypeScript
   - Props interface
   - Compound components basics
   - Use: "Ayudame a crear un componente de..."

2. **Create Hook** (`.github/skills/fundamentals/create-hook/skill.md`)
   - Custom hooks
   - useState, useEffect patterns
   - Cleanup functions
   - Use: "Necesito un custom hook que..."

3. **Component Patterns** (`.github/skills/fundamentals/component-patterns/skill.md`)
   - Compound Components
   - Render Props
   - HOC patterns
   - Controlled/Uncontrolled
   - Use: "¿Qué patrón usar para...?"

### State Management
Para gestión de estado:

1. **React Query** (`.github/skills/state-management/react-query/skill.md`)
   - Server state management
   - Queries y mutations
   - Suspense integration
   - Query key management
   - Use: "Necesito fetch datos..." / "Integra React Query"

2. **Use Context** (`.github/skills/state-management/use-context/skill.md`)
   - Context API
   - useReducer patterns
   - UI state management
   - Use: "Crea un context para..." / "Maneja estado global"

3. **Zustand Store** (`.github/skills/state-management/zustand-store/skill.md`)
   - Client state (ligero)
   - Persist middleware
   - Selectors
   - Use: "Crea una store Zustand"

### Forms
Para formularios y validación:

1. **React Hook Form** (`.github/skills/forms/react-hook-form/skill.md`)
   - React Hook Form setup
   - Zod validation
   - Dynamic fields
   - Conditional logic
   - Use: "Crea un formulario..." / "Valida con Zod"

### Testing
Para tests:

1. **Generate Test** (`.github/skills/testing/generate-test/skill.md`)
   - Component testing
   - Hook testing
   - MSW API mocking
   - Async patterns
   - Use: "Escribe un test para..." / "Mock una API"

### Advanced
Para técnicas avanzadas:

1. **Error Boundary** (`.github/skills/advanced/error-boundary/skill.md`)
   - Error handling
   - Error recovery
   - Logging
   - Use: "Implementa manejo de errores"

2. **Performance Optimization** (`.github/skills/advanced/performance-optimization/skill.md`)
   - Memoization
   - Code splitting
   - Virtualization
   - Web Vitals
   - Use: "Optimiza el performance de..."

3. **Refactor Component** (`.github/skills/advanced/refactor-component/skill.md`)
   - Extract logic
   - Reduce prop drilling
   - Simplify state
   - Use: "Refactoriza este componente"

4. **SEO Optimization** (`.github/skills/advanced/seo/skill.md`)
   - Meta tags
   - Structured data
   - Sitemap
   - Core Web Vitals
   - Use: "Mejora el SEO..."

### Architecture
Para diseño de aplicaciones:

1. **API Design** (`.github/skills/architecture/api-design/skill.md`)
   - API client patterns
   - Resource services
   - Error handling
   - Interceptors
   - Use: "Diseña un cliente API"

2. **Folder Structure** (`.github/skills/architecture/folder-structure/skill.md`)
   - Feature-based organization
   - Barrel exports
   - Path aliases
   - Use: "Organiza la estructura..."

---

## 💡 Guía de Uso

### Al Pedir Ayuda a Claude

**Mala pregunta:**
```
"¿Cómo hago un hook?"
```

**Buena pregunta (con contexto):**
```
"Necesito un hook que maneje autenticación. 
Referencia: .github/skills/fundamentals/create-hook/skill.md
Sigue los patterns de .github/instructions/react.instructions.md"
```

### Patrones de Prompts Efectivos

1. **Para crear componentes:**
   ```
   "Crea un componente [Nombre] siguiendo:
   - .github/instructions/naming.instructions.md (naming)
   - .github/skills/fundamentals/create-component/ (patterns)
   - .github/instructions/typescript.instructions.md (typing)"
   ```

2. **Para estado:**
   ```
   "Usa React Query para [descripción]
   Referencia: .github/skills/state-management/react-query/skill.md"
   ```

3. **Para formularios:**
   ```
   "Crea formulario con validación:
   - .github/skills/forms/react-hook-form/skill.md"
   ```

4. **Para tests:**
   ```
   "Escribe tests para [componente/hook]:
   - .github/skills/testing/generate-test/skill.md
   - Usa MSW para APIs"
   ```

5. **Para estilos:**
   ```
   "Aplica estilos SCSS BEM:
   - .github/instructions/scss.instructions.md
   - Máximo 3 niveles anidamiento"
   ```

---

## 📍 Path Aliases

El proyecto usa path aliases configurados:
```
@ → src/
@/components → src/components/
@/hooks → src/hooks/
@/services → src/services/
@/style → src/style/
```

Usa estos en los imports.

---

## ✅ Checklist para Claude

Cuando Claude ayude en este proyecto, debería:

- [ ] Seguir las instrucciones de `.github/instructions/`
- [ ] Referenciar skills relevantes de `.github/skills/`
- [ ] Usar TypeScript con tipos explícitos
- [ ] Aplicar BEM en SCSS
- [ ] Hacer tests para componentes/hooks
- [ ] Usar path aliases (@/)
- [ ] Feature-based folder structure
- [ ] Mobile-first responsive design
- [ ] Documentar decisiones complejas

---

## 🔗 Referencias Rápidas

| Necesidad | Referencia |
|-----------|-----------|
| Componente React | skills/fundamentals/create-component/ |
| Custom Hook | skills/fundamentals/create-hook/ |
| Estado global | skills/state-management/react-query/ |
| Estado local | skills/state-management/use-context/ |
| Formularios | skills/forms/react-hook-form/ |
| Tests | skills/testing/generate-test/ |
| Estilos SCSS | instructions/scss.instructions.md |
| TypeScript | instructions/typescript.instructions.md |
| Arquitectura | skills/architecture/folder-structure/ |
| Performance | skills/advanced/performance-optimization/ |

---

**Última actualización**: 7 de abril de 2026
**Versión**: 1.0
**Para usar con**: Claude en VS Code / GitHub Copilot
