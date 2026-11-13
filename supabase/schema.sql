-- Databaseoppsettet til Math of Clans. Kjøres manuelt i Supabase sin SQL Editor.
--
-- Roller ligger i app_metadata.role på brukeren:
--   'admin'  – hovedadmin. Ser alle rom og oppretter lærere.
--   'laerer' – admin for sitt eget rom. Opprettes av hovedadmin på admin-siden.
-- Hovedadmin lages for hånd i Supabase, og trenger et eget rom:
--   insert into public.rooms (name, owner_id) values ('<brukernavn>', '<bruker-id>');

-- Hver lærer har ett rom. Spillere, klaner og runder hører til et rom, så flere rom kan spille samtidig.
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null unique references auth.users (id) on delete cascade
);

-- Rommet kan ikke slettes så lenge det har spillere, ellers ville innloggingene deres blitt liggende igjen
create table public.players (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  room_id uuid not null references public.rooms (id) on delete restrict,
  created_at timestamptz not null default now()
);
create index on public.players (room_id);

-- Passord i klartekst, så læreren kan dele dem ut. Lærernes passord ligger også her, men vises bare for hovedadmin.
create table public.player_credentials (
  user_id uuid primary key references auth.users (id) on delete cascade,
  password_plain text not null
);

alter table public.rooms enable row level security;
alter table public.players enable row level security;
alter table public.player_credentials enable row level security;

-- Sjekker rollen som hovedadmin i innloggingstokenet
create function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

-- Rommet til den innloggede: rommet spilleren er i, eller rommet læreren eier.
-- Security definer, så funksjonen kan brukes i RLS-reglene til tabellene den selv leser.
create function public.moc_my_room()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select room_id from public.players where id = auth.uid()),
    (select id from public.rooms where owner_id = auth.uid())
  )
$$;

revoke execute on function public.moc_my_room() from public, anon;
grant execute on function public.moc_my_room() to authenticated, service_role;

create policy "Eget rom, hovedadmin ser alle"
  on public.rooms for select to authenticated
  using (public.is_admin() or id = (select public.moc_my_room()));

-- Klanene skal kunne se hvem som er med på hvilket lag. Passordene ligger i en egen tabell.
create policy "Eget rom, hovedadmin ser alle"
  on public.players for select to authenticated
  using (public.is_admin() or room_id = (select public.moc_my_room()));

create policy "Læreren ser passordene i rommet sitt, hovedadmin ser alle"
  on public.player_credentials for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.players p
      join public.rooms r on r.id = p.room_id
      where p.id = user_id and r.owner_id = auth.uid()
    )
  );

-- Klienten får bare lese. All skriving går via Edge Function.
revoke all on public.rooms, public.players, public.player_credentials from anon, authenticated;
grant select on public.rooms, public.players, public.player_credentials to authenticated;
grant all on public.rooms, public.players, public.player_credentials to service_role;
