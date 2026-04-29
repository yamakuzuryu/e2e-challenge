# Deployment

## Deployment Principles

- Cloudflare is the primary platform target.
- Any non-Cloudflare dependency must be justified by an unmet need.
- Preview deploys should exist for each frontend app and `apps/api`; Payload previews are optional until its deployment target is validated.
- Secrets must be managed through deployment platform secrets, not committed files.

## Frontend Apps

Deploy:

- Remix app to Cloudflare Workers / Pages when Remix 3 adapter support is viable.
- SvelteKit app to Cloudflare Pages / Workers using the Cloudflare-compatible adapter path.

Both frontend apps should have preview deploys.

Remix 3 remains an experiment. If Cloudflare adapter/runtime support is not viable during implementation, the Remix milestone may temporarily validate locally or on a Node-compatible runtime, but the gap must be recorded and Cloudflare deployment remains the target before the experiment is considered successful.

## Shared APIs

Deploy `apps/api` Hono shared APIs to Cloudflare Workers.

Use Hono for:

- Health checks.
- Shared app APIs.
- Webhooks.
- Background endpoints.
- Cross-app APIs.
- Better Auth routes.

Deployed auth should use sibling domains under one parent domain, such as `remix.<base-domain>`, `svelte.<base-domain>`, and `api.<base-domain>`, so cookies, trusted origins, and CORS can be configured explicitly.

`apps/api` should have preview deployments so frontend previews can point at a matching preview API/auth host where practical.

## CMS

Payload is part of the main architecture, but deployment needs validation.

Preferred outcome:

- Deploy Payload in a Cloudflare-compatible runtime if feasible.

Fallback outcome:

- Run Payload as a separate Node-compatible service while keeping the frontend apps and shared APIs Cloudflare-first.

The final Payload deployment choice should be documented after scaffolding and runtime validation.

Payload preview deployments are optional in V1. If omitted, preview frontend/API environments may use a shared non-production Payload instance with seeded content.

## Database

Use managed Postgres. Cloudflare Workers connect through Hyperdrive where applicable.

Deployment must account for:

- `DATABASE_URL`
- Connection pooling.
- Drizzle app/auth migrations.
- Payload CMS migrations.
- Seed strategy for non-production environments.
- Backup/restore strategy from the managed Postgres provider.

## Cloudflare Services

Planned services:

- Workers / Pages for apps and APIs.
- R2 for object storage.
- Queues for async jobs.
- Cron Triggers for schedules.
- Workflows for durable workflow experiments.
- Hyperdrive for Postgres connectivity.
- WAF, rate limiting, Turnstile, and secrets for security.

## CI/CD

Use GitHub Actions for:

- Checks.
- Tests.
- Build validation.
- Preview deployment triggers.

Use Vite+ (`viteplus.dev`, `vite-plus`, `vp`) for package-manager orchestration, `dev`, `check`, `test`, `build`, and monorepo task running where supported.

## Observability

V1 should plan for:

- Structured logs.
- Request IDs.
- Error tracking.
- Basic health checks.
- Deployment and runtime diagnostics.

Exact observability vendors can be chosen later, but the code should preserve request IDs and safe error boundaries from the start.
