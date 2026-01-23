
import '../globals.css';
import Link from 'next/link';
import SignOutButton from './signout-button';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-[#F0F4F8] text-[#0A0A0A]">
            <aside className="w-64 bg-[#0A0A0A] text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent">
                        QUARHIRE
                    </Link>
                    <p className="text-xs text-white/50 mt-1">Admin Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                        <i className="ri-dashboard-line"></i>
                        Overview
                    </Link>
                    <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                        <i className="ri-calendar-check-line"></i>
                        Bookings
                    </Link>
                    <Link href="/admin/vehicles" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                        <i className="ri-car-line"></i>
                        Vehicles
                    </Link>
                    <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                        <i className="ri-user-line"></i>
                        Customers
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#0074C8] flex items-center justify-center font-bold">A</div>
                        <div>
                            <p className="text-sm font-medium">Admin</p>
                            <p className="text-xs text-white/50">admin@quarhire.com</p>
                        </div>
                    </div>
                    <SignOutButton />
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-[#DDE2E9] p-4 md:p-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <h1 className="text-xl font-bold text-[#0A0A0A]">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#2B2F35] hover:bg-gray-100 rounded-lg transition-colors relative">
                            <i className="ri-notification-3-line text-xl"></i>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <Link href="/" className="px-4 py-2 bg-[#0A0A0A] text-white text-sm font-medium rounded-lg hover:bg-[#2B2F35] transition-colors">
                            View Website
                        </Link>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
