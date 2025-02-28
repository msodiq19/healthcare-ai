import React, { useState, useEffect } from 'react';
import { checkSymptoms, getAllSymptoms } from '@/services';
import { Symptom } from '../types';

interface SymptomCheckerProps {
  patientId: string;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ patientId }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await getAllSymptoms();
        setSymptoms(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch symptoms');
      }
    };
    
    fetchSymptoms();
  }, []);
  
  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };
  
  const handleAddCustomSymptom = () => {
    if (customSymptom.trim()) {
      setSelectedSymptoms(prev => [...prev, customSymptom]);
      setCustomSymptom('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      setLoading(false);
      return;
    }
    
    try {
      const symptomsText = selectedSymptoms.join(', ');
      const response = await checkSymptoms(patientId, symptomsText);
      setResult(response.diagnosis || 'No diagnosis available');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check symptoms');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Symptom Checker</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Symptoms
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {symptoms.map(symptom => (
              <div key={symptom.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`symptom-${symptom.id}`}
                  checked={selectedSymptoms.includes(symptom.id)}
                  onChange={() => handleSymptomToggle(symptom.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`symptom-${symptom.id}`} className="ml-2 text-sm text-gray-700">
                  {symptom.name}
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="Add other symptom"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCustomSymptom}
              className="bg-gray-100 border border-gray-300 border-l-0 px-4 py-2 rounded-r-md hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          
          {selectedSymptoms.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Checking...' : 'Check Symptoms'}
        </button>
      </form>
      
      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h4 className="text-md font-medium text-green-800 mb-2">Diagnosis Result:</h4>
          <p className="text-green-700">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;