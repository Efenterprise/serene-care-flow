
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, User, Building, AlertTriangle, MessageSquare, FileText, CheckCircle } from "lucide-react";

interface Grievance {
  id: string;
  grievance_number: string;
  complainant_name: string;
  complainant_relationship?: string;
  is_anonymous: boolean;
  category: string;
  subcategory?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: string;
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

interface GrievanceDetailsProps {
  grievance: Grievance;
  onBack: () => void;
}

const GrievanceDetails = ({ grievance, onBack }: GrievanceDetailsProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState(grievance.status);

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
    return new Date(dateString).toLocaleString();
  };

  // Mock communications data
  const communications = [
    {
      id: 1,
      type: 'internal_note',
      sender: 'Sarah Wilson, RN',
      message: 'Initial assessment completed. Medication error confirmed. Notifying physician and family.',
      timestamp: '2025-06-12T14:45:00Z',
      is_internal: true
    },
    {
      id: 2,
      type: 'complainant_update',
      sender: 'System',
      message: 'Your grievance has been acknowledged and assigned to our clinical team for investigation.',
      timestamp: '2025-06-12T11:30:00Z',
      is_internal: false
    }
  ];

  // Mock status history
  const statusHistory = [
    {
      id: 1,
      previous_status: 'received',
      new_status: 'acknowledged',
      changed_by: 'System',
      timestamp: '2025-06-12T11:30:00Z',
      reason: 'Automatic acknowledgment sent'
    },
    {
      id: 2,
      previous_status: 'acknowledged',
      new_status: 'investigating',
      changed_by: 'Dr. Martinez',
      timestamp: '2025-06-12T14:45:00Z',
      reason: 'Investigation started'
    }
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      // This would normally add to Supabase
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  const handleStatusUpdate = () => {
    // This would normally update Supabase
    console.log('Updating status to:', newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{grievance.grievance_number}</h2>
            <p className="text-gray-600">{grievance.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getPriorityColor(grievance.priority)}>
            {grievance.priority}
          </Badge>
          <Badge className={getStatusColor(grievance.status)}>
            {grievance.status.replace('_', ' ')}
          </Badge>
          {grievance.regulatory_reportable && (
            <Badge className="bg-red-100 text-red-800">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Regulatory
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grievance Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p className="text-gray-700 mt-1">{grievance.description}</p>
                  </div>
                  
                  {grievance.date_occurred && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Date Occurred</h4>
                      <p className="text-gray-700 mt-1">{new Date(grievance.date_occurred).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  {grievance.location && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-700 mt-1">{grievance.location}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Complainant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <p className="text-gray-900">
                      {grievance.is_anonymous ? 'Anonymous' : grievance.complainant_name}
                    </p>
                  </div>
                  {grievance.complainant_relationship && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Relationship:</span>
                      <p className="text-gray-900">{grievance.complainant_relationship}</p>
                    </div>
                  )}
                  {grievance.resident_name && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Resident:</span>
                      <p className="text-gray-900">{grievance.resident_name}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Assignment & Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Category:</span>
                    <p className="text-gray-900">{grievance.category}</p>
                  </div>
                  {grievance.subcategory && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Subcategory:</span>
                      <p className="text-gray-900">{grievance.subcategory}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-600">Assigned To:</span>
                    <p className="text-gray-900">{grievance.assigned_to || 'Unassigned'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Department:</span>
                    <p className="text-gray-900">{grievance.department || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Created:</span>
                    <p className="text-gray-900">{formatDate(grievance.created_at)}</p>
                  </div>
                  {grievance.due_date && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Due Date:</span>
                      <p className="text-gray-900">{formatDate(grievance.due_date)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Communications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="border-l-4 border-blue-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{comm.sender}</span>
                        <Badge variant={comm.is_internal ? "secondary" : "outline"}>
                          {comm.is_internal ? 'Internal' : 'External'}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">{formatDate(comm.timestamp)}</span>
                    </div>
                    <p className="text-gray-700">{comm.message}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Add Communication</h4>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Enter your message or note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <Button onClick={handleAddNote}>
                    Add Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Status History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusHistory.map((history) => (
                  <div key={history.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          Status changed from "{history.previous_status?.replace('_', ' ')}" to "{history.new_status.replace('_', ' ')}"
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">By {history.changed_by}</p>
                      <p className="text-sm text-gray-500">{formatDate(history.timestamp)}</p>
                      {history.reason && (
                        <p className="text-sm text-gray-700 mt-1">Reason: {history.reason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">New Status</label>
                  <select 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="received">Received</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="under_review">Under Review</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                    <option value="appealed">Appealed</option>
                  </select>
                </div>
                <Button onClick={handleStatusUpdate} className="w-full">
                  Update Status
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Contact Complainant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Escalate Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrievanceDetails;
