
import { createClient } from '@supabase/supabase-js'

// Note: SUPABASE_SERVICE_ROLE_KEY is required for this client
// This client bypasses Row Level Security - invoke with caution
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
