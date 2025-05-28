
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  UserPlus,
  User
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import { useSMS } from "@/hooks/useSMS";

interface LegacyContactFallbackProps {
  resident: Resident;
}

const LegacyContactFallback = ({ resident }: LegacyContactFallbackProps) => {
  const { sendSMS, isLoading } = useSMS();
  const hasEmergencyContact = resident.emergency_contact_name && resident.emergency_contact_phone;

  const handleSendSMS = () => {
    if (resident.emergency_contact_phone) {
      sendSMS({
        to: resident.emergency_contact_phone,
        message: `Hello, this is regarding ${resident.first_name} ${resident.last_name} at our facility. Please contact us when you receive this message.`,
        residentName: `${resident.first_name} ${resident.last_name}`,
      });
    }
  };

  const handleCall = () => {
    if (resident.emergency_contact_phone) {
      window.open(`tel:${resident.emergency_contact_phone}`, '_self');
    }
  };

  if (!hasEmergencyContact) {
    return (
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-orange-700">
              <User className="w-4 h-4" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <Button size="sm" variant="outline" className="h-8">
              <UserPlus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">No emergency contacts added yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-red-50 border-red-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <User className="w-4 h-4" />
            <span>Emergency Contacts</span>
            <Badge className="bg-red-100 text-red-800">1</Badge>
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8">
            <UserPlus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">
                    {resident.emergency_contact_name}
                  </h4>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-red-100 text-red-800">
                    Emergency
                  </Badge>
                  
                  {resident.emergency_contact_relationship && (
                    <Badge variant="outline">
                      {resident.emergency_contact_relationship}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3" />
                    <span>{resident.emergency_contact_phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-8"
                onClick={handleCall}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-8"
                onClick={handleSendSMS}
                disabled={isLoading}
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                {isLoading ? 'Sending...' : 'Text'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default LegacyContactFallback;
