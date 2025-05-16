
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  Settings, 
  Database,
  Bell,
  ChartBar,
  Shield
} from 'lucide-react';
import { 
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      title: "Dashboard",
      url: "/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      title: "User Management",
      url: "/admin/users", 
      icon: Users 
    },
    { 
      title: "Doctor Verification",
      url: "/admin/doctor-verification", 
      icon: FileCheck 
    },
    { 
      title: "Analytics",
      url: "/admin/analytics", 
      icon: ChartBar 
    },
    { 
      title: "Support Tickets",
      url: "/admin/support", 
      icon: Bell 
    },
    { 
      title: "System Health",
      url: "/admin/system", 
      icon: Database 
    },
    { 
      title: "Security",
      url: "/admin/security", 
      icon: Shield 
    },
    { 
      title: "Settings",
      url: "/admin/settings", 
      icon: Settings 
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <img 
                  src="/lovable-uploads/1ede53fa-3bfe-4a63-95e2-6b59f5ac6731.png" 
                  alt="MedLink Logo" 
                  className="w-32 h-auto"
                />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Admin Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          tooltip={item.title}
                          isActive={location.pathname === item.url}
                          onClick={() => navigate(item.url)}
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="p-2 text-xs text-center text-muted-foreground">
                MedLink Admin Panel v1.0
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1">
            <main className="flex-1 p-4 md:p-6 container">{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
