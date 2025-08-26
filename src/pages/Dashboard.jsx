import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  DollarSign, 
  Clock,
  Plus,
  ArrowUpRight 
} from 'lucide-react';
import APIConnectionTest from '../components/common/APIConnectionTest';

const Dashboard = () => {
  // Datos mock para demo (después conectaremos con la API real)
  const stats = [
    {
      name: 'Total Facturas',
      value: '248',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
    },
    {
      name: 'Ingresos Totales',
      value: '€54,290',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Pendientes',
      value: '12',
      change: '-3.1%',
      changeType: 'negative',
      icon: Clock,
    },
    {
      name: 'Crecimiento',
      value: '+18.5%',
      change: '+2.4%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const recentInvoices = [
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
    },
    {
      id: 3,
      numero: 'FACT-2024-003',
      cliente: 'Digital Solutions',
      total: 2100.00,
      fecha: '2024-08-24',
      estado: 'paid'
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'badge-success',
      pending: 'badge-warning',
      overdue: 'badge-danger',
    };
    const labels = {
      paid: 'Pagada',
      pending: 'Pendiente',
      overdue: 'Vencida',
    };
    return { class: badges[status], label: labels[status] };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Resumen general de tu sistema de facturas
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <ArrowUpRight className={`h-3 w-3 ${
                          stat.changeType === 'positive' ? '' : 'transform rotate-180'
                        }`} />
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Invoices */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            Facturas Recientes
          </h2>
          <Link
            to="/invoices"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Ver todas →
          </Link>
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Ver</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.map((invoice) => {
                const statusBadge = getStatusBadge(invoice.estado);
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.numero}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(invoice.fecha).toLocaleDateString('es-ES')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {invoice.cliente}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        €{invoice.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${statusBadge.class}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demo Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🎯</div>
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Demo Técnico - CakePHP + React
            </h3>
            <p className="text-blue-700 text-sm">
              Esta es una demostración del frontend React conectado con el backend CakePHP desplegado en AWS. 
              Los datos se cargan dinámicamente desde la API REST.
            </p>
            <div className="mt-4 flex space-x-4 text-sm">
              <span className="bg-white text-blue-800 px-2 py-1 rounded">
                ✅ React 18
              </span>
              <span className="bg-white text-blue-800 px-2 py-1 rounded">
                ✅ Tailwind CSS
              </span>
              <span className="bg-white text-blue-800 px-2 py-1 rounded">
                ✅ React Query
              </span>
              <span className="bg-white text-blue-800 px-2 py-1 rounded">
                ✅ Netlify Deploy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Connection Test */}
      <APIConnectionTest />
    </div>
  );
};

export default Dashboard;
