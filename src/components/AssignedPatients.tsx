"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { getAssignedPatients } from "@/services";
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

export default function AssignedPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
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

  return (
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
                    {patient.guardian && (
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
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
