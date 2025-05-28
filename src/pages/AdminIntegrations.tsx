
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import IntegrationsManager from '@/components/admin/IntegrationsManager';

const AdminIntegrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations Management</h1>
          <p className="text-gray-600">Connect with leading healthcare technology providers to enhance your facility's capabilities</p>
        </div>
        <IntegrationsManager />
      </div>
    </div>
  );
};

export default AdminIntegrations;
