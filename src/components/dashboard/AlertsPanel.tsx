
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Alert {
  id: number;
  type: string;
  message: string;
  time: string;
  drilldownType?: 'incident' | 'assessment' | 'medication';
  drilldownId?: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const navigate = useNavigate();

  const handleAlertClick = (alert: Alert) => {
    console.log('Alert clicked:', alert);
    
    if (alert.drilldownType === 'incident' && alert.drilldownId) {
      // Navigate to incident management with specific incident
      navigate('/clinical', { 
        state: { 
          tab: 'incidents', 
          incidentId: alert.drilldownId 
        } 
      });
    } else if (alert.drilldownType === 'assessment') {
      // Navigate to UDA management
      navigate('/clinical', { 
        state: { 
          tab: 'uda' 
        } 
      });
    } else {
      // Default navigation to clinical management
      navigate('/clinical');
    }
  };

  // Update alerts to include drilldown information
  const enhancedAlerts = alerts.map(alert => {
    if (alert.message.includes('Room 105') && alert.message.includes('Fall')) {
      return {
        ...alert,
        drilldownType: 'incident' as const,
        drilldownId: 'INC-001'
      };
    } else if (alert.message.includes('MDS due')) {
      return {
        ...alert,
        drilldownType: 'assessment' as const
      };
    }
    return alert;
  });

  return (
    <Card className="lg:col-span-2 border-0 shadow-sm bg-white/70">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Priority Alerts</span>
        </CardTitle>
        <CardDescription>Items requiring immediate attention (click to drill down)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {enhancedAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => handleAlertClick(alert)}
          >
            <div className={`w-2 h-2 rounded-full mt-2 ${
              alert.type === 'urgent' ? 'bg-red-500' : 
              alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {alert.message}
              </p>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {alert.time}
              </p>
              {alert.drilldownType && (
                <p className="text-xs text-blue-600 mt-1">
                  Click to view {alert.drilldownType === 'incident' ? 'incident details' : 'more information'}
                </p>
              )}
            </div>
            <Button size="sm" variant="outline" onClick={(e) => {
              e.stopPropagation();
              handleAlertClick(alert);
            }}>
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
