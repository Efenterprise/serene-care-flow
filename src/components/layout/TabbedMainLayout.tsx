
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Shield, 
  Brain,
  Activity,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Import page content components
import DashboardContent from "../dashboard/DashboardContent";
import ResidentsContent from "../residents/ResidentsContent";
import ClinicalContent from "../clinical/ClinicalContent";
import CommunicationContent from "../communication/CommunicationContent";
import EmrContent from "../emr/EmrContent";
import AdminContent from "../admin/AdminContent";
import AiInsightsContent from "../ai/AiInsightsContent";

const TabbedMainLayout = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const mainTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      component: DashboardContent
    },
    {
      id: "residents",
      label: "Residents",
      icon: Users,
      component: ResidentsContent
    },
    {
      id: "clinical",
      label: "Clinical",
      icon: Stethoscope,
      component: ClinicalContent
    },
    {
      id: "communication",
      label: "Communication",
      icon: MessageSquare,
      component: CommunicationContent
    },
    {
      id: "emr",
      label: "EMR Integration",
      icon: Activity,
      component: EmrContent
    },
    {
      id: "insights",
      label: "AI Insights",
      icon: Brain,
      component: AiInsightsContent
    }
  ];

  // Add admin tab only for admin users
  if (profile?.role === 'admin') {
    mainTabs.push({
      id: "admin",
      label: "Administration",
      icon: Shield,
      component: AdminContent
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ResidentCare Pro</h1>
          <p className="text-gray-600">Comprehensive healthcare management system</p>
          {profile && (
            <p className="text-sm text-blue-600 mt-2">
              Welcome back, {profile.first_name} {profile.last_name} ({profile.role})
            </p>
          )}
        </div>

        <Card className="border-0 shadow-sm bg-white/70">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-7 mb-6">
              {mainTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="flex items-center space-x-2 px-4 py-3"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {mainTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <tab.component />
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default TabbedMainLayout;
