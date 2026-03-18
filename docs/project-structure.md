# Project Structure

## Directory Layout

- `src/main`: Electron main process only.
- `src/preload`: Secure bridge between main and renderer.
- `src/renderer/src`: React application.
- `src/renderer/src/components/ui`: shadcn primitives.
- `src/renderer/src/features`: Feature-based modules.
- `src/renderer/src/services`: API clients and adapters.
- `src/renderer/src/providers`: Global providers (React Query, theme).
- `src/shared`: Shared types/contracts between main and renderer.

## Mandatory Practices

- Keep business logic in feature/service layers, not in UI primitives.
- Keep IPC contracts typed and versioned by shared types.
- Keep files and folders in `kebab-case`.
