
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useClinicalConfigurations } from '@/hooks/useClinicalConfigurations';
import { Plus } from 'lucide-react';
import AddConfigurationForm from './clinical/AddConfigurationForm';
import ConfigurationGroupDisplay from './clinical/ConfigurationGroupDisplay';

const ClinicalConfigurationsManagement = () => {
  const { data: configurations, isLoading } = useClinicalConfigurations();
  const [showAddForm, setShowAddForm] = useState(false);

  const groupedConfigurations = useMemo(() => {
    if (!configurations) return {};
    
    return configurations.reduce((acc, config) => {
      if (!acc[config.configuration_type]) {
        acc[config.configuration_type] = [];
      }
      acc[config.configuration_type].push(config);
      return acc;
    }, {} as Record<string, any[]>);
  }, [configurations]);

  if (isLoading) {
    return <div>Loading clinical configurations...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Clinical Configurations</CardTitle>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Configuration
        </Button>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <AddConfigurationForm onClose={() => setShowAddForm(false)} />
        )}

        <ConfigurationGroupDisplay groupedConfigurations={groupedConfigurations} />
      </CardContent>
    </Card>
  );
};

export default ClinicalConfigurationsManagement;
