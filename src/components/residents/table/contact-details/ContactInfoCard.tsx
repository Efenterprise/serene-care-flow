
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Star
} from "lucide-react";
import { ResidentContact } from "@/hooks/useContacts";

interface ContactInfoCardProps {
  contact: ResidentContact;
  categoryColor: string;
}

const ContactInfoCard = ({ contact, categoryColor }: ContactInfoCardProps) => {
  const hasVerification = contact.verification && contact.verification.length > 0;
  const isVerified = hasVerification && contact.verification?.some(v => v.verification_status === "verified");
  const isPending = hasVerification && contact.verification?.some(v => v.verification_status === "pending");

  const getPriorityBadge = (level: number) => {
    if (level === 1) return { text: "Primary", class: "bg-blue-100 text-blue-800" };
    if (level === 2) return { text: "Secondary", class: "bg-gray-100 text-gray-800" };
    return { text: `Priority ${level}`, class: "bg-gray-100 text-gray-800" };
  };

  const priority = getPriorityBadge(contact.priority_level);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">
                {contact.first_name} {contact.last_name}
              </h4>
              {contact.priority_level === 1 && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={priority.class}>
                {priority.text}
              </Badge>
              
              {contact.relationship && (
                <Badge variant="outline">
                  {contact.relationship}
                </Badge>
              )}
              
              {contact.is_emergency_contact && (
                <Badge className="bg-red-100 text-red-800">
                  Emergency
                </Badge>
              )}
              
              {contact.is_authorized_to_receive_info && (
                <Badge className="bg-green-100 text-green-800">
                  Authorized
                </Badge>
              )}
            </div>

            {/* Verification Status */}
            {hasVerification && (
              <div className="flex items-center space-x-1 mb-2">
                {isVerified ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Verified</span>
                  </div>
                ) : isPending ? (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Verification Pending</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Not Verified</span>
                  </div>
                )}
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-1 text-sm text-gray-600">
              {contact.phone_primary && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone_primary}</span>
                  {contact.phone_secondary && (
                    <span className="text-gray-400">| {contact.phone_secondary}</span>
                  )}
                </div>
              )}
              
              {contact.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3" />
                  <span>{contact.email}</span>
                </div>
              )}
              
              {contact.preferred_contact_method && (
                <div className="text-xs text-gray-500">
                  Prefers: {contact.preferred_contact_method}
                  {contact.preferred_contact_time && ` (${contact.preferred_contact_time})`}
                </div>
              )}
            </div>
          </div>

          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Edit className="w-3 h-3" />
          </Button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex space-x-2">
          {contact.phone_primary && (
            <Button size="sm" variant="outline" className="flex-1 h-8">
              <Phone className="w-3 h-3 mr-1" />
              Call
            </Button>
          )}
          
          {contact.email && (
            <Button size="sm" variant="outline" className="flex-1 h-8">
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          )}
          
          {contact.phone_primary && (
            <Button size="sm" variant="outline" className="flex-1 h-8">
              <MessageSquare className="w-3 h-3 mr-1" />
              Text
            </Button>
          )}
        </div>

        {/* Notes */}
        {contact.notes && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">{contact.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;
