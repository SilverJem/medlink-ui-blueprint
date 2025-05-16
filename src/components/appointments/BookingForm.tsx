
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  fee: number;
}

interface BookingFormProps {
  doctor: Doctor;
  onBookingSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

export interface BookingFormData {
  doctorId: string;
  date: Date;
  time: string;
  notes: string;
}

const BookingForm = ({ doctor, onBookingSubmit, onCancel }: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Sample available time slots
  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      // Show error
      return;
    }
    
    onBookingSubmit({
      doctorId: doctor.id,
      date,
      time: selectedTime,
      notes
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Book an Appointment</CardTitle>
        <CardDescription>Schedule a consultation with {doctor.name}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Doctor info */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 mb-4">
          <Avatar>
            <AvatarImage src={doctor.avatar} />
            <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          </div>
          <div className="text-right">
            <Badge variant="secondary">${doctor.fee}</Badge>
            <p className="text-xs text-muted-foreground mt-1">per consultation</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date selector */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              Select Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date ? (
                    format(date, 'PPP')
                  ) : (
                    <span className="text-muted-foreground">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < today || day === 0 || day === 6;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Time selector */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="text-sm font-medium block mb-2">
              Add Notes (optional)
            </label>
            <Textarea
              id="notes"
              placeholder="Any specific concerns or questions for the doctor"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          {/* Total cost */}
          <div className="flex justify-between p-3 rounded-lg bg-muted/50">
            <span className="font-medium">Consultation Fee</span>
            <span className="font-medium">${doctor.fee}</span>
          </div>
          
          {/* Submit buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="flex-1" type="submit" disabled={!date || !selectedTime}>
              Confirm Booking
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
