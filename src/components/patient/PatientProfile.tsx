
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
  Activity,
  TrendingUp,
  ClipboardList,
  Stethoscope,
  Target
} from "lucide-react";
import PatientOverview from "./components/PatientOverview";
import PatientProgressNotes from "./components/PatientProgressNotes";
import PatientOrders from "./components/PatientOrders";
import PatientVitalsLabs from "./components/PatientVitalsLabs";
import PatientCarePlans from "./components/PatientCarePlans";
import PatientMedications from "./components/PatientMedications";
import PatientAssessments from "./components/PatientAssessments";

interface PatientProfileProps {
  patientId?: string;
  isOpen: boolean;
  onClose: () => void;
}

const PatientProfile = ({ patientId, isOpen, onClose }: PatientProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Enhanced mock patient data for demo
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
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
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
                <Badge className="bg-blue-100 text-blue-800">Acuity Level {patient.acuityLevel}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Print Summary
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-gray-50 m-4">
              <TabsTrigger value="overview" className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Notes</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="vitals" className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>Vitals & Labs</span>
              </TabsTrigger>
              <TabsTrigger value="careplans" className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Care Plans</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center space-x-1">
                <Pill className="w-4 h-4" />
                <span>Medications</span>
              </TabsTrigger>
              <TabsTrigger value="assessments" className="flex items-center space-x-1">
                <Stethoscope className="w-4 h-4" />
                <span>Assessments</span>
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview">
                <PatientOverview patient={patient} />
              </TabsContent>

              <TabsContent value="notes">
                <PatientProgressNotes patientId={patient.id} />
              </TabsContent>

              <TabsContent value="orders">
                <PatientOrders patientId={patient.id} />
              </TabsContent>

              <TabsContent value="vitals">
                <PatientVitalsLabs patientId={patient.id} />
              </TabsContent>

              <TabsContent value="careplans">
                <PatientCarePlans patientId={patient.id} />
              </TabsContent>

              <TabsContent value="medications">
                <PatientMedications patientId={patient.id} />
              </TabsContent>

              <TabsContent value="assessments">
                <PatientAssessments patientId={patient.id} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
