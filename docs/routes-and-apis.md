# Routes And APIs

## Route Principles

- Both frontend apps expose equivalent user-facing routes.
- App-local page loading and actions use native Remix/SvelteKit server routes.
- Shared backend APIs, auth routes, webhooks, background endpoints, and cross-app APIs use Hono in `apps/api`.
- APIs use JSON over HTTP first.
- Types and validation are shared through packages where practical.

## Frontend Routes

Both `apps/remix-app` and `apps/svelte-app` implement:

- `/login`: login screen with email/password and OAuth entry points.
- `/logout`: page or action wrapper that performs logout through a POST request.
- `/`: protected home page rendering CMS-managed hello content and Three.js enhancement.
- `/stack`: protected page rendering the Postgres-backed stack choices table.

Route behavior:

- Unauthenticated access to `/` or `/stack` redirects to `/login`.
- Authenticated access to `/login` redirects to `/`.
- Both apps render equivalent layout, navigation, focus behavior, and content structure.

## Auth Routes

Better Auth provides or backs:

- Login.
- Logout.
- Session read.
- OAuth callback.
- Email/password flow.

The exact route paths may follow Better Auth conventions during implementation, but both frontend apps must consume the same auth contract from `apps/api`.

Auth topology:

- Local URLs use `remix.lvh.me:3000`, `svelte.lvh.me:3001`, `cms.lvh.me:3002`, and `api.lvh.me:3003`.
- Deployed environments use sibling subdomains under one parent domain when possible.
- Cookie domain, CORS allowlist, and trusted origins must include both frontend apps and the API host.
- Logout must be POST-only or use Better Auth's recommended non-GET mutation pattern to avoid CSRF and prefetch logout.
- OAuth is supported for learning, but CI E2E should use deterministic email/password login unless OAuth is explicitly mocked.

## Content And Stack Data Access

Payload owns hello content authoring and hello content reads.

Required content access:

- Fetch hello content by `appKey`.

V1 frontend apps access CMS-managed content through the Hono API facade rather than calling Payload directly. This keeps response shaping, auth enforcement, and cross-app parity in one place.

The E2E stack table is not CMS-managed. Stack choices are app-owned Postgres rows accessed through Drizzle and exposed through the Hono API facade.

Required stack access:

- Fetch stack choices ordered by category and `sortOrder`.

## Hono Shared API Boundaries

Hono owns shared API surfaces such as:

- `GET /api/health`: app/API health check.
- `GET /api/me`: current authenticated user summary.
- `GET /api/stack-choices`: normalized stack choices from app-owned Postgres data.
- `GET /api/hello/:appKey`: normalized hello content.
- Better Auth route mount under the API host.
- Webhook endpoints.
- Background job endpoints.

Hono should use Web Platform `Request` / `Response` patterns and avoid framework-specific response objects.

## Error Shape

Use a simple JSON error shape for shared APIs:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "requestId": "string"
  }
}
```

User-facing messages must be safe to display. Internal details belong in logs.
