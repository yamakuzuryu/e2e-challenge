export const workspacePackages = ["apps/*", "packages/*", "infra"] as const;

export const vitePlusCommands = {
  install: "vp install",
  dev: "vp dev",
  check: "vp check",
  test: "vp test",
  build: "vp build",
  run: "vp run",
} as const;
