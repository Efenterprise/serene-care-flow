
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pill, 
  Plus, 
  Clock,
  AlertTriangle,
  Calendar,
  Stethoscope
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentMedicationsTabProps {
  resident: Resident;
}

const ResidentMedicationsTab = ({ resident }: ResidentMedicationsTabProps) => {
  // Mock medication data - in real system this would come from API
  const currentMedications = [
    {
      id: 1,
      name: "Metformin",
      dosage: "500mg",
      frequency: "BID",
      route: "PO",
      indication: "Diabetes Type 2",
      prescriber: "Dr. Smith",
      startDate: "2024-01-15",
      nextDue: "08:00 AM",
      status: "active",
      instructions: "Take with food"
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Daily",
      route: "PO",
      indication: "Hypertension",
      prescriber: "Dr. Johnson",
      startDate: "2024-01-10",
      nextDue: "08:00 AM",
      status: "active",
      instructions: "Take in morning"
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "HS",
      route: "PO",
      indication: "Hyperlipidemia",
      prescriber: "Dr. Smith",
      startDate: "2024-01-20",
      nextDue: "10:00 PM",
      status: "active",
      instructions: "Take at bedtime"
    },
    {
      id: 4,
      name: "Warfarin",
      dosage: "5mg",
      frequency: "Daily",
      route: "PO",
      indication: "Anticoagulation",
      prescriber: "Dr. Wilson",
      startDate: "2024-02-01",
      nextDue: "06:00 PM",
      status: "requires_monitoring",
      instructions: "INR monitoring required"
    }
  ];

  const prnMedications = [
    {
      id: 5,
      name: "Acetaminophen",
      dosage: "650mg",
      frequency: "PRN",
      route: "PO",
      indication: "Pain/Fever",
      lastGiven: "Yesterday 2:00 PM",
      status: "available"
    },
    {
      id: 6,
      name: "Lorazepam",
      dosage: "0.5mg",
      frequency: "PRN",
      route: "PO",
      indication: "Anxiety",
      lastGiven: "2 days ago",
      status: "available"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'requires_monitoring':
        return 'bg-orange-100 text-orange-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      case 'available':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Medication Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Medications</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Allergy Alert */}
      {resident.allergies && resident.allergies.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              DRUG ALLERGIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resident.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="w-5 h-5 mr-2" />
            Current Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMedications.map((med) => (
              <div key={med.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-lg">{med.name}</h4>
                      <Badge className={getStatusColor(med.status)}>
                        {med.status.replace('_', ' ')}
                      </Badge>
                      {med.status === 'requires_monitoring' && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Dosage:</span>
                        <p className="font-medium">{med.dosage} {med.route}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Frequency:</span>
                        <p className="font-medium">{med.frequency}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Indication:</span>
                        <p className="font-medium">{med.indication}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Prescriber:</span>
                        <p className="font-medium">{med.prescriber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Start Date:</span>
                        <p className="font-medium">{med.startDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Next Due:</span>
                        <p className="font-medium text-blue-600">{med.nextDue}</p>
                      </div>
                    </div>
                    {med.instructions && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                        <span className="font-medium">Instructions:</span> {med.instructions}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Clock className="w-4 h-4 mr-1" />
                      Give Now
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

      {/* PRN Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            PRN (As Needed) Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prnMedications.map((med) => (
              <div key={med.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-lg">{med.name}</h4>
                      <Badge className={getStatusColor(med.status)}>
                        {med.status}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Dosage:</span>
                        <p className="font-medium">{med.dosage} {med.route}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Indication:</span>
                        <p className="font-medium">{med.indication}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Given:</span>
                        <p className="font-medium">{med.lastGiven}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Pill className="w-4 h-4 mr-1" />
                      Administer
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

      {/* Medication Administration Record */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="w-5 h-5 mr-2" />
            Recent Administration History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date/Time</th>
                  <th className="text-left p-2">Medication</th>
                  <th className="text-left p-2">Dose</th>
                  <th className="text-left p-2">Given By</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2">Today 08:00 AM</td>
                  <td className="p-2">Metformin 500mg</td>
                  <td className="p-2">500mg PO</td>
                  <td className="p-2">J. Smith, RN</td>
                  <td className="p-2">
                    <Badge className="bg-green-100 text-green-800">Given</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2">Today 08:00 AM</td>
                  <td className="p-2">Lisinopril 10mg</td>
                  <td className="p-2">10mg PO</td>
                  <td className="p-2">J. Smith, RN</td>
                  <td className="p-2">
                    <Badge className="bg-green-100 text-green-800">Given</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2">Yesterday 10:00 PM</td>
                  <td className="p-2">Atorvastatin 20mg</td>
                  <td className="p-2">20mg PO</td>
                  <td className="p-2">M. Johnson, RN</td>
                  <td className="p-2">
                    <Badge className="bg-green-100 text-green-800">Given</Badge>
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

export default ResidentMedicationsTab;
