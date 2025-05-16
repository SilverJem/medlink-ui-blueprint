
import { BarChart3, Users, FileCheck, AlertCircle, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data
const platformMetrics = {
  totalUsers: 8542,
  totalDoctors: 316,
  totalPatients: 8226,
  activeConsultations: 124,
  pendingVerifications: 28,
  ticketsOpen: 17,
  revenue: {
    total: 254780,
    thisMonth: 42500,
    lastMonth: 38750
  }
};

const recentDoctorApplications = [
  {
    id: '1',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    date: '2023-06-14',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pediatrics',
    date: '2023-06-13',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?img=32'
  }
];

const ticketsList = [
  {
    id: '1',
    user: 'Emily Johnson',
    subject: 'Payment issue with appointment #12345',
    date: '2023-06-14',
    priority: 'high',
    status: 'open',
    avatar: 'https://i.pravatar.cc/150?img=45'
  },
  {
    id: '2',
    user: 'Dr. Michael Stevens',
    subject: 'Cannot access patient records',
    date: '2023-06-13',
    priority: 'medium',
    status: 'open',
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
];

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>
      </div>

      {/* Bento box layout for stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{formatNumber(platformMetrics.totalUsers)}</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-blue-300">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center text-sm mt-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{formatNumber(platformMetrics.totalDoctors)}</span>
                  <span className="text-muted-foreground ml-1">Doctors</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{formatNumber(platformMetrics.totalPatients)}</span>
                  <span className="text-muted-foreground ml-1">Patients</span>
                </div>
              </div>
            </div>
            <Progress value={(platformMetrics.totalDoctors / platformMetrics.totalUsers) * 100} className="mt-2 h-1" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Consultations</p>
                <h3 className="text-2xl font-bold mt-1">{platformMetrics.activeConsultations}</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mt-4">
              <Badge className="bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300 hover:bg-green-200">Live Now</Badge>
              <div className="text-muted-foreground">94 video · 30 chat</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Doctor Verifications</p>
                <h3 className="text-2xl font-bold mt-1">{platformMetrics.pendingVerifications}</h3>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-full text-yellow-600 dark:text-yellow-300">
                <FileCheck className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center text-sm mt-4">
              <div className="text-muted-foreground">
                Applications awaiting review
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Support Tickets</p>
                <h3 className="text-2xl font-bold mt-1">{platformMetrics.ticketsOpen}</h3>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-800 rounded-full text-red-600 dark:text-red-300">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mt-4">
              <Badge className="bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300 hover:bg-red-200">6 High Priority</Badge>
              <div className="text-muted-foreground">Requires attention</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and recent activity section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 bg-white dark:bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                Revenue Overview
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4 bg-muted rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-3xl font-bold">${formatNumber(platformMetrics.revenue.total)}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">This Month</span>
                  <span className="text-sm font-medium">${formatNumber(platformMetrics.revenue.thisMonth)}</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Last Month</span>
                  <span className="text-sm font-medium">${formatNumber(platformMetrics.revenue.lastMonth)}</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full" size="sm">
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-white dark:bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-yellow-500" />
              Pending Verifications
            </CardTitle>
            <CardDescription>Recent doctor applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDoctorApplications.map((application) => (
                <div key={application.id} className="flex gap-3 p-3 border rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={application.avatar} />
                    <AvatarFallback>{application.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{application.name}</p>
                        <p className="text-sm text-muted-foreground">{application.specialty}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-400 hover:bg-yellow-200">
                        {application.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        Applied on {formatDate(application.date)}
                      </p>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-3">
                <Button variant="outline" className="w-full" size="sm">
                  View All Applications
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 bg-white dark:bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Support Tickets
            </CardTitle>
            <CardDescription>Recent issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketsList.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className={`p-3 border rounded-lg ${
                    ticket.priority === 'high' ? 'border-l-2 border-l-red-500' : 
                    ticket.priority === 'medium' ? 'border-l-2 border-l-amber-500' : 
                    ''
                  }`}
                >
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={ticket.avatar} />
                      <AvatarFallback>{ticket.user.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{ticket.user}</p>
                        <Badge className={`
                          ${ticket.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-400' : 
                            ticket.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-700/30 dark:text-amber-400' : 
                            'bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400'}
                          `
                        }>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm line-clamp-1">{ticket.subject}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          Opened on {formatDate(ticket.date)}
                        </p>
                        <Button size="sm" variant="outline">Handle</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-3">
                <Button variant="outline" className="w-full" size="sm">
                  View All Tickets
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Button variant="outline">Generate Reports</Button>
        <Button>System Settings</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
