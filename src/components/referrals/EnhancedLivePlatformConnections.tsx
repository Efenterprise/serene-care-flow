
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useReferralPlatforms } from "@/hooks/useReferralPlatforms";
import { useRealTimeReferrals } from "@/hooks/useRealTimeReferrals";
import LivePlatformConnections from "./LivePlatformConnections";
import ConnectionWizardDialog from "./ConnectionWizardDialog";
import PlatformAutoDiscovery from "./PlatformAutoDiscovery";
import ConnectionStatsCards from "./ConnectionStatsCards";
import ConnectionTabsList from "./ConnectionTabsList";
import ConnectionPerformancePanel from "./ConnectionPerformancePanel";
import PlatformHealthPanel from "./PlatformHealthPanel";

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
      <ConnectionStatsCards 
        connectionStats={connectionStats}
        isConnected={isConnected}
        activePlatforms={activePlatforms}
      />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ConnectionTabsList
          isConnected={isConnected}
          onAddCareport={() => handleNewConnection("careport", "Careport WellSky")}
          onAddProfility={() => handleNewConnection("profility", "Profility")}
        />

        <TabsContent value="connections" className="space-y-6">
          <LivePlatformConnections />
        </TabsContent>

        <TabsContent value="discovery" className="space-y-6">
          <PlatformAutoDiscovery onPlatformFound={handlePlatformDiscovered} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <ConnectionPerformancePanel />
            <PlatformHealthPanel platforms={platforms} />
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
