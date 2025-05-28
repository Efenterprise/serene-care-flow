
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Stethoscope, ClipboardList } from "lucide-react";

interface QualityMetrics {
  fallRiskPatients: number;
  infectionControl: number;
  careplanCompliance: number;
}

interface QualityMetricsGridProps {
  metrics: QualityMetrics;
}

const QualityMetricsGrid = ({ metrics }: QualityMetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Fall Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>High Risk Patients</span>
              <span className="font-medium">{metrics.fallRiskPatients}</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-gray-600">85% compliance with fall prevention protocols</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-500" />
            Infection Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Compliance Rate</span>
              <span className="font-medium">{metrics.infectionControl}%</span>
            </div>
            <Progress value={metrics.infectionControl} className="h-2" />
            <p className="text-xs text-gray-600">Hand hygiene and isolation protocols</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-green-500" />
            Care Plan Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>On Track</span>
              <span className="font-medium">{metrics.careplanCompliance}%</span>
            </div>
            <Progress value={metrics.careplanCompliance} className="h-2" />
            <p className="text-xs text-gray-600">Care plans up to date and followed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityMetricsGrid;
