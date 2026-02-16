-- =============================================================================
-- Quarhire: Grant admin role to a user by email
-- Run in: Supabase SQL Editor (Quarhire project)
-- Use: Give a user admin access. Replace 'user@example.com' below with the real email.
-- Requires: 01_profiles_and_admin_role.sql already run (profiles table exists).
-- =============================================================================

INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'::public.user_role
FROM auth.users
WHERE email = 'user@example.com'   -- <-- CHANGE THIS to the actual email (e.g. 'admin@quarhire.com')
ON CONFLICT (id) DO UPDATE SET role = 'admin'::public.user_role, email = EXCLUDED.email;
