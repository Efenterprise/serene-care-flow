
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Plus,
  CheckCircle2,
  Users
} from "lucide-react";
import { AssessmentType } from "@/types/mds";

interface ScheduledAssessment {
  id: string;
  resident_id: string;
  resident_name: string;
  mrn: string;
  assessment_type: AssessmentType;
  due_date: string;
  days_until_due: number;
  priority: 'high' | 'medium' | 'low';
  coordinator_assigned?: string;
  compliance_status: 'compliant' | 'due_soon' | 'overdue';
}

interface MdsSchedulerProps {
  onCreateAssessment: (residentId: string, assessmentType: AssessmentType) => void;
}

const MdsScheduler = ({ onCreateAssessment }: MdsSchedulerProps) => {
  const [scheduledAssessments, setScheduledAssessments] = useState<ScheduledAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScheduledAssessments();
  }, []);

  const loadScheduledAssessments = async () => {
    setLoading(true);
    
    // Mock data - would come from API
    const mockAssessments: ScheduledAssessment[] = [
      {
        id: '1',
        resident_id: 'res-001',
        resident_name: 'John Smith',
        mrn: 'MRN12345',
        assessment_type: 'quarterly',
        due_date: '2024-02-01',
        days_until_due: 3,
        priority: 'high',
        coordinator_assigned: 'Jane Doe, RN',
        compliance_status: 'due_soon'
      },
      {
        id: '2',
        resident_id: 'res-002',
        resident_name: 'Mary Johnson',
        mrn: 'MRN12346',
        assessment_type: 'annual',
        due_date: '2024-01-25',
        days_until_due: -4,
        priority: 'high',
        coordinator_assigned: 'Mike Wilson, RN',
        compliance_status: 'overdue'
      },
      {
        id: '3',
        resident_id: 'res-003',
        resident_name: 'Robert Davis',
        mrn: 'MRN12347',
        assessment_type: 'significant_change',
        due_date: '2024-02-10',
        days_until_due: 12,
        priority: 'medium',
        compliance_status: 'compliant'
      }
    ];

    setScheduledAssessments(mockAssessments);
    setLoading(false);
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'due_soon': return 'bg-yellow-100 text-yellow-800';
      case 'compliant': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const overdueCount = scheduledAssessments.filter(a => a.compliance_status === 'overdue').length;
  const dueSoonCount = scheduledAssessments.filter(a => a.compliance_status === 'due_soon').length;
  const compliantCount = scheduledAssessments.filter(a => a.compliance_status === 'compliant').length;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading assessment schedule...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{dueSoonCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliant</p>
                <p className="text-2xl font-bold text-green-600">{compliantCount}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Assessments Alert */}
      {overdueCount > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{overdueCount} assessment(s) overdue!</strong> Immediate attention required to maintain compliance.
          </AlertDescription>
        </Alert>
      )}

      {/* Assessment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Assessment Schedule
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Assessment
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledAssessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(assessment.priority)}`} />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {assessment.resident_name} ({assessment.mrn})
                      </h4>
                      <p className="text-sm text-gray-600">
                        {assessment.assessment_type.replace('_', ' ')} Assessment
                      </p>
                      {assessment.coordinator_assigned && (
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          {assessment.coordinator_assigned}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Due: {new Date(assessment.due_date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600">
                        {assessment.days_until_due < 0 
                          ? `${Math.abs(assessment.days_until_due)} days overdue`
                          : `${assessment.days_until_due} days remaining`
                        }
                      </p>
                    </div>

                    <Badge className={getComplianceColor(assessment.compliance_status)}>
                      {assessment.compliance_status.replace('_', ' ')}
                    </Badge>

                    <Button 
                      size="sm"
                      onClick={() => onCreateAssessment(assessment.resident_id, assessment.assessment_type)}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">MDS Compliance Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>5-Day Assessments:</strong> Complete within 5 days of admission</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>14-Day Assessments:</strong> Complete within 14 days of admission</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>Quarterly Assessments:</strong> Complete every 92 days</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>Annual Assessments:</strong> Complete within 366 days of previous annual</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>Significant Change:</strong> Complete within 14 days of significant change</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MdsScheduler;
