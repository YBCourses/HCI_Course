-- HCI course: roster, project assignments and progress.
-- Run this once in the Supabase SQL editor (Project -> SQL editor -> New query -> paste -> Run).
-- It contains NO personal data. Students are added afterwards (see course/teacher/seed.sql, kept outside the repo).

create extension if not exists pgcrypto;

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  project_id int check (project_id between 1 and 11),
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  last_name text not null,
  first_name text not null default '',
  team_id uuid references public.teams(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  team_id uuid not null references public.teams(id) on delete cascade,
  session int not null check (session between 2 and 12),
  status text not null default 'pending' check (status in ('pending', 'working', 'sent', 'reviewed')),
  note text not null default '',
  updated_at timestamptz not null default now(),
  primary key (team_id, session)
);

-- Row-level security: only the teacher's verified e-mail can touch the tables.
alter table public.teams enable row level security;
alter table public.students enable row level security;
alter table public.progress enable row level security;

revoke all on public.teams, public.students, public.progress from anon;

drop policy if exists teacher_all on public.teams;
drop policy if exists teacher_all on public.students;
drop policy if exists teacher_all on public.progress;

create policy teacher_all on public.teams for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com');
create policy teacher_all on public.students for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com');
create policy teacher_all on public.progress for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com');

-- What students may see (read only): LAST NAMES per project, and progress per project. Nothing else.
create or replace view public.public_team_members as
  select t.project_id, s.last_name
  from public.teams t join public.students s on s.team_id = t.id
  where t.project_id is not null;

create or replace view public.public_team_progress as
  select t.project_id, p.session, p.status, p.note
  from public.progress p join public.teams t on t.id = p.team_id
  where t.project_id is not null;

grant select on public.public_team_members, public.public_team_progress to anon, authenticated;

-- Which sessions students can open (the teacher decides). Everyone may read; only the teacher may change.
create table if not exists public.session_release (
  session int primary key check (session between 1 and 12),
  released boolean not null default false,
  updated_at timestamptz not null default now()
);
insert into public.session_release (session, released)
  select s, s in (1, 2) from generate_series(1, 12) s
  on conflict (session) do nothing;

alter table public.session_release enable row level security;
grant select on public.session_release to anon, authenticated;
grant insert, update, delete on public.session_release to authenticated;

drop policy if exists everyone_reads on public.session_release;
drop policy if exists teacher_writes on public.session_release;
create policy everyone_reads on public.session_release for select to anon, authenticated using (true);
create policy teacher_writes on public.session_release for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com');
