
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Hospital,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  FileText,
  DollarSign,
  ClipboardList
} from "lucide-react";
import { useEmrConnections } from "@/hooks/useEmrConnections";
import { usePatientTracking } from "@/hooks/usePatientTracking";
import { useHospitalCommunications } from "@/hooks/useHospitalCommunications";
import EmrConnectionManager from "./EmrConnectionManager";
import PatientLifecycleTracker from "./PatientLifecycleTracker";
import CommunicationLog from "./CommunicationLog";
import MdsManagement from "./MdsManagement";
import ClinicalDashboard from "./ClinicalDashboard";
import CensusDashboard from "./CensusDashboard";
import RevenueCycleDashboard from "./RevenueCycleDashboard";

const EmrDashboard = () => {
  const { data: connections } = useEmrConnections();
  const { data: patientTracking } = usePatientTracking();
  const { data: communications } = useHospitalCommunications();

  // Calculate metrics
  const activeConnections = connections?.filter(c => c.is_active).length || 0;
  const totalPatients = patientTracking?.length || 0;
  const pendingCommunications = communications?.filter(c => c.status === 'pending').length || 0;
  const admittedPatients = patientTracking?.filter(p => p.current_status === 'admitted').length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">EMR Integration Hub</h1>
          <p className="text-gray-600">Comprehensive hospital system integration and patient lifecycle management</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Hospital className="w-4 h-4 mr-2" />
          Connect New EMR
        </Button>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-green-600">{activeConnections}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients Tracked</p>
                <p className="text-2xl font-bold text-blue-600">{totalPatients}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Messages</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCommunications}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Currently Admitted</p>
                <p className="text-2xl font-bold text-purple-600">{admittedPatients}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="connections">EMR Connections</TabsTrigger>
          <TabsTrigger value="tracking">Patient Lifecycle</TabsTrigger>
          <TabsTrigger value="mds">MDS</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="census">Census</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Cycle</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <EmrConnectionManager />
        </TabsContent>

        <TabsContent value="tracking">
          <PatientLifecycleTracker />
        </TabsContent>

        <TabsContent value="mds">
          <MdsManagement />
        </TabsContent>

        <TabsContent value="clinical">
          <ClinicalDashboard />
        </TabsContent>

        <TabsContent value="census">
          <CensusDashboard />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueCycleDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmrDashboard;
