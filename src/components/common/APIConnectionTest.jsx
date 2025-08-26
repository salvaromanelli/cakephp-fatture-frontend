import React, { useState, useEffect } from 'react';
import { checkHealth } from '../../services/apiService';

const APIConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    loading: true,
    connected: false,
    error: null,
    details: null
  });

  const testConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, loading: true }));
    
    try {
      const result = await checkHealth();
      
      if (result.success) {
        setConnectionStatus({
          loading: false,
          connected: true,
          error: null,
          details: result
        });
      } else {
        setConnectionStatus({
          loading: false,
          connected: false,
          error: result.error,
          details: result
        });
      }
    } catch (error) {
      setConnectionStatus({
        loading: false,
        connected: false,
        error: error.message,
        details: null
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Conexión API Backend
        </h3>
        <button
          onClick={testConnection}
          disabled={connectionStatus.loading}
          className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {connectionStatus.loading ? 'Probando...' : 'Probar Conexión'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500 w-24">Estado:</span>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              connectionStatus.loading ? 'bg-yellow-500' :
              connectionStatus.connected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm">
              {connectionStatus.loading ? 'Verificando...' :
               connectionStatus.connected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>

        <div className="flex items-start">
          <span className="text-sm font-medium text-gray-500 w-24">URL:</span>
          <span className="text-sm text-gray-900">
            {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
          </span>
        </div>

        {connectionStatus.error && (
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 w-24">Error:</span>
            <span className="text-sm text-red-600">
              {connectionStatus.error}
            </span>
          </div>
        )}

        {connectionStatus.details && connectionStatus.connected && (
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 w-24">Endpoint:</span>
            <span className="text-sm text-green-600">
              {connectionStatus.details.endpoint}
            </span>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Configuración para CakePHP + AWS:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Asegúrate que tu API CakePHP tenga CORS habilitado</li>
            <li>• Verifica que los endpoints estén accesibles desde el frontend</li>
            <li>• Configura las rutas API en tu backend CakePHP</li>
            <li>• Actualiza VITE_API_URL con la URL de tu AWS deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default APIConnectionTest;
