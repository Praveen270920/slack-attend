import { useState, useEffect } from 'react';

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000/api');

function HealthCheck() {
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: HealthStatus = await response.json();
      setHealthData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch health status';
      console.error('❌ Health check failed:', errorMessage);
      setError(errorMessage);
      setHealthData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleManualRefresh = () => {
    fetchHealthStatus();
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-2xl text-gray-800">
        <h2 className="mt-0 mb-6 text-indigo-600 text-3xl font-semibold text-center">
          Backend Health Status
        </h2>
        
        {loading && (
          <div className="text-center py-8 text-indigo-600 text-xl">
            Loading...
          </div>
        )}
        
        {error && (
          <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
            <p className="mb-4 text-lg">❌ Error: {error}</p>
            <button 
              onClick={handleManualRefresh} 
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-200"
            >
              Retry
            </button>
          </div>
        )}
        
        {healthData && !loading && (
          <div>
            <div className="mb-6">
              <span className={`inline-block py-2 px-6 rounded-full font-semibold text-sm tracking-wider ${
                healthData.status === 'ok' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {healthData.status.toUpperCase()}
              </span>
            </div>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-indigo-500">
                <span className="font-semibold text-gray-600">Status:</span>
                <span className="text-gray-800 font-mono">{healthData.status}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-indigo-500">
                <span className="font-semibold text-gray-600">Timestamp:</span>
                <span className="text-gray-800 font-mono">
                  {new Date(healthData.timestamp).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-indigo-500">
                <span className="font-semibold text-gray-600">Uptime:</span>
                <span className="text-gray-800 font-mono">{formatUptime(healthData.uptime)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md border-l-4 border-indigo-500">
                <span className="font-semibold text-gray-600">Environment:</span>
                <span className="text-gray-800 font-mono">{healthData.environment}</span>
              </div>
            </div>
            
            <button 
              onClick={handleManualRefresh} 
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-200"
            >
              🔄 Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthCheck;

