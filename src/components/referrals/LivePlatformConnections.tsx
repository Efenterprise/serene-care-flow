
import { useState } from "react";
import { useReferralPlatforms } from "@/hooks/useReferralPlatforms";
import { useRealTimeReferrals } from "@/hooks/useRealTimeReferrals";
import { useToast } from "@/hooks/use-toast";
import ConnectionStatusHeader from "./connections/ConnectionStatusHeader";
import PlatformConnectionCard from "./connections/PlatformConnectionCard";
import AddPlatformCard from "./connections/AddPlatformCard";

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
  const [credentials, setCredentials] = useState<Record<string, any>>({});
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleAddCareport = () => {
    toast({
      title: "WellSky Careport Integration",
      description: "Contact your administrator to configure WellSky Careport integration",
    });
  };

  const handleAddProfility = () => {
    toast({
      title: "Profility Integration",
      description: "Contact your administrator to configure Profility integration",
    });
  };

  if (isLoading) {
    return <div>Loading platforms...</div>;
  }

  return (
    <div className="space-y-6">
      <ConnectionStatusHeader
        isConnected={isConnected}
        connectionStatus={connectionStatus}
        activePlatforms={activePlatforms}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms?.map((platform) => {
          const isActive = activePlatforms.includes(platform.id);
          
          return (
            <PlatformConnectionCard
              key={platform.id}
              platform={platform}
              isActive={isActive}
              isConnected={isConnected}
              testing={testing}
              credentials={credentials}
              showCredentials={showCredentials}
              onConnect={handleConnectPlatform}
              onSync={handleSyncPlatform}
              onTest={handleTestConnection}
              onCredentialChange={updateCredentials}
              onToggleCredentials={toggleShowCredentials}
            />
          );
        })}

        <AddPlatformCard 
          onAddCareport={handleAddCareport}
          onAddProfility={handleAddProfility}
        />
      </div>
    </div>
  );
};

export default LivePlatformConnections;
