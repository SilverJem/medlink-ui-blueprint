
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { UserRole } from '@/types';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters long',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      await signup(name, email, password, role);
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as UserRole);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your MedLink account</CardTitle>
          <CardDescription>
            Join MedLink to connect with healthcare professionals
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
                  Create a patient account to book appointments, consult with doctors, and manage your health records.
                </p>
              </TabsContent>
              <TabsContent value="doctor">
                <p className="text-sm text-muted-foreground mb-4">
                  Join as a healthcare professional to provide virtual consultations and manage your practice online.
                  <span className="block mt-1 text-xs">Note: Verification of medical credentials is required before approval.</span>
                </p>
              </TabsContent>
              <TabsContent value="admin">
                <p className="text-sm text-muted-foreground mb-4">
                  Admin accounts are for platform management and oversight. Special approval required.
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    <div className={`h-1 flex-1 rounded-full ${password.length > 0 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${password.length >= 4 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {password.length >= 8 
                      ? 'Strong password' 
                      : password.length >= 4 
                        ? 'Moderate password' 
                        : 'Weak password'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {role === 'doctor' && (
              <div className="space-y-2 p-3 bg-muted rounded-md">
                <Label htmlFor="qualification">Medical Qualification</Label>
                <Input
                  id="qualification"
                  placeholder="E.g., MD, Cardiologist"
                  required={role === 'doctor'}
                />
                <div className="mt-2">
                  <Label htmlFor="licenseUpload">Upload Medical License</Label>
                  <Input id="licenseUpload" type="file" className="mt-1" required={role === 'doctor'} />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload your medical license or credentials (PDF or image, max 5MB)
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-2 pt-2">
              <input id="terms" type="checkbox" className="mt-1" required />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{' '}
                <a href="/terms" className="text-medlink-blue hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-medlink-blue hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href="/login">Sign in</a>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
