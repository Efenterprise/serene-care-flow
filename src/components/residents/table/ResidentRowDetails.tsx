
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit, 
  Eye, 
  Phone, 
  Mail, 
  UserPlus,
  Shield,
  Heart,
  Building,
  CreditCard,
  User,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import { useResidentContacts } from "@/hooks/useContacts";
import ContactCategorySection from "./contact-details/ContactCategorySection";
import ContactQuickStats from "./contact-details/ContactQuickStats";

interface ResidentRowDetailsProps {
  resident: Resident;
  onViewDetails: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
}

const ResidentRowDetails = ({ resident, onViewDetails, onEdit }: ResidentRowDetailsProps) => {
  const [activeTab, setActiveTab] = useState("contacts");
  const { data: contacts, isLoading } = useResidentContacts(resident.id);

  const getContactsByCategory = (category: string) => {
    return contacts?.filter(contact => contact.contact_type?.category === category) || [];
  };

  const emergencyContacts = getContactsByCategory("emergency");
  const medicalContacts = getContactsByCategory("medical");
  const legalContacts = getContactsByCategory("legal");
  const familyContacts = getContactsByCategory("family");
  const insuranceContacts = getContactsByCategory("insurance");
  const facilityContacts = getContactsByCategory("facility");

  if (isLoading) {
    return (
      <CollapsibleContent asChild>
        <TableRow>
          <TableCell colSpan={8} className="p-4">
            <div className="text-center py-8">Loading contact information...</div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    );
  }

  return (
    <CollapsibleContent asChild>
      <TableRow>
        <TableCell colSpan={8} className="p-0">
          <div className="bg-gray-50 border-t">
            {/* Quick Stats Bar */}
            <ContactQuickStats 
              emergencyCount={emergencyContacts.length}
              medicalCount={medicalContacts.length}
              legalCount={legalContacts.length}
              totalCount={contacts?.length || 0}
            />

            {/* Contact Management Tabs */}
            <div className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="contacts" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Contacts</span>
                    <Badge variant="secondary" className="ml-1">
                      {emergencyContacts.length + familyContacts.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="medical" className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Medical</span>
                    <Badge variant="secondary" className="ml-1">
                      {medicalContacts.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="legal" className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Legal</span>
                    <Badge variant="secondary" className="ml-1">
                      {legalContacts.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="insurance" className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Insurance</span>
                    <Badge variant="secondary" className="ml-1">
                      {insuranceContacts.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="contacts" className="space-y-4">
                  <ContactCategorySection
                    title="Emergency Contacts"
                    contacts={emergencyContacts}
                    categoryColor="red"
                    icon={<Phone className="w-4 h-4" />}
                  />
                  <ContactCategorySection
                    title="Family Members"
                    contacts={familyContacts}
                    categoryColor="blue"
                    icon={<User className="w-4 h-4" />}
                  />
                </TabsContent>

                <TabsContent value="medical" className="space-y-4">
                  <ContactCategorySection
                    title="Medical Professionals"
                    contacts={medicalContacts}
                    categoryColor="green"
                    icon={<Heart className="w-4 h-4" />}
                  />
                  <ContactCategorySection
                    title="External Facilities"
                    contacts={facilityContacts}
                    categoryColor="purple"
                    icon={<Building className="w-4 h-4" />}
                  />
                </TabsContent>

                <TabsContent value="legal" className="space-y-4">
                  <ContactCategorySection
                    title="Legal Contacts"
                    contacts={legalContacts}
                    categoryColor="orange"
                    icon={<Shield className="w-4 h-4" />}
                  />
                </TabsContent>

                <TabsContent value="insurance" className="space-y-4">
                  <ContactCategorySection
                    title="Insurance Contacts"
                    contacts={insuranceContacts}
                    categoryColor="indigo"
                    icon={<CreditCard className="w-4 h-4" />}
                  />
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(resident);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(resident);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Resident
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </CollapsibleContent>
  );
};

export default ResidentRowDetails;
