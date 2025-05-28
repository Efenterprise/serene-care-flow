
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Zap,
  Hospital
} from "lucide-react";
import { useReferralPlatforms } from "@/hooks/useReferralPlatforms";
import { IntegrationService } from "@/services/integrationService";
import { useToast } from "@/hooks/use-toast";
import EmrDashboard from "../emr/EmrDashboard";

const PlatformManager = () => {
  const { data: platforms, isLoading, refetch } = useReferralPlatforms();
  const [syncing, setSyncing] = useState<string | null>(null);
  const [syncingAll, setSyncingAll] = useState(false);
  const [showEmrDashboard, setShowEmrDashboard] = useState(false);
  const { toast } = useToast();

  const handleSyncPlatform = async (platformId: string, platformName: string) => {
    setSyncing(platformId);
    try {
      const results = await IntegrationService.syncPlatformReferrals(platformId);
      toast({
        title: "Sync Successful",
        description: `Synced ${results.length} referrals from ${platformName}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: `Failed to sync ${platformName}: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setSyncing(null);
    }
  };

  const handleSyncAll = async () => {
    setSyncingAll(true);
    try {
      const results = await IntegrationService.syncAllPlatforms();
      const successCount = results.filter(r => !r.error).length;
      const errorCount = results.filter(r => r.error).length;
      
      toast({
        title: "Sync Complete",
        description: `${successCount} platforms synced successfully${errorCount > 0 ? `, ${errorCount} failed` : ""}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync platforms",
        variant: "destructive",
      });
    } finally {
      setSyncingAll(false);
    }
  };

  const getPlatformIcon = (platformType: string) => {
    const emrSystems = ['epic', 'allscripts', 'cerner', 'meditech', 'nextgen', 'athenahealth'];
    if (emrSystems.includes(platformType)) {
      return "🏥";
    }
    
    switch (platformType) {
      case "profility":
        return "🧠";
      case "reside":
        return "🏠";
      case "census_pro":
        return "📊";
      default:
        return "🔗";
    }
  };

  const isEmrPlatform = (platformType: string) => {
    return ['epic', 'allscripts', 'cerner', 'meditech', 'nextgen', 'athenahealth'].includes(platformType);
  };

  const formatLastSync = (lastSync: string | null) => {
    if (!lastSync) return "Never";
    const date = new Date(lastSync);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (showEmrDashboard) {
    return (
      <div>
        <Button 
          onClick={() => setShowEmrDashboard(false)}
          variant="outline"
          className="mb-6"
        >
          ← Back to Platform Manager
        </Button>
        <EmrDashboard />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integration Platforms</h2>
          <p className="text-gray-600">Manage connections to referral platforms and EMR systems</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => setShowEmrDashboard(true)}
            variant="outline"
            className="text-blue-600 hover:text-blue-700"
          >
            <Hospital className="w-4 h-4 mr-2" />
            EMR Dashboard
          </Button>
          <Button 
            onClick={handleSyncAll}
            disabled={syncingAll || syncing !== null}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {syncingAll ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            Sync All Platforms
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms?.map((platform) => (
          <Card key={platform.id} className={`border-0 shadow-sm hover:shadow-md transition-shadow ${isEmrPlatform(platform.platform_type) ? 'ring-2 ring-blue-100' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getPlatformIcon(platform.platform_type)}</span>
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <p className="text-sm text-gray-600 capitalize">
                      {platform.platform_type.replace('_', ' ')}
                      {isEmrPlatform(platform.platform_type) && (
                        <Badge variant="outline" className="ml-2 text-xs">EMR</Badge>
                      )}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={platform.is_active ? "default" : "secondary"}
                  className={platform.is_active ? "bg-green-100 text-green-800" : ""}
                >
                  {platform.is_active ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Sync</span>
                  <span className="font-medium">
                    {formatLastSync(platform.last_sync_at)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rate Limit</span>
                  <span className="font-medium">
                    {platform.rate_limit_per_hour}/hour
                  </span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSyncPlatform(platform.id, platform.name)}
                    disabled={syncing === platform.id || syncingAll}
                    className="flex-1"
                  >
                    {syncing === platform.id ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Sync
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlatformManager;
