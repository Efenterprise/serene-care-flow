import { useState, useEffect } from "react";
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
import TherapyContent from "@/components/therapy/TherapyContent";
import ReferralContent from "@/components/referrals/ReferralContent";
import AdmissionsAgreementsPortal from "@/components/documentation/AdmissionsAgreementsPortal";
import { useFacilityStore } from "@/stores/facilityStore";

interface DropdownMainLayoutProps {
  children?: React.ReactNode;
}

const DropdownMainLayout = ({ children }: DropdownMainLayoutProps) => {
  const [currentPath, setCurrentPath] = useState("dashboard");
  const { fetchFacilityStats } = useFacilityStore();

  // Initialize facility data when layout loads - call once on mount only
  useEffect(() => {
    console.log('DropdownMainLayout: Initializing facility stats...');
    fetchFacilityStats();
  }, []); // Empty dependency array to call only once on mount

  const handleNavigate = (path: string) => {
    console.log('DropdownMainLayout: Navigating to path:', path);
    
    // Map complex dashboard paths to available routes, similar to TabbedMainLayout
    let targetPath = path;
    
    // Handle simple path mapping for dashboard drilldowns
    if (path === "residents" || path.startsWith("residents/") || path.startsWith("people/")) {
      targetPath = "residents";
    } else if (path === "clinical" || path.startsWith("clinical/")) {
      targetPath = "clinical";
    } else if (path === "communication" || path.startsWith("communication/")) {
      targetPath = "communication";
    } else if (path === "emr" || path.startsWith("emr/")) {
      targetPath = "emr";
    } else if (path === "admin" || path.startsWith("admin/")) {
      targetPath = "admin";
    } else if (path === "maintenance" || path.startsWith("maintenance/")) {
      targetPath = "maintenance";
    } else if (path === "insights" || path.startsWith("insights/")) {
      targetPath = "insights/ai-proact";
    }
    
    console.log('DropdownMainLayout: Mapped to path:', targetPath);
    setCurrentPath(targetPath);
  };

  const renderContent = () => {
    console.log('Current path:', currentPath); // Debug log
    
    // Handle documentation paths
    if (currentPath === "documentation/admissions-agreements") {
      return <AdmissionsAgreementsPortal />;
    }
    
    // Handle other documentation paths
    if (currentPath.startsWith("documentation/")) {
      return <MaintenanceContent />; // Placeholder for now
    }
    
    // Handle referrals navigation - CRM section
    if (currentPath === "referrals" || currentPath.startsWith("referrals/")) {
      return <ReferralContent currentPath={currentPath} />;
    }

    // Handle therapy navigation under Clinical
    if (currentPath === "therapy" || currentPath.startsWith("therapy/")) {
      return <TherapyContent currentPath={currentPath} />;
    }

    // Handle specific MDS navigation - this is the key fix
    if (currentPath === "emr/mds" || currentPath === "clinical/mds" || currentPath === "documentation/mds") {
      return <MdsManagement />;
    }

    // Handle survey and regulatory paths (now under Reports)
    if (currentPath.startsWith("survey/")) {
      return <SurveyContent currentPath={currentPath} />;
    }

    // Handle other clinical paths
    if (currentPath.startsWith("clinical/") || currentPath === "clinical") {
      return <ClinicalContent />;
    }

    // Handle people/residents paths
    if (currentPath.startsWith("residents/") || currentPath.startsWith("people/") || currentPath === "residents") {
      return <ResidentsContent />;
    }

    // Handle communication paths (now under CRM)
    if (currentPath.startsWith("communication/") || currentPath === "communication") {
      return <CommunicationContent />;
    }

    // Handle admin paths
    if (currentPath.startsWith("admin/") || currentPath === "admin") {
      return <AdminContent />;
    }

    // Handle EMR integration paths
    if (currentPath.startsWith("emr/") || currentPath === "emr") {
      return <EmrContent />;
    }

    // Handle AI insights (now under Admin)
    if (currentPath === "insights/ai-proact") {
      return <AiInsightsContent />;
    }

    // Handle reports paths
    if (currentPath.startsWith("reports/")) {
      return <MaintenanceContent />; // Placeholder for now
    }

    // Handle maintenance paths (now under Admin)
    if (currentPath.startsWith("maintenance/") || currentPath === "maintenance") {
      return <MaintenanceContent />;
    }

    // Handle CRM paths
    if (currentPath.startsWith("crm/")) {
      return <MaintenanceContent />; // Placeholder for now
    }

    // Default to dashboard - pass the handleNavigate function
    if (currentPath === "dashboard") {
      return <DashboardContent onNavigate={handleNavigate} />;
    }

    return <DashboardContent onNavigate={handleNavigate} />;
  };

  const formatBreadcrumb = (path: string) => {
    // Map new paths to user-friendly breadcrumbs
    const pathMap: Record<string, string> = {
      'dashboard': 'Home',
      'clinical': 'Clinical',
      'admin': 'Admin',
      'documents': 'Document Manager',
      'crm': 'CRM',
      'reports': 'Reports',
      'emr/mds': 'MDS Assessments',
      'clinical/mds': 'MDS Assessments',
      'documentation/mds': 'MDS Documentation'
    };

    const segments = path.split('/');
    const mainSection = segments[0];
    
    // Handle specific MDS paths
    if (path === 'emr/mds' || path === 'clinical/mds' || path === 'documentation/mds') {
      return pathMap[path];
    }
    
    if (pathMap[mainSection]) {
      if (segments.length === 1) {
        return pathMap[mainSection];
      } else {
        const subsection = segments.slice(1).join(' / ')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        return `${pathMap[mainSection]} / ${subsection}`;
      }
    }

    return path
      .split('/')
      .map(segment => segment.replace('-', ' '))
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' / ');
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
                {formatBreadcrumb(currentPath)}
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
