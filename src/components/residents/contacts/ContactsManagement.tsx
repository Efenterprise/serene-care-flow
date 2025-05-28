
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  Shield, 
  MessageSquare,
  Phone,
  Mail,
  FileCheck
} from "lucide-react";
import { useResidentContacts, useContactTypes } from "@/hooks/useContacts";
import { Resident } from "@/hooks/useResidents";
import ContactsList from "./ContactsList";
import AddContactDialog from "./AddContactDialog";
import CommunicationsPanel from "./CommunicationsPanel";
import VerificationPanel from "./VerificationPanel";

interface ContactsManagementProps {
  resident: Resident;
}

const ContactsManagement = ({ resident }: ContactsManagementProps) => {
  const [activeTab, setActiveTab] = useState("contacts");
  const [showAddContact, setShowAddContact] = useState(false);

  const { data: contacts, isLoading } = useResidentContacts(resident.id);
  const { data: contactTypes } = useContactTypes();

  const getContactsByCategory = (category: string) => {
    return contacts?.filter(contact => contact.contact_type?.category === category) || [];
  };

  const emergencyContacts = getContactsByCategory("emergency");
  const legalContacts = getContactsByCategory("legal");
  const familyContacts = getContactsByCategory("family");
  const medicalContacts = getContactsByCategory("medical");
  const insuranceContacts = getContactsByCategory("insurance");
  const facilityContacts = getContactsByCategory("facility");

  const pendingVerifications = contacts?.filter(contact => 
    contact.verification?.some(v => v.verification_status === "pending")
  ).length || 0;

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Contact Management</h3>
          <p className="text-gray-600">Manage all contacts for {resident.first_name} {resident.last_name}</p>
        </div>
        <Button onClick={() => setShowAddContact(true)} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-blue-600">{contacts?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency</p>
                <p className="text-2xl font-bold text-red-600">{emergencyContacts.length}</p>
              </div>
              <Phone className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Legal/POA</p>
                <p className="text-2xl font-bold text-purple-600">{legalContacts.length}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Verification</p>
                <p className="text-2xl font-bold text-orange-600">{pendingVerifications}</p>
              </div>
              <FileCheck className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contacts" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Communications</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center space-x-2">
            <FileCheck className="w-4 h-4" />
            <span>Verification</span>
            {pendingVerifications > 0 && (
              <Badge variant="destructive" className="ml-1">
                {pendingVerifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="quick-contact" className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Quick Contact</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <ContactsList 
            contacts={contacts || []}
            resident={resident}
            contactTypes={contactTypes || []}
          />
        </TabsContent>

        <TabsContent value="communications">
          <CommunicationsPanel resident={resident} contacts={contacts || []} />
        </TabsContent>

        <TabsContent value="verification">
          <VerificationPanel resident={resident} contacts={contacts || []} />
        </TabsContent>

        <TabsContent value="quick-contact">
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map(contact => (
              <Card key={contact.id} className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <Phone className="w-5 h-5" />
                    <span>Emergency: {contact.first_name} {contact.last_name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex space-x-2">
                    {contact.phone_primary && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    )}
                    {contact.email && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.phone_primary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddContactDialog
        isOpen={showAddContact}
        onClose={() => setShowAddContact(false)}
        resident={resident}
        contactTypes={contactTypes || []}
      />
    </div>
  );
};

export default ContactsManagement;
