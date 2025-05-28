
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import QuickStatsGrid from "@/components/dashboard/QuickStatsGrid";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import RecentActivityPanel from "@/components/dashboard/RecentActivityPanel";
import BedBoard from "@/components/BedBoard";
import ClinicalDashboard from "@/components/emr/ClinicalDashboard";
import MdsManagement from "@/components/emr/MdsManagement";
import CensusDashboard from "@/components/emr/CensusDashboard";
import RevenueCycleDashboard from "@/components/emr/RevenueCycleDashboard";

const Dashboard = () => {
  const [currentTime] = useState(new Date().toLocaleString());

  const censusData = {
    total: 120,
    occupied: 95,
    admissions: 3,
    discharges: 1,
    occupancyRate: 79.2
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">
        <WelcomeSection currentTime={currentTime} />
        <QuickStatsGrid censusData={censusData} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="census">Census</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="mds">MDS</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Cycle</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <AlertsPanel alerts={alerts} />
              <RecentActivityPanel activities={recentActivities} />
            </div>
          </TabsContent>

          <TabsContent value="census">
            <CensusDashboard />
          </TabsContent>

          <TabsContent value="clinical">
            <ClinicalDashboard />
          </TabsContent>

          <TabsContent value="mds">
            <MdsManagement />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueCycleDashboard />
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-0 shadow-sm bg-white/70">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>EBITDAR drivers and quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Executive Reporting</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Comprehensive dashboards for staffing vs acuity, Five-Star trends, and financial performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
