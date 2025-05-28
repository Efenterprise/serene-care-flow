
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useCommunicationLog, useCreateCommunication, ResidentContact } from "@/hooks/useContacts";
import { Resident } from "@/hooks/useResidents";
import { format } from "date-fns";
import { toast } from "sonner";

interface CommunicationsPanelProps {
  resident: Resident;
  contacts: ResidentContact[];
}

const CommunicationsPanel = ({ resident, contacts }: CommunicationsPanelProps) => {
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [messageType, setMessageType] = useState<"email" | "sms" | "call">("email");
  const [messageData, setMessageData] = useState({
    contact_id: "",
    subject: "",
    content: "",
  });

  const { data: communications, isLoading } = useCommunicationLog(resident.id);
  const createCommunication = useCreateCommunication();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const contact = contacts.find(c => c.id === messageData.contact_id);
    if (!contact) {
      toast.error("Please select a contact");
      return;
    }

    try {
      await createCommunication.mutateAsync({
        resident_id: resident.id,
        contact_id: messageData.contact_id,
        communication_type: messageType,
        direction: "outbound",
        subject: messageData.subject,
        content: messageData.content,
        status: "sent",
        sent_at: new Date().toISOString(),
        metadata: {
          contact_name: `${contact.first_name} ${contact.last_name}`,
          contact_method: messageType === "email" ? contact.email : contact.phone_primary
        }
      });
      
      toast.success(`${messageType.toUpperCase()} sent successfully`);
      setShowNewMessage(false);
      setMessageData({ contact_id: "", subject: "", content: "" });
    } catch (error) {
      toast.error(`Failed to send ${messageType}`);
      console.error(error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "sms":
        return <MessageSquare className="w-4 h-4" />;
      case "call":
        return <Phone className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return <div>Loading communications...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Quick Communications</span>
            <Button onClick={() => setShowNewMessage(true)} size="sm">
              <Send className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 h-16"
              onClick={() => {
                setMessageType("email");
                setShowNewMessage(true);
              }}
            >
              <Mail className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Send Email</div>
                <div className="text-sm text-gray-600">Compose message</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 h-16"
              onClick={() => {
                setMessageType("sms");
                setShowNewMessage(true);
              }}
            >
              <MessageSquare className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Send SMS</div>
                <div className="text-sm text-gray-600">Text message</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 h-16"
              onClick={() => {
                setMessageType("call");
                setShowNewMessage(true);
              }}
            >
              <Phone className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Make Call</div>
                <div className="text-sm text-gray-600">Voice call</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communications?.map(comm => {
              const contact = contacts.find(c => c.id === comm.contact_id);
              
              return (
                <div key={comm.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCommunicationIcon(comm.communication_type)}
                      <div>
                        <div className="font-medium">
                          {contact ? `${contact.first_name} ${contact.last_name}` : "Unknown Contact"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {format(new Date(comm.sent_at), "MMM dd, yyyy 'at' h:mm a")}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={comm.direction === "outbound" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {comm.direction}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="text-xs uppercase"
                      >
                        {comm.communication_type}
                      </Badge>
                      {getStatusIcon(comm.status)}
                    </div>
                  </div>

                  {comm.subject && (
                    <div className="font-medium text-gray-900">
                      {comm.subject}
                    </div>
                  )}

                  {comm.content && (
                    <div className="text-gray-700 bg-gray-50 rounded p-3">
                      {comm.content}
                    </div>
                  )}
                </div>
              );
            })}

            {(!communications || communications.length === 0) && (
              <div className="text-center py-8 text-gray-600">
                No communications yet. Start by sending your first message!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* New Message Dialog */}
      <Dialog open={showNewMessage} onOpenChange={setShowNewMessage}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Send {messageType === "email" ? "Email" : messageType === "sms" ? "SMS" : "Make Call"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Contact</label>
              <Select
                value={messageData.contact_id}
                onValueChange={(value) => setMessageData({ ...messageData, contact_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts
                    .filter(contact => {
                      if (messageType === "email") return contact.email;
                      if (messageType === "sms" || messageType === "call") return contact.phone_primary;
                      return true;
                    })
                    .map(contact => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.first_name} {contact.last_name} - {contact.contact_type?.name}
                        {messageType === "email" && ` (${contact.email})`}
                        {(messageType === "sms" || messageType === "call") && ` (${contact.phone_primary})`}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {messageType !== "call" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    value={messageData.subject}
                    onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                    placeholder={messageType === "email" ? "Email subject" : "Message subject"}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {messageType === "email" ? "Message" : "Text Message"}
                  </label>
                  <Textarea
                    value={messageData.content}
                    onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                    placeholder={messageType === "email" ? "Compose your email..." : "Type your message..."}
                    rows={messageType === "email" ? 6 : 3}
                    required
                  />
                </div>
              </>
            )}

            {messageType === "call" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  This will initiate a call to the selected contact. Please ensure you have the proper calling setup configured.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setShowNewMessage(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createCommunication.isPending}>
                {createCommunication.isPending ? "Sending..." : 
                 messageType === "call" ? "Initiate Call" : "Send"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunicationsPanel;
