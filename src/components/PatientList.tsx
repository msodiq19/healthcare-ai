import React, { useState, useEffect } from 'react';
import { getAllPatients, getAssignedPatients } from '@/services';
import { Patient } from '../types';
import { useAuth } from '@/context/auth-context';

interface PatientListProps {
  type?: 'all' | 'assigned';
  onSelectPatient?: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ 
  type = 'all',
  onSelectPatient 
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let response;
        if (type === 'all') {
          response = await getAllPatients();
        } else {
          response = await getAssignedPatients();
        }
        setPatients(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, [type]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error}
      </div>
    );
  }
  
  if (patients.length === 0) {
    return (
      <div className="bg-gray-50 p-6 text-center rounded-md">
        <p className="text-gray-500">No patients found.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            {user?.type === 'doctor' && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient) => (
            <tr 
              key={patient.id} 
              className={onSelectPatient ? "hover:bg-gray-50 cursor-pointer" : ""}
              onClick={() => onSelectPatient && onSelectPatient(patient)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{patient.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{patient.email}</div>
              </td>
              {user?.type === 'doctor' && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View Details
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    Add Prescription
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;