# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Standards

This is a public portfolio repository. Code, commits, assets, and documentation are professional
work samples and should be treated that way:

- **Code quality**: Modern React, strict TypeScript, accessibility, performance
- **Git hygiene**: Atomic commits with clear conventional commit messages
- **Architecture**: Small, intentional modules that match the existing structure
- **Testing**: Behavior-focused coverage for utilities, metadata, and page-level smoke paths
- **Privacy**: Strip EXIF metadata from public image assets before committing

## Commands

```bash
# Development
pnpm dev                    # Start dev server with Turbopack
pnpm build                  # Production build
pnpm start                  # Start production server

# Code quality
pnpm lint                   # ESLint, zero warnings allowed
pnpm lint:fix               # ESLint with auto-fix
pnpm format                 # Prettier format all files
pnpm format:check           # Check formatting
pnpm typecheck              # TypeScript type check

# Testing
pnpm test                   # Run Vitest in watch mode
pnpm test --run             # Run Vitest once
pnpm test:coverage          # Run Vitest coverage
pnpm test:e2e               # Run Playwright E2E tests
pnpm test:e2e:ui            # Playwright UI mode
```

## Architecture

This is a Next.js 16 App Router portfolio site using React 19, TypeScript strict mode, Tailwind CSS,
and static content modules.

### Path Alias

`@/*` maps to `./src/*`. Use it for imports from `src`.

### Source Structure

- `src/app/` - App Router entrypoints, metadata routes, icons, and 404 page
- `src/components/` - Presentation components and page sections
- `src/data/` - Role and project content models
- `src/lib/` - Site constants, font setup, and shared utilities

### Testing Structure

- `tests/unit/` - Vitest unit tests (jsdom environment, uses `@testing-library/react`)
- `tests/e2e/` - Playwright smoke tests (runs against the production server on `localhost:3000`)
- `tests/setup.ts` - Vitest setup importing jest-dom matchers

### Styling

Tailwind handles layout and most component styling. `src/app/globals.css` owns base styles, design
tokens, and a small set of reusable visual utilities such as `surface-glass`, `chip`, and image
plate treatments.

The site is dark by design via the root `dark` class and `color-scheme`; there is no runtime theme
provider.

### Metadata

- `src/lib/constants.ts` is the source of truth for canonical URL, author metadata, and update date.
- `src/app/layout.tsx` owns page metadata.
- `src/app/sitemap.ts` publishes the sitemap consumed by `public/robots.txt`.
- `src/app/opengraph-image.tsx`, `icon.tsx`, and `apple-icon.tsx` generate dynamic image assets.

## Code Conventions

- Use `type` imports: `import { type Foo } from 'bar'` (enforced by ESLint).
- Prefix intentionally unused variables with `_`: `_unusedVar`.
- Add `'use client'` only for components that need client-side behavior.
- Keep content changes in `src/data` when possible.
- Avoid dead scaffold files; if a type or helper has no consumer, remove it.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) and are checked by commitlint.

### File Length

- **Components**: ~150 lines max. Extract subcomponents or hooks when exceeding this.
- **Utilities/hooks**: ~100 lines max. Split into focused modules.
- **Test files**: No strict limit, but group related tests and consider splitting by feature.

These are guidelines, not rules. A 200-line component with clear structure is better than three tangled 60-line files.

## Pre-commit Hooks

Husky runs lint-staged on commit:

- TypeScript files: ESLint fix + Prettier
- JSON, Markdown, and YAML files: Prettier

Commit messages are validated with commitlint.
