
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Save, CheckCircle, AlertTriangle, Calculator } from "lucide-react";
import { MdsAssessment, MdsData, SectionA, SectionB, SectionG, SectionD } from "@/types/mds";
import MdsSectionA from "./sections/MdsSectionA";
import MdsSectionB from "./sections/MdsSectionB";
import MdsSectionG from "./sections/MdsSectionG";
import MdsSectionD from "./sections/MdsSectionD";
import HippsCalculator from "./HippsCalculator";

interface MdsAssessmentFormProps {
  assessment?: MdsAssessment;
  residentId: string;
  onSave: (assessment: Partial<MdsAssessment>) => void;
  onClose: () => void;
}

const MdsAssessmentForm = ({ assessment, residentId, onSave, onClose }: MdsAssessmentFormProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("section_a");
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

  const completedSections = Object.keys(formData).filter(key => formData[key as keyof MdsData]?.completed).length;
  const progress = (completedSections / sections.length) * 100;

  const handleSectionChange = (sectionId: string, sectionData: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: sectionData
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave({ ...assessment, data: formData } as MdsAssessment);
    } catch (error) {
      console.error("Error saving assessment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            MDS 3.0 Assessment Form - {residentId}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {sections.map(section => (
              <TabsTrigger key={section.id} value={section.id} className="relative">
                {section.label}
                {formData[section.id as keyof MdsData]?.completed && (
                  <CheckCircle className="absolute top-1 right-1 w-4 h-4 text-green-500" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Complete all sections to generate the HIPPS code and finalize the assessment.
            </p>
            <Progress value={progress} className="mt-2" />
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>{completedSections} of {sections.length - 1} Sections Completed</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
          </div>

          <TabsContent value="section_a" className="space-y-6">
            <MdsSectionA
              data={formData.section_a as SectionA}
              onChange={(data) => handleSectionChange("section_a", data)}
            />
          </TabsContent>

          <TabsContent value="section_b" className="space-y-6">
            <MdsSectionB
              data={formData.section_b as SectionB}
              onChange={(data) => handleSectionChange("section_b", data)}
            />
          </TabsContent>

          <TabsContent value="section_g" className="space-y-6">
            <MdsSectionG
              data={formData.section_g as SectionG}
              onChange={(data) => handleSectionChange("section_g", data)}
            />
          </TabsContent>

          <TabsContent value="section_d" className="space-y-6">
            <MdsSectionD
              data={formData.section_d as SectionD}
              onChange={(data) => handleSectionChange("section_d", data)}
            />
          </TabsContent>

          <TabsContent value="hipps_calculator" className="space-y-6">
             {Object.keys(formData).filter(key => formData[key as keyof MdsData]?.completed).length < 4 ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Complete Sections A, B, G, and D to calculate the HIPPS code.
                </AlertDescription>
              </Alert>
            ) : (
              <HippsCalculator mdsData={formData as MdsData} residentName={residentId} mrn="MRN-12345" />
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving && <Save className="mr-2 h-4 w-4 animate-spin" />}
            Save Assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MdsAssessmentForm;
