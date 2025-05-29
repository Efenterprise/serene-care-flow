
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Resident } from "@/hooks/useResidents";
import PhotoUpload from "./PhotoUpload";

interface OverviewTabProps {
  resident: Resident;
}

const OverviewTab = ({ resident }: OverviewTabProps) => {
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

  return (
    <div className="space-y-6">
      {/* Photo Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <PhotoUpload resident={resident} />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium">{resident.first_name} {resident.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">MRN</p>
              <p className="font-medium">{resident.mrn}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium">
                {new Date(resident.date_of_birth).toLocaleDateString()} 
                <span className="text-gray-500 ml-2">({calculateAge(resident.date_of_birth)} years old)</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-medium capitalize">{resident.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge className={
                resident.status === 'current' ? 'bg-green-100 text-green-800' :
                resident.status === 'discharged' ? 'bg-blue-100 text-blue-800' :
                resident.status === 'pending_admission' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }>
                {resident.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Care Level</p>
              <p className="font-medium capitalize">{resident.care_level || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admission Information */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Admission Date</p>
              <p className="font-medium">{new Date(resident.admission_date).toLocaleDateString()}</p>
            </div>
            {resident.discharge_date && (
              <div>
                <p className="text-sm text-gray-600">Discharge Date</p>
                <p className="font-medium">{new Date(resident.discharge_date).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Room</p>
              <p className="font-medium">{resident.room_number || 'Not assigned'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Floor</p>
              <p className="font-medium">{resident.floor || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit</p>
              <p className="font-medium">{resident.unit || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Primary Payor</p>
              <p className="font-medium">{resident.payor_primary || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Secondary Payor</p>
              <p className="font-medium">{resident.payor_secondary || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      {(resident.emergency_contact_name || resident.emergency_contact_phone) && (
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {resident.emergency_contact_name && (
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{resident.emergency_contact_name}</p>
                </div>
              )}
              {resident.emergency_contact_relationship && (
                <div>
                  <p className="text-sm text-gray-600">Relationship</p>
                  <p className="font-medium">{resident.emergency_contact_relationship}</p>
                </div>
              )}
              {resident.emergency_contact_phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{resident.emergency_contact_phone}</p>
                </div>
              )}
            </div>
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

export default OverviewTab;
