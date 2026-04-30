# E2E Challenge

This repo is a learning and comparison project for a data-first, Cloudflare-first, modern TypeScript web app.

The V1 app compares:

- Remix 3 as the experimental frontend.
- SvelteKit + Svelte 5 as the stable frontend.
- Payload for CMS-managed hello content.
- Postgres + Drizzle for app-owned stack data.
- Hono for shared APIs and auth routes.
- Better Auth for realistic authentication.
- Vite+ as the unified toolchain over pnpm workspaces.

## Current Status

Milestone 1 is complete: repo directories and planning specs exist.

Milestone 2 is complete: pnpm + Vite+ workspace foundation, shared Zod contracts and API error shape, Drizzle app schema placeholders, auth host boundary, shared config, Hono API stubs, and local tooling verification (`vp check`). See [Milestone 2](docs/milestone-2.md) for the checklist.

Milestone 3 is complete: local Postgres via Docker Compose, `.env.example`, Drizzle config, first migration, app-owned seed data, Payload bootstrap notes, DB scripts, migration/seed validation, and local tooling verification. See [Milestone 3](docs/milestone-3.md) for the checklist.

Next up is Milestone 4 in the project plan: build the Remix vertical slice.

## Tooling

The repo is pinned to `pnpm@10.33.2` through Corepack and uses Vite+ as the developer-facing toolchain.

Expected command surface:

- `vp install`
- `vp dev`
- `vp check`
- `vp test`
- `vp build`
- `vp run`

If `pnpm` is not available globally, use Corepack with a project-local cache before installing dependencies:

```sh
COREPACK_HOME=.corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm --version
```

The repo keeps pnpm's store in `.pnpm-store` through `.npmrc` so dependency artifacts stay local to the project.

## Docs

Start with:

- [Project plan](docs/plan.md)
- [Stack direction ADR](docs/decisions/0001-stack-direction.md)
- [Architecture](docs/architecture.md)
- [Data model](docs/data-model.md)
- [Routes and APIs](docs/routes-and-apis.md)
- [Local development](docs/local-dev.md)
- [Testing](docs/testing.md)
- [Deployment](docs/deployment.md)
