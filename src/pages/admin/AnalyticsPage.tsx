
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Platform activity and usage metrics.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Detailed analytics will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
