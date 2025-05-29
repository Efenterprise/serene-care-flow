
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  WifiOff, 
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface ConnectionStatusHeaderProps {
  isConnected: boolean;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  activePlatforms: string[];
}

const ConnectionStatusHeader = ({ 
  isConnected, 
  connectionStatus, 
  activePlatforms 
}: ConnectionStatusHeaderProps) => {
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

  return (
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
  );
};

export default ConnectionStatusHeader;
