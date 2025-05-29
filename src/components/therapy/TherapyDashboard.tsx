import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Calendar, 
  Users, 
  TrendingUp,
  Clock,
  Target,
  FileCheck,
  Video,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useFacilityStore } from "@/stores/facilityStore";
import { useEffect } from "react";

const TherapyDashboard = () => {
  const { therapyStats, fetchTherapyStats } = useFacilityStore();

  useEffect(() => {
    fetchTherapyStats();
  }, [fetchTherapyStats]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Therapy Dashboard</h2>
          <p className="text-gray-600">Complete therapy management - The Rehab Optima killer!</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Video className="w-4 h-4 mr-2" />
            Start Telehealth
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </div>

      {/* Key Metrics - Now using centralized data */}
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

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Priority Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  patient: "Mary Johnson", 
                  action: "Initial PT Evaluation", 
                  time: "9:00 AM",
                  therapist: "Dr. Sarah Wilson",
                  priority: "high",
                  type: "evaluation"
                },
                { 
                  patient: "Robert Chen", 
                  action: "Discharge Planning Meeting", 
                  time: "10:30 AM",
                  therapist: "Team Meeting",
                  priority: "medium",
                  type: "planning"
                },
                { 
                  patient: "Linda Davis", 
                  action: "Insurance Auth Expiring", 
                  time: "Today",
                  therapist: "Admin Required",
                  priority: "high",
                  type: "admin"
                },
                { 
                  patient: "James Miller", 
                  action: "Telehealth Follow-up", 
                  time: "2:00 PM",
                  therapist: "Dr. Mike Rodriguez",
                  priority: "low",
                  type: "telehealth"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {item.type === 'evaluation' && <FileCheck className="w-5 h-5 text-blue-600" />}
                    {item.type === 'planning' && <Users className="w-5 h-5 text-green-600" />}
                    {item.type === 'admin' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    {item.type === 'telehealth' && <Video className="w-5 h-5 text-purple-600" />}
                    <div>
                      <h3 className="font-medium">{item.patient}</h3>
                      <p className="text-sm text-gray-600">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.therapist}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-medium">{item.time}</p>
                      <Badge className={
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {item.priority}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">Action</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Therapist Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Dr. Sarah Wilson", discipline: "PT", utilization: 94, sessions: 8 },
                { name: "Mike Rodriguez", discipline: "OT", utilization: 89, sessions: 7 },
                { name: "Lisa Chen", discipline: "ST", utilization: 92, sessions: 6 },
                { name: "David Kim", discipline: "PT", utilization: 87, sessions: 9 }
              ].map((therapist, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{therapist.name}</p>
                      <p className="text-sm text-gray-600">{therapist.discipline} • {therapist.sessions} sessions</p>
                    </div>
                    <span className="text-sm font-medium">{therapist.utilization}%</span>
                  </div>
                  <Progress value={therapist.utilization} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Outcomes & Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: "Dorothy Williams", outcome: "Mobility Goal Achieved", improvement: "+15 points on Berg Balance", date: "Today" },
                { patient: "Frank Thompson", outcome: "Discharged Home", improvement: "Independent transfers", date: "Yesterday" },
                { patient: "Grace Martinez", outcome: "Speech Clarity Improved", improvement: "80% intelligibility", date: "2 days ago" }
              ].map((outcome, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">{outcome.patient}</h4>
                    <p className="text-sm text-gray-600">{outcome.outcome}</p>
                    <p className="text-xs text-green-600">{outcome.improvement}</p>
                  </div>
                  <span className="text-xs text-gray-500">{outcome.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Patient Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20" />
                  <span className="text-sm font-medium">95%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Goal Achievement Rate</span>
                <div className="flex items-center space-x-2">
                  <Progress value={therapyStats.goalAchievementRate} className="w-20" />
                  <span className="text-sm font-medium">{therapyStats.goalAchievementRate}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Documentation Compliance</span>
                <div className="flex items-center space-x-2">
                  <Progress value={98} className="w-20" />
                  <span className="text-sm font-medium">98%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Insurance Approval Rate</span>
                <div className="flex items-center space-x-2">
                  <Progress value={92} className="w-20" />
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TherapyDashboard;
