import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

let database: Database.Database | null = null;

function getDatabaseFilePath() {
  const storageDir = path.join(process.cwd(), "storage");
  fs.mkdirSync(storageDir, { recursive: true });
  return path.join(storageDir, "vapourvault.sqlite");
}

function initializeDatabase(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    create table if not exists users (
      id text primary key,
      name text not null,
      company text not null,
      email text not null unique,
      password_hash text not null,
      created_at text not null
    );

    create table if not exists cases (
      id text primary key,
      user_id text not null references users(id) on delete cascade,
      asset_type text not null,
      asset_name text not null,
      organization text not null,
      reason_for_recovery text not null,
      notes text,
      evidence_signals text not null,
      status text not null,
      created_at text not null
    );

    create table if not exists case_assessments (
      id text primary key,
      case_id text not null references cases(id) on delete cascade,
      user_id text not null references users(id) on delete cascade,
      assessment text not null,
      created_at text not null
    );

    create index if not exists idx_users_email on users(email);
    create index if not exists idx_cases_user_created on cases(user_id, created_at desc);
    create index if not exists idx_assessments_case on case_assessments(case_id);
  `);
}

export function getDatabase() {
  if (database) {
    return database;
  }

  database = new Database(getDatabaseFilePath());
  initializeDatabase(database);
  return database;
}
