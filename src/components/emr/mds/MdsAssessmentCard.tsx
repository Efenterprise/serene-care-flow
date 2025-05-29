
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, CheckCircle2, AlertTriangle, Clock, Brain, Edit } from "lucide-react";

interface MdsAssessment {
  id: string;
  patientName: string;
  mrn: string;
  assessmentType: string;
  dueDate: string;
  status: string;
  completedBy: string;
  lastModified: string;
  completion_percentage?: number;
  caa_triggers?: any[];
}

interface MdsAssessmentCardProps {
  assessment: MdsAssessment;
  onEditAssessment?: (assessment: MdsAssessment) => void;
}

const MdsAssessmentCard = ({ assessment, onEditAssessment }: MdsAssessmentCardProps) => {
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

  const completionPercentage = assessment.completion_percentage || 0;
  const caaTriggersCount = assessment.caa_triggers?.length || 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
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
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => onEditAssessment?.(assessment)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          </div>
        </div>
        
        {/* Progress and CAA Info */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Completion Progress</span>
            <span className="text-sm text-gray-600">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          {caaTriggersCount > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">CAA Triggers</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">
                {caaTriggersCount} triggered
              </Badge>
            </div>
          )}
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
  );
};

export default MdsAssessmentCard;
