"use client";
import React from "react";
import { AuthProvider } from "@/context/auth-context";
import DoctorSignupForm from "@/components/auth/doctor-signup";

export default function DoctorSignUp() {
  return (
    <AuthProvider>
      <DoctorSignupForm />
    </AuthProvider>
  );
}
