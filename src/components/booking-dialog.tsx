'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { getAvailableSlots } from '@/lib/calendar/google';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface BookingDialogProps {
  counselorId?: string;
  counselorName: string;
  trigger?: React.ReactElement;
}

export function BookingDialog({ counselorId, counselorName, trigger }: BookingDialogProps) {
  const [step, setStep] = useState<'pick' | 'confirm' | 'success'>('pick');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [open, setOpen] = useState(false);

  const slots = getAvailableSlots();

  // Generate next 7 days
  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleBook = async () => {
    if (!selectedSlot) return;
    setIsBooking(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Please login to book a session.');
      setIsBooking(false);
      return;
    }

    // Parse the selected slot into a real Date
    const [time, period] = selectedSlot.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const startTime = new Date(selectedDate);
    startTime.setHours(hours, minutes, 0, 0);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour

    const { error } = await supabase
      .from('sessions')
      .insert({
        student_id: user.id,
        counselor_id: counselorId,
        topic: topic.trim() || 'Initial Consultation',
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'scheduled',
        type: 'video',
      });

    if (error) {
      console.error('Booking failed:', error.message);
      toast.error('Booking failed. Please try again.');
      setIsBooking(false);
      return;
    }

    setStep('success');
    setIsBooking(false);
  };

  const reset = () => {
    setStep('pick');
    setSelectedSlot(null);
    setTopic('');
    setSelectedDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger render={trigger || <Button size="sm">Book Session</Button>} />
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem]">
        <AnimatePresence mode="wait">

          {step === 'pick' && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-6"
            >
              <div className="space-y-1.5">
                <DialogTitle className="text-2xl font-bold tracking-tight">Schedule Session</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Connect with <span className="text-udanix-blue font-bold">{counselorName}</span> at your convenience.
                </DialogDescription>
              </div>

              {/* Date selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Select Date</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {days.map((day) => (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`flex flex-col items-center px-4 py-3 rounded-2xl border text-xs font-bold shrink-0 transition-all ${
                        isSameDay(day, selectedDate)
                          ? 'bg-udanix-blue border-udanix-blue text-white shadow-lg shadow-blue-500/20'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-udanix-blue/30'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-widest font-black opacity-70 mb-1">{format(day, 'EEE')}</span>
                      <span className="text-lg font-black leading-none">{format(day, 'd')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Available Slots</label>
                  <Badge variant="outline" className="text-[9px] border-slate-100 text-slate-400 font-bold italic flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> GMT +5:30
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                        selectedSlot === slot
                          ? 'bg-udanix-blue border-udanix-blue text-white shadow-lg shadow-blue-500/20'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-udanix-blue/30 hover:bg-blue-50/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full h-13 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl group"
                disabled={!selectedSlot}
                onClick={() => setStep('confirm')}
              >
                Continue to Details
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
              className="p-8 space-y-6"
            >
              <button
                onClick={() => setStep('pick')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-[10px] font-bold uppercase tracking-widest"
              >
                <ArrowLeft className="w-3 h-3" /> Edit Time
              </button>

              <div className="space-y-1.5">
                <DialogTitle className="text-2xl font-bold tracking-tight">Session Details</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">Add a topic so your counselor can prepare.</DialogDescription>
              </div>

              {/* Session summary card */}
              <div className="p-5 rounded-2xl bg-udanix-blue text-white space-y-4 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10"><CalendarIcon className="w-20 h-20" /></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 opacity-80">Counselor</p>
                    <h4 className="text-lg font-bold">{counselorName}</h4>
                  </div>
                  <Badge className="bg-white/20 backdrop-blur-md border-none text-white font-bold text-[10px]">60 MIN</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 opacity-80">Date</p>
                    <p className="text-sm font-bold">{format(selectedDate, 'MMM do, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 opacity-80">Time</p>
                    <p className="text-sm font-bold">{selectedSlot}</p>
                  </div>
                </div>
              </div>

              {/* Topic input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">
                  Session Topic / Goal <span className="text-slate-300 normal-case font-medium">(optional)</span>
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Career options after PCM, College entrance strategy, Scholarship guidance..."
                  rows={3}
                  className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-udanix-blue/20 focus:border-udanix-blue/30 transition-all font-medium"
                />
              </div>

              <Button
                className="w-full h-13 bg-udanix-blue hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/20"
                onClick={handleBook}
                disabled={isBooking}
              >
                {isBooking ? 'Booking...' : 'Confirm & Book Session'}
              </Button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center relative">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                </motion.div>
                <div className="absolute inset-0 rounded-full border-4 border-green-100 animate-ping opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Booked!</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Session with <strong>{counselorName}</strong> is confirmed.<br />
                  Check your <span className="text-udanix-blue font-bold">Sessions</span> tab to view it.
                </p>
              </div>
              <div className="w-full pt-2">
                <Button className="w-full h-13 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold" onClick={() => setOpen(false)}>
                  Done
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
