
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle, Pill, TrendingUp } from "lucide-react";

interface ClinicalMetrics {
  totalPatients: number;
  criticalPatients: number;
  medicationAlerts: number;
  qualityScore: number;
}

interface ClinicalMetricsCardsProps {
  metrics: ClinicalMetrics;
}

const ClinicalMetricsCards = ({ metrics }: ClinicalMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-blue-600">{metrics.totalPatients}</p>
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
              <p className="text-sm font-medium text-gray-600">Critical Patients</p>
              <p className="text-2xl font-bold text-red-600">{metrics.criticalPatients}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Med Alerts</p>
              <p className="text-2xl font-bold text-orange-600">{metrics.medicationAlerts}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Pill className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quality Score</p>
              <p className="text-2xl font-bold text-green-600">{metrics.qualityScore}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalMetricsCards;
