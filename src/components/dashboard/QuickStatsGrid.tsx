
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Shield,
  CheckCircle
} from "lucide-react";
import { useFacilityStore } from "@/stores/facilityStore";
import { useEffect, useCallback } from "react";

const QuickStatsGrid = () => {
  const { stats, isLoading, fetchFacilityStats } = useFacilityStore();

  // Use useCallback to prevent infinite loops
  const handleFetchStats = useCallback(() => {
    fetchFacilityStats();
  }, []);

  useEffect(() => {
    handleFetchStats();
  }, [handleFetchStats]);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-sm bg-white/70">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
          <div className="text-2xl font-bold text-gray-900">
            {stats.occupiedBeds}/{stats.totalBeds}
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Progress value={stats.occupancyRate} className="flex-1" />
            <span className="text-sm text-gray-600">{stats.occupancyRate}%</span>
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
              <span className="font-semibold text-green-600">+{stats.todayAdmissions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discharges</span>
              <span className="font-semibold text-orange-600">-{stats.todayDischarges}</span>
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
