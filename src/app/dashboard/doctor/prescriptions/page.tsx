"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";
import { getAssignedPatients, createPrescription } from "@/services";
import { Button } from "@/components/ui/button";

interface Patient {
  _id: string;
  patient_id: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
}

export default function PrescriptionsPage() {
  const { user, logout } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAssignedPatients();
        setPatients(response.data || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to fetch patients");
      }
    };

    fetchPatients();
  }, []);

  const handleCreatePrescription = async () => {
    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }
    setIsLoading(true);
    try {
      const data = await createPrescription(selectedPatient, symptoms);
      if (data.status === "SUCCESS") {
        toast.success("Prescription created successfully");
      } else {
        toast.error("Failed to create prescription");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} logout={logout} />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Create Prescription
            </h2>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full p-3 border rounded mb-4"
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient.patient_id._id}>
                  {patient.patient_id.username} ({patient.patient_id.email})
                </option>
              ))}
            </select>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter symptoms"
              className="w-full p-3 border rounded mb-4"
            />
            <Button
              onClick={handleCreatePrescription}
              className="mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Prescription"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
