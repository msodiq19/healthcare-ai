"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import Sidebar from "@/components/Sidebar";
import DashboardCards from "@/components/DashboardCards";
import { getAssignedPatientsForGuardian } from "@/services";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

interface Patient {
  _id: string;
  patient_id: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
  doctor_id: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
}

const GuardianDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAssignedPatientsForGuardian();
        setPatients(response.data || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to fetch patients");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
                {isLoading ? (
                  <div className="text-center">Loading patients...</div>
                ) : patients.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No patients assigned yet
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patients.map((patient) => (
                      <Card key={patient._id} className="p-4">
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-100 rounded-full">
                              <UserIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {patient.patient_id.username}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {patient.patient_id.email}
                              </p>
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-600">
                                  Doctor:
                                </p>
                                <p className="text-sm text-gray-500">
                                  {patient.doctor_id.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {patient.doctor_id.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;
