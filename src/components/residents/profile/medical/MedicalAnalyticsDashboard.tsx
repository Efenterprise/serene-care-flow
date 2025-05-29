
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  TrendingUp, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Users,
  Calendar,
  FileText,
  Target
} from "lucide-react";

const MedicalAnalyticsDashboard = () => {
  // Mock analytics data
  const medicalMetrics = {
    totalProfessionals: 156,
    primaryProviders: 24,
    specialistReferrals: 89,
    pendingFollowUps: 12,
    averageResponseTime: "2.3 hours",
    patientSatisfaction: 94
  };

  const conditionDistribution = [
    { name: 'Cardiovascular', value: 35, color: '#8884d8' },
    { name: 'Orthopedic', value: 28, color: '#82ca9d' },
    { name: 'Neurological', value: 18, color: '#ffc658' },
    { name: 'Respiratory', value: 12, color: '#ff7300' },
    { name: 'Other', value: 7, color: '#0088fe' }
  ];

  const monthlyTrends = [
    { month: 'Jan', consultations: 45, followUps: 12, emergencies: 3 },
    { month: 'Feb', consultations: 52, followUps: 15, emergencies: 2 },
    { month: 'Mar', consultations: 48, followUps: 18, emergencies: 4 },
    { month: 'Apr', consultations: 61, followUps: 14, emergencies: 1 },
    { month: 'May', consultations: 55, followUps: 16, emergencies: 2 },
    { month: 'Jun', consultations: 67, followUps: 19, emergencies: 3 }
  ];

  const professionalPerformance = [
    { specialty: 'Cardiology', responseTime: 1.2, satisfaction: 96 },
    { specialty: 'Orthopedics', responseTime: 2.1, satisfaction: 94 },
    { specialty: 'Neurology', responseTime: 1.8, satisfaction: 92 },
    { specialty: 'Pulmonology', responseTime: 2.5, satisfaction: 89 },
    { specialty: 'Internal Medicine', responseTime: 1.5, satisfaction: 97 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Medical Analytics Dashboard</h3>
          <p className="text-gray-600">Comprehensive insights into medical professional management</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Professionals</p>
                <p className="text-2xl font-bold text-blue-600">{medicalMetrics.totalProfessionals}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Primary Providers</p>
                <p className="text-2xl font-bold text-green-600">{medicalMetrics.primaryProviders}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-orange-600">{medicalMetrics.averageResponseTime}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Follow-ups</p>
                <p className="text-2xl font-bold text-red-600">{medicalMetrics.pendingFollowUps}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Satisfaction</p>
                <p className="text-2xl font-bold text-purple-600">{medicalMetrics.patientSatisfaction}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Specialist Referrals</p>
                <p className="text-2xl font-bold text-teal-600">{medicalMetrics.specialistReferrals}</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-full">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="conditions">Condition Distribution</TabsTrigger>
          <TabsTrigger value="performance">Professional Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="consultations" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="followUps" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="emergencies" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle>Medical Condition Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={conditionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {conditionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Professional Performance by Specialty</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={professionalPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="specialty" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="responseTime" fill="#8884d8" name="Response Time (hrs)" />
                  <Bar yAxisId="right" dataKey="satisfaction" fill="#82ca9d" name="Satisfaction %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalAnalyticsDashboard;
