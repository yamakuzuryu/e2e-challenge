import {
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const appSchema = pgSchema("app");

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const stackChoices = appSchema.table(
  "stack_choices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    category: text("category").notNull(),
    subcategory: text("subcategory"),
    choice: text("choice").notNull(),
    role: text("role").notNull(),
    status: text("status", {
      enum: ["fixed", "experiment", "alternative", "deferred"],
    }).notNull(),
    notes: text("notes"),
    sortOrder: integer("sort_order").notNull(),
    ...timestamps,
  },
  (table) => [index("stack_choices_category_sort_idx").on(table.category, table.sortOrder)],
);

export const tenants = appSchema.table(
  "tenants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("tenants_slug_idx").on(table.slug)],
);

export const roles = appSchema.table(
  "roles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }),
    key: text("key", { enum: ["owner", "admin", "member"] }).notNull(),
    name: text("name").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("roles_tenant_key_idx").on(table.tenantId, table.key)],
);

export const memberships = appSchema.table(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, {
        onDelete: "cascade",
      }),
    userId: text("user_id").notNull(),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id),
    ...timestamps,
  },
  (table) => [uniqueIndex("memberships_tenant_user_idx").on(table.tenantId, table.userId)],
);

export const auditLogs = appSchema.table(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id").references(() => tenants.id),
    actorUserId: text("actor_user_id"),
    action: text("action").notNull(),
    resourceType: text("resource_type").notNull(),
    resourceId: text("resource_id").notNull(),
    before: jsonb("before"),
    after: jsonb("after"),
    requestId: text("request_id").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("audit_logs_resource_idx").on(table.resourceType, table.resourceId)],
);

export const featureFlags = appSchema.table(
  "feature_flags",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: text("key").notNull(),
    description: text("description"),
    enabled: boolean("enabled").notNull().default(false),
    tenantId: uuid("tenant_id").references(() => tenants.id),
    ...timestamps,
  },
  (table) => [uniqueIndex("feature_flags_tenant_key_idx").on(table.tenantId, table.key)],
);
