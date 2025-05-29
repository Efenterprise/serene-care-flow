
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, User, Calendar } from "lucide-react";

interface InProgressAssessment {
  id: string;
  residentName: string;
  assessmentType: string;
  startedBy: string;
  startedDate: string;
  percentComplete: number;
  estimatedCompletion: string;
  priority: 'low' | 'medium' | 'high';
}

const UdaInProgressList = () => {
  // Mock data for in-progress assessments
  const inProgressAssessments: InProgressAssessment[] = [
    {
      id: '1',
      residentName: 'Johnson, Mary',
      assessmentType: 'MDS 3.0 Quarterly Assessment',
      startedBy: 'Sarah Wilson, RN',
      startedDate: '05/28/2025 09:15',
      percentComplete: 65,
      estimatedCompletion: '05/29/2025',
      priority: 'high'
    },
    {
      id: '2',
      residentName: 'Smith, Robert',
      assessmentType: 'Care Area Assessment - Falls',
      startedBy: 'Mike Chen, LPN',
      startedDate: '05/28/2025 14:30',
      percentComplete: 30,
      estimatedCompletion: '05/30/2025',
      priority: 'medium'
    },
    {
      id: '3',
      residentName: 'Davis, Helen',
      assessmentType: 'Nutrition Evaluation',
      startedBy: 'Lisa Rodriguez, RD',
      startedDate: '05/27/2025 11:20',
      percentComplete: 85,
      estimatedCompletion: '05/29/2025',
      priority: 'medium'
    },
    {
      id: '4',
      residentName: 'Brown, William',
      assessmentType: 'SKIN OBSERVATION TOOL',
      startedBy: 'Jennifer Park, RN',
      startedDate: '05/28/2025 16:45',
      percentComplete: 50,
      estimatedCompletion: '05/29/2025',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>In Progress Assessments</span>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-normal text-gray-600">
              {inProgressAssessments.length} active assessments
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident Name</TableHead>
                <TableHead>Assessment Type</TableHead>
                <TableHead>Started By</TableHead>
                <TableHead>Started Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Est. Completion</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inProgressAssessments.map((assessment) => (
                <TableRow key={assessment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {assessment.residentName}
                  </TableCell>
                  <TableCell>{assessment.assessmentType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {assessment.startedBy}
                    </div>
                  </TableCell>
                  <TableCell>{assessment.startedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(assessment.percentComplete)}`}
                          style={{ width: `${assessment.percentComplete}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{assessment.percentComplete}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {assessment.estimatedCompletion}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(assessment.priority)}>
                      {assessment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Continue
                      </Button>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {inProgressAssessments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No assessments currently in progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UdaInProgressList;
