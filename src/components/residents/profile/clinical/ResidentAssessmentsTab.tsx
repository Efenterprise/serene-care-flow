
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Plus, 
  Calendar,
  FileText,
  TrendingUp,
  Clock
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentAssessmentsTabProps {
  resident: Resident;
}

const ResidentAssessmentsTab = ({ resident }: ResidentAssessmentsTabProps) => {
  // Mock assessment data
  const assessments = [
    {
      id: 1,
      type: "MDS 3.0",
      status: "completed",
      dueDate: "2024-01-15",
      completedDate: "2024-01-14",
      completedBy: "Sarah Johnson, RN",
      nextDue: "2024-04-15",
      category: "Quarterly"
    },
    {
      id: 2,
      type: "Care Plan Assessment",
      status: "in_progress",
      dueDate: "2024-01-25",
      category: "Care Planning"
    },
    {
      id: 3,
      type: "Falls Risk Assessment",
      status: "completed",
      dueDate: "2024-01-20",
      completedDate: "2024-01-19",
      completedBy: "Mike Wilson, RN",
      score: "High Risk",
      category: "Safety"
    },
    {
      id: 4,
      type: "Nutrition Screening",
      status: "due",
      dueDate: "2024-01-22",
      category: "Nutrition"
    },
    {
      id: 5,
      type: "Cognitive Assessment",
      status: "completed",
      dueDate: "2024-01-10",
      completedDate: "2024-01-09",
      completedBy: "Dr. Smith",
      score: "Mild Impairment",
      category: "Cognitive"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'due':
        return 'bg-orange-100 text-orange-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Quarterly':
        return 'bg-purple-100 text-purple-800';
      case 'Care Planning':
        return 'bg-blue-100 text-blue-800';
      case 'Safety':
        return 'bg-red-100 text-red-800';
      case 'Nutrition':
        return 'bg-green-100 text-green-800';
      case 'Cognitive':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssessmentIcon = (type: string) => {
    if (type.includes('MDS')) return '📋';
    if (type.includes('Falls')) return '⚠️';
    if (type.includes('Nutrition')) return '🍎';
    if (type.includes('Cognitive')) return '🧠';
    if (type.includes('Care Plan')) return '📝';
    return '📊';
  };

  return (
    <div className="space-y-6">
      {/* Header with New Assessment Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Assessments</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Assessment Categories Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:bg-blue-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold">MDS 3.0</h3>
            <p className="text-sm text-gray-600">Quarterly assessment</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-red-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-semibold">Falls Risk</h3>
            <p className="text-sm text-gray-600">Safety assessment</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-green-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🍎</div>
            <h3 className="font-semibold">Nutrition</h3>
            <p className="text-sm text-gray-600">Dietary screening</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-yellow-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="font-semibold">Cognitive</h3>
            <p className="text-sm text-gray-600">Mental status</p>
          </CardContent>
        </Card>
      </div>

      {/* Assessment List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="w-5 h-5 mr-2" />
            Assessment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getAssessmentIcon(assessment.type)}</span>
                      <div>
                        <h4 className="font-semibold text-lg">{assessment.type}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(assessment.status)}>
                            {assessment.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getCategoryColor(assessment.category)}>
                            {assessment.category}
                          </Badge>
                          {assessment.score && (
                            <Badge variant="outline">
                              {assessment.score}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Due Date:</span>
                          <p className="font-medium">{assessment.dueDate}</p>
                        </div>
                      </div>
                      
                      {assessment.completedDate && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-gray-600">Completed:</span>
                            <p className="font-medium">{assessment.completedDate}</p>
                          </div>
                        </div>
                      )}
                      
                      {assessment.completedBy && (
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-gray-600">Completed By:</span>
                            <p className="font-medium">{assessment.completedBy}</p>
                          </div>
                        </div>
                      )}
                      
                      {assessment.nextDue && (
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-gray-600">Next Due:</span>
                            <p className="font-medium">{assessment.nextDue}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {assessment.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    )}
                    {(assessment.status === 'due' || assessment.status === 'in_progress') && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        {assessment.status === 'in_progress' ? 'Continue' : 'Start'}
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Completed</span>
                <Badge className="bg-green-100 text-green-800">
                  {assessments.filter(a => a.status === 'completed').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>In Progress</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {assessments.filter(a => a.status === 'in_progress').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Due</span>
                <Badge className="bg-orange-100 text-orange-800">
                  {assessments.filter(a => a.status === 'due').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Assessments Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessments
                .filter(a => a.status === 'due' || a.nextDue)
                .slice(0, 3)
                .map((assessment) => (
                  <div key={assessment.id} className="flex justify-between items-center">
                    <span className="text-sm">{assessment.type}</span>
                    <span className="text-sm text-gray-600">
                      {assessment.status === 'due' ? assessment.dueDate : assessment.nextDue}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResidentAssessmentsTab;
