
-- 1. Create Drivers Table
CREATE TABLE drivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  license_number TEXT,
  vehicle_model TEXT, -- e.g. Toyota Camry
  vehicle_plate TEXT, -- e.g. GR-234-24
  status TEXT DEFAULT 'active', -- active, inactive, busy
  notes TEXT
);

-- 2. Add Driver Relation to Bookings
ALTER TABLE bookings 
ADD COLUMN driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL;

-- 3. Enable RLS for Drivers
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- 4. Policies for Drivers
CREATE POLICY "Enable read for authenticated users" ON drivers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable all access for admins" ON drivers
  FOR ALL TO authenticated USING (true);
