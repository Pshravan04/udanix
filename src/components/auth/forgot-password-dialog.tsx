'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ShieldCheck, Lock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export function ForgotPasswordDialog() {
    const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const resetState = () => {
        setStep('email');
        setEmail('');
        setOtp(['', '', '', '']);
        setNewPassword('');
        setIsLoading(false);
    };

    const handleSendOTP = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
        }, 1500);
    };

    const handleVerifyOTP = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('reset');
        }, 1200);
    };

    const handleResetPassword = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <Dialog onOpenChange={(open) => !open && resetState()}>
            <DialogTrigger
                render={
                    <button type="button" className="text-[10px] font-black text-udanix-blue hover:text-blue-700 uppercase tracking-[0.2em] transition-colors">
                        Recovery Mode
                    </button>
                }
            />
            <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] bg-white">
                <AnimatePresence mode="wait">
                    {step === 'email' && (
                        <motion.div
                            key="email"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="p-10 space-y-8"
                        >
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <DialogTitle className="text-3xl font-black tracking-tighter text-slate-900 leading-tight uppercase">Access Recovery</DialogTitle>
                                <DialogDescription className="text-slate-500 font-medium text-lg leading-snug pt-1">
                                    Initialize the reset sequence. We'll transmit a secure sync key to your Gmail.
                                </DialogDescription>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Recovery Identifier</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-udanix-blue transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="user@gmail.com"
                                        className="h-14 pl-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium text-base shadow-inner"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleSendOTP}
                                disabled={!email || isLoading}
                                className="w-full h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all"
                            >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                    <span className="flex items-center gap-2">
                                        Transmit Sync Key <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                )}
                            </Button>
                        </motion.div>
                    )}

                    {step === 'otp' && (
                        <motion.div
                            key="otp"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="p-10 space-y-10"
                        >
                            <div className="space-y-3 text-center">
                                <div className="w-16 h-16 bg-udanix-blue/5 border border-udanix-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck className="w-8 h-8 text-udanix-blue" />
                                </div>
                                <DialogTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Verify Signal</DialogTitle>
                                <DialogDescription className="text-slate-500 font-medium text-lg leading-snug">
                                    Secure code dispatched to <span className="text-slate-900 font-black">{email}</span>
                                </DialogDescription>
                            </div>

                            <div className="flex justify-center gap-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <Input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-15 h-18 text-center text-3xl font-black rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-udanix-blue focus:ring-4 focus:ring-udanix-blue/5 transition-all shadow-inner"
                                        value={otp[i]}
                                        onChange={(e) => {
                                            const newOtp = [...otp];
                                            newOtp[i] = e.target.value;
                                            setOtp(newOtp);
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="space-y-5 pt-2">
                                <Button
                                    onClick={handleVerifyOTP}
                                    disabled={otp.some(v => v === '') || isLoading}
                                    className="w-full h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl"
                                >
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Authorize Key'}
                                </Button>
                                <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    SIGNAL LOST? <button className="text-udanix-blue hover:text-blue-700 underline underline-offset-4 decoration-2">RESEND PACKET</button>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 'reset' && (
                        <motion.div
                            key="reset"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="p-10 space-y-8"
                        >
                            <div className="space-y-3">
                                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                                <DialogTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Recode Protocol</DialogTitle>
                                <DialogDescription className="text-slate-500 font-medium text-lg pt-1">
                                    Establish a new cryptographic key for your UDANIX entity.
                                </DialogDescription>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">New Access Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-udanix-blue transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-14 pl-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium text-base shadow-inner"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleResetPassword}
                                disabled={!newPassword || isLoading}
                                className="w-full h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all"
                            >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Apply Protocol'}
                            </Button>
                        </motion.div>
                    )}

                    {step === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="p-12 flex flex-col items-center text-center space-y-10"
                        >
                            <div className="w-24 h-24 rounded-[2.5rem] bg-udanix-blue/5 border-2 border-udanix-blue/10 flex items-center justify-center relative">
                                <CheckCircle2 className="w-12 h-12 text-udanix-blue" />
                                <div className="absolute inset-[-8px] rounded-[3rem] border border-udanix-blue/40 animate-[ping_2s_infinite] opacity-20" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight">Sync Restored</h3>
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                    Access key updated successfully.<br />Return to entry node.
                                </p>
                            </div>

                            <Button className="w-full h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all">
                                Return to Node <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
