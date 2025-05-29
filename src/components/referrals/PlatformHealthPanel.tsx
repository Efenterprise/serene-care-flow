
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Platform {
  id: string;
  name: string;
  platform_type: string;
}

interface PlatformHealthPanelProps {
  platforms?: Platform[];
}

const PlatformHealthPanel = ({ platforms }: PlatformHealthPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platforms?.slice(0, 3).map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{platform.name}</div>
                <div className="text-sm text-gray-600 capitalize">{platform.platform_type}</div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                Healthy
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformHealthPanel;
