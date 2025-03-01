import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/auth-context";

interface LayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="min-h-screen">{children}</div>;
  }

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
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
