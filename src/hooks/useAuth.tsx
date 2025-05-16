
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = {
  patient: {
    id: 'p1',
    name: 'John Doe',
    email: 'patient@example.com',
    role: 'patient' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  doctor: {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    email: 'doctor@example.com',
    role: 'doctor' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=5',
    specialty: 'Cardiology',
    fee: 150,
    rating: 4.8
  },
  admin: {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=7'
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, we would call an API to authenticate
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock login based on role
        if (role === 'patient') {
          setUser(MOCK_USERS.patient);
        } else if (role === 'doctor') {
          setUser(MOCK_USERS.doctor);
        } else if (role === 'admin') {
          setUser(MOCK_USERS.admin);
        }
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, we would call an API to register the user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          role,
          avatar: `https://i.pravatar.cc/150?u=${email}`
        };
        setUser(newUser);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
