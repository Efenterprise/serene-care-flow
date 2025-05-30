
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle, Clock, User, MapPin, FileText, TrendingUp } from "lucide-react";

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
}

interface IncidentDetailsProps {
  incident: Incident;
  onBack: () => void;
}

const IncidentDetails = ({ incident, onBack }: IncidentDetailsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fall': return 'Fall Incident';
      case 'medication_error': return 'Medication Error';
      case 'behavioral': return 'Behavioral Incident';
      case 'injury': return 'Injury Report';
      case 'elopement': return 'Elopement Incident';
      default: return 'Other Incident';
    }
  };

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel >= 8) return 'text-red-600';
    if (riskLevel >= 6) return 'text-orange-600';
    if (riskLevel >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Incidents
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{getTypeLabel(incident.type)}</h2>
            <p className="text-gray-600">Incident ID: {incident.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getSeverityColor(incident.severity)}>
            {incident.severity} Severity
          </Badge>
          <Badge className={getStatusColor(incident.status)}>
            {incident.status}
          </Badge>
        </div>
      </div>

      {/* Main Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Primary Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Incident Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{incident.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Resident Information</h4>
                  <div className="space-y-1">
                    <p><strong>Name:</strong> {incident.residentName}</p>
                    <p><strong>Room:</strong> {incident.roomNumber}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Location Details</h4>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{incident.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Immediate Actions Taken</h4>
                <ul className="list-disc list-inside space-y-1">
                  {incident.immediateActions.map((action, index) => (
                    <li key={index} className="text-gray-700">{action}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Incident Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Incident Occurred</p>
                    <p className="text-sm text-gray-600">{new Date(incident.reportedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Reported by {incident.reportedBy}</p>
                    <p className="text-sm text-gray-600">{new Date(incident.reportedAt).toLocaleString()}</p>
                  </div>
                </div>
                {incident.status !== 'reported' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Investigation Started</p>
                      <p className="text-sm text-gray-600">Investigation in progress</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Risk Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getRiskColor(incident.riskLevel)}`}>
                  {incident.riskLevel}/10
                </div>
                <p className="text-sm text-gray-600 mt-1">Risk Level</p>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      incident.riskLevel >= 8 ? 'bg-red-500' :
                      incident.riskLevel >= 6 ? 'bg-orange-500' :
                      incident.riskLevel >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${incident.riskLevel * 10}%` }}
                  />
                </div>
              </div>

              {incident.followUpRequired && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">
                    ⚠️ Follow-up Required
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span>Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Update Status
              </Button>
              <Button className="w-full" variant="outline">
                Add Follow-up
              </Button>
              <Button className="w-full" variant="outline">
                Generate Report
              </Button>
              <Button className="w-full" variant="outline">
                Notify Family
              </Button>
            </CardContent>
          </Card>

          {/* Related Information */}
          <Card>
            <CardHeader>
              <CardTitle>Related Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                View Resident Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Care Plan Review
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Recent Incidents
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Risk Factors
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
