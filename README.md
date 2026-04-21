# gregoverton.com

Personal portfolio and project showcase.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/The-Greg-O/greg-overton-site.git
cd greg-overton-site

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `pnpm dev`       | Start development server with Turbopack |
| `pnpm build`     | Build for production                    |
| `pnpm start`     | Start production server                 |
| `pnpm lint`      | Run ESLint                              |
| `pnpm format`    | Format code with Prettier               |
| `pnpm typecheck` | Run TypeScript type checking            |
| `pnpm test`      | Run unit tests                          |
| `pnpm test:e2e`  | Run end-to-end tests                    |

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
│   └── ui/        # Primitive UI components
├── lib/           # Utilities and helpers
└── types/         # TypeScript type definitions

tests/
├── unit/          # Vitest unit tests
└── e2e/           # Playwright E2E tests
```

## Code Quality

This project enforces code quality through:

- **TypeScript** strict mode with additional checks
- **ESLint** with accessibility rules
- **Prettier** for consistent formatting
- **Husky** pre-commit hooks
- **Commitlint** for conventional commits
- **GitHub Actions** CI pipeline

## Repository Setup

### Branch Protection (Required)

After pushing to GitHub, configure branch protection:

```bash
# Using the included script (requires GitHub CLI)
./scripts/setup-github.sh
```

Or manually in GitHub Settings → Branches → Add rule for `main`:

- [x] Require pull request before merging
- [x] Require 1 approval
- [x] Require review from code owners
- [x] Dismiss stale reviews on new commits
- [x] Require status checks: `quality`, `e2e`
- [x] Require branches to be up to date
- [x] Require linear history
- [x] Block force pushes

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

## License

MIT
