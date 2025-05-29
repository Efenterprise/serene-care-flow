
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Settings,
  Activity,
  Network,
  Zap,
  TrendingUp
} from "lucide-react";
import { useReferralPlatforms } from "@/hooks/useReferralPlatforms";
import { useRealTimeReferrals } from "@/hooks/useRealTimeReferrals";
import LivePlatformConnections from "./LivePlatformConnections";
import ConnectionWizardDialog from "./ConnectionWizardDialog";
import PlatformAutoDiscovery from "./PlatformAutoDiscovery";

const EnhancedLivePlatformConnections = () => {
  const { data: platforms } = useReferralPlatforms();
  const { isConnected, connectionStatus, activePlatforms } = useRealTimeReferrals();
  const [showWizard, setShowWizard] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{ type: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState("connections");

  const handleNewConnection = (platformType: string, platformName: string) => {
    setSelectedPlatform({ type: platformType, name: platformName });
    setShowWizard(true);
  };

  const handlePlatformDiscovered = (platform: any) => {
    handleNewConnection(platform.type, platform.name);
  };

  const handleConnectionComplete = (credentials: any) => {
    console.log("Connection completed with credentials:", credentials);
    // Here you would typically save the credentials and establish the connection
  };

  const connectionStats = {
    total: platforms?.length || 0,
    active: activePlatforms.length,
    inactive: (platforms?.length || 0) - activePlatforms.length,
    uptime: "99.8%"
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{connectionStats.active}</div>
            <div className="text-sm text-gray-600">Active Connections</div>
            <div className="text-xs text-green-600 mt-1">
              {isConnected ? "Real-time" : "Offline"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{connectionStats.total}</div>
            <div className="text-sm text-gray-600">Total Platforms</div>
            <div className="text-xs text-gray-500 mt-1">Configured</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{connectionStats.uptime}</div>
            <div className="text-sm text-gray-600">Uptime</div>
            <div className="text-xs text-green-600 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {activePlatforms.length > 0 ? "Live" : "Idle"}
            </div>
            <div className="text-sm text-gray-600">Status</div>
            <div className="text-xs text-purple-600 mt-1">
              {activePlatforms.length} syncing
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="connections" className="flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>Live Connections</span>
            </TabsTrigger>
            <TabsTrigger value="discovery" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Auto-Discovery</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              onClick={() => handleNewConnection("careport", "Careport WellSky")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Careport
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleNewConnection("profility", "Profility")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Profility
            </Button>
            {isConnected && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Zap className="w-3 h-3 mr-1" />
                Real-time Active
              </Badge>
            )}
          </div>
        </div>

        <TabsContent value="connections" className="space-y-6">
          <LivePlatformConnections />
        </TabsContent>

        <TabsContent value="discovery" className="space-y-6">
          <PlatformAutoDiscovery onPlatformFound={handlePlatformDiscovered} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-medium">127ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sync Frequency</span>
                    <span className="font-medium">Real-time</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <span className="font-medium text-green-600">0.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Successful Syncs (24h)</span>
                    <span className="font-medium">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platforms?.slice(0, 3).map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-gray-600 capitalize">{platform.platform_type}</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Healthy
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Connection Wizard Dialog */}
      <ConnectionWizardDialog
        isOpen={showWizard}
        onClose={() => {
          setShowWizard(false);
          setSelectedPlatform(null);
        }}
        platformType={selectedPlatform?.type || ""}
        platformName={selectedPlatform?.name || ""}
        onConnectionComplete={handleConnectionComplete}
      />
    </div>
  );
};

export default EnhancedLivePlatformConnections;
