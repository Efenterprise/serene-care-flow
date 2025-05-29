
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle,
  Wifi,
  WifiOff,
  Building
} from "lucide-react";

export interface DiscoveredPlatform {
  id: string;
  name: string;
  type: string;
  url: string;
  status: 'available' | 'connected' | 'error';
  version?: string;
  lastSeen?: string;
  confidence: number;
}

interface DiscoveredPlatformsListProps {
  platforms: DiscoveredPlatform[];
  onPlatformConnect: (platform: DiscoveredPlatform) => void;
}

const DiscoveredPlatformsList = ({ platforms, onPlatformConnect }: DiscoveredPlatformsListProps) => {
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

  if (platforms.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discovered Platforms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platforms.map((platform) => (
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
                  onClick={() => onPlatformConnect(platform)}
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
  );
};

export default DiscoveredPlatformsList;
