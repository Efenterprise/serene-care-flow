
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Activity {
  id: number;
  action: string;
  resident: string;
  user: string;
  time: string;
}

interface RecentActivityPanelProps {
  activities: Activity[];
}

const RecentActivityPanel = ({ activities }: RecentActivityPanelProps) => {
  return (
    <Card className="border-0 shadow-sm bg-white/70">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest documentation and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-600">{activity.resident} • {activity.user}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivityPanel;
