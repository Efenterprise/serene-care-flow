
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Edit, Calendar, AlertTriangle } from "lucide-react";

interface UdaAssessment {
  id: string;
  residentName: string;
  status: string;
  unit: string;
  floor: string;
  scheduleDescription: string;
  assessmentType: string;
  dueDate: string;
  daysUntilDue: number;
  priority: 'low' | 'medium' | 'high';
}

const UdaScheduledList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [floorFilter, setFloorFilter] = useState('');
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState('');

  // Mock data similar to PCC screenshot
  const scheduledAssessments: UdaAssessment[] = [
    {
      id: '1',
      residentName: 'Alfonso, Sandra',
      status: 'Current',
      unit: 'East Wing',
      floor: 'First Floor',
      scheduleDescription: 'Weekly Skin Observation',
      assessmentType: 'SKIN OBSERVATION TOOL (Licensed Nurse)',
      dueDate: '05/17/2025 22:31',
      daysUntilDue: -12,
      priority: 'high'
    },
    {
      id: '2',
      residentName: 'Alpalhao, Florence',
      status: 'Current',
      unit: 'East Wing',
      floor: 'First Floor',
      scheduleDescription: 'Weekly Skin Observation',
      assessmentType: 'SKIN OBSERVATION TOOL (Licensed Nurse)',
      dueDate: '05/31/2025 10:55',
      daysUntilDue: 2,
      priority: 'medium'
    },
    {
      id: '3',
      residentName: 'Alpalhao, Florence',
      status: 'Current',
      unit: 'East Wing',
      floor: 'First Floor',
      scheduleDescription: 'ReAdmission',
      assessmentType: 'Social Services Quarterly Assessment',
      dueDate: '06/04/2025 08:48',
      daysUntilDue: 6,
      priority: 'medium'
    },
    {
      id: '4',
      residentName: 'Amaral, Robert',
      status: 'Current',
      unit: 'East Wing',
      floor: 'First Floor',
      scheduleDescription: 'Weekly Skin Observation',
      assessmentType: 'SKIN OBSERVATION TOOL (Licensed Nurse)',
      dueDate: '04/29/2025 21:43',
      daysUntilDue: -30,
      priority: 'high'
    },
    {
      id: '5',
      residentName: 'Amaral, Robert',
      status: 'Current',
      unit: 'East Wing',
      floor: 'First Floor',
      scheduleDescription: 'Nutrition Qtrly/Annual Trigger',
      assessmentType: 'Nutrition Evaluation - V 2',
      dueDate: '05/13/2025 12:17',
      daysUntilDue: -16,
      priority: 'high'
    }
  ];

  const getDueDateColor = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return 'text-red-600 font-semibold';
    if (daysUntilDue <= 7) return 'text-orange-600 font-semibold';
    return 'text-gray-900';
  };

  const getDueDateBadge = (daysUntilDue: number) => {
    if (daysUntilDue < 0) {
      return (
        <Badge variant="destructive" className="ml-2">
          {Math.abs(daysUntilDue)} days overdue
        </Badge>
      );
    }
    if (daysUntilDue <= 7) {
      return (
        <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
          {daysUntilDue} days
        </Badge>
      );
    }
    return null;
  };

  const filteredAssessments = scheduledAssessments.filter(assessment => {
    return (
      assessment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || assessment.status === statusFilter) &&
      (unitFilter === '' || assessment.unit === unitFilter) &&
      (floorFilter === '' || assessment.floor === floorFilter) &&
      (assessmentTypeFilter === '' || assessment.assessmentType.includes(assessmentTypeFilter))
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Scheduled List</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal text-gray-600">
              {filteredAssessments.length} results
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
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="Current">Current</SelectItem>
              <SelectItem value="Discharged">Discharged</SelectItem>
            </SelectContent>
          </Select>

          <Select value={unitFilter} onValueChange={setUnitFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Units</SelectItem>
              <SelectItem value="East Wing">East Wing</SelectItem>
              <SelectItem value="West Wing">West Wing</SelectItem>
              <SelectItem value="North Wing">North Wing</SelectItem>
              <SelectItem value="South Wing">South Wing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={floorFilter} onValueChange={setFloorFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Floors</SelectItem>
              <SelectItem value="First Floor">First Floor</SelectItem>
              <SelectItem value="Second Floor">Second Floor</SelectItem>
              <SelectItem value="Third Floor">Third Floor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assessmentTypeFilter} onValueChange={setAssessmentTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Assessment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="SKIN OBSERVATION">Skin Observation</SelectItem>
              <SelectItem value="Nutrition">Nutrition</SelectItem>
              <SelectItem value="Social Services">Social Services</SelectItem>
              <SelectItem value="BRADEN">Braden Scale</SelectItem>
              <SelectItem value="FALL SCALE">Fall Scale</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Assessment Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Schedule Description</TableHead>
                <TableHead>Assessment Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="w-16">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      clear
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {assessment.residentName}
                  </TableCell>
                  <TableCell>{assessment.status}</TableCell>
                  <TableCell>{assessment.unit}</TableCell>
                  <TableCell>{assessment.floor}</TableCell>
                  <TableCell>{assessment.scheduleDescription}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={assessment.assessmentType}>
                      {assessment.assessmentType}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center ${getDueDateColor(assessment.daysUntilDue)}`}>
                      {assessment.daysUntilDue < 0 && <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />}
                      <span>{assessment.dueDate}</span>
                      {getDueDateBadge(assessment.daysUntilDue)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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
            <Select defaultValue="20">
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>Per page</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>First</Button>
            <Button variant="outline" size="sm" disabled>Prev</Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
            <Button variant="outline" size="sm" disabled>Last</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UdaScheduledList;
