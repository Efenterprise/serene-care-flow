
import { useState } from "react";
import DropdownNavigation from "@/components/navigation/DropdownNavigation";
import DashboardContent from "@/components/dashboard/DashboardContent";
import ResidentsContent from "@/components/residents/ResidentsContent";
import EmrContent from "@/components/emr/EmrContent";
import CommunicationContent from "@/components/communication/CommunicationContent";
import AdminContent from "@/components/admin/AdminContent";
import AiInsightsContent from "@/components/ai/AiInsightsContent";
import ClinicalContent from "@/components/clinical/ClinicalContent";
import MaintenanceContent from "@/components/maintenance/MaintenanceContent";
import MdsManagement from "@/components/emr/MdsManagement";
import SurveyContent from "@/components/survey/SurveyContent";

interface DropdownMainLayoutProps {
  children?: React.ReactNode;
}

const DropdownMainLayout = ({ children }: DropdownMainLayoutProps) => {
  const [currentPath, setCurrentPath] = useState("dashboard");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderContent = () => {
    // Handle specific MDS navigation
    if (currentPath === "clinical/mds" || currentPath === "documentation/mds") {
      return <MdsManagement />;
    }

    // Handle survey and regulatory paths
    if (currentPath.startsWith("survey/")) {
      return <SurveyContent currentPath={currentPath} />;
    }

    // Handle other clinical paths
    if (currentPath.startsWith("clinical/")) {
      return <ClinicalContent />;
    }

    // Handle residents paths
    if (currentPath.startsWith("residents/")) {
      return <ResidentsContent />;
    }

    // Handle communication paths
    if (currentPath.startsWith("communication/")) {
      return <CommunicationContent />;
    }

    // Handle admin paths
    if (currentPath.startsWith("admin/")) {
      return <AdminContent />;
    }

    // Handle EMR integration paths
    if (currentPath.startsWith("emr/") || currentPath === "admin/integrations") {
      return <EmrContent />;
    }

    // Handle reports and documentation paths
    if (currentPath.startsWith("reports/") || currentPath.startsWith("documentation/")) {
      return <MaintenanceContent />; // Placeholder for now
    }

    // Default to dashboard
    return <DashboardContent />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DropdownNavigation 
        onNavigate={handleNavigate} 
        currentPath={currentPath} 
      />
      
      {/* Breadcrumb navigation */}
      <div className="bg-white border-b px-6 py-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Home</span>
          {currentPath !== "dashboard" && (
            <>
              <span>/</span>
              <span className="capitalize">
                {currentPath.replace("/", " / ").replace("-", " ")}
              </span>
            </>
          )}
        </div>
      </div>

      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto p-6">
          {children || renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DropdownMainLayout;
