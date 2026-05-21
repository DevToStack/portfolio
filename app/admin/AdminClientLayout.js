// app/admin/AdminClientLayout.js (Client Component)
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Users,
    LogOut,
    Menu,
    X,
    ChartNetwork,
    Projector
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Schedule', href: '/admin/schedule', icon: Calendar },
    { name: 'Contacts', href: '/admin/contacts', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: Projector },
    { name: 'Case Studies', href: '/admin/case-study', icon: ChartNetwork },
];

export default function AdminClientLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            {/* Mobile menu button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] md:hidden"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Backdrop for mobile */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#111111] border-r border-[#222222] z-40 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo / Brand */}
                    <div className="p-6 border-b border-[#222222]">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#5B8C5A] to-[#3D5A3C] rounded-lg" />
                            <span className="font-semibold text-lg tracking-tight">Admin Panel</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-[#1A1A1A] text-white border-l-2 border-[#5B8C5A]'
                                            : 'text-[#888888] hover:text-white hover:bg-[#1A1A1A]'
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout button */}
                    <div className="p-4 border-t border-[#222222]">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-all duration-200"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="md:ml-64 min-h-screen p-6">
                <div>
                    {children}
                </div>
            </main>
        </div>
    );
}