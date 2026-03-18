# Electron Base Project

A clean Electron + React + TypeScript base project with strict engineering rules.

## Tech Stack

- Electron
- React
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui
- Axios
- React Query
- React Hook Form
- Zod

## Setup

```bash
npm install
```

## Environment

This project uses Vite mode-based environment files:

- `.env.development`
- `.env.production`

All env files are centralized at project root.

Required variables:

- `VITE_APP_ENV` (`development` | `production`)
- `VITE_API_BASE_URL` (valid API base URL)

Mode behavior:

- `npm run dev` loads development env
- `npm run build` loads production env
- Production Electron window disables DevTools

### First-run Database Init

On first app launch, Electron main process checks whether table `AppSetting` exists.
If missing, it initializes the required table/index automatically.

## Prisma (No Rust Engine)

This project uses Prisma with JavaScript engine mode for lighter Electron packaging:

- `engineType = "client"` in `prisma/schema.prisma`
- SQLite adapter: `@prisma/adapter-better-sqlite3`
- No Prisma Rust query engine binaries in app bundle

Useful commands:

```bash
npm run prisma:generate
npm run prisma:db:push
```

## Development

```bash
npm run dev
```

### Linux Runtime Notes

If you see logs like `IBUS-WARNING` or `GetVSyncParametersIfAvailable() failed`, use one of these scripts:

```bash
# Default Linux-safe mode
npm run dev:linux:safe

# Software rendering fallback for unstable GPU drivers
npm run dev:linux:software

# Disable ibus integration warning path (input method fallback)
npm run dev:linux:no-ibus
```

## Quality Gate

```bash
npm run lint
npm run typecheck
```

## Build

```bash
npm run build
```

## Build On GitHub Actions

Workflow file: `.github/workflows/release-build.yml`

Trigger modes:

- Manual: run `Build Electron Base Project` from GitHub Actions UI
- Tag push: push `v*` tag (example: `v1.0.0`) to auto build and publish release

### Required Secrets

- `GITHUB_TOKEN` (provided by GitHub automatically)

### Optional Signing Secrets

- `CSC_LINK`
- `CSC_KEY_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

If signing secrets are not provided, workflow still builds unsigned artifacts.

### Release Flow

1. Trigger by either:
   - running workflow manually from GitHub Actions, or
   - pushing a `v*` tag
2. If running manually, fill inputs:
   - `release_tag` (example: `v1.0.0`)
   - `release_name` (example: `Electron Base Project v1.0.0`)
   - `prerelease` (`true` or `false`)
3. GitHub Actions builds Windows/macOS/Linux installers
4. Workflow creates GitHub Release page and attaches all generated files

## Documentation

- Team rules: `docs/coding-guidelines.md`
- Project structure: `docs/project-structure.md`

## Core Rules Summary

- File/folder names must be `kebab-case`.
- Do not use `any`.
- Use React Query + Axios for remote data.
- Use React Hook Form + Zod for all forms.
- Use shadcn/ui primitives for reusable UI.
