
import '../../globals.css';
import Link from 'next/link';
import { AdminSidebarContent } from './sidebar-content';
import MobileSidebar from './mobile-sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-[#F0F4F8] text-[#0A0A0A]">
            <aside className="w-64 hidden md:block">
                <AdminSidebarContent />
            </aside>

            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-[#DDE2E9] p-4 md:p-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <MobileSidebar />
                        <h1 className="text-xl font-bold text-[#0A0A0A]">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#2B2F35] hover:bg-gray-100 rounded-lg transition-colors relative">
                            <i className="ri-notification-3-line text-xl"></i>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <Link href="/" className="px-4 py-2 bg-[#0A0A0A] text-white text-sm font-medium rounded-lg hover:bg-[#2B2F35] transition-colors hidden sm:block">
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
