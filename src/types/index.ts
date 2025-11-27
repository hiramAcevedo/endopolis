// src/types/index.ts

export type UserRole = "PATIENT" | "ADMIN";

export type ServiceType =
  | "CONSULTA_GASTRO"
  | "CONSULTA_NUTRICION"
  | "ENDOSCOPIA"
  | "COLONOSCOPIA";

export type ServiceCategory = "CONSULTA" | "PROCEDIMIENTO";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type AppointmentMode = "DISABLED" | "AUTO_ACCEPT" | "MANUAL_CONFIRM";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  address?: string | null;
  weight?: number | null;
  height?: number | null;
  chronicDiseases?: string | null;
  userId?: number | null;
  caregiverId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Caregiver {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  relationship?: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Professional {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  specialty: string;
  photoUrl?: string | null;
  isActive: boolean;
}

export interface Service {
  id: number;
  name: string;
  type: ServiceType;
  category: ServiceCategory;
  duration: number;
  description?: string | null;
  price?: number | null;
  isActive: boolean;
  professionalId: number;
  professional?: Professional;
}

export interface Appointment {
  id: number;
  date: Date;
  status: AppointmentStatus;
  reason: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date | null;
  patientId: number;
  serviceId: number;
  patient?: Patient;
  service?: Service;
}

export interface BlockedSlot {
  id: number;
  date: Date;
  startTime?: string | null;
  endTime?: string | null;
  reason?: string | null;
  isFullDay: boolean;
  serviceType?: ServiceType | null;
  createdAt: Date;
}

export interface SystemConfig {
  id: number;
  key: string;
  value: string;
}

// Session user type
export interface SessionUser {
  id: number;
  email: string;
  role: UserRole;
  patientId?: number;
}

// Form types
export interface PatientFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  address?: string;
  weight?: number;
  height?: number;
  chronicDiseases?: string;
}

export interface AppointmentFormData {
  serviceType: ServiceType;
  date: string;
  time: string;
  reason: string;
  isCaregiver: boolean;
  caregiverData?: {
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;
  };
  patientData: PatientFormData;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  patientData: PatientFormData;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

