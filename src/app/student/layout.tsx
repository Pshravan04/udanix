import Link from "next/link";
import { GraduationCap, Bell, Settings, LogOut, Search, LayoutDashboard, Users } from "lucide-react";

const NAV_LINKS = [
    { href: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/directory', label: 'Find Experts', icon: Search },
    { href: '/student/profile', label: 'Profile', icon: Users },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-udanix-blue/10 selection:text-udanix-blue">
            {/* Top nav */}
            <header className="sticky top-0 z-40 glass border-b border-slate-100 backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo + portal badge */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 bg-udanix-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
                                <GraduationCap className="w-5.5 h-5.5 text-white" />
                            </div>
                            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter">UDANIX</span>
                        </Link>
                        <span className="hidden sm:block text-[10px] font-black text-udanix-blue bg-udanix-blue/5 border border-udanix-blue/10 px-3.5 py-1.5 rounded-full uppercase tracking-[0.15em]">
                            Student Node
                        </span>
                    </div>

                    {/* Nav links */}
                    <nav className="hidden md:flex items-center gap-2">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all"
                            >
                                <Icon className="w-4.5 h-4.5" />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-4">
                        <button className="w-11 h-11 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 flex items-center justify-center transition-all border border-slate-100">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="w-11 h-11 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 flex items-center justify-center transition-all border border-slate-100">
                            <Settings className="w-5 h-5" />
                        </button>
                        <Link href="/login" className="w-11 h-11 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all border border-slate-100">
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative min-h-[calc(100-5rem)] bg-[#F8FAFC]">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-udanix-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
