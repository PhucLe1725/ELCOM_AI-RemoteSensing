import { useState } from 'react';
import api from '../utils/axios.config';

/**
 * Component để test API endpoints
 * Dùng để kiểm tra kết nối với backend
 */
const APITester = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testPublicEndpoint = async () => {
    setLoading(true);
    try {
      const response = await api.get('/test/public');
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testProtectedEndpoint = async () => {
    setLoading(true);
    try {
      const response = await api.get('/test/protected');
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testAdminEndpoint = async () => {
    setLoading(true);
    try {
      const response = await api.get('/test/admin');
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testCheckRole = async () => {
    setLoading(true);
    try {
      const response = await api.get('/test/check-role');
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">API Tester</h2>
      
      <div className="space-x-2 mb-4">
        <button
          onClick={testPublicEndpoint}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Public Endpoint
        </button>
        
        <button
          onClick={testProtectedEndpoint}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Protected Endpoint
        </button>
        
        <button
          onClick={testAdminEndpoint}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Admin Endpoint
        </button>
        
        <button
          onClick={testCheckRole}
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Check Role
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      
      {result && (
        <pre className="p-4 bg-gray-100 rounded text-sm overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  );
};

export default APITester;
