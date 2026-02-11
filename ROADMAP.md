# Webtoon Hub Preview - Roadmap

> **AI Agent Guide**: This file tracks the project's current status and next steps.

## 📍 Current Status

**Phase**: 🚀 Phase 3: Testing & Publishing (In Progress)  
**Last Updated**: 2026-02-11

---

## ✅ Completed

### Phase 1: Monorepo Setup

- [x] initialize_monorepo <!-- id: 0 -->
  - [x] Create `apps` and `packages` directories
  - [x] Move existing React app to `apps/web`
  - [x] Initialize root `package.json` for workspace
  - [x] Create `turbo.json` configuration
- [x] configure_packages <!-- id: 1 -->
  - [x] Create `packages/ui` (optional, for future use)
  - [x] Create `packages/eslint-config`
  - [x] Create `packages/typescript-config`
- [x] setup_ci_cd <!-- id: 2 -->
  - [x] Create `.github/workflows/qc.yml`
  - [x] Create `.github/workflows/deploy.yml`
- [x] setup_precommit <!-- id: 3 -->
  - [x] Install `husky` and `lint-staged`
  - [x] Configure pre-commit hooks
- [x] verify_migration <!-- id: 4 -->
  - [x] Run `pnpm install`
  - [x] Run `turbo build`
  - [x] Verify `apps/web` runs correctly

### Phase 2: SEO Integration

- [x] install_seo_dependencies <!-- id: 5 -->
  - [x] Install `react-helmet-async` in `apps/web`
  - [x] Install `vite-plugin-sitemap` in `apps/web`
- [x] setup_metadata_management <!-- id: 6 -->
  - [x] Configure `HelmetProvider` in root component
  - [x] Create `GenericSeo` component
  - [x] Implement `JsonLd` component for Structured Data
- [x] technical_seo <!-- id: 7 -->
  - [x] Create `robots.txt` in public folder
  - [x] Configure `vite.config.ts` for sitemap generation
- [x] verify_seo <!-- id: 8 -->
  - [x] Verify meta tags in browser
  - [x] Verify `sitemap.xml` and `robots.txt` in build output
- [x] bonus_skills_application <!-- id: 9 -->
  - [x] Manual Audit: Fix UI/UX issues (images without alt, forms)
  - [x] Refactor `EpisodeViewer.tsx` into smaller components
  - [x] Review `react-patterns` compliance

---

## ✅ Completed (Continued)

### Phase 2: Release Workflow (Changesets)

- [x] setup_release_workflow <!-- id: 10 -->
  - [x] Install `@changesets/cli` in root
  - [x] Initialize Changesets configuration
  - [x] Configure `.changeset/config.json`
  - [x] Add `changeset`, `version`, `release` scripts to root `package.json`
  - [x] Create `.github/workflows/release.yml`

---

## 📋 Planned

### Phase 3: Testing & Publishing

- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Optimize bundle size
- [ ] Publish to npm

---

## 🎯 Next Steps

1. **Add Unit Tests** - Setup Vitest for testing React components.
2. **Prepare First Release** - Run `bun changeset` to create first changeset.

---

## 🔧 Technical Stack

| Tool            | Choice             |
| --------------- | ------------------ |
| Package Manager | bun                |
| Monorepo        | Turborepo          |
| Bundler         | Vite               |
| Framework       | React 18           |
| SEO             | react-helmet-async |
| Release         | Changesets         |
