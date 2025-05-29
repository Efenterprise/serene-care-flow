
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import WelcomeSection from "./WelcomeSection";
import QuickStatsGrid from "./QuickStatsGrid";
import AlertsPanel from "./AlertsPanel";
import RecentActivityPanel from "./RecentActivityPanel";
import ManualAdmissionForm from "@/components/admissions/ManualAdmissionForm";
import { useFacilityStore } from "@/stores/facilityStore";

const DashboardContent = () => {
  const [currentTime] = useState(new Date().toLocaleString());
  const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);
  const { stats } = useFacilityStore();

  const alerts = [
    { id: 1, type: "urgent", message: "Room 105 - Fall incident requires documentation", time: "10 min ago" },
    { id: 2, type: "warning", message: "MDS due for 3 residents this week", time: "1 hour ago" },
    { id: 3, type: "info", message: "Medication reconciliation complete - Unit A", time: "2 hours ago" }
  ];

  const recentActivities = [
    { id: 1, action: "Vitals recorded", resident: "Mary Johnson", user: "RN Sarah", time: "5 min ago" },
    { id: 2, action: "Care plan updated", resident: "Robert Smith", user: "LPN Mike", time: "15 min ago" },
    { id: 3, action: "MDS assessment completed", resident: "Helen Davis", user: "MDS Coord.", time: "30 min ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <WelcomeSection currentTime={currentTime} />
        <Button 
          onClick={() => setIsAdmissionFormOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Quick Admit Patient
        </Button>
      </div>
      
      <QuickStatsGrid />

      <div className="grid lg:grid-cols-3 gap-6">
        <AlertsPanel alerts={alerts} />
        <RecentActivityPanel activities={recentActivities} />
        
        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Assessment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              New Care Plan
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Census Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle>Bed Management</CardTitle>
            <CardDescription>Current bed status and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.availableBeds}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.occupiedBeds}</div>
                  <div className="text-sm text-gray-600">Occupied</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle>Clinical Overview</CardTitle>
            <CardDescription>Today's clinical activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Assessments Due</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Care Plans Updated</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medications Scheduled</span>
                <span className="font-semibold">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ManualAdmissionForm 
        isOpen={isAdmissionFormOpen}
        onClose={() => setIsAdmissionFormOpen(false)}
      />
    </div>
  );
};

export default DashboardContent;
