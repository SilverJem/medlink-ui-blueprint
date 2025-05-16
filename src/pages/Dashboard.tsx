
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import AdminLayout from '@/components/layout/AdminLayout';
import PatientDashboard from '@/components/dashboard/PatientDashboard';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, show a message and a button to login
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground text-lg mb-6">
            You need to be logged in to view this dashboard.
          </p>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </Layout>
    );
  }

  // For admin, use the AdminLayout
  if (user?.role === 'admin') {
    return (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );
  }

  // For other roles, use the normal layout
  return (
    <Layout>
      {user?.role === 'patient' && <PatientDashboard />}
      {user?.role === 'doctor' && <DoctorDashboard />}
    </Layout>
  );
};

export default Dashboard;
