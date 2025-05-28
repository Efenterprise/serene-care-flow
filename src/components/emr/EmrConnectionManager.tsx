
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Settings, 
  TestTube,
  Clock,
  Zap
} from "lucide-react";
import { useEmrConnections, useTestEmrConnection } from "@/hooks/useEmrConnections";
import { useToast } from "@/hooks/use-toast";

const EmrConnectionManager = () => {
  const { data: connections, isLoading } = useEmrConnections();
  const testConnection = useTestEmrConnection();
  const [testing, setTesting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTestConnection = async (connectionId: string, platformName: string) => {
    setTesting(connectionId);
    try {
      await testConnection.mutateAsync(connectionId);
      toast({
        title: "Connection Test Successful",
        description: `Successfully connected to ${platformName}`,
      });
    } catch (error) {
      toast({
        title: "Connection Test Failed",
        description: `Failed to connect to ${platformName}`,
        variant: "destructive",
      });
    } finally {
      setTesting(null);
    }
  };

  const getConnectionTypeIcon = (type: string) => {
    switch (type) {
      case "fhir":
        return "🔗";
      case "hl7":
        return "📡";
      case "api":
        return "⚡";
      case "webhook":
        return "🔔";
      default:
        return "🔌";
    }
  };

  const formatLastConnection = (lastConnection: string | null) => {
    if (!lastConnection) return "Never";
    const date = new Date(lastConnection);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return <div>Loading EMR connections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">EMR Connection Manager</h2>
          <p className="text-gray-600">Monitor and manage hospital system integrations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Zap className="w-4 h-4 mr-2" />
          Add New Connection
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections?.map((connection) => (
          <Card key={connection.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getConnectionTypeIcon(connection.connection_type)}</span>
                  <div>
                    <CardTitle className="text-lg">{connection.platform?.name}</CardTitle>
                    <p className="text-sm text-gray-600 capitalize">
                      {connection.connection_type} • {connection.authentication_method}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={connection.is_active ? "default" : "secondary"}
                  className={connection.is_active ? "bg-green-100 text-green-800" : ""}
                >
                  {connection.is_active ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Connection</span>
                  <span className="font-medium">
                    {formatLastConnection(connection.last_successful_connection)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rate Limit</span>
                  <span className="font-medium">
                    {connection.current_usage}/{connection.requests_per_minute}/min
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Daily Usage</span>
                  <span className="font-medium">
                    {connection.current_usage}/{connection.daily_request_limit}
                  </span>
                </div>

                {connection.connection_errors && (
                  <div className="p-2 bg-red-50 rounded text-sm text-red-700">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Connection issues detected
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTestConnection(connection.id, connection.platform?.name || 'Unknown')}
                    disabled={testing === connection.id}
                    className="flex-1"
                  >
                    {testing === connection.id ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <TestTube className="w-4 h-4 mr-2" />
                    )}
                    Test
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

export default EmrConnectionManager;
