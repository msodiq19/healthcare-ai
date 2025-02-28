export interface User {
    id: string;
    username: string;
    email: string;
    type: 'doctor' | 'patient' | 'guardian' | 'admin';
  }
  
  export interface Patient {
    id: string;
    username: string;
    email: string;
  }
  
  export interface Doctor {
    id: string;
    username: string;
    email: string;
  }
  
  export interface Guardian {
    id: string;
    username: string;
    email: string;
  }
  
  export interface Symptom {
    id: string;
    name: string;
    description: string;
  }
  
  export interface Prescription {
    id: string;
    patient_id: string;
    doctor_id: string;
    symptoms: string;
    medication: string;
    created_at: string;
  }
  
  export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
  }