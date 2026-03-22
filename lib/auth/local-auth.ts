export type StoredUser = {
  name: string;
  company: string;
  email: string;
  password: string;
  createdAt: string;
};

export type AuthSession = {
  name: string;
  company: string;
  email: string;
};

const USERS_KEY = "vapourvolt_users";
const SESSION_KEY = "vapourvolt_session";

function canUseStorage() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readUsers(): StoredUser[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function buildSession(user: StoredUser): AuthSession {
  return {
    name: user.name,
    company: user.company,
    email: user.email,
  };
}

export function storeSession(user: StoredUser, remember: boolean) {
  if (!canUseStorage()) {
    return;
  }

  const serialized = JSON.stringify(buildSession(user));

  if (remember) {
    window.localStorage.setItem(SESSION_KEY, serialized);
    window.sessionStorage.removeItem(SESSION_KEY);
    return;
  }

  window.sessionStorage.setItem(SESSION_KEY, serialized);
  window.localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const fromSession = window.sessionStorage.getItem(SESSION_KEY);
    const fromLocal = window.localStorage.getItem(SESSION_KEY);
    const raw = fromSession ?? fromLocal;
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (!canUseStorage()) {
    return;
  }

  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);
}

export function signUpLocalUser(input: {
  name: string;
  company: string;
  email: string;
  password: string;
}) {
  const name = input.name.trim();
  const company = input.company.trim();
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!name || !company || !email || !password) {
    return { ok: false as const, error: "Complete all required fields." };
  }

  if (password.length < 8) {
    return { ok: false as const, error: "Use a password with at least 8 characters." };
  }

  const users = readUsers();
  const existing = users.find((user) => user.email === email);

  if (existing) {
    return { ok: false as const, error: "An account with this email already exists." };
  }

  const user: StoredUser = {
    name,
    company,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);

  return { ok: true as const, user };
}

export function loginLocalUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!email || !password) {
    return { ok: false as const, error: "Enter your email and password." };
  }

  const users = readUsers();
  const user = users.find((entry) => entry.email === email);

  if (!user || user.password !== password) {
    return { ok: false as const, error: "Incorrect email or password." };
  }

  return { ok: true as const, user };
}
