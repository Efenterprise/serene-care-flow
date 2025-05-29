
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFacilitySettings, useUpdateFacilitySettings } from '@/hooks/useConfigurations';
import { Save } from 'lucide-react';
import BasicInfoSection from './facility/BasicInfoSection';
import AddressSection from './facility/AddressSection';
import LicenseSection from './facility/LicenseSection';
import AdministratorSection from './facility/AdministratorSection';
import MedicalDirectorSection from './facility/MedicalDirectorSection';

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
      // Safely parse the facility_address JSON field
      let address: FacilityAddress = {
        street: '',
        city: '',
        state: '',
        zip: ''
      };
      
      if (facilitySettings.facility_address && typeof facilitySettings.facility_address === 'object') {
        const addressData = facilitySettings.facility_address as any;
        address = {
          street: addressData.street || '',
          city: addressData.city || '',
          state: addressData.state || '',
          zip: addressData.zip || ''
        };
      }

      setFormData({
        ...facilitySettings,
        facility_address: address
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

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddressChange = (field: keyof FacilityAddress, value: string) => {
    setFormData({
      ...formData,
      facility_address: { ...formData.facility_address, [field]: value }
    });
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
          <BasicInfoSection
            facilityName={formData.facility_name}
            totalLicensedBeds={formData.total_licensed_beds}
            onFacilityNameChange={(value) => handleFieldChange('facility_name', value)}
            onTotalBedsChange={(value) => setFormData({ ...formData, total_licensed_beds: value })}
          />

          <AddressSection
            address={formData.facility_address}
            onAddressChange={handleAddressChange}
          />

          <LicenseSection
            medicareProviderNumber={formData.medicare_provider_number}
            medicaidProviderNumber={formData.medicaid_provider_number}
            stateLicenseNumber={formData.state_license_number}
            federalTaxId={formData.federal_tax_id}
            npiNumber={formData.npi_number}
            onFieldChange={handleFieldChange}
          />

          <AdministratorSection
            administratorName={formData.administrator_name}
            administratorEmail={formData.administrator_email}
            administratorPhone={formData.administrator_phone}
            onFieldChange={handleFieldChange}
          />

          <MedicalDirectorSection
            medicalDirectorName={formData.medical_director_name}
            medicalDirectorNpi={formData.medical_director_npi}
            medicalDirectorPhone={formData.medical_director_phone}
            medicalDirectorEmail={formData.medical_director_email}
            onFieldChange={handleFieldChange}
          />

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
