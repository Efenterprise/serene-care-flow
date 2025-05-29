
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useClinicalConfigurations, useCreateClinicalConfiguration } from '@/hooks/useClinicalConfigurations';
import { Plus, Save, X } from 'lucide-react';

const ClinicalConfigurationsManagement = () => {
  const { toast } = useToast();
  const { data: configurations, isLoading } = useClinicalConfigurations();
  const createConfiguration = useCreateClinicalConfiguration();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConfig, setNewConfig] = useState({
    configuration_type: 'care_levels',
    configuration_key: '',
    configuration_value: '',
    description: '',
    display_order: 0
  });

  const configurationTypes = [
    { value: 'care_levels', label: 'Care Levels' },
    { value: 'diet_types', label: 'Diet Types' },
    { value: 'mobility_levels', label: 'Mobility Levels' },
    { value: 'alert_types', label: 'Alert Types' },
    { value: 'medication_frequencies', label: 'Medication Frequencies' },
    { value: 'diagnosis_categories', label: 'Diagnosis Categories' }
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createConfiguration.mutateAsync(newConfig);
      setNewConfig({
        configuration_type: 'care_levels',
        configuration_key: '',
        configuration_value: '',
        description: '',
        display_order: 0
      });
      setShowAddForm(false);
      toast({
        title: "Configuration Created",
        description: "New clinical configuration has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create configuration.",
        variant: "destructive",
      });
    }
  };

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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add New Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="configuration_type">Configuration Type</Label>
                    <Select value={newConfig.configuration_type} onValueChange={(value) => setNewConfig({ ...newConfig, configuration_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {configurationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="configuration_key">Configuration Key</Label>
                    <Input
                      id="configuration_key"
                      value={newConfig.configuration_key}
                      onChange={(e) => setNewConfig({ ...newConfig, configuration_key: e.target.value })}
                      placeholder="e.g., skilled_nursing"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="configuration_value">Display Value</Label>
                    <Input
                      id="configuration_value"
                      value={newConfig.configuration_value}
                      onChange={(e) => setNewConfig({ ...newConfig, configuration_value: e.target.value })}
                      placeholder="e.g., Skilled Nursing"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={newConfig.display_order}
                      onChange={(e) => setNewConfig({ ...newConfig, display_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={createConfiguration.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {Object.entries(groupedConfigurations).map(([type, configs]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {configurationTypes.find(t => t.value === type)?.label || type}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key</TableHead>
                      <TableHead>Display Value</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {configs.map((config) => (
                      <TableRow key={config.id}>
                        <TableCell>
                          <Badge variant="outline">{config.configuration_key}</Badge>
                        </TableCell>
                        <TableCell>{config.configuration_value}</TableCell>
                        <TableCell>{config.display_order}</TableCell>
                        <TableCell>
                          <Badge variant={config.is_active ? "default" : "secondary"}>
                            {config.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalConfigurationsManagement;
