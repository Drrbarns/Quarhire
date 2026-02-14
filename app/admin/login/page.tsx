
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('error') === 'access_denied') {
            setError('Your account does not have admin access. Contact the administrator or use an admin account.')
        }
    }, [searchParams])

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError(error.message)
            } else {
                router.refresh()
                router.push('/admin')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#DDE2E9] overflow-hidden">
                <div className="bg-[#0A0A0A] p-8 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent mb-2">
                        QUARHIRE
                    </h1>
                    <p className="text-white/60 text-sm">Admin Portal Access</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <i className="ri-error-warning-fill"></i>
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="ri-mail-line text-gray-400"></i>
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] focus:ring-1 focus:ring-[#0074C8] transition-all bg-[#F8FAFB]"
                                placeholder="admin@quarhire.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="ri-lock-line text-gray-400"></i>
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] focus:ring-1 focus:ring-[#0074C8] transition-all bg-[#F8FAFB]"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#0074C8] hover:bg-[#005da0] text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <i className="ri-arrow-right-line"></i>
                            </>
                        )}
                    </button>
                </form>

                <div className="px-8 pb-8 text-center">
                    <p className="text-xs text-gray-400">
                        Protected area. Authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    )
}
