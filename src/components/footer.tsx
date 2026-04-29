'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
    Twitter, 
    Linkedin, 
    Github, 
    Instagram, 
    ArrowRight, 
    Mail, 
    ShieldCheck, 
    Globe, 
    Cpu 
} from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-[#001A33] pt-32 pb-16 overflow-hidden border-t border-white/5">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-udanix-blue/10 rounded-full blur-[150px] opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-udanix-orange/10 rounded-full blur-[130px] opacity-30 animate-pulse" />
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            </div>

            <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
                
                {/* Newsletter Section - Ultra Premium */}
                <div className="relative mb-32">
                    <div className="absolute -inset-1 bg-gradient-to-r from-udanix-blue to-udanix-orange rounded-[3rem] blur-xl opacity-10" />
                    <div className="relative glass-dark rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 border border-white/10 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-udanix-blue/10 rounded-full blur-[80px] -mr-48 -mt-48" />
                        
                        <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
                            <h3 className="text-[40px] sm:text-[56px] font-black text-white leading-[1.1] tracking-tighter uppercase">
                                Decode the <br />
                                <span className="text-brand-gradient">Next Frontier</span>
                            </h3>
                            <p className="text-slate-400 text-xl font-medium max-w-lg leading-relaxed text-balance">
                                Join our elite network of future-ready students and professionals. Get intelligence on emerging industries delivered to your inbox.
                            </p>
                        </div>

                        <div className="w-full lg:w-[450px] space-y-6 relative z-10">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-brand-gradient rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
                                <div className="relative flex items-center bg-[#001122]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden p-1">
                                    <input 
                                        type="email" 
                                        placeholder="ENTER YOUR EMAIL" 
                                        className="flex-1 bg-transparent border-none outline-none text-white px-6 py-5 text-[11px] font-black tracking-[0.3em] placeholder:text-slate-600 uppercase"
                                    />
                                    <button className="px-8 py-4 rounded-xl bg-brand-gradient text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-orange-glow transition-all active:scale-95">
                                        JOIN NOW
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3 text-udanix-green" />
                                    No Spam. Ever.
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-800" />
                                <span className="flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-udanix-blue" />
                                    Global Network
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-8">
                            <Link href="/" className="inline-block hover:scale-105 transition-transform group">
                                <div className="flex items-center gap-4">
                                    <img src="/logo.jpg" alt="Udaanix" className="h-10 w-auto brightness-200 grayscale contrast-125" />
                                    <div className="h-8 w-px bg-white/10" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Intelligence</span>
                                </div>
                            </Link>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm text-balance">
                                Architecting the future of career intelligence through neural-mapping and verified professional mentorship.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { icon: <Twitter className="w-5 h-5" />, href: "#", color: "hover:text-[#1DA1F2]" },
                                { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "hover:text-[#0A66C2]" },
                                { icon: <Github className="w-5 h-5" />, href: "#", color: "hover:text-white" },
                                { icon: <Instagram className="w-5 h-5" />, href: "#", color: "hover:text-[#E4405F]" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${social.color} group`}
                                >
                                    <div className="text-slate-400 group-hover:scale-110 transition-transform">
                                        {social.icon}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-16">
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
                            <div key={col.title} className="space-y-10">
                                <p className="text-white font-black text-[11px] uppercase tracking-[0.4em] opacity-30">{col.title}</p>
                                <ul className="space-y-6">
                                    {col.links.map(l => (
                                        <li key={l.name}>
                                            <Link 
                                                href={l.href} 
                                                className="text-slate-400 hover:text-white text-[13px] transition-all font-bold uppercase tracking-widest block hover:translate-x-2 duration-300 relative group"
                                            >
                                                <span className="relative z-10">{l.name}</span>
                                                <div className="absolute left-0 -bottom-1 w-0 h-px bg-brand-gradient transition-all duration-300 group-hover:w-full" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
                        <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.3em]">
                            © 2026 UDANIX GLOBAL LABS
                        </p>
                        <div className="h-1 w-1 rounded-full bg-slate-800 hidden sm:block" />
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                            <Cpu className="w-3.5 h-3.5 text-udanix-blue animate-pulse" />
                            <p className="text-slate-500 text-[9px] font-black tracking-widest uppercase">
                                Status: <span className="text-emerald-500/80">Neural Grid Active</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <p className="text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase italic opacity-60">
                            Forging the infinite future
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Edge */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-udanix-blue to-transparent opacity-20" />
        </footer>
    );
}
