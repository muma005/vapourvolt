function includesAny(value: string, patterns: string[]) {
  return patterns.some((pattern) => value.includes(pattern));
}

export function mapAuthErrorToMessage(error: unknown, fallback: string) {
  const rawMessage = error instanceof Error ? error.message : String(error ?? "");
  const message = rawMessage.toLowerCase();

  if (includesAny(message, ["unique", "users.email"])) {
    return "An account with this email already exists. Try logging in instead.";
  }

  if (includesAny(message, ["readonly", "read-only", "readonly database", "sqlite_readonly"])) {
    return "This deployment cannot create local accounts because its storage is read-only. Run the app locally or move it to a host with persistent writable storage.";
  }

  if (includesAny(message, ["sqlite_cantopen", "unable to open database file", "cantopen"])) {
    return "The local account database could not be opened. Check that the server can create and write the storage folder.";
  }

  if (includesAny(message, ["eacces", "eperm", "permission denied"])) {
    return "The server does not have permission to write local account data. Give the app write access to its storage folder.";
  }

  if (includesAny(message, ["database is locked", "sqlite_busy"])) {
    return "The local account database is busy right now. Please try again in a moment.";
  }

  if (includesAny(message, ["failed to fetch", "networkerror", "network request failed"])) {
    return "The app could not reach the authentication service. Check your connection and try again.";
  }

  return fallback;
}
