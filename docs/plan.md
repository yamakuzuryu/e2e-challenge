# V1 Project Plan

## Product Concept

This project is a small content app used to compare two modern frontend paths against the same auth, API, CMS hello content, app-owned stack data, deployment, and testing constraints.

Authenticated users log in, then see:

- A CMS-managed hello message.
- A Three.js decorative animation around the hello message.
- An E2E stack choices table backed directly by app-owned Postgres data.

The two frontend apps implement the same UX and data flow:

- Remix app content: `Hello Remix World!`
- SvelteKit app content: `Hello Svelte World!`

The only intended functional difference between the two apps is framework implementation and CMS content variant.

## Goals

- Start data-first: schema, relationships, access, and route/API shape come before UI implementation.
- Use standards-based backend APIs built on Web Platform primitives.
- Use a full-stack modern JavaScript/TypeScript stack.
- Let types flow through the whole stack.
- Prefer web-platform-native and simple tools where practical.
- Keep Cloudflare as a hard platform constraint unless a required need cannot reasonably be met.
- Optimize for learning and comparison while staying close to production realism.

## Fixed Stack

- Stable frontend comparison app: SvelteKit + Svelte 5.
- Shared API layer: Hono + TypeScript.
- Database: Postgres.
- DB access and migrations: Drizzle.
- Platform: Cloudflare Workers / Pages.
- CMS: Payload.
- Auth: Better Auth.
- Toolchain: Vite+ (`viteplus.dev`, local `vite-plus` package, global `vp` CLI) owns linting, formatting, test running, bundling/builds, package-manager orchestration, and monorepo task running.
- Infrastructure as Code: Pulumi TypeScript.

## Experiments

- Experimental frontend comparison app: Remix 3.
- Repo-wide TypeScript tooling experiment: TypeScript 7 beta / native preview / `tsgo`.
- Modern CSS feature usage: Anchor Positioning, named `@container` queries, `@scope`, View Transitions, `light-dark()`, and `shape()`.
- Three.js animation for the hello content.

## Alternatives And Fallbacks

- TypeScript 6 stable if TypeScript 7 beta creates friction.
- Vue + Nuxt only if both Remix 3 and SvelteKit fail the project goals.
- Terraform as an Infrastructure as Code alternative to Pulumi TypeScript.
- OpenFGA if app-level authorization becomes too complex.
- Another underlying workspace package manager only if pnpm creates friction with Vite+ or framework tooling.

## Non-Goals For V1

- Complex production multi-tenancy behavior.
- MFA, passkeys, SSO, SCIM, or complex organization invite flows.
- Full event-driven architecture.
- Custom CMS authoring UI.
- Mobile app support.
- React as a customer-facing frontend framework.

## Milestones

1. Create repo directories and spec docs.
2. Add workspace/tooling foundation and define shared data, content, auth, UI, and route contracts.
3. Scaffold local dev services, migrations, and seed strategy.
4. Build the Remix vertical slice.
5. Build the SvelteKit vertical slice.
6. Add parity E2E tests, screenshot tests, and Three.js render checks.
7. Document and validate Cloudflare deployment path.

## Success Criteria

- Both apps authenticate users and protect the same app routes.
- Both apps read hello content from Payload-managed content.
- Both apps read stack choices from app-owned Postgres data through Drizzle/API.
- Both apps use the same conceptual data and API contracts.
- Both apps demonstrate the required UI/CSS features with progressive enhancement.
- Local dev can run all required services in a realistic environment.
- CI can run Vite+ checks, Vite+ unit tests, Playwright E2E tests, and visual regression checks.
- Deployment docs identify Cloudflare targets and any Payload-specific deployment gap.
- Auth works through a single shared API/auth host pattern for both frontend apps.
