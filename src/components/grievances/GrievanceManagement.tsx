import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, FileText, MessageSquare, Plus, Users } from "lucide-react";
import GrievancesList from './GrievancesList';
import GrievanceDetails from './GrievanceDetails';
import CreateGrievanceDialog from './CreateGrievanceDialog';
import GrievanceAnalytics from './GrievanceAnalytics';

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

const GrievanceManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock grievances data - this will be replaced with actual Supabase data
  const grievances: Grievance[] = [
    {
      id: 'grv-001',
      grievance_number: 'GRV-2025-001-1430',
      complainant_name: 'Sarah Johnson',
      complainant_relationship: 'Daughter',
      is_anonymous: false,
      category: 'Clinical Care',
      subcategory: 'Medication Management',
      priority: 'high',
      status: 'investigating',
      title: 'Medication Error - Wrong Dosage',
      description: 'My mother received the wrong dosage of her blood pressure medication for three days.',
      date_occurred: '2025-06-10',
      location: 'Room 205A',
      assigned_to: 'Dr. Martinez',
      department: 'Clinical',
      created_at: '2025-06-12T10:30:00Z',
      updated_at: '2025-06-12T14:45:00Z',
      due_date: '2025-06-17T17:00:00Z',
      resident_name: 'Johnson, Mary',
      regulatory_reportable: true,
      appeal_requested: false
    },
    {
      id: 'grv-002',
      grievance_number: 'GRV-2025-002-0920',
      complainant_name: 'Robert Smith',
      complainant_relationship: 'Resident',
      is_anonymous: false,
      category: 'Food Service',
      subcategory: 'Quality',
      priority: 'medium',
      status: 'under_review',
      title: 'Poor Food Quality and Temperature',
      description: 'Meals have been consistently cold and taste poor for the past week.',
      date_occurred: '2025-06-08',
      location: 'Dining Room',
      assigned_to: 'Kitchen Manager',
      department: 'Food Services',
      created_at: '2025-06-09T09:20:00Z',
      updated_at: '2025-06-12T11:15:00Z',
      due_date: '2025-06-16T17:00:00Z',
      resident_name: 'Smith, Robert',
      regulatory_reportable: false,
      appeal_requested: false
    },
    {
      id: 'grv-003',
      grievance_number: 'GRV-2025-003-1615',
      complainant_name: 'Anonymous',
      complainant_relationship: 'Family Member',
      is_anonymous: true,
      category: 'Staff Conduct',
      subcategory: 'Unprofessional Behavior',
      priority: 'high',
      status: 'acknowledged',
      title: 'Staff Member Inappropriate Behavior',
      description: 'A staff member was rude and dismissive when asked about care plan updates.',
      date_occurred: '2025-06-11',
      location: 'Nursing Station',
      assigned_to: 'HR Director',
      department: 'Human Resources',
      created_at: '2025-06-11T16:15:00Z',
      updated_at: '2025-06-12T08:30:00Z',
      due_date: '2025-06-18T17:00:00Z',
      regulatory_reportable: false,
      appeal_requested: false
    }
  ];

  const getActiveGrievances = () => grievances.filter(g => !['resolved', 'closed'].includes(g.status));
  const getResolvedGrievances = () => grievances.filter(g => ['resolved', 'closed'].includes(g.status));
  const getHighPriorityGrievances = () => grievances.filter(g => ['high', 'critical'].includes(g.priority));

  const getPriorityStats = () => {
    const active = getActiveGrievances();
    return {
      critical: active.filter(g => g.priority === 'critical').length,
      high: active.filter(g => g.priority === 'high').length,
      medium: active.filter(g => g.priority === 'medium').length,
      low: active.filter(g => g.priority === 'low').length
    };
  };

  const getCategoryStats = () => {
    const active = getActiveGrievances();
    return {
      clinical: active.filter(g => g.category === 'Clinical Care').length,
      staff: active.filter(g => g.category === 'Staff Conduct').length,
      food: active.filter(g => g.category === 'Food Service').length,
      facility: active.filter(g => g.category === 'Facility Conditions').length,
      billing: active.filter(g => g.category === 'Billing').length,
      other: active.filter(g => !['Clinical Care', 'Staff Conduct', 'Food Service', 'Facility Conditions', 'Billing'].includes(g.category)).length
    };
  };

  const priorityStats = getPriorityStats();
  const categoryStats = getCategoryStats();

  if (selectedGrievance) {
    return (
      <GrievanceDetails 
        grievance={selectedGrievance} 
        onBack={() => setSelectedGrievance(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Grievance Management</h2>
          <p className="text-gray-600">Track and resolve resident and family grievances</p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Grievance
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Grievances</p>
                <p className="text-2xl font-bold text-blue-600">{getActiveGrievances().length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{priorityStats.high + priorityStats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-green-600">4.2d</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active ({getActiveGrievances().length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({getResolvedGrievances().length})</TabsTrigger>
          <TabsTrigger value="high-priority">High Priority ({getHighPriorityGrievances().length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <GrievancesList 
            grievances={getActiveGrievances()} 
            onSelectGrievance={setSelectedGrievance}
            title="Active Grievances"
            emptyMessage="No active grievances"
          />
        </TabsContent>

        <TabsContent value="resolved">
          <GrievancesList 
            grievances={getResolvedGrievances()} 
            onSelectGrievance={setSelectedGrievance}
            title="Resolved Grievances"
            emptyMessage="No resolved grievances"
          />
        </TabsContent>

        <TabsContent value="high-priority">
          <GrievancesList 
            grievances={getHighPriorityGrievances()} 
            onSelectGrievance={setSelectedGrievance}
            title="High Priority Grievances"
            emptyMessage="No high priority grievances"
          />
        </TabsContent>

        <TabsContent value="analytics">
          <GrievanceAnalytics 
            priorityStats={priorityStats}
            categoryStats={categoryStats}
            grievances={grievances}
          />
        </TabsContent>
      </Tabs>

      {/* Create Grievance Dialog */}
      {showCreateDialog && (
        <CreateGrievanceDialog onClose={() => setShowCreateDialog(false)} />
      )}
    </div>
  );
};

export default GrievanceManagement;
