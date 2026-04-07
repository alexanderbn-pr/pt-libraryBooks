# Agent Configuration for Claude

Esta carpeta contiene la configuración para que Claude (GitHub Copilot en VS Code) acceda a todas las instrucciones y skills del proyecto.

## 📁 Archivos de Configuración

### `instructions.md`
Archivo principal que agrupa todas las instrucciones y skills disponibles. Contiene:
- 7 instruction files (React, TypeScript, Testing, Architecture, Naming, Style, SCSS)
- 14 skills organizados por categoría
- Guía de cómo hacer preguntas efectivas
- Checklist para Claude
- Referencias rápidas

### `claude.json`
Configuración en JSON con:
- Metadata del proyecto
- Referencias a todos los archivos
- Convenciones de nombres
- Path aliases
- Comandos disponibles

## 🎯 Cómo Usar

Cuando hagas preguntas a Claude en VS Code, puedes:

### Opción 1: Sin mencionar explícitamente (Claude leerá las instrucciones)
```
"Crea un componente para mostrar una lista de libros"
```

Claude automáticamente seguirá:
- `.github/instructions/react.instructions.md`
- `.github/skills/fundamentals/create-component/skill.md`
- BEM naming y SCSS patterns

### Opción 2: Menciona explícitamente la referencia (Más control)
```
"Crea un componente siguiendo:
- .github/instructions/naming.instructions.md
- .github/skills/fundamentals/create-component/skill.md"
```

### Opción 3: Por tipo de tarea
```
"Necesito estado global para autenticación. 
Usa React Query según .github/skills/state-management/react-query/"
```

## 📖 Instrucciones Disponibles

### Código y Patrones
- **react.instructions.md** - React 18+ best practices
- **typescript.instructions.md** - TypeScript avanzado
- **naming.instructions.md** - Convenciones de nombres

### Herramientas y Tests
- **testing.instructions.md** - Vitest + RTL + MSW
- **style.instructions.md** - CSS/SCSS general
- **scss.instructions.md** - SCSS específico + BEM

### Arquitectura
- **architecture.instructions.md** - Estructura de proyectos

## 🎯 Skills Disponibles

### Fundamentals (Básico)
```
.github/skills/fundamentals/
├── create-component/
├── create-hook/
└── component-patterns/
```

### State Management (Estado)
```
.github/skills/state-management/
├── react-query/
├── use-context/
└── zustand-store/
```

### Forms (Formularios)
```
.github/skills/forms/
└── react-hook-form/
```

### Testing (Tests)
```
.github/skills/testing/
└── generate-test/
```

### Advanced (Avanzado)
```
.github/skills/advanced/
├── error-boundary/
├── performance-optimization/
├── refactor-component/
└── seo/
```

### Architecture (Arquitectura)
```
.github/skills/architecture/
├── api-design/
└── folder-structure/
```

## 💡 Ejemplos de Prompts Efectivos

### Crear un componente
```
"Crea un componente BookCard que muestre:
- Imagen del libro
- Título y autor
- Rating (1-5 estrellas)

Sigue:
- .github/instructions/naming.instructions.md
- .github/skills/fundamentals/create-component/
- .github/instructions/scss.instructions.md para estilos"
```

### Implementar fetch de datos
```
"Necesito traer lista de libros desde /api/books

Usa:
- .github/skills/state-management/react-query/
- .github/instructions/testing.instructions.md para tests"
```

### Crear formulario con validación
```
"Formulario de login con email y password

Sigue:
- .github/skills/forms/react-hook-form/
- .github/instructions/typescript.instructions.md para tipos"
```

### Refactorizar componente
```
"Refactoriza BookList.tsx usando:
- .github/skills/advanced/refactor-component/
- .github/instructions/architecture.instructions.md"
```

### Escribir tests
```
"Escribe tests para el hook useBooks

Referencia:
- .github/skills/testing/generate-test/
- .github/instructions/testing.instructions.md"
```

## 🔍 Guía de Referencia Rápida

| Necesidad | Comando |
|-----------|---------|
| Nuevo componente | Ver `fundamentals/create-component/` |
| Custom hook | Ver `fundamentals/create-hook/` |
| Estado (servidor) | Ver `state-management/react-query/` |
| Estado (UI) | Ver `state-management/use-context/` |
| Estado (ligero) | Ver `state-management/zustand-store/` |
| Formulario | Ver `forms/react-hook-form/` |
| Tests | Ver `testing/generate-test/` |
| Estilos | Ver `instructions/scss.instructions.md` |
| Tipos TS | Ver `instructions/typescript.instructions.md` |
| Organización | Ver `architecture/folder-structure/` |

## ✅ Checklist antes de hacer preguntas

- [ ] ¿Qué tipo de componente/hook/feature es?
- [ ] ¿Qué estado necesita?
- [ ] ¿Necesita tests?
- [ ] ¿Qué estilos aplicar?
- [ ] ¿Sigue BEM naming?
- [ ] ¿TypeScript con tipos explícitos?

## 🚀 Pro Tips

1. **Sé específico**: Describe bien qué quieres
2. **Referencia archivos**: Menciona el skill/instruction relevante
3. **Contexto**: Explica dónde va el código en la estructura
4. **Requisitos**: Menciona librerias que uses (React Query, Zod, etc)
5. **Tests**: Pide tests junto con el código

## 📞 Contacto

Si necesitas agregar:
- Nuevas instrucciones: Crea archivo en `.github/instructions/`
- Nuevos skills: Crea carpeta en `.github/skills/`
- Nueva configuración: Actualiza este archivo

---

**Última actualización**: 7 de abril de 2026
**Versión**: 1.0
