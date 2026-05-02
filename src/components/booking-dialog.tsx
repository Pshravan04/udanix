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
import {
  Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, ChevronLeft,
  ArrowLeft, RotateCcw
} from 'lucide-react';
import {
  format, addDays, isSameDay, startOfMonth, endOfMonth, startOfWeek,
  endOfWeek, addMonths, subMonths, isBefore, startOfToday, isToday
} from 'date-fns';
import { getAvailableSlots } from '@/lib/calendar/google';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BookingDialogProps {
  counselorId?: string;
  counselorName: string;
  trigger?: React.ReactElement;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Build the calendar grid: 6 rows × 7 cols, filling from the start-of-week of the month */
function buildCalendarGrid(viewMonth: Date): (Date | null)[] {
  const monthStart = startOfMonth(viewMonth);
  const monthEnd   = endOfMonth(viewMonth);
  const gridStart  = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd    = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: (Date | null)[] = [];
  let cursor = gridStart;
  while (cursor <= gridEnd) {
    days.push(new Date(cursor));
    cursor = addDays(cursor, 1);
  }
  // Pad to always be 42 cells (6 weeks)
  while (days.length < 42) days.push(null);
  return days;
}

export function BookingDialog({ counselorId, counselorName, trigger }: BookingDialogProps) {
  const today = startOfToday();

  const [step, setStep]               = useState<'pick' | 'confirm' | 'success'>('pick');
  const [viewMonth, setViewMonth]     = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [topic, setTopic]             = useState('');
  const [isBooking, setIsBooking]     = useState(false);
  const [open, setOpen]               = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const slots      = getAvailableSlots();
  const calGrid    = buildCalendarGrid(viewMonth);
  const canGoPrev  = isBefore(today, startOfMonth(viewMonth)); // can go back only if not already at this month

  const handleDateClick = (day: Date) => {
    if (isBefore(day, today)) return; // past — no-op
    setSelectedDate(day);
    setSelectedSlot(null); // reset slot when date changes
  };

  const handleMonthSelect = (monthOffset: number) => {
    const targetMonth = addMonths(startOfMonth(today), monthOffset);
    setViewMonth(targetMonth);
    setShowMonthPicker(false);
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) return;
    setIsBooking(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Please login to book a session.');
      setIsBooking(false);
      return;
    }

    // Parse "09:00 AM" → hours + minutes
    const [time, period] = selectedSlot.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const startTime = new Date(selectedDate);
    startTime.setHours(hours, minutes, 0, 0);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const { error } = await supabase.from('sessions').insert({
      student_id:  user.id,
      counselor_id: counselorId,
      topic:       topic.trim() || 'Initial Consultation',
      start_time:  startTime.toISOString(),
      end_time:    endTime.toISOString(),
      status:      'scheduled',
      type:        'video',
    });

    if (error) {
      toast.error('Booking failed. Please try again.');
      setIsBooking(false);
      return;
    }

    setStep('success');
    setIsBooking(false);
  };

  const reset = () => {
    setStep('pick');
    setSelectedDate(null);
    setSelectedSlot(null);
    setTopic('');
    setViewMonth(today);
    setShowMonthPicker(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger render={trigger || <Button size="sm">Book Session</Button>} />

      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem]">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Pick Date + Slot ── */}
          {step === 'pick' && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-7 space-y-5"
            >
              {/* Header */}
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-bold tracking-tight">Schedule Session</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Connect with <span className="text-udanix-blue font-bold">{counselorName}</span> at your convenience.
                </DialogDescription>
              </div>

              {/* ─── Full Month Calendar ─── */}
              <div className="bg-slate-50/70 rounded-2xl p-4 space-y-3 border border-slate-100 relative min-h-[300px]">
                {/* Month navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewMonth(subMonths(viewMonth, 1))}
                      disabled={!canGoPrev || showMonthPicker}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white transition-all disabled:opacity-25 disabled:cursor-not-allowed border border-transparent hover:border-slate-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setViewMonth(today)}
                      disabled={isSameDay(startOfMonth(viewMonth), startOfMonth(today)) || showMonthPicker}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-udanix-blue hover:bg-white transition-all disabled:opacity-0 disabled:pointer-events-none border border-transparent hover:border-slate-100"
                      title="Jump to today"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button 
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="flex items-center gap-2 group"
                  >
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] group-hover:text-udanix-blue transition-colors">
                      {format(viewMonth, 'MMMM yyyy')}
                    </h3>
                    <ChevronRight className={cn("w-3 h-3 text-slate-400 group-hover:text-udanix-blue transition-all", showMonthPicker ? "rotate-90" : "")} />
                  </button>

                  <button
                    onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                    disabled={showMonthPicker}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white transition-all border border-transparent hover:border-slate-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {showMonthPicker ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-x-4 top-14 bottom-4 bg-white/90 backdrop-blur-md rounded-xl z-20 p-4 border border-slate-100 shadow-xl overflow-y-auto scrollbar-hide"
                    >
                      <div className="grid grid-cols-3 gap-2 pb-4">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const m = addMonths(startOfMonth(today), i);
                          const isSelected = isSameDay(startOfMonth(m), startOfMonth(viewMonth));
                          const showYearHeader = i === 0 || m.getFullYear() !== addMonths(startOfMonth(today), i - 1).getFullYear();
                          
                          return (
                            <div key={i} className={cn("contents", showYearHeader && "col-span-3")}>
                              {showYearHeader && (
                                <div className="col-span-3 py-2 px-1 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                  {m.getFullYear()}
                                  <div className="h-px flex-1 bg-slate-100" />
                                </div>
                              )}
                              <button
                                onClick={() => handleMonthSelect(i)}
                                className={cn(
                                  "h-12 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                  isSelected 
                                    ? "bg-udanix-blue text-white shadow-lg" 
                                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                                )}
                              >
                                {format(m, 'MMM')}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {/* Day-of-week labels */}
                      <div className="grid grid-cols-7 text-center">
                        {DAYS_OF_WEEK.map((d) => (
                          <span key={d} className="text-[9px] font-black text-slate-300 uppercase tracking-widest py-1">{d}</span>
                        ))}
                      </div>

                      {/* Date grid */}
                      <div className="grid grid-cols-7 gap-y-1">
                        {calGrid.map((day, idx) => {
                          if (!day) return <div key={idx} />;

                          const isPast        = isBefore(day, today);
                          const isSelected    = selectedDate ? isSameDay(day, selectedDate) : false;
                          const isTodayDate   = isToday(day);
                          const isCurrentMo   = day.getMonth() === viewMonth.getMonth();

                          return (
                            <button
                              key={idx}
                              onClick={() => handleDateClick(day)}
                              disabled={isPast}
                              className={`
                                mx-auto w-9 h-9 rounded-xl text-xs font-bold transition-all
                                ${isSelected
                                  ? 'bg-udanix-blue text-white shadow-lg shadow-blue-500/25 scale-105'
                                  : isTodayDate && !isSelected
                                  ? 'bg-udanix-blue/10 text-udanix-blue border border-udanix-blue/20'
                                  : isPast
                                  ? 'text-slate-200 cursor-not-allowed'
                                  : isCurrentMo
                                  ? 'text-slate-700 hover:bg-white hover:shadow-sm hover:text-udanix-blue'
                                  : 'text-slate-300 hover:bg-white hover:text-slate-500'
                                }
                              `}
                            >
                              {format(day, 'd')}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ─── Time Slots ─── */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {selectedDate ? `Slots for ${format(selectedDate, 'MMM do')}` : 'Select a date first'}
                  </label>
                  <Badge variant="outline" className="text-[9px] border-slate-100 text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> GMT +5:30
                  </Badge>
                </div>

                <div className={`grid grid-cols-3 gap-2 transition-opacity ${!selectedDate || showMonthPicker ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={!selectedDate}
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
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl group"
                disabled={!selectedDate || !selectedSlot || showMonthPicker}
                onClick={() => setStep('confirm')}
              >
                Continue to Details
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {/* ── STEP 2: Confirm + Topic ── */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-7 space-y-5"
            >
              <button
                onClick={() => setStep('pick')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-[10px] font-bold uppercase tracking-widest"
              >
                <ArrowLeft className="w-3 h-3" /> Change Date
              </button>

              <div className="space-y-1">
                <DialogTitle className="text-2xl font-bold tracking-tight">Session Details</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">Add a topic so your counselor can prepare.</DialogDescription>
              </div>

              {/* Booking summary card */}
              <div className="p-5 rounded-2xl bg-udanix-blue text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <CalendarIcon className="w-24 h-24" />
                </div>
                <div className="flex justify-between items-start relative z-10 mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Counselor</p>
                    <h4 className="text-lg font-bold">{counselorName}</h4>
                  </div>
                  <Badge className="bg-white/20 backdrop-blur-md border-none text-white font-bold text-[10px]">60 MIN</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Date</p>
                    <p className="text-sm font-bold">{selectedDate ? format(selectedDate, 'MMM do, yyyy') : '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Time</p>
                    <p className="text-sm font-bold">{selectedSlot}</p>
                  </div>
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">
                  Session Topic <span className="text-slate-300 normal-case font-medium">(optional)</span>
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
                className="w-full h-12 bg-udanix-blue hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/20"
                onClick={handleBook}
                disabled={isBooking}
              >
                {isBooking ? 'Booking...' : 'Confirm & Book Session'}
              </Button>
            </motion.div>
          )}

          {/* ── STEP 3: Success ── */}
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
                  Session with <strong>{counselorName}</strong><br />
                  <span className="text-udanix-blue font-bold">
                    {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : ''} · {selectedSlot}
                  </span>
                  <br />is confirmed.
                </p>
              </div>
              <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold" onClick={() => setOpen(false)}>
                Done
              </Button>
            </motion.div>
          )}

        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
