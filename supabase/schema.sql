create extension if not exists pgcrypto;

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_type text not null,
  asset_name text not null,
  organization text not null,
  reason_for_recovery text not null,
  notes text null,
  evidence_signals jsonb not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.case_assessments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.cases enable row level security;
alter table public.case_assessments enable row level security;

create policy "Users can view their own cases"
on public.cases
for select
using (auth.uid() = user_id);

create policy "Users can insert their own cases"
on public.cases
for insert
with check (auth.uid() = user_id);

create policy "Users can view their own assessments"
on public.case_assessments
for select
using (auth.uid() = user_id);

create policy "Users can insert their own assessments"
on public.case_assessments
for insert
with check (auth.uid() = user_id);
