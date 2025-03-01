'use client'
import React from 'react';
import { useAuth } from '@/context/auth-context';
import Sidebar from '@/components/Sidebar';
import DashboardCards from '@/components/DashboardCards';

const PatientDashboard: React.FC = () => {
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">My Health Summary</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Assigned Doctor</h4>
                <p className="text-gray-900">Dr. John Smith</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Recent Symptoms</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Headache</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Fever</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Cough</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Active Prescriptions</h4>
                <p className="text-gray-900">Paracetamol - 500mg - 3 times daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PatientDashboard;