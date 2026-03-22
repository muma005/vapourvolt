import { randomUUID } from "@/lib/utils";
import type { SavedCase, ProductSession, ProductUserRecord, StoredCaseRecord } from "@/lib/product/types";

const USERS_KEY = "vapourltagent_users_v4";
const SESSION_KEY = "vapourltagent_session_v4";
const CASES_KEY = "vapourltagent_cases_v4";

function canUseStorage() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function buildSession(user: ProductUserRecord): ProductSession {
  return {
    id: user.id,
    name: user.name,
    company: user.company,
    email: user.email,
  };
}

export function getCurrentSession() {
  return readJson<ProductSession | null>(SESSION_KEY, null);
}

export function logoutCurrentUser() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export function signUpUser(input: {
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

  const users = readJson<ProductUserRecord[]>(USERS_KEY, []);

  if (users.some((user) => user.email === email)) {
    return { ok: false as const, error: "An account with this email already exists. Try logging in instead." };
  }

  const user: ProductUserRecord = {
    id: randomUUID(),
    name,
    company,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  writeJson(USERS_KEY, [...users, user]);
  writeJson(SESSION_KEY, buildSession(user));

  return { ok: true as const, user: buildSession(user) };
}

export function loginUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!email || !password) {
    return { ok: false as const, error: "Enter your email and password." };
  }

  const users = readJson<ProductUserRecord[]>(USERS_KEY, []);
  const user = users.find((entry) => entry.email === email);

  if (!user || user.password !== password) {
    return { ok: false as const, error: "Incorrect email or password." };
  }

  writeJson(SESSION_KEY, buildSession(user));
  return { ok: true as const, user: buildSession(user) };
}

export function listCasesForCurrentUser() {
  const session = getCurrentSession();
  const cases = readJson<StoredCaseRecord[]>(CASES_KEY, []);

  if (!session) {
    return [];
  }

  return cases.filter((caseItem) => caseItem.userId === session.id);
}

export function saveCaseRecord(caseItem: StoredCaseRecord) {
  const cases = readJson<StoredCaseRecord[]>(CASES_KEY, []);
  writeJson(CASES_KEY, [caseItem, ...cases.filter((item) => item.id !== caseItem.id)]);
}

export function findCaseById(caseId: string) {
  return listCasesForCurrentUser().find((caseItem) => caseItem.id === caseId) ?? null;
}

export function createStoredCaseRecord(input: SavedCase, userId: string): StoredCaseRecord {
  return {
    ...input,
    userId,
  };
}
