
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit
} from "lucide-react";

interface PatientCarePlansProps {
  patientId: string;
}

const PatientCarePlans = ({ patientId }: PatientCarePlansProps) => {
  const carePlans = [
    {
      id: "1",
      problem: "Impaired Physical Mobility",
      goal: "Patient will ambulate 100 feet with walker independently by discharge",
      targetDate: "2024-01-25",
      priority: "high",
      status: "active",
      progress: 75,
      interventions: [
        {
          id: "1a",
          intervention: "Physical therapy BID for gait training",
          frequency: "Twice daily",
          status: "active",
          lastCompleted: "2024-01-20 14:00"
        },
        {
          id: "1b",
          intervention: "Encourage progressive weight bearing as tolerated",
          frequency: "Ongoing",
          status: "active",
          lastCompleted: "2024-01-20 08:30"
        },
        {
          id: "1c",
          intervention: "Hip precautions education and reinforcement",
          frequency: "Daily",
          status: "active",
          lastCompleted: "2024-01-19 16:00"
        }
      ],
      outcomes: [
        {
          date: "2024-01-20",
          outcome: "Patient ambulated 50 feet with walker, minimal assistance"
        },
        {
          date: "2024-01-18",
          outcome: "Patient ambulated 25 feet with walker, moderate assistance"
        }
      ]
    },
    {
      id: "2",
      problem: "Acute Pain",
      goal: "Patient will report pain level ≤ 3/10 consistently",
      targetDate: "2024-01-22",
      priority: "high",
      status: "active",
      progress: 85,
      interventions: [
        {
          id: "2a",
          intervention: "Administer prescribed pain medication as needed",
          frequency: "Q6H PRN",
          status: "active",
          lastCompleted: "2024-01-20 06:00"
        },
        {
          id: "2b",
          intervention: "Position for comfort and proper hip alignment",
          frequency: "Q2H",
          status: "active",
          lastCompleted: "2024-01-20 08:00"
        },
        {
          id: "2c",
          intervention: "Apply ice to surgical site as ordered",
          frequency: "Q4H x 15 minutes",
          status: "active",
          lastCompleted: "2024-01-20 04:00"
        }
      ],
      outcomes: [
        {
          date: "2024-01-20",
          outcome: "Patient reports pain 3/10, well controlled with medication"
        },
        {
          date: "2024-01-18",
          outcome: "Patient reports pain 5/10, medication adjusted"
        }
      ]
    },
    {
      id: "3",
      problem: "Risk for Falls",
      goal: "Patient will remain free from falls during admission",
      targetDate: "2024-01-25",
      priority: "medium",
      status: "active",
      progress: 90,
      interventions: [
        {
          id: "3a",
          intervention: "Maintain bed in low position with side rails up",
          frequency: "Continuous",
          status: "active",
          lastCompleted: "2024-01-20 08:00"
        },
        {
          id: "3b",
          intervention: "Ensure call light within reach at all times",
          frequency: "Continuous",
          status: "active",
          lastCompleted: "2024-01-20 08:00"
        },
        {
          id: "3c",
          intervention: "Fall risk assessment and education",
          frequency: "Daily",
          status: "active",
          lastCompleted: "2024-01-20 08:30"
        }
      ],
      outcomes: [
        {
          date: "2024-01-20",
          outcome: "No falls reported, patient demonstrates safety awareness"
        }
      ]
    },
    {
      id: "4",
      problem: "Knowledge Deficit: Post-operative Care",
      goal: "Patient will verbalize understanding of discharge instructions",
      targetDate: "2024-01-24",
      priority: "medium",
      status: "active",
      progress: 60,
      interventions: [
        {
          id: "4a",
          intervention: "Provide written discharge instructions",
          frequency: "Once",
          status: "completed",
          lastCompleted: "2024-01-19 10:00"
        },
        {
          id: "4b",
          intervention: "Teach hip precautions and demonstrate",
          frequency: "Daily",
          status: "active",
          lastCompleted: "2024-01-19 16:00"
        },
        {
          id: "4c",
          intervention: "Review medication schedule and side effects",
          frequency: "Daily",
          status: "active",
          lastCompleted: "2024-01-20 09:00"
        }
      ],
      outcomes: [
        {
          date: "2024-01-19",
          outcome: "Patient demonstrates correct use of walker and hip precautions"
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'discontinued':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Care Plans</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Care Plan
        </Button>
      </div>

      <div className="space-y-6">
        {carePlans.map((plan) => (
          <Card key={plan.id} className="border-l-4 border-l-blue-400">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    {plan.problem}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{plan.goal}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(plan.priority)}>
                    {plan.priority} priority
                  </Badge>
                  <Badge className={getStatusColor(plan.status)}>
                    {plan.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress to Goal</span>
                  <span className="text-sm text-gray-600">{plan.progress}%</span>
                </div>
                <Progress value={plan.progress} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Target Date: {plan.targetDate}</p>
              </div>

              {/* Interventions */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Interventions</h4>
                <div className="space-y-2">
                  {plan.interventions.map((intervention) => (
                    <div key={intervention.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{intervention.intervention}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                          <span>Frequency: {intervention.frequency}</span>
                          <span>Last: {intervention.lastCompleted}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(intervention.status)}>
                          {intervention.status}
                        </Badge>
                        {intervention.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        {intervention.status === 'active' && (
                          <Clock className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Outcomes */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Outcomes</h4>
                <div className="space-y-2">
                  {plan.outcomes.map((outcome, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-400">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">{outcome.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{outcome.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-1" />
                  Update Plan
                </Button>
                <Button size="sm" variant="outline">
                  Add Outcome
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientCarePlans;
