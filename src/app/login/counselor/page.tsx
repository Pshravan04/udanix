'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Eye, EyeOff, Briefcase, UserCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ForgotPasswordDialog } from '@/components/auth/forgot-password-dialog';

export default function CounselorLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error.message);
                setIsLoading(false);
                return;
            }

            router.push('/counselor');
            router.refresh();
        } catch (err) {
            console.error('Login error:', err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex selection:bg-udanix-blue/10 bg-white">
            {/* ─── LEFT: Branding panel ─── */}
            <div className="hidden lg:flex w-[40%] bg-slate-900 flex-col justify-between p-16 relative overflow-hidden text-white">
                <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-udanix-blue/[0.1] rounded-full blur-[120px]" />

                <Link href="/" className="flex items-center gap-4 relative z-10 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500">
                        <GraduationCap className="w-7 h-7 text-slate-900" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-white tracking-tighter uppercase">UDANIX</span>
                </Link>

                <div className="relative z-10 space-y-8">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-udanix-cyan text-[10px] font-black uppercase tracking-[0.2em]">
                        <UserCheck className="w-3.5 h-3.5" />
                        Counselor Portal
                    </div>
                    <div className="space-y-6">
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-6xl font-black leading-[0.95] tracking-tighter uppercase">
                            Impact<br />
                            <span className="text-udanix-cyan">Growth.</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                            Log in to manage your sessions, guide students, and track your impact on the next generation of leaders.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 relative z-10 uppercase tracking-widest text-[10px] font-black text-slate-500">
                    <span>© 2026 UDANIX</span>
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <Link href="/login/student" className="hover:text-white transition-colors">Student Login</Link>
                </div>
            </div>

            {/* ─── RIGHT: Login Form ─── */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="space-y-3 px-1 text-center lg:text-left">
                        <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Expert Access</h1>
                        <p className="text-slate-500 font-medium text-lg leading-snug">Welcome back, Counselor.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                            <Input
                                type="email"
                                placeholder="counselor@udanix.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                <ForgotPasswordDialog />
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white pr-14 focus:ring-4 focus:ring-slate-900/5 transition-all text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all"
                        >
                            {isLoading ? 'Authenticating...' : 'Enter Counselor Portal'}
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>

                    <div className="pt-2 text-center border-t border-slate-100 pt-10">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            Need Help? <Link href="#" className="text-udanix-blue hover:underline ml-1">Contact Support</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
