import React from 'react';
import { useAuth } from '@/context/auth-context';
import DashboardCards from '@/components/DashboardCards';
import PatientList from '@/components/PatientList';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <DashboardCards />
      
      {/* Doctor Dashboard */}
      {user.type === 'doctor' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">My Patients</h3>
            <PatientList type="assigned" />
          </div>
        </div>
      )}
      
      {/* Admin Dashboard */}
      {user.type === 'admin' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">All Patients</h3>
            <PatientList type="all" />
          </div>
        </div>
      )}
      
      {/* Patient Dashboard */}
      {user.type === 'patient' && (
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
      )}
      
      {/* Guardian Dashboard */}
      {user.type === 'guardian' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">My Patients</h3>
            <PatientList type="assigned" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;