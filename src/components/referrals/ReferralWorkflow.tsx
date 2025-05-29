
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Settings, 
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

const ReferralWorkflow = () => {
  const [activeWorkflow, setActiveWorkflow] = useState("standard");

  const workflows = [
    {
      id: "standard",
      name: "Standard Review",
      description: "Standard 3-step approval process for routine referrals",
      steps: [
        { id: 1, name: "Initial Review", role: "Admissions Coordinator", avgTime: "15 min", status: "active" },
        { id: 2, name: "Clinical Assessment", role: "RN/MDS Coordinator", avgTime: "30 min", status: "pending" },
        { id: 3, name: "Final Approval", role: "Administrator", avgTime: "10 min", status: "pending" }
      ],
      priority: "medium",
      isActive: true
    },
    {
      id: "urgent",
      name: "Urgent/High Acuity",
      description: "Expedited 2-step process for urgent and high-acuity referrals",
      steps: [
        { id: 1, name: "Rapid Clinical Review", role: "DON/MDS Coordinator", avgTime: "10 min", status: "active" },
        { id: 2, name: "Immediate Approval", role: "Administrator/DON", avgTime: "5 min", status: "pending" }
      ],
      priority: "urgent",
      isActive: true
    },
    {
      id: "medicare",
      name: "Medicare Advantage",
      description: "Specialized workflow with insurance pre-verification",
      steps: [
        { id: 1, name: "Insurance Verification", role: "Business Office", avgTime: "20 min", status: "active" },
        { id: 2, name: "Prior Auth Check", role: "UM Coordinator", avgTime: "25 min", status: "pending" },
        { id: 3, name: "Clinical Review", role: "MDS Coordinator", avgTime: "30 min", status: "pending" },
        { id: 4, name: "Final Approval", role: "Administrator", avgTime: "10 min", status: "pending" }
      ],
      priority: "high",
      isActive: true
    }
  ];

  const workflowStats = [
    { metric: "Active Workflows", value: "3", change: "+1" },
    { metric: "Avg Completion Time", value: "2.3h", change: "-0.5h" },
    { metric: "Success Rate", value: "94%", change: "+2%" },
    { metric: "Bottlenecks", value: "1", change: "0" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-gray-400" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "blocked":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {workflowStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/70">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.metric}</div>
                <div className="text-xs text-green-600 mt-1">{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Management */}
      <div className="grid lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className={`border-0 shadow-sm bg-white/70 cursor-pointer transition-all ${
              activeWorkflow === workflow.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setActiveWorkflow(workflow.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{workflow.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(workflow.priority)}>
                    {workflow.priority}
                  </Badge>
                  {workflow.isActive ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Paused</Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">{workflow.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflow.steps.map((step, stepIndex) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{step.name}</p>
                        <span className="text-xs text-gray-500">{step.avgTime}</span>
                      </div>
                      <p className="text-xs text-gray-600">{step.role}</p>
                    </div>
                    {stepIndex < workflow.steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button size="sm" variant="outline">
                  <Settings className="w-3 h-3 mr-1" />
                  Configure
                </Button>
                {workflow.isActive ? (
                  <Button size="sm" variant="outline">
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </Button>
                ) : (
                  <Button size="sm" variant="outline">
                    <Play className="w-3 h-3 mr-1" />
                    Resume
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Performance Details */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Workflow Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Current Bottlenecks</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Clinical Assessment Queue</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">8 pending</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Optimization Opportunities</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900">Parallel Processing</div>
                  <div className="text-xs text-blue-700">Run insurance verification alongside clinical review</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-900">Auto-Approval</div>
                  <div className="text-xs text-green-700">Enable for AI scores &gt; 90 with verified insurance</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralWorkflow;
