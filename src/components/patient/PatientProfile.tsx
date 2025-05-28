
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Heart,
  Pill,
  FileText,
  AlertTriangle,
  Clock,
  X,
  Edit,
  Activity
} from "lucide-react";

interface PatientProfileProps {
  patientId?: string;
  isOpen: boolean;
  onClose: () => void;
}

const PatientProfile = ({ patientId, isOpen, onClose }: PatientProfileProps) => {
  // Mock patient data - this would come from your patient tracking hook
  const patient = {
    id: patientId || "1",
    name: "Mary Johnson",
    mrn: "MRN-12345",
    dateOfBirth: "1945-03-15",
    gender: "Female",
    phone: "(555) 123-4567",
    email: "mary.johnson@email.com",
    address: "123 Main St, Anytown, ST 12345",
    emergencyContact: {
      name: "Robert Johnson",
      relationship: "Son",
      phone: "(555) 987-6543"
    },
    admissionDate: "2024-01-15",
    room: "205A",
    physician: "Dr. Sarah Wilson",
    diagnosis: "Post-acute rehabilitation following hip replacement",
    acuityLevel: 3,
    allergies: ["Penicillin", "Sulfa drugs"],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Warfarin", dosage: "5mg", frequency: "Once daily" }
    ],
    vitals: {
      bloodPressure: "130/85",
      heartRate: "72",
      temperature: "98.6°F",
      oxygen: "98%",
      lastUpdated: "2024-01-20 08:30"
    },
    careNotes: [
      {
        date: "2024-01-20",
        time: "08:30",
        note: "Patient ambulated 50 feet with walker, no distress noted",
        staff: "RN Sarah M."
      },
      {
        date: "2024-01-19",
        time: "14:15",
        note: "Physical therapy session completed, good progress with mobility",
        staff: "PT Michael R."
      }
    ],
    riskFactors: ["Fall risk", "Medication compliance"],
    functionalStatus: {
      mobility: "Requires assistance",
      selfCare: "Independent with adaptive equipment",
      cognition: "Alert and oriented x3"
    }
  };

  if (!isOpen) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>MRN: {patient.mrn}</span>
                <span>Age: {calculateAge(patient.dateOfBirth)}</span>
                <span>Room: {patient.room}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-50 m-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="care">Care Notes</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Demographics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <User className="w-5 h-5 mr-2" />
                        Demographics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Date of Birth</span>
                        <p className="font-medium">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Gender</span>
                        <p className="font-medium">{patient.gender}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Address</span>
                        <p className="font-medium text-sm">{patient.address}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admission Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Calendar className="w-5 h-5 mr-2" />
                        Admission
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Admission Date</span>
                        <p className="font-medium">{new Date(patient.admissionDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Attending Physician</span>
                        <p className="font-medium">{patient.physician}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Acuity Level</span>
                        <Badge className="bg-orange-100 text-orange-800">Level {patient.acuityLevel}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Factors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {patient.riskFactors.map((risk, index) => (
                          <Badge key={index} variant="outline" className="mr-2">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Diagnosis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="w-5 h-5 mr-2" />
                      Primary Diagnosis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-900">{patient.diagnosis}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Medications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Pill className="w-5 h-5 mr-2" />
                        Current Medications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {patient.medications.map((med, index) => (
                          <div key={index} className="border-b pb-2 last:border-b-0">
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Allergies */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        Allergies
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {patient.allergies.map((allergy, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800 mr-2">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Functional Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="w-5 h-5 mr-2" />
                      Functional Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Mobility</span>
                        <p className="font-medium">{patient.functionalStatus.mobility}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Self Care</span>
                        <p className="font-medium">{patient.functionalStatus.selfCare}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Cognition</span>
                        <p className="font-medium">{patient.functionalStatus.cognition}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="care" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="w-5 h-5 mr-2" />
                      Recent Care Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patient.careNotes.map((note, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{note.staff}</span>
                            <span className="text-sm text-gray-500">{note.date} at {note.time}</span>
                          </div>
                          <p className="text-gray-700">{note.note}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Heart className="w-5 h-5 mr-2 text-red-600" />
                      Latest Vitals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Blood Pressure</p>
                        <p className="text-xl font-bold text-blue-600">{patient.vitals.bloodPressure}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Heart Rate</p>
                        <p className="text-xl font-bold text-green-600">{patient.vitals.heartRate} bpm</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">Temperature</p>
                        <p className="text-xl font-bold text-orange-600">{patient.vitals.temperature}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Oxygen Sat</p>
                        <p className="text-xl font-bold text-purple-600">{patient.vitals.oxygen}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Last updated: {patient.vitals.lastUpdated}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Patient Contact */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <User className="w-5 h-5 mr-2" />
                        Patient Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                        <span className="text-sm">{patient.address}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emergency Contact */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        Emergency Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Name</span>
                        <p className="font-medium">{patient.emergencyContact.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Relationship</span>
                        <p className="font-medium">{patient.emergencyContact.relationship}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{patient.emergencyContact.phone}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
