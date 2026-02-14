import { createClient } from '@/lib/supabase/server';

export type AdminRole = 'admin' | 'staff';

/**
 * Get the current session user and their profile (including role).
 * Returns null if not authenticated.
 */
export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) return { user, profile: null };
  return { user, profile };
}

/**
 * Check if the current user has admin or staff role.
 * Use in API routes that must be restricted to admins.
 * Returns { user, profile } if authorized, or null if not.
 */
export async function requireAdmin(): Promise<{
  user: { id: string; email?: string };
  profile: { id: string; role: string };
} | null> {
  const session = await getSessionUser();
  if (!session?.user) return null;
  if (!session.profile) return null;
  const role = session.profile.role as string;
  if (role !== 'admin' && role !== 'staff') return null;
  return {
    user: session.user,
    profile: session.profile as { id: string; role: string },
  };
}
