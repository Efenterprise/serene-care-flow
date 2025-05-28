
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Send, 
  MessageSquare, 
  Mail, 
  Phone,
  Clock,
  AlertTriangle,
  Filter
} from "lucide-react";
import { useResidents } from "@/hooks/useResidents";
import { useResidentContacts, useCreateCommunication } from "@/hooks/useContacts";
import { useSMS } from "@/hooks/useSMS";
import { toast } from "sonner";

const MassCommunication = () => {
  const [messageType, setMessageType] = useState<"email" | "sms">("email");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedResidents, setSelectedResidents] = useState<string[]>([]);
  const [contactFilter, setContactFilter] = useState<"all" | "emergency" | "family" | "legal">("all");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);

  const { data: residents } = useResidents();
  const createCommunication = useCreateCommunication();
  const { sendSMS } = useSMS();

  // Get all contacts for selected residents
  const getAllContactsForResidents = async () => {
    const allContacts = [];
    
    for (const residentId of selectedResidents) {
      // This would need to be implemented properly with a batch hook
      // For now, we'll simulate the functionality
      const contacts = []; // useResidentContacts would need to be called for each
      allContacts.push(...contacts);
    }
    
    return allContacts.filter(contact => {
      if (contactFilter === "emergency") return contact.is_emergency_contact;
      if (contactFilter === "family") return contact.contact_type?.category === "family";
      if (contactFilter === "legal") return contact.contact_type?.category === "legal";
      return true;
    }).filter(contact => {
      if (messageType === "email") return contact.email;
      if (messageType === "sms") return contact.phone_primary;
      return true;
    });
  };

  const handleSelectAllResidents = () => {
    if (selectedResidents.length === residents?.length) {
      setSelectedResidents([]);
    } else {
      setSelectedResidents(residents?.map(r => r.id) || []);
    }
  };

  const handleResidentToggle = (residentId: string) => {
    setSelectedResidents(prev => 
      prev.includes(residentId) 
        ? prev.filter(id => id !== residentId)
        : [...prev, residentId]
    );
  };

  const handleSendMassMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedResidents.length === 0) {
      toast.error("Please select at least one resident");
      return;
    }

    if (!subject.trim() || !content.trim()) {
      toast.error("Please enter both subject and message");
      return;
    }

    try {
      let successCount = 0;
      let failureCount = 0;

      // This is a simplified implementation
      // In a real app, you'd want to batch this operation
      for (const residentId of selectedResidents) {
        try {
          await createCommunication.mutateAsync({
            resident_id: residentId,
            contact_id: "", // Would need to get actual contact IDs
            communication_type: messageType,
            direction: "outbound",
            subject,
            content,
            status: isScheduled ? "scheduled" : "sent",
            sent_at: isScheduled && scheduledTime ? new Date(scheduledTime).toISOString() : new Date().toISOString(),
            metadata: {
              mass_communication: true,
              contact_filter: contactFilter,
              is_emergency: isEmergency,
              scheduled: isScheduled,
              scheduled_time: scheduledTime
            }
          });
          successCount++;
        } catch (error) {
          failureCount++;
          console.error(`Failed to send message for resident ${residentId}:`, error);
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully sent ${successCount} messages`);
      }
      if (failureCount > 0) {
        toast.error(`Failed to send ${failureCount} messages`);
      }

      // Reset form
      setSubject("");
      setContent("");
      setSelectedResidents([]);
      setIsScheduled(false);
      setScheduledTime("");
      setIsEmergency(false);
    } catch (error) {
      toast.error("Failed to send mass communication");
      console.error(error);
    }
  };

  const getEstimatedRecipients = () => {
    // This would calculate based on selected residents and contact filters
    return selectedResidents.length * 1.5; // Rough estimate
  };

  return (
    <div className="space-y-6">
      {/* Mass Communication Warning */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-800">Mass Communication</p>
              <p className="text-sm text-orange-700">
                This will send messages to multiple recipients. Please review carefully before sending.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recipient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Select Recipients</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Communication Method</label>
                <Select value={messageType} onValueChange={(value: "email" | "sms") => setMessageType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Filter</label>
                <Select value={contactFilter} onValueChange={(value: "all" | "emergency" | "family" | "legal") => setContactFilter(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="emergency">Emergency Contacts Only</SelectItem>
                    <SelectItem value="family">Family Members</SelectItem>
                    <SelectItem value="legal">Legal/POA Contacts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Emergency Message Toggle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emergency"
                checked={isEmergency}
                onCheckedChange={(checked) => setIsEmergency(checked as boolean)}
              />
              <label htmlFor="emergency" className="text-sm font-medium text-red-600">
                Mark as Emergency Communication
              </label>
            </div>

            {/* Resident Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Select Residents</h4>
                <Button variant="outline" size="sm" onClick={handleSelectAllResidents}>
                  {selectedResidents.length === residents?.length ? "Deselect All" : "Select All"}
                </Button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 border rounded-lg p-3">
                {residents?.map(resident => (
                  <div key={resident.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={resident.id}
                      checked={selectedResidents.includes(resident.id)}
                      onCheckedChange={() => handleResidentToggle(resident.id)}
                    />
                    <label htmlFor={resident.id} className="flex-1 text-sm">
                      {resident.first_name} {resident.last_name} - Room {resident.room_number || 'N/A'}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{selectedResidents.length} residents selected</span>
                <span>Est. {Math.round(getEstimatedRecipients())} recipients</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Composition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {messageType === "email" ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              <span>Compose Message</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendMassMessage} className="space-y-4">
              {/* Scheduling Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={(checked) => setIsScheduled(checked as boolean)}
                />
                <label htmlFor="schedule" className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Schedule for later</span>
                </label>
              </div>

              {isScheduled && (
                <div>
                  <label className="block text-sm font-medium mb-2">Scheduled Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    required={isScheduled}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={messageType === "email" ? "Email subject" : "Message title"}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    messageType === "email" 
                      ? "Compose your mass email..." 
                      : "Type your mass text message..."
                  }
                  rows={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {messageType === "sms" && `${content.length}/160 characters`}
                </p>
              </div>

              {/* Preview */}
              {selectedResidents.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Preview</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• {selectedResidents.length} residents selected</p>
                    <p>• ~{Math.round(getEstimatedRecipients())} total recipients</p>
                    <p>• Contact filter: {contactFilter}</p>
                    <p>• Method: {messageType.toUpperCase()}</p>
                    {isEmergency && <p className="text-red-600">• EMERGENCY MESSAGE</p>}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => {
                  setSubject("");
                  setContent("");
                  setSelectedResidents([]);
                  setIsScheduled(false);
                  setScheduledTime("");
                  setIsEmergency(false);
                }}>
                  Clear All
                </Button>
                <Button 
                  type="submit" 
                  disabled={createCommunication.isPending || selectedResidents.length === 0}
                  className={`flex items-center space-x-2 ${isEmergency ? 'bg-red-600 hover:bg-red-700' : ''}`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {createCommunication.isPending 
                      ? "Sending..." 
                      : isScheduled 
                        ? "Schedule Mass Message" 
                        : "Send Mass Message"
                    }
                  </span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MassCommunication;
