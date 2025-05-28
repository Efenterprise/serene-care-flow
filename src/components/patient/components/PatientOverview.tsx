
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  FileText,
  AlertTriangle,
  Activity
} from "lucide-react";

interface PatientOverviewProps {
  patient: any;
}

const PatientOverview = ({ patient }: PatientOverviewProps) => {
  return (
    <div className="space-y-6">
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
              <span className="text-sm text-gray-600">Length of Stay</span>
              <p className="font-medium">
                {Math.ceil((new Date().getTime() - new Date(patient.admissionDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
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
              {patient.riskFactors.map((risk: string, index: number) => (
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

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Phone className="w-5 h-5 mr-2" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
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
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{patient.email}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientOverview;
