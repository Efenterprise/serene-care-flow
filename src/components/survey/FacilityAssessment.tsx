
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Shield, 
  Users, 
  Utensils, 
  Heart, 
  FileText,
  Save,
  Download,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const FacilityAssessment = () => {
  const [currentSection, setCurrentSection] = useState("overview");
  const [assessmentData, setAssessmentData] = useState({
    overview: {
      facilityName: "Sunset Manor Care Center",
      address: "123 Healthcare Drive, Springfield, IL 62701",
      licenseNumber: "SNF-IL-2023-456",
      administrator: "John Smith",
      totalBeds: 120,
      occupancyRate: 94.2,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
  });

  const assessmentSections = [
    { id: "overview", label: "Facility Overview", icon: Building, completion: 100 },
    { id: "life-safety", label: "Life Safety", icon: Shield, completion: 85 },
    { id: "nursing", label: "Nursing Services", icon: Heart, completion: 92 },
    { id: "dietary", label: "Dietary Services", icon: Utensils, completion: 78 },
    { id: "administration", label: "Administration", icon: Users, completion: 88 },
    { id: "resident-rights", label: "Resident Rights", icon: FileText, completion: 95 }
  ];

  const facilityMetrics = [
    { label: "Licensed Beds", value: "120", status: "current" },
    { label: "Current Census", value: "113", status: "current" },
    { label: "Occupancy Rate", value: "94.2%", status: "good" },
    { label: "Staff Ratio (RN)", value: "1:15", status: "good" },
    { label: "Staff Ratio (CNA)", value: "1:8", status: "good" },
    { label: "Deficiency-Free Surveys", value: "2/5", status: "warning" }
  ];

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return "text-green-600";
    if (completion >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800">Good</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>;
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Current</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facility Assessment</h2>
          <p className="text-gray-600">Comprehensive facility assessment for survey readiness</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Progress
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Assessment
          </Button>
        </div>
      </div>

      {/* Assessment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${getCompletionColor(section.completion)}`}>
                      {section.completion}%
                    </span>
                  </div>
                  <Progress value={section.completion} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Facility Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-600" />
            Facility Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility Name</label>
                <Input 
                  value={assessmentData.overview.facilityName}
                  onChange={(e) => setAssessmentData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, facilityName: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <Textarea 
                  value={assessmentData.overview.address}
                  onChange={(e) => setAssessmentData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, address: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <Input 
                  value={assessmentData.overview.licenseNumber}
                  onChange={(e) => setAssessmentData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, licenseNumber: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Administrator</label>
                <Input 
                  value={assessmentData.overview.administrator}
                  onChange={(e) => setAssessmentData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, administrator: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Licensed Beds</label>
                <Input 
                  type="number"
                  value={assessmentData.overview.totalBeds}
                  onChange={(e) => setAssessmentData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, totalBeds: parseInt(e.target.value) }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Occupancy Rate (%)</label>
                <Input 
                  type="number"
                  step="0.1"
                  value={assessmentData.overview.occupancyRate}
                  onChange={(e) => setAssessmentData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, occupancyRate: parseFloat(e.target.value) }
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Facility Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilityMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  {getStatusBadge(metric.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Preparation Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="w-6 h-6" />
              <span>Generate Document Checklist</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="w-6 h-6" />
              <span>Staff Training Review</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Shield className="w-6 h-6" />
              <span>Safety Compliance Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityAssessment;
