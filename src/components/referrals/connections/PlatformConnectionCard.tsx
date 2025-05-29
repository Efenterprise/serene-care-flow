
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  WifiOff, 
  RefreshCw,
  TestTube,
  Clock,
  CheckCircle2
} from "lucide-react";
import PlatformCredentialsForm from "./PlatformCredentialsForm";

interface Platform {
  id: string;
  name: string;
  platform_type: string;
}

interface PlatformConnectionCardProps {
  platform: Platform;
  isActive: boolean;
  isConnected: boolean;
  testing: string | null;
  credentials: Record<string, any>;
  showCredentials: Record<string, boolean>;
  onConnect: (platformId: string) => void;
  onSync: (platformId: string) => void;
  onTest: (platformId: string, platformName: string) => void;
  onCredentialChange: (platformId: string, field: string, value: string) => void;
  onToggleCredentials: (platformId: string) => void;
}

const PlatformConnectionCard = ({
  platform,
  isActive,
  isConnected,
  testing,
  credentials,
  showCredentials,
  onConnect,
  onSync,
  onTest,
  onCredentialChange,
  onToggleCredentials
}: PlatformConnectionCardProps) => {
  const getPlatformIcon = (platformType: string) => {
    switch (platformType) {
      case 'profility': return '🏥';
      case 'reside': return '🏠';
      case 'census_pro': return '📊';
      default: return '🔗';
    }
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {getPlatformIcon(platform.platform_type)}
            </div>
            <div>
              <CardTitle className="text-lg">{platform.name}</CardTitle>
              <p className="text-sm text-gray-600 capitalize">{platform.platform_type}</p>
            </div>
          </div>
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className={isActive ? "bg-green-100 text-green-800" : ""}
          >
            {isActive ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PlatformCredentialsForm
            platformId={platform.id}
            platformType={platform.platform_type}
            credentials={credentials[platform.id]}
            showCredentials={showCredentials[platform.id]}
            onCredentialChange={(field, value) => onCredentialChange(platform.id, field, value)}
            onToggleVisibility={() => onToggleCredentials(platform.id)}
          />

          <div className="flex space-x-2">
            {!isActive ? (
              <Button
                size="sm"
                onClick={() => onConnect(platform.id)}
                disabled={!isConnected}
                className="flex-1"
              >
                <Wifi className="w-3 h-3 mr-1" />
                Connect
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSync(platform.id)}
                className="flex-1"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Sync
              </Button>
            )}
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onTest(platform.id, platform.name)}
              disabled={testing === platform.id || !isConnected}
            >
              {testing === platform.id ? (
                <Clock className="w-3 h-3 animate-spin" />
              ) : (
                <TestTube className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformConnectionCard;
