
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Edit, 
  Shield, 
  AlertTriangle,
  User,
  Stethoscope,
  FileText,
  Building
} from "lucide-react";
import { ResidentContact, ContactType } from "@/hooks/useContacts";
import { Resident } from "@/hooks/useResidents";

interface ContactsListProps {
  contacts: ResidentContact[];
  resident: Resident;
  contactTypes: ContactType[];
}

const ContactsList = ({ contacts, resident, contactTypes }: ContactsListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency": return AlertTriangle;
      case "legal": return Shield;
      case "family": return User;
      case "medical": return Stethoscope;
      case "insurance": return FileText;
      case "facility": return Building;
      default: return User;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emergency": return "text-red-600 bg-red-50 border-red-200";
      case "legal": return "text-purple-600 bg-purple-50 border-purple-200";
      case "family": return "text-blue-600 bg-blue-50 border-blue-200";
      case "medical": return "text-green-600 bg-green-50 border-green-200";
      case "insurance": return "text-orange-600 bg-orange-50 border-orange-200";
      case "facility": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getVerificationStatus = (contact: ResidentContact) => {
    if (!contact.contact_type?.requires_verification) return null;
    
    const verification = contact.verification?.[0];
    if (!verification) return "pending";
    return verification.verification_status;
  };

  const filteredContacts = selectedCategory === "all" 
    ? contacts 
    : contacts.filter(contact => contact.contact_type?.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Contacts", count: contacts.length },
    { id: "emergency", name: "Emergency", count: contacts.filter(c => c.contact_type?.category === "emergency").length },
    { id: "legal", name: "Legal/POA", count: contacts.filter(c => c.contact_type?.category === "legal").length },
    { id: "family", name: "Family", count: contacts.filter(c => c.contact_type?.category === "family").length },
    { id: "medical", name: "Medical", count: contacts.filter(c => c.contact_type?.category === "medical").length },
    { id: "insurance", name: "Insurance", count: contacts.filter(c => c.contact_type?.category === "insurance").length },
    { id: "facility", name: "Facility", count: contacts.filter(c => c.contact_type?.category === "facility").length },
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map(contact => {
          const IconComponent = getCategoryIcon(contact.contact_type?.category || "");
          const verificationStatus = getVerificationStatus(contact);

          return (
            <Card key={contact.id} className={`${getCategoryColor(contact.contact_type?.category || "")} relative`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <CardTitle className="text-lg">
                        {contact.first_name} {contact.last_name}
                      </CardTitle>
                      <p className="text-sm font-medium">{contact.contact_type?.name}</p>
                    </div>
                  </div>
                  
                  {verificationStatus && (
                    <Badge 
                      variant={verificationStatus === "verified" ? "default" : 
                               verificationStatus === "pending" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {verificationStatus === "verified" ? "✓ Verified" : 
                       verificationStatus === "pending" ? "⏳ Pending" : "❌ Rejected"}
                    </Badge>
                  )}
                </div>
                
                {contact.relationship && (
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Contact Information */}
                <div className="space-y-2">
                  {contact.phone_primary && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{contact.phone_primary}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{contact.email}</span>
                    </div>
                  )}
                </div>

                {/* Priority & Emergency Badges */}
                <div className="flex space-x-2">
                  {contact.is_emergency_contact && (
                    <Badge variant="destructive" className="text-xs">
                      Emergency Contact
                    </Badge>
                  )}
                  {contact.priority_level === 1 && (
                    <Badge variant="default" className="text-xs">
                      Primary
                    </Badge>
                  )}
                  {contact.is_authorized_to_receive_info && (
                    <Badge variant="outline" className="text-xs">
                      Authorized
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between pt-2 border-t">
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No contacts found in this category</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactsList;
