# Backend Implementation Guide

We have implemented a comprehensive backend using Supabase and Next.js.

## Components Implemented
1. **Database Integration**: 
   - Supabase Client & Admin utilities (`lib/supabase/*`)
   - Booking Schema (See `SUPABASE_SETUP.md`)
2. **API Routes**:
   - `POST /api/bookings`: Saves booking data to Supabase.
   - `POST /api/hubtel/checkout`: Links payments to booking records.
   - `POST /api/hubtel/callback`: Updates payment status to 'paid'.
3. **Admin Dashboard**:
   - `https://your-site/admin/bookings`
   - View all bookings, filter by status, export data.
   - Secure server-side data fetching.
4. **Frontend Integration**:
   - Booking form now persists data before payment.
   - Admin Layout separated from public site.

## Action Required

### 1. Set up Supabase
Follow the instructions in `SUPABASE_SETUP.md` to:
- Create a Supabase Project.
- Run the SQL Migration.
- Get your API Keys.

### 2. Configure Environment Variables
Update your `.env.local` file with the keys:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 3. Deploy
Redeploy your application to Vercel (or your host). Don't forget to add the Environment Variables to your hosting project settings!
