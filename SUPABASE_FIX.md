
-- 🛠️ FIX SCRIPT
-- Run this to finish setting up the Drivers feature.

-- 1. Link Drivers to Bookings (Safely)
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL;

-- 2. Enable Security
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- 3. Add Access Policies (Safely recreates them)
DROP POLICY IF EXISTS "Enable read for authenticated users" ON drivers;
CREATE POLICY "Enable read for authenticated users" ON drivers
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Enable all access for admins" ON drivers;
CREATE POLICY "Enable all access for admins" ON drivers
  FOR ALL TO authenticated USING (true);
