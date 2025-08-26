import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const InvoiceDetail = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/invoices"
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Factura #{id}
        </h1>
      </div>

      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Detalle de Factura
        </h3>
        <p className="text-gray-600">
          Vista detallada de la factura #{id}
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetail;
