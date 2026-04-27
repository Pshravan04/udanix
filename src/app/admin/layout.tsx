import Link from "next/link";
import { GraduationCap, Bell, Settings, LogOut, LayoutDashboard, Users, Shield, BarChart3 } from "lucide-react";

const NAV_LINKS = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/counselors', label: 'Counselors', icon: Users },
    { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white selection:bg-udanix-blue/10 text-slate-900 font-sans">
            {/* ─── Background Elements ─── */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-udanix-blue/[0.03] rounded-full blur-[150px] opacity-100" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/[0.02] rounded-full blur-[120px] opacity-100" />
            </div>

            <header className="sticky top-0 z-40 glass border-b border-slate-100 shadow-sm backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3.5 group">
                            <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-udanix-blue transition-all duration-500">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter uppercase whitespace-nowrap">UDANIX</span>
                        </Link>
                        <span className="hidden sm:flex items-center gap-2 text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm">
                            <Shield className="w-3.5 h-3.5" /> Security Node
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-2">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-3 px-6 py-2.5 rounded-2xl text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group"
                            >
                                <Icon className="w-4.5 h-4.5 group-hover:text-udanix-blue transition-colors" />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="w-12 h-12 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-slate-50 flex items-center justify-center transition-all border border-slate-100">
                            <Bell className="w-5.5 h-5.5" />
                        </button>
                        <Link href="/login" className="w-12 h-12 rounded-2xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all border border-slate-100 ml-2">
                            <LogOut className="w-5.5 h-5.5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#F8FAFC]/50 min-h-[calc(100vh-5.5rem)]">
                {children}
            </main>
        </div>
    );
}
