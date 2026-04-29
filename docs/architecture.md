# Architecture

## System Overview

The system is a monorepo with four applications and shared packages:

- `apps/remix-app`: experimental frontend app built with Remix 3.
- `apps/svelte-app`: stable frontend app built with SvelteKit + Svelte 5.
- `apps/cms`: Payload CMS app.
- `apps/api`: Hono app for shared APIs, auth routes, webhooks, and background endpoints.
- `packages/core`: shared domain types, constants, and app contracts.
- `packages/db`: Drizzle schema, migrations, seeds, and database helpers.
- `packages/auth`: Better Auth integration and shared auth helpers.
- `packages/config`: shared TypeScript, Vite+ (`vp`), lint, format, test, build, package-manager, and environment config.
- `infra`: Cloudflare and infrastructure configuration.
- `docs`: planning and implementation specs.

## Runtime Responsibilities

### Frontend Apps

Both frontend apps:

- Require login for app routes.
- Render CMS-managed hello content.
- Render the app-owned Postgres-backed stack choices table.
- Implement the same UX contract.
- Include the same modern CSS and Three.js learning features.

### Payload CMS

Payload is the source of truth for editable content:

- Hello content variants for Remix and Svelte.
- CMS authoring and admin workflows.

Payload is part of the main architecture even though the admin UI is React-based.

### Hono API

Hono lives in `apps/api` and owns shared backend surfaces:

- Better Auth routes and session APIs.
- Shared API endpoints used by both apps.
- Webhooks.
- Background endpoints.
- Cross-app APIs.

App-local loaders/actions remain in Remix and SvelteKit where they fit naturally.

### Auth Topology

V1 uses one shared auth/API host instead of duplicating auth flows in each frontend app:

- Local hostnames use the `lvh.me` loopback domain: `remix.lvh.me:3000`, `svelte.lvh.me:3001`, `cms.lvh.me:3002`, and `api.lvh.me:3003`.
- Better Auth routes are served from `apps/api` under the API host.
- Session cookies are scoped to the shared parent domain in environments that support it.
- Local cookies use development-safe settings; deployed cookies use `Secure`, `HttpOnly`, and the production parent domain.
- Frontend apps share the same auth contract and redirect/post to the shared API/auth host.

### Data Layer

Postgres stores application and CMS data in one physical V1 database with explicit ownership boundaries.

Drizzle owns:

- Database schema where app-owned tables are needed.
- Stack choice data for the E2E stack table.
- Better Auth tables when the Better Auth Drizzle adapter is used.
- Migrations.
- Seed data.
- Type-safe DB access.

Payload owns its CMS tables, collections, and Payload migration flow. Drizzle must not modify Payload-owned tables. If Payload cannot use a separate Postgres schema cleanly, Payload tables should use a clear prefix and the ownership boundary must be documented in `packages/db`.

Migration order:

1. Apply Drizzle migrations for app/auth-owned tables.
2. Apply Payload migrations for CMS-owned tables.
3. Run seed data after both migration systems are current.

Cloudflare Hyperdrive is planned for Workers-to-Postgres connectivity.

### Auth

Better Auth owns authentication:

- Email/password.
- OAuth.
- Session cookies.
- Logout.
- Protected routes.
- Basic user profile.

Tenant, membership, and role models are included for design realism, but complex tenant behavior is not central to V1.

### Cloudflare Platform

Cloudflare is the hard deployment target unless a required need cannot reasonably be met:

- Workers / Pages for apps and APIs.
- R2 for object storage.
- Queues for async jobs.
- Cron Triggers for schedules.
- Workflows for durable workflow experiments.
- Hyperdrive for Postgres connectivity.
- WAF, rate limiting, Turnstile, and secrets for edge/app protection.

Payload deployment must be validated separately because it may require a Node-compatible runtime or container-style hosting.

## Data Flow

1. User opens either frontend app.
2. App checks Better Auth session through the shared API/auth host.
3. Unauthenticated users are redirected to login.
4. Authenticated users reach the protected content routes.
5. App fetches normalized CMS-managed hello content through `apps/api`.
6. App fetches stack choices from app-owned Postgres data through `apps/api`.
7. App renders the static text fallback and progressive Three.js/CSS enhancements.
8. Shared API needs flow through Hono endpoints.
9. App-owned persistence flows through Drizzle/Postgres.
