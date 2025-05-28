
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Stethoscope, 
  Heart, 
  Activity, 
  Pill,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  ClipboardList,
  Calendar
} from "lucide-react";

const ClinicalDashboard = () => {
  // Mock clinical data
  const clinicalMetrics = {
    totalPatients: 42,
    criticalPatients: 3,
    medicationAlerts: 7,
    pendingOrders: 12,
    qualityScore: 94,
    fallRiskPatients: 8,
    infectionControl: 98,
    careplanCompliance: 87
  };

  const recentAlerts = [
    {
      id: "1",
      type: "medication",
      severity: "high",
      patient: "John Smith (Room 101)",
      message: "Drug interaction alert: Warfarin + Aspirin",
      time: "10 minutes ago"
    },
    {
      id: "2",
      type: "vital",
      severity: "medium",
      patient: "Mary Johnson (Room 203)",
      message: "Blood pressure reading outside normal range",
      time: "25 minutes ago"
    },
    {
      id: "3",
      type: "fall_risk",
      severity: "medium",
      patient: "Robert Davis (Room 105)",
      message: "Patient assessed as high fall risk",
      time: "1 hour ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="w-4 h-4" />;
      case 'vital':
        return <Heart className="w-4 h-4" />;
      case 'fall_risk':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clinical Dashboard</h2>
          <p className="text-gray-600">Real-time clinical monitoring and patient care oversight</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ClipboardList className="w-4 h-4 mr-2" />
          Clinical Report
        </Button>
      </div>

      {/* Clinical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{clinicalMetrics.totalPatients}</p>
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
                <p className="text-sm font-medium text-gray-600">Critical Patients</p>
                <p className="text-2xl font-bold text-red-600">{clinicalMetrics.criticalPatients}</p>
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
                <p className="text-sm font-medium text-gray-600">Med Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{clinicalMetrics.medicationAlerts}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Pill className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-green-600">{clinicalMetrics.qualityScore}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Fall Risk Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>High Risk Patients</span>
                <span className="font-medium">{clinicalMetrics.fallRiskPatients}</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-gray-600">85% compliance with fall prevention protocols</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Stethoscope className="w-5 h-5 mr-2 text-blue-500" />
              Infection Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Compliance Rate</span>
                <span className="font-medium">{clinicalMetrics.infectionControl}%</span>
              </div>
              <Progress value={clinicalMetrics.infectionControl} className="h-2" />
              <p className="text-xs text-gray-600">Hand hygiene and isolation protocols</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <ClipboardList className="w-5 h-5 mr-2 text-green-500" />
              Care Plan Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On Track</span>
                <span className="font-medium">{clinicalMetrics.careplanCompliance}%</span>
              </div>
              <Progress value={clinicalMetrics.careplanCompliance} className="h-2" />
              <p className="text-xs text-gray-600">Care plans up to date and followed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clinical Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Recent Clinical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{alert.patient}</p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
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

export default ClinicalDashboard;
