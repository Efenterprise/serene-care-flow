
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FacilityAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressSectionProps {
  address: FacilityAddress;
  onAddressChange: (field: keyof FacilityAddress, value: string) => void;
}

const AddressSection = ({ address, onAddressChange }: AddressSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            value={address?.street || ''}
            onChange={(e) => onAddressChange('street', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={address?.city || ''}
            onChange={(e) => onAddressChange('city', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={address?.state || ''}
            onChange={(e) => onAddressChange('state', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input
            id="zip"
            value={address?.zip || ''}
            onChange={(e) => onAddressChange('zip', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
