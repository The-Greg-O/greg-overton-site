# gregoverton.com

[![CI](https://github.com/The-Greg-O/greg-overton-site/actions/workflows/ci.yml/badge.svg)](https://github.com/The-Greg-O/greg-overton-site/actions/workflows/ci.yml)

Personal portfolio and project showcase for [gregoverton.com](https://gregoverton.com).

This repository is intentionally public: the site is both a portfolio and a small engineering work
sample. It emphasizes clean content modeling, strict TypeScript, accessible static rendering,
production metadata, and repeatable quality gates.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) in strict mode
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) plus scoped global CSS utilities
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
git clone https://github.com/The-Greg-O/greg-overton-site.git
cd greg-overton-site
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start the development server with Turbopack      |
| `pnpm build`         | Build the production app                         |
| `pnpm start`         | Start the production server                      |
| `pnpm lint`          | Run ESLint with zero warnings allowed            |
| `pnpm lint:fix`      | Run ESLint with auto-fix                         |
| `pnpm format`        | Format files with Prettier                       |
| `pnpm format:check`  | Check Prettier formatting                        |
| `pnpm typecheck`     | Run TypeScript without emitting output           |
| `pnpm test`          | Run Vitest unit tests                            |
| `pnpm test:ui`       | Run Vitest with the interactive UI               |
| `pnpm test:coverage` | Run Vitest with coverage reporting               |
| `pnpm test:e2e`      | Run Playwright tests against a production server |
| `pnpm test:e2e:ui`   | Run Playwright with the interactive UI           |

## Project Structure

```text
src/
├── app/             # Next.js App Router pages, metadata, icons, and sitemap
├── components/      # Presentation components and page sections
├── data/            # Portfolio content models for roles and projects
└── lib/             # Site constants, fonts, and utility helpers

tests/
├── unit/            # Vitest coverage for utilities and metadata routes
├── e2e/             # Playwright smoke tests across desktop and mobile browsers
└── setup.ts         # Vitest setup importing jest-dom matchers
```

## Code Quality

This project enforces:

- Strict TypeScript with additional safety checks
- ESLint, including accessibility rules
- Prettier with Tailwind class sorting
- Vitest unit tests
- Playwright browser smoke tests
- GitHub Actions CI for typecheck, lint, formatting, tests, and production build
- Husky + lint-staged + commitlint for local commit hygiene

Published image assets are stripped of EXIF metadata before being committed.

## Repository Setup

### Branch Protection

After pushing to GitHub, configure branch protection:

```bash
./scripts/setup-github.sh
```

The script requires the GitHub CLI and applies protection for `main`, including pull requests,
code-owner review, linear history, blocked force pushes, and required `Code Quality` and `E2E Tests`
checks.

### Environment Variables

All environment variables are optional. Copy the template only if you need to override defaults:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` controls the canonical URL used in metadata and sitemap generation.

## License

MIT
