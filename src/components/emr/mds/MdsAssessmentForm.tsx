
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  Clock,
  User,
  Brain,
  Eye,
  MessageSquare,
  Activity,
  Droplets,
  Heart,
  Utensils,
  Shield,
  Pill,
  Stethoscope
} from "lucide-react";
import { MdsAssessment, AssessmentStatus } from "@/types/mds";
import { CaaEngine } from "@/utils/caaEngine";
import MdsSectionA from "./sections/MdsSectionA";
import MdsSectionB from "./sections/MdsSectionB";
import MdsSectionC from "./sections/MdsSectionC";

interface MdsAssessmentFormProps {
  assessment?: MdsAssessment;
  residentId: string;
  onSave: (assessment: Partial<MdsAssessment>) => void;
  onClose: () => void;
}

const MdsAssessmentForm = ({ assessment, residentId, onSave, onClose }: MdsAssessmentFormProps) => {
  const [activeSection, setActiveSection] = useState("section-a");
  const [formData, setFormData] = useState(assessment || {
    resident_id: residentId,
    assessment_type: 'admission',
    status: 'in_progress' as AssessmentStatus,
    sections_completed: [],
    total_sections: 20,
    completion_percentage: 0,
    data: {
      section_a: { completed: false },
      section_b: { completed: false },
      section_c: { completed: false },
      section_d: { completed: false },
      section_e: { completed: false },
      section_f: { completed: false },
      section_g: { completed: false },
      section_h: { completed: false },
      section_i: { completed: false },
      section_j: { completed: false },
      section_k: { completed: false },
      section_l: { completed: false },
      section_m: { completed: false },
      section_n: { completed: false },
      section_o: { completed: false },
      section_p: { completed: false },
      section_q: { completed: false },
      section_v: { completed: false },
      section_x: { completed: false },
      section_z: { completed: false }
    },
    caa_triggers: []
  });

  const sections = [
    { id: "section-a", title: "A. Identification", icon: User, color: "blue" },
    { id: "section-b", title: "B. Hearing/Vision", icon: Eye, color: "green" },
    { id: "section-c", title: "C. Cognitive Patterns", icon: Brain, color: "purple" },
    { id: "section-d", title: "D. Mood", icon: Heart, color: "pink" },
    { id: "section-e", title: "E. Behavior", icon: AlertTriangle, color: "orange" },
    { id: "section-f", title: "F. Preferences", icon: MessageSquare, color: "teal" },
    { id: "section-g", title: "G. Functional Status", icon: Activity, color: "indigo" },
    { id: "section-h", title: "H. Bladder & Bowel", icon: Droplets, color: "cyan" },
    { id: "section-i", title: "I. Active Diagnoses", icon: Stethoscope, color: "red" },
    { id: "section-j", title: "J. Health Conditions", icon: Heart, color: "rose" },
    { id: "section-k", title: "K. Nutrition", icon: Utensils, color: "amber" },
    { id: "section-l", title: "L. Oral/Dental", icon: MessageSquare, color: "lime" },
    { id: "section-m", title: "M. Skin Conditions", icon: Shield, color: "emerald" },
    { id: "section-n", title: "N. Medications", icon: Pill, color: "violet" },
    { id: "section-o", title: "O. Treatments", icon: Stethoscope, color: "fuchsia" },
    { id: "section-p", title: "P. Restraints", icon: Shield, color: "slate" },
    { id: "section-q", title: "Q. Participation", icon: User, color: "stone" },
    { id: "section-v", title: "V. CAA Summary", icon: CheckCircle, color: "green" },
    { id: "section-x", title: "X. Correction", icon: FileText, color: "gray" },
    { id: "section-z", title: "Z. Administration", icon: Clock, color: "blue" }
  ];

  const calculateProgress = () => {
    const completedSections = Object.values(formData.data || {}).filter(section => section?.completed).length;
    return Math.round((completedSections / sections.length) * 100);
  };

  const runCaaAnalysis = () => {
    if (formData.data) {
      const triggers = CaaEngine.analyzeTriggers(formData.data);
      setFormData(prev => ({
        ...prev,
        caa_triggers: triggers
      }));
    }
  };

  const handleSectionUpdate = (sectionKey: string, sectionData: any) => {
    setFormData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [sectionKey]: {
          ...sectionData,
          completed: true
        }
      }
    }));
  };

  const handleSave = () => {
    const updatedAssessment = {
      ...formData,
      completion_percentage: calculateProgress(),
      updated_at: new Date().toISOString()
    };
    onSave(updatedAssessment);
  };

  const getSectionStatus = (sectionId: string) => {
    const sectionKey = sectionId.replace('-', '_');
    const section = formData.data?.[sectionKey as keyof typeof formData.data];
    return section?.completed ? 'completed' : 'pending';
  };

  useEffect(() => {
    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      handleSave();
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">MDS 3.0 Assessment</h2>
              <p className="text-gray-600">
                {formData.assessment_type?.replace('_', ' ')} Assessment • {calculateProgress()}% Complete
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={formData.status === 'completed' ? 'default' : 'secondary'}>
                {formData.status?.replace('_', ' ')}
              </Badge>
              <Progress value={calculateProgress()} className="w-32" />
              <Button onClick={runCaaAnalysis} variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                Analyze CAAs
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Section Navigation */}
          <div className="w-80 border-r bg-gray-50 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Assessment Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => {
                  const status = getSectionStatus(section.id);
                  const Icon = section.icon;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`
                        w-full flex items-center p-3 rounded-lg text-left transition-colors
                        ${activeSection === section.id 
                          ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                          : 'hover:bg-gray-100 text-gray-700'
                        }
                      `}
                    >
                      <div className={`p-2 rounded-full mr-3 bg-${section.color}-100`}>
                        <Icon className={`w-4 h-4 text-${section.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{section.title}</div>
                        <div className="text-xs text-gray-500">
                          {status === 'completed' ? 'Completed' : 'Pending'}
                        </div>
                      </div>
                      {status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Tabs value={activeSection} onValueChange={setActiveSection}>
                <TabsContent value="section-a">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-600" />
                        Section A: Identification Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MdsSectionA 
                        data={formData.data?.section_a}
                        onChange={(data) => handleSectionUpdate('section_a', data)}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="section-b">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-green-600" />
                        Section B: Hearing, Speech, and Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MdsSectionB 
                        data={formData.data?.section_b}
                        onChange={(data) => handleSectionUpdate('section_b', data)}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="section-c">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-purple-600" />
                        Section C: Cognitive Patterns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MdsSectionC 
                        data={formData.data?.section_c}
                        onChange={(data) => handleSectionUpdate('section_c', data)}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Additional sections would be implemented similarly */}
                <TabsContent value="section-v">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Section V: Care Area Assessment (CAA) Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Based on the MDS assessment data, the following Care Area Assessments (CAAs) have been triggered:
                        </p>
                        
                        {formData.caa_triggers && formData.caa_triggers.length > 0 ? (
                          <div className="space-y-3">
                            {formData.caa_triggers.map((trigger, index) => (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">
                                    {CaaEngine.getCaaDescription(trigger.caa_type)}
                                  </h4>
                                  <Badge variant={trigger.triggered ? 'destructive' : 'secondary'}>
                                    {trigger.triggered ? 'Triggered' : 'Not Triggered'}
                                  </Badge>
                                </div>
                                {trigger.trigger_items.length > 0 && (
                                  <div className="text-sm text-gray-600">
                                    <strong>Trigger Items:</strong>
                                    <ul className="list-disc list-inside mt-1">
                                      {trigger.trigger_items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            Complete other sections first, then click "Analyze CAAs" to generate triggers.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MdsAssessmentForm;
