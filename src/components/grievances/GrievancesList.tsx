import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, User, AlertTriangle, FileText } from "lucide-react";

interface Grievance {
  id: string;
  grievance_number: string;
  complainant_name: string;
  complainant_relationship?: string;
  is_anonymous: boolean;
  category: string;
  subcategory?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'received' | 'acknowledged' | 'under_review' | 'investigating' | 'resolved' | 'closed' | 'appealed';
  title: string;
  description: string;
  date_occurred?: string;
  location?: string;
  assigned_to?: string;
  department?: string;
  created_at: string;
  updated_at: string;
  due_date?: string;
  resident_name?: string;
  regulatory_reportable: boolean;
  appeal_requested: boolean;
}

interface GrievancesListProps {
  grievances: Grievance[];
  onSelectGrievance: (grievance: Grievance) => void;
  title: string;
  emptyMessage: string;
}

const GrievancesList = ({ grievances, onSelectGrievance, title, emptyMessage }: GrievancesListProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-purple-100 text-purple-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'appealed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilDue = (dueDateString?: string) => {
    if (!dueDateString) return null;
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-normal text-gray-600">
              {grievances.length} grievances
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grievance #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Complainant</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grievances.map((grievance) => {
                const daysUntilDue = getDaysUntilDue(grievance.due_date);
                const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
                const isDueSoon = daysUntilDue !== null && daysUntilDue <= 2 && daysUntilDue >= 0;

                return (
                  <TableRow key={grievance.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          {grievance.grievance_number}
                        </span>
                        {grievance.regulatory_reportable && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={grievance.title}>
                        {grievance.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">
                            {grievance.is_anonymous ? 'Anonymous' : grievance.complainant_name}
                          </div>
                          {grievance.complainant_relationship && (
                            <div className="text-sm text-gray-500">
                              {grievance.complainant_relationship}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {grievance.resident_name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{grievance.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(grievance.priority)}>
                        {grievance.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(grievance.status)}>
                        {grievance.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {grievance.due_date ? (
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : isDueSoon ? 'text-orange-600' : 'text-gray-600'}`}>
                            {formatDate(grievance.due_date)}
                          </span>
                          {(isOverdue || isDueSoon) && (
                            <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-500' : 'text-orange-500'}`} />
                          )}
                        </div>
                      ) : (
                        'No due date'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onSelectGrievance(grievance)}
                        >
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {grievances.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>{emptyMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GrievancesList;
