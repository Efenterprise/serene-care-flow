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
import { format, startOfDay, endOfDay } from "date-fns";

const CommunicationDashboard = () => {
  const [selectedResidentId, setSelectedResidentId] = useState<string>("");

  const { data: residents } = useResidents();
  const { data: contacts } = useResidentContacts(selectedResidentId || "skip");
  const { data: communications } = useCommunicationLog(selectedResidentId || "skip");

  const selectedResident = residents?.find(r => r.id === selectedResidentId);

  // Fix timezone issues by using proper date boundaries
  const today = new Date();
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);

  // Filter communications for today with proper timezone handling
  const todayCommunications = communications?.filter(comm => {
    const commDate = new Date(comm.sent_at);
    return commDate >= todayStart && commDate <= todayEnd;
  }) || [];

  console.log('Dashboard Debug:', {
    today: today.toISOString(),
    todayStart: todayStart.toISOString(),
    todayEnd: todayEnd.toISOString(),
    totalCommunications: communications?.length || 0,
    todayCommunications: todayCommunications.length,
    allCommunications: communications?.map(c => ({
      id: c.id,
      type: c.communication_type,
      sent_at: c.sent_at,
      status: c.status
    }))
  });

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
                <p className="text-xs text-gray-500 mt-1">
                  Total: {communications?.length || 0}
                </p>
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
      {selectedResidentId && contacts && contacts.length > 0 && (
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

      {/* No resident selected state */}
      {!selectedResidentId && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Resident</h3>
            <p className="text-gray-600">
              Choose a resident from the dropdown above to view their contacts and communication history.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Communications */}
      {selectedResidentId && communications && communications.length > 0 && (
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
                        {format(new Date(comm.sent_at), "MMM dd, h:mm a")} •
                        {comm.metadata?.provider && ` via ${comm.metadata.provider}`}
                        {comm.metadata?.message_id && ` • ID: ${comm.metadata.message_id.substring(0, 8)}...`}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {comm.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No communications state */}
      {selectedResidentId && communications && communications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Communications Yet</h3>
            <p className="text-gray-600">
              No communications have been sent for this resident. Start by sending your first message!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunicationDashboard;
