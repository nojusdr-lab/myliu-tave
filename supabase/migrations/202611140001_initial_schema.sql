-- PawMatch production foundation. Apply with Supabase CLI: supabase db push.
-- Public listings are visible only after shelter verification. Private data is RLS-protected.

create schema if not exists private;

create type public.shelter_status as enum ('pending', 'verified', 'rejected', 'suspended');
create type public.shelter_member_role as enum ('manager', 'editor', 'viewer');
create type public.animal_species as enum ('dog', 'cat');
create type public.animal_gender as enum ('male', 'female', 'unknown');
create type public.animal_status as enum ('draft', 'published', 'adopted', 'archived');
create type public.application_status as enum ('submitted', 'reviewing', 'contacted', 'approved', 'declined', 'withdrawn');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  city text,
  preferred_language text not null default 'lt' check (preferred_language in ('lt', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shelters (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 160),
  legal_name text,
  registration_code text,
  email text not null,
  phone text,
  website text,
  city text not null,
  address text,
  description text,
  status public.shelter_status not null default 'pending',
  created_by uuid not null references auth.users(id),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shelter_members (
  shelter_id uuid not null references public.shelters(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.shelter_member_role not null default 'viewer',
  created_at timestamptz not null default now(),
  primary key (shelter_id, user_id)
);

create table public.animals (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid not null references public.shelters(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  species public.animal_species not null,
  breed text,
  gender public.animal_gender not null default 'unknown',
  birth_date date,
  approximate_age_months integer check (approximate_age_months is null or approximate_age_months >= 0),
  size text check (size is null or size in ('small', 'medium', 'large')),
  city text not null,
  description text not null default '',
  personality_tags text[] not null default '{}',
  medical_notes text,
  is_vaccinated boolean,
  is_neutered boolean,
  is_microchipped boolean,
  status public.animal_status not null default 'draft',
  created_by uuid not null references auth.users(id),
  published_at timestamptz,
  adopted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, shelter_id)
);

create table public.animal_photos (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals(id) on delete cascade,
  storage_path text not null unique,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  animal_id uuid not null references public.animals(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, animal_id)
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null,
  shelter_id uuid not null,
  applicant_user_id uuid not null references auth.users(id),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  status public.application_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint applications_animal_shelter_match
    foreign key (animal_id, shelter_id)
    references public.animals(id, shelter_id)
);

create table public.application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  event_type text not null,
  note text,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid not null references auth.users(id),
  animal_id uuid references public.animals(id) on delete set null,
  shelter_id uuid references public.shelters(id) on delete set null,
  reason text not null,
  details text,
  created_at timestamptz not null default now(),
  constraint reports_target_required check (animal_id is not null or shelter_id is not null)
);

create index animals_discovery_idx on public.animals (species, city, created_at desc) where status = 'published';
create index animals_shelter_idx on public.animals (shelter_id, status);
create index applications_shelter_idx on public.applications (shelter_id, status, created_at desc);
create index applications_applicant_idx on public.applications (applicant_user_id, created_at desc);
create index animal_photos_order_idx on public.animal_photos (animal_id, sort_order);

create function private.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function private.set_updated_at();
create trigger shelters_set_updated_at before update on public.shelters for each row execute function private.set_updated_at();
create trigger animals_set_updated_at before update on public.animals for each row execute function private.set_updated_at();
create trigger applications_set_updated_at before update on public.applications for each row execute function private.set_updated_at();

create function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name'))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function private.handle_new_user();

create function private.handle_new_shelter_owner()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.shelter_members (shelter_id, user_id, role)
  values (new.id, new.created_by, 'manager');
  return new;
end;
$$;

create trigger on_shelter_created after insert on public.shelters for each row execute function private.handle_new_shelter_owner();

create function private.is_shelter_member(target_shelter_id uuid, allowed_roles text[] default array['manager','editor','viewer'])
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.shelter_members sm
    where sm.shelter_id = target_shelter_id
      and sm.user_id = (select auth.uid())
      and sm.role::text = any (allowed_roles)
  );
$$;

create function private.is_admin()
returns boolean language sql stable set search_path = ''
as $$
  select coalesce((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_shelter_member(uuid, text[]) to authenticated;
grant execute on function private.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.shelters enable row level security;
alter table public.shelter_members enable row level security;
alter table public.animals enable row level security;
alter table public.animal_photos enable row level security;
alter table public.favourites enable row level security;
alter table public.applications enable row level security;
alter table public.application_events enable row level security;
alter table public.reports enable row level security;

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.shelters to authenticated;
grant select on public.shelter_members to authenticated;
grant select, insert, update, delete on public.animals to authenticated;
grant select, insert, update, delete on public.animal_photos to authenticated;
grant select, insert, delete on public.favourites to authenticated;
grant select, insert, update on public.applications to authenticated;
grant select on public.application_events to authenticated;
grant select, insert on public.reports to authenticated;
grant select on public.animals, public.animal_photos, public.shelters to anon;

create policy "profiles_read_own" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "shelters_public_verified" on public.shelters for select to anon, authenticated using (status = 'verified');
create policy "shelters_members_read" on public.shelters for select to authenticated using (private.is_shelter_member(id) or private.is_admin());
create policy "shelters_create_pending" on public.shelters for insert to authenticated with check (created_by = (select auth.uid()) and status = 'pending');
create policy "shelters_manager_update" on public.shelters for update to authenticated
using (private.is_shelter_member(id, array['manager']) or private.is_admin())
with check (private.is_shelter_member(id, array['manager']) or private.is_admin());

create policy "shelter_members_read_self_or_manager" on public.shelter_members for select to authenticated
using (user_id = (select auth.uid()) or private.is_shelter_member(shelter_id, array['manager']) or private.is_admin());

create policy "animals_public_published" on public.animals for select to anon, authenticated
using (status = 'published' and exists (select 1 from public.shelters s where s.id = shelter_id and s.status = 'verified'));
create policy "animals_members_read" on public.animals for select to authenticated
using (private.is_shelter_member(shelter_id) or private.is_admin());
create policy "animals_members_create" on public.animals for insert to authenticated
with check (created_by = (select auth.uid()) and status = 'draft' and private.is_shelter_member(shelter_id, array['manager','editor']));
create policy "animals_members_update" on public.animals for update to authenticated
using (private.is_shelter_member(shelter_id, array['manager','editor']) or private.is_admin())
with check (
  (private.is_shelter_member(shelter_id, array['manager','editor']) or private.is_admin())
  and (status <> 'published' or exists (select 1 from public.shelters s where s.id = shelter_id and s.status = 'verified'))
);
create policy "animals_manager_delete" on public.animals for delete to authenticated
using (private.is_shelter_member(shelter_id, array['manager']) or private.is_admin());

create policy "animal_photos_public_for_published_animals" on public.animal_photos for select to anon, authenticated
using (exists (select 1 from public.animals a where a.id = animal_id and a.status = 'published'));
create policy "animal_photos_members_read" on public.animal_photos for select to authenticated
using (exists (select 1 from public.animals a where a.id = animal_id and private.is_shelter_member(a.shelter_id)));
create policy "animal_photos_members_insert" on public.animal_photos for insert to authenticated
with check (exists (select 1 from public.animals a where a.id = animal_id and private.is_shelter_member(a.shelter_id, array['manager','editor'])));
create policy "animal_photos_members_update" on public.animal_photos for update to authenticated
using (exists (select 1 from public.animals a where a.id = animal_id and private.is_shelter_member(a.shelter_id, array['manager','editor'])))
with check (exists (select 1 from public.animals a where a.id = animal_id and private.is_shelter_member(a.shelter_id, array['manager','editor'])));
create policy "animal_photos_members_delete" on public.animal_photos for delete to authenticated
using (exists (select 1 from public.animals a where a.id = animal_id and private.is_shelter_member(a.shelter_id, array['manager'])));

create policy "favourites_owner_all" on public.favourites for all to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and exists (select 1 from public.animals a where a.id = animal_id and a.status = 'published'));

create policy "applications_applicant_read" on public.applications for select to authenticated using (applicant_user_id = (select auth.uid()));
create policy "applications_shelter_read" on public.applications for select to authenticated using (private.is_shelter_member(shelter_id) or private.is_admin());
create policy "applications_applicant_create" on public.applications for insert to authenticated
with check (
  applicant_user_id = (select auth.uid())
  and status = 'submitted'
  and exists (
    select 1 from public.animals a join public.shelters s on s.id = a.shelter_id
    where a.id = animal_id and a.shelter_id = shelter_id and a.status = 'published' and s.status = 'verified'
  )
);
create policy "applications_shelter_update" on public.applications for update to authenticated
using (private.is_shelter_member(shelter_id, array['manager','editor']) or private.is_admin())
with check (private.is_shelter_member(shelter_id, array['manager','editor']) or private.is_admin());

create policy "application_events_visible_to_participants" on public.application_events for select to authenticated
using (
  exists (
    select 1 from public.applications a
    where a.id = application_id
      and (a.applicant_user_id = (select auth.uid()) or private.is_shelter_member(a.shelter_id) or private.is_admin())
  )
);

create policy "reports_create_own" on public.reports for insert to authenticated with check (reporter_user_id = (select auth.uid()));
create policy "reports_read_own" on public.reports for select to authenticated using (reporter_user_id = (select auth.uid()) or private.is_admin());
