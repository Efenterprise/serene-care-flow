
import { format, differenceInDays } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import ResidentRowDetails from "./ResidentRowDetails";

interface ResidentTableRowProps {
  resident: Resident;
  isExpanded: boolean;
  onToggle: () => void;
  onViewDetails: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
}

const ResidentTableRow = ({ 
  resident, 
  isExpanded, 
  onToggle, 
  onViewDetails, 
  onEdit 
}: ResidentTableRowProps) => {
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

  const calculateLengthOfStay = (resident: Resident) => {
    const admissionDate = new Date(resident.admission_date);
    const endDate = resident.discharge_date ? new Date(resident.discharge_date) : new Date();
    return differenceInDays(endDate, admissionDate);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
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
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggle}
      asChild
    >
      <>
        <CollapsibleTrigger asChild>
          <TableRow className="cursor-pointer hover:bg-gray-50">
            <TableCell>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </TableCell>
            <TableCell className="font-medium text-blue-600 hover:text-blue-800">
              {resident.first_name} {resident.last_name}
            </TableCell>
            <TableCell>{resident.mrn}</TableCell>
            <TableCell>{resident.room_number || 'N/A'}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(resident.status)}>
                {resident.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </TableCell>
            <TableCell>{calculateAge(resident.date_of_birth)}</TableCell>
            <TableCell>{formatDate(resident.admission_date)}</TableCell>
            <TableCell>{calculateLengthOfStay(resident)} days</TableCell>
          </TableRow>
        </CollapsibleTrigger>
        
        <ResidentRowDetails
          resident={resident}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
        />
      </>
    </Collapsible>
  );
};

export default ResidentTableRow;
