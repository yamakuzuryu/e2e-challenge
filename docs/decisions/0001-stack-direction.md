# ADR 0001: Stack Direction

## Status

Accepted for V1.

## Context

The project is a learning and comparison app. It needs to explore a modern frontend direction without React as the customer-facing app framework, while keeping the overall system realistic enough to expose real tradeoffs in auth, CMS, APIs, testing, local dev, and deployment.

## Decision

Use a Cloudflare-first, TypeScript-first monorepo with:

- Remix 3 as the experimental frontend comparison app.
- SvelteKit + Svelte 5 as the stable frontend comparison app.
- Payload as the shared CMS for hello content only.
- App-owned Postgres/Drizzle data for the E2E stack table.
- `apps/api` as the Hono app for shared APIs, Better Auth routes, webhooks, background endpoints, and cross-app APIs.
- Native Remix/SvelteKit server routes for app-local loaders/actions.
- Postgres as the primary database.
- Drizzle for schema, migrations, and DB access.
- Better Auth for authentication.
- Vite+ (`viteplus.dev`, local `vite-plus` package, global `vp` CLI) as the repo toolchain owner for linting, formatting, test running, bundling/builds, package-manager orchestration, and monorepo task running.
- TypeScript 7 beta / `tsgo` as an experiment.
- TypeScript 6 stable as the compiler fallback.
- Cloudflare Workers / Pages as the primary app platform.
- Cloudflare R2, Queues, Cron Triggers, Workflows, and Hyperdrive where relevant.

## Rationale

- Remix 3 tests a forward-looking full-stack framework direction.
- SvelteKit + Svelte 5 provides a stable modern comparison point.
- Hono and Cloudflare Workers keep the backend close to Web Platform APIs.
- Postgres + Drizzle gives a data-first relational foundation with strong TypeScript ergonomics.
- Payload provides real CMS behavior and admin workflows, even though its admin UI is React-based.
- Better Auth gives realistic auth without making the project depend on a broader backend platform.
- Vite+ and TypeScript 7 beta make the toolchain part of the learning surface.

## Consequences

- Payload deployment is the main Cloudflare-fit item to validate.
- Remix 3 and TypeScript 7 beta may introduce churn, so fallbacks must stay explicit.
- Cloudflare Queues and Workflows provide eventing and durable workflow capabilities, but should not be treated as a full EventBridge/Kafka-style event bus.
- A shared auth host is required for local and deployed environments so the two frontend apps do not invent separate auth flows.
- Postgres is one physical database in V1, with explicit ownership boundaries between Drizzle/app tables and Payload-managed tables.
- Keeping stack data out of Payload intentionally tests the app-owned relational data path alongside the CMS path.
- Multi-tenancy is modeled in V1, but complex multi-tenant behavior is deferred.
