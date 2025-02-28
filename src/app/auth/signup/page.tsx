"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Activity, Stethoscope, User, Shield, ArrowLeft } from "lucide-react";
import { AuthButton } from "@/components/auth/auth-button";

export default function SignUp() {
  const router = useRouter();

  const roleButtons = [
    {
      role: "doctor",
      icon: <Stethoscope className="h-5 w-5" />,
      text: "Sign up as Doctor",
      path: "/auth/signup/doctor",
    },
    {
      role: "patient",
      icon: <User className="h-5 w-5" />,
      text: "Sign up as Patient",
      path: "/auth/signup/patient",
    },
    {
      role: "guardian",
      icon: <Shield className="h-5 w-5" />,
      text: "Sign up as Guardian",
      path: "/auth/signup/guardian",
    },
  ];

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
          <div className="text-center mb-8">
            <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Choose your role to get started
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
