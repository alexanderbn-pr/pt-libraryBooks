# GitHub Copilot Instructions for pt-opositaTest

You are an AI assistant helping develop a React + TypeScript application following professional best practices.

## Project Structure

This project uses a feature-based folder structure with:
- Components in `src/components/`
- Custom hooks in `src/hooks/`
- Pages in `src/pages/`
- Services for API calls in `src/services/`
- Styles in `src/style/`

## Core Instructions

Always follow these guidelines when generating code:

### 1. React Best Practices
Reference: `.agents/instructions/react.instructions.md`
- Use functional components with hooks
- Implement proper error boundaries for error handling
- Use React.memo() for performance-critical components
- Prefer custom hooks over class component lifecycle methods
- Keep components focused and reusable

### 2. TypeScript Standards
Reference: `.agents/instructions/typescript.instructions.md`
- Always use strict TypeScript typing
- Define interfaces for all component props (interface Props { ... })
- Use discriminated unions for complex type patterns
- Avoid `any` type - use `unknown` if needed
- Export types and interfaces for reusability

### 3. Component Creation
Reference: `.agents/skills/fundamentals/create-component/skill.md`
When creating components:
```tsx
interface Props {
  // Define all props with types
}

export const ComponentName = ({ prop }: Props) => {
  // Implementation
};

export default React.memo(ComponentName);
```

### 4. Testing
Reference: `.agents/instructions/testing.instructions.md`
Reference: `.agents/skills/testing/generate-test/skill.md`
- Write tests alongside components (e.g., `component.test.tsx`)
- Use Vitest + React Testing Library
- Test behavior, not implementation
- Use `screen` queries instead of `container`
- Mock API calls with MSW (Mock Service Worker)
- Aim for >80% coverage on critical paths

### 5. State Management
Reference: `.agents/instructions/architecture.instructions.md`

Choose based on use case:
- **React Query**: `.agents/skills/state-management/react-query/skill.md` - Server state, API data
- **Context API + useReducer**: `.agents/skills/state-management/use-context/skill.md` - Global client state
- **Zustand**: `.agents/skills/state-management/zustand-store/skill.md` - Simple client state

### 6. Styling
Reference: `.agents/instructions/style.instructions.md`
Reference: `.agents/instructions/scss.instructions.md`
- Use SCSS with BEM methodology (Block__Element--Modifier)
- Maximum 3 levels of nesting
- Use mixins from `src/style/mixins.scss`
- Mobile-first responsive design
- Use CSS custom properties for theming

### 7. Naming Conventions
Reference: `.agents/instructions/naming.instructions.md`
- **Components**: PascalCase (e.g., `BookComponent`)
- **Files**: kebab-case or camelCase based on export (e.g., `book-component.tsx`)
- **Functions/Variables**: camelCase (e.g., `handleBookSelect`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_PAGE_SIZE`)
- **CSS Classes**: kebab-case (e.g., `.book-card-info`)

### 8. Forms
Reference: `.agents/skills/forms/react-hook-form/skill.md`
- Use React Hook Form for form handling
- Validate with Zod schemas
- Implement proper error messages
- Use accessibility attributes (aria-labels, aria-required)

### 9. Performance
Reference: `.agents/skills/advanced/performance-optimization/skill.md`
- Use React.memo() for expensive components
- Implement proper dependency arrays in useEffect
- Use lazy loading for images (loading="lazy")
- Code splitting with React.lazy()
- Suspense for async component rendering

### 10. Accessibility
- Always include aria-labels for interactive elements
- Use semantic HTML (button, header, section, etc.)
- Ensure color contrast meets WCAG standards
- Test with screen readers
- Implement keyboard navigation

## Available Skills

### Fundamentals
- `.agents/skills/fundamentals/create-component/skill.md` - Create reusable components
- `.agents/skills/fundamentals/create-hook/skill.md` - Build custom hooks
- `.agents/skills/fundamentals/component-patterns/skill.md` - Component design patterns

### State Management
- `.agents/skills/state-management/react-query/skill.md` - Server state with React Query
- `.agents/skills/state-management/use-context/skill.md` - Global context state
- `.agents/skills/state-management/zustand-store/skill.md` - Client state with Zustand

### Forms & Validation
- `.agents/skills/forms/react-hook-form/skill.md` - Form handling with validation

### Testing
- `.agents/skills/testing/generate-test/skill.md` - Unit and integration tests

### Advanced
- `.agents/skills/advanced/error-boundary/skill.md` - Error boundary implementation
- `.agents/skills/advanced/performance-optimization/skill.md` - Performance optimization
- `.agents/skills/advanced/refactor-component/skill.md` - Component refactoring
- `.agents/skills/advanced/seo/skill.md` - SEO best practices

### Architecture
- `.agents/skills/architecture/api-design/skill.md` - API design patterns
- `.agents/skills/architecture/folder-structure/skill.md` - Project structure

## How to Use These Instructions

When asking me to help with development:

### For a new component:
"Crea un componente BookCard siguiendo:
- .agents/skills/fundamentals/create-component/skill.md
- .agents/instructions/naming.instructions.md
- .agents/instructions/scss.instructions.md para estilos"

### For API integration:
"Implementa un hook para obtener libros usando:
- .agents/skills/state-management/react-query/skill.md
- .agents/instructions/typescript.instructions.md"

### For tests:
"Escribe tests para BookComponent siguiendo:
- .agents/skills/testing/generate-test/skill.md
- .agents/instructions/testing.instructions.md"

### For refactoring:
"Refactoriza este componente siguiendo:
- .agents/skills/advanced/refactor-component/skill.md
- .agents/instructions/architecture.instructions.md"

## Build & Development

- **Node Version**: v20.20.2 (use `nvm use 20`)
- **Build Tool**: Vite 6.2.3
- **Package Manager**: npm
- **Test Runner**: Vitest
- **Build Command**: `npm run build`
- **Dev Server**: `npm run dev`
- **Test Command**: `npm run test` or `npm run test:watch`

## Code Quality Standards

- ESLint configuration must pass
- No TypeScript errors
- Minimum 80% test coverage for critical components
- No console.log in production code
- Proper error handling and user feedback
- Accessibility validation
- Performance budgets respected

## Default Behavior

Unless specified otherwise:
1. Always write TypeScript with strict typing
2. Include tests for new components
3. Follow SCSS BEM methodology for styles
4. Use React.memo() for component optimization
5. Implement proper error boundaries
6. Add aria-labels for accessibility
7. Handle loading and error states
8. Use React Query for server state

## Quick Reference

| Task | Skill Path |
|------|-----------|
| Create component | `.agents/skills/fundamentals/create-component/skill.md` |
| Create custom hook | `.agents/skills/fundamentals/create-hook/skill.md` |
| Fetch API data | `.agents/skills/state-management/react-query/skill.md` |
| Global state | `.agents/skills/state-management/use-context/skill.md` |
| Form validation | `.agents/skills/forms/react-hook-form/skill.md` |
| Write tests | `.agents/skills/testing/generate-test/skill.md` |
| Fix bugs | `.agents/skills/advanced/refactor-component/skill.md` |
| Improve performance | `.agents/skills/advanced/performance-optimization/skill.md` |
| Handle errors | `.agents/skills/advanced/error-boundary/skill.md` |
| API patterns | `.agents/skills/architecture/api-design/skill.md` |

---

Last updated: April 7, 2026
