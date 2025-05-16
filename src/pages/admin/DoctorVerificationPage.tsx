
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DoctorVerificationPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Doctor Verification</h1>
        <p className="text-muted-foreground">Review and verify doctor applications.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Doctor verification functionality will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DoctorVerificationPage;
