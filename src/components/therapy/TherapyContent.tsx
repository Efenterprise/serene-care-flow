
import { useState } from "react";
import TherapyDashboard from "./TherapyDashboard";

interface TherapyContentProps {
  currentPath?: string;
}

const TherapyContent = ({ currentPath }: TherapyContentProps) => {
  // Handle different therapy routes
  const renderTherapyContent = () => {
    if (!currentPath || currentPath === "therapy" || currentPath === "therapy/dashboard") {
      return <TherapyDashboard />;
    }

    // For other therapy routes, show the dashboard for now
    // These can be expanded into full components later
    switch (currentPath) {
      case "therapy/patients":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Management</h2>
              <p className="text-gray-600">Manage therapy patients and their care plans</p>
            </div>
            <TherapyDashboard />
          </div>
        );
      
      case "therapy/scheduling":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Therapy Scheduling</h2>
              <p className="text-gray-600">Schedule and manage therapy sessions</p>
            </div>
            <TherapyDashboard />
          </div>
        );
      
      case "therapy/documentation":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Therapy Documentation</h2>
              <p className="text-gray-600">Document therapy sessions and progress</p>
            </div>
            <TherapyDashboard />
          </div>
        );
      
      case "therapy/outcomes":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Outcomes</h2>
              <p className="text-gray-600">Track and analyze therapy outcomes</p>
            </div>
            <TherapyDashboard />
          </div>
        );
      
      case "therapy/telehealth":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Telehealth Sessions</h2>
              <p className="text-gray-600">Manage remote therapy sessions</p>
            </div>
            <TherapyDashboard />
          </div>
        );
      
      default:
        return <TherapyDashboard />;
    }
  };

  return renderTherapyContent();
};

export default TherapyContent;
