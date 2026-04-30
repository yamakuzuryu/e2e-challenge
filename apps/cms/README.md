# Payload CMS Bootstrap Plan

Payload scaffolding belongs to the CMS/app milestone. For Milestone 3, the local bootstrap contract is:

- Payload owns CMS-managed hello content only.
- Seed or bootstrap two hello entries:
  - `appKey: remix`, `headline: Hello Remix World!`
  - `appKey: svelte`, `headline: Hello Svelte World!`
- Stack choice rows are not Payload content; they are app-owned Postgres rows seeded through Drizzle.
