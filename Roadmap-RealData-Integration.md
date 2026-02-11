# Roadmap: Real Data Integration (GCS Bucket)

**Goal:** Transition `webtoon-hub-preview` from local mock data to real Google Cloud Storage assets.
**Asset Bucket:** `https://storage.googleapis.com/webtoon-hub/`
**Status:** ✅ Completed

---

## 📊 Integration Progress

| Phase                               | Status       | Started | Est. Duration |
| ----------------------------------- | ------------ | ------- | ------------- |
| Phase 1: Core Client & Typed Models | ✅ Completed | 19:35   | 20m           |
| Phase 2: Index & Series Mapping     | ✅ Completed | 20:00   | 30m           |
| Phase 3: Episode & Image Resolution | ✅ Completed | 20:30   | 45m           |
| Phase 4: SEO & Dynamic Metadata     | ✅ Completed | 21:15   | 30m           |
| Phase 5: Verification & Polish      | ✅ Completed | 21:45   | 20m           |

---

## Phase 1: Core Client & Typed Models

**Goal:** Align data structures with real GCS schema and point the client to the cloud.

- [x] **1.1** Update `types.ts` with real bucket schema (Episodes in `SeriesMeta`, `hash` usage).
- [x] **1.2** Point `AssetClient` to `https://storage.googleapis.com/webtoon-hub/`.
- [x] **1.3** Update `getImageUrl` logic to include `.webp` extension (Immutable Bucket rule).
- [x] **1.4** Clean up `smartFetch` (remove local filesystem fallback for real bucket).

---

## Phase 2: Index & Series Mapping

**Goal:** Ensure the home page and series pages load data correctly from the cloud.

- [x] **2.1** Verify `getSeriesIndex()` returns "The Adventures of Tintin" and "Spider-Man".
- [x] **2.2** Map `updatedAt` and `genres` from real JSON to `ComicCard` props.
- [x] **2.3** Update `CategorySection` to filter by real genres from the index.
- [x] **2.4** Ensure multi-locale support (fetching `meta.json` vs `{locale}/meta.json`).

---

## Phase 3: Episode & Image Resolution

**Goal:** Load episode lists and display panels using hashed WebP URLs.

- [x] **3.1** Update `EpisodeList` to fetch episode metadata from `{seriesId}/{episodeId}/meta.json`.
- [x] **3.2** Implement locale-first fallback: `{locale}/meta.json` -> defaults.
- [x] **3.3** Resolve Panel image URLs using the hashed pattern: `{seriesId}/{episodeId}/{locale}/panels/{hash}.webp`.
- [x] **3.4** Test "The Adventures of Tintin" Episode 1 panels visibility.

---

## Phase 4: SEO & Dynamic Metadata

**Goal:** Use real data for social sharing and search engine visibility.

- [x] **4.1** Update `app/comic/[slug]/layout.tsx` to use `AssetClient.getSeriesMeta`.
- [x] **4.2** Populate OpenGraph tags (Title, Description, Cover) from real cloud assets.
- [x] **4.3** Verify locale-specific metadata in `<head>` for VI and EN.

---

## Phase 5: Verification & Polish

**Goal:** Final checks for reliability and performance.

- [x] **5.1** Run `bun run build` and verify static generation (SSG) for comic pages.
- [x] **5.2** Check image load times and caching headers from GCS.
- [x] **5.3** Final UI/UX audit: Ensure smooth loading states for cloud assets.

---

## 🔧 Reference Commands

```bash
# Test bucket connectivity (if needed)
curl https://storage.googleapis.com/webtoon-hub/index.json

# Local Dev
bun run dev
```
