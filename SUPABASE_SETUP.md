# Supabase Database Setup

To make the backend comprehensive, we will use Supabase (PostgreSQL) to store bookings and manage authentication.

## 1. Create a Supabase Project
1. Go to [database.new](https://database.new) and create a new project.
2. Once created, go to **Settings > API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` secret (for admin actions)

## 2. Add Environment Variables
Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 3. Run SQL Migration
Go to the **SQL Editor** in Supabase and run the following script to set up the database:

```sql
-- Create Enum for Booking Status
CREATE TYPE booking_status AS ENUM ('pending', 'paid', 'confirmed', 'completed', 'cancelled');

-- Create Bookings Table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Trip Details
  pickup_location TEXT NOT NULL,
  custom_pickup_location TEXT, -- If they entered a custom pickup
  destination TEXT NOT NULL,
  custom_destination TEXT, -- If they entered a custom destination
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  
  -- Flight Details (Optional)
  airline TEXT,
  flight_number TEXT,
  
  -- Vehicle & Requirements
  vehicle_type TEXT NOT NULL, -- economy, suv, executive, van
  passengers INTEGER DEFAULT 1,
  luggage INTEGER DEFAULT 0,
  special_requests TEXT,
  
  -- Payment & Status
  price DECIMAL(10, 2) NOT NULL,
  status booking_status DEFAULT 'pending',
  payment_reference TEXT UNIQUE, -- Our reference (QRHRE-...)
  hubtel_checkout_id TEXT,       -- Hubtel's CheckoutId
  hubtel_transaction_id TEXT,    -- Hubtel's TransactionId (after payment)
  
  -- Meta
  email_sent BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Allow anyone to create a booking (Public)
CREATE POLICY "Enable insert for everyone" ON bookings
  FOR INSERT WITH CHECK (true);

-- 2. Allow users to view their own booking (via reference or email lookup logic - simplified here)
-- Ideally, you'd use Auth, but for public booking form, we might just allow reading by ID/Reference if needed.
-- For now, we restrict read to Admins/Service Role generally, unless we implement Customer Auth.

-- 3. Allow Service Role (Admin) full access
-- (Service role bypasses RLS by default, but good to be explicit for authenticated admins if using Supabase Auth users)
-- Assuming we will have an admin user authenticated via Supabase Auth
CREATE POLICY "Enable read access for authenticated admins" ON bookings
  FOR SELECT TO authenticated USING (true); -- refine logic to specific admin emails if needed

CREATE POLICY "Enable update for authenticated admins" ON bookings
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated admins" ON bookings
  FOR DELETE TO authenticated USING (true);

-- Create specific Index for faster lookups
CREATE INDEX idx_bookings_payment_ref ON bookings(payment_reference);
CREATE INDEX idx_bookings_email ON bookings(customer_email);
CREATE INDEX idx_bookings_date ON bookings(pickup_date);

-- Realtime
alter publication supabase_realtime add table bookings;
```
