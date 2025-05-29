
import ResidentMinimalRowDetails from "./ResidentMinimalRowDetails";
import { Resident } from "@/hooks/useResidents";

interface ResidentRowDetailsProps {
  resident: Resident;
  onViewDetails: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
}

const ResidentRowDetails = ({ resident, onViewDetails, onEdit }: ResidentRowDetailsProps) => {
  return (
    <ResidentMinimalRowDetails 
      resident={resident}
      onViewDetails={onViewDetails}
      onEdit={onEdit}
    />
  );
};

export default ResidentRowDetails;
