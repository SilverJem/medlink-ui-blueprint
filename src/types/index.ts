
export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient extends User {
  role: 'patient';
  documents?: Document[];
  recentDoctors?: Doctor[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  fee: number;
  rating: number;
  availability?: Availability[];
  qualifications?: string[];
}

export interface Admin extends User {
  role: 'admin';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: 'regular' | 'emergency';
  notes?: string;
}

export interface Availability {
  day: string;
  slots: {
    start: string;
    end: string;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
  type: 'appointment' | 'message' | 'system';
}
