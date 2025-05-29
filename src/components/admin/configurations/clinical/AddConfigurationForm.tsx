
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useCreateClinicalConfiguration } from '@/hooks/useClinicalConfigurations';
import { Save, X } from 'lucide-react';

interface AddConfigurationFormProps {
  onClose: () => void;
}

const AddConfigurationForm = ({ onClose }: AddConfigurationFormProps) => {
  const { toast } = useToast();
  const createConfiguration = useCreateClinicalConfiguration();
  
  const [newConfig, setNewConfig] = useState({
    configuration_type: 'care_levels',
    configuration_key: '',
    configuration_value: '',
    description: '',
    display_order: 0,
    is_active: true
  });

  const configurationTypes = [
    { value: 'care_levels', label: 'Care Levels' },
    { value: 'diet_types', label: 'Diet Types' },
    { value: 'mobility_levels', label: 'Mobility Levels' },
    { value: 'alert_types', label: 'Alert Types' },
    { value: 'medication_frequencies', label: 'Medication Frequencies' },
    { value: 'diagnosis_categories', label: 'Diagnosis Categories' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createConfiguration.mutateAsync(newConfig);
      setNewConfig({
        configuration_type: 'care_levels',
        configuration_key: '',
        configuration_value: '',
        description: '',
        display_order: 0,
        is_active: true
      });
      onClose();
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

  return (
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
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddConfigurationForm;
