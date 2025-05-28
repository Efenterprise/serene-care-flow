
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Send,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { useResidents } from "@/hooks/useResidents";
import { useResidentContacts, useCommunicationLog } from "@/hooks/useContacts";
import { format } from "date-fns";

const CommunicationDashboard = () => {
  const [selectedResidentId, setSelectedResidentId] = useState<string>("");

  const { data: residents } = useResidents();
  const { data: contacts } = useResidentContacts(selectedResidentId);
  const { data: communications } = useCommunicationLog(selectedResidentId);

  const selectedResident = residents?.find(r => r.id === selectedResidentId);

  // Communication stats for today
  const todayCommunications = communications?.filter(comm => 
    format(new Date(comm.sent_at), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ) || [];

  const stats = {
    totalToday: todayCommunications.length,
    emailsSent: todayCommunications.filter(c => c.communication_type === 'email').length,
    smsSent: todayCommunications.filter(c => c.communication_type === 'sms').length,
    callsMade: todayCommunications.filter(c => c.communication_type === 'call').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Communications</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalToday}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-green-600">{stats.emailsSent}</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SMS Messages</p>
                <p className="text-2xl font-bold text-purple-600">{stats.smsSent}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calls Made</p>
                <p className="text-2xl font-bold text-orange-600">{stats.callsMade}</p>
              </div>
              <Phone className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resident Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Resident</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedResidentId} onValueChange={setSelectedResidentId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a resident to view communications" />
              </SelectTrigger>
              <SelectContent>
                {residents?.map(resident => (
                  <SelectItem key={resident.id} value={resident.id}>
                    {resident.first_name} {resident.last_name} - Room {resident.room_number || 'N/A'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedResident && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900">
                  {selectedResident.first_name} {selectedResident.last_name}
                </h3>
                <p className="text-blue-700 text-sm">
                  Room {selectedResident.room_number || 'N/A'} • 
                  MRN: {selectedResident.mrn} • 
                  {contacts?.length || 0} contacts available
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Overview */}
      {selectedResidentId && contacts && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Contact Overview</span>
              <Badge variant="outline">{contacts.length} contacts</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map(contact => (
                <div key={contact.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{contact.first_name} {contact.last_name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {contact.contact_type?.name}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {contact.relationship && `${contact.relationship} • `}
                    {contact.preferred_contact_method}
                  </p>
                  
                  <div className="flex space-x-2">
                    {contact.phone_primary && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    )}
                    {contact.email && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                    )}
                  </div>
                  
                  {contact.is_emergency_contact && (
                    <Badge variant="destructive" className="text-xs">
                      Emergency Contact
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Communications */}
      {selectedResidentId && communications && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {communications.slice(0, 5).map(comm => (
                <div key={comm.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {comm.communication_type === 'email' && <Mail className="w-4 h-4 text-green-600" />}
                    {comm.communication_type === 'sms' && <MessageSquare className="w-4 h-4 text-purple-600" />}
                    {comm.communication_type === 'call' && <Phone className="w-4 h-4 text-orange-600" />}
                    
                    <div>
                      <p className="font-medium text-sm">{comm.subject || 'No subject'}</p>
                      <p className="text-xs text-gray-600">
                        {format(new Date(comm.sent_at), "MMM dd, h:mm a")}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {comm.status}
                  </Badge>
                </div>
              ))}
              
              {communications.length === 0 && (
                <p className="text-center text-gray-600 py-4">
                  No communications yet for this resident
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunicationDashboard;
