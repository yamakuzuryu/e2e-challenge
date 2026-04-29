# Milestone 2: Workspace Foundation And Shared Contracts

## Goal

Turn the V1 specs into an implementation-ready workspace foundation before scaffolding full apps.

## Checklist

- [x] Add root `package.json` with pnpm and Vite+ metadata.
- [x] Add `pnpm-workspace.yaml`.
- [x] Add root README.
- [x] Activate pnpm locally through Corepack with a project-local cache.
- [x] Install workspace dependencies with project-local pnpm/Corepack.
- [x] Add shared contract package structure in `packages/core`.
- [x] Add app-owned DB schema placeholders in `packages/db`.
- [x] Add Better Auth boundary placeholders in `packages/auth`.
- [x] Add shared config placeholders in `packages/config`.
- [x] Add Hono API package boundary in `apps/api`.
- [x] Verify the first Vite+ command path with `vp --version`.
- [x] Verify `vp check` passes.

## Decisions Locked For This Milestone

- Vite+ is the developer-facing toolchain.
- pnpm is the underlying workspace package manager.
- The root package manager pin is `pnpm@10.33.2`.
- Vite+ local package pin starts at `vite-plus@0.1.12`.
- The project remains docs-and-contracts-first until the workspace foundation is in place.

## Notes

Corepack is available locally, but pnpm was not on `PATH` when Milestone 2 started. Use `COREPACK_HOME=.corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm ...` to keep pnpm activation confined to this project.

Verified local Vite+ command path:

- `vp v0.1.12`
- local `vite-plus v0.1.12`
- bundled tools include Vite, Rolldown, Vitest, oxfmt, oxlint, oxlint-tsgolint, and tsdown.

Milestone 2 package boundaries now exist:

- `packages/core`: shared Zod contracts and API error shape.
- `packages/db`: Drizzle app schema placeholders.
- `packages/auth`: Better Auth host/session boundary placeholders.
- `packages/config`: shared workspace/toolchain constants.
- `apps/api`: Hono API boundary with health, auth config, and placeholder content/data routes.
