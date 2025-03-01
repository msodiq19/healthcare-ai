"use client";
import React from "react";
import { AuthProvider } from "@/context/auth-context";
import GuardianSigninForm from "@/components/auth/guardian-signin";

export default function GuardianSignIn() {
  return (
    <AuthProvider>
      <GuardianSigninForm />
    </AuthProvider>
  );
}
