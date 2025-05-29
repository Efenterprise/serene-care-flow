
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Heart, 
  FileText, 
  Calendar,
  AlertTriangle,
  TrendingUp,
  Users,
  Pill,
  Plus,
  ClipboardList
} from "lucide-react";
import { useCarePlanStats } from '@/hooks/useCarePlans';
import { useResidentStats } from '@/hooks/useResidents';
import ClinicalCarePlansManagement from './ClinicalCarePlansManagement';
import UdaManagement from './uda/UdaManagement';

const ClinicalContent = () => {
  const { data: carePlanStats } = useCarePlanStats();
  const { data: residentStats } = useResidentStats();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Clinical Management</h2>
        <p className="text-gray-600">Comprehensive clinical oversight and care coordination</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="uda">UDA</TabsTrigger>
          <TabsTrigger value="careplans">Care Plans</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vitals">Vitals & Labs</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Residents</p>
                    <p className="text-2xl font-bold text-blue-600">{residentStats?.current || 0}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Care Plans</p>
                    <p className="text-2xl font-bold text-green-600">{carePlanStats?.active || 0}</p>
                  </div>
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Priority Plans</p>
                    <p className="text-2xl font-bold text-red-600">{carePlanStats?.high_priority || 0}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Goals Met</p>
                    <p className="text-2xl font-bold text-purple-600">{carePlanStats?.met || 0}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Clinical Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scheduled Assessments</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medication Reviews</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Care Plan Updates</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Physician Visits</span>
                    <span className="font-semibold">4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">High Blood Pressure Alert</p>
                      <p className="text-xs text-gray-500">Room 205 - Mary Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Medication Due</p>
                      <p className="text-xs text-gray-500">Room 110 - Robert Smith</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Activity className="w-4 h-4 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Assessment Completed</p>
                      <p className="text-xs text-gray-500">Room 308 - Helen Davis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Assessment management interface will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uda">
          <UdaManagement />
        </TabsContent>

        <TabsContent value="careplans">
          <ClinicalCarePlansManagement />
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medication Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Medication management interface will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Vitals & Laboratory Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Vitals and lab results interface will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics & Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Quality metrics dashboard will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalContent;
