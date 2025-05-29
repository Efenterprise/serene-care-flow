
import ResidentProfileModal from "./ResidentProfileModal";
import { Resident } from "@/hooks/useResidents";

interface ResidentProfileProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const ResidentProfile = ({ resident, isOpen, onClose }: ResidentProfileProps) => {
  return (
    <ResidentProfileModal 
      resident={resident} 
      isOpen={isOpen} 
      onClose={onClose} 
    />
  );
};

export default ResidentProfile;
