
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Hospital,
  Home,
  Clock
} from "lucide-react";

interface Unit {
  id: string;
  name: string;
  beds: number;
  occupied: number;
}

interface CensusMetricsProps {
  units: Unit[];
}

const CensusMetrics = ({ units }: CensusMetricsProps) => {
  const totalBeds = units.find(u => u.id === "all")?.beds || 0;
  const totalOccupied = units.find(u => u.id === "all")?.occupied || 0;
  const occupancyRate = Math.round((totalOccupied / totalBeds) * 100);

  const todayStats = {
    admissions: 3,
    discharges: 1,
    transfers: 2,
    pendingAdmits: 5,
    revenue: 47250,
    avgLOS: 18.5
  };

  return (
    <div className="grid md:grid-cols-6 gap-4 mb-6">
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Total Census</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalOccupied}/{totalBeds}</div>
          <div className="flex items-center space-x-2 mt-2">
            <Progress value={occupancyRate} className="flex-1" />
            <span className="text-sm text-gray-600">{occupancyRate}%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Admissions</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">+{todayStats.admissions}</div>
          <div className="text-sm text-gray-600 mt-1">Today</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Discharges</CardTitle>
            <TrendingDown className="w-4 h-4 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">-{todayStats.discharges}</div>
          <div className="text-sm text-gray-600 mt-1">Today</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{todayStats.pendingAdmits}</div>
          <div className="text-sm text-gray-600 mt-1">Ready to admit</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Daily Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">${(todayStats.revenue / 1000).toFixed(0)}k</div>
          <div className="text-sm text-gray-600 mt-1">Projected</div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Avg LOS</CardTitle>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{todayStats.avgLOS}</div>
          <div className="text-sm text-gray-600 mt-1">Days</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CensusMetrics;
