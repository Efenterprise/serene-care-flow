import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, CheckCircle2, User, Calendar, FileText } from "lucide-react";

interface CompletedAssessment {
  id: string;
  residentName: string;
  assessmentType: string;
  completedBy: string;
  completedDate: string;
  submittedDate: string;
  status: 'completed' | 'submitted' | 'approved';
  findings: string;
  nextDueDate?: string;
}

const UdaCompletedList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock data for completed assessments
  const completedAssessments: CompletedAssessment[] = [
    {
      id: '1',
      residentName: 'Anderson, Patricia',
      assessmentType: 'MDS 3.0 Quarterly Assessment',
      completedBy: 'Sarah Wilson, RN',
      completedDate: '05/25/2025 14:30',
      submittedDate: '05/25/2025 15:45',
      status: 'approved',
      findings: 'Stable condition, continue current care plan',
      nextDueDate: '08/25/2025'
    },
    {
      id: '2',
      residentName: 'Thompson, James',
      assessmentType: 'Skin Observation Assessment',
      completedBy: 'Mike Chen, LPN',
      completedDate: '05/24/2025 10:15',
      submittedDate: '05/24/2025 10:30',
      status: 'submitted',
      findings: 'No skin integrity issues identified',
      nextDueDate: '05/31/2025'
    },
    {
      id: '3',
      residentName: 'Wilson, Margaret',
      assessmentType: 'Nutrition Evaluation',
      completedBy: 'Lisa Rodriguez, RD',
      completedDate: '05/23/2025 13:20',
      submittedDate: '05/23/2025 14:00',
      status: 'approved',
      findings: 'Weight stable, dietary intake adequate',
      nextDueDate: '08/23/2025'
    },
    {
      id: '4',
      residentName: 'Garcia, Carlos',
      assessmentType: 'Fall Risk Assessment',
      completedBy: 'Jennifer Park, RN',
      completedDate: '05/22/2025 09:45',
      submittedDate: '05/22/2025 11:30',
      status: 'completed',
      findings: 'Moderate fall risk, interventions in place',
      nextDueDate: '06/22/2025'
    },
    {
      id: '5',
      residentName: 'Miller, Dorothy',
      assessmentType: 'Care Area Assessment - ADL',
      completedBy: 'Sarah Wilson, RN',
      completedDate: '05/21/2025 16:00',
      submittedDate: '05/21/2025 16:15',
      status: 'approved',
      findings: 'Requires assistance with bathing and dressing',
      nextDueDate: '08/21/2025'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssessments = completedAssessments.filter(assessment => {
    return (
      assessment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || assessment.status === statusFilter)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Completed Assessments</span>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-normal text-gray-600">
              {filteredAssessments.length} completed assessments
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by resident name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            Clear Filters
          </Button>
        </div>

        {/* Completed Assessments Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident Name</TableHead>
                <TableHead>Assessment Type</TableHead>
                <TableHead>Completed By</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {assessment.residentName}
                  </TableCell>
                  <TableCell>{assessment.assessmentType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {assessment.completedBy}
                    </div>
                  </TableCell>
                  <TableCell>{assessment.completedDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={assessment.findings}>
                      {assessment.findings}
                    </div>
                  </TableCell>
                  <TableCell>
                    {assessment.nextDueDate && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {assessment.nextDueDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        Print
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No completed assessments found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{filteredAssessments.length} results</span>
            <span>Page</span>
            <Select defaultValue="1">
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
              </SelectContent>
            </Select>
            <span>of 1</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UdaCompletedList;
