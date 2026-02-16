-- =============================================================================
-- Quarhire: Check who has admin/staff access (read-only)
-- Run in: Supabase SQL Editor (Quarhire project)
-- Use: Verify profiles and roles. No changes made.
-- =============================================================================

SELECT id, email, role, created_at
FROM public.profiles
WHERE role IN ('admin', 'staff')
ORDER BY role, email;
