import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgres://e2e_challenge:e2e_challenge@localhost:55432/e2e_challenge",
  },
  out: "./packages/db/drizzle",
  schema: "./packages/db/src/schema.ts",
  schemaFilter: ["app"],
  strict: true,
  verbose: true,
});
