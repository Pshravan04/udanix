'use client';

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SystemStatusBar } from "@/components/admin/SystemStatusBar";
import { Bell, Search, Settings, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen admin-light bg-[var(--admin-bg)] text-[var(--admin-text-main)] font-sans flex overflow-x-hidden">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
                {/* ─── Top Navigation ─── */}
                <header className="h-20 border-b border-[var(--admin-border)] flex items-center justify-between px-4 md:px-8 bg-[var(--admin-header-bg)] backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 lg:hidden text-[var(--admin-text-muted)] hover:text-[var(--admin-text-main)] transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[var(--admin-text-main)] uppercase truncate">Admin Dashboard</h1>
                            <p className="text-[10px] text-[var(--admin-text-muted)] uppercase tracking-widest font-black hidden sm:block">Management Portal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="flex items-center gap-2 md:gap-3">
                            <button className="p-2 md:p-2.5 rounded-xl border border-[var(--admin-border)] hover:bg-[var(--admin-item-hover)] transition-colors text-[var(--admin-text-muted)] relative">
                                <Bell className="w-5 h-5" />
                                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--admin-accent)] rounded-full border-2 border-[var(--admin-bg)]" />
                            </button>
                            <button className="hidden sm:flex p-2.5 rounded-xl border border-[var(--admin-border)] hover:bg-[var(--admin-item-hover)] transition-colors text-[var(--admin-text-muted)]">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <SystemStatusBar />

                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>

            {/* ─── Background Glows ─── */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[var(--admin-accent-glow)] rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] left-[10%] w-[400px] h-[400px] bg-[var(--admin-accent-glow)]/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}
