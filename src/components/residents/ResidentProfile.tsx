
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Resident } from "@/hooks/useResidents";
import ContactsManagement from "./contacts/ContactsManagement";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileTabs from "./profile/ProfileTabs";
import OverviewTab from "./profile/OverviewTab";
import MedicalTab from "./profile/MedicalTab";
import PlaceholderTab from "./profile/PlaceholderTab";
import DocumentsTab from "./profile/DocumentsTab";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidentProfileProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const ResidentProfile = ({ resident, isOpen, onClose }: ResidentProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`
        bg-white rounded-lg shadow-xl w-full h-full max-h-[95vh] overflow-hidden
        ${isMobile ? 'max-w-full' : 'max-w-6xl'}
      `}>
        <ProfileHeader resident={resident} onClose={onClose} />

        <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(95vh - 120px)' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="p-3 sm:p-6">
              <TabsContent value="overview">
                <OverviewTab resident={resident} />
              </TabsContent>

              <TabsContent value="contacts">
                <ContactsManagement resident={resident} />
              </TabsContent>

              <TabsContent value="medical">
                <MedicalTab resident={resident} />
              </TabsContent>

              <TabsContent value="medications">
                <PlaceholderTab 
                  title="Current Medications" 
                  message="Medication management system will be integrated here." 
                />
              </TabsContent>

              <TabsContent value="careplans">
                <PlaceholderTab 
                  title="Care Plans" 
                  message="Care plan management system will be integrated here." 
                />
              </TabsContent>

              <TabsContent value="assessments">
                <PlaceholderTab 
                  title="Assessments" 
                  message="Assessment tracking system will be integrated here." 
                />
              </TabsContent>

              <TabsContent value="documents">
                <DocumentsTab resident={resident} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResidentProfile;
