
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClinicalCarePlansManagement from "./ClinicalCarePlansManagement";
import IncidentManagement from "../incidents/IncidentManagement";
import GrievanceManagement from "../grievances/GrievanceManagement";
import UdaManagement from "./uda/UdaManagement";

const ClinicalContent = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("care-plans");

  useEffect(() => {
    // Check if we're navigating from an alert with specific tab and incident ID
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clinical Management</h1>
        <p className="text-gray-600 mt-2">
          Manage care plans, incidents, grievances, and assessments
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="care-plans">Care Plans</TabsTrigger>
          <TabsTrigger value="incidents">Incident Management</TabsTrigger>
          <TabsTrigger value="grievances">Grievances</TabsTrigger>
          <TabsTrigger value="uda">UDA Management</TabsTrigger>
        </TabsList>

        <TabsContent value="care-plans">
          <ClinicalCarePlansManagement />
        </TabsContent>

        <TabsContent value="incidents">
          <IncidentManagement />
        </TabsContent>

        <TabsContent value="grievances">
          <GrievanceManagement />
        </TabsContent>

        <TabsContent value="uda">
          <UdaManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalContent;
