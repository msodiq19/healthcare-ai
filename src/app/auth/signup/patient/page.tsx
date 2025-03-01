"use client";
import React from "react";
import { AuthProvider } from "@/context/auth-context";
import PatientSignupForm from "@/components/auth/patient-signup";

export default function PatientSignUp() {
  return (
    <AuthProvider>
      <PatientSignupForm />
    </AuthProvider>
  );
}
