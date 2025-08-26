import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Health check
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health.php');
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status || 0
    };
  }
};

// Invoices API
export const invoicesAPI = {
  // Obtener todas las facturas (mock data por ahora)
  getAll: async (params = {}) => {
    // Simular llamada API - después conectaremos con el backend real
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              numero: 'FACT-2024-001',
              cliente: 'Empresa Demo SL',
              total: 1250.00,
              fecha: '2024-08-26',
              estado: 'paid'
            },
            {
              id: 2,
              numero: 'FACT-2024-002',
              cliente: 'StartupTech Inc',
              total: 890.50,
              fecha: '2024-08-25',
              estado: 'pending'
            }
          ],
          meta: {
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }, 1000);
    });
  },
  
  // Obtener factura por ID
  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id,
            numero: `FACT-2024-${String(id).padStart(3, '0')}`,
            cliente: 'Cliente Demo',
            total: 1000.00,
            fecha: '2024-08-26',
            estado: 'paid'
          }
        });
      }, 500);
    });
  }
};

export default apiClient;
