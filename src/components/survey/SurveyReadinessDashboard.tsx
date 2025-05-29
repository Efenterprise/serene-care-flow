
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  Calendar, 
  Users, 
  Building,
  ClipboardList,
  TrendingUp,
  Download
} from "lucide-react";

const SurveyReadinessDashboard = () => {
  const overallReadiness = 87;
  const lastSurveyDate = "March 15, 2023";
  const nextExpectedSurvey = "March 2024";
  const daysUntilExpected = 42;

  const complianceAreas = [
    { name: "Life Safety & Environment", score: 92, status: "good", priority: "low" },
    { name: "Nursing Services", score: 89, status: "good", priority: "medium" },
    { name: "Dietary Services", score: 78, status: "warning", priority: "high" },
    { name: "Administration", score: 94, status: "good", priority: "low" },
    { name: "Resident Rights", score: 85, status: "good", priority: "medium" },
    { name: "Quality Assurance", score: 82, status: "warning", priority: "medium" },
  ];

  const criticalItems = [
    { item: "Fire drill documentation - Q4 2023", dueDate: "Dec 31, 2023", priority: "high" },
    { item: "Dietary manager certification renewal", dueDate: "Jan 15, 2024", priority: "high" },
    { item: "Policy review - Infection Control", dueDate: "Feb 1, 2024", priority: "medium" },
    { item: "Staff training - Emergency procedures", dueDate: "Feb 15, 2024", priority: "medium" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "critical": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Survey Readiness Dashboard</h2>
          <p className="text-gray-600">Comprehensive survey preparation and compliance monitoring</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ClipboardList className="w-4 h-4 mr-2" />
            Generate Survey Package
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Readiness</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{overallReadiness}%</div>
            <Progress value={overallReadiness} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Survey ready status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Survey</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastSurveyDate}</div>
            <p className="text-xs text-gray-600 mt-1">Annual recertification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Survey</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextExpectedSurvey}</div>
            <p className="text-xs text-yellow-600 mt-1">{daysUntilExpected} days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <FileCheck className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalItems.length}</div>
            <p className="text-xs text-gray-600 mt-1">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Compliance Areas Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{area.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(area.priority)}>
                        {area.priority} priority
                      </Badge>
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(area.status)}`}>
                        {area.score}%
                      </span>
                    </div>
                  </div>
                  <Progress value={area.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            Critical Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{item.item}</h3>
                  <p className="text-sm text-gray-600">Due: {item.dueDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyReadinessDashboard;
