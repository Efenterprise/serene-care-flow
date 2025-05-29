
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdministratorSectionProps {
  administratorName: string;
  administratorEmail: string;
  administratorPhone: string;
  onFieldChange: (field: string, value: string) => void;
}

const AdministratorSection = ({ 
  administratorName,
  administratorEmail,
  administratorPhone,
  onFieldChange
}: AdministratorSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Administrator Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="administrator_name">Administrator Name</Label>
          <Input
            id="administrator_name"
            value={administratorName}
            onChange={(e) => onFieldChange('administrator_name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="administrator_email">Administrator Email</Label>
          <Input
            id="administrator_email"
            type="email"
            value={administratorEmail}
            onChange={(e) => onFieldChange('administrator_email', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="administrator_phone">Administrator Phone</Label>
          <Input
            id="administrator_phone"
            type="tel"
            value={administratorPhone}
            onChange={(e) => onFieldChange('administrator_phone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdministratorSection;
