# Webtoon Hub Preview

A modern webtoon reader application built with React, Vite, and TypeScript.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: TanStack Query
- **Database**: Supabase
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.4 or later)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Run tests
bun test
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
```

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations (Supabase)
├── lib/            # Utility functions
├── pages/          # Page components
└── data/           # Static data/constants
```

## License

MIT
