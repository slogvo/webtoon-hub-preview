# Webtoon Hub (Web)

A high-performance, modern Webtoon reader application optimized for speed and scalability.

## Key Features

- **Next.js 16 App Router**: Leverages Server Components for zero-bundle-size data fetching.
- **Asset Bucket Architecture**: Scalable content delivery using JSON metadata and CDN-ready assets.
- **Dynamic Multi-Locale**: Built-in support for multiple languages.
- **Premium Content Ready**: Prepared for time-locked and premium access handling.

## App Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching**: React Server Components
- **Backend**: [Supabase](https://supabase.com/)

## Environment Variables

Create a `.env` file in this directory:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
NEXT_PUBLIC_BUCKET_URL="/mock-bucket"
```

## Development

```bash
# From workspace root
bun dev --filter=web

# Or from this directory
bun dev
```
