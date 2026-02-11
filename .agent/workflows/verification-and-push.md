---
description: Run CI/CD verification, commit changes, and update project tracking
---

# Verification, Commit & Push Workflow

This workflow ensures code quality through CI/CD checks before committing changes and updating project documentation.

## Step 1: CI/CD Verification

Run stringent checks to ensure code quality and build stability.

// turbo

```bash
# From project root
bun run lint
```

// turbo

```bash
bun run build
```

> **🔴 STOP IF FAILED:** If any of the above commands fail, fix the errors before proceeding. Do NOT commit broken code.

---

## Step 2: Commit & Push

Once verification passes, commit the changes using conventional commits.

```bash
git add .
git commit -m "feat(web-next): migrate to Next.js App Router"
# Or use a more specific message if applicable, e.g., "fix: resolve build errors"
git push
```

---

## Step 3: Update Roadmap

Update the active roadmap file (e.g., `Roadmap-{date}.md`) to reflect progress.

1.  **Mark Completed Tasks:** Change status from `[ ]` or `⏳` to `[x]` or `✅`.
2.  **Add Timestamps:** Record completion time for each task/phase.
3.  **Calculate Duration:** Update total duration if a phase is completed.
4.  **Update Status:** Change project status to `✅ Done` if all tasks are complete, or keep `🚧 In Progress`.

---

## Agentic Mode Rules (Mandatory)

1.  **Time Tracking:** Log start/end time for each major task in the roadmap or session log.
2.  **Incremental Commits:** Prefer small, frequent commits after each successful step over one large commit.
3.  **CI First:** ALWAYS run `build` and `lint` before committing.
4.  **Self-Document:** Update the roadmap _as you progress_, not just at the end.
5.  **Fail Fast:** If the build fails, stop immediately. Fix the issue. Do not bypass the check.
