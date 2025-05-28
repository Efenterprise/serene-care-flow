
import { useState } from "react";
import { format, differenceInDays } from "date-fns";
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
  X,
  Edit,
  Activity,
  ClipboardList,
  Stethoscope,
  Target
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentProfileProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const ResidentProfile = ({ resident, isOpen, onClose }: ResidentProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
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

  const calculateLengthOfStay = () => {
    const admissionDate = new Date(resident.admission_date);
    const endDate = resident.discharge_date ? new Date(resident.discharge_date) : new Date();
    return differenceInDays(endDate, admissionDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'discharged':
        return 'bg-blue-100 text-blue-800';
      case 'pending_admission':
        return 'bg-orange-100 text-orange-800';
      case 'temporary_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                {getInitials(resident.first_name, resident.last_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {resident.first_name} {resident.last_name}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>MRN: {resident.mrn}</span>
                <span>Age: {calculateAge(resident.date_of_birth)}</span>
                <span>Room: {resident.room_number || 'N/A'}</span>
                <Badge className={getStatusColor(resident.status)}>
                  {resident.status.replace('_', ' ').toUpperCase()}
                </Badge>
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
            <TabsList className="grid w-full grid-cols-6 bg-gray-50 m-4">
              <TabsTrigger value="overview" className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>Medical</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center space-x-1">
                <Pill className="w-4 h-4" />
                <span>Medications</span>
              </TabsTrigger>
              <TabsTrigger value="careplans" className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Care Plans</span>
              </TabsTrigger>
              <TabsTrigger value="assessments" className="flex items-center space-x-1">
                <Stethoscope className="w-4 h-4" />
                <span>Assessments</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Documents</span>
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Personal Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Date of Birth</p>
                          <p className="font-medium">{format(new Date(resident.date_of_birth), 'MMM dd, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Gender</p>
                          <p className="font-medium capitalize">{resident.gender || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Admission Date</p>
                          <p className="font-medium">{format(new Date(resident.admission_date), 'MMM dd, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Length of Stay</p>
                          <p className="font-medium">{calculateLengthOfStay()} days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Room & Unit Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Location</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Room Number</p>
                          <p className="font-medium">{resident.room_number || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Floor</p>
                          <p className="font-medium">{resident.floor || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Unit</p>
                          <p className="font-medium">{resident.unit || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Care Level</p>
                          <p className="font-medium capitalize">{resident.care_level || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emergency Contact */}
                  {resident.emergency_contact_name && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Phone className="w-5 h-5" />
                          <span>Emergency Contact</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-medium">{resident.emergency_contact_name}</p>
                          {resident.emergency_contact_relationship && (
                            <p className="text-sm text-gray-600">{resident.emergency_contact_relationship}</p>
                          )}
                          {resident.emergency_contact_phone && (
                            <p className="text-sm text-blue-600">{resident.emergency_contact_phone}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Insurance Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Insurance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Primary Payor</p>
                          <p className="font-medium">{resident.payor_primary || 'N/A'}</p>
                        </div>
                        {resident.payor_secondary && (
                          <div>
                            <p className="text-sm text-gray-600">Secondary Payor</p>
                            <p className="font-medium">{resident.payor_secondary}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="medical">
                <div className="space-y-6">
                  {/* Diagnoses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Diagnoses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {resident.diagnosis_primary && (
                          <div>
                            <p className="text-sm text-gray-600">Primary Diagnosis</p>
                            <p className="font-medium">{resident.diagnosis_primary}</p>
                          </div>
                        )}
                        {resident.diagnosis_secondary && resident.diagnosis_secondary.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600">Secondary Diagnoses</p>
                            <ul className="list-disc list-inside space-y-1">
                              {resident.diagnosis_secondary.map((diagnosis, index) => (
                                <li key={index} className="font-medium">{diagnosis}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Physicians */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Care Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {resident.physician_attending && (
                          <div>
                            <p className="text-sm text-gray-600">Attending Physician</p>
                            <p className="font-medium">{resident.physician_attending}</p>
                          </div>
                        )}
                        {resident.physician_primary_care && (
                          <div>
                            <p className="text-sm text-gray-600">Primary Care Physician</p>
                            <p className="font-medium">{resident.physician_primary_care}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Allergies */}
                  {resident.allergies && resident.allergies.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">Allergies</CardTitle>
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
                </div>
              </TabsContent>

              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Medication management system will be integrated here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="careplans">
                <Card>
                  <CardHeader>
                    <CardTitle>Care Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Care plan management system will be integrated here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessments">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Assessment tracking system will be integrated here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Document management system will be integrated here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResidentProfile;
