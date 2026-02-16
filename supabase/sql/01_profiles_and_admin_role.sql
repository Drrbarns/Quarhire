-- =============================================================================
-- Quarhire: Profiles table + admin role
-- Run in: Supabase SQL Editor (Quarhire project)
-- Use: Creates profiles for role-based admin access; ensures admin@quarhire.com is admin.
-- Run once. Safe to re-run (IF NOT EXISTS / ON CONFLICT).
-- =============================================================================

-- Role enum for profiles
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('admin', 'staff', 'customer');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role public.user_role NOT NULL DEFAULT 'customer',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role full access" ON public.profiles;
CREATE POLICY "Service role full access"
  ON public.profiles FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow insert for authenticated" ON public.profiles;
CREATE POLICY "Allow insert for authenticated"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Set admin@quarhire.com as admin (insert or update)
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'::public.user_role
FROM auth.users
WHERE email = 'admin@quarhire.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin'::public.user_role, email = EXCLUDED.email;

-- Trigger: create profile with role 'customer' for new signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
