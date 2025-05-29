
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wifi, 
  WifiOff, 
  Settings, 
  TestTube,
  Clock,
  Zap,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useReferralPlatforms } from "@/hooks/useReferralPlatforms";
import { useRealTimeReferrals } from "@/hooks/useRealTimeReferrals";
import { useToast } from "@/hooks/use-toast";

const LivePlatformConnections = () => {
  const { data: platforms, isLoading } = useReferralPlatforms();
  const { 
    isConnected, 
    connectionStatus, 
    activePlatforms, 
    subscribeToPlatform, 
    syncPlatformData, 
    testConnection 
  } = useRealTimeReferrals();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Record<string, any>>({});
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState<string | null>(null);
  const { toast } = useToast();

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600';
      case 'connecting':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4" />;
      case 'connecting':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <WifiOff className="w-4 h-4" />;
    }
  };

  const handleConnectPlatform = (platformId: string) => {
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: "Please establish real-time connection first",
        variant: "destructive",
      });
      return;
    }

    const platformCredentials = credentials[platformId] || {};
    subscribeToPlatform(platformId, platformCredentials);
  };

  const handleTestConnection = async (platformId: string, platformName: string) => {
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: "Please establish real-time connection first",
        variant: "destructive",
      });
      return;
    }

    setTesting(platformId);
    const platformCredentials = credentials[platformId] || {};
    testConnection(platformId, platformCredentials);
    
    // Reset testing state after 3 seconds
    setTimeout(() => setTesting(null), 3000);
  };

  const handleSyncPlatform = (platformId: string) => {
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: "Please establish real-time connection first",
        variant: "destructive",
      });
      return;
    }

    syncPlatformData(platformId);
  };

  const updateCredentials = (platformId: string, field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value
      }
    }));
  };

  const toggleShowCredentials = (platformId: string) => {
    setShowCredentials(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const getCredentialFields = (platformType: string) => {
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

  if (isLoading) {
    return <div>Loading platforms...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Real-time Connection Status */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Real-time Connection Status</span>
              <div className={`flex items-center space-x-1 ${getConnectionStatusColor()}`}>
                {getConnectionStatusIcon()}
                <span className="text-sm capitalize">{connectionStatus}</span>
              </div>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-100 text-green-800" : ""}>
              {activePlatforms.length} Active Platform{activePlatforms.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Platform Connections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms?.map((platform) => {
          const isActive = activePlatforms.includes(platform.id);
          const credentialFields = getCredentialFields(platform.platform_type);
          
          return (
            <Card key={platform.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {platform.platform_type === 'profility' && '🏥'}
                      {platform.platform_type === 'reside' && '🏠'}
                      {platform.platform_type === 'census_pro' && '📊'}
                      {!['profility', 'reside', 'census_pro'].includes(platform.platform_type) && '🔗'}
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
                  {/* Credentials Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Credentials</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleShowCredentials(platform.id)}
                      >
                        {showCredentials[platform.id] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    
                    {showCredentials[platform.id] && (
                      <div className="space-y-2">
                        {credentialFields.map((field) => (
                          <div key={field.key}>
                            <Label htmlFor={`${platform.id}-${field.key}`} className="text-xs">
                              {field.label}
                            </Label>
                            <Input
                              id={`${platform.id}-${field.key}`}
                              type={field.type}
                              placeholder={field.label}
                              value={credentials[platform.id]?.[field.key] || ''}
                              onChange={(e) => updateCredentials(platform.id, field.key, e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {!isActive ? (
                      <Button
                        size="sm"
                        onClick={() => handleConnectPlatform(platform.id)}
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
                        onClick={() => handleSyncPlatform(platform.id)}
                        className="flex-1"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Sync
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestConnection(platform.id, platform.name)}
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
        })}
      </div>

      {/* Add New Platform */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardContent className="flex items-center justify-center p-6">
          <Button variant="ghost" className="text-gray-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Platform Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePlatformConnections;
