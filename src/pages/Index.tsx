
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Calendar, Video, Stethoscope, FileText, ShieldCheck 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Index = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medlink-blue to-blue-700 text-white py-20 lg:py-32">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter animate-fade-in">
                Healthcare at Your Fingertips
              </h1>
              <p className="text-xl text-blue-100 max-w-lg mx-auto lg:mx-0 animate-fade-in">
                Connect with verified healthcare professionals for virtual consultations, appointment booking, and secure medical record sharing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
                <Button 
                  size="lg"
                  className="bg-white text-medlink-blue hover:bg-blue-50"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                alt="Doctor with patient" 
                className="rounded-2xl shadow-2xl animate-fade-in"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse-soft"></span>
                  <p className="font-medium text-gray-900">325+ Doctors Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-8 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              MedLink brings modern healthcare solutions to your fingertips with our all-in-one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-border medlink-card card-hover-effect">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-medlink-blue/10 text-medlink-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
                <p className="text-muted-foreground">
                  Book appointments with specialists based on availability, specialty, and ratings.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border medlink-card card-hover-effect">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-medlink-teal/10 text-medlink-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Video Consultations</h3>
                <p className="text-muted-foreground">
                  Connect with healthcare professionals through secure, high-quality video calls.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border medlink-card card-hover-effect">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-medlink-orange/10 text-medlink-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
                <p className="text-muted-foreground">
                  Store, share, and access your medical records securely in one place.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Everyone</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              MedLink provides specialized interfaces for patients, doctors, and administrators.
            </p>
          </div>
          
          <Tabs defaultValue="patient" value={role} onValueChange={(value) => setRole(value as any)}>
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger value="patient">Patients</TabsTrigger>
              <TabsTrigger value="doctor">Doctors</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
            </TabsList>
            
            <div className="max-w-6xl mx-auto">
              <TabsContent value="patient" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    <div className="inline-block p-2 rounded-lg bg-purple-100 text-purple-600 mb-2">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">For Patients</h3>
                    <p className="text-muted-foreground">
                      Access quality healthcare from home, book appointments with specialists, and manage your medical records.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-blue"></span>
                        <span>Book appointments with ease</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-blue"></span>
                        <span>Video consultations from anywhere</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-blue"></span>
                        <span>Emergency care access</span>
                      </li>
                    </ul>
                    <Button onClick={() => navigate('/signup')}>Create Patient Account</Button>
                  </div>
                  <div className="md:col-span-2">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                      alt="Patient using MedLink" 
                      className="rounded-xl shadow-lg w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="doctor" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    <div className="inline-block p-2 rounded-lg bg-blue-100 text-blue-600 mb-2">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">For Doctors</h3>
                    <p className="text-muted-foreground">
                      Expand your practice with virtual consultations, manage your schedule, and access patient information securely.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-teal"></span>
                        <span>Streamlined appointment management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-teal"></span>
                        <span>Secure patient record access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-teal"></span>
                        <span>Prescription generation tools</span>
                      </li>
                    </ul>
                    <Button onClick={() => navigate('/signup')}>Join as a Doctor</Button>
                  </div>
                  <div className="md:col-span-2">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                      alt="Doctor using MedLink" 
                      className="rounded-xl shadow-lg w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="admin" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    <div className="inline-block p-2 rounded-lg bg-amber-100 text-amber-600 mb-2">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">For Administrators</h3>
                    <p className="text-muted-foreground">
                      Monitor platform activity, manage users, verify doctor credentials, and handle support tickets.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-orange"></span>
                        <span>Comprehensive analytics dashboard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-orange"></span>
                        <span>User management tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-medlink-orange"></span>
                        <span>Doctor verification system</span>
                      </li>
                    </ul>
                    <Button onClick={() => navigate('/contact')}>Contact for Access</Button>
                  </div>
                  <div className="md:col-span-2">
                    <img 
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
                      alt="Admin dashboard" 
                      className="rounded-xl shadow-lg w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-medlink-blue/90 to-blue-700 text-white">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Modern Healthcare?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of patients and healthcare providers on MedLink. Sign up today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-medlink-blue hover:bg-blue-50"
                onClick={() => navigate('/signup')}
              >
                Create Account
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/20"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
