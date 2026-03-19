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
pnpm install
```

## Environment

This project uses Vite mode-based environment files:

- `.env.development`
- `.env.production`

All env files are centralized at project root.

Required variables:

- `VITE_APP_ENV` (`development` | `production`)
- `VITE_API_BASE_URL` (valid API base URL)
- `DATABASE_URL` (SQLite connection string, format `file:./dev.db`)

Mode behavior:

- `pnpm run dev` loads development env
- `pnpm run build` loads production env
- Production Electron window disables DevTools

### First-run Database Init

On app startup, Electron main process runs Drizzle migrations automatically.
In development, migrations are read from project `drizzle/`.
In packaged app, migrations are loaded from `resources/drizzle`.

## Drizzle + SQLite (Electron-first)

This project uses Drizzle ORM with `better-sqlite3`, following Electron best practices:

- DB layer stays in `src/main/db` (renderer never opens DB directly)
- Runtime DB path defaults to `app.getPath('userData')/app.db` in production
- `drizzle.config.ts` defines schema and migration output
- `electron-builder` copies `drizzle/` into app resources for runtime migration

Useful commands:

```bash
pnpm run db:generate
pnpm run db:migrate
pnpm run db:studio
```

## Development

```bash
pnpm run dev
```

### Linux Runtime Notes

If you see logs like `IBUS-WARNING` or `GetVSyncParametersIfAvailable() failed`, use one of these scripts:

```bash
# Default Linux-safe mode
pnpm run dev:linux:safe

# Software rendering fallback for unstable GPU drivers
pnpm run dev:linux:software

# Disable ibus integration warning path (input method fallback)
pnpm run dev:linux:no-ibus
```

## Quality Gate

```bash
pnpm run lint
pnpm run typecheck
```

## Build

```bash
pnpm run build
```

## Build On GitHub Actions

For full CI/CD guide (workflow triggers, secrets, `.env` upload commands, and release flow), see:

- `docs/github-actions-guide.md`

## Documentation

- Team rules: `docs/coding-guidelines.md`
- Project structure: `docs/project-structure.md`

## Core Rules Summary

- File/folder names must be `kebab-case`.
- Do not use `any`.
- Use React Query + Axios for remote data.
- Use React Hook Form + Zod for all forms.
- Use shadcn/ui primitives for reusable UI.
