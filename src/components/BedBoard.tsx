
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
  Zap
} from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import AdmissionsQueue from "./admissions/AdmissionsQueue";
import BedGrid from "./bedboard/BedGrid";
import CensusMetrics from "./bedboard/CensusMetrics";

const BedBoard = () => {
  const [selectedUnit, setSelectedUnit] = useState("all");
  
  const units = [
    { id: "all", name: "All Units", beds: 120, occupied: 95 },
    { id: "unit-a", name: "Unit A", beds: 30, occupied: 24 },
    { id: "unit-b", name: "Unit B", beds: 30, occupied: 28 },
    { id: "unit-c", name: "Unit C", beds: 30, occupied: 22 },
    { id: "unit-d", name: "Unit D", beds: 30, occupied: 21 }
  ];

  const pendingAdmissions = [
    {
      id: 1,
      name: "Margaret Johnson",
      hospital: "St. Mary's Hospital",
      diagnosis: "Hip Fracture",
      insurance: "Medicare A",
      estimatedLOS: "14 days",
      priority: "high",
      readyDate: "Today",
      aiScore: 92
    },
    {
      id: 2,
      name: "Robert Chen", 
      hospital: "General Hospital",
      diagnosis: "Stroke Recovery",
      insurance: "Medicare A + Humana",
      estimatedLOS: "21 days", 
      priority: "medium",
      readyDate: "Tomorrow",
      aiScore: 87
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bed Management & Census</h1>
            <p className="text-gray-600">Real-time bed board with AI-powered admissions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Quick Admit
            </Button>
            <Button variant="outline">
              <Hospital className="w-4 h-4 mr-2" />
              Hospital Referrals
            </Button>
          </div>
        </div>

        {/* Census Overview */}
        <CensusMetrics units={units} />

        {/* Main Content - Resizable Panels */}
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border bg-white/70 backdrop-blur-sm">
          {/* Admissions Queue */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="p-4 h-full">
              <AdmissionsQueue pendingAdmissions={pendingAdmissions} />
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
      </div>
    </div>
  );
};

export default BedBoard;
