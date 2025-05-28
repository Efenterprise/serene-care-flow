
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Heart,
  FileText,
  Edit,
  Eye
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Resident } from "@/hooks/useResidents";

interface ResidentCardProps {
  resident: Resident;
}

const ResidentCard = ({ resident }: ResidentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'discharged':
        return 'bg-blue-100 text-blue-800';
      case 'pending_admission':
        return 'bg-orange-100 text-orange-800';
      case 'temporary_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCareLevel = (level?: string) => {
    switch (level) {
      case 'skilled':
        return 'bg-red-100 text-red-800';
      case 'assisted':
        return 'bg-blue-100 text-blue-800';
      case 'memory_care':
        return 'bg-purple-100 text-purple-800';
      case 'respite':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
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
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {resident.first_name} {resident.last_name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>MRN: {resident.mrn}</span>
                <span>Age: {calculateAge(resident.date_of_birth)}</span>
                <span className="capitalize">{resident.gender}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(resident.status)}>
              {resident.status.replace('_', ' ').toUpperCase()}
            </Badge>
            {resident.care_level && (
              <Badge className={getCareLevel(resident.care_level)}>
                {resident.care_level.replace('_', ' ').toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {resident.room_number && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium">{resident.room_number}</p>
                {resident.floor && <p className="text-xs text-gray-500">Floor {resident.floor}</p>}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">
                {resident.status === 'discharged' ? 'Discharged' : 'Admitted'}
              </p>
              <p className="font-medium">
                {resident.status === 'discharged' && resident.discharge_date
                  ? formatDate(resident.discharge_date)
                  : formatDate(resident.admission_date)
                }
              </p>
              <p className="text-xs text-gray-500">{calculateLengthOfStay()} days</p>
            </div>
          </div>

          {resident.physician_attending && (
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Attending</p>
                <p className="font-medium">{resident.physician_attending}</p>
              </div>
            </div>
          )}

          {resident.payor_primary && (
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Payor</p>
                <p className="font-medium">{resident.payor_primary}</p>
              </div>
            </div>
          )}
        </div>

        {resident.diagnosis_primary && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
            <p className="font-medium">{resident.diagnosis_primary}</p>
          </div>
        )}

        {resident.emergency_contact_name && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Phone className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-800">Emergency Contact</p>
            </div>
            <p className="font-medium">{resident.emergency_contact_name}</p>
            {resident.emergency_contact_relationship && (
              <p className="text-sm text-gray-600">{resident.emergency_contact_relationship}</p>
            )}
            {resident.emergency_contact_phone && (
              <p className="text-sm text-blue-600">{resident.emergency_contact_phone}</p>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResidentCard;
