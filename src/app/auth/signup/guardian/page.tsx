"use client";
import React from "react";
import { AuthProvider } from "@/context/auth-context";
import GuardianSignupForm from "@/components/auth/guardian-signup";

export default function GuardianSignUp() {
  return (
    <AuthProvider>
      <GuardianSignupForm />
    </AuthProvider>
  );
}
