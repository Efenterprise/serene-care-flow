
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, History, AlertTriangle, Heart, Activity, FileText } from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import AddMedicalHistoryDialog from "./AddMedicalHistoryDialog";

interface MedicalHistoryTabProps {
  resident: Resident;
}

const MedicalHistoryTab = ({ resident }: MedicalHistoryTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock medical history data - in real app, this would come from hooks
  const medicalHistory = [
    {
      id: "1",
      type: "surgery",
      condition: "Hip Replacement",
      date: "2023-12-15",
      provider: "Dr. Sarah Wilson",
      status: "resolved",
      severity: "major",
      notes: "Left total hip replacement surgery successful. Patient recovering well.",
      followUpRequired: false
    },
    {
      id: "2",
      type: "diagnosis",
      condition: "Hypertension",
      date: "2020-03-10",
      provider: "Dr. Michael Chen",
      status: "ongoing",
      severity: "moderate",
      notes: "Essential hypertension, well controlled with medication.",
      followUpRequired: true
    },
    {
      id: "3",
      type: "allergy",
      condition: "Penicillin Allergy",
      date: "1995-06-20",
      provider: "Dr. Jennifer Adams",
      status: "active",
      severity: "severe",
      notes: "Severe allergic reaction documented. Patient carries EpiPen.",
      followUpRequired: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-100 text-red-800';
      case 'major': return 'bg-orange-100 text-orange-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'minor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'surgery': return <Activity className="w-4 h-4" />;
      case 'diagnosis': return <Heart className="w-4 h-4" />;
      case 'allergy': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const groupedHistory = medicalHistory.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof medicalHistory>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Medical History</h3>
          <p className="text-gray-600">Comprehensive medical timeline and conditions</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Medical History
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All History</TabsTrigger>
          <TabsTrigger value="surgery">Surgeries</TabsTrigger>
          <TabsTrigger value="diagnosis">Diagnoses</TabsTrigger>
          <TabsTrigger value="allergy">Allergies</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {medicalHistory.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{item.condition}</h4>
                        <Badge className={getSeverityColor(item.severity)}>
                          {item.severity}
                        </Badge>
                        <Badge variant={item.status === 'active' ? 'destructive' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.notes}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                        <span>Provider: {item.provider}</span>
                        {item.followUpRequired && (
                          <Badge variant="outline" className="text-xs">
                            Follow-up Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {Object.entries(groupedHistory).map(([type, items]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{item.condition}</h4>
                          <Badge className={getSeverityColor(item.severity)}>
                            {item.severity}
                          </Badge>
                          <Badge variant={item.status === 'active' ? 'destructive' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.notes}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                          <span>Provider: {item.provider}</span>
                          {item.followUpRequired && (
                            <Badge variant="outline" className="text-xs">
                              Follow-up Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <AddMedicalHistoryDialog
        resident={resident}
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </div>
  );
};

export default MedicalHistoryTab;
