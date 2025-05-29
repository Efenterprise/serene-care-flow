
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  TrendingUp,
  Target
} from "lucide-react";
import { useFacilityStore } from "@/stores/facilityStore";

const TherapyMetricsCards = () => {
  const { therapyStats } = useFacilityStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{therapyStats.activePatients}</div>
          <p className="text-xs text-green-600">Matches current residents</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
          <Calendar className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{therapyStats.todaySessions}</div>
          <p className="text-xs text-gray-600">
            {therapyStats.completedSessions} completed, {therapyStats.remainingSessions} remaining
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Goal Achievement</CardTitle>
          <Target className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{therapyStats.goalAchievementRate}%</div>
          <Progress value={therapyStats.goalAchievementRate} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(therapyStats.monthlyRevenue / 1000).toFixed(0)}K
          </div>
          <p className="text-xs text-green-600">+12% vs last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapyMetricsCards;
