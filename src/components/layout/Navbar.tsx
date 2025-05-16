
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex justify-between items-center py-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-medlink-blue">
            Med<span className="text-medlink-teal">Link</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Dashboard
              </Link>
              <Link to="/booking" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Book Appointment
              </Link>
              <Link to="/emergency" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Emergency
              </Link>
              <Link to="/consult" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Consult
              </Link>
              <Link to="/profile" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/about" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                About
              </Link>
              <Link to="/services" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Services
              </Link>
              <Link to="/contact" className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200">
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Right Side - Notifications, Theme, Profile */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-medlink-orange" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex justify-between items-center px-4 py-2 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm">Mark all as read</Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-muted cursor-pointer">
                      <p className="text-sm font-medium">Your appointment has been confirmed</p>
                      <p className="text-xs text-muted-foreground mt-1">Dr. Sarah Smith - Today, 2:30 PM</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-muted cursor-pointer">
                      <p className="text-sm font-medium">New message from Dr. Rodriguez</p>
                      <p className="text-xs text-muted-foreground mt-1">Check your medical results - Yesterday</p>
                    </div>
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="mr-2 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-medlink-orange" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="flex flex-col space-y-1 p-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/emergency"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Emergency
                </Link>
                <Link
                  to="/consult"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Consult
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Profile
                </Link>
                <hr className="my-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="justify-start"
                >
                  {isDarkMode ? (
                    <><Sun className="h-4 w-4 mr-2" /> Light Mode</>
                  ) : (
                    <><Moon className="h-4 w-4 mr-2" /> Dark Mode</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="justify-start"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                >
                  Contact
                </Link>
                <hr className="my-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="justify-start"
                >
                  {isDarkMode ? (
                    <><Sun className="h-4 w-4 mr-2" /> Light Mode</>
                  ) : (
                    <><Moon className="h-4 w-4 mr-2" /> Dark Mode</>
                  )}
                </Button>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="outline" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>Login</Button>
                  <Button onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}>Sign Up</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
