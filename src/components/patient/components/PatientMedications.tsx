
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pill, 
  Plus, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  History
} from "lucide-react";

interface PatientMedicationsProps {
  patientId: string;
}

const PatientMedications = ({ patientId }: PatientMedicationsProps) => {
  const medications = {
    current: [
      {
        id: "1",
        name: "Acetaminophen",
        strength: "650mg",
        route: "PO",
        frequency: "Q6H PRN",
        indication: "Pain management",
        startDate: "2024-01-18",
        prescriber: "Dr. Sarah Wilson",
        instructions: "Take for pain rating >4/10. Do not exceed 3000mg in 24 hours.",
        lastGiven: "2024-01-20 06:00",
        nextDue: "2024-01-20 12:00",
        status: "active"
      },
      {
        id: "2",
        name: "Enoxaparin",
        strength: "40mg",
        route: "SubQ",
        frequency: "Daily",
        indication: "DVT prophylaxis",
        startDate: "2024-01-15",
        prescriber: "Dr. Sarah Wilson",
        instructions: "Administer in abdomen, rotate injection sites.",
        lastGiven: "2024-01-20 08:00",
        nextDue: "2024-01-21 08:00",
        status: "active"
      },
      {
        id: "3",
        name: "Docusate Sodium",
        strength: "100mg",
        route: "PO",
        frequency: "BID",
        indication: "Constipation prevention",
        startDate: "2024-01-16",
        prescriber: "Dr. Sarah Wilson",
        instructions: "Take with meals to prevent constipation.",
        lastGiven: "2024-01-20 08:00",
        nextDue: "2024-01-20 20:00",
        status: "active"
      }
    ],
    scheduled: [
      {
        id: "4",
        name: "Warfarin",
        strength: "5mg",
        route: "PO",
        frequency: "Daily at bedtime",
        indication: "Anticoagulation",
        startDate: "2024-01-22",
        prescriber: "Dr. Sarah Wilson",
        instructions: "Monitor INR. Hold if INR >3.0",
        status: "scheduled"
      }
    ],
    discontinued: [
      {
        id: "5",
        name: "Morphine",
        strength: "2mg",
        route: "IV",
        frequency: "Q4H PRN",
        indication: "Severe pain",
        startDate: "2024-01-15",
        endDate: "2024-01-18",
        prescriber: "Dr. Sarah Wilson",
        reason: "Switched to oral pain management",
        status: "discontinued"
      }
    ]
  };

  const allergies = [
    {
      allergen: "Penicillin",
      reaction: "Rash, hives",
      severity: "Moderate",
      verified: true
    },
    {
      allergen: "Sulfa drugs",
      reaction: "Severe rash",
      severity: "Severe",
      verified: true
    }
  ];

  const interactions = [
    {
      id: "1",
      medications: ["Acetaminophen", "Warfarin"],
      severity: "Minor",
      description: "Monitor for increased INR with chronic high-dose acetaminophen use",
      recommendation: "Monitor INR more frequently if using >2g/day acetaminophen"
    }
  ];

  const administrationHistory = [
    {
      id: "1",
      medication: "Acetaminophen 650mg",
      time: "2024-01-20 06:00",
      nurse: "RN Sarah Miller",
      status: "given",
      notes: "Patient reported pain 6/10, medication effective"
    },
    {
      id: "2",
      medication: "Enoxaparin 40mg",
      time: "2024-01-20 08:00",
      nurse: "RN Sarah Miller",
      status: "given",
      notes: "Administered in left abdomen, no adverse reactions"
    },
    {
      id: "3",
      medication: "Docusate Sodium 100mg",
      time: "2024-01-20 08:00",
      nurse: "RN Sarah Miller",
      status: "given",
      notes: "Given with breakfast"
    },
    {
      id: "4",
      medication: "Acetaminophen 650mg",
      time: "2024-01-20 00:00",
      nurse: "RN Jennifer Adams",
      status: "held",
      notes: "Patient sleeping, pain 2/10"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
        return 'bg-red-100 text-red-800';
      case 'moderate':
        return 'bg-orange-100 text-orange-800';
      case 'minor':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'discontinued':
        return 'bg-gray-100 text-gray-800';
      case 'given':
        return 'bg-green-100 text-green-800';
      case 'held':
        return 'bg-orange-100 text-orange-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const MedicationCard = ({ med, showHistory = false }: { med: any, showHistory?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              {med.name} {med.strength}
            </CardTitle>
            <p className="text-gray-600">{med.indication}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(med.status)}>
              {med.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Route & Frequency</span>
            <p className="font-medium">{med.route} {med.frequency}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Prescriber</span>
            <p className="font-medium">{med.prescriber}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Start Date</span>
            <p className="font-medium">{med.startDate}</p>
          </div>
          {med.endDate && (
            <div>
              <span className="text-sm text-gray-600">End Date</span>
              <p className="font-medium">{med.endDate}</p>
            </div>
          )}
        </div>

        {med.instructions && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700"><strong>Instructions:</strong> {med.instructions}</p>
          </div>
        )}

        {med.lastGiven && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Given:</span>
            <span className="font-medium">{med.lastGiven}</span>
          </div>
        )}

        {med.nextDue && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Next Due:</span>
            <span className="font-medium text-blue-600">{med.nextDue}</span>
          </div>
        )}

        {med.reason && (
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-700"><strong>Reason for discontinuation:</strong> {med.reason}</p>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-3 border-t">
          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
          {med.status === 'active' && (
            <>
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-1" />
                Modify
              </Button>
              <Button size="sm" variant="outline">
                <Clock className="w-4 h-4 mr-1" />
                Give Now
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Medications & Allergies</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Allergies Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Known Allergies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {allergies.map((allergy, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-red-900">{allergy.allergen}</h4>
                  <Badge className={getSeverityColor(allergy.severity)}>
                    {allergy.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">Reaction: {allergy.reaction}</p>
                {allergy.verified && (
                  <div className="flex items-center mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">Verified</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">
            Current ({medications.current.length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled ({medications.scheduled.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Administration History
          </TabsTrigger>
          <TabsTrigger value="interactions">
            Interactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {medications.current.map((med) => (
            <MedicationCard key={med.id} med={med} />
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {medications.scheduled.map((med) => (
            <MedicationCard key={med.id} med={med} />
          ))}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Recent Administration History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {administrationHistory.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{record.medication}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>By: {record.nurse}</span>
                        <span>Time: {record.time}</span>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
                      )}
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions">
          <div className="space-y-4">
            {interactions.map((interaction) => (
              <Card key={interaction.id} className="border-orange-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-orange-800">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Drug Interaction
                    </CardTitle>
                    <Badge className={getSeverityColor(interaction.severity)}>
                      {interaction.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Medications:</span>
                      <p className="font-medium">{interaction.medications.join(' + ')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Description:</span>
                      <p className="text-gray-700">{interaction.description}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-orange-800">Recommendation:</span>
                      <p className="text-sm text-orange-700 mt-1">{interaction.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientMedications;
