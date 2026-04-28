'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Eye, EyeOff, Sparkles, User, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GoogleLoginButton } from '@/components/auth/google-login-button';
import { ForgotPasswordDialog } from '@/components/auth/forgot-password-dialog';

export default function StudentLoginPage() {
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
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error.message);
                setIsLoading(false);
                return;
            }

            router.push('/student');
            router.refresh();
        } catch (err) {
            console.error('Login error:', err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex selection:bg-udanix-blue/10 bg-white">
            {/* ─── LEFT: Branding panel ─── */}
            <div className="hidden lg:flex w-[40%] bg-slate-50 border-r border-slate-100 flex-col justify-between p-16 relative overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-udanix-blue/[0.04] rounded-full blur-[120px]" />

                <Link href="/" className="flex items-center gap-4 relative z-10 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-udanix-blue transition-all duration-500">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
                </Link>

                <div className="relative z-10 space-y-8">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-100 text-udanix-blue text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Student Portal
                    </div>
                    <div className="space-y-6">
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-6xl font-black text-slate-900 leading-[0.95] tracking-tighter uppercase">
                            Explore your<br />
                            <span className="text-udanix-blue">Passion.</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                            One step away from finding your dream career. No complex forms, just pure discovery.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 relative z-10 uppercase tracking-widest text-[10px] font-black text-slate-400/60">
                    <span>© 2026 UDANIX</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <Link href="/login/counselor" className="hover:text-udanix-blue transition-colors">Counselor Login</Link>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <Link href="/login/admin" className="hover:text-udanix-blue transition-colors">Admin</Link>
                </div>
            </div>

            {/* ─── RIGHT: Login Form ─── */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="space-y-3 px-1">
                        <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Student Login</h1>
                        <p className="text-slate-500 font-medium text-lg leading-snug">Sign in to start exploring career paths.</p>
                    </div>

                    <GoogleLoginButton role="student" />

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]"><span className="bg-white px-6 text-slate-400">Or with Email</span></div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <Input
                                type="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 transition-all"
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
                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white pr-14 focus:ring-4 focus:ring-udanix-blue/5 transition-all"
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
                            {isLoading ? 'Processing...' : 'Sign In'}
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>

                    <div className="pt-2 text-center">
                        <p className="text-[13px] font-bold text-slate-400">
                            NEW TO UDANIX?{' '}
                            <Link href="/register" className="text-udanix-blue font-black hover:text-blue-700 transition-colors underline-offset-4 hover:underline ml-1">
                                JOIN NOW
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
