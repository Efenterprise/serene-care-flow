
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface ConnectionStatsProps {
  connectionStats: {
    total: number;
    active: number;
    inactive: number;
    uptime: string;
  };
  isConnected: boolean;
  activePlatforms: string[];
}

const ConnectionStatsCards = ({ connectionStats, isConnected, activePlatforms }: ConnectionStatsProps) => {
  return (
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
  );
};

export default ConnectionStatsCards;
