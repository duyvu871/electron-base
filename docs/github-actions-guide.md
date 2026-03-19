# GitHub Actions Guide

## Workflow

- Workflow file: `.github/workflows/release-build.yml`
- Workflow name: `Build Electron Base Project`

## Trigger Modes

- Manual trigger from GitHub Actions UI (`workflow_dispatch`)
- Tag trigger by pushing `v*` tag (example: `v1.0.0`)

## Required Secret

- `GITHUB_TOKEN` (provided automatically by GitHub Actions runtime)

## Optional App Env Secrets

These map to keys in `.env.example`:

- `DATABASE_URL` (default in workflow: `file:./dev.db`, used by Drizzle migration/runtime)
- `VITE_API_BASE_URL` (default in workflow: `https://api.example.com`)

## Optional Signing Secrets

- `CSC_LINK`
- `CSC_KEY_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

If signing secrets are not set, the workflow still builds unsigned artifacts.

## Setup Secrets From .env Using CLI

Prerequisites:

- Install GitHub CLI: https://cli.github.com/
- Login: `gh auth login`
- Run commands at repo root

Upload app env secrets from `.env`:

```bash
for key in DATABASE_URL VITE_API_BASE_URL; do
  value=$(grep -E "^${key}=" .env | head -n 1 | cut -d '=' -f2-)
  value="${value%\"}"
  value="${value#\"}"
  gh secret set "$key" --body "$value"
done
```

Upload signing secrets manually (example):

```bash
gh secret set CSC_LINK --body "<base64-or-file-url>"
gh secret set CSC_KEY_PASSWORD --body "<password>"
gh secret set APPLE_ID --body "<apple-id-email>"
gh secret set APPLE_APP_SPECIFIC_PASSWORD --body "<app-specific-password>"
gh secret set APPLE_TEAM_ID --body "<team-id>"
```

Verify configured secrets:

```bash
gh secret list
```

## Manual Release Flow

1. Open GitHub Actions and run `Build Electron Base Project`
2. Fill inputs:
   - `release_tag` (example: `v1.0.0`)
   - `release_name` (example: `Electron Base Project v1.0.0`)
   - `prerelease` (`true` or `false`)
3. Wait for build matrix (Windows/macOS/Linux) to complete
4. Workflow creates GitHub Release page and attaches installers (`.exe`, `.dmg`, `.AppImage`, `.deb`)

## Tag-based Release Flow

1. Create tag:

```bash
git tag v1.0.0
```

2. Push tag:

```bash
git push origin v1.0.0
```

3. Workflow runs automatically and publishes release with attached installers
