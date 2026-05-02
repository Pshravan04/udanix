import Link from "next/link";
import { GraduationCap, Bell, Settings } from "lucide-react";

// Mobile nav is toggled client-side — need a small wrapper
import { CounselorMobileNav } from "./mobile-nav";
import { LogoutButton } from "./logout-button";

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white selection:bg-udanix-blue/10 text-slate-900">
            {/* ─── Background Elements ─── */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-udanix-blue/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-udanix-cyan/[0.03] rounded-full blur-[100px]" />
            </div>

            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                        <Link href="/" className="flex items-center gap-3 group shrink-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-udanix-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-xl sm:text-2xl text-slate-900 tracking-tighter">UDANIX</span>
                        </Link>
                        <span className="hidden sm:block text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-[0.15em] shrink-0">
                            Counselor Console
                        </span>
                    </div>

                    {/* Desktop Nav — inline links, no function arrays on server */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link href="/counselor" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all group">
                            <LayoutDashboard className="w-4 h-4 group-hover:text-udanix-blue transition-colors" /> Dashboard
                        </Link>
                        <Link href="/counselor/schedule" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all group">
                            <Calendar className="w-4 h-4 group-hover:text-udanix-blue transition-colors" /> Schedule
                        </Link>
                        <Link href="/counselor/messages" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all group">
                            <MessageSquare className="w-4 h-4 group-hover:text-udanix-blue transition-colors" /> Messages
                        </Link>
                        <Link href="/counselor/resources" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all group">
                            <BookOpen className="w-4 h-4 group-hover:text-udanix-blue transition-colors" /> Resources
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 flex items-center justify-center transition-all border border-slate-100">
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="hidden sm:flex w-11 h-11 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 items-center justify-center transition-all border border-slate-100">
                            <Settings className="w-5 h-5" />
                        </button>
                        <LogoutButton />
                        {/* Mobile menu button */}
                        <CounselorMobileNav />
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 min-h-[calc(100vh-4rem)] pb-28 sm:pb-12">
                {children}
            </main>
        </div>
    );
}
