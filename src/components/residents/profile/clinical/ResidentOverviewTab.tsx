
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Heart,
  FileText,
  AlertTriangle,
  Activity,
  Pill
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import { format, differenceInDays } from "date-fns";

interface ResidentOverviewTabProps {
  resident: Resident;
}

const ResidentOverviewTab = ({ resident }: ResidentOverviewTabProps) => {
  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateLengthOfStay = () => {
    const admissionDate = new Date(resident.admission_date);
    const endDate = resident.discharge_date ? new Date(resident.discharge_date) : new Date();
    return differenceInDays(endDate, admissionDate);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div className="space-y-6">
      {/* Alert Section */}
      {resident.allergies && resident.allergies.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              ALLERGIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resident.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Information Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="w-5 h-5 mr-2" />
              Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Date of Birth</span>
              <p className="font-medium">{formatDate(resident.date_of_birth)} (Age {calculateAge(resident.date_of_birth)})</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Gender</span>
              <p className="font-medium capitalize">{resident.gender}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">MRN</span>
              <p className="font-medium">{resident.mrn}</p>
            </div>
          </CardContent>
        </Card>

        {/* Location & Admission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Location & Stay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Room</span>
              <p className="font-medium">{resident.room_number || 'Unassigned'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Unit/Floor</span>
              <p className="font-medium">{resident.unit || 'N/A'} {resident.floor && `/ Floor ${resident.floor}`}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Admission Date</span>
              <p className="font-medium">{formatDate(resident.admission_date)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Length of Stay</span>
              <p className="font-medium">{calculateLengthOfStay()} days</p>
            </div>
          </CardContent>
        </Card>

        {/* Care Level & Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Activity className="w-5 h-5 mr-2" />
              Care Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Care Level</span>
              <p className="font-medium capitalize">{resident.care_level?.replace('_', ' ') || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Status</span>
              <Badge variant={resident.status === 'current' ? 'default' : 'secondary'}>
                {resident.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-gray-600">Mobility</span>
              <p className="font-medium">{resident.mobility_status || 'Not assessed'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <FileText className="w-5 h-5 mr-2" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm text-gray-600">Primary Diagnosis</span>
            <p className="font-medium">{resident.diagnosis_primary || 'Not documented'}</p>
          </div>
          {resident.diagnosis_secondary && resident.diagnosis_secondary.length > 0 && (
            <div>
              <span className="text-sm text-gray-600">Secondary Diagnoses</span>
              <div className="mt-1 space-y-1">
                {resident.diagnosis_secondary.map((diagnosis, index) => (
                  <p key={index} className="text-sm bg-gray-100 p-2 rounded">{diagnosis}</p>
                ))}
              </div>
            </div>
          )}
          <div>
            <span className="text-sm text-gray-600">Attending Physician</span>
            <p className="font-medium">{resident.physician_attending || 'Not assigned'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Primary Care Physician</span>
            <p className="font-medium">{resident.physician_primary_care || 'Not assigned'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Insurance & Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Heart className="w-5 h-5 mr-2" />
            Insurance & Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Primary Payor</span>
            <p className="font-medium">{resident.payor_primary || 'Not specified'}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Secondary Payor</span>
            <p className="font-medium">{resident.payor_secondary || 'None'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      {resident.emergency_contact_name && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Name</span>
              <p className="font-medium">{resident.emergency_contact_name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Relationship</span>
              <p className="font-medium">{resident.emergency_contact_relationship || 'Not specified'}</p>
            </div>
            {resident.emergency_contact_phone && (
              <div>
                <span className="text-sm text-gray-600">Phone</span>
                <p className="font-medium">{resident.emergency_contact_phone}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Special Needs & Diet */}
      {(resident.special_needs?.length || resident.diet_restrictions?.length) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Pill className="w-5 h-5 mr-2" />
              Special Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resident.special_needs && resident.special_needs.length > 0 && (
              <div>
                <span className="text-sm text-gray-600">Special Needs</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {resident.special_needs.map((need, index) => (
                    <Badge key={index} variant="outline">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {resident.diet_restrictions && resident.diet_restrictions.length > 0 && (
              <div>
                <span className="text-sm text-gray-600">Diet Restrictions</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {resident.diet_restrictions.map((diet, index) => (
                    <Badge key={index} variant="outline">
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {resident.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{resident.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResidentOverviewTab;
