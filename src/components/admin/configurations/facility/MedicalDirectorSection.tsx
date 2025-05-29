
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MedicalDirectorSectionProps {
  medicalDirectorName: string;
  medicalDirectorNpi: string;
  medicalDirectorPhone: string;
  medicalDirectorEmail: string;
  onFieldChange: (field: string, value: string) => void;
}

const MedicalDirectorSection = ({ 
  medicalDirectorName,
  medicalDirectorNpi,
  medicalDirectorPhone,
  medicalDirectorEmail,
  onFieldChange
}: MedicalDirectorSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Medical Director Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="medical_director_name">Medical Director Name</Label>
          <Input
            id="medical_director_name"
            value={medicalDirectorName}
            onChange={(e) => onFieldChange('medical_director_name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="medical_director_npi">Medical Director NPI</Label>
          <Input
            id="medical_director_npi"
            value={medicalDirectorNpi}
            onChange={(e) => onFieldChange('medical_director_npi', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="medical_director_phone">Medical Director Phone</Label>
          <Input
            id="medical_director_phone"
            type="tel"
            value={medicalDirectorPhone}
            onChange={(e) => onFieldChange('medical_director_phone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="medical_director_email">Medical Director Email</Label>
          <Input
            id="medical_director_email"
            type="email"
            value={medicalDirectorEmail}
            onChange={(e) => onFieldChange('medical_director_email', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalDirectorSection;
