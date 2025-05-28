
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Activity, Settings, Plug } from 'lucide-react';
import UserManagement from './UserManagement';
import AuditTrailReport from './AuditTrailReport';
import IntegrationsManager from './IntegrationsManager';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { profile } = useAuth();

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600">You need administrator privileges to access this area.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration Dashboard</h1>
          <p className="text-gray-600">Manage users, security settings, system monitoring, and integrations</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Audit Trail</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Plug className="w-4 h-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="audit">
            <AuditTrailReport />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsManager />
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✓ IP Address Restrictions</h3>
                    <p className="text-sm text-gray-600">
                      Users with "Facility Only" access are restricted to approved IP addresses.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✓ Multi-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">
                      MFA is available for all users and can be enabled from their profile settings.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✓ Comprehensive Audit Logging</h3>
                    <p className="text-sm text-gray-600">
                      All user actions are logged with timestamps, IP addresses, and success/failure status.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✓ Role-Based Access Control</h3>
                    <p className="text-sm text-gray-600">
                      Users are assigned specific roles that control their access to different system features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">HIPAA Compliance Features</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complete audit trail with user identification</li>
                      <li>• IP address logging for all activities</li>
                      <li>• Role-based access controls</li>
                      <li>• Secure authentication with MFA support</li>
                      <li>• Session management and timeout controls</li>
                      <li>• Data encryption in transit and at rest</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Configuration Notes</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Update facility IP addresses in the database as needed</li>
                      <li>• Review user permissions regularly</li>
                      <li>• Monitor audit logs for suspicious activity</li>
                      <li>• Ensure proper backup and disaster recovery procedures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
