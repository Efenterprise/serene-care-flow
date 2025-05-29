
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TherapistProductivity = () => {
  const therapists = [
    { name: "Dr. Sarah Wilson", discipline: "PT", utilization: 94, sessions: 8 },
    { name: "Mike Rodriguez", discipline: "OT", utilization: 89, sessions: 7 },
    { name: "Lisa Chen", discipline: "ST", utilization: 92, sessions: 6 },
    { name: "David Kim", discipline: "PT", utilization: 87, sessions: 9 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Therapist Productivity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {therapists.map((therapist, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{therapist.name}</p>
                  <p className="text-sm text-gray-600">{therapist.discipline} • {therapist.sessions} sessions</p>
                </div>
                <span className="text-sm font-medium">{therapist.utilization}%</span>
              </div>
              <Progress value={therapist.utilization} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapistProductivity;
