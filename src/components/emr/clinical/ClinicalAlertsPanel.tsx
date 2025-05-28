
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Pill, Heart } from "lucide-react";

interface ClinicalAlert {
  id: string;
  type: string;
  severity: string;
  patient: string;
  message: string;
  time: string;
}

interface ClinicalAlertsPanelProps {
  alerts: ClinicalAlert[];
}

const ClinicalAlertsPanel = ({ alerts }: ClinicalAlertsPanelProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="w-4 h-4" />;
      case 'vital':
        return <Heart className="w-4 h-4" />;
      case 'fall_risk':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
          Recent Clinical Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{alert.patient}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalAlertsPanel;
