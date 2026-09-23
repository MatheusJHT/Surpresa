create extension if not exists pgcrypto;

create table if not exists public.presents (
  id uuid primary key default gen_random_uuid(),
  day_number integer not null unique check (day_number between 1 and 19),
  title text not null default 'Um presente para você',
  password_hash text not null,
  question text not null,
  answer_hash text not null,
  success_message text not null,
  riddle text not null,
  photo_url text,
  hint text,
  normalize_accents boolean not null default true,
  ignore_punctuation boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  present_id uuid not null references public.presents(id) on delete cascade,
  password_verified boolean not null default false,
  question_answered boolean not null default false,
  completed boolean not null default false,
  attempts integer not null default 0 check (attempts >= 0),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, present_id)
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text not null default '19 Anos, 19 Dias, 19 Presentes',
  site_subtitle text not null default 'Uma pequena jornada de amor',
  intro_message text not null default 'Cada presente guarda uma pequena parte da nossa história.',
  final_message text not null default 'O melhor presente é continuar vivendo nossa história ao seu lado.',
  admin_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.carousel_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists user_progress_present_id_idx on public.user_progress(present_id);
create index if not exists carousel_images_order_idx on public.carousel_images(display_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists presents_set_updated_at on public.presents;
create trigger presents_set_updated_at
before update on public.presents
for each row execute function public.set_updated_at();

drop trigger if exists user_progress_set_updated_at on public.user_progress;
create trigger user_progress_set_updated_at
before update on public.user_progress
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.site_settings
    where admin_user_id = (select auth.uid())
  );
$$;

create or replace view public.public_presents as
select id, day_number, title, question, success_message, riddle, photo_url, hint,
       normalize_accents, ignore_punctuation, is_active
from public.presents;

create or replace view public.public_site_settings as
select site_title, site_subtitle, intro_message, final_message
from public.site_settings
limit 1;

create or replace view public.public_carousel_images as
select id, image_url, caption, display_order
from public.carousel_images
where is_active = true;

alter table public.presents enable row level security;
alter table public.user_progress enable row level security;
alter table public.site_settings enable row level security;
alter table public.carousel_images enable row level security;

drop policy if exists presents_admin_all on public.presents;
create policy presents_admin_all on public.presents
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists user_progress_owner_select on public.user_progress;
create policy user_progress_owner_select on public.user_progress
for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists site_settings_admin_all on public.site_settings;
create policy site_settings_admin_all on public.site_settings
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists carousel_admin_all on public.carousel_images;
create policy carousel_admin_all on public.carousel_images
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

revoke all on public.presents from anon, authenticated;
revoke all on public.site_settings from anon, authenticated;
revoke all on public.carousel_images from anon, authenticated;
grant select on public.public_presents to anon, authenticated;
grant select on public.public_site_settings to anon, authenticated;
grant select on public.public_carousel_images to anon, authenticated;
grant select on public.user_progress to authenticated;

insert into storage.buckets (id, name, public)
values ('romantic-site', 'romantic-site', false)
on conflict (id) do update set public = excluded.public;

drop policy if exists romantic_site_admin_insert on storage.objects;
create policy romantic_site_admin_insert on storage.objects
for insert to authenticated
with check (bucket_id = 'romantic-site' and public.is_admin());

drop policy if exists romantic_site_admin_update on storage.objects;
create policy romantic_site_admin_update on storage.objects
for update to authenticated
using (bucket_id = 'romantic-site' and public.is_admin())
with check (bucket_id = 'romantic-site' and public.is_admin());

drop policy if exists romantic_site_admin_delete on storage.objects;
create policy romantic_site_admin_delete on storage.objects
for delete to authenticated
using (bucket_id = 'romantic-site' and public.is_admin());

drop policy if exists romantic_site_authenticated_read on storage.objects;
create policy romantic_site_authenticated_read on storage.objects
for select to authenticated
using (bucket_id = 'romantic-site');