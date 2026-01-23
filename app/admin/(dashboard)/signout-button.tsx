
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
    const router = useRouter()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/admin/login')
    }

    return (
        <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
        >
            <i className="ri-logout-box-line"></i>
            Sign Out
        </button>
    )
}
