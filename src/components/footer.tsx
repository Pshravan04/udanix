'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ShieldCheck, 
    Globe, 
    Cpu 
} from 'lucide-react';

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export function Footer() {
    return (
        <footer className="relative bg-white pt-32 pb-16 overflow-hidden border-t border-slate-100">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] opacity-20 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[130px] opacity-20 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] mix-blend-overlay pointer-events-none" />
            </div>

            <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
                
                {/* Newsletter Section - Ultra Premium */}
                <div className="relative mb-32">
                    <div className="absolute -inset-1 bg-gradient-to-r from-udanix-blue to-udanix-orange rounded-[4rem] blur-2xl opacity-[0.1]" />
                    <div className="relative bg-white/90 backdrop-blur-3xl rounded-[4rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-16 border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-udanix-blue/5 rounded-full blur-[100px] -mr-64 -mt-64" />
                        
                        <div className="flex-1 space-y-10 relative z-10 text-center lg:text-left">
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
                                Access Your <br />
                                <span className="text-brand-gradient">Next Level</span>
                            </h3>
                            <p className="text-slate-600 text-xl font-medium max-w-lg leading-relaxed text-balance">
                                Join the UDANIX elite network. Get precision insights into emerging career frontiers delivered to your inbox.
                            </p>
                        </div>

                        <div className="w-full lg:w-[480px] space-y-8 relative z-10">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-brand-gradient rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
                                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-50/80 backdrop-blur-2xl rounded-3xl border border-slate-200 overflow-hidden p-2 gap-2 shadow-inner">
                                    <input 
                                        type="email" 
                                        placeholder="ENTER YOUR EMAIL" 
                                        className="flex-1 bg-transparent border-none outline-none text-slate-900 px-6 sm:px-8 py-5 sm:py-6 text-[10px] font-black tracking-[0.4em] placeholder:text-slate-400 uppercase min-w-0"
                                    />
                                    <button className="px-10 py-5 rounded-2xl bg-udanix-blue text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 whitespace-nowrap">
                                        JOIN NOW
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    Protected Grid
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                <span className="flex items-center gap-2.5">
                                    <Globe className="w-3.5 h-3.5 text-udanix-blue" />
                                    Global Intelligence
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-16">
                        <div className="space-y-10">
                            <Link href="/" className="inline-block hover:scale-105 transition-transform group">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                    <Image src="/logo.jpg" alt="Udaanix" width={160} height={80} className="h-12 w-auto object-contain" />
                                    <div className="h-10 w-[1px] bg-slate-200" />
                                    <span className="text-[10px] font-black text-udanix-blue uppercase tracking-[0.5em] opacity-80 group-hover:opacity-100 transition-opacity">GLOBAL</span>
                                </div>
                            </Link>
                            <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-sm text-balance">
                                Forging the future of career intelligence through neural-mapping and verified global mentorship.
                            </p>
                        </div>

                        <div className="flex gap-5">
                            {[
                                { icon: <Twitter className="w-5 h-5" />, href: "#", color: "hover:text-[#1DA1F2] hover:bg-sky-50" },
                                { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "hover:text-[#0A66C2] hover:bg-blue-50" },
                                { icon: <Github className="w-5 h-5" />, href: "#", color: "hover:text-slate-950 hover:bg-slate-100" },
                                { icon: <Instagram className="w-5 h-5" />, href: "#", color: "hover:text-[#E4405F] hover:bg-rose-50" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className={`w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center transition-all ${social.color} group shadow-sm`}
                                >
                                    <div className="text-slate-400 group-hover:scale-110 transition-transform">
                                        {social.icon}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-16 lg:gap-24">
                        {[
                            { 
                                title: 'Platform', 
                                links: [
                                    { name: 'Pathways', href: '#paths' },
                                    { name: 'Experts', href: '#counselors' },
                                    { name: 'Streams', href: '#streams' },
                                    { name: 'Udaanix Labs', href: '/labs' }
                                ] 
                            },
                            { 
                                title: 'Intelligence', 
                                links: [
                                    { name: 'Emerging Tech', href: '#' },
                                    { name: 'Market Reports', href: '#' },
                                    { name: 'Mentorship', href: '#' },
                                    { name: 'Whitepapers', href: '#' }
                                ] 
                            },
                            { 
                                title: 'Legal', 
                                links: [
                                    { name: 'Privacy Policy', href: '/privacy' },
                                    { name: 'Terms of Use', href: '/terms' },
                                    { name: 'Cookie Policy', href: '/cookies' },
                                    { name: 'Security Hub', href: '/security' }
                                ] 
                            },
                        ].map(col => (
                            <div key={col.title} className="space-y-12">
                                <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.5em] opacity-50">{col.title}</p>
                                <ul className="space-y-8">
                                    {col.links.map(l => (
                                        <li key={l.name}>
                                            <Link 
                                                href={l.href} 
                                                className="text-slate-500 hover:text-slate-900 text-sm transition-all font-bold uppercase tracking-widest block hover:translate-x-3 duration-300 relative group"
                                            >
                                                <span className="relative z-10">{l.name}</span>
                                                <div className="absolute left-0 -bottom-2 w-0 h-[2px] bg-brand-gradient transition-all duration-300 group-hover:w-full" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
                        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.4em]">
                            © 2026 UDANIX GLOBAL LABS
                        </p>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200 hidden sm:block" />
                        <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                            <Cpu className="w-4 h-4 text-blue-600 animate-pulse" />
                            <p className="text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">
                                Status: <span className="text-emerald-600/80">Neural Grid Active</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-16">
                        <p className="text-slate-400 text-[11px] font-black tracking-[0.5em] uppercase italic opacity-60">
                            Forging the infinite future
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Edge */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-40" />
        </footer>
    );
}
