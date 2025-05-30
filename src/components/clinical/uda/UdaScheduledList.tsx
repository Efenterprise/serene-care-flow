
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, Clock, Search, AlertTriangle } from "lucide-react";

interface ScheduledAssessment {
  id: string;
  residentName: string;
  assessmentType: string;
  dueDate: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'overdue' | 'due_today';
  roomNumber: string;
  facilityId?: string;
}

interface UdaScheduledListProps {
  selectedFacility: string;
}

const UdaScheduledList = ({ selectedFacility }: UdaScheduledListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for scheduled assessments - filtered by facility
  const getAllScheduledAssessments = (): ScheduledAssessment[] => [
    {
      id: '1',
      residentName: 'Anderson, Patricia',
      assessmentType: 'MDS 3.0 Quarterly Assessment',
      dueDate: '05/30/2025',
      assignedTo: 'Sarah Wilson, RN',
      priority: 'high',
      status: 'due_today',
      roomNumber: '105',
      facilityId: 'facility-1'
    },
    {
      id: '2',
      residentName: 'Thompson, James',
      assessmentType: 'Skin Observation Assessment',
      dueDate: '05/28/2025',
      assignedTo: 'Mike Chen, LPN',
      priority: 'medium',
      status: 'overdue',
      roomNumber: '203',
      facilityId: 'facility-1'
    },
    {
      id: '3',
      residentName: 'Wilson, Margaret',
      assessmentType: 'Nutrition Evaluation',
      dueDate: '06/02/2025',
      assignedTo: 'Lisa Rodriguez, RD',
      priority: 'medium',
      status: 'scheduled',
      roomNumber: '308',
      facilityId: 'facility-2'
    },
    {
      id: '4',
      residentName: 'Garcia, Carlos',
      assessmentType: 'Fall Risk Assessment',
      dueDate: '06/01/2025',
      assignedTo: 'Jennifer Park, RN',
      priority: 'high',
      status: 'scheduled',
      roomNumber: '112',
      facilityId: 'facility-3'
    }
  ];

  const getFilteredAssessments = () => {
    const allAssessments = getAllScheduledAssessments();
    
    // Filter by facility first
    const facilityFiltered = selectedFacility === 'all' 
      ? allAssessments 
      : allAssessments.filter(assessment => assessment.facilityId === selectedFacility);

    // Then apply other filters
    return facilityFiltered.filter(assessment => {
      return (
        assessment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priorityFilter === 'all' || assessment.priority === priorityFilter) &&
        (statusFilter === 'all' || assessment.status === statusFilter)
      );
    });
  };

  const filteredAssessments = getFilteredAssessments();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'due_today': return 'bg-orange-100 text-orange-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Scheduled Assessments</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-normal text-gray-600">
              {filteredAssessments.length} scheduled assessments
              {selectedFacility !== 'all' && ' (Current Facility)'}
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
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="due_today">Due Today</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            Clear Filters
          </Button>
        </div>

        {/* Scheduled Assessments Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Assessment Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {assessment.residentName}
                  </TableCell>
                  <TableCell>{assessment.roomNumber}</TableCell>
                  <TableCell>{assessment.assessmentType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {assessment.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {assessment.assignedTo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(assessment.priority)}>
                      {assessment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status === 'due_today' ? 'Due Today' : 
                       assessment.status === 'overdue' ? 'Overdue' : 'Scheduled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                      <Button size="sm" variant="ghost">
                        Reschedule
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
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No scheduled assessments found</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Overdue: {filteredAssessments.filter(a => a.status === 'overdue').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Due Today: {filteredAssessments.filter(a => a.status === 'due_today').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Scheduled: {filteredAssessments.filter(a => a.status === 'scheduled').length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UdaScheduledList;
