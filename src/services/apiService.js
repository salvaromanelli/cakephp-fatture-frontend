import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Aumentamos el timeout para AWS
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Para CakePHP
  },
  withCredentials: true, // Para manejar cookies de sesión si es necesario
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token CSRF si está disponible
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
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
    
    // Manejo específico de errores para CakePHP
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('Error de autenticación - Sesión expirada');
          break;
        case 403:
          console.error('Error de autorización - Permisos insuficientes');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 422:
          console.error('Error de validación:', data.errors || data.message);
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error(`Error ${status}:`, data?.message || 'Error desconocido');
      }
    } else if (error.request) {
      console.error('Error de conexión - Sin respuesta del servidor');
    }
    
    return Promise.reject(error);
  }
);

// Health check para CakePHP API
export const checkHealth = async () => {
  try {
    // Intentamos diferentes endpoints comunes de CakePHP
    const endpoints = ['/health', '/ping', '/api/health', '/'];
    
    for (const endpoint of endpoints) {
      try {
        const response = await apiClient.get(endpoint);
        return {
          success: true,
          status: response.status,
          data: response.data,
          endpoint: endpoint,
          baseURL: API_BASE_URL
        };
      } catch (error) {
        if (error.response?.status !== 404) {
          // Si no es 404, es otro tipo de error más serio
          throw error;
        }
        // Si es 404, intentamos el siguiente endpoint
        continue;
      }
    }
    
    // Si llegamos aquí, ningún endpoint funcionó
    throw new Error('Ningún endpoint de health check disponible');
    
  } catch (error) {
    console.error('Health check failed:', error);
    return {
      success: false,
      error: error.message,
      baseURL: API_BASE_URL
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
