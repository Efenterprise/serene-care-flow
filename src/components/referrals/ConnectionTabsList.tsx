
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Network,
  Activity,
  TrendingUp,
  Zap
} from "lucide-react";

interface ConnectionTabsListProps {
  isConnected: boolean;
  onAddCareport: () => void;
  onAddProfility: () => void;
}

const ConnectionTabsList = ({ isConnected, onAddCareport, onAddProfility }: ConnectionTabsListProps) => {
  return (
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
          onClick={onAddCareport}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Careport
        </Button>
        <Button 
          variant="outline"
          onClick={onAddProfility}
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
  );
};

export default ConnectionTabsList;
