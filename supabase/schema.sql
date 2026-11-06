-- Databaseoppsettet til Math of Clans. Kjøres manuelt i Supabase sin SQL Editor.

-- Spillere (spilldata kommer her senere)
create table public.players (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  created_at timestamptz not null default now()
);

-- Passord i klartekst, bare for admin
create table public.player_credentials (
  user_id uuid primary key references auth.users (id) on delete cascade,
  password_plain text not null
);

alter table public.players enable row level security;
alter table public.player_credentials enable row level security;

-- Sjekker admin-rollen i innloggingstokenet
create function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

create policy "Spiller ser seg selv, admin ser alle"
  on public.players for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "Bare admin ser passord"
  on public.player_credentials for select to authenticated
  using (public.is_admin());

-- Klienten får bare lese. All skriving går via Edge Function.
revoke all on public.players, public.player_credentials from anon, authenticated;
grant select on public.players, public.player_credentials to authenticated;
grant all on public.players, public.player_credentials to service_role;
