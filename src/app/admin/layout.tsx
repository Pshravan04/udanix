import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Bell, Search, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen admin-dark bg-[var(--admin-bg)] text-[var(--admin-text-main)] font-sans flex">
            <AdminSidebar />
            
            <div className="flex-1 ml-64 flex flex-col">
                {/* ─── Top Navigation ─── */}
                <header className="h-20 border-b border-[var(--admin-border)] flex items-center justify-between px-8 bg-[var(--admin-bg)]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Command Center</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">System Status: Optimal</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live: 24 Users</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-xl border border-[var(--admin-border)] hover:bg-white/5 transition-colors text-slate-400">
                                <Bell className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 rounded-xl border border-[var(--admin-border)] hover:bg-white/5 transition-colors text-slate-400">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* ─── Background Glows ─── */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[var(--admin-accent)]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}
