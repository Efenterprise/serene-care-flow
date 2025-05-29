
// Enhanced MDS Assessment Dashboard with PCC-style interface

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Filter,
  Download,
  Upload,
  Settings
} from "lucide-react";
import { mockMdsAssessments } from "./data/mockAssessments";
import MdsAssessmentCard from "./MdsAssessmentCard";
import MdsAssessmentForm from "./MdsAssessmentForm";
import MdsScheduler from "./MdsScheduler";
import { AssessmentType } from "@/types/mds";

interface MdsAssessmentDashboardProps {
  facilityId?: string;
}

const MdsAssessmentDashboard = ({ facilityId }: MdsAssessmentDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    assessmentType: 'all',
    unit: 'all',
    dueDate: 'all'
  });

  // Mock data - in real app this would come from API
  const assessments = mockMdsAssessments;
  
  // Calculate dashboard metrics
  const metrics = {
    totalAssessments: assessments.length,
    dueToday: assessments.filter(a => {
      const dueDate = new Date(a.dueDate);
      const today = new Date();
      return dueDate.toDateString() === today.toDateString();
    }).length,
    overdue: assessments.filter(a => {
      const dueDate = new Date(a.dueDate);
      const today = new Date();
      return dueDate < today && a.status !== 'completed';
    }).length,
    completed: assessments.filter(a => a.status === 'completed').length,
    inProgress: assessments.filter(a => a.status === 'in_progress').length,
    avgCompletionTime: 2.5, // days
    qualityScore: 94.2
  };

  const handleNewAssessment = () => {
    setSelectedAssessment(null);
    setShowAssessmentForm(true);
  };

  const handleEditAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setShowAssessmentForm(true);
  };

  const handleCloseForm = () => {
    setShowAssessmentForm(false);
    setSelectedAssessment(null);
  };

  const handleCreateAssessment = (residentId: string, assessmentType: AssessmentType) => {
    console.log('Creating assessment:', { residentId, assessmentType });
    setShowAssessmentForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MDS 3.0 Assessment Center</h1>
          <p className="text-gray-600">Comprehensive assessment management and quality tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button onClick={handleNewAssessment} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.totalAssessments}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Today</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.dueToday}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{metrics.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-green-600">{metrics.qualityScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessment Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessments.slice(0, 5).map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{assessment.patientName}</p>
                        <p className="text-sm text-gray-600">{assessment.assessmentType}</p>
                      </div>
                      <Badge 
                        className={
                          assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          assessment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }
                      >
                        {assessment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-lg font-bold text-green-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Completion Time</span>
                    <span className="text-lg font-bold">{metrics.avgCompletionTime} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">CAA Trigger Rate</span>
                    <span className="text-lg font-bold text-orange-600">68.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">HIPPS Accuracy</span>
                    <span className="text-lg font-bold text-blue-600">99.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-900">{metrics.overdue} Overdue Assessments</p>
                      <p className="text-sm text-red-700">Require immediate attention</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-orange-900">{metrics.dueToday} Due Today</p>
                      <p className="text-sm text-orange-700">Scheduled for completion</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-900">{metrics.inProgress} In Progress</p>
                      <p className="text-sm text-blue-700">Being completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Assessment Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Assessment Type</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.assessmentType}
                    onChange={(e) => setFilters({...filters, assessmentType: e.target.value})}
                  >
                    <option value="all">All Types</option>
                    <option value="admission">Admission</option>
                    <option value="annual">Annual</option>
                    <option value="significant_change">Significant Change</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="discharge">Discharge</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.unit}
                    onChange={(e) => setFilters({...filters, unit: e.target.value})}
                  >
                    <option value="all">All Units</option>
                    <option value="skilled">Skilled Care</option>
                    <option value="memory">Memory Care</option>
                    <option value="rehab">Rehabilitation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.dueDate}
                    onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Due Today</option>
                    <option value="week">This Week</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment List */}
          <div className="grid gap-4">
            {assessments.map((assessment) => (
              <MdsAssessmentCard 
                key={assessment.id} 
                assessment={assessment} 
                onEditAssessment={handleEditAssessment}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduler">
          <MdsScheduler onCreateAssessment={handleCreateAssessment} />
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Quality metrics dashboard will be implemented in Phase 5</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Advanced analytics will be implemented in Phase 7</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assessment Form Modal */}
      {showAssessmentForm && (
        <MdsAssessmentForm
          assessment={selectedAssessment}
          residentId={selectedAssessment?.mrn || "new-resident"}
          onSave={(assessment) => {
            console.log('Saving assessment:', assessment);
            handleCloseForm();
          }}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default MdsAssessmentDashboard;
