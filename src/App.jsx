import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy loading de páginas
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const InvoiceDetail = React.lazy(() => import('./pages/InvoiceDetail'));
const CreateInvoice = React.lazy(() => import('./pages/CreateInvoice'));

// Componentes
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/new" element={<CreateInvoice />} />
              <Route path="/invoices/:id" element={<InvoiceDetail />} />
              <Route path="*" element={
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    404 - Página no encontrada
                  </h1>
                  <p className="text-gray-600">
                    La página que buscas no existe.
                  </p>
                </div>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </ErrorBoundary>
  );
}

export default App;
