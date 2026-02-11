This document defines the **bucket structure, metadata model, and conventions** for storing and serving webtoon content.

## **Principles**

1. Immutability
   - Published assets are immutable, named as {hash}.webp
   - Updates must publish new metadata.
2. **Locale-first images**
   - Images are stored per locale.
   - Each locale is fully self-contained.
3. **Single master image per panel**
   - Only one high-quality image is stored per panel.
   - All resizing is handled by the CDN

---

## **Folder Structure**

```
{bucket}/
	**index.json**
  {seriesId}/
    **meta.json**
    cover/
	    {hash}.webp
    {episodeId}/
      **meta.json**
      {locale}/
        **meta.json**
 	      originals/         # Source images, creator format
		      {number}.png
        panels/            # Canonical delivery images, resized dynamically by CDN
	        {hash}.webp
		    thumbs/            # Fast-loading preview images
			    {hash}.webp
```

## File schema

### **./index.json**

Lists all available series and acts as the entry point for discovery, browsing, and pagination.

This file is **not localized**. Localized titles should be resolved from `/{seriesId}/meta.json` and locale-specific metadata.

```json
{
  "updatedAt": "2026-02-08T00:00:00Z",
  "series": [
    {
      "id": "dragon-sword",
      "status": "ongoing",
      "genres": ["Action", "Fantasy"],
      "locales": ["vi", "en"],
      "cover": "3b7d...9f2a"
    },
    {
      "id": "moon-hunter",
      "status": "completed",
      "genres": ["Action"],
      "locales": ["th", "jp"],
      "cover": "3b7d...9f2a"
    }
  ]
}
```

### **./{seriesId}/meta.json**

```bash
{
  "seriesId": "dragon-sword",
  "status": "ongoing",
  "genres": ["Action", "Fantasy"],
  "locales" : ["vi", "en"],
  "cover" : "3b7d...9f2a",
  "thumbnails": [
	  { "index" : 1, "hash" : "3b7d...9f2a" }
	 ],
	 "publishAt": "2026-02-01T10:00:00Z"
}
```

### **./{seriesId}/{episodeId}/meta.json**

```json
{
  "episodeId": "ep-045",
  "episodeNumber": 45,
  "publishAt": "2026-02-01T10:00:00Z",
  "access": {
    "type": "free"
  }
}
```

**Access Types**

- `free` – always accessible
- `paid` – requires purchase
- `subscription` – requires active subscription
- `time-locked` – becomes free after a time window

### **./{seriesId}/{episodeId}/{locale}/meta.json**

```json
{
  "locale": "vi",
  "title": "Thanh Gươm Rồng",
  "synopsis": "Trận chiến quyết định giữa Ryu và Hắc Long."
  "panels": [
	  { "index" : 1, "hash" : "3b7d...9f2a" }
	 ]
}

```

## **Access / Caching Policy**

- Metadata and thumbnails are always accessible.
- Panel assets must be acquired by signed URLs.

| Path                      | Cache Policy | Access Policy         |
| ------------------------- | ------------ | --------------------- |
| **/panels/**              | Long TTL     | Private / signed URLs |
| **/thumbs/**, **/cover/** | Long TTL     | Public                |
| index.json, meta.json     | Short TTL    | Public                |
| assets/originals/\*\*     | No           | Private / signed URLs |
