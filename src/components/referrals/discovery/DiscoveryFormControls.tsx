
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface DiscoveryFormControlsProps {
  facilityDomain: string;
  onFacilityDomainChange: (value: string) => void;
  isScanning: boolean;
  onScan: () => void;
}

const DiscoveryFormControls = ({ 
  facilityDomain, 
  onFacilityDomainChange, 
  isScanning, 
  onScan 
}: DiscoveryFormControlsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="domain">Facility Domain (optional)</Label>
        <Input
          id="domain"
          placeholder="e.g., stjohnshospital, citymedical"
          value={facilityDomain}
          onChange={(e) => onFacilityDomainChange(e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-gray-600 mt-1">
          Enter your facility's domain name to improve discovery accuracy
        </p>
      </div>

      <Button
        onClick={onScan}
        disabled={isScanning}
        className="w-full"
      >
        {isScanning ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Scanning Network...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Discover Platforms
          </>
        )}
      </Button>
    </div>
  );
};

export default DiscoveryFormControls;
