import fs from "node:fs";
import path from "node:path";

const BUCKET_ROOT = path.join(process.cwd(), "public", "mock-bucket");
const ASSETS_DIR = path.join(process.cwd(), "src", "assets");
const PLACEHOLDER_COVER = path.join(ASSETS_DIR, "comic-1.jpg");
const PLACEHOLDER_PANEL = path.join(ASSETS_DIR, "panel-1.jpg");

// Clean up existing directory
if (fs.existsSync(BUCKET_ROOT)) {
  fs.rmSync(BUCKET_ROOT, { recursive: true, force: true });
}
fs.mkdirSync(BUCKET_ROOT, { recursive: true });

// Ensure placeholders exist
if (!fs.existsSync(PLACEHOLDER_COVER) || !fs.existsSync(PLACEHOLDER_PANEL)) {
  console.warn(
    "Warning: Placeholder images not found in src/assets. Using dummy files.",
  );
}

// --- Helper Functions ---
function writeJson(filePath: string, data: any) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Created JSON: ${filePath}`);
}

function copyImage(srcPath: string, destPath: string) {
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied Image: ${destPath}`);
  } else {
    // Fallback if source missing
    fs.writeFileSync(destPath, "Mock Image Content");
    console.log(`Created Mock Image: ${destPath}`);
  }
}

// --- Data ---

const seriesList = [
  {
    id: "dragon-sword",
    status: "ongoing",
    genres: ["Action", "Fantasy"],
    locales: ["vi", "en"],
    cover: "cover-hash-1.jpg",
    publishAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "moon-hunter",
    status: "completed",
    genres: ["Action"],
    locales: ["vi"],
    cover: "cover-hash-2.jpg",
    publishAt: "2025-11-15T00:00:00Z",
  },
];

// 1. Create index.json
const indexData = {
  updatedAt: new Date().toISOString(),
  series: seriesList.map((s) => ({
    id: s.id,
    status: s.status,
    genres: s.genres,
    locales: s.locales,
    cover: s.cover,
  })),
};
writeJson(path.join(BUCKET_ROOT, "index.json"), indexData);

// 2. Create Series & Episode Meta
seriesList.forEach((series) => {
  const seriesDir = path.join(BUCKET_ROOT, series.id);

  // Ensure we copy the cover image to the expected location
  const coverDir = path.join(seriesDir, "cover");
  copyImage(PLACEHOLDER_COVER, path.join(coverDir, series.cover));

  // Series Meta
  const seriesMeta = {
    seriesId: series.id,
    status: series.status,
    genres: series.genres,
    locales: series.locales,
    cover: series.cover,
    thumbnails: [{ index: 1, hash: "thumb-hash-1.jpg" }],
    publishAt: series.publishAt,
  };
  writeJson(path.join(seriesDir, "meta.json"), seriesMeta);

  // Generate 5 Mock Episodes
  for (let i = 1; i <= 5; i++) {
    const episodeId = `ep-${String(i).padStart(3, "0")}`;
    const episodeDir = path.join(seriesDir, episodeId);

    // Episode Meta
    const episodeMeta = {
      episodeId: episodeId,
      episodeNumber: i,
      publishAt: series.publishAt,
      access: {
        type: i <= 2 ? "free" : "time-locked", // First 2 free
      },
    };
    writeJson(path.join(episodeDir, "meta.json"), episodeMeta);

    // Locale Meta (for each supported locale)
    series.locales.forEach((locale) => {
      const localeDir = path.join(episodeDir, locale);

      const localeMeta = {
        locale: locale,
        title: `${series.id} - Tập ${i} (${locale})`,
        synopsis: `Tóm tắt nội dung tập ${i} bằng tiếng ${locale}...`,
        panels: Array.from({ length: 5 }, (_, idx) => ({
          index: idx + 1,
          hash: `panel-${series.id}-${episodeId}-${locale}-${idx + 1}.jpg`,
        })),
      };
      writeJson(path.join(localeDir, "meta.json"), localeMeta);

      // Create Panel Images
      const panelsDir = path.join(localeDir, "panels");
      localeMeta.panels.forEach((panel) => {
        copyImage(PLACEHOLDER_PANEL, path.join(panelsDir, panel.hash));
      });

      // Create Thumbnail Images
      const thumbsDir = path.join(localeDir, "thumbs");
      // For simplicity using cover placeholder for thumbs too
      copyImage(PLACEHOLDER_COVER, path.join(thumbsDir, "thumb-hash-1.jpg")); // Generic thumb
    });
  }
});

console.log("--- Mock Bucket Generated Successfully ---");
