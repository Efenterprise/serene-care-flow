
import { useState } from "react";
import DiscoveryScanner from "./discovery/DiscoveryScanner";
import DiscoveredPlatformsList, { DiscoveredPlatform } from "./discovery/DiscoveredPlatformsList";

interface PlatformAutoDiscoveryProps {
  onPlatformFound: (platform: DiscoveredPlatform) => void;
}

const PlatformAutoDiscovery = ({ onPlatformFound }: PlatformAutoDiscoveryProps) => {
  const [discoveredPlatforms, setDiscoveredPlatforms] = useState<DiscoveredPlatform[]>([]);

  const handlePlatformsDiscovered = (platforms: DiscoveredPlatform[]) => {
    setDiscoveredPlatforms(platforms);
  };

  return (
    <div className="space-y-6">
      <DiscoveryScanner onPlatformsDiscovered={handlePlatformsDiscovered} />
      <DiscoveredPlatformsList 
        platforms={discoveredPlatforms}
        onPlatformConnect={onPlatformFound}
      />
    </div>
  );
};

export default PlatformAutoDiscovery;
