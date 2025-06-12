
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Stethoscope, 
  FileText, 
  Calendar,
  ArrowRight,
  Activity,
  Clock,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "./WelcomeSection";
import { useFacilityStore } from "@/stores/facilityStore";

const DashboardContent = () => {
  const [currentTime] = useState(new Date().toLocaleString());
  const { stats } = useFacilityStore();
  const navigate = useNavigate();

  const alerts = [
    { 
      id: 1, 
      type: "urgent", 
      message: "Room 105 - Fall incident requires documentation", 
      time: "10 min ago",
      action: () => navigate('/clinical?tab=incidents')
    },
    { 
      id: 2, 
      type: "warning", 
      message: "MDS due for 3 residents this week", 
      time: "1 hour ago",
      action: () => navigate('/clinical?tab=uda')
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: "Vitals recorded", 
      resident: "Mary Johnson", 
      user: "RN Sarah", 
      time: "5 min ago",
      onClick: () => navigate('/residents')
    },
    { 
      id: 2, 
      action: "Care plan updated", 
      resident: "Robert Smith", 
      user: "LPN Mike", 
      time: "15 min ago",
      onClick: () => navigate('/clinical?tab=care-plans')
    }
  ];

  return (
    <div className="space-y-8">
      <WelcomeSection currentTime={currentTime} />
      
      {/* Key Metrics - All Clickable */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card 
          className="border-0 shadow-md bg-white hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/residents')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Current Census</CardTitle>
              <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.occupiedBeds}/{stats.totalBeds}
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Progress value={stats.occupancyRate} className="flex-1" />
              <span className="text-sm text-gray-600">{stats.occupancyRate}%</span>
            </div>
            <p className="text-xs text-blue-600 group-hover:text-blue-800">Click to view residents →</p>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-md bg-white hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/clinical')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Active Alerts</CardTitle>
              <AlertTriangle className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">7</div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-red-100 text-red-800">2 urgent</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">5 routine</Badge>
            </div>
            <p className="text-xs text-red-600 group-hover:text-red-800">Click to manage alerts →</p>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-md bg-white hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/residents')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Today's Movement</CardTitle>
              <Activity className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Admissions</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="font-semibold text-green-600">+{stats.todayAdmissions}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Discharges</span>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-3 h-3 text-orange-600" />
                  <span className="font-semibold text-orange-600">-{stats.todayDischarges}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-green-600 group-hover:text-green-800">Click to view details →</p>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-md bg-white hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/admin')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Compliance</CardTitle>
              <Shield className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
            <div className="text-sm text-gray-600 mb-2">Survey Ready</div>
            <p className="text-xs text-green-600 group-hover:text-green-800">Click to view reports →</p>
          </CardContent>
        </Card>
      </div>

      {/* Primary Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card 
          className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/clinical')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-200 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <CardTitle className="text-lg">Clinical Management</CardTitle>
                  <CardDescription>Care plans, incidents, assessments</CardDescription>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-700">42</div>
                <div className="text-blue-600">Active Care Plans</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-700">5</div>
                <div className="text-blue-600">Open Incidents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/residents')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-200 rounded-lg">
                  <Users className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <CardTitle className="text-lg">Resident Management</CardTitle>
                  <CardDescription>Profiles, documentation, care</CardDescription>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-green-700">{stats.currentResidents}</div>
                <div className="text-green-600">Current Residents</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-700">12</div>
                <div className="text-green-600">Tasks Due</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => navigate('/emr')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-200 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <CardTitle className="text-lg">Documentation</CardTitle>
                  <CardDescription>EMR, MDS, assessments</CardDescription>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">8</div>
                <div className="text-purple-600">MDS Due</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">156</div>
                <div className="text-purple-600">Records Updated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Alerts and Activities */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Priority Alerts</span>
            </CardTitle>
            <CardDescription>Click any alert to take action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group"
                onClick={alert.action}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'urgent' ? 'bg-red-500' : 'bg-amber-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Click any activity to view details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group"
                onClick={activity.onClick}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-600">{activity.resident} • {activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
