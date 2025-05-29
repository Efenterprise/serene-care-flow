
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFacilityStore } from "@/stores/facilityStore";

const TherapyQualityMetrics = () => {
  const { therapyStats } = useFacilityStore();

  const qualityMetrics = [
    { label: "Patient Satisfaction", value: 95 },
    { label: "Goal Achievement Rate", value: therapyStats.goalAchievementRate },
    { label: "Documentation Compliance", value: 98 },
    { label: "Insurance Approval Rate", value: 92 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {qualityMetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{metric.label}</span>
              <div className="flex items-center space-x-2">
                <Progress value={metric.value} className="w-20" />
                <span className="text-sm font-medium">{metric.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyQualityMetrics;
