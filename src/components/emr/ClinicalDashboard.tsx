
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import ClinicalMetricsCards from "./clinical/ClinicalMetricsCards";
import QualityMetricsGrid from "./clinical/QualityMetricsGrid";
import ClinicalAlertsPanel from "./clinical/ClinicalAlertsPanel";

const ClinicalDashboard = () => {
  // Mock clinical data
  const clinicalMetrics = {
    totalPatients: 42,
    criticalPatients: 3,
    medicationAlerts: 7,
    qualityScore: 94
  };

  const qualityMetrics = {
    fallRiskPatients: 8,
    infectionControl: 98,
    careplanCompliance: 87
  };

  const recentAlerts = [
    {
      id: "1",
      type: "medication",
      severity: "high",
      patient: "John Smith (Room 101)",
      message: "Drug interaction alert: Warfarin + Aspirin",
      time: "10 minutes ago"
    },
    {
      id: "2",
      type: "vital",
      severity: "medium",
      patient: "Mary Johnson (Room 203)",
      message: "Blood pressure reading outside normal range",
      time: "25 minutes ago"
    },
    {
      id: "3",
      type: "fall_risk",
      severity: "medium",
      patient: "Robert Davis (Room 105)",
      message: "Patient assessed as high fall risk",
      time: "1 hour ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clinical Dashboard</h2>
          <p className="text-gray-600">Real-time clinical monitoring and patient care oversight</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ClipboardList className="w-4 h-4 mr-2" />
          Clinical Report
        </Button>
      </div>

      <ClinicalMetricsCards metrics={clinicalMetrics} />
      <QualityMetricsGrid metrics={qualityMetrics} />
      <ClinicalAlertsPanel alerts={recentAlerts} />
    </div>
  );
};

export default ClinicalDashboard;
