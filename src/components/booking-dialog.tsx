'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { createCalendarEvent, getAvailableSlots } from "@/lib/calendar/google";

interface BookingDialogProps {
  counselorName: string;
  trigger?: React.ReactNode;
}

export function BookingDialog({ counselorName, trigger }: BookingDialogProps) {
  const [step, setStep] = useState<'pick' | 'confirm' | 'success'>('pick');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const slots = getAvailableSlots(selectedDate);

  const handleBook = async () => {
    if (!selectedSlot) return;
    
    setIsBooking(true);
    
    // Simulate end time 1 hour later
    const startTime = new Date(selectedDate);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    
    await createCalendarEvent({
      counselorName,
      studentName: 'John Doe', // Mock current user
      startTime,
      endTime,
      type: 'Initial Consultation'
    });

    setIsBooking(false);
    setStep('success');
  };

  const reset = () => {
    setStep('pick');
    setSelectedSlot(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        {trigger || <Button size="sm">Book Session</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        {step === 'pick' && (
          <>
            <DialogHeader>
              <DialogTitle>Schedule a Session</DialogTitle>
              <DialogDescription>
                Pick a date and time for your meeting with {counselorName}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? "default" : "outline"}
                      className={`text-xs h-9 ${selectedSlot === slot ? 'bg-blue-600' : 'border-slate-200'}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{format(selectedDate, "PPP")}</span>
                </div>
                <Button variant="link" size="sm" className="text-blue-600 text-xs">Change Date</Button>
              </div>
            </div>
            <DialogFooter>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={!selectedSlot}
                onClick={() => setStep('confirm')}
              >
                Continue to Payment
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'confirm' && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                Review your session details before confirming.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 space-y-4">
              <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-900">{counselorName}</h4>
                    <p className="text-xs text-slate-500 italic">Initial Consultation</p>
                  </div>
                  <Badge className="bg-blue-600">60 min</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{format(selectedDate, "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{selectedSlot}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                By confirming, a Google Calendar invite will be sent to both parties. 
                Cancellations must be made 24 hours in advance.
              </p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="ghost" onClick={() => setStep('pick')} className="flex-1">Back</Button>
              <Button 
                className="flex-[2] bg-blue-600 hover:bg-blue-700" 
                onClick={handleBook}
                disabled={isBooking}
              >
                {isBooking ? 'Processing...' : 'Confirm & Sync Calendar'}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'success' && (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-slate-900">Session Scheduled!</h3>
              <p className="text-slate-500 text-sm max-w-[280px]">
                A Google Calendar event has been created. You can find the link in your dashboard.
              </p>
            </div>
            <Button variant="outline" className="w-full max-w-[200px]" onClick={() => reset()}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
