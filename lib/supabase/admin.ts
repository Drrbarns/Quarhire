import { createClient } from '@supabase/supabase-js'

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!serviceRoleKey && process.env.NODE_ENV === 'production') {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY is required in production. Do not use the anon key for admin operations.'
  )
}

// This client bypasses Row Level Security - use only in server-side code after verifying admin/staff.
// Never expose or use in client components.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
