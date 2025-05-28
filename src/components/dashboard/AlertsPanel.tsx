
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";

interface Alert {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  return (
    <Card className="lg:col-span-2 border-0 shadow-sm bg-white/70">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Priority Alerts</span>
        </CardTitle>
        <CardDescription>Items requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              alert.type === 'urgent' ? 'bg-red-500' : 
              alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.message}</p>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {alert.time}
              </p>
            </div>
            <Button size="sm" variant="outline">View</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
