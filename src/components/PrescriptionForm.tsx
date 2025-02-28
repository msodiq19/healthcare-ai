import React, { useState } from 'react';
import { createPrescription } from '@/services';

interface PrescriptionFormProps {
  patientId: string;
  onPrescriptionCreated?: () => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  patientId,
  onPrescriptionCreated 
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError('Please enter symptoms');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await createPrescription(patientId, symptoms);
      setSuccess('Prescription created successfully');
      setSymptoms('');
      if (onPrescriptionCreated) {
        onPrescriptionCreated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create prescription');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create Prescription</h3>
      
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
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter patient symptoms..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            submitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Creating...' : 'Create Prescription'}
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;