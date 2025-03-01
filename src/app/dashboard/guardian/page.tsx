"use client";
import React from "react";
import { useAuth } from "@/context/auth-context";
import Sidebar from "@/components/Sidebar";
import DashboardCards from "@/components/DashboardCards";
import PatientList from "@/components/PatientList";

const GuardianDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} logout={logout} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
          <DashboardCards />
          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  My Patients
                </h3>
                <PatientList type="assigned" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;
