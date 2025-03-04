"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { assignDoctorToPatient, getAllDoctors } from "@/services";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";

interface Doctor {
  _id: string;
  username: string;
  email: string;
}

export default function DoctorsPage() {
  const { user, logout } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctorId, setLoadingDoctorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        setDoctors(response.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchDoctors();
  }, []);

  const handleAssignDoctor = async (doctorId: string) => {
    setLoadingDoctorId(doctorId);
    try {
      const response = await assignDoctorToPatient(doctorId);
      console.log("Doctor assigned:", response);
      toast.success("Doctor assigned successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while assigning the doctor";
      console.error("Error assigning doctor:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingDoctorId(null);
    }
  };

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
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Available Doctors</h1>

            {loading ? ( // Show loading state
              <p>Loading doctors...</p>
            ) : doctors.length === 0 ? ( // Show empty state
              <p>No doctors available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <Card key={doctor._id} className="p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <UserIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doctor.username}</h3>
                          <p className="text-sm text-gray-500">
                            {doctor.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAssignDoctor(doctor._id)}
                        disabled={loadingDoctorId === doctor._id}
                        className="w-full"
                      >
                        {loadingDoctorId === doctor._id
                          ? "Assigning..."
                          : "Assign Doctor"}
                      </Button>
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
