# Testing

## Goals

- Verify both apps implement the same behavior.
- Exercise auth, CMS content, app-owned data rendering, UI enhancement, accessibility, and deployment-sensitive paths.
- Keep tests useful for comparing developer experience between Remix and SvelteKit.

## Unit Tests

Use Vite+ test (`vp test`, backed by Vitest) as the unit test runner for:

- Shared domain helpers.
- Zod schemas and validation helpers.
- DB mapping utilities.
- Auth policy helpers.
- API response shaping.

## E2E Tests

Use Playwright for parity tests across both apps.

Required scenarios:

- Unauthenticated users are redirected from `/` and `/stack` to `/login`.
- User can log in with test credentials.
- Authenticated user sees the correct hello content for each app.
- Authenticated user sees the stack choices table from app-owned Postgres data.
- Navigation between home and stack routes works.
- Logout ends the session.
- Logout uses POST-only semantics or Better Auth's recommended non-GET mutation pattern.

## Visual Regression

Use Playwright screenshots in Chromium CI for:

- Login page.
- Home page with hello content and Three.js enhancement.
- Stack table page.
- Desktop viewport.
- Mobile viewport.
- Light and dark color schemes where practical.

Browser coverage:

- Chromium is required in CI for E2E, screenshots, and Three.js pixel checks.
- WebKit and Firefox smoke tests should cover login, content rendering, stack table rendering, and CSS fallback behavior when practical.
- Pixel-perfect visual parity is not required across browser engines for newer CSS features.
- OAuth is not required in CI unless the provider flow is mocked; deterministic email/password login is the CI path.

## Three.js Render Checks

Playwright should verify:

- Canvas element is present when animation is enabled.
- Canvas has stable dimensions.
- Canvas is nonblank using a pixel/render check.
- Reduced-motion mode disables or simplifies animation without breaking layout.
- Static semantic hello text is still present.

## Accessibility Checks

Automated and manual checks should cover:

- Keyboard navigation.
- Visible focus states.
- Color contrast.
- Reduced motion.
- Semantic headings and table markup.
- Tooltip/popover accessibility.

## CI Expectations

GitHub Actions should eventually run:

- `vp install`.
- `vp check` for formatting, linting, and type checks.
- `vp test` for unit tests.
- Playwright E2E tests.
- Screenshot/visual regression checks.

Preview deployments should be validated separately once the app scaffolding exists.
