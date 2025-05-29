
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Plus, 
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import { useCarePlans, useCarePlanStats } from '@/hooks/useCarePlans';
import CarePlanList from '@/components/clinical/care-plans/CarePlanList';
import CreateCarePlanDialog from '@/components/clinical/care-plans/CreateCarePlanDialog';

interface ResidentCarePlansTabProps {
  resident: Resident;
}

const ResidentCarePlansTab = ({ resident }: ResidentCarePlansTabProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { data: carePlans = [], isLoading } = useCarePlans(resident.id);
  const { data: stats } = useCarePlanStats();

  // Calculate resident-specific stats
  const residentStats = {
    active: carePlans.filter(cp => cp.status === 'active').length,
    met: carePlans.filter(cp => cp.status === 'met').length,
    total: carePlans.length,
    averageProgress: carePlans.length > 0 
      ? Math.round(carePlans.reduce((acc, cp) => acc + cp.progress, 0) / carePlans.length)
      : 0,
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Care Plans</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading care plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with New Care Plan Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Care Plans</h3>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateDialog(true)}
        >
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
                <p className="text-2xl font-bold text-blue-600">{residentStats.active}</p>
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
                <p className="text-2xl font-bold text-green-600">{residentStats.met}</p>
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
                <p className="text-2xl font-bold text-purple-600">{residentStats.averageProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-orange-600">{residentStats.total}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Care Plans List */}
      <CarePlanList carePlans={carePlans} showResidentInfo={false} />

      {/* Care Plan Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Common Care Plan Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => setShowCreateDialog(true)}
            >
              <Target className="w-6 h-6 mb-2" />
              <span>Fall Prevention</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => setShowCreateDialog(true)}
            >
              <Target className="w-6 h-6 mb-2" />
              <span>Mobility Improvement</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => setShowCreateDialog(true)}
            >
              <Target className="w-6 h-6 mb-2" />
              <span>Nutrition Management</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => setShowCreateDialog(true)}
            >
              <Target className="w-6 h-6 mb-2" />
              <span>Pain Management</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => setShowCreateDialog(true)}
            >
              <Target className="w-6 h-6 mb-2" />
              <span>Cognitive Support</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => setShowCreateDialog(true)}
            >
              <Target className="w-6 h-6 mb-2" />
              <span>Social Engagement</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Care Plan Dialog */}
      {showCreateDialog && (
        <CreateCarePlanDialog
          residentId={resident.id}
          onClose={() => setShowCreateDialog(false)}
        />
      )}
    </div>
  );
};

export default ResidentCarePlansTab;
