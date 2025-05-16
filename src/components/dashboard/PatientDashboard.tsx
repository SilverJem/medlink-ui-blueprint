
import { Calendar, FileText, Clock, Search, CalendarPlus, Ambulance, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

// Mock data
const upcomingAppointments = [
  {
    id: '1',
    doctor: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    date: '2023-06-15',
    time: '10:30 AM',
    avatar: 'https://i.pravatar.cc/150?img=28'
  },
  {
    id: '2',
    doctor: 'Dr. Michael Johnson',
    specialty: 'Dermatology',
    date: '2023-06-18',
    time: '2:00 PM',
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
];

const recentDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    avatar: 'https://i.pravatar.cc/150?img=28',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Michael Johnson',
    specialty: 'Dermatology',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.6
  },
  {
    id: '3',
    name: 'Dr. Lisa Wong',
    specialty: 'Pediatrics',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.9
  }
];

const documents = [
  {
    id: '1',
    name: 'Blood Test Results',
    date: '2023-05-28',
    type: 'PDF'
  },
  {
    id: '2',
    name: 'X-Ray Report',
    date: '2023-04-15',
    type: 'Image'
  },
  {
    id: '3',
    name: 'Prescription',
    date: '2023-06-01',
    type: 'PDF'
  }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const PatientDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container px-4 py-6 md:px-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your health</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search doctors, specialties..." 
              className="pl-9 w-full md:w-64"
            />
          </div>
          <Button onClick={() => navigate('/booking')}>
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-medlink-blue to-medlink-blue/80 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <CalendarPlus className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">Book Appointment</h3>
            <p className="text-sm opacity-85 mb-4">Schedule a visit with a doctor</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20" onClick={() => navigate('/booking')}>
              Book Now
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-medlink-orange to-medlink-orange/80 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Ambulance className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">Emergency Consult</h3>
            <p className="text-sm opacity-85 mb-4">Connect with a doctor ASAP</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20" onClick={() => navigate('/emergency')}>
              Connect Now
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-medlink-teal to-medlink-teal/80 text-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Upload className="h-8 w-8 mb-2" />
            <h3 className="font-semibold text-lg">Upload Document</h3>
            <p className="text-sm opacity-85 mb-4">Add medical records</p>
            <Button variant="outline" size="sm" className="text-white bg-transparent border-white hover:bg-white/20">
              Upload Files
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <Card className="dashboard-section">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-medlink-blue" />
                  Upcoming Appointments
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <CardDescription>Your scheduled consultations with doctors</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    </div>
                    <div className="hidden md:block text-right">
                      <Badge variant="outline" className="bg-muted">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(appointment.date)}
                      </p>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <Button variant="link" onClick={() => navigate('/booking')}>
                    Book an appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Health Records */}
          <Card className="dashboard-section">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-medlink-blue" />
                  Health Records
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <CardDescription>Your medical documents and history</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="documents">
                <TabsList className="mb-4">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="reports">Lab Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="documents">
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                        <div className="bg-muted p-2 rounded">
                          <FileText className="h-5 w-5 text-medlink-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(doc.date)}</p>
                        </div>
                        <Badge>{doc.type}</Badge>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4" onClick={() => null}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Document
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="prescriptions">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-40" />
                    <p className="mt-2 text-muted-foreground">No active prescriptions</p>
                  </div>
                </TabsContent>
                <TabsContent value="reports">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-40" />
                    <p className="mt-2 text-muted-foreground">No recent lab reports</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Health Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Health Status</CardTitle>
              <CardDescription>Your health metrics and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Heart Health</span>
                    <span className="text-sm font-medium text-medlink-blue">Good</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Activity Level</span>
                    <span className="text-sm font-medium text-yellow-500">Moderate</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sleep Quality</span>
                    <span className="text-sm font-medium text-green-500">Excellent</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                
                <Button variant="outline" className="w-full text-sm mt-2">
                  View Complete Health Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Doctors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Doctors</CardTitle>
              <CardDescription>Healthcare professionals you've consulted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDoctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={doctor.avatar} />
                    <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs p-0 h-auto underline">
                      Book again
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/booking')}>
                Find More Specialists
              </Button>
            </CardContent>
          </Card>

          {/* Health Tips */}
          <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-xl">Health Tips</CardTitle>
              <CardDescription>Personalized for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-white dark:bg-card rounded-lg shadow-sm mb-3">
                <h4 className="font-medium">Stay Hydrated</h4>
                <p className="text-sm text-muted-foreground">
                  Remember to drink 8 glasses of water daily for optimal health.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-card rounded-lg shadow-sm">
                <h4 className="font-medium">Time for Exercise</h4>
                <p className="text-sm text-muted-foreground">
                  Even a 20-minute daily walk can significantly improve your cardiovascular health.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
