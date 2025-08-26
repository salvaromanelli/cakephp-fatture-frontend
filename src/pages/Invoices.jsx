import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';

const Invoices = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Facturas
          </h1>
          <p className="mt-2 text-gray-600">
            Gestiona todas tus facturas desde aquí
          </p>
        </div>
        <Link
          to="/invoices/new"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Factura</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar facturas..."
              className="input pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Lista de facturas
        </h3>
        <p className="text-gray-600 mb-6">
          Aquí se mostrará la lista de facturas conectada con tu API CakePHP
        </p>
        <Link to="/invoices/new" className="btn-primary">
          Crear primera factura
        </Link>
      </div>
    </div>
  );
};

export default Invoices;
