import type { SessionSummary } from "@e2e-challenge/core";

export type AuthRuntime = "local" | "preview" | "production";

export type AuthHostConfig = {
  runtime: AuthRuntime;
  apiBaseUrl: string;
  baseDomain: string;
  cookieDomain: string;
  allowedOrigins: string[];
};

export type AuthSessionResult =
  | { authenticated: true; session: SessionSummary }
  | { authenticated: false; session: null };

export const authRoutePrefix = "/api/auth";

export const localAuthHostConfig: AuthHostConfig = {
  runtime: "local",
  apiBaseUrl: "http://api.lvh.me:3003",
  baseDomain: "lvh.me",
  cookieDomain: ".lvh.me",
  allowedOrigins: ["http://remix.lvh.me:3000", "http://svelte.lvh.me:3001"],
};

export const getAuthBaseUrl = (config: Pick<AuthHostConfig, "apiBaseUrl">) =>
  `${config.apiBaseUrl}${authRoutePrefix}`;
