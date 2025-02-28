import React from 'react';
import { Users, UserPlus, Activity, Clipboard, Shield } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardCards: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Different cards based on user type
  if (user.type === 'doctor') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Assigned Patients"
          value="24"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Pending Prescriptions"
          value="7"
          icon={<Clipboard className="h-6 w-6 text-yellow-600" />}
          color="bg-yellow-100"
        />
        <DashboardCard
          title="Completed Prescriptions"
          value="142"
          icon={<Clipboard className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
        />
      </div>
    );
  }
  
  if (user.type === 'admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Patients"
          value="156"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Total Doctors"
          value="32"
          icon={<UserPlus className="h-6 w-6 text-indigo-600" />}
          color="bg-indigo-100"
        />
        <DashboardCard
          title="Total Guardians"
          value="87"
          icon={<Shield className="h-6 w-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <DashboardCard
          title="Total Prescriptions"
          value="423"
          icon={<Clipboard className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
        />
      </div>
    );
  }
  
  if (user.type === 'patient') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="My Doctor"
          value="Dr. Smith"
          icon={<UserPlus className="h-6 w-6 text-indigo-600" />}
          color="bg-indigo-100"
        />
        <DashboardCard
          title="Active Prescriptions"
          value="2"
          icon={<Clipboard className="h-6 w-6 text-yellow-600" />}
          color="bg-yellow-100"
        />
        <DashboardCard
          title="Reported Symptoms"
          value="5"
          icon={<Activity className="h-6 w-6 text-red-600" />}
          color="bg-red-100"
        />
      </div>
    );
  }
  
  if (user.type === 'guardian') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Assigned Patients"
          value="3"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Active Prescriptions"
          value="4"
          icon={<Clipboard className="h-6 w-6 text-yellow-600" />}
          color="bg-yellow-100"
        />
      </div>
    );
  }
  
  return null;
};

export default DashboardCards;