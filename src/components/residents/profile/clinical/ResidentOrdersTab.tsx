
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Plus, 
  Calendar,
  User,
  Clock
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentOrdersTabProps {
  resident: Resident;
}

const ResidentOrdersTab = ({ resident }: ResidentOrdersTabProps) => {
  // Mock orders data
  const activeOrders = [
    {
      id: 1,
      orderType: "Laboratory",
      description: "Complete Blood Count (CBC)",
      orderedBy: "Dr. Smith",
      orderDate: "2024-01-20",
      priority: "routine",
      status: "pending",
      scheduledDate: "2024-01-22",
      instructions: "Fasting required"
    },
    {
      id: 2,
      orderType: "Medication",
      description: "Start Metformin 500mg BID",
      orderedBy: "Dr. Johnson",
      orderDate: "2024-01-19",
      priority: "routine",
      status: "active",
      instructions: "Take with meals"
    },
    {
      id: 3,
      orderType: "Therapy",
      description: "Physical Therapy - 3x weekly",
      orderedBy: "Dr. Wilson",
      orderDate: "2024-01-18",
      priority: "routine",
      status: "active",
      instructions: "Focus on mobility and strength"
    },
    {
      id: 4,
      orderType: "Imaging",
      description: "Chest X-Ray",
      orderedBy: "Dr. Smith",
      orderDate: "2024-01-21",
      priority: "urgent",
      status: "scheduled",
      scheduledDate: "2024-01-23",
      instructions: "Portable if patient unable to travel"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'routine':
        return 'bg-green-100 text-green-800';
      case 'stat':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'laboratory':
        return '🧪';
      case 'medication':
        return '💊';
      case 'therapy':
        return '🏃';
      case 'imaging':
        return '📱';
      default:
        return '📋';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Order Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Orders</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Active Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="w-5 h-5 mr-2" />
            Active Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getOrderTypeIcon(order.orderType)}</span>
                      <div>
                        <h4 className="font-semibold text-lg">{order.description}</h4>
                        <p className="text-sm text-gray-600">{order.orderType}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Ordered by:</span>
                          <p className="font-medium">{order.orderedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Order Date:</span>
                          <p className="font-medium">{order.orderDate}</p>
                        </div>
                      </div>
                      {order.scheduledDate && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-gray-600">Scheduled:</span>
                            <p className="font-medium">{order.scheduledDate}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {order.instructions && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                        <span className="font-medium">Instructions:</span> {order.instructions}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Complete
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Categories Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:bg-blue-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold">Laboratory</h3>
            <p className="text-sm text-gray-600">Order lab tests</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-green-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">💊</div>
            <h3 className="font-semibold">Medications</h3>
            <p className="text-sm text-gray-600">Prescribe medications</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-purple-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold">Imaging</h3>
            <p className="text-sm text-gray-600">X-rays, CT, MRI</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-orange-50 cursor-pointer transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🏃</div>
            <h3 className="font-semibold">Therapy</h3>
            <p className="text-sm text-gray-600">PT, OT, Speech</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Completed Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Completed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-left p-2">Ordered By</th>
                  <th className="text-left p-2">Completed By</th>
                  <th className="text-left p-2">Results</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2">2024-01-19</td>
                  <td className="p-2">Laboratory</td>
                  <td className="p-2">Basic Metabolic Panel</td>
                  <td className="p-2">Dr. Smith</td>
                  <td className="p-2">Lab Tech</td>
                  <td className="p-2">
                    <Button size="sm" variant="outline">View Results</Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2">2024-01-18</td>
                  <td className="p-2">Imaging</td>
                  <td className="p-2">Chest X-Ray</td>
                  <td className="p-2">Dr. Johnson</td>
                  <td className="p-2">Radiology</td>
                  <td className="p-2">
                    <Button size="sm" variant="outline">View Images</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentOrdersTab;
