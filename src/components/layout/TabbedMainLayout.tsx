
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Shield, 
  Brain,
  Activity,
  MessageSquare,
  Wrench
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Import page content components
import DashboardContent from "../dashboard/DashboardContent";
import ResidentsContent from "../residents/ResidentsContent";
import ClinicalContent from "../clinical/ClinicalContent";
import CommunicationContent from "../communication/CommunicationContent";
import EmrContent from "../emr/EmrContent";
import AdminContent from "../admin/AdminContent";
import AiInsightsContent from "../ai/AiInsightsContent";
import MaintenanceContent from "../maintenance/MaintenanceContent";

const TabbedMainLayout = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  // Add proper viewport handling for mobile
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);

  const mainTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      shortLabel: "Dashboard",
      icon: LayoutDashboard,
      component: DashboardContent
    },
    {
      id: "residents",
      label: "Residents",
      shortLabel: "Residents",
      icon: Users,
      component: ResidentsContent
    },
    {
      id: "clinical",
      label: "Clinical",
      shortLabel: "Clinical",
      icon: Stethoscope,
      component: ClinicalContent
    },
    {
      id: "communication",
      label: "Communication",
      shortLabel: "Comm",
      icon: MessageSquare,
      component: CommunicationContent
    },
    {
      id: "maintenance",
      label: "Maintenance",
      shortLabel: "Maint",
      icon: Wrench,
      component: MaintenanceContent
    },
    {
      id: "emr",
      label: "EMR Integration",
      shortLabel: "EMR",
      icon: Activity,
      component: EmrContent
    },
    {
      id: "insights",
      label: "AI Insights",
      shortLabel: "AI",
      icon: Brain,
      component: AiInsightsContent
    }
  ];

  // Add admin tab only for admin users
  if (profile?.role === 'admin') {
    mainTabs.push({
      id: "admin",
      label: "Administration",
      shortLabel: "Admin",
      icon: Shield,
      component: AdminContent
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader />
      
      <div className={`container mx-auto ${isMobile ? 'px-2 py-4' : 'px-6 py-8'}`}>
        <div className="mb-4 sm:mb-8">
          <h1 className={`font-bold text-gray-900 mb-2 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            ResidentCare Pro
          </h1>
          <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-base'}`}>
            Comprehensive healthcare management system
          </p>
          {profile && (
            <p className={`text-blue-600 mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              Welcome back, {profile.first_name} {profile.last_name} ({profile.role})
            </p>
          )}
        </div>

        <Card className="border-0 shadow-sm bg-white/70">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {isMobile ? (
              <div className="border-b bg-gray-50">
                <div className="flex overflow-x-auto space-x-1 p-2 scrollbar-hide">
                  {mainTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center space-x-1 px-3 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors min-w-fit
                        ${activeTab === tab.id 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }
                      `}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.shortLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-8 mb-6">
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
            )}

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
