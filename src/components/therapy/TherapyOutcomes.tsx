
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const TherapyOutcomes = () => {
  const outcomes = [
    { 
      patient: "Dorothy Williams", 
      outcome: "Mobility Goal Achieved", 
      improvement: "+15 points on Berg Balance", 
      date: "Today" 
    },
    { 
      patient: "Frank Thompson", 
      outcome: "Discharged Home", 
      improvement: "Independent transfers", 
      date: "Yesterday" 
    },
    { 
      patient: "Grace Martinez", 
      outcome: "Speech Clarity Improved", 
      improvement: "80% intelligibility", 
      date: "2 days ago" 
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Outcomes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium">{outcome.patient}</h4>
                <p className="text-sm text-gray-600">{outcome.outcome}</p>
                <p className="text-xs text-green-600">{outcome.improvement}</p>
              </div>
              <span className="text-xs text-gray-500">{outcome.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyOutcomes;
