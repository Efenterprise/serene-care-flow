
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

interface MdsAssessment {
  id: string;
  patientName: string;
  mrn: string;
  assessmentType: string;
  dueDate: string;
  status: string;
  completedBy: string;
  lastModified: string;
}

interface MdsAssessmentCardProps {
  assessment: MdsAssessment;
}

const MdsAssessmentCard = ({ assessment }: MdsAssessmentCardProps) => {
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
  );
};

export default MdsAssessmentCard;
