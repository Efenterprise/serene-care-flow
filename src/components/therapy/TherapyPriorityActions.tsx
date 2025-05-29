
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileCheck,
  Users,
  AlertTriangle,
  Video
} from "lucide-react";

const TherapyPriorityActions = () => {
  const priorityActions = [
    { 
      patient: "Mary Johnson", 
      action: "Initial PT Evaluation", 
      time: "9:00 AM",
      therapist: "Dr. Sarah Wilson",
      priority: "high",
      type: "evaluation"
    },
    { 
      patient: "Robert Chen", 
      action: "Discharge Planning Meeting", 
      time: "10:30 AM",
      therapist: "Team Meeting",
      priority: "medium",
      type: "planning"
    },
    { 
      patient: "Linda Davis", 
      action: "Insurance Auth Expiring", 
      time: "Today",
      therapist: "Admin Required",
      priority: "high",
      type: "admin"
    },
    { 
      patient: "James Miller", 
      action: "Telehealth Follow-up", 
      time: "2:00 PM",
      therapist: "Dr. Mike Rodriguez",
      priority: "low",
      type: "telehealth"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'evaluation': return <FileCheck className="w-5 h-5 text-blue-600" />;
      case 'planning': return <Users className="w-5 h-5 text-green-600" />;
      case 'admin': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'telehealth': return <Video className="w-5 h-5 text-purple-600" />;
      default: return <FileCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Today's Priority Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priorityActions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getIcon(item.type)}
                <div>
                  <h3 className="font-medium">{item.patient}</h3>
                  <p className="text-sm text-gray-600">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.therapist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium">{item.time}</p>
                  <Badge className={getBadgeClass(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">Action</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyPriorityActions;
