# 4hum-ai Workspace

This is a **Turborepo-based monorepo** for the 4hum-ai ecosystem. It is designed to house multiple applications and shared packages with a unified development workflow.

## Repository Structure

### Applications (`apps/`)

- **[web](./apps/web)**: Next.js 16 Webtoon reader application.
- _(Future projects like mobile-app, admin-dashboard, etc. will be added here)_

### Shared Packages (`packages/`)

- **ui**: Shared component library (shadcn/ui + Tailwind).
- **eslint-config**: Shared linting configurations.
- **typescript-config**: Shared TypeScript configurations.

## Global Tech Stack

- **Orchestration**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Bun](https://bun.sh/) (v1.2.2+)
- **Build System**: [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) (within Next.js)

## Getting Started

### Installation

```bash
# Install dependencies for the entire workspace
bun install
```

### Development

```bash
# Start all applications in development mode
bun dev

# Start a specific application (e.g., web)
bun dev --filter=web
```

### Build

```bash
# Build all projects
bun run build

# Build a specific project
bun build --filter=web
```

---

Copyright © 2026 [4hum-ai](https://github.com/4hum-ai)
