
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bed, 
  Plus, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Hospital,
  Phone,
  FileText,
  Zap,
  Activity
} from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import AdmissionsQueue from "./admissions/AdmissionsQueue";
import BedGrid from "./bedboard/BedGrid";
import CensusMetrics from "./bedboard/CensusMetrics";
import ManualAdmissionForm from "./admissions/ManualAdmissionForm";
import { useBeds } from "@/hooks/useBeds";
import { useReferrals } from "@/hooks/useReferrals";
import { useEmrConnections } from "@/hooks/useEmrConnections";
import { usePatientTracking } from "@/hooks/usePatientTracking";

const BedBoard = () => {
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);
  const { data: beds } = useBeds();
  const { data: referrals } = useReferrals();
  const { data: emrConnections } = useEmrConnections();
  const { data: patientTracking } = usePatientTracking();
  
  // Calculate real metrics from Supabase data
  const totalBeds = beds?.length || 0;
  const occupiedBeds = beds?.filter(bed => !bed.is_available).length || 0;
  const availableBeds = totalBeds - occupiedBeds;
  
  // EMR integration metrics
  const activeEmrConnections = emrConnections?.filter(conn => conn.is_active).length || 0;
  const totalEmrConnections = emrConnections?.length || 0;
  const admittedPatients = patientTracking?.filter(p => p.current_status === 'admitted').length || 0;
  
  // Mock units for now - in a real implementation, you'd have a units table
  const units = [
    { 
      id: "all", 
      name: "All Units", 
      beds: totalBeds, 
      occupied: occupiedBeds 
    },
    { 
      id: "unit-a", 
      name: "Unit A", 
      beds: Math.floor(totalBeds / 4), 
      occupied: Math.floor(occupiedBeds / 4) 
    },
    { 
      id: "unit-b", 
      name: "Unit B", 
      beds: Math.floor(totalBeds / 4), 
      occupied: Math.floor(occupiedBeds / 4) 
    },
    { 
      id: "unit-c", 
      name: "Unit C", 
      beds: Math.floor(totalBeds / 4), 
      occupied: Math.floor(occupiedBeds / 4) 
    },
    { 
      id: "unit-d", 
      name: "Unit D", 
      beds: Math.floor(totalBeds / 4), 
      occupied: Math.floor(occupiedBeds / 4) 
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bed Management & Census</h1>
            <p className="text-gray-600">Real-time bed board with AI-powered admissions and EMR integration</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAdmissionFormOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Admit
            </Button>
            <Button variant="outline">
              <Hospital className="w-4 h-4 mr-2" />
              Hospital Referrals
            </Button>
          </div>
        </div>

        {/* EMR Integration Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">EMR Connections</p>
                  <p className="text-xl font-bold text-blue-900">{activeEmrConnections}/{totalEmrConnections}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Patients Tracked</p>
                  <p className="text-xl font-bold text-green-900">{patientTracking?.length || 0}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Currently Admitted</p>
                  <p className="text-xl font-bold text-purple-900">{admittedPatients}</p>
                </div>
                <Bed className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Occupancy Rate</p>
                  <p className="text-xl font-bold text-orange-900">
                    {totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0}%
                  </p>
                </div>
                <Hospital className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Census Overview */}
        <CensusMetrics units={units} />

        {/* Main Content - Resizable Panels */}
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border bg-white/70 backdrop-blur-sm">
          {/* Admissions Queue */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="p-4 h-full">
              <AdmissionsQueue />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Bed Grid */}
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="p-4 h-full">
              <BedGrid 
                selectedUnit={selectedUnit} 
                onUnitChange={setSelectedUnit}
                units={units}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Manual Admission Form */}
        <ManualAdmissionForm 
          isOpen={isAdmissionFormOpen}
          onClose={() => setIsAdmissionFormOpen(false)}
        />
      </div>
    </div>
  );
};

export default BedBoard;
