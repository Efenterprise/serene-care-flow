
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus, 
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentCarePlansTabProps {
  resident: Resident;
}

const ResidentCarePlansTab = ({ resident }: ResidentCarePlansTabProps) => {
  // Mock care plan data
  const carePlans = [
    {
      id: 1,
      problem: "Impaired Physical Mobility",
      goal: "Resident will ambulate 100 feet with minimal assistance within 30 days",
      interventions: [
        "Physical therapy 3x weekly",
        "Encourage ambulation with walker",
        "Strengthen lower extremities",
        "Monitor for fatigue and pain"
      ],
      status: "active",
      progress: 65,
      startDate: "2024-01-15",
      targetDate: "2024-02-15",
      assignedTo: "Lisa Chen, PT",
      lastUpdated: "2024-01-20"
    },
    {
      id: 2,
      problem: "Risk for Falls",
      goal: "Resident will remain fall-free during stay",
      interventions: [
        "Bed alarm activated",
        "Non-slip socks provided",
        "Call light within reach",
        "Frequent rounds every 2 hours",
        "Environmental hazard assessment"
      ],
      status: "active",
      progress: 90,
      startDate: "2024-01-10",
      targetDate: "Ongoing",
      assignedTo: "Nursing Staff",
      lastUpdated: "2024-01-21"
    },
    {
      id: 3,
      problem: "Altered Nutrition",
      goal: "Resident will maintain current weight +/- 5 lbs",
      interventions: [
        "Monitor daily food intake",
        "Offer preferred foods",
        "Nutritional supplements as ordered",
        "Weekly weight monitoring",
        "Consult dietitian as needed"
      ],
      status: "active",
      progress: 80,
      startDate: "2024-01-12",
      targetDate: "2024-02-12",
      assignedTo: "Jennifer Adams, RN",
      lastUpdated: "2024-01-19"
    },
    {
      id: 4,
      problem: "Social Isolation",
      goal: "Resident will participate in 3 social activities per week",
      interventions: [
        "Encourage participation in group activities",
        "Facilitate family visits",
        "Provide recreational activities",
        "Assess mood and social interaction"
      ],
      status: "met",
      progress: 100,
      startDate: "2024-01-08",
      targetDate: "2024-01-22",
      assignedTo: "Activity Director",
      lastUpdated: "2024-01-21"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'met':
        return 'bg-green-100 text-green-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'met':
        return <CheckCircle className="w-4 h-4" />;
      case 'discontinued':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with New Care Plan Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Care Plans</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Care Plan
        </Button>
      </div>

      {/* Care Plan Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-blue-600">
                  {carePlans.filter(cp => cp.status === 'active').length}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goals Met</p>
                <p className="text-2xl font-bold text-green-600">
                  {carePlans.filter(cp => cp.status === 'met').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(carePlans.reduce((acc, cp) => acc + cp.progress, 0) / carePlans.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due for Review</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Care Plans List */}
      <div className="space-y-4">
        {carePlans.map((plan) => (
          <Card key={plan.id} className="hover:bg-gray-50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(plan.status)}
                    <CardTitle className="text-lg">{plan.problem}</CardTitle>
                    <Badge className={getStatusColor(plan.status)}>
                      {plan.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-medium">{plan.goal}</p>
                </div>
                <Button size="sm" variant="outline">
                  Edit Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2" />
                </div>

                {/* Interventions */}
                <div>
                  <h4 className="font-medium mb-2">Interventions:</h4>
                  <ul className="space-y-1">
                    {plan.interventions.map((intervention, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{intervention}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Details */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Start Date:</span>
                    <p className="font-medium">{plan.startDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Target Date:</span>
                    <p className="font-medium">{plan.targetDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Assigned To:</span>
                    <p className="font-medium">{plan.assignedTo}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <p className="font-medium">{plan.lastUpdated}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    Update Progress
                  </Button>
                  <Button size="sm" variant="outline">
                    Add Note
                  </Button>
                  {plan.status === 'active' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Mark as Met
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Care Plan Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Common Care Plan Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Fall Prevention</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Mobility Improvement</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Nutrition Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Pain Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Cognitive Support</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Social Engagement</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentCarePlansTab;
