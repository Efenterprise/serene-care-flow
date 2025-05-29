
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, CreditCard, Stethoscope, Shield, Settings } from 'lucide-react';
import FacilitySettingsForm from './FacilitySettingsForm';
import UnitsManagement from './UnitsManagement';
import PayorManagement from './PayorManagement';
import ProviderManagement from './ProviderManagement';
import ClinicalConfigurationsManagement from './ClinicalConfigurationsManagement';
import RoleConfigurationsManagement from './RoleConfigurationsManagement';

const ConfigurationDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Configuration</h2>
        <p className="text-gray-600">
          Configure facility settings, units, payors, providers, and clinical parameters
        </p>
      </div>

      <Tabs defaultValue="facility" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="facility" className="flex items-center space-x-2">
            <Building className="w-4 h-4" />
            <span>Facility</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Units</span>
          </TabsTrigger>
          <TabsTrigger value="payors" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Payors</span>
          </TabsTrigger>
          <TabsTrigger value="providers" className="flex items-center space-x-2">
            <Stethoscope className="w-4 h-4" />
            <span>Providers</span>
          </TabsTrigger>
          <TabsTrigger value="clinical" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Clinical</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Roles</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facility">
          <FacilitySettingsForm />
        </TabsContent>

        <TabsContent value="units">
          <UnitsManagement />
        </TabsContent>

        <TabsContent value="payors">
          <PayorManagement />
        </TabsContent>

        <TabsContent value="providers">
          <ProviderManagement />
        </TabsContent>

        <TabsContent value="clinical">
          <ClinicalConfigurationsManagement />
        </TabsContent>

        <TabsContent value="roles">
          <RoleConfigurationsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigurationDashboard;
