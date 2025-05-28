
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Shield,
  CheckCircle
} from "lucide-react";

interface QuickStatsGridProps {
  censusData: {
    total: number;
    occupied: number;
    admissions: number;
    discharges: number;
    occupancyRate: number;
  };
}

const QuickStatsGrid = ({ censusData }: QuickStatsGridProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Census</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{censusData.occupied}/{censusData.total}</div>
          <div className="flex items-center space-x-2 mt-2">
            <Progress value={censusData.occupancyRate} className="flex-1" />
            <span className="text-sm text-gray-600">{censusData.occupancyRate}%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Movement</CardTitle>
            <BarChart3 className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Admissions</span>
              <span className="font-semibold text-green-600">+{censusData.admissions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discharges</span>
              <span className="font-semibold text-orange-600">-{censusData.discharges}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Active Alerts</CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">7</div>
          <div className="text-sm text-gray-600 mt-1">2 urgent, 5 routine</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Survey Readiness</CardTitle>
            <Shield className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Compliant</span>
          </div>
          <div className="text-xs text-gray-600 mt-1">Last audit: 30 days ago</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStatsGrid;
