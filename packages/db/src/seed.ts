import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { featureFlags, roles, stackChoices, tenants } from "./schema.ts";

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgres://e2e_challenge:e2e_challenge@localhost:55432/e2e_challenge";

const client = postgres(databaseUrl, { max: 1 });
const db = drizzle(client);

const now = new Date();

const stackChoiceRows = [
  {
    category: "FE",
    subcategory: "Experimental app",
    choice: "Remix 3",
    role: "Experimental comparison app",
    status: "experiment" as const,
    notes: "Forward-looking framework comparison target.",
    sortOrder: 10,
  },
  {
    category: "FE",
    subcategory: "Stable app",
    choice: "SvelteKit + Svelte 5",
    role: "Stable comparison app",
    status: "fixed" as const,
    notes: "Modern stable frontend baseline.",
    sortOrder: 20,
  },
  {
    category: "BE",
    subcategory: "Shared API",
    choice: "Hono + TypeScript",
    role: "Shared APIs, auth routes, webhooks, background endpoints",
    status: "fixed" as const,
    notes: "Web Platform API style for Cloudflare Workers.",
    sortOrder: 30,
  },
  {
    category: "DB",
    subcategory: "Relational store",
    choice: "Postgres + Drizzle",
    role: "App-owned data and migrations",
    status: "fixed" as const,
    notes: "Stack choices are intentionally app-owned data, not CMS content.",
    sortOrder: 40,
  },
  {
    category: "CMS",
    subcategory: "Hello content",
    choice: "Payload",
    role: "CMS-managed hello content",
    status: "fixed" as const,
    notes: "Payload controls only the Hello World content in V1.",
    sortOrder: 50,
  },
  {
    category: "Infrastructure",
    subcategory: "Cloud",
    choice: "Cloudflare Workers / Pages",
    role: "Primary deployment target",
    status: "fixed" as const,
    notes: "Cloudflare remains a hard constraint unless a need cannot be met.",
    sortOrder: 60,
  },
  {
    category: "Tooling",
    subcategory: "Unified toolchain",
    choice: "Vite+",
    role: "Lint, format, test, build, package manager orchestration",
    status: "fixed" as const,
    notes: "Uses pnpm as the underlying workspace package manager.",
    sortOrder: 70,
  },
];

const main = async () => {
  const [tenant] = await db
    .insert(tenants)
    .values({
      name: "Local Demo Tenant",
      slug: "local-demo",
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: tenants.slug,
      set: {
        name: "Local Demo Tenant",
        updatedAt: now,
      },
    })
    .returning();

  if (!tenant) {
    throw new Error("Failed to create or update local tenant.");
  }

  await db
    .insert(roles)
    .values([
      { tenantId: tenant.id, key: "owner", name: "Owner", updatedAt: now },
      { tenantId: tenant.id, key: "admin", name: "Admin", updatedAt: now },
      { tenantId: tenant.id, key: "member", name: "Member", updatedAt: now },
    ])
    .onConflictDoNothing();

  await db
    .insert(stackChoices)
    .values(stackChoiceRows.map((row) => ({ ...row, updatedAt: now })))
    .onConflictDoNothing();

  await db
    .insert(featureFlags)
    .values({
      key: "three-js-hello-animation",
      description: "Enable the decorative Three.js hello text enhancement.",
      enabled: true,
      tenantId: tenant.id,
      updatedAt: now,
    })
    .onConflictDoNothing();
};

await main();
await client.end();
