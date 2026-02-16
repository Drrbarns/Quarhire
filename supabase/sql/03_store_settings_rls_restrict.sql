-- =============================================================================
-- Quarhire: Restrict store_settings so only staff can read (optional security)
-- Run in: Supabase SQL Editor (Quarhire project)
-- Use: If you have a store_settings table and is_admin_or_staff() function.
-- Skip if you don't have these (Quarhire may not use store_settings).
-- =============================================================================

-- Only run if your project has store_settings and is_admin_or_staff()
DROP POLICY IF EXISTS "Staff view settings" ON public.store_settings;
CREATE POLICY "Staff view settings"
  ON public.store_settings
  FOR SELECT
  USING (is_admin_or_staff());
