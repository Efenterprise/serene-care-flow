
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
import { useBeds } from "@/hooks/useBeds";
import { useReferrals } from "@/hooks/useReferrals";

const BedBoard = () => {
  const [selectedUnit, setSelectedUnit] = useState("all");
  const { data: beds } = useBeds();
  const { data: referrals } = useReferrals();
  
  // Calculate real metrics from Supabase data
  const totalBeds = beds?.length || 0;
  const occupiedBeds = beds?.filter(bed => !bed.is_available).length || 0;
  const availableBeds = totalBeds - occupiedBeds;
  
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
      </div>
    </div>
  );
};

export default BedBoard;
