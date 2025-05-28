
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, Bell, User, Calendar, BarChart3, Users, AlertTriangle, CheckCircle, Clock, MessageCircle, Shield, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import BedBoard from "@/components/BedBoard";

const Dashboard = () => {
  const [currentTime] = useState(new Date().toLocaleString());

  const censusData = {
    total: 120,
    occupied: 95,
    admissions: 3,
    discharges: 1,
    occupancyRate: 79.2
  };

  const alerts = [
    { id: 1, type: "urgent", message: "Room 105 - Fall incident requires documentation", time: "10 min ago" },
    { id: 2, type: "warning", message: "MDS due for 3 residents this week", time: "1 hour ago" },
    { id: 3, type: "info", message: "Medication reconciliation complete - Unit A", time: "2 hours ago" }
  ];

  const recentActivities = [
    { id: 1, action: "Vitals recorded", resident: "Mary Johnson", user: "RN Sarah", time: "5 min ago" },
    { id: 2, action: "Care plan updated", resident: "Robert Smith", user: "LPN Mike", time: "15 min ago" },
    { id: 3, action: "MDS assessment completed", resident: "Helen Davis", user: "MDS Coord.", time: "30 min ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Serene Care</span>
              </div>
              <Badge variant="secondary">Sunrise Manor SNF</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/emr">
                <Button variant="ghost" size="sm">
                  <Activity className="w-4 h-4 mr-2" />
                  EMR Hub
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
                RN Sarah M.
              </Button>
              <Link to="/">
                <Button variant="outline" size="sm">Exit Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Sarah!</h1>
          <p className="text-gray-600">Here's what's happening at Sunrise Manor today • {currentTime}</p>
        </div>

        {/* Quick Stats */}
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="residents">Bed Board</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Alerts */}
              <Card className="lg:col-span-2 border-0 shadow-sm bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Priority Alerts</span>
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'urgent' ? 'bg-red-500' : 
                        alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {alert.time}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-sm bg-white/70">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest documentation and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity) => (
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
            </div>
          </TabsContent>

          <TabsContent value="residents" className="h-[800px]">
            <BedBoard />
          </TabsContent>

          <TabsContent value="clinical">
            <Card className="border-0 shadow-sm bg-white/70">
              <CardHeader>
                <CardTitle>Clinical Dashboard</CardTitle>
                <CardDescription>Color-coded flags and drill-down analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Intelligence</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Dynamic views for pressure ulcers, infections, falls, and rehospitalizations with predictive insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-0 shadow-sm bg-white/70">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>EBITDAR drivers and quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Executive Reporting</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Comprehensive dashboards for staffing vs acuity, Five-Star trends, and financial performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
