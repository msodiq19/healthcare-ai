"use client";
import React from "react";
import { AuthProvider } from "@/context/auth-context";
import PatientSigninForm from "@/components/auth/patient-signin";



export default function PatientSignIn() {

  return (
    <AuthProvider>
      <PatientSigninForm />
    </AuthProvider>
  );
}
