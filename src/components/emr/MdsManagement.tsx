import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Brain } from "lucide-react";
import MdsMetrics from "./mds/MdsMetrics";
import MdsSearchFilters from "./mds/MdsSearchFilters";
import MdsAssessmentList from "./mds/MdsAssessmentList";
import MdsAssessmentForm from "./mds/MdsAssessmentForm";
import { MdsAssessment, AssessmentType } from "@/types/mds";

const MdsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<MdsAssessment | undefined>();

  // Enhanced mock MDS data with comprehensive structure
  const mdsAssessments = [
    {
      id: "1",
      resident_id: "res-001", 
      patientName: "John Smith",
      mrn: "MRN12345",
      assessment_type: "admission" as AssessmentType,
      assessmentType: "Admission",
      dueDate: "2024-01-15",
      status: "completed",
      completedBy: "Jane Doe, RN",
      lastModified: "2024-01-14",
      completion_percentage: 100,
      sections_completed: ["section_a", "section_b", "section_c"],
      total_sections: 20,
      caa_triggers: [],
      target_date: "2024-01-15",
      created_by: "user-001",
      created_at: "2024-01-10T10:00:00Z",
      updated_at: "2024-01-14T15:30:00Z",
      data: {
        section_a: { completed: true },
        section_b: { completed: true }, 
        section_c: { completed: true },
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
      }
    },
    {
      id: "2",
      resident_id: "res-002",
      patientName: "Mary Johnson", 
      mrn: "MRN12346",
      assessment_type: "quarterly" as AssessmentType,
      assessmentType: "Quarterly",
      dueDate: "2024-01-18",
      status: "in_progress",
      completedBy: "Mike Wilson, RN",
      lastModified: "2024-01-12",
      completion_percentage: 65,
      sections_completed: ["section_a", "section_b"],
      total_sections: 20,
      caa_triggers: [],
      target_date: "2024-01-18",
      created_by: "user-002", 
      created_at: "2024-01-08T09:00:00Z",
      updated_at: "2024-01-12T14:20:00Z",
      data: {
        section_a: { completed: true },
        section_b: { completed: true },
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
      }
    },
    {
      id: "3",
      resident_id: "res-003",
      patientName: "Robert Davis",
      mrn: "MRN12347",
      assessment_type: "annual" as AssessmentType,
      assessmentType: "Annual",
      dueDate: "2024-01-20",
      status: "overdue",
      completedBy: "",
      lastModified: "2024-01-10",
      completion_percentage: 0,
      sections_completed: [],
      total_sections: 20,
      caa_triggers: [],
      target_date: "2024-01-20",
      created_by: "user-003",
      created_at: "2024-01-05T11:00:00Z",
      updated_at: "2024-01-10T16:45:00Z",
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
      }
    },
    {
      id: "4",
      resident_id: "res-004",
      patientName: "Susan Brown",
      mrn: "MRN12348",
      assessment_type: "discharge" as AssessmentType,
      assessmentType: "Discharge",
      dueDate: "2024-01-16",
      status: "pending",
      completedBy: "",
      lastModified: "2024-01-13",
      completion_percentage: 0,
      sections_completed: [],
      total_sections: 20,
      caa_triggers: [],
      target_date: "2024-01-16",
      created_by: "user-004",
      created_at: "2024-01-02T14:30:00Z",
      updated_at: "2024-01-13T09:15:00Z",
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
      }
    }
  ];

  const overdueCount = mdsAssessments.filter(a => a.status === 'overdue').length;
  const completedCount = mdsAssessments.filter(a => a.status === 'completed').length;
  const inProgressCount = mdsAssessments.filter(a => a.status === 'in_progress').length;

  const handleNewAssessment = () => {
    setSelectedAssessment(undefined);
    setShowAssessmentForm(true);
  };

  const handleEditAssessment = (assessment: any) => {
    // Convert legacy assessment format to new MdsAssessment format
    const mdsAssessment: MdsAssessment = {
      ...assessment,
      resident_id: assessment.resident_id || 'unknown',
      assessment_type: assessment.assessment_type || 'admission',
      status: assessment.status || 'not_started',
      sections_completed: assessment.sections_completed || [],
      total_sections: assessment.total_sections || 20,
      completion_percentage: assessment.completion_percentage || 0,
      caa_triggers: assessment.caa_triggers || [],
      target_date: assessment.dueDate || assessment.target_date,
      created_by: assessment.created_by || 'unknown',
      created_at: assessment.created_at || new Date().toISOString(),
      updated_at: assessment.updated_at || new Date().toISOString(),
      data: assessment.data || {
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
      }
    };
    
    setSelectedAssessment(mdsAssessment);
    setShowAssessmentForm(true);
  };

  const handleSaveAssessment = (assessment: Partial<MdsAssessment>) => {
    console.log('Saving assessment:', assessment);
    // Here you would typically save to your backend
    setShowAssessmentForm(false);
    setSelectedAssessment(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">MDS 3.0 & CAA Management</h2>
          <p className="text-gray-600">Comprehensive MDS assessments with automated CAA trigger analysis</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={handleNewAssessment}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
          <Button variant="outline">
            <Brain className="w-4 h-4 mr-2" />
            CAA Analysis
          </Button>
        </div>
      </div>

      <MdsMetrics 
        completedCount={completedCount}
        inProgressCount={inProgressCount}
        overdueCount={overdueCount}
      />

      <MdsSearchFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <MdsAssessmentList 
        assessments={mdsAssessments} 
        onEditAssessment={handleEditAssessment}
      />

      {showAssessmentForm && (
        <MdsAssessmentForm
          assessment={selectedAssessment}
          residentId={selectedAssessment?.resident_id || "new-resident"}
          onSave={handleSaveAssessment}
          onClose={() => {
            setShowAssessmentForm(false);
            setSelectedAssessment(undefined);
          }}
        />
      )}
    </div>
  );
};

export default MdsManagement;
