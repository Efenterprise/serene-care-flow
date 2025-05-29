
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { knownPlatforms } from "./PlatformDiscoveryConfig";
import { DiscoveredPlatform } from "./DiscoveredPlatformsList";
import DiscoveryFormControls from "./DiscoveryFormControls";

interface DiscoveryScannerProps {
  onPlatformsDiscovered: (platforms: DiscoveredPlatform[]) => void;
}

const DiscoveryScanner = ({ onPlatformsDiscovered }: DiscoveryScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [facilityDomain, setFacilityDomain] = useState("");
  const { toast } = useToast();

  const scanForPlatforms = async () => {
    setIsScanning(true);

    try {
      // Simulate network discovery process
      const results: DiscoveredPlatform[] = [];
      
      for (const platform of knownPlatforms) {
        // Simulate discovery delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock discovery results based on facility domain
        const isLikelyPresent = facilityDomain.toLowerCase().includes(platform.patterns[0]) || 
                               Math.random() > 0.7; // Random chance for demo

        if (isLikelyPresent) {
          const discovered: DiscoveredPlatform = {
            id: `${platform.type}-${Date.now()}`,
            name: platform.name,
            type: platform.type,
            url: `https://${facilityDomain || 'facility'}.${platform.patterns[0]}.com`,
            status: Math.random() > 0.3 ? 'available' : 'error',
            version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`,
            lastSeen: new Date().toISOString(),
            confidence: Math.floor(Math.random() * 40) + 60 // 60-100%
          };
          
          results.push(discovered);
        }
      }

      if (results.length === 0) {
        // Add some mock platforms for demo
        const mockPlatforms = [
          {
            id: "careport-demo",
            name: "Careport WellSky",
            type: "careport",
            url: "https://facility.careport.com",
            status: 'available' as const,
            version: "v4.2",
            lastSeen: new Date().toISOString(),
            confidence: 95
          },
          {
            id: "profility-demo", 
            name: "Profility",
            type: "profility",
            url: "https://facility.profility.com",
            status: 'available' as const,
            version: "v3.1",
            lastSeen: new Date().toISOString(),
            confidence: 88
          }
        ];
        onPlatformsDiscovered(mockPlatforms);
      } else {
        onPlatformsDiscovered(results);
      }

      toast({
        title: "Discovery Complete",
        description: `Found ${results.length || 2} platform${results.length !== 1 ? 's' : ''}`,
      });

    } catch (error) {
      toast({
        title: "Discovery Error",
        description: "Failed to scan for platforms. Please try again.",
        variant: "destructive",
      });
    }

    setIsScanning(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Platform Auto-Discovery</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DiscoveryFormControls
            facilityDomain={facilityDomain}
            onFacilityDomainChange={setFacilityDomain}
            isScanning={isScanning}
            onScan={scanForPlatforms}
          />
        </CardContent>
      </Card>

      {isScanning && (
        <Card>
          <CardContent className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="font-medium mb-2">Scanning Network</h3>
            <p className="text-sm text-gray-600">
              Searching for hospital platforms and referral systems...
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DiscoveryScanner;
