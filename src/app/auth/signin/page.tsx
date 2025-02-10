'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import { Activity, Stethoscope, User, Shield } from 'lucide-react';
import { AuthButton } from '@/components/auth/auth-button';

export default function SignIn() {
  const router = useRouter();

  const roleButtons = [
    {
      role: 'doctor',
      icon: <Stethoscope className="h-5 w-5" />,
      text: 'Sign in as Doctor',
      path: '/auth/signin/doctor'
    },
    {
      role: 'patient',
      icon: <User className="h-5 w-5" />,
      text: 'Sign in as Patient',
      path: '/auth/signin/patient'
    },
    {
      role: 'guardian',
      icon: <Shield className="h-5 w-5" />,
      text: 'Sign in as Guardian',
      path: '/auth/signin/guardian'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground">
              Sign in to Healthcare AI
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Choose your role to continue
            </p>
          </div>

          <div className="space-y-4">
            {roleButtons.map((button) => (
              <AuthButton
                key={button.role}
                icon={button.icon}
                text={button.text}
                onClick={() => router.push(button.path)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}