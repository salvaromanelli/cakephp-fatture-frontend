// Estados de facturas
export const INVOICE_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending', 
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled'
};

// Labels para estados
export const INVOICE_STATUS_LABELS = {
  [INVOICE_STATUS.DRAFT]: 'Borrador',
  [INVOICE_STATUS.PENDING]: 'Pendiente',
  [INVOICE_STATUS.PAID]: 'Pagada',
  [INVOICE_STATUS.OVERDUE]: 'Vencida',
  [INVOICE_STATUS.CANCELLED]: 'Cancelada'
};

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'CakePHP Fatture',
  version: '1.0.0',
  currency: 'EUR',
  dateFormat: 'dd/MM/yyyy',
};

// Formatear moneda
export const formatCurrency = (amount, currency = APP_CONFIG.currency) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

// Formatear fecha
export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-ES').format(new Date(date));
};
