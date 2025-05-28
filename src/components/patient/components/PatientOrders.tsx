
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardList, 
  Plus, 
  Clock,
  CheckCircle,
  AlertCircle,
  Pill,
  Stethoscope,
  FlaskConical,
  Activity
} from "lucide-react";

interface PatientOrdersProps {
  patientId: string;
}

const PatientOrders = ({ patientId }: PatientOrdersProps) => {
  const orders = {
    active: [
      {
        id: "1",
        type: "medication",
        order: "Acetaminophen 650mg PO Q6H PRN pain",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-19",
        status: "active",
        priority: "routine",
        instructions: "Give for pain rating >4/10. Do not exceed 3000mg in 24 hours."
      },
      {
        id: "2",
        type: "therapy",
        order: "Physical Therapy BID - gait training and strengthening",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-18",
        status: "active",
        priority: "routine",
        instructions: "Progressive weight bearing as tolerated. Focus on hip precautions."
      },
      {
        id: "3",
        type: "lab",
        order: "CBC with differential - weekly",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-15",
        status: "pending",
        priority: "routine",
        instructions: "Draw every Monday morning. Monitor for post-surgical changes."
      },
      {
        id: "4",
        type: "nursing",
        order: "Vital signs Q4H while awake",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-15",
        status: "active",
        priority: "routine",
        instructions: "Monitor BP, HR, RR, Temp, O2 sat. Notify MD if outside parameters."
      }
    ],
    completed: [
      {
        id: "5",
        type: "medication",
        order: "Morphine 2mg IV Q4H PRN severe pain",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-15",
        completedDate: "2024-01-18",
        status: "completed",
        priority: "stat",
        instructions: "Discontinued - transitioned to oral pain management."
      },
      {
        id: "6",
        type: "lab",
        order: "Pre-operative labs - CBC, CMP, PT/INR",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-14",
        completedDate: "2024-01-15",
        status: "completed",
        priority: "stat",
        instructions: "All results within normal limits."
      }
    ],
    pending: [
      {
        id: "7",
        type: "imaging",
        order: "Hip X-ray AP and lateral",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-20",
        status: "pending",
        priority: "routine",
        instructions: "Follow-up imaging to assess implant positioning."
      },
      {
        id: "8",
        type: "consultation",
        order: "Cardiology consultation",
        orderedBy: "Dr. Sarah Wilson",
        orderedDate: "2024-01-20",
        status: "pending",
        priority: "urgent",
        instructions: "Evaluate for pre-discharge cardiac clearance."
      }
    ]
  };

  const getOrderIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="w-4 h-4" />;
      case 'therapy':
        return <Activity className="w-4 h-4" />;
      case 'lab':
        return <FlaskConical className="w-4 h-4" />;
      case 'imaging':
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <ClipboardList className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'stat':
        return 'border-l-red-600';
      case 'urgent':
        return 'border-l-orange-400';
      default:
        return 'border-l-blue-400';
    }
  };

  const OrderCard = ({ order, showCompletedDate = false }: { order: any, showCompletedDate?: boolean }) => (
    <Card className={`border-l-4 ${getPriorityColor(order.priority)} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-full">
              {getOrderIcon(order.type)}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{order.order}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Ordered by: {order.orderedBy}</span>
                <span>•</span>
                <span>{order.orderedDate}</span>
                {showCompletedDate && order.completedDate && (
                  <>
                    <span>•</span>
                    <span>Completed: {order.completedDate}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
            {order.priority === 'stat' && (
              <Badge className="bg-red-100 text-red-800">
                STAT
              </Badge>
            )}
            {order.priority === 'urgent' && (
              <Badge className="bg-orange-100 text-orange-800">
                URGENT
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{order.instructions}</p>
        <div className="flex justify-end mt-3 space-x-2">
          <Button size="sm" variant="outline">
            View Details
          </Button>
          {order.status === 'pending' && (
            <Button size="sm" variant="outline">
              Mark Complete
            </Button>
          )}
          {order.status === 'active' && (
            <Button size="sm" variant="outline">
              Discontinue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Patient Orders</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Active ({orders.active.length})</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Pending ({orders.pending.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>Completed ({orders.completed.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {orders.active.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {orders.pending.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {orders.completed.map((order) => (
            <OrderCard key={order.id} order={order} showCompletedDate />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientOrders;
