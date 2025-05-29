
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BasicInfoSectionProps {
  facilityName: string;
  totalLicensedBeds: number;
  onFacilityNameChange: (value: string) => void;
  onTotalBedsChange: (value: number) => void;
}

const BasicInfoSection = ({ 
  facilityName, 
  totalLicensedBeds, 
  onFacilityNameChange, 
  onTotalBedsChange 
}: BasicInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="facility_name">Facility Name</Label>
        <Input
          id="facility_name"
          value={facilityName}
          onChange={(e) => onFacilityNameChange(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="total_licensed_beds">Total Licensed Beds</Label>
        <Input
          id="total_licensed_beds"
          type="number"
          value={totalLicensedBeds}
          onChange={(e) => onTotalBedsChange(parseInt(e.target.value))}
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
