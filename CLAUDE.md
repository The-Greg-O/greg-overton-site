# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev                    # Start dev server with Turbopack (localhost:3000)
pnpm build                  # Production build
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # ESLint (strict, zero warnings allowed)
pnpm lint:fix               # ESLint with auto-fix
pnpm format                 # Prettier format all files
pnpm format:check           # Check formatting
pnpm typecheck              # TypeScript type check

# Testing
pnpm test                   # Run Vitest in watch mode
pnpm test --run             # Run Vitest once (CI mode)
pnpm test:coverage          # Run with coverage report
pnpm test:e2e               # Run Playwright E2E tests (builds first)
pnpm test:e2e:ui            # Playwright with UI mode

# Run a single test file
pnpm test tests/unit/utils.test.ts
pnpm test:e2e tests/e2e/homepage.spec.ts
```

## Architecture

This is a Next.js 15 App Router personal portfolio site using TypeScript (strict mode), Tailwind CSS, and next-themes for dark mode.

### Path Alias

`@/*` maps to `./src/*` - use this for all imports from src.

### Source Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components
  - `src/components/ui/` - Primitive UI components (Button, etc.)
- `src/lib/` - Utilities and configuration
  - `utils.ts` - `cn()` helper combining clsx + tailwind-merge
  - `constants.ts` - Site configuration (`siteConfig`)
  - `fonts.ts` - Geist font setup
- `src/types/` - Shared TypeScript type definitions

### Testing Structure

- `tests/unit/` - Vitest unit tests (jsdom environment, uses `@testing-library/react`)
- `tests/e2e/` - Playwright E2E tests (runs against localhost:3000)
- `tests/setup.ts` - Vitest setup importing jest-dom matchers

### Styling

Uses Tailwind with CSS custom properties for theming. Colors like `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, and `border` are defined as HSL variables in `globals.css` and referenced in `tailwind.config.ts`.

Dark mode is class-based via `next-themes` with `ThemeProvider` wrapping the app.

## Code Conventions

- Use `type` imports: `import { type Foo } from 'bar'` (enforced by ESLint)
- Prefix unused variables with underscore: `_unusedVar`
- Components needing client-side features must have `'use client'` directive
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint)

## Pre-commit Hooks

Husky runs lint-staged on commit:

- TypeScript files: ESLint fix + Prettier
- JSON/MD/YAML files: Prettier

Commit messages are validated against conventional commit format.
