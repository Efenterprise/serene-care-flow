
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, User, AlertTriangle, FileText } from "lucide-react";

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

interface IncidentsListProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
  title: string;
  emptyMessage: string;
}

const IncidentsList = ({ incidents, onSelectIncident, title, emptyMessage }: IncidentsListProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getTypeDisplay = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-normal text-gray-600">
              {incidents.length} incidents
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <span className="text-red-600 hover:text-red-800 cursor-pointer">
                      {incident.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getTypeDisplay(incident.type)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{incident.residentName}</div>
                      <div className="text-sm text-gray-500">Room {incident.roomNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatDate(incident.reportedAt)}</div>
                      <div className="text-gray-500">{incident.reportedBy}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSelectIncident(incident)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {incidents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>{emptyMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncidentsList;
