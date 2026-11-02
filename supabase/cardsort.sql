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
