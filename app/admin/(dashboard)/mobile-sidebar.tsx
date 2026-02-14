
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebarContent } from './sidebar-content';

export default function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className="md:hidden flex items-center">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -ml-2 text-[#0A0A0A] hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open sidebar"
            >
                <i className="ri-menu-line text-2xl"></i>
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <AdminSidebarContent />
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-4 text-white/50 hover:text-white"
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>
        </div>
    );
}
