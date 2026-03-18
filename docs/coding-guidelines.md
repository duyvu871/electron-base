# Coding Guidelines

## 1) Naming Convention

- All files must use `kebab-case`.
- Component files: `project-card.tsx`, `user-profile-form.tsx`.
- Hooks: `use-auth.ts`, `use-project-query.ts`.
- Services: `auth-service.ts`, `http-client.ts`.
- Constants/types: `app-config.ts`, `api-types.ts`.
- Folder names must use `kebab-case`.

## 2) Architecture Rules

- Renderer and main process must stay separated.
- Renderer cannot directly use Node APIs; access must go through preload bridge.
- Shared contracts must be defined under `src/shared`.
- IPC channel names must be namespaced: `app:*`, `auth:*`, `project:*`.

## 3) TypeScript Rules (Strict)

- `strict`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` are mandatory.
- `any` is forbidden. Prefer `unknown` + runtime narrowing.
- Export explicit types for service responses and form payloads.
- No disabled TypeScript checks in production code.

## 4) Data Fetching Rules (React Query + Axios)

- All HTTP requests must use `src/renderer/src/services/http-client.ts`.
- No direct `fetch` in components.
- Query keys must be centralized by feature and consistently named.
- Mutations must invalidate related queries in `onSuccess`.
- Query functions must return typed data and handle errors.

## 5) Form Rules (React Hook Form + Zod)

- Every form must use `react-hook-form`.
- Every form must have a Zod schema.
- Validation messages must come from the schema.
- Form submit handlers must use typed payload inferred from schema (`z.infer`).

## 6) UI Rules (Shadcn)

- Use shadcn components as the default UI layer.
- Shared primitives belong in `src/renderer/src/components/ui`.
- Reusable feature components must not duplicate primitive styles.
- Use `cn` helper from `src/renderer/src/lib/utils.ts` for class merging.

## 7) Import Rules

- Use absolute aliases (`@/`, `@renderer/`, `@shared/`) instead of deep relative paths when possible.
- Keep imports grouped and alphabetized by lint rules.
- Default exports are forbidden. Use named exports.

## 8) Testing and Quality Gate

- Minimum quality gate before merge:
  - `npm run lint`
  - `npm run typecheck`
- PRs that fail lint/typecheck are not eligible for merge.

## 9) Team Workflow Rules

- Keep PRs focused by feature/scope.
- Do not mix refactor + feature + style-only changes in one PR.
- Every new feature must include:
  - query/service layer
  - UI component(s)
  - schema/form validation if user input exists
  - typed contracts

## 10) Security Rules

- Never expose secrets in renderer.
- Never place private tokens in source code.
- External URLs must be opened via main/preload validated channels.
