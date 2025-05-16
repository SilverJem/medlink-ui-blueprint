
import { BarChart3, Users, FileCheck, AlertCircle, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  },
  {
    id: '3',
    name: 'Dr. David Chen',
    specialty: 'Orthopedics',
    date: '2023-06-12',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?img=17'
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
  },
  {
    id: '3',
    user: 'Robert Wilson',
    subject: 'Appointment rescheduling problem',
    date: '2023-06-12',
    priority: 'low',
    status: 'open',
    avatar: 'https://i.pravatar.cc/150?img=67'
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
    <div className="container px-4 py-6 md:px-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Generate Reports</Button>
          <Button>System Settings</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{formatNumber(platformMetrics.totalUsers)}</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-medlink-blue">
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
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Consultations</p>
                <h3 className="text-2xl font-bold mt-1">{platformMetrics.activeConsultations}</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mt-4">
              <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">Live Now</Badge>
              <div className="text-muted-foreground">94 video · 30 chat</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Verifications</p>
                <h3 className="text-2xl font-bold mt-1">{platformMetrics.pendingVerifications}</h3>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
                <FileCheck className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center text-sm mt-4">
              <div className="text-muted-foreground">
                Doctor applications awaiting review
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Support Tickets</p>
                <h3 className="text-2xl font-bold mt-1">{platformMetrics.ticketsOpen}</h3>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mt-4">
              <Badge className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">6 High Priority</Badge>
              <div className="text-muted-foreground">Requires attention</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Financial Overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-medlink-blue" />
                  Revenue Overview
                </CardTitle>
                <Button variant="outline" size="sm">Export</Button>
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
              
              {/* Revenue breakdown */}
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium">Revenue Breakdown</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Regular Consultations</span>
                  <span>68%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Emergency Consultations</span>
                  <span>22%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fees</span>
                  <span>10%</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">View Detailed Report</Button>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Health</CardTitle>
              <CardDescription>Platform performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Server Uptime</span>
                    <span className="text-sm font-medium text-green-500">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">API Response Time</span>
                    <span className="text-sm font-medium text-amber-500">245ms</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm font-medium text-green-500">0.12%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">View System Logs</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle column - Doctor Verification */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileCheck className="h-5 w-5 mr-2 text-yellow-500" />
                Doctor Verification Queue
              </CardTitle>
              <CardDescription>Applications awaiting verification</CardDescription>
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
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-200">
                          {application.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          Applied on {formatDate(application.date)}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive">Reject</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-3">
                  <Button variant="outline" className="w-full">
                    View All Applications
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Activity className="h-5 w-5 mr-2 text-medlink-blue" />
                Platform Activity
              </CardTitle>
              <CardDescription>Live overview of platform usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Currently Active</h4>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-2xl font-bold">142</p>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">38</p>
                      <p className="text-xs text-muted-foreground">Doctors</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Live Consultations by Type</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Video Calls</span>
                      <span className="font-medium">94</span>
                    </div>
                    <Progress value={76} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Chat Sessions</span>
                      <span className="font-medium">30</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Peak Hours Today</h4>
                  {/* Mock chart */}
                  <div className="h-24 bg-muted rounded-lg flex items-end px-2 gap-1">
                    {[15, 25, 40, 65, 80, 70, 60, 50, 55, 70, 60, 45].map((value, i) => (
                      <div 
                        key={i} 
                        className="bg-medlink-blue h-full rounded-t" 
                        style={{height: `${value}%`, width: '100%'}}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                  </div>
                </div>
                
                <div className="text-center pt-3">
                  <Button variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Support Tickets */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Support Tickets
              </CardTitle>
              <CardDescription>User issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="open">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="open">Open ({platformMetrics.ticketsOpen})</TabsTrigger>
                  <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className="space-y-4">
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
                              ${ticket.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                ticket.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}
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
                            <Button size="sm">Handle</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-3">
                    <Button variant="outline" className="w-full">
                      View All Tickets
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="inProgress">
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No tickets currently in progress</p>
                  </div>
                </TabsContent>
                <TabsContent value="resolved">
                  <div className="text-center py-12 text-muted-foreground">
                    <p>All resolved tickets will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="h-5 w-5 mr-2 text-medlink-blue" />
                User Management
              </CardTitle>
              <CardDescription>Recent user activities and actions required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 mr-3">
                      Reported
                    </Badge>
                    <p className="font-medium">Dr. Thomas Gray</p>
                  </div>
                  <Button size="sm" variant="destructive">Review</Button>
                </div>
                
                <div className="flex justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 mr-3">
                      Suspended
                    </Badge>
                    <p className="font-medium">Jessica Williams</p>
                  </div>
                  <Button size="sm" variant="outline">Unsuspend</Button>
                </div>
                
                <div className="flex justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 mr-3">
                      New
                    </Badge>
                    <p className="font-medium">5 New Users Today</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                
                <div className="text-center pt-3">
                  <Button variant="outline" className="w-full">
                    Manage Users
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
