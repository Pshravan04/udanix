'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { GraduationCap, ShieldAlert, Lock, Eye, EyeOff, Terminal } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
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

            router.push('/admin');
            router.refresh();
        } catch (err) {
            console.error('Login error:', err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex selection:bg-red-500/10 bg-white">
            {/* ─── LEFT: Admin focus ─── */}
            <div className="hidden lg:flex w-[40%] bg-slate-950 flex-col justify-between p-16 relative overflow-hidden text-white border-r border-white/5">
                <div className="absolute inset-0 grid grid-cols-12 gap-0 opacity-[0.02] pointer-events-none">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white aspect-square" />
                    ))}
                </div>

                <Link href="/" className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-black" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl tracking-tighter uppercase">UDANIX</span>
                </Link>

                <div className="relative z-10 space-y-8">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-[0.5rem] bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        System Administration
                    </div>
                    <div className="space-y-6">
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-6xl font-black leading-[0.9] tracking-tighter uppercase">
                            Control<br />
                            <span className="text-slate-500">Center.</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                            Authorized personnel only. Access strictly monitored and recorded.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 relative z-10 uppercase tracking-widest text-[10px] font-black text-slate-700">
                    <Terminal className="w-4 h-4" />
                    <span>System v2.4.0</span>
                </div>
            </div>

            {/* ─── RIGHT: Admin Form ─── */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 bg-slate-50 lg:bg-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm space-y-12"
                >
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-1">
                            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Admin Login</h1>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Verify Credentials</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="ADMIN ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-14 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all text-center font-black placeholder:opacity-50 text-base"
                            />
                        </div>

                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="ACCESS KEY"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-14 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all text-center font-black placeholder:opacity-50 text-base"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-15 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all"
                        >
                            {isLoading ? 'SECURE_AUTH_REQ...' : 'EXECUTE LOGIN'}
                        </Button>
                    </form>

                    <div className="pt-2 text-center">
                        <Link href="/login/student" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                            Return to main website
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
