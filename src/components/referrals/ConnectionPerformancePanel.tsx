
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConnectionPerformancePanel = () => {
  return (
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
  );
};

export default ConnectionPerformancePanel;
