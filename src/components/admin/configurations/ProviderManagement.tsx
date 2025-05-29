
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useProviderConfigurations, useCreateProviderConfiguration } from '@/hooks/useProviderConfigurations';
import { Plus, Save, X } from 'lucide-react';

const ProviderManagement = () => {
  const { toast } = useToast();
  const { data: providers, isLoading } = useProviderConfigurations();
  const createProvider = useCreateProviderConfiguration();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProvider, setNewProvider] = useState({
    provider_name: '',
    provider_type: 'physician',
    specialty: '',
    npi_number: '',
    license_number: '',
    phone: '',
    email: '',
    is_primary_care: false,
    is_medical_director: false
  });

  const providerTypes = [
    { value: 'physician', label: 'Physician' },
    { value: 'nurse_practitioner', label: 'Nurse Practitioner' },
    { value: 'physician_assistant', label: 'Physician Assistant' },
    { value: 'therapist', label: 'Therapist' },
    { value: 'consultant', label: 'Consultant' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createProvider.mutateAsync(newProvider);
      setNewProvider({
        provider_name: '',
        provider_type: 'physician',
        specialty: '',
        npi_number: '',
        license_number: '',
        phone: '',
        email: '',
        is_primary_care: false,
        is_medical_director: false
      });
      setShowAddForm(false);
      toast({
        title: "Provider Created",
        description: "New provider has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create provider.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading providers...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medical Providers</CardTitle>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add New Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="provider_name">Provider Name</Label>
                    <Input
                      id="provider_name"
                      value={newProvider.provider_name}
                      onChange={(e) => setNewProvider({ ...newProvider, provider_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider_type">Provider Type</Label>
                    <Select value={newProvider.provider_type} onValueChange={(value) => setNewProvider({ ...newProvider, provider_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providerTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={newProvider.specialty}
                      onChange={(e) => setNewProvider({ ...newProvider, specialty: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="npi_number">NPI Number</Label>
                    <Input
                      id="npi_number"
                      value={newProvider.npi_number}
                      onChange={(e) => setNewProvider({ ...newProvider, npi_number: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="is_primary_care"
                      checked={newProvider.is_primary_care}
                      onCheckedChange={(checked) => setNewProvider({ ...newProvider, is_primary_care: !!checked })}
                    />
                    <Label htmlFor="is_primary_care">Primary Care Provider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="is_medical_director"
                      checked={newProvider.is_medical_director}
                      onCheckedChange={(checked) => setNewProvider({ ...newProvider, is_medical_director: !!checked })}
                    />
                    <Label htmlFor="is_medical_director">Medical Director</Label>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={createProvider.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Provider
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>NPI</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers?.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>{provider.provider_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {provider.provider_type.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{provider.specialty || 'Not specified'}</TableCell>
                <TableCell>{provider.npi_number || 'Not provided'}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {provider.is_primary_care && (
                      <Badge variant="default" className="text-xs">PCP</Badge>
                    )}
                    {provider.is_medical_director && (
                      <Badge variant="secondary" className="text-xs">MD</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={provider.is_active ? "default" : "secondary"}>
                    {provider.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProviderManagement;
