-- Supabase schema for Achmad Hasanudin personal branding site.

create extension if not exists "pgcrypto";

-- Tables
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text ,
  headline text,
  tagline text,
  bio text,
  location text,
  email text,
  avatar_url text,
  resume_url text,
  socials jsonb default '{}'::jsonb,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  slug text not null unique,
  color text not null default '000000',
  level text not null check (level in ('Advanced','Intermediate','Basic')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  location text,
  start_date date not null,
  end_date date,
  description text,
  highlights text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  school text not null,
  location text,
  start_date date not null,
  end_date date,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issued_date date ,
  credential_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail text,
  tech text[] default '{}',
  github_url text,
  live_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index
create index if not exists idx_profiles_user_id
on public.profiles(user_id);

create index if not exists idx_skills_sort_order
on public.skills(sort_order);

create index if not exists idx_projects_featured
on public.projects(featured);

create index if not exists idx_projects_created_at
on public.projects(created_at desc);

create index if not exists idx_messages_created_at
on public.messages(created_at desc);

create index if not exists idx_experiences_start_date
on public.experiences(start_date desc);

create index if not exists idx_education_start_date
on public.education(start_date desc);

-- function

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    email,
    is_admin
  )
  VALUES (
    NEW.id,
    NEW.email,
    true
  );

  RETURN NEW;
END;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers

drop trigger IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists trg_skills_updated_at on public.skills;
create trigger trg_skills_updated_at
before update on public.skills
for each row
execute function public.set_updated_at();

drop trigger if exists trg_experiences_updated_at on public.experiences;
create trigger trg_experiences_updated_at
before update on public.experiences
for each row
execute function public.set_updated_at();

drop trigger if exists trg_education_updated_at on public.education;
create trigger trg_education_updated_at
before update on public.education
for each row
execute function public.set_updated_at();

drop trigger if exists trg_certifications_updated_at on public.certifications;
create trigger trg_certifications_updated_at
before update on public.certifications
for each row
execute function public.set_updated_at();

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

-- Enable RLS
alter table public.profiles       enable row level security;
alter table public.skills         enable row level security;
alter table public.experiences    enable row level security;
alter table public.education      enable row level security;
alter table public.certifications enable row level security;
alter table public.projects       enable row level security;
alter table public.messages       enable row level security;

-- Public read policies
do $$ begin create policy "public read profiles"       on public.profiles       for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "public read skills"         on public.skills         for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "public read experiences"    on public.experiences    for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "public read education"      on public.education      for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "public read certifications" on public.certifications for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "public read projects"       on public.projects       for select using (true); exception when duplicate_object then null; end $$;

-- Authenticated write policies (any signed-in Supabase user is admin for a single-owner site)
do $$ begin create policy "auth write profiles"       on public.profiles       for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth write skills"         on public.skills         for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth write experiences"    on public.experiences    for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth write education"      on public.education      for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth write certifications" on public.certifications for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth write projects"       on public.projects       for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage messages"      on public.messages       for all to authenticated using (true) with check (true); exception when duplicate_object then null; end $$;

-- Messages: allow anonymous inserts (public contact form)
do $$ begin create policy "public insert messages" on public.messages for insert with check (true); exception when duplicate_object then null; end $$;

-- Storage buckets (create manually in Supabase Dashboard, mark as PUBLIC):
--   profile-images      (public)
--   project-images      (public)
--   resumes             (public)
--   certificate-images  (public)
--
-- Storage RLS: allow authenticated users to upload / manage files in these buckets.
do $$ begin
  create policy "auth upload profile-images" on storage.objects for insert to authenticated
    with check (bucket_id = 'profile-images');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth manage profile-images" on storage.objects for all to authenticated
    using (bucket_id = 'profile-images') with check (bucket_id = 'profile-images');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth upload project-images" on storage.objects for insert to authenticated
    with check (bucket_id = 'project-images');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth manage project-images" on storage.objects for all to authenticated
    using (bucket_id = 'project-images') with check (bucket_id = 'project-images');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth upload resumes" on storage.objects for insert to authenticated
    with check (bucket_id = 'resumes');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth manage resumes" on storage.objects for all to authenticated
    using (bucket_id = 'resumes') with check (bucket_id = 'resumes');
exception when duplicate_object then null; end $$;


-- resumes
do $$ begin
  create policy "auth upload certificate-images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'certificate-images');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create policy "auth manage certificate-images"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'certificate-images')
  with check (bucket_id = 'certificate-images');
exception
  when duplicate_object then null;
end $$;


-- bucket
INSERT INTO storage.buckets (id, name, public)
VALUES
('avatars', 'avatars', true),
('resumes', 'resumes', true),
('profile-images', 'profile-images', true),
('project-images', 'project-images', true),
('certificate-images', 'certificate-images', true)
ON CONFLICT (id) DO NOTHING;


-- add bucket custom icons
INSERT INTO storage.buckets (id, name, public)
VALUES ('custom-icons', 'custom-icons', true)
ON CONFLICT (id) DO NOTHING;

do $$ begin
  create policy "auth upload custom-icons"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'custom-icons');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create policy "auth manage custom-icons"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'custom-icons')
  with check (bucket_id = 'custom-icons');
exception
  when duplicate_object then null;
end $$;

