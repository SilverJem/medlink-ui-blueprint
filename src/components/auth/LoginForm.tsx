
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, User, ShieldCheck, Loader2 } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password, role);
      toast({
        title: 'Success',
        description: 'You have been logged in successfully',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Login failed. Please check your credentials.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as UserRole);
  };

  // For demo purposes - prefill credentials based on role
  const fillDemoCredentials = () => {
    if (role === 'patient') {
      setEmail('patient@example.com');
      setPassword('password');
    } else if (role === 'doctor') {
      setEmail('doctor@example.com');
      setPassword('password');
    } else {
      setEmail('admin@example.com');
      setPassword('password');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login to MedLink</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="patient" onValueChange={handleRoleChange}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="patient" className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Patient</span>
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center justify-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  <span className="hidden sm:inline">Doctor</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="patient">
                <p className="text-sm text-muted-foreground mb-4">
                  Access your medical history, book appointments, and consult with doctors.
                </p>
              </TabsContent>
              <TabsContent value="doctor">
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your schedule, consult with patients, and access medical records.
                </p>
              </TabsContent>
              <TabsContent value="admin">
                <p className="text-sm text-muted-foreground mb-4">
                  Oversee platform operations, manage users, and review analytics.
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" className="text-xs p-0 h-auto" asChild>
                  <a href="/forgot-password">Forgot password?</a>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full text-sm" 
              onClick={fillDemoCredentials}
            >
              Use demo credentials
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href="/signup">Create an account</a>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
