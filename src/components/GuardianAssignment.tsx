import React, { useState, useEffect } from 'react';
import { getAllGuardians, assignGuardian } from '@/services';
import { Guardian } from '../types';

interface GuardianAssignmentProps {
  patientId: string;
  onAssignmentComplete?: () => void;
}

const GuardianAssignment: React.FC<GuardianAssignmentProps> = ({ 
  patientId,
  onAssignmentComplete 
}) => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [selectedGuardian, setSelectedGuardian] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        const response = await getAllGuardians();
        setGuardians(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch guardians');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuardians();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGuardian) {
      setError('Please select a guardian');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await assignGuardian(selectedGuardian, patientId);
      setSuccess('Guardian assigned successfully');
      if (onAssignmentComplete) {
        onAssignmentComplete();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign guardian');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Guardian</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="guardian" className="block text-sm font-medium text-gray-700 mb-2">
            Select Guardian
          </label>
          <select
            id="guardian"
            value={selectedGuardian}
            onChange={(e) => setSelectedGuardian(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">-- Select a guardian --</option>
            {guardians.map((guardian) => (
              <option key={guardian.id} value={guardian.id}>
                {guardian.username}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            submitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Assigning...' : 'Assign Guardian'}
        </button>
      </form>
    </div>
  );
};

export default GuardianAssignment;