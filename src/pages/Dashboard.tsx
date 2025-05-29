
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import QuickStatsGrid from "@/components/dashboard/QuickStatsGrid";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import RecentActivityPanel from "@/components/dashboard/RecentActivityPanel";
import ManualAdmissionForm from "@/components/admissions/ManualAdmissionForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

const Dashboard = () => {
  const [currentTime] = useState(new Date().toLocaleString());
  const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);

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
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <WelcomeSection currentTime={currentTime} />
            </div>
            <Button 
              onClick={() => setIsAdmissionFormOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Admit Patient
            </Button>
          </div>
          
          <QuickStatsGrid />

          {/* Main Dashboard Content */}
          <div className="space-y-6">
            {/* Overview Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              <AlertsPanel alerts={alerts} />
              <RecentActivityPanel activities={recentActivities} />
              
              {/* Quick Access Card */}
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

            {/* Additional Dashboard Sections */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bed Management Preview */}
              <Card className="border-0 shadow-sm bg-white/70">
                <CardHeader>
                  <CardTitle>Bed Management</CardTitle>
                  <CardDescription>Current bed status and availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">25</div>
                        <div className="text-sm text-gray-600">Available</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">95</div>
                        <div className="text-sm text-gray-600">Occupied</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Overview */}
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
          </div>

          {/* Manual Admission Form */}
          <ManualAdmissionForm 
            isOpen={isAdmissionFormOpen}
            onClose={() => setIsAdmissionFormOpen(false)}
          />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
