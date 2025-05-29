
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Save, CheckCircle, AlertTriangle, Calculator, User } from "lucide-react";
import { MdsAssessment, MdsData, SectionA, SectionB, SectionC, SectionD, SectionE, SectionF, SectionG, SectionH, SectionI, SectionJ, SectionK, SectionL, SectionM, SectionN, SectionO, SectionP, SectionQ, SectionV, SectionX, SectionZ } from "@/types/mds";
import MdsSectionA from "./sections/MdsSectionA";
import MdsSectionB from "./sections/MdsSectionB";
import MdsSectionC from "./sections/MdsSectionC";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    section_c: {
      c0100: '0',
      c0200: '0',
      c0300: '0',
      c0400: '0',
      c0500: '0',
      c0600: '0',
      c0700: '0',
      c0800: '0',
      c0900: '0',
      c1000: '0',
      c1300: '0',
      c1600: '0',
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
    },
    section_e: {
      e0100: '0',
      e0200: '0',
      e0800: '0',
      e0900: '0',
      e1000: '0',
      e1100: '0',
      completed: false
    },
    section_f: {
      f0300: '0',
      f0400: '0',
      f0500: '0',
      f0600: '0',
      f0700: '0',
      f0800: '0',
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
    section_h: {
      h0100: '0',
      h0200: '0',
      h0300: '0',
      h0400: '0',
      h0500: '0',
      h0600: '0',
      completed: false
    },
    section_i: {
      completed: false
    },
    section_j: {
      completed: false
    },
    section_k: {
      completed: false
    },
    section_l: {
      completed: false
    },
    section_m: {
      completed: false
    },
    section_n: {
      completed: false
    },
    section_o: {
      completed: false
    },
    section_p: {
      completed: false
    },
    section_q: {
      completed: false
    },
    section_v: {
      completed: false
    },
    section_x: {
      completed: false
    },
    section_z: {
      completed: false
    }
  });

  // Initialize edit mode and load existing assessment data
  useEffect(() => {
    if (assessment) {
      setIsEditMode(true);
      setIsLoading(true);
      
      // Load existing assessment data
      if (assessment.data) {
        setFormData(assessment.data);
      }
      
      // Set selected resident info from assessment
      setSelectedResident({
        id: assessment.resident_id,
        first_name: "Existing",
        last_name: "Resident",
        mrn: "Loading...",
        room_number: "TBD"
      });
      
      setSelectedAssessmentType(assessment.assessment_type);
      setActiveTab("section_a");
      setIsLoading(false);
    } else if (residentId) {
      // Handle case where residentId is passed directly
      setIsEditMode(false);
      setActiveTab("section_a");
    }
  }, [assessment, residentId]);

  const sections = [
    { id: "section_a", label: "Section A: Identification" },
    { id: "section_b", label: "Section B: Hearing, Speech, Vision" },
    { id: "section_c", label: "Section C: Cognitive Patterns" },
    { id: "section_d", label: "Section D: Mood" },
    { id: "section_e", label: "Section E: Behavior" },
    { id: "section_f", label: "Section F: Preferences" },
    { id: "section_g", label: "Section G: Functional Status" },
    { id: "section_h", label: "Section H: Bladder and Bowel" },
    { id: "section_i", label: "Section I: Active Diagnoses" },
    { id: "section_j", label: "Section J: Health Conditions" },
    { id: "section_k", label: "Section K: Swallowing/Nutrition" },
    { id: "section_l", label: "Section L: Oral/Dental Status" },
    { id: "section_m", label: "Section M: Skin Conditions" },
    { id: "section_n", label: "Section N: Medications" },
    { id: "section_o", label: "Section O: Special Treatments" },
    { id: "section_p", label: "Section P: Restraints" },
    { id: "section_q", label: "Section Q: Participation" },
    { id: "section_v", label: "Section V: CAA Summary" },
    { id: "section_x", label: "Section X: Correction Request" },
    { id: "section_z", label: "Section Z: Assessment Admin" },
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

  // Show resident selector only for new assessments (not edit mode)
  if (!selectedResident && !isEditMode) {
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

  if (isLoading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading assessment...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[95vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            MDS 3.0 Assessment - {selectedResident?.first_name} {selectedResident?.last_name}
            {isEditMode && (
              <Badge variant="outline" className="ml-2">Edit Mode</Badge>
            )}
          </DialogTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>MRN: {selectedResident?.mrn || 'Loading...'}</span>
            <span>•</span>
            <span>Room: {selectedResident?.room_number || 'Not assigned'}</span>
            <span>•</span>
            <Badge variant="outline">{selectedAssessmentType?.replace('_', ' ')}</Badge>
          </div>
        </DialogHeader>

        <div className="px-6 py-2 border-b">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Assessment Progress</span>
            <span>{completedSections} of {sections.length - 1} sections completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 py-2 border-b">
              <ScrollArea className="w-full">
                <TabsList className="grid w-max grid-cols-21 gap-1">
                  {sections.map(section => (
                    <TabsTrigger key={section.id} value={section.id} className="relative text-xs whitespace-nowrap">
                      {section.label}
                      {formData[section.id as keyof MdsData]?.completed && (
                        <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 text-green-500" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </div>

            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <TabsContent value="section_a" className="mt-0">
                    <MdsSectionA
                      data={formData.section_a as SectionA}
                      onChange={(data) => handleSectionChange("section_a", data)}
                    />
                  </TabsContent>

                  <TabsContent value="section_b" className="mt-0">
                    <MdsSectionB
                      data={formData.section_b as SectionB}
                      onChange={(data) => handleSectionChange("section_b", data)}
                    />
                  </TabsContent>

                  <TabsContent value="section_c" className="mt-0">
                    <MdsSectionC
                      data={formData.section_c as SectionC}
                      onChange={(data) => handleSectionChange("section_c", data)}
                    />
                  </TabsContent>

                  <TabsContent value="section_d" className="mt-0">
                    <MdsSectionD
                      data={formData.section_d as SectionD}
                      onChange={(data) => handleSectionChange("section_d", data)}
                    />
                  </TabsContent>

                  <TabsContent value="section_e" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section E: Behavior</h3>
                      <p className="text-gray-600">This section will assess behavioral symptoms and patterns. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_f" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section F: Preferences for Customary Routine and Activities</h3>
                      <p className="text-gray-600">This section will assess resident preferences for daily routines and activities. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_g" className="mt-0">
                    <MdsSectionG
                      data={formData.section_g as SectionG}
                      onChange={(data) => handleSectionChange("section_g", data)}
                    />
                  </TabsContent>

                  <TabsContent value="section_h" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section H: Bladder and Bowel</h3>
                      <p className="text-gray-600">This section will assess continence and elimination patterns. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_i" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section I: Active Diagnoses</h3>
                      <p className="text-gray-600">This section will document active diagnoses and conditions. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_j" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section J: Health Conditions</h3>
                      <p className="text-gray-600">This section will assess various health conditions and problems. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_k" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section K: Swallowing/Nutritional Status</h3>
                      <p className="text-gray-600">This section will assess swallowing ability and nutritional status. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_l" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section L: Oral/Dental Status</h3>
                      <p className="text-gray-600">This section will assess oral health and dental status. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_m" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section M: Skin Conditions</h3>
                      <p className="text-gray-600">This section will assess skin integrity and pressure ulcer risk. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_n" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section N: Medications</h3>
                      <p className="text-gray-600">This section will document medication usage and management. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_o" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section O: Special Treatments and Procedures</h3>
                      <p className="text-gray-600">This section will document special treatments and therapeutic procedures. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_p" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section P: Restraints</h3>
                      <p className="text-gray-600">This section will assess use of physical restraints. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_q" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section Q: Participation in Assessment and Goal Setting</h3>
                      <p className="text-gray-600">This section will assess resident participation in care planning. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_v" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section V: Care Area Assessment (CAA)</h3>
                      <p className="text-gray-600">This section will summarize triggered CAAs and care planning decisions. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_x" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section X: Correction Request</h3>
                      <p className="text-gray-600">This section will handle assessment corrections and modifications. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="section_z" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Section Z: Assessment Administration</h3>
                      <p className="text-gray-600">This section will manage assessment administration and billing information. Implementation coming soon.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="hipps_calculator" className="mt-0">
                    {completedSections < 4 ? (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Complete key sections (A, B, G, D) to calculate the HIPPS code.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <HippsCalculator 
                        mdsData={formData as MdsData} 
                        residentName={`${selectedResident?.first_name} ${selectedResident?.last_name}`}
                        mrn={selectedResident?.mrn} 
                      />
                    )}
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>

            <div className="flex justify-between items-center p-6 border-t bg-gray-50">
              {!isEditMode && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedResident(null);
                    setActiveTab("resident_selection");
                  }}
                >
                  Change Resident
                </Button>
              )}
              {isEditMode && <div />}
              <div className="space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving && <Save className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditMode ? 'Update Assessment' : 'Save Assessment'}
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MdsAssessmentForm;
