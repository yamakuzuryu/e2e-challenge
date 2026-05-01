# Local Development

## Goals

- Keep local development realistic.
- Make all required services runnable locally.
- Prefer one command for the normal developer loop once scaffolding exists.
- Keep environment variables documented and shared across apps.

## Planned Local Services

- Postgres for app and CMS data.
- Payload CMS.
- Remix app.
- SvelteKit app.
- Hono shared API in `apps/api`.

Optional local simulations:

- Queue worker.
- Cron trigger.
- Workflow runner.

## Ports

Recommended defaults:

- Remix app: `http://remix.lvh.me:3000`
- SvelteKit app: `http://svelte.lvh.me:3001`
- Payload CMS: `http://cms.lvh.me:3002`
- Hono API/Auth host: `http://api.lvh.me:3003`
- Postgres: host port `55432`, container port `5432`

Use `lvh.me` so local services share a parent domain while resolving to loopback. Postgres uses host port `55432` to avoid conflicts with any machine-level Postgres on `5432`. Ports may change if tooling requires it, but changes must be documented.

## Environment Variables

Use a shared env pattern with app-specific overrides.

Expected variables:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `AUTH_BASE_DOMAIN`
- `AUTH_COOKIE_DOMAIN`
- `ALLOWED_ORIGINS`
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- OAuth provider client IDs/secrets as needed.

Secrets must not be committed.

## Database Workflow

Use Drizzle for:

- App/auth-owned schema.
- App/auth-owned migrations.
- Local migration apply command.
- Seed script.

Use Payload migrations for Payload-owned CMS tables. Migration order is Drizzle first, Payload second, bootstrap/seed third.

Bootstrap and seed data must include:

- Drizzle seed: test user if not created through Better Auth setup, optional test tenant and membership, app-owned Postgres stack choices table rows, and initial feature flags if needed.
- Payload bootstrap/seed: hello content for Remix and Svelte.

## Startup Target

The eventual one-command startup should:

1. Start Postgres.
2. Apply or validate Drizzle migrations.
3. Apply or validate Payload migrations.
4. Seed required data if missing.
5. Start Payload.
6. Start Hono API/Auth.
7. Start Remix.
8. Start SvelteKit.

Vite+ (`vp run`) owns local orchestration for workspace tasks.

## Toolchain And Package Manager

Vite+ owns the developer-facing toolchain:

- `vp install`, `vp add`, and related commands for package-manager orchestration.
- `vp dev` for Vite-compatible dev servers where applicable.
- `vp check` for formatting, linting, and type checks.
- `vp test` for unit tests.
- `vp build` for bundling/builds where applicable.
- `vp run` for monorepo task execution and orchestration.

Use pnpm workspaces as the underlying workspace package manager for Vite+. The future root `package.json` should set an explicit `packageManager` field for pnpm, and the repo should include `pnpm-workspace.yaml`. If pnpm is not available locally, enable it through Corepack or install it before running Vite+ package-manager commands. Switch the underlying package manager only if pnpm creates friction with Vite+ or selected framework tooling.

Vite+ means the tool documented at `viteplus.dev`, with a local `vite-plus` package and the `vp` CLI. It should not be read as shorthand for plain Vite plus other tools.
