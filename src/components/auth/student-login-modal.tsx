'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Eye, EyeOff, Sparkles, X, Mail, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GoogleLoginButton } from '@/components/auth/google-login-button';
import { ForgotPasswordDialog } from '@/components/auth/forgot-password-dialog';

export function StudentLoginModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
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

            setIsOpen(false);
            router.push('/student');
            router.refresh();
        } catch (err) {
            console.error('Login error:', err);
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                render={
                    <Button variant="ghost" className="text-[11px] font-black text-slate-500 hover:text-udanix-blue uppercase tracking-widest transition-all px-4 py-2 rounded-xl hover:bg-slate-50">
                        Sign In
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] bg-white">
                <div className="relative">
                    {/* Header/Banner Area */}
                    <div className="bg-slate-50 p-8 border-b border-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
                        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-udanix-blue/[0.05] rounded-full blur-3xl" />

                        <div className="flex items-center gap-4 relative z-10 mb-6">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
                        </div>

                        <div className="space-y-2 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 text-udanix-blue text-[9px] font-black uppercase tracking-widest shadow-sm">
                                <Sparkles className="w-3 h-3" />
                                Student Access
                            </div>
                            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight">Welcome Back</DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium text-base">
                                Access your career launchpad in seconds.
                            </DialogDescription>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="p-8 space-y-8">
                        <GoogleLoginButton role="student" />

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]"><span className="bg-white px-4 text-slate-400">Secure Protocol</span></div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identifier</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-udanix-blue transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="user@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-13 pl-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-1">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Secret Key</label>
                                    <ForgotPasswordDialog />
                                </div>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-udanix-blue transition-colors" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-13 pl-12 pr-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl group transition-all"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-3">
                                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Syncing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Authorize Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="pt-2 text-center border-t border-slate-50">
                            <p className="text-[12px] font-bold text-slate-400 tracking-tight">
                                INITIALIZE ENTITY?{' '}
                                <button
                                    onClick={() => { setIsOpen(false); router.push('/register'); }}
                                    className="text-udanix-blue font-black hover:text-blue-700 transition-colors uppercase tracking-widest ml-1"
                                >
                                    Register Now
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
