import { localAuthHostConfig } from "@e2e-challenge/auth";
import { appKeySchema, createApiError } from "@e2e-challenge/core";
import { Hono } from "hono";

export const app = new Hono();

app.get("/api/health", (c) =>
  c.json({
    ok: true,
    service: "apps/api",
  }),
);

app.get("/api/me", (c) =>
  c.json(
    createApiError(
      "not_implemented",
      "Session lookup will be implemented when Better Auth is wired.",
      c.req.header("x-request-id") ?? "local-dev",
    ),
    501,
  ),
);

app.get("/api/hello/:appKey", (c) => {
  const appKey = appKeySchema.safeParse(c.req.param("appKey"));

  if (!appKey.success) {
    return c.json(
      createApiError(
        "invalid_app_key",
        "Unknown app key.",
        c.req.header("x-request-id") ?? "local-dev",
      ),
      400,
    );
  }

  return c.json(
    createApiError(
      "not_implemented",
      "Payload hello content facade will be implemented in the app slice.",
      c.req.header("x-request-id") ?? "local-dev",
    ),
    501,
  );
});

app.get("/api/stack-choices", (c) =>
  c.json(
    createApiError(
      "not_implemented",
      "Drizzle stack choice query will be implemented in the app slice.",
      c.req.header("x-request-id") ?? "local-dev",
    ),
    501,
  ),
);

app.get("/api/auth/config", (c) =>
  c.json({
    routePrefix: "/api/auth",
    local: localAuthHostConfig,
  }),
);

export default app;
