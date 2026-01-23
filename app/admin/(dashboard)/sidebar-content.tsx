
import Link from 'next/link';
import SignOutButton from './signout-button';

export function AdminSidebarContent() {
    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] text-white">
            <div className="p-6 border-b border-white/10">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent">
                    QUARHIRE
                </Link>
                <p className="text-xs text-white/50 mt-1">Admin Portal</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-dashboard-line"></i>
                    Overview
                </Link>
                <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-calendar-check-line"></i>
                    Bookings
                </Link>
                <Link href="/admin/vehicles" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-roadster-line"></i>
                    Vehicles
                </Link>
                <Link href="/admin/drivers" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-steering-2-line"></i>
                    Drivers
                </Link>
                <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-user-line"></i>
                    Customers
                </Link>
                <div className="pt-2 pb-1 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Financials
                </div>
                <Link href="/admin/finance" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-funds-line"></i>
                    Finance
                </Link>
                <Link href="/admin/payments" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all">
                    <i className="ri-secure-payment-line"></i>
                    Payments
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
        </div>
    );
}
