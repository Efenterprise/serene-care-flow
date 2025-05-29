
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface CredentialField {
  key: string;
  label: string;
  type: string;
}

interface PlatformCredentialsFormProps {
  platformId: string;
  platformType: string;
  credentials: Record<string, any>;
  showCredentials: boolean;
  onCredentialChange: (field: string, value: string) => void;
  onToggleVisibility: () => void;
}

const PlatformCredentialsForm = ({
  platformId,
  platformType,
  credentials,
  showCredentials,
  onCredentialChange,
  onToggleVisibility
}: PlatformCredentialsFormProps) => {
  const getCredentialFields = (platformType: string): CredentialField[] => {
    switch (platformType) {
      case 'profility':
        return [
          { key: 'username', label: 'Username', type: 'text' },
          { key: 'password', label: 'Password', type: 'password' },
          { key: 'facilityId', label: 'Facility ID', type: 'text' }
        ];
      case 'reside':
        return [
          { key: 'apiKey', label: 'API Key', type: 'password' },
          { key: 'facilityCode', label: 'Facility Code', type: 'text' }
        ];
      case 'census_pro':
        return [
          { key: 'username', label: 'Username', type: 'text' },
          { key: 'password', label: 'Password', type: 'password' },
          { key: 'companyId', label: 'Company ID', type: 'text' }
        ];
      default:
        return [
          { key: 'username', label: 'Username', type: 'text' },
          { key: 'password', label: 'Password', type: 'password' }
        ];
    }
  };

  const credentialFields = getCredentialFields(platformType);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Credentials</h4>
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleVisibility}
        >
          {showCredentials ? (
            <EyeOff className="w-3 h-3" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </Button>
      </div>
      
      {showCredentials && (
        <div className="space-y-2">
          {credentialFields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={`${platformId}-${field.key}`} className="text-xs">
                {field.label}
              </Label>
              <Input
                id={`${platformId}-${field.key}`}
                type={field.type}
                placeholder={field.label}
                value={credentials?.[field.key] || ''}
                onChange={(e) => onCredentialChange(field.key, e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformCredentialsForm;
