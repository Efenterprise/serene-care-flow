
import { format, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Phone, FileText } from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface OverviewTabProps {
  resident: Resident;
}

const OverviewTab = ({ resident }: OverviewTabProps) => {
  const calculateLengthOfStay = () => {
    const admissionDate = new Date(resident.admission_date);
    const endDate = resident.discharge_date ? new Date(resident.discharge_date) : new Date();
    return differenceInDays(endDate, admissionDate);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium">{format(new Date(resident.date_of_birth), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-medium capitalize">{resident.gender || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Admission Date</p>
              <p className="font-medium">{format(new Date(resident.admission_date), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Length of Stay</p>
              <p className="font-medium">{calculateLengthOfStay()} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room & Unit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Room Number</p>
              <p className="font-medium">{resident.room_number || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Floor</p>
              <p className="font-medium">{resident.floor || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit</p>
              <p className="font-medium">{resident.unit || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Care Level</p>
              <p className="font-medium capitalize">{resident.care_level || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      {resident.emergency_contact_name && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Emergency Contact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{resident.emergency_contact_name}</p>
              {resident.emergency_contact_relationship && (
                <p className="text-sm text-gray-600">{resident.emergency_contact_relationship}</p>
              )}
              {resident.emergency_contact_phone && (
                <p className="text-sm text-blue-600">{resident.emergency_contact_phone}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insurance Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Insurance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Primary Payor</p>
              <p className="font-medium">{resident.payor_primary || 'N/A'}</p>
            </div>
            {resident.payor_secondary && (
              <div>
                <p className="text-sm text-gray-600">Secondary Payor</p>
                <p className="font-medium">{resident.payor_secondary}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
