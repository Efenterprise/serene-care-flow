
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Heart, 
  Pill, 
  ClipboardList, 
  Stethoscope, 
  Target, 
  FileText, 
  Calendar, 
  Shield, 
  Users, 
  History, 
  BarChart3, 
  Activity, 
  TrendingUp 
} from "lucide-react";

interface ProfileTabsNavigationProps {
  activeTab: string;
}

const ProfileTabsNavigation = ({ activeTab }: ProfileTabsNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-6 lg:grid-cols-16 bg-gray-50 m-4">
      <TabsTrigger value="overview" className="flex items-center space-x-1">
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">Overview</span>
      </TabsTrigger>
      <TabsTrigger value="vitals" className="flex items-center space-x-1">
        <Heart className="w-4 h-4" />
        <span className="hidden sm:inline">Vitals</span>
      </TabsTrigger>
      <TabsTrigger value="medications" className="flex items-center space-x-1">
        <Pill className="w-4 h-4" />
        <span className="hidden sm:inline">Meds</span>
      </TabsTrigger>
      <TabsTrigger value="orders" className="flex items-center space-x-1">
        <ClipboardList className="w-4 h-4" />
        <span className="hidden sm:inline">Orders</span>
      </TabsTrigger>
      <TabsTrigger value="assessments" className="flex items-center space-x-1">
        <Stethoscope className="w-4 h-4" />
        <span className="hidden sm:inline">Assess</span>
      </TabsTrigger>
      <TabsTrigger value="careplans" className="flex items-center space-x-1">
        <Target className="w-4 h-4" />
        <span className="hidden sm:inline">Care Plans</span>
      </TabsTrigger>
      <TabsTrigger value="progress" className="flex items-center space-x-1">
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">Notes</span>
      </TabsTrigger>
      <TabsTrigger value="tasks" className="flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline">Tasks</span>
      </TabsTrigger>
      <TabsTrigger value="contacts" className="flex items-center space-x-1">
        <Shield className="w-4 h-4" />
        <span className="hidden sm:inline">Contacts</span>
      </TabsTrigger>
      <TabsTrigger value="medical-team" className="flex items-center space-x-1">
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">Medical Team</span>
      </TabsTrigger>
      <TabsTrigger value="medical-history" className="flex items-center space-x-1">
        <History className="w-4 h-4" />
        <span className="hidden sm:inline">History</span>
      </TabsTrigger>
      <TabsTrigger value="medical-analytics" className="flex items-center space-x-1">
        <BarChart3 className="w-4 h-4" />
        <span className="hidden sm:inline">Analytics</span>
      </TabsTrigger>
      <TabsTrigger value="therapy" className="flex items-center space-x-1">
        <Activity className="w-4 h-4" />
        <span className="hidden sm:inline">Therapy</span>
      </TabsTrigger>
      <TabsTrigger value="census" className="flex items-center space-x-1">
        <TrendingUp className="w-4 h-4" />
        <span className="hidden sm:inline">Census</span>
      </TabsTrigger>
      <TabsTrigger value="misc" className="flex items-center space-x-1">
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">Misc</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ProfileTabsNavigation;
