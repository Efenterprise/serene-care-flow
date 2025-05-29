
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit,
  Trash2,
  User,
  Calendar,
  Flag
} from 'lucide-react';
import { CarePlan, useDeleteCarePlan } from '@/hooks/useCarePlans';
import { useResidents } from '@/hooks/useResidents';
import EditCarePlanDialog from './EditCarePlanDialog';
import { toast } from 'sonner';

interface CarePlanListProps {
  carePlans: CarePlan[];
  showResidentInfo?: boolean;
}

const CarePlanList = ({ carePlans, showResidentInfo = false }: CarePlanListProps) => {
  const [selectedCarePlan, setSelectedCarePlan] = useState<CarePlan | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { data: residents } = useResidents();
  const deleteCarePlan = useDeleteCarePlan();

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

  const getResidentName = (residentId: string) => {
    const resident = residents?.find(r => r.id === residentId);
    return resident ? `${resident.first_name} ${resident.last_name}` : 'Unknown Resident';
  };

  const getResidentRoom = (residentId: string) => {
    const resident = residents?.find(r => r.id === residentId);
    return resident?.room_number || 'N/A';
  };

  const handleEdit = (carePlan: CarePlan) => {
    setSelectedCarePlan(carePlan);
    setShowEditDialog(true);
  };

  const handleDelete = async (carePlanId: string) => {
    if (window.confirm('Are you sure you want to delete this care plan?')) {
      try {
        await deleteCarePlan.mutateAsync(carePlanId);
        toast.success('Care plan deleted successfully');
      } catch (error) {
        toast.error('Failed to delete care plan');
      }
    }
  };

  if (carePlans.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No care plans found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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
                    <Badge className={getPriorityColor(plan.priority)}>
                      <Flag className="w-3 h-3 mr-1" />
                      {plan.priority}
                    </Badge>
                  </div>
                  
                  {showResidentInfo && (
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{getResidentName(plan.resident_id)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Room {getResidentRoom(plan.resident_id)}</span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-600 font-medium">{plan.goal}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(plan)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(plan.id)}
                    disabled={deleteCarePlan.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2" />
                </div>

                {plan.interventions && plan.interventions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Interventions:</h4>
                    <ul className="space-y-1">
                      {plan.interventions.map((intervention, index) => (
                        <li key={intervention.id || index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{intervention.intervention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Start Date:</span>
                    <p className="font-medium">{new Date(plan.start_date).toLocaleDateString()}</p>
                  </div>
                  {plan.target_date && (
                    <div>
                      <span className="text-gray-600">Target Date:</span>
                      <p className="font-medium">{new Date(plan.target_date).toLocaleDateString()}</p>
                    </div>
                  )}
                  {plan.assigned_to && (
                    <div>
                      <span className="text-gray-600">Assigned To:</span>
                      <p className="font-medium">{plan.assigned_to}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <p className="font-medium">{new Date(plan.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {plan.notes && (
                  <div>
                    <span className="text-gray-600 text-sm">Notes:</span>
                    <p className="text-sm mt-1">{plan.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showEditDialog && selectedCarePlan && (
        <EditCarePlanDialog
          carePlan={selectedCarePlan}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedCarePlan(null);
          }}
        />
      )}
    </>
  );
};

export default CarePlanList;
