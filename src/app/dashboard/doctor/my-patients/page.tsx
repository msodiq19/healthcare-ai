"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import {
  assignGuardian,
  getAssignedPatients,
  getAllGuardians,
} from "@/services";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";

interface Patient {
  _id: string;
  patient_id: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
  guardian?: {
    _id: string;
    username: string;
    email: string;
  };
}

interface Guardian {
  _id: string;
  username: string;
  email: string;
}

export default function AllPatientsPage() {
  const { user, logout } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAssignedPatients();
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

  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        const response = await getAllGuardians();
        setGuardians(response.data || []);
      } catch (error) {
        console.error("Error fetching guardians:", error);
        toast.error("Failed to fetch guardians");
      }
    };

    fetchGuardians();
  }, []);

  const handleAssignGuardian = async (
    guardianId: string,
    patientId: string
  ) => {
    try {
      await assignGuardian(guardianId, patientId);
      toast.success("Guardian assigned successfully");
    } catch (error) {
      console.error("Error assigning guardian:", error);
      toast.error("Failed to assign guardian");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} logout={logout} />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">My Patients</h2>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6">
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
                          {patient.guardian ? (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-600">
                                Guardian:
                              </p>
                              <p className="text-sm text-gray-500">
                                {patient.guardian.username}
                              </p>
                              <p className="text-sm text-gray-500">
                                {patient.guardian.email}
                              </p>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <select
                                onChange={(e) =>
                                  handleAssignGuardian(
                                    e.target.value,
                                    patient.patient_id._id
                                  )
                                }
                                className="px-3 py-1 text-sm bg-white border rounded"
                              >
                                <option value="">Select Guardian</option>
                                {guardians.map((guardian) => (
                                  <option
                                    key={guardian._id}
                                    value={guardian._id}
                                  >
                                    {guardian.username} ({guardian.email})
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
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
  );
}
