
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Home, 
  Bed,
  Calendar,
  Clock,
  Building
} from "lucide-react";
import CensusMetrics from "@/components/bedboard/CensusMetrics";
import PatientProfile from "@/components/patient/PatientProfile";

const CensusDashboard = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock census data
  const censusData = {
    totalBeds: 120,
    occupiedBeds: 98,
    availableBeds: 22,
    pendingAdmissions: 8,
    expectedDischarges: 5,
    averageLOS: 18.5,
    occupancyRate: 82,
    turnoverRate: 2.3
  };

  const unitData = [
    { id: "all", name: "All Units", beds: 120, occupied: 98 },
    { id: "icu", name: "ICU", beds: 20, occupied: 18 },
    { id: "med_surg", name: "Med/Surg", beds: 40, occupied: 35 },
    { id: "rehab", name: "Rehabilitation", beds: 30, occupied: 25 },
    { id: "ltc", name: "Long Term Care", beds: 30, occupied: 20 }
  ];

  const todayMovements = [
    {
      id: "1",
      type: "admission",
      patient: "John Smith",
      patientId: "pt-001",
      room: "101A",
      time: "08:30 AM",
      status: "completed"
    },
    {
      id: "2",
      type: "discharge",
      patient: "Mary Johnson",
      patientId: "pt-002", 
      room: "203B",
      time: "11:15 AM",
      status: "pending"
    },
    {
      id: "3",
      type: "transfer",
      patient: "Robert Davis",
      patientId: "pt-003",
      room: "ICU-5 → 105A",
      time: "02:45 PM",
      status: "in_progress"
    },
    {
      id: "4",
      type: "admission",
      patient: "Susan Brown",
      patientId: "pt-004",
      room: "207A",
      time: "04:20 PM",
      status: "scheduled"
    }
  ];

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'admission':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'discharge':
        return <TrendingDown className="w-4 h-4 text-orange-600" />;
      case 'transfer':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePatientNameClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedPatientId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Census Dashboard</h2>
          <p className="text-gray-600">Real-time bed management and patient flow monitoring</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Census Report
        </Button>
      </div>

      {/* Census Metrics Component */}
      <CensusMetrics units={unitData} />

      {/* Unit Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-500" />
            Unit Occupancy Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {unitData.slice(1).map((unit) => {
              const occupancyRate = Math.round((unit.occupied / unit.beds) * 100);
              return (
                <div key={unit.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{unit.name}</h3>
                    <Badge variant="outline">{occupancyRate}%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Occupied</span>
                      <span>{unit.occupied}/{unit.beds}</span>
                    </div>
                    <Progress value={occupancyRate} className="h-2" />
                    <p className="text-xs text-gray-600">
                      {unit.beds - unit.occupied} beds available
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Patient Movements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            Today's Patient Movements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayMovements.map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getMovementIcon(movement.type)}
                  <div>
                    <button 
                      onClick={() => handlePatientNameClick(movement.patientId)}
                      className="font-medium text-blue-600 hover:text-blue-800 underline text-left"
                    >
                      {movement.patient}
                    </button>
                    <p className="text-sm text-gray-600">
                      {movement.type === 'transfer' ? movement.room : `Room ${movement.room}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{movement.time}</span>
                  <Badge className={getStatusColor(movement.status)}>
                    {movement.status.replace('_', ' ')}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h3 className="font-medium text-gray-900">New Admission</h3>
          <p className="text-sm text-gray-600">Process incoming patient</p>
        </Card>

        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <TrendingDown className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <h3 className="font-medium text-gray-900">Discharge Planning</h3>
          <p className="text-sm text-gray-600">Manage patient discharges</p>
        </Card>

        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <Bed className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h3 className="font-medium text-gray-900">Bed Management</h3>
          <p className="text-sm text-gray-600">View and assign beds</p>
        </Card>
      </div>

      {/* Patient Profile Modal */}
      <PatientProfile 
        patientId={selectedPatientId || undefined}
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default CensusDashboard;
