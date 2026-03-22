import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/db/sqlite";
import type { LocalUser } from "@/lib/db/types";

type UserRow = {
  id: string;
  name: string;
  company: string;
  email: string;
  password_hash: string;
  created_at: string;
};

function mapUser(row: UserRow): LocalUser {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    createdAt: row.created_at,
  };
}

export function findUserRowByEmail(email: string) {
  const db = getDatabase();
  return db.prepare("select * from users where email = ? limit 1").get(email) as UserRow | undefined;
}

export function findUserById(id: string) {
  const db = getDatabase();
  const row = db.prepare("select * from users where id = ? limit 1").get(id) as UserRow | undefined;
  return row ? mapUser(row) : null;
}

export function createUser(input: {
  name: string;
  company: string;
  email: string;
  passwordHash: string;
}) {
  const db = getDatabase();
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  db.prepare(
    "insert into users (id, name, company, email, password_hash, created_at) values (?, ?, ?, ?, ?, ?)",
  ).run(id, input.name, input.company, input.email, input.passwordHash, createdAt);

  return {
    id,
    name: input.name,
    company: input.company,
    email: input.email,
    createdAt,
  } satisfies LocalUser;
}
