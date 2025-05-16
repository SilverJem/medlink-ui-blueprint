
import { useState } from 'react';
import { Calendar, Users, Clock, BarChart3, MessageSquare, FilePlus, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const todayAppointments = [
  {
    id: '1',
    patient: 'John Doe',
    time: '10:30 AM',
    type: 'Video Consultation',
    status: 'upcoming',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: '2',
    patient: 'Emily Johnson',
    time: '11:45 AM',
    type: 'In-person',
    status: 'upcoming',
    avatar: 'https://i.pravatar.cc/150?img=45'
  },
  {
    id: '3',
    patient: 'Robert Wilson',
    time: '1:15 PM',
    type: 'Video Consultation',
    status: 'upcoming',
    avatar: 'https://i.pravatar.cc/150?img=67'
  },
];

const messages = [
  {
    id: '1',
    patient: 'Michael Brown',
    message: 'Dr. Smith, I have a question about my medication...',
    time: '9:45 AM',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?img=53'
  },
  {
    id: '2',
    patient: 'Sarah Davis',
    message: 'Thank you for the prescription. When should I...',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?img=25'
  }
];

const consultationMetrics = {
  today: 5,
  week: 23,
  month: 78,
  revenue: {
    today: 750,
    week: 3400,
    month: 11700
  },
  ratings: 4.8
};

const DoctorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  return (
    <div className="container px-4 py-6 md:px-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Dr. Smith</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="available">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available" className="text-green-500">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="away">Away</SelectItem>
            </SelectContent>
          </Select>
          <Button>Start Consultation</Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-medlink-blue to-medlink-blue/80 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Stethoscope className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">Start Consultation</h3>
            <p className="text-sm opacity-85 mb-4">Begin video call</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20">
              Start Now
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-medlink-teal to-medlink-teal/80 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <MessageSquare className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">View Messages</h3>
            <p className="text-sm opacity-85 mb-4">Check patient messages</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20">
              Open Inbox
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-medlink-orange to-medlink-orange/80 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <FilePlus className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">Write Prescription</h3>
            <p className="text-sm opacity-85 mb-4">Create new prescription</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20">
              Create New
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-400 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Calendar className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">Manage Schedule</h3>
            <p className="text-sm opacity-85 mb-4">Update availability</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Day Schedule */}
          <Card className="dashboard-section">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-medlink-blue" />
                  Today's Schedule
                </CardTitle>
                <div className="flex gap-2">
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto px-3 py-1 text-sm rounded-md border"
                  />
                </div>
              </div>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex gap-4">
                    <div className="text-center min-w-[45px]">
                      <div className="text-lg font-medium">5</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center min-w-[45px]">
                      <div className="text-lg font-medium text-green-500">3</div>
                      <div className="text-xs text-muted-foreground">Upcoming</div>
                    </div>
                    <div className="text-center min-w-[45px]">
                      <div className="text-lg font-medium text-blue-500">1</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center min-w-[45px]">
                      <div className="text-lg font-medium text-red-500">1</div>
                      <div className="text-xs text-muted-foreground">Cancelled</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-muted flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    10:15 AM
                  </Badge>
                </div>

                {todayAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-center w-16">
                      <div className="text-sm font-medium">{appointment.time}</div>
                      <div className="text-xs text-muted-foreground">{appointment.type === 'Video Consultation' ? 'Video' : 'In-person'}</div>
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>{appointment.patient.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Start</Button>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-3 border-t">
                  <Button variant="ghost">View Full Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Messages */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-medlink-blue" />
                  Recent Messages
                </CardTitle>
                <Badge variant="outline">{messages.filter(m => m.unread).length} new</Badge>
              </div>
              <CardDescription>Patient inquiries and follow-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg ${message.unread ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-medlink-blue' : 'hover:bg-muted/50 border'}`}>
                    <div className="flex gap-3 items-start">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>{message.patient.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className={`font-medium ${message.unread ? 'text-medlink-blue' : ''}`}>
                            {message.patient}
                            {message.unread && <span className="inline-block h-2 w-2 rounded-full bg-medlink-blue ml-2"></span>}
                          </p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant={message.unread ? "default" : "outline"}>Reply</Button>
                          {message.unread && <Button size="sm" variant="ghost">Mark Read</Button>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-3 border-t">
                  <Button variant="ghost">View All Messages</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Metrics & Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-medlink-blue" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="consultations">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="consultations" className="flex-1">Consultations</TabsTrigger>
                  <TabsTrigger value="revenue" className="flex-1">Revenue</TabsTrigger>
                </TabsList>
                <TabsContent value="consultations">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">{consultationMetrics.today}</div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">{consultationMetrics.week}</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">{consultationMetrics.month}</div>
                      <div className="text-xs text-muted-foreground">This Month</div>
                    </div>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-40 bg-muted rounded-lg flex items-center justify-center mb-3">
                    <p className="text-muted-foreground">Consultation Chart</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Patient Rating</div>
                      <div className="font-medium flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        {consultationMetrics.ratings}
                        <span className="text-xs text-muted-foreground ml-1">(43 reviews)</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </TabsContent>
                <TabsContent value="revenue">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">${consultationMetrics.revenue.today}</div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">${consultationMetrics.revenue.week}</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">${consultationMetrics.revenue.month}</div>
                      <div className="text-xs text-muted-foreground">This Month</div>
                    </div>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-40 bg-muted rounded-lg flex items-center justify-center mb-3">
                    <p className="text-muted-foreground">Revenue Chart</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Next Payout</div>
                      <div className="font-medium">$1,240.00 (June 15)</div>
                    </div>
                    <Button variant="ghost" size="sm">Payment History</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="h-5 w-5 mr-2 text-medlink-blue" />
                Recent Patients
              </CardTitle>
              <CardDescription>Patients you've recently consulted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=33" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Last visit: Today</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=45" />
                    <AvatarFallback>EJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Emily Johnson</p>
                    <p className="text-xs text-muted-foreground">Last visit: Yesterday</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=53" />
                    <AvatarFallback>MB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-xs text-muted-foreground">Last visit: Jun 10, 2023</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              <div className="pt-3 text-center">
                <Button variant="link" size="sm">View All Patients</Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Resources */}
          <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-xl">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white dark:bg-card rounded-lg shadow-sm">
                <h4 className="font-medium">New COVID-19 Guidelines</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  CDC has updated treatment protocols. Read now.
                </p>
                <Button variant="link" className="p-0 mt-2 h-auto text-xs">View Guidelines</Button>
              </div>
              <div className="p-3 bg-white dark:bg-card rounded-lg shadow-sm">
                <h4 className="font-medium">Medical Conference</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Annual Cardiology Summit - Jul 15, 2023
                </p>
                <Button variant="link" className="p-0 mt-2 h-auto text-xs">Register Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
