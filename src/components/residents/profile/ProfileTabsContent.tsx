
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Resident } from "@/hooks/useResidents";
import ResidentOverviewTab from "./clinical/ResidentOverviewTab";
import ResidentVitalsTab from "./clinical/ResidentVitalsTab";
import ResidentMedicationsTab from "./clinical/ResidentMedicationsTab";
import ResidentOrdersTab from "./clinical/ResidentOrdersTab";
import ResidentAssessmentsTab from "./clinical/ResidentAssessmentsTab";
import ResidentProgressNotesTab from "./clinical/ResidentProgressNotesTab";
import ResidentCarePlansTab from "./clinical/ResidentCarePlansTab";
import ResidentTasksTab from "./clinical/ResidentTasksTab";
import ContactsManagement from "../contacts/ContactsManagement";
import MedicalProfessionalsTab from "./medical/MedicalProfessionalsTab";
import MedicalHistoryTab from "./medical/MedicalHistoryTab";
import MedicalAnalyticsDashboard from "./medical/MedicalAnalyticsDashboard";

interface ProfileTabsContentProps {
  resident: Resident;
}

const ProfileTabsContent = ({ resident }: ProfileTabsContentProps) => {
  return (
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
  );
};

export default ProfileTabsContent;
