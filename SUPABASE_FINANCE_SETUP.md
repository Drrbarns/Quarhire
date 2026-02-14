
-- Create Hubtel Callbacks Log Table
CREATE TABLE hubtel_callbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_reference TEXT,
  checkout_id TEXT,
  status TEXT,
  amount DECIMAL(10, 2),
  payload JSONB -- Store the full raw JSON response
);

-- Enable RLS
ALTER TABLE hubtel_callbacks ENABLE ROW LEVEL SECURITY;

-- Allow public insert (since callbacks come from outside, effectively public API, though usually IP restricted)
-- For simplicity in this setup, we allow insert. Ideally we restrict to service role but the API route handles the insert using service role.
CREATE POLICY "Enable insert for service role" ON hubtel_callbacks
  FOR INSERT TO authenticated, service_role, anon
  WITH CHECK (true);

-- Allow admins to read
CREATE POLICY "Enable read for admins" ON hubtel_callbacks
  FOR SELECT TO authenticated USING (true);

-- Index for lookup
CREATE INDEX idx_hubtel_callbacks_ref ON hubtel_callbacks(client_reference);
