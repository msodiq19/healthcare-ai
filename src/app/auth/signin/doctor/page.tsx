"use client";
import React from "react";
import { AuthProvider } from "@/context/auth-context";
import DoctorSigninForm from "@/components/auth/doctor-signin";

export default function DoctorSignIn() {
  return (
    <AuthProvider>
      <DoctorSigninForm />
    </AuthProvider>
  );
}
