'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { createCalendarEvent, getAvailableSlots } from "@/lib/calendar/google";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface BookingDialogProps {
  counselorId?: string;
  counselorName: string;
  trigger?: React.ReactElement;
}

export function BookingDialog({ counselorId, counselorName, trigger }: BookingDialogProps) {
  const [step, setStep] = useState<'pick' | 'confirm' | 'success'>('pick');
  const [selectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const slots = getAvailableSlots();

  const handleBook = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to book a session.");
      setIsBooking(false);
      return;
    }

    const startTime = new Date(selectedDate);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    // 1. Save to Supabase
    const { error } = await supabase
      .from('sessions')
      .insert({
        student_id: user.id,
        counselor_id: counselorId, // If provided, else we need a lookup or mock
        topic: 'Initial Consultation',
        date: format(selectedDate, 'yyyy-MM-dd'),
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'scheduled'
      });

    if (error) {
      console.error("Booking failed:", error.message);
      setIsBooking(false);
      return;
    }

    // 2. Sync with Google Calendar (Optional Simulation)
    await createCalendarEvent({
      counselorName,
      studentName: user.email || 'Student',
      startTime,
      endTime,
      type: 'Initial Consultation'
    });

    setStep('success');
    setIsBooking(false);
  };

  const reset = () => {
    setStep('pick');
    setSelectedSlot(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger render={trigger || <Button size="sm">Book Session</Button>} />
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem]">
        <AnimatePresence mode="wait">
          {step === 'pick' && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-8"
            >
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold tracking-tight">Schedule Session</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Connect with <span className="text-blue-600 font-bold">{counselorName}</span> at your convenience.
                </DialogDescription>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Available Slots</label>
                  <Badge variant="outline" className="text-[9px] border-slate-100 text-slate-400 font-bold italic">GMT +5:30</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-12 rounded-xl text-xs font-bold transition-all border ${selectedSlot === slot
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-sm transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Selected Date</p>
                    <p className="text-sm font-bold text-slate-900">{format(selectedDate, "PPP")}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              <Button
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-xl shadow-slate-200 group"
                disabled={!selectedSlot}
                onClick={() => setStep('confirm')}
              >
                Verification & Details
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-8"
            >
              <button
                onClick={() => setStep('pick')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-[10px] font-bold uppercase tracking-widest"
              >
                <ArrowLeft className="w-3 h-3" />
                Edit Time
              </button>

              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold tracking-tight">Final Confirmation</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">Verify your session summary before we sync.</DialogDescription>
              </div>

              <div className="p-6 rounded-3xl bg-blue-600 text-white space-y-6 shadow-2xl shadow-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Clock className="w-24 h-24" />
                </div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 opacity-80">Counselor</p>
                    <h4 className="text-xl font-bold">{counselorName}</h4>
                  </div>
                  <Badge className="bg-white/20 backdrop-blur-md border-none text-white font-bold text-[10px]">60 MIN</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 opacity-80">Date</p>
                    <p className="text-sm font-bold">{format(selectedDate, "MMM do, yyyy")}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 opacity-80">Time Slot</p>
                    <p className="text-sm font-bold">{selectedSlot}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-400 text-center italic">
                A Google Calendar invite will be automatically generated upon confirmation.
              </div>

              <Button
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/20"
                onClick={handleBook}
                disabled={isBooking}
              >
                {isBooking ? 'Securing Slot...' : 'Confirm & Sync Calendar'}
              </Button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 flex flex-col items-center text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </motion.div>
                <div className="absolute inset-0 rounded-full border-4 border-green-100 animate-ping opacity-20" />
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Mission Success</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Your career session is globally synced.<br />Check your inbox for the access link.
                </p>
              </div>

              <div className="w-full pt-4">
                <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold" onClick={() => reset()}>
                  Go to Student Hub
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
