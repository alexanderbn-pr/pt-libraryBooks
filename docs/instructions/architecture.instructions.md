## Architecture

- Separate:
  - UI components
  - hooks (data + logic)
  - services (API calls)

## Folder example

/features/users/
  - components/
  - hooks/
  - pages/
  - types/
  - services/

## Anti-patterns (DO NOT)

- Do not fetch data inside components directly
- Do not mix business logic with UI
- Do not use large monolithic components
- Do not duplicate logic (extract hooks)

## Structure
- One component per file
- Group related files (component, styles, tests)