
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  X, 
  Edit,
  FileText,
  Pill,
  Heart,
  Stethoscope,
  ClipboardList,
  Target,
  Activity,
  Shield,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Users,
  History,
  BarChart3
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import { useIsMobile } from "@/hooks/use-mobile";
import ResidentOverviewTab from "./profile/clinical/ResidentOverviewTab";
import ResidentVitalsTab from "./profile/clinical/ResidentVitalsTab";
import ResidentMedicationsTab from "./profile/clinical/ResidentMedicationsTab";
import ResidentOrdersTab from "./profile/clinical/ResidentOrdersTab";
import ResidentAssessmentsTab from "./profile/clinical/ResidentAssessmentsTab";
import ResidentProgressNotesTab from "./profile/clinical/ResidentProgressNotesTab";
import ResidentCarePlansTab from "./profile/clinical/ResidentCarePlansTab";
import ResidentTasksTab from "./profile/clinical/ResidentTasksTab";
import ContactsManagement from "./contacts/ContactsManagement";
import MedicalProfessionalsTab from "./profile/medical/MedicalProfessionalsTab";
import MedicalHistoryTab from "./profile/medical/MedicalHistoryTab";
import MedicalAnalyticsDashboard from "./profile/medical/MedicalAnalyticsDashboard";

interface ResidentProfileModalProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const ResidentProfileModal = ({ resident, isOpen, onClose }: ResidentProfileModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

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

  const getCareLevel = (level?: string) => {
    switch (level) {
      case 'skilled':
        return 'bg-red-100 text-red-800';
      case 'assisted':
        return 'bg-blue-100 text-blue-800';
      case 'memory_care':
        return 'bg-purple-100 text-purple-800';
      case 'respite':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`
        bg-white rounded-lg shadow-xl w-full h-full max-h-[95vh] overflow-hidden
        ${isMobile ? 'max-w-full' : 'max-w-7xl'}
      `}>
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={resident.photo_url} />
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
                <span>Room: {resident.room_number || 'Unassigned'}</span>
                <span className="capitalize">{resident.gender}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {resident.care_level && (
                  <Badge className={getCareLevel(resident.care_level)}>
                    {resident.care_level.replace('_', ' ').toUpperCase()}
                  </Badge>
                )}
                <Badge variant={resident.status === 'current' ? 'default' : 'secondary'}>
                  {resident.status.replace('_', ' ').toUpperCase()}
                </Badge>
                {resident.allergies && resident.allergies.length > 0 && (
                  <Badge variant="destructive" className="flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Allergies
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content with Clinical Tabs */}
        <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(95vh - 140px)' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-16 bg-gray-50 m-4">
              <TabsTrigger value="overview" className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="vitals" className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Vitals</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center space-x-1">
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Meds</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="assessments" className="flex items-center space-x-1">
                <Stethoscope className="w-4 h-4" />
                <span className="hidden sm:inline">Assess</span>
              </TabsTrigger>
              <TabsTrigger value="careplans" className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Care Plans</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="medical-team" className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Medical Team</span>
              </TabsTrigger>
              <TabsTrigger value="medical-history" className="flex items-center space-x-1">
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="medical-analytics" className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="therapy" className="flex items-center space-x-1">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Therapy</span>
              </TabsTrigger>
              <TabsTrigger value="census" className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Census</span>
              </TabsTrigger>
              <TabsTrigger value="misc" className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Misc</span>
              </TabsTrigger>
            </TabsList>

            <div className="p-3 sm:p-6">
              <TabsContent value="overview">
                <ResidentOverviewTab resident={resident} />
              </TabsContent>

              <TabsContent value="vitals">
                <ResidentVitalsTab resident={resident} />
              </TabsContent>

              <TabsContent value="medications">
                <ResidentMedicationsTab resident={resident} />
              </TabsContent>

              <TabsContent value="orders">
                <ResidentOrdersTab resident={resident} />
              </TabsContent>

              <TabsContent value="assessments">
                <ResidentAssessmentsTab resident={resident} />
              </TabsContent>

              <TabsContent value="careplans">
                <ResidentCarePlansTab resident={resident} />
              </TabsContent>

              <TabsContent value="progress">
                <ResidentProgressNotesTab resident={resident} />
              </TabsContent>

              <TabsContent value="tasks">
                <ResidentTasksTab resident={resident} />
              </TabsContent>

              <TabsContent value="contacts">
                <ContactsManagement resident={resident} />
              </TabsContent>

              <TabsContent value="medical-team">
                <MedicalProfessionalsTab resident={resident} />
              </TabsContent>

              <TabsContent value="medical-history">
                <MedicalHistoryTab resident={resident} />
              </TabsContent>

              <TabsContent value="medical-analytics">
                <MedicalAnalyticsDashboard />
              </TabsContent>

              <TabsContent value="therapy">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Therapy Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Therapy management system integration coming soon.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="census">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Census Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Census tracking and reporting features coming soon.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="misc">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Miscellaneous</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Additional resident information and documents.</p>
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

export default ResidentProfileModal;
