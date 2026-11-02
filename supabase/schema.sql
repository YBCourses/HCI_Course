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

-- ---- Card sort (also available alone as supabase/cardsort.sql) ----
-- Card sort ("The Community Library"): students sort 30 cards into 5 groups, once each.
-- Run this once in the Supabase SQL editor (New query -> paste -> Run). Safe to run again.

create table if not exists public.cardsort_set (
  id text primary key,
  title text not null default '',
  open boolean not null default false,            -- students can submit
  results_released boolean not null default false, -- students can see the class results
  updated_at timestamptz not null default now()
);
insert into public.cardsort_set (id, title) values ('library', 'The Community Library') on conflict (id) do nothing;

create table if not exists public.cardsort_submission (
  set_id text not null references public.cardsort_set(id) on delete cascade,
  student_key text not null,   -- the typed name, lower-case without accents: one submission per key
  student_name text not null,
  placements jsonb not null,   -- {"c01":"g3", ...}
  submitted_at timestamptz not null default now(),
  primary key (set_id, student_key)
);

alter table public.cardsort_set enable row level security;
alter table public.cardsort_submission enable row level security;

revoke all on public.cardsort_set, public.cardsort_submission from anon, authenticated;
grant select on public.cardsort_set to anon, authenticated;
grant update on public.cardsort_set to authenticated;
grant insert on public.cardsort_submission to anon, authenticated;
grant select, delete on public.cardsort_submission to authenticated;

drop policy if exists everyone_reads on public.cardsort_set;
drop policy if exists teacher_writes on public.cardsort_set;
create policy everyone_reads on public.cardsort_set for select to anon, authenticated using (true);
create policy teacher_writes on public.cardsort_set for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com');

-- Students (not signed in) may only ADD a submission, and only while the sort is open. They cannot read the table.
drop policy if exists students_insert on public.cardsort_submission;
drop policy if exists teacher_all on public.cardsort_submission;
create policy students_insert on public.cardsort_submission for insert to anon, authenticated
  with check (exists (select 1 from public.cardsort_set s where s.id = set_id and s.open));
create policy teacher_all on public.cardsort_submission for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'yassine.benaboud@gmail.com');

-- Did this name already submit?
create or replace function public.cardsort_has_submitted(p_set text, p_key text) returns boolean
language sql security definer set search_path = public as
$$ select exists (select 1 from public.cardsort_submission where set_id = p_set and student_key = p_key) $$;

-- A student's own placements (to compare with the class).
create or replace function public.cardsort_my_submission(p_set text, p_key text) returns jsonb
language sql security definer set search_path = public as
$$ select placements from public.cardsort_submission where set_id = p_set and student_key = p_key $$;

-- Class counts per card and group. Locked for students until the teacher releases the results.
create or replace function public.cardsort_stats(p_set text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  n int; ok boolean; cells jsonb;
begin
  select count(*) into n from public.cardsort_submission where set_id = p_set;
  select (results_released or lower(coalesce(auth.jwt() ->> 'email', '')) = 'yassine.benaboud@gmail.com')
    into ok from public.cardsort_set where id = p_set;
  if not coalesce(ok, false) then
    return jsonb_build_object('locked', true, 'count', n);
  end if;
  select coalesce(jsonb_agg(jsonb_build_object('card', card, 'group', grp, 'n', c)), '[]'::jsonb) into cells
  from (select e.key as card, e.value #>> '{}' as grp, count(*) as c
        from public.cardsort_submission s, jsonb_each(s.placements) e
        where s.set_id = p_set group by 1, 2) q;
  return jsonb_build_object('locked', false, 'count', n, 'cells', cells);
end $$;

grant execute on function public.cardsort_has_submitted(text, text), public.cardsort_my_submission(text, text),
  public.cardsort_stats(text) to anon, authenticated;
