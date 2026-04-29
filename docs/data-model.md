# Data Model

## Data-First Principles

- Define schema and relationships before UI implementation.
- Keep content, auth, tenant, audit, and feature flag concerns explicit.
- Use Drizzle types for app-owned DB tables.
- Use Zod at runtime boundaries for request, response, and CMS payload validation where useful.
- Keep CMS hello content shapes reusable across both frontend apps.
- Keep app-owned stack choice data reusable across both frontend apps.

## Data Plane Ownership

V1 uses one physical Postgres database.

- Drizzle owns app/auth tables, app migrations, app seeds, and app DB types.
- Payload owns CMS tables, Payload migrations, and collection persistence.
- Payload and Drizzle must not both migrate the same table.
- Prefer separate Postgres schemas for app/auth data and Payload data if the selected adapters support it.
- If schema separation is not practical, use clear table prefixes and document the ownership boundary before implementation.

## CMS Content Models

### Hello Content

Purpose: provide app-specific hello text for each comparison frontend.

Fields:

- `id`
- `appKey`: `remix` or `svelte`
- `headline`
- `body`
- `published`
- `updatedAt`

Seed entries:

- `appKey: remix`, `headline: Hello Remix World!`, `body: null` or short CMS-managed body copy.
- `appKey: svelte`, `headline: Hello Svelte World!`, `body: null` or short CMS-managed body copy.

## App-Owned Data Models

### Stack Choice

Purpose: provide the E2E stack table content from app-owned Postgres data managed through Drizzle.

Fields:

- `id`
- `category`
- `subcategory`
- `choice`
- `role`
- `status`: `fixed`, `experiment`, `alternative`, or `deferred`
- `notes`
- `sortOrder`
- `updatedAt`

Initial rows should include FE, BE, DB, Cloudflare infrastructure, security, CI/CD, testing, IaC, and monorepo choices.

## Auth And User Models

Better Auth owns the concrete auth tables it requires. When the Better Auth Drizzle adapter is used, those tables are treated as Drizzle/app-owned tables rather than Payload-owned tables. The project should plan for:

- User.
- Account / OAuth account.
- Session.
- Verification token or equivalent auth support tables.

App-level user profile data may extend the auth user with:

- `id`
- `displayName`
- `email`
- `avatarUrl`
- `createdAt`
- `updatedAt`

## Multi-Tenant Design Models

V1 designs for multi-tenancy without making complex tenant behavior central.

### Tenant

Fields:

- `id`
- `name`
- `slug`
- `createdAt`
- `updatedAt`

### Membership

Fields:

- `id`
- `tenantId`
- `userId`
- `roleId`
- `createdAt`
- `updatedAt`

### Role

Fields:

- `id`
- `tenantId`
- `key`: `owner`, `admin`, or `member`
- `name`
- `createdAt`
- `updatedAt`

## Audit Log

Audit entries are append-only.

Fields:

- `id`
- `tenantId`
- `actorUserId`
- `action`
- `resourceType`
- `resourceId`
- `before`
- `after`
- `requestId`
- `ipAddress`
- `userAgent`
- `createdAt`

V1 should create the model and use it for key auth/content access events if practical. Broad audit coverage can come later.

## Feature Flags

Start with a simple internal feature flag table.

Fields:

- `id`
- `key`
- `description`
- `enabled`
- `tenantId`
- `createdAt`
- `updatedAt`

External alternatives remain Flipper, LaunchDarkly, Statsig, or Unleash.
