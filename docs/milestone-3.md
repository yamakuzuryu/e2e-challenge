# Milestone 3: Local Dev Services, Migrations, And Seed Strategy

## Goal

Make the local development substrate concrete before app scaffolding: Postgres, environment variables, Drizzle migration config, app-owned seed data, and Payload bootstrap boundaries.

## Checklist

- [x] Confirm Docker and Docker Compose are available.
- [x] Add local Postgres service with Docker Compose.
- [x] Add `.env.example`.
- [x] Add Drizzle Kit config.
- [x] Add migration output directory placeholder.
- [x] Add Drizzle seed script for app-owned data.
- [x] Add Payload bootstrap plan for CMS hello content.
- [x] Add root scripts for local Postgres and DB workflow.
- [x] Verify Docker Compose config.
- [x] Verify Drizzle can generate the first migration.
- [x] Verify Drizzle can apply migrations to local Postgres.
- [x] Verify Drizzle seed inserts app-owned local data.
- [x] Verify Vite+ check passes after local-dev files.

## Local Dev Commands

Use project-local Corepack/pnpm:

```sh
COREPACK_HOME=.corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm run local:postgres:up
COREPACK_HOME=.corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm run db:generate
COREPACK_HOME=.corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm run db:migrate
COREPACK_HOME=.corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm run db:seed
```

## Boundaries

- Drizzle owns app/auth tables and seeds app-owned stack choices.
- Payload owns CMS hello content bootstrap.
- One physical Postgres database is used locally.
- Local Postgres publishes container port `5432` on host port `55432`.
- Drizzle uses the `app` Postgres schema.
- Payload must use its own schema or a documented table prefix when scaffolded.

## Validation Results

- Docker Compose config resolves with Postgres on host port `55432`.
- Local Postgres container reached healthy status.
- Drizzle generated `packages/db/drizzle/0000_talented_skullbuster.sql`.
- Drizzle migration applied successfully to local Postgres.
- Drizzle seed inserted:
  - 7 stack choice rows.
  - 1 tenant row.
  - 3 role rows.
  - 1 feature flag row.
- `vp check` passes.
