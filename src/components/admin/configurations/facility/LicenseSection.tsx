
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LicenseSectionProps {
  medicareProviderNumber: string;
  medicaidProviderNumber: string;
  stateLicenseNumber: string;
  federalTaxId: string;
  npiNumber: string;
  onFieldChange: (field: string, value: string) => void;
}

const LicenseSection = ({ 
  medicareProviderNumber,
  medicaidProviderNumber,
  stateLicenseNumber,
  federalTaxId,
  npiNumber,
  onFieldChange
}: LicenseSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">License & Provider Numbers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="medicare_provider_number">Medicare Provider Number</Label>
          <Input
            id="medicare_provider_number"
            value={medicareProviderNumber}
            onChange={(e) => onFieldChange('medicare_provider_number', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="medicaid_provider_number">Medicaid Provider Number</Label>
          <Input
            id="medicaid_provider_number"
            value={medicaidProviderNumber}
            onChange={(e) => onFieldChange('medicaid_provider_number', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="state_license_number">State License Number</Label>
          <Input
            id="state_license_number"
            value={stateLicenseNumber}
            onChange={(e) => onFieldChange('state_license_number', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="federal_tax_id">Federal Tax ID</Label>
          <Input
            id="federal_tax_id"
            value={federalTaxId}
            onChange={(e) => onFieldChange('federal_tax_id', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="npi_number">NPI Number</Label>
          <Input
            id="npi_number"
            value={npiNumber}
            onChange={(e) => onFieldChange('npi_number', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LicenseSection;
