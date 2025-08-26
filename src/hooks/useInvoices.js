import { useQuery, useMutation, useQueryClient } from 'react-query';
import { invoicesAPI } from '../services/apiService';

// Keys para React Query
export const INVOICE_KEYS = {
  all: ['invoices'],
  lists: () => [...INVOICE_KEYS.all, 'list'],
  list: (filters) => [...INVOICE_KEYS.lists(), { filters }],
  details: () => [...INVOICE_KEYS.all, 'detail'],
  detail: (id) => [...INVOICE_KEYS.details(), id],
};

// Hook para obtener todas las facturas
export const useInvoices = (params = {}) => {
  return useQuery({
    queryKey: INVOICE_KEYS.list(params),
    queryFn: () => invoicesAPI.getAll(params),
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

// Hook para obtener una factura específica
export const useInvoice = (id) => {
  return useQuery({
    queryKey: INVOICE_KEYS.detail(id),
    queryFn: () => invoicesAPI.getById(id),
    enabled: !!id,
  });
};
