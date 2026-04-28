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
import { GraduationCap, ArrowRight, Eye, EyeOff, Sparkles, Mail, ShieldCheck, User, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GoogleLoginButton } from '@/components/auth/google-login-button';
import { ForgotPasswordDialog } from '@/components/auth/forgot-password-dialog';

type AuthMode = 'login' | 'signup';

export function StudentLoginModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleMode = () => {
        setMode(prev => prev === 'login' ? 'signup' : 'login');
        setIsLoading(false);
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const supabase = createClient();

        try {
            if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    alert(error.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                // Signup Logic
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                            role: 'student',
                        }
                    }
                });

                if (authError) {
                    alert(authError.message);
                    setIsLoading(false);
                    return;
                }

                if (authData.user) {
                    // Create basic profile
                    const { error: profileError } = await supabase.from('profiles').insert({
                        id: authData.user.id,
                        full_name: name,
                        email: email,
                        role: 'student',
                    });

                    if (profileError) {
                        console.error('Profile creation error:', profileError);
                    }
                }
            }

            setIsOpen(false);
            if (window.location.pathname === '/') {
                router.refresh();
            } else {
                router.push('/student');
            }
        } catch (err) {
            console.error('Auth error:', err);
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

                        <div className="flex items-center justify-between relative z-10 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
                            </div>
                            
                            {mode === 'signup' && (
                                <button 
                                    onClick={toggleMode}
                                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-udanix-blue uppercase tracking-widest transition-colors"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                                </button>
                            )}
                        </div>

                        <div className="space-y-2 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 text-udanix-blue text-[9px] font-black uppercase tracking-widest shadow-sm">
                                <Sparkles className="w-3 h-3" />
                                {mode === 'login' ? 'Secure Student Portal' : 'New Entity Registration'}
                            </div>
                            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium text-base">
                                {mode === 'login' ? 'Access your career launchpad.' : 'Join 2,000+ students architecting their future.'}
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

                        <form onSubmit={handleAuth} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2"
                                    >
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-udanix-blue transition-colors" />
                                            <Input
                                                type="text"
                                                placeholder="Aryan Sharma"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={mode === 'signup'}
                                                className="h-13 pl-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

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
                                    {mode === 'login' && <ForgotPasswordDialog />}
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
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        {mode === 'login' ? 'Authorize Access' : 'Register Entity'} 
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="pt-2 text-center border-t border-slate-50">
                            <p className="text-[12px] font-bold text-slate-400 tracking-tight">
                                {mode === 'login' ? 'INITIALIZE NEW ENTITY?' : 'ALREADY REGISTERED?'}
                                <button
                                    onClick={toggleMode}
                                    className="text-udanix-blue font-black hover:text-blue-700 transition-colors uppercase tracking-widest ml-1"
                                >
                                    {mode === 'login' ? 'Register Now' : 'Log In Instead'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
