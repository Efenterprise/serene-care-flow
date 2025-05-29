
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useFacilitySettings, useUpdateFacilitySettings } from '@/hooks/useConfigurations';
import { Save } from 'lucide-react';

interface FacilityAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

const FacilitySettingsForm = () => {
  const { toast } = useToast();
  const { data: facilitySettings, isLoading } = useFacilitySettings();
  const updateSettings = useUpdateFacilitySettings();
  
  const [formData, setFormData] = useState({
    facility_name: '',
    medicare_provider_number: '',
    medicaid_provider_number: '',
    state_license_number: '',
    federal_tax_id: '',
    npi_number: '',
    total_licensed_beds: 120,
    administrator_name: '',
    administrator_email: '',
    administrator_phone: '',
    medical_director_name: '',
    medical_director_npi: '',
    medical_director_phone: '',
    medical_director_email: '',
    facility_address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    } as FacilityAddress
  });

  // Update form data when facility settings load
  useEffect(() => {
    if (facilitySettings) {
      const address = facilitySettings.facility_address as FacilityAddress | null;
      setFormData({
        ...facilitySettings,
        facility_address: address || {
          street: '',
          city: '',
          state: '',
          zip: ''
        }
      });
    }
  }, [facilitySettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateSettings.mutateAsync(formData);
      toast({
        title: "Settings Updated",
        description: "Facility settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update facility settings.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading facility settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facility Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facility_name">Facility Name</Label>
              <Input
                id="facility_name"
                value={formData.facility_name}
                onChange={(e) => setFormData({ ...formData, facility_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="total_licensed_beds">Total Licensed Beds</Label>
              <Input
                id="total_licensed_beds"
                type="number"
                value={formData.total_licensed_beds}
                onChange={(e) => setFormData({ ...formData, total_licensed_beds: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={formData.facility_address?.street || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    facility_address: { ...formData.facility_address, street: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.facility_address?.city || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    facility_address: { ...formData.facility_address, city: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.facility_address?.state || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    facility_address: { ...formData.facility_address, state: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={formData.facility_address?.zip || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    facility_address: { ...formData.facility_address, zip: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">License & Provider Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medicare_provider_number">Medicare Provider Number</Label>
                <Input
                  id="medicare_provider_number"
                  value={formData.medicare_provider_number}
                  onChange={(e) => setFormData({ ...formData, medicare_provider_number: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="medicaid_provider_number">Medicaid Provider Number</Label>
                <Input
                  id="medicaid_provider_number"
                  value={formData.medicaid_provider_number}
                  onChange={(e) => setFormData({ ...formData, medicaid_provider_number: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="state_license_number">State License Number</Label>
                <Input
                  id="state_license_number"
                  value={formData.state_license_number}
                  onChange={(e) => setFormData({ ...formData, state_license_number: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="federal_tax_id">Federal Tax ID</Label>
                <Input
                  id="federal_tax_id"
                  value={formData.federal_tax_id}
                  onChange={(e) => setFormData({ ...formData, federal_tax_id: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="npi_number">NPI Number</Label>
                <Input
                  id="npi_number"
                  value={formData.npi_number}
                  onChange={(e) => setFormData({ ...formData, npi_number: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Administrator Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="administrator_name">Administrator Name</Label>
                <Input
                  id="administrator_name"
                  value={formData.administrator_name}
                  onChange={(e) => setFormData({ ...formData, administrator_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="administrator_email">Administrator Email</Label>
                <Input
                  id="administrator_email"
                  type="email"
                  value={formData.administrator_email}
                  onChange={(e) => setFormData({ ...formData, administrator_email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="administrator_phone">Administrator Phone</Label>
                <Input
                  id="administrator_phone"
                  type="tel"
                  value={formData.administrator_phone}
                  onChange={(e) => setFormData({ ...formData, administrator_phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical Director Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medical_director_name">Medical Director Name</Label>
                <Input
                  id="medical_director_name"
                  value={formData.medical_director_name}
                  onChange={(e) => setFormData({ ...formData, medical_director_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="medical_director_npi">Medical Director NPI</Label>
                <Input
                  id="medical_director_npi"
                  value={formData.medical_director_npi}
                  onChange={(e) => setFormData({ ...formData, medical_director_npi: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="medical_director_phone">Medical Director Phone</Label>
                <Input
                  id="medical_director_phone"
                  type="tel"
                  value={formData.medical_director_phone}
                  onChange={(e) => setFormData({ ...formData, medical_director_phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="medical_director_email">Medical Director Email</Label>
                <Input
                  id="medical_director_email"
                  type="email"
                  value={formData.medical_director_email}
                  onChange={(e) => setFormData({ ...formData, medical_director_email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={updateSettings.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FacilitySettingsForm;
