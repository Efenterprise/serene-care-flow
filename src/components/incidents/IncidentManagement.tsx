import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, FileText, TrendingUp, Plus } from "lucide-react";
import IncidentsList from './IncidentsList';
import IncidentDetails from './IncidentDetails';
import CreateIncidentDialog from './CreateIncidentDialog';

interface Incident {
  id: string;
  type: 'fall' | 'medication_error' | 'behavioral' | 'injury' | 'elopement' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'completed' | 'closed';
  residentName: string;
  roomNumber: string;
  location: string;
  reportedBy: string;
  reportedAt: string;
  description: string;
  immediateActions: string[];
  riskLevel: number;
  followUpRequired: boolean;
  facilityId?: string;
}

const IncidentManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock incidents data
  const incidents: Incident[] = [
    {
      id: 'INC-001',
      type: 'fall',
      severity: 'high',
      status: 'investigating',
      residentName: 'Johnson, Mary',
      roomNumber: '105',
      location: 'Bathroom',
      reportedBy: 'Sarah Wilson, RN',
      reportedAt: '2025-05-30 14:25',
      description: 'Resident found on bathroom floor after fall. Alert and oriented, complaining of hip pain.',
      immediateActions: ['Vitals assessed', 'Physician notified', 'Family contacted', 'Incident report filed'],
      riskLevel: 8,
      followUpRequired: true,
      facilityId: 'facility-1'
    },
    {
      id: 'INC-002',
      type: 'medication_error',
      severity: 'medium',
      status: 'completed',
      residentName: 'Smith, Robert',
      roomNumber: '203',
      location: 'Medication Room',
      reportedBy: 'Mike Chen, LPN',
      reportedAt: '2025-05-29 09:15',
      description: 'Wrong dosage of medication administered. Error caught during med pass review.',
      immediateActions: ['Medication held', 'Physician consulted', 'Resident monitored'],
      riskLevel: 6,
      followUpRequired: false,
      facilityId: 'facility-1'
    },
    {
      id: 'INC-003',
      type: 'behavioral',
      severity: 'medium',
      status: 'reported',
      residentName: 'Davis, Helen',
      roomNumber: '308',
      location: 'Dining Room',
      reportedBy: 'Jennifer Park, RN',
      reportedAt: '2025-05-30 12:30',
      description: 'Resident became agitated during lunch, threw food tray.',
      immediateActions: ['Resident redirected', 'Environment modified', 'Behavioral plan reviewed'],
      riskLevel: 4,
      followUpRequired: true,
      facilityId: 'facility-2'
    }
  ];

  const getActiveIncidents = () => incidents.filter(i => ['reported', 'investigating'].includes(i.status));
  const getCompletedIncidents = () => incidents.filter(i => ['completed', 'closed'].includes(i.status));

  const getSeverityStats = () => {
    const active = getActiveIncidents();
    return {
      critical: active.filter(i => i.severity === 'critical').length,
      high: active.filter(i => i.severity === 'high').length,
      medium: active.filter(i => i.severity === 'medium').length,
      low: active.filter(i => i.severity === 'low').length
    };
  };

  const getTypeStats = () => {
    const active = getActiveIncidents();
    return {
      falls: active.filter(i => i.type === 'fall').length,
      medication: active.filter(i => i.type === 'medication_error').length,
      behavioral: active.filter(i => i.type === 'behavioral').length,
      other: active.filter(i => !['fall', 'medication_error', 'behavioral'].includes(i.type)).length
    };
  };

  const severityStats = getSeverityStats();
  const typeStats = getTypeStats();

  if (selectedIncident) {
    return (
      <IncidentDetails 
        incident={selectedIncident} 
        onBack={() => setSelectedIncident(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incident Management</h2>
          <p className="text-gray-600">Monitor and manage safety incidents and risk factors</p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-2xl font-bold text-red-600">{getActiveIncidents().length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-2xl font-bold text-orange-600">{severityStats.high + severityStats.critical}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Falls This Month</p>
                <p className="text-2xl font-bold text-purple-600">{typeStats.falls}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-600">8m</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Incidents</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <IncidentsList 
            incidents={getActiveIncidents()} 
            onSelectIncident={setSelectedIncident}
            title="Active Incidents"
            emptyMessage="No active incidents"
          />
        </TabsContent>

        <TabsContent value="completed">
          <IncidentsList 
            incidents={getCompletedIncidents()} 
            onSelectIncident={setSelectedIncident}
            title="Completed Incidents"
            emptyMessage="No completed incidents"
          />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Incident Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Incidents by Type</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Falls</span>
                      <Badge variant="secondary">{typeStats.falls}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Medication Errors</span>
                      <Badge variant="secondary">{typeStats.medication}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Behavioral</span>
                      <Badge variant="secondary">{typeStats.behavioral}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Other</span>
                      <Badge variant="secondary">{typeStats.other}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Severity Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Critical</span>
                      <Badge className="bg-red-100 text-red-800">{severityStats.critical}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>High</span>
                      <Badge className="bg-orange-100 text-orange-800">{severityStats.high}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{severityStats.medium}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Low</span>
                      <Badge className="bg-green-100 text-green-800">{severityStats.low}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Incident Dialog */}
      {showCreateDialog && (
        <CreateIncidentDialog onClose={() => setShowCreateDialog(false)} />
      )}
    </div>
  );
};

export default IncidentManagement;
