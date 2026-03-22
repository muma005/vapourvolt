import { randomUUID } from "@/lib/utils";
import type { SavedCase } from "@/lib/db/types";

export type BrowserUser = {
  id: string;
  name: string;
  company: string;
  email: string;
  password: string;
  createdAt: string;
};

export type BrowserSession = {
  id: string;
  name: string;
  company: string;
  email: string;
};

type BrowserStoredCase = SavedCase & { userId: string };

const USERS_KEY = "vapourvault_users_v3";
const SESSION_KEY = "vapourvault_session_v3";
const CASES_KEY = "vapourvault_cases_v3";

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

function buildSession(user: BrowserUser): BrowserSession {
  return {
    id: user.id,
    name: user.name,
    company: user.company,
    email: user.email,
  };
}

export function getBrowserSession() {
  return readJson<BrowserSession | null>(SESSION_KEY, null);
}

export function clearBrowserSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export function signUpBrowserUser(input: {
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

  const users = readJson<BrowserUser[]>(USERS_KEY, []);

  if (users.some((user) => user.email === email)) {
    return { ok: false as const, error: "An account with this email already exists. Try logging in instead." };
  }

  const user: BrowserUser = {
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

export function loginBrowserUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!email || !password) {
    return { ok: false as const, error: "Enter your email and password." };
  }

  const users = readJson<BrowserUser[]>(USERS_KEY, []);
  const user = users.find((entry) => entry.email === email);

  if (!user || user.password !== password) {
    return { ok: false as const, error: "Incorrect email or password." };
  }

  writeJson(SESSION_KEY, buildSession(user));
  return { ok: true as const, user: buildSession(user) };
}

export function listBrowserCasesForCurrentUser() {
  const session = getBrowserSession();
  const cases = readJson<BrowserStoredCase[]>(CASES_KEY, []);

  if (!session) {
    return [];
  }

  return cases.filter((caseItem) => caseItem.userId === session.id);
}

export function saveBrowserCase(caseItem: BrowserStoredCase) {
  const cases = readJson<BrowserStoredCase[]>(CASES_KEY, []);
  writeJson(CASES_KEY, [caseItem, ...cases.filter((item) => item.id !== caseItem.id)]);
}

export function findBrowserCaseById(caseId: string) {
  return listBrowserCasesForCurrentUser().find((caseItem) => caseItem.id === caseId) ?? null;
}
