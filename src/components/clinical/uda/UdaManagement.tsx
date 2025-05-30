
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Plus,
  Printer,
  Search,
  Filter
} from "lucide-react";
import UdaScheduledList from './UdaScheduledList';
import UdaInProgressList from './UdaInProgressList';
import UdaCompletedList from './UdaCompletedList';
import CreateUdaDialog from './CreateUdaDialog';
import FacilitySelector from './FacilitySelector';

const UdaManagement = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('scheduled');
  const [selectedFacility, setSelectedFacility] = useState('facility-1'); // Default to first facility

  // Mock summary data - would come from API based on selected facility
  const getSummaryStats = (facilityId: string) => {
    if (facilityId === 'all') {
      // Corporate view - aggregated data
      return {
        scheduled: 45,
        inProgress: 28,
        completed: 687,
        overdue: 12,
        dueSoon: 23
      };
    } else {
      // Individual facility data
      return {
        scheduled: 15,
        inProgress: 8,
        completed: 142,
        overdue: 5,
        dueSoon: 7
      };
    }
  };

  const summaryStats = getSummaryStats(selectedFacility);

  const handleFacilityChange = (facilityId: string) => {
    console.log('Facility changed to:', facilityId);
    setSelectedFacility(facilityId);
    // Here you would typically refresh data for the selected facility
  };

  return (
    <div className="space-y-6">
      {/* Facility Selector */}
      <FacilitySelector 
        selectedFacility={selectedFacility}
        onFacilityChange={handleFacilityChange}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">UDA Schedules</h2>
          <p className="text-gray-600">
            Uniform Data Assessment scheduling and management
            {selectedFacility === 'all' ? ' - Corporate View' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print Schedule
          </Button>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Assessment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{summaryStats.scheduled}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">{summaryStats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{summaryStats.completed}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <div className="w-4 h-4 bg-green-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{summaryStats.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{summaryStats.dueSoon}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          <UdaScheduledList selectedFacility={selectedFacility} />
        </TabsContent>

        <TabsContent value="inProgress">
          <UdaInProgressList selectedFacility={selectedFacility} />
        </TabsContent>

        <TabsContent value="completed">
          <UdaCompletedList selectedFacility={selectedFacility} />
        </TabsContent>
      </Tabs>

      {/* Create UDA Dialog */}
      {showCreateDialog && (
        <CreateUdaDialog 
          onClose={() => setShowCreateDialog(false)}
          selectedFacility={selectedFacility}
        />
      )}
    </div>
  );
};

export default UdaManagement;
