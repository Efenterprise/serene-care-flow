
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ClinicalOverview from "./ClinicalOverview";
import ClinicalCarePlansManagement from "./ClinicalCarePlansManagement";
import IncidentManagement from "../incidents/IncidentManagement";
import GrievanceManagement from "../grievances/GrievanceManagement";
import UdaManagement from "./uda/UdaManagement";

const ClinicalContent = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check URL params for tab navigation
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'care-plans', 'incidents', 'grievances', 'uda'].includes(tab)) {
      setActiveTab(tab);
    }
    
    // Check if we're navigating from an alert with specific tab and incident ID
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state, searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'overview') {
      setSearchParams({});
    } else {
      setSearchParams({ tab: value });
    }
  };

  const showBackToOverview = activeTab !== 'overview';

  return (
    <div className="space-y-6">
      {showBackToOverview && (
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTabChange('overview')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Clinical Overview</span>
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        {activeTab === 'overview' ? (
          <ClinicalOverview />
        ) : (
          <>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="care-plans">Care Plans</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
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
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ClinicalContent;
