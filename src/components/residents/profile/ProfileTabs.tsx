
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Users, 
  Heart, 
  Pill, 
  FileText, 
  Stethoscope, 
  Target,
  FolderOpen
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  const isMobile = useIsMobile();

  const tabs = [
    { value: "overview", icon: User, label: "Overview" },
    { value: "contacts", icon: Users, label: "Contacts" },
    { value: "medical", icon: Heart, label: "Medical" },
    { value: "medications", icon: Pill, label: "Medications" },
    { value: "careplans", icon: Target, label: "Care Plans" },
    { value: "assessments", icon: Stethoscope, label: "Assessments" },
    { value: "documents", icon: FolderOpen, label: "Documents" }
  ];

  if (isMobile) {
    return (
      <div className="border-b bg-gray-50 px-4 py-2">
        <div className="flex overflow-x-auto space-x-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`
                flex items-center space-x-1 px-3 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors
                ${activeTab === tab.value 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <TabsList className="grid w-full grid-cols-7 bg-gray-50 m-4">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-1">
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default ProfileTabs;
