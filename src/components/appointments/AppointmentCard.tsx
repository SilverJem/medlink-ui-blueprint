
import { Calendar, Clock, Video, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar?: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: 'video' | 'in-person';
  className?: string;
  hideActions?: boolean;
  onClick?: () => void;
}

const AppointmentCard = ({
  id,
  doctorName,
  doctorSpecialty,
  doctorAvatar,
  date,
  time,
  status,
  type,
  className,
  hideActions = false,
  onClick
}: AppointmentCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const getStatusColor = () => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in-progress':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md", 
        status === 'cancelled' && "opacity-75",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Card header with status */}
        <div className="flex justify-between items-center px-4 py-2 bg-muted/50">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <Badge className={getStatusColor()}>
            {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        {/* Main content */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={doctorAvatar} alt={doctorName} />
              <AvatarFallback>{getInitials(doctorName)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{doctorName}</h3>
              <p className="text-sm text-muted-foreground">{doctorSpecialty}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{time}</span>
                </div>
                <div className="flex items-center">
                  {type === 'video' ? (
                    <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                  ) : (
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                  )}
                  <span className="text-sm">
                    {type === 'video' ? 'Video Call' : 'In-person'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          {!hideActions && (
            <div className="flex gap-2 mt-4">
              {(status === 'scheduled' || status === 'in-progress') && (
                <>
                  <Button 
                    className="flex-1" 
                    disabled={status === 'cancelled' || status === 'completed'}
                  >
                    {status === 'in-progress' ? 'Join Now' : 'Start'}
                  </Button>
                  {status === 'scheduled' && (
                    <Button variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                  )}
                </>
              )}
              {status === 'completed' && (
                <Button variant="outline" className="flex-1">
                  View Summary
                </Button>
              )}
              {status === 'cancelled' && (
                <Button variant="outline" className="flex-1">
                  Book Again
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
