"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";
import { checkSymptoms } from "@/services";
import { Button } from "@/components/ui/button";

export default function CheckSymptomsPage() {
  const { user, logout } = useAuth();
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckSymptoms = async () => {
    setIsLoading(true);
    try {
      const res = await checkSymptoms(symptoms);
        setResponse(res.data);
        toast.success("Symptoms checked successfully");
    } catch (error) {
      console.error("Error checking symptoms:", error);
      toast.error("Failed to check symptoms");
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
              Check Symptoms
            </h2>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6">
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter your symptoms"
              className="w-full p-3 border rounded"
            />
            <Button
              onClick={handleCheckSymptoms}
              className="mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Checking..." : "Check Symptoms"}
            </Button>
            {response && (
              <div className="mt-4 p-4 bg-white border rounded">
                <h3 className="text-lg font-semibold">Response:</h3>
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
