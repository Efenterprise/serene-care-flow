
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, FileText, X } from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ProfileHeaderProps {
  resident: Resident;
  onClose: () => void;
}

const ProfileHeader = ({ resident, onClose }: ProfileHeaderProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

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

  return (
    <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-green-50">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={resident.photo_url || ""} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
            {getInitials(resident.first_name, resident.last_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {resident.first_name} {resident.last_name}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>MRN: {resident.mrn}</span>
            <span>Age: {calculateAge(resident.date_of_birth)}</span>
            <span>Room: {resident.room_number || 'N/A'}</span>
            <Badge className={getStatusColor(resident.status)}>
              {resident.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button size="sm" variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button size="sm" variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Print Summary
        </Button>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
