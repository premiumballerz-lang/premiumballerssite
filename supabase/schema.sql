-- Premium Ballers Option B schema
create extension if not exists "pgcrypto";

create table if not exists public.tryout_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  title text not null,
  event_date date not null,
  start_time time not null,
  end_time time not null,
  location_name text not null default 'TBA',
  location_address text not null default 'TBA',
  fee_cents integer not null default 1000,
  is_active boolean not null default true
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),

  season text not null default '2026 February Tryouts',
  tryout_event_id uuid references public.tryout_events(id) on delete set null,

  player_first_name text not null,
  player_last_name text not null,
  dob date,
  grade text not null,
  gender text not null,
  school text,
  city text,

  primary_position text,
  secondary_position text,
  height text,

  guardian_name text not null,
  guardian_phone text not null,
  guardian_email text not null,

  emergency_name text,
  emergency_phone text,

  experience text,
  medical_notes text,

  waiver_participation boolean not null default false,
  waiver_photo_video boolean not null default false,
  code_of_conduct boolean not null default false,

  payment_status text not null default 'unpaid',
  stripe_payment_intent_id text,
  paid_at timestamp with time zone,
  confirmation_sent boolean not null default false
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  season text not null,
  name text not null,
  level text,
  gender text,
  grade text
);

create table if not exists public.roster_assignments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  season text not null,
  team_id uuid references public.teams(id) on delete cascade,
  registration_id uuid references public.registrations(id) on delete cascade,
  status text not null default 'invited'
);

alter table public.tryout_events enable row level security;
alter table public.registrations enable row level security;
alter table public.teams enable row level security;
alter table public.roster_assignments enable row level security;

-- Public read active tryout events
drop policy if exists "Public read active tryout events" on public.tryout_events;
create policy "Public read active tryout events"
on public.tryout_events
for select
to anon
using (is_active = true);

-- Admins manage tryout events
drop policy if exists "Admins manage tryout events" on public.tryout_events;
create policy "Admins manage tryout events"
on public.tryout_events
for all
to authenticated
using (true)
with check (true);

-- Public create registration (requires required waivers)
drop policy if exists "Public create registration" on public.registrations;
create policy "Public create registration"
on public.registrations
for insert
to anon
with check (
  waiver_participation = true
  and code_of_conduct = true
);

-- Admins read registrations
drop policy if exists "Admins read registrations" on public.registrations;
create policy "Admins read registrations"
on public.registrations
for select
to authenticated
using (true);

-- Admins update registrations
drop policy if exists "Admins update registrations" on public.registrations;
create policy "Admins update registrations"
on public.registrations
for update
to authenticated
using (true)
with check (true);

-- Admins manage teams and rosters
drop policy if exists "Admins manage teams" on public.teams;
create policy "Admins manage teams"
on public.teams
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Admins manage rosters" on public.roster_assignments;
create policy "Admins manage rosters"
on public.roster_assignments
for all
to authenticated
using (true)
with check (true);

-- Seed February tryouts (edit in Supabase Table Editor anytime)
insert into public.tryout_events (title, event_date, start_time, end_time, location_name, location_address, fee_cents)
values
  ('Premium Ballers February Tryout (Session 1)', '2026-02-07', '10:00', '12:00', 'TBA', 'TBA', 1000),
  ('Premium Ballers February Tryout (Session 2)', '2026-02-21', '10:00', '12:00', 'TBA', 'TBA', 1000)
on conflict do nothing;
