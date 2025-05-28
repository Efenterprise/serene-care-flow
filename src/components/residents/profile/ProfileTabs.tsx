
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Users, 
  Heart, 
  Pill, 
  FileText, 
  Stethoscope, 
  Target 
} from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <TabsList className="grid w-full grid-cols-7 bg-gray-50 m-4">
      <TabsTrigger value="overview" className="flex items-center space-x-1">
        <User className="w-4 h-4" />
        <span>Overview</span>
      </TabsTrigger>
      <TabsTrigger value="contacts" className="flex items-center space-x-1">
        <Users className="w-4 h-4" />
        <span>Contacts</span>
      </TabsTrigger>
      <TabsTrigger value="medical" className="flex items-center space-x-1">
        <Heart className="w-4 h-4" />
        <span>Medical</span>
      </TabsTrigger>
      <TabsTrigger value="medications" className="flex items-center space-x-1">
        <Pill className="w-4 h-4" />
        <span>Medications</span>
      </TabsTrigger>
      <TabsTrigger value="careplans" className="flex items-center space-x-1">
        <Target className="w-4 h-4" />
        <span>Care Plans</span>
      </TabsTrigger>
      <TabsTrigger value="assessments" className="flex items-center space-x-1">
        <Stethoscope className="w-4 h-4" />
        <span>Assessments</span>
      </TabsTrigger>
      <TabsTrigger value="documents" className="flex items-center space-x-1">
        <FileText className="w-4 h-4" />
        <span>Documents</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ProfileTabs;
