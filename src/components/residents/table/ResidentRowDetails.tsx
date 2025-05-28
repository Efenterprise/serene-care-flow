
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { 
  Edit, 
  Eye, 
  MapPin, 
  Phone, 
  Heart, 
  FileText 
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentRowDetailsProps {
  resident: Resident;
  onViewDetails: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
}

const ResidentRowDetails = ({ resident, onViewDetails, onEdit }: ResidentRowDetailsProps) => {
  return (
    <CollapsibleContent asChild>
      <TableRow>
        <TableCell colSpan={8} className="p-0">
          <div className="bg-gray-50 p-4 border-t">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {resident.floor && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Floor</p>
                    <p className="font-medium">{resident.floor}</p>
                  </div>
                </div>
              )}

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

              {resident.emergency_contact_name && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                    <p className="font-medium">{resident.emergency_contact_name}</p>
                  </div>
                </div>
              )}
            </div>

            {resident.diagnosis_primary && (
              <div className="mb-4 p-3 bg-white rounded border">
                <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
                <p className="font-medium">{resident.diagnosis_primary}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(resident);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
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
                Edit
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </CollapsibleContent>
  );
};

export default ResidentRowDetails;
