
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Building,
  Network
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiscoveredPlatform {
  id: string;
  name: string;
  type: string;
  url: string;
  status: 'available' | 'connected' | 'error';
  version?: string;
  lastSeen?: string;
  confidence: number;
}

const PlatformAutoDiscovery = ({ onPlatformFound }: { onPlatformFound: (platform: DiscoveredPlatform) => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredPlatforms, setDiscoveredPlatforms] = useState<DiscoveredPlatform[]>([]);
  const [facilityDomain, setFacilityDomain] = useState("");
  const { toast } = useToast();

  const knownPlatforms = [
    {
      name: "Careport WellSky",
      type: "careport", 
      patterns: ["careport", "wellsky", "care-port"],
      ports: [443, 80, 8080, 8443],
      endpoints: ["/api/referrals", "/careport", "/wellsky", "/api/v1"]
    },
    {
      name: "Profility",
      type: "profility",
      patterns: ["profility", "prof-ility"],
      ports: [443, 80, 8080],
      endpoints: ["/api/referral", "/profility", "/api/v2"]
    },
    {
      name: "Reside",
      type: "reside",
      patterns: ["reside", "reside-platform"],
      ports: [443, 80],
      endpoints: ["/api/referrals", "/reside", "/api"]
    },
    {
      name: "Epic MyChart",
      type: "epic",
      patterns: ["mychart", "epic"],
      ports: [443, 80],
      endpoints: ["/mychart", "/api/epic", "/interconnect-prd-oauth2"]
    },
    {
      name: "Cerner PowerChart",
      type: "cerner",
      patterns: ["powerchart", "cerner"],
      ports: [443, 80],
      endpoints: ["/powerchart", "/cerner", "/api/fhir"]
    }
  ];

  const scanForPlatforms = async () => {
    setIsScanning(true);
    setDiscoveredPlatforms([]);

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
          setDiscoveredPlatforms(prev => [...prev, discovered]);
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
        setDiscoveredPlatforms(mockPlatforms);
      }

      toast({
        title: "Discovery Complete",
        description: `Found ${results.length} platform${results.length !== 1 ? 's' : ''}`,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'connected':
        return <Wifi className="w-5 h-5 text-blue-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <WifiOff className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return "bg-green-100 text-green-800";
      case 'connected': 
        return "bg-blue-100 text-blue-800";
      case 'error':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Platform Auto-Discovery</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="domain">Facility Domain (optional)</Label>
            <Input
              id="domain"
              placeholder="e.g., stjohnshospital, citymedical"
              value={facilityDomain}
              onChange={(e) => setFacilityDomain(e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-gray-600 mt-1">
              Enter your facility's domain name to improve discovery accuracy
            </p>
          </div>

          <Button
            onClick={scanForPlatforms}
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
        </CardContent>
      </Card>

      {discoveredPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Discovered Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {discoveredPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(platform.status)}
                      <Building className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.url}</p>
                      {platform.version && (
                        <p className="text-xs text-gray-500">Version: {platform.version}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <Badge className={getStatusColor(platform.status)}>
                        {platform.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {platform.confidence}% confidence
                      </p>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => onPlatformFound(platform)}
                      disabled={platform.status === 'error'}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
    </div>
  );
};

export default PlatformAutoDiscovery;
