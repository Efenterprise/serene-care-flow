
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Download
} from "lucide-react";

const MdsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock MDS data
  const mdsAssessments = [
    {
      id: "1",
      patientName: "John Smith",
      mrn: "MRN12345",
      assessmentType: "Admission",
      dueDate: "2024-01-15",
      status: "completed",
      completedBy: "Jane Doe, RN",
      lastModified: "2024-01-14"
    },
    {
      id: "2",
      patientName: "Mary Johnson",
      mrn: "MRN12346",
      assessmentType: "Quarterly",
      dueDate: "2024-01-18",
      status: "in_progress",
      completedBy: "Mike Wilson, RN",
      lastModified: "2024-01-12"
    },
    {
      id: "3",
      patientName: "Robert Davis",
      mrn: "MRN12347",
      assessmentType: "Annual",
      dueDate: "2024-01-20",
      status: "overdue",
      completedBy: "",
      lastModified: "2024-01-10"
    },
    {
      id: "4",
      patientName: "Susan Brown",
      mrn: "MRN12348",
      assessmentType: "Discharge",
      dueDate: "2024-01-16",
      status: "pending",
      completedBy: "",
      lastModified: "2024-01-13"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const overdueCount = mdsAssessments.filter(a => a.status === 'overdue').length;
  const completedCount = mdsAssessments.filter(a => a.status === 'completed').length;
  const inProgressCount = mdsAssessments.filter(a => a.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">MDS Management</h2>
          <p className="text-gray-600">Minimum Data Set assessments and compliance tracking</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* MDS Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-bold text-red-600">{overdueCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Due This Week</p>
                <p className="text-xl font-bold text-purple-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by patient name or MRN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* MDS Assessments List */}
      <div className="grid gap-4">
        {mdsAssessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assessment.patientName}</h3>
                    <p className="text-sm text-gray-600">MRN: {assessment.mrn}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{assessment.assessmentType}</p>
                    <p className="text-xs text-gray-600">Due: {assessment.dueDate}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(assessment.status)}
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
              
              {assessment.completedBy && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Completed by: <span className="font-medium">{assessment.completedBy}</span>
                    <span className="ml-2">• Last modified: {assessment.lastModified}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MdsManagement;
