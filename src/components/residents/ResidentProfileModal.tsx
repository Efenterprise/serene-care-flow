
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Resident } from "@/hooks/useResidents";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileTabsNavigation from "./profile/ProfileTabsNavigation";
import ProfileTabsContent from "./profile/ProfileTabsContent";

interface ResidentProfileModalProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const ResidentProfileModal = ({ resident, isOpen, onClose }: ResidentProfileModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`
        bg-white rounded-lg shadow-xl w-full h-full max-h-[95vh] overflow-hidden
        ${isMobile ? 'max-w-full' : 'max-w-7xl'}
      `}>
        <ProfileHeader resident={resident} onClose={onClose} />

        <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(95vh - 140px)' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ProfileTabsNavigation activeTab={activeTab} />
            <ProfileTabsContent resident={resident} />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResidentProfileModal;
