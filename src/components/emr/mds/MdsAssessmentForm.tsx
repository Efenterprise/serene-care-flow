
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Save, CheckCircle, AlertTriangle, Calculator, User } from "lucide-react";
import { MdsAssessment, MdsData, SectionA, SectionB, SectionG, SectionD } from "@/types/mds";
import MdsSectionA from "./sections/MdsSectionA";
import MdsSectionB from "./sections/MdsSectionB";
import MdsSectionG from "./sections/MdsSectionG";
import MdsSectionD from "./sections/MdsSectionD";
import HippsCalculator from "./HippsCalculator";
import ResidentSelector from "./ResidentSelector";

interface MdsAssessmentFormProps {
  assessment?: MdsAssessment;
  residentId?: string;
  onSave: (assessment: Partial<MdsAssessment>) => void;
  onClose: () => void;
}

const MdsAssessmentForm = ({ assessment, residentId, onSave, onClose }: MdsAssessmentFormProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("resident_selection");
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<any>("admission");
  const [formData, setFormData] = useState<Partial<MdsData>>({
    section_a: {
      a0100: '',
      a0200: '',
      a0310: 'admission',
      a0320: '',
      a1000: '',
      a1005: '',
      a1010: '',
      a1700: '',
      a1800: '',
      a2000: '',
      a2100: '',
      a2300: '',
      a2400: '',
      completed: false
    },
    section_b: {
      b0100: '0',
      b0200: '0',
      b0300: '0',
      b0600: '0',
      b0700: '0',
      b0800: '0',
      b1000: '0',
      b1200: '0',
      completed: false
    },
    section_g: {
      g0110: '0',
      g0120: '0',
      g0130: '0',
      g0140: '0',
      g0150: '0',
      g0160: '0',
      g0170: '0',
      g0180: '0',
      g0190: '0',
      g0200: '0',
      g0300: '0',
      g0400: '0',
      g0600: '0',
      completed: false
    },
    section_d: {
      d0100: '0',
      d0200: '0',
      d0300: '0',
      d0350: '0',
      d0500: '0',
      d0600: '0',
      completed: false
    }
  });

  const sections = [
    { id: "section_a", label: "Section A: Identification" },
    { id: "section_b", label: "Section B: Hearing, Speech, Vision" },
    { id: "section_g", label: "Section G: Functional Status" },
    { id: "section_d", label: "Section D: Mood" },
    { id: "hipps_calculator", label: "HIPPS Calculator" }
  ];

  const completedSections = Object.keys(formData).filter(key => 
    formData[key as keyof MdsData]?.completed
  ).length;
  const progress = selectedResident ? (completedSections / (sections.length - 1)) * 100 : 0;

  const handleResidentSelect = (resident: any, assessmentType: any) => {
    setSelectedResident(resident);
    setSelectedAssessmentType(assessmentType);
    
    // Auto-populate Section A with resident data
    setFormData(prev => ({
      ...prev,
      section_a: {
        ...prev.section_a!,
        a0310: assessmentType,
        a1010: resident.admission_date || '',
        a2100: resident.mrn || '',
        completed: false
      }
    }));
    
    setActiveTab("section_a");
  };

  const handleSectionChange = (sectionId: string, sectionData: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: sectionData
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave({ 
        ...assessment, 
        resident_id: selectedResident?.id,
        assessment_type: selectedAssessmentType,
        data: formData 
      } as MdsAssessment);
    } catch (error) {
      console.error("Error saving assessment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!selectedResident) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              New MDS 3.0 Assessment
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh]">
            <ResidentSelector 
              onResidentSelect={handleResidentSelect}
              onCancel={onClose}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            MDS 3.0 Assessment - {selectedResident.first_name} {selectedResident.last_name}
          </DialogTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>MRN: {selectedResident.mrn}</span>
            <span>•</span>
            <span>Room: {selectedResident.room_number || 'Not assigned'}</span>
            <span>•</span>
            <Badge variant="outline">{selectedAssessmentType.replace('_', ' ')}</Badge>
          </div>
        </DialogHeader>

        <div className="px-6">
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Assessment Progress</span>
              <span>{completedSections} of {sections.length - 1} sections completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-5">
              {sections.map(section => (
                <TabsTrigger key={section.id} value={section.id} className="relative text-xs">
                  {section.label}
                  {formData[section.id as keyof MdsData]?.completed && (
                    <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 text-green-500" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1 px-6">
            <div className="pb-6">
              <TabsContent value="section_a" className="mt-6">
                <MdsSectionA
                  data={formData.section_a as SectionA}
                  onChange={(data) => handleSectionChange("section_a", data)}
                />
              </TabsContent>

              <TabsContent value="section_b" className="mt-6">
                <MdsSectionB
                  data={formData.section_b as SectionB}
                  onChange={(data) => handleSectionChange("section_b", data)}
                />
              </TabsContent>

              <TabsContent value="section_g" className="mt-6">
                <MdsSectionG
                  data={formData.section_g as SectionG}
                  onChange={(data) => handleSectionChange("section_g", data)}
                />
              </TabsContent>

              <TabsContent value="section_d" className="mt-6">
                <MdsSectionD
                  data={formData.section_d as SectionD}
                  onChange={(data) => handleSectionChange("section_d", data)}
                />
              </TabsContent>

              <TabsContent value="hipps_calculator" className="mt-6">
                {completedSections < 4 ? (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Complete Sections A, B, G, and D to calculate the HIPPS code.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <HippsCalculator 
                    mdsData={formData as MdsData} 
                    residentName={`${selectedResident.first_name} ${selectedResident.last_name}`}
                    mrn={selectedResident.mrn} 
                  />
                )}
              </TabsContent>
            </div>
          </ScrollArea>

          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedResident(null);
                setActiveTab("resident_selection");
              }}
            >
              Change Resident
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Save className="mr-2 h-4 w-4 animate-spin" />}
                Save Assessment
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MdsAssessmentForm;
