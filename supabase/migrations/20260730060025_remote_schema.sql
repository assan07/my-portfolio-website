-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

SET check_function_bodies = false;
DROP EXTENSION pg_net;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO service_role;
CREATE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
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
$function$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;
CREATE FUNCTION public.set_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;
GRANT ALL ON FUNCTION public.set_updated_at() TO anon;
GRANT ALL ON FUNCTION public.set_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.set_updated_at() TO service_role;
CREATE TABLE public.certifications (
  id             uuid                     DEFAULT gen_random_uuid() NOT NULL,
  name           text                     NOT NULL,
  issuer         text                     NOT NULL,
  issued_date    date,
  credential_url text,
  created_at     timestamp with time zone DEFAULT now() NOT NULL,
  updated_at     timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.certifications
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications
  ADD CONSTRAINT certifications_pkey PRIMARY KEY (id);
GRANT ALL ON public.certifications TO anon;
GRANT ALL ON public.certifications TO authenticated;
GRANT ALL ON public.certifications TO service_role;
CREATE TRIGGER trg_certifications_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "auth write certifications" ON public.certifications
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public read certifications" ON public.certifications
  FOR SELECT
  USING (true);
CREATE TABLE public.education (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  degree      text                     NOT NULL,
  school      text                     NOT NULL,
  location    text,
  start_date  date                     NOT NULL,
  end_date    date,
  description text,
  created_at  timestamp with time zone DEFAULT now() NOT NULL,
  updated_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.education
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education
  ADD CONSTRAINT education_pkey PRIMARY KEY (id);
GRANT ALL ON public.education TO anon;
GRANT ALL ON public.education TO authenticated;
GRANT ALL ON public.education TO service_role;
CREATE INDEX idx_education_start_date ON public.education (start_date DESC);
CREATE TRIGGER trg_education_updated_at
  BEFORE UPDATE ON public.education
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "auth write education" ON public.education
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public read education" ON public.education
  FOR SELECT
  USING (true);
CREATE TABLE public.experiences (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  role        text                     NOT NULL,
  company     text                     NOT NULL,
  location    text,
  start_date  date                     NOT NULL,
  end_date    date,
  description text,
  highlights  text[]                   DEFAULT '{}'::text[],
  created_at  timestamp with time zone DEFAULT now() NOT NULL,
  updated_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.experiences
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences
  ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);
GRANT ALL ON public.experiences TO anon;
GRANT ALL ON public.experiences TO authenticated;
GRANT ALL ON public.experiences TO service_role;
CREATE INDEX idx_experiences_start_date ON public.experiences (start_date DESC);
CREATE TRIGGER trg_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "auth write experiences" ON public.experiences
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public read experiences" ON public.experiences
  FOR SELECT
  USING (true);
CREATE TABLE public.messages (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  name       text                     NOT NULL,
  email      text                     NOT NULL,
  subject    text,
  message    text                     NOT NULL,
  is_read    boolean                  DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.messages
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages
  ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
GRANT ALL ON public.messages TO anon;
GRANT ALL ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
CREATE INDEX idx_messages_created_at ON public.messages (created_at DESC);
CREATE POLICY "auth manage messages" ON public.messages
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public insert messages" ON public.messages
  FOR INSERT
  WITH CHECK (true);
CREATE TABLE public.profiles (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  user_id    uuid                     NOT NULL,
  full_name  text,
  headline   text,
  tagline    text,
  bio        text,
  location   text,
  email      text,
  avatar_url text,
  resume_url text,
  socials    jsonb                    DEFAULT '{}'::jsonb,
  is_admin   boolean                  DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
CREATE INDEX idx_profiles_user_id ON public.profiles (user_id);
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "auth write profiles" ON public.profiles
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public read profiles" ON public.profiles
  FOR SELECT
  USING (true);
CREATE TABLE public.projects (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  title       text                     NOT NULL,
  description text,
  thumbnail   text,
  tech        text[]                   DEFAULT '{}'::text[],
  github_url  text,
  live_url    text,
  featured    boolean                  DEFAULT false NOT NULL,
  created_at  timestamp with time zone DEFAULT now() NOT NULL,
  updated_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.projects
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects
  ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
GRANT ALL ON public.projects TO anon;
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
CREATE INDEX idx_projects_created_at ON public.projects (created_at DESC);
CREATE INDEX idx_projects_featured ON public.projects (featured);
CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "auth write projects" ON public.projects
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public read projects" ON public.projects
  FOR SELECT
  USING (true);
CREATE TABLE public.skills (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  category   text                     NOT NULL,
  name       text                     NOT NULL,
  slug       text                     NOT NULL,
  color      text                     DEFAULT '000000'::text NOT NULL,
  level      text                     NOT NULL,
  sort_order integer                  DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.skills
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills
  ADD CONSTRAINT skills_level_check CHECK (level = ANY (ARRAY['Advanced'::text, 'Intermediate'::text, 'Basic'::text]));
ALTER TABLE public.skills
  ADD CONSTRAINT skills_pkey PRIMARY KEY (id);
ALTER TABLE public.skills
  ADD CONSTRAINT skills_slug_key UNIQUE (slug);
GRANT ALL ON public.skills TO anon;
GRANT ALL ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
CREATE INDEX idx_skills_sort_order ON public.skills (sort_order);
CREATE TRIGGER trg_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "auth write skills" ON public.skills
  TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY "public read skills" ON public.skills
  FOR SELECT
  USING (true);
