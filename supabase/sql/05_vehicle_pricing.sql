-- Vehicle pricing table: editable from admin dashboard.
-- Run in Quarhire project → SQL Editor.

CREATE TABLE IF NOT EXISTS vehicle_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_key text UNIQUE NOT NULL,   -- economy, executive, suv, van
  label text NOT NULL,                 -- Sedan, Mini SUV, etc.
  price numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE vehicle_pricing ENABLE ROW LEVEL SECURITY;

-- Public read so the booking page can fetch prices
CREATE POLICY "Anyone can read vehicle pricing"
  ON vehicle_pricing FOR SELECT
  USING (true);

-- Only service role (admin client) can modify
CREATE POLICY "Service role can manage vehicle pricing"
  ON vehicle_pricing FOR ALL
  USING (auth.role() = 'service_role');

-- Seed with current prices
INSERT INTO vehicle_pricing (vehicle_key, label, price) VALUES
  ('economy',   'Sedan',              500),
  ('executive', 'Mini SUV',           800),
  ('suv',       'Premium SUV',       1600),
  ('van',       'Executive Mini Van', 2300)
ON CONFLICT (vehicle_key) DO UPDATE SET
  label = EXCLUDED.label,
  price = EXCLUDED.price,
  updated_at = now();
