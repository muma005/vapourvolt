export function getAuthSecret() {
  return process.env.AUTH_SECRET || "vapourvault-local-dev-secret";
}
