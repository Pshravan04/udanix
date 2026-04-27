import Link from "next/link";
import { GraduationCap, Bell, Settings, LogOut, LayoutDashboard, Calendar, MessageSquare, BookOpen } from "lucide-react";

const NAV_LINKS = [
    { href: '/counselor', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/counselor/schedule', label: 'Schedule', icon: Calendar },
    { href: '/counselor/messages', label: 'Messages', icon: MessageSquare },
    { href: '/counselor/resources', label: 'Resources', icon: BookOpen },
];

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white selection:bg-udanix-blue/10 text-slate-900">
            {/* ─── Background Elements ─── */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-udanix-blue/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-udanix-cyan/[0.03] rounded-full blur-[100px]" />
            </div>

            <header className="sticky top-0 z-40 glass border-b border-slate-100 shadow-sm backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-udanix-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
                                <GraduationCap className="w-5.5 h-5.5 text-white" />
                            </div>
                            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter">UDANIX</span>
                        </Link>
                        <span className="hidden sm:block text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-[0.15em]">
                            Counselor Console
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-2">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all group"
                            >
                                <Icon className="w-4.5 h-4.5 group-hover:text-udanix-blue transition-colors" />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="w-11 h-11 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 flex items-center justify-center transition-all border border-slate-100">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="w-11 h-11 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 flex items-center justify-center transition-all border border-slate-100">
                            <Settings className="w-5 h-5" />
                        </button>
                        <Link href="/login" className="w-11 h-11 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all border border-slate-100 ml-2">
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#F8FAFC]/50 min-h-[calc(100vh-5rem)]">
                {children}
            </main>
        </div>
    );
}
