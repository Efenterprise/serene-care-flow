
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Plus, 
  Clock,
  User,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentTasksTabProps {
  resident: Resident;
}

const ResidentTasksTab = ({ resident }: ResidentTasksTabProps) => {
  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: "Administer 08:00 medications",
      description: "Metformin 500mg, Lisinopril 10mg",
      assignedTo: "Sarah Johnson, RN",
      dueDate: "2024-01-22",
      dueTime: "08:00",
      priority: "high",
      status: "pending",
      category: "Medication",
      recurring: true
    },
    {
      id: 2,
      title: "Weekly weight measurement",
      description: "Record weight and compare to previous week",
      assignedTo: "Jennifer Adams, RN",
      dueDate: "2024-01-22",
      dueTime: "10:00",
      priority: "medium",
      status: "pending",
      category: "Assessment",
      recurring: true
    },
    {
      id: 3,
      title: "Physical therapy session",
      description: "Gait training and strengthening exercises",
      assignedTo: "Lisa Chen, PT",
      dueDate: "2024-01-22",
      dueTime: "14:00",
      priority: "medium",
      status: "scheduled",
      category: "Therapy",
      recurring: false
    },
    {
      id: 4,
      title: "Skin assessment",
      description: "Check pressure points and document findings",
      assignedTo: "Mark Wilson, CNA",
      dueDate: "2024-01-22",
      dueTime: "16:00",
      priority: "medium",
      status: "pending",
      category: "Assessment",
      recurring: true
    },
    {
      id: 5,
      title: "Family conference call",
      description: "Update family on progress and care plan",
      assignedTo: "Dr. Smith",
      dueDate: "2024-01-23",
      dueTime: "15:00",
      priority: "low",
      status: "scheduled",
      category: "Communication",
      recurring: false
    },
    {
      id: 6,
      title: "Blood pressure check",
      description: "Monitor BP due to recent medication change",
      assignedTo: "Sarah Johnson, RN",
      dueDate: "2024-01-21",
      dueTime: "20:00",
      priority: "high",
      status: "completed",
      category: "Monitoring",
      recurring: false,
      completedBy: "Sarah Johnson, RN",
      completedAt: "2024-01-21 19:45"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medication':
        return 'bg-blue-100 text-blue-800';
      case 'Assessment':
        return 'bg-purple-100 text-purple-800';
      case 'Therapy':
        return 'bg-green-100 text-green-800';
      case 'Monitoring':
        return 'bg-orange-100 text-orange-800';
      case 'Communication':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Medication':
        return '💊';
      case 'Assessment':
        return '📊';
      case 'Therapy':
        return '🏃';
      case 'Monitoring':
        return '📈';
      case 'Communication':
        return '📞';
      default:
        return '📋';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'scheduled');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header with New Task Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Tasks & Assignments</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Task Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">
                  {tasks.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">
                  {tasks.filter(t => t.status === 'scheduled').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => t.status === 'completed' && t.dueDate === '2024-01-21').length}
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
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Pending & Scheduled Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <Checkbox className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl">{getCategoryIcon(task.category)}</span>
                      <h4 className="font-semibold">{task.title}</h4>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getCategoryColor(task.category)}>
                        {task.category}
                      </Badge>
                      {task.recurring && (
                        <Badge variant="outline">
                          Recurring
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Assigned to:</span>
                          <p className="font-medium">{task.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Due:</span>
                          <p className="font-medium">{task.dueDate} at {task.dueTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Complete
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Recently Completed Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-3 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium text-green-600">Completed</p>
                    <p className="text-gray-600">{task.completedAt}</p>
                    <p className="text-gray-600">by {task.completedBy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Categories Quick Add */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add Task by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">💊</span>
              <span>Medication Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">📊</span>
              <span>Assessment Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">🏃</span>
              <span>Therapy Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">📈</span>
              <span>Monitoring Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">📞</span>
              <span>Communication Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-2xl mb-2">📋</span>
              <span>General Task</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentTasksTab;
