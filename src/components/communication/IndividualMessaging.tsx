
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Send,
  User,
  Clock
} from "lucide-react";
import { useResidents } from "@/hooks/useResidents";
import { useResidentContacts, useCreateCommunication } from "@/hooks/useContacts";
import { useSMS } from "@/hooks/useSMS";
import { toast } from "sonner";

const IndividualMessaging = () => {
  const [selectedResidentId, setSelectedResidentId] = useState<string>("");
  const [selectedContactId, setSelectedContactId] = useState<string>("");
  const [messageType, setMessageType] = useState<"email" | "sms" | "call">("email");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");

  const { data: residents } = useResidents();
  const { data: contacts } = useResidentContacts(selectedResidentId);
  const createCommunication = useCreateCommunication();
  const { sendSMS, isLoading: isSendingSMS } = useSMS();

  const selectedResident = residents?.find(r => r.id === selectedResidentId);
  const selectedContact = contacts?.find(c => c.id === selectedContactId);

  const filteredContacts = contacts?.filter(contact => {
    if (messageType === "email") return contact.email;
    if (messageType === "sms" || messageType === "call") return contact.phone_primary;
    return true;
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedResident || !selectedContact) {
      toast.error("Please select a resident and contact");
      return;
    }

    if (!subject.trim() || !content.trim()) {
      toast.error("Please enter both subject and message");
      return;
    }

    try {
      // For SMS, use the SMS hook
      if (messageType === "sms" && selectedContact.phone_primary) {
        sendSMS({
          to: selectedContact.phone_primary,
          message: `${subject}\n\n${content}`,
          residentName: `${selectedResident.first_name} ${selectedResident.last_name}`
        });
      }

      // Log the communication
      await createCommunication.mutateAsync({
        resident_id: selectedResidentId,
        contact_id: selectedContactId,
        communication_type: messageType,
        direction: "outbound",
        subject,
        content,
        status: isScheduled ? "scheduled" : "sent",
        sent_at: isScheduled && scheduledTime ? new Date(scheduledTime).toISOString() : new Date().toISOString(),
        metadata: {
          contact_name: `${selectedContact.first_name} ${selectedContact.last_name}`,
          contact_method: messageType === "email" ? selectedContact.email : selectedContact.phone_primary,
          scheduled: isScheduled,
          scheduled_time: scheduledTime
        }
      });

      toast.success(
        isScheduled 
          ? `Message scheduled for ${new Date(scheduledTime).toLocaleDateString()}`
          : `${messageType.toUpperCase()} sent successfully`
      );
      
      // Reset form
      setSubject("");
      setContent("");
      setIsScheduled(false);
      setScheduledTime("");
    } catch (error) {
      toast.error(`Failed to send ${messageType}`);
      console.error(error);
    }
  };

  const getMessageIcon = () => {
    switch (messageType) {
      case "email": return <Mail className="w-4 h-4" />;
      case "sms": return <MessageSquare className="w-4 h-4" />;
      case "call": return <Phone className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Resident & Contact Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Select Resident</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedResidentId} onValueChange={setSelectedResidentId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a resident" />
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
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">
                  {selectedResident.first_name} {selectedResident.last_name}
                </p>
                <p className="text-sm text-blue-700">
                  MRN: {selectedResident.mrn} • Room {selectedResident.room_number || 'N/A'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Select Contact & Method</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Message Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Communication Method</label>
              <Select value={messageType} onValueChange={(value: "email" | "sms" | "call") => setMessageType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS Text</SelectItem>
                  <SelectItem value="call">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Contact Person</label>
              <Select 
                value={selectedContactId} 
                onValueChange={setSelectedContactId}
                disabled={!selectedResidentId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a contact" />
                </SelectTrigger>
                <SelectContent>
                  {filteredContacts?.map(contact => (
                    <SelectItem key={contact.id} value={contact.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{contact.first_name} {contact.last_name}</span>
                        <div className="flex items-center space-x-2 ml-2">
                          <Badge variant="secondary" className="text-xs">
                            {contact.contact_type?.name}
                          </Badge>
                          {contact.is_emergency_contact && (
                            <Badge variant="destructive" className="text-xs">
                              Emergency
                            </Badge>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedContact && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{selectedContact.first_name} {selectedContact.last_name}</p>
                <p className="text-sm text-gray-600">
                  {selectedContact.relationship && `${selectedContact.relationship} • `}
                  {messageType === "email" ? selectedContact.email : selectedContact.phone_primary}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Message Composition */}
      {selectedResidentId && selectedContactId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getMessageIcon()}
              <span>Compose {messageType === "email" ? "Email" : messageType === "sms" ? "SMS" : "Call Notes"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendMessage} className="space-y-4">
              {/* Scheduling Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="schedule"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="rounded"
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
                  placeholder={messageType === "email" ? "Email subject" : messageType === "sms" ? "Message title" : "Call purpose"}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {messageType === "email" ? "Message" : messageType === "sms" ? "Text Message" : "Call Notes"}
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    messageType === "email" 
                      ? "Compose your email message..." 
                      : messageType === "sms" 
                        ? "Type your text message..." 
                        : "Notes about the call purpose and topics to discuss..."
                  }
                  rows={messageType === "email" ? 6 : 4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => {
                  setSubject("");
                  setContent("");
                  setIsScheduled(false);
                  setScheduledTime("");
                }}>
                  Clear
                </Button>
                <Button 
                  type="submit" 
                  disabled={createCommunication.isPending || isSendingSMS}
                  className="flex items-center space-x-2"
                >
                  {getMessageIcon()}
                  <span>
                    {createCommunication.isPending || isSendingSMS 
                      ? "Sending..." 
                      : isScheduled 
                        ? "Schedule Message" 
                        : messageType === "call" 
                          ? "Log Call Intent" 
                          : "Send Message"
                    }
                  </span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndividualMessaging;
