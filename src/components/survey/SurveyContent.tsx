
import { useState } from "react";
import SurveyReadinessDashboard from "./SurveyReadinessDashboard";
import FacilityAssessment from "./FacilityAssessment";
import DocumentManagement from "./DocumentManagement";
import ComplianceTracking from "./ComplianceTracking";
import PolicyManagement from "./PolicyManagement";
import MockSurveys from "./MockSurveys";

interface SurveyContentProps {
  currentPath: string;
}

const SurveyContent = ({ currentPath }: SurveyContentProps) => {
  const renderContent = () => {
    switch (currentPath) {
      case "survey/readiness":
        return <SurveyReadinessDashboard />;
      case "survey/facility-assessment":
        return <FacilityAssessment />;
      case "survey/documents":
        return <DocumentManagement />;
      case "survey/compliance":
        return <ComplianceTracking />;
      case "survey/policies":
        return <PolicyManagement />;
      case "survey/mock-surveys":
        return <MockSurveys />;
      default:
        return <SurveyReadinessDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};

export default SurveyContent;
