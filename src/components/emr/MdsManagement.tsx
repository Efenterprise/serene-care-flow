
import { useState } from "react";
import { MdsAssessment } from "@/types/mds";
import { mockMdsAssessments } from "./mds/data/mockAssessments";
import { convertToMdsAssessment } from "./mds/utils/assessmentUtils";
import MdsHeader from "./mds/MdsHeader";
import MdsMetrics from "./mds/MdsMetrics";
import MdsSearchFilters from "./mds/MdsSearchFilters";
import MdsAssessmentList from "./mds/MdsAssessmentList";
import MdsAssessmentForm from "./mds/MdsAssessmentForm";

const MdsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<MdsAssessment | undefined>();

  const overdueCount = mockMdsAssessments.filter(a => a.status === 'overdue').length;
  const completedCount = mockMdsAssessments.filter(a => a.status === 'completed').length;
  const inProgressCount = mockMdsAssessments.filter(a => a.status === 'in_progress').length;

  const handleNewAssessment = () => {
    setSelectedAssessment(undefined);
    setShowAssessmentForm(true);
  };

  const handleEditAssessment = (assessment: any) => {
    const mdsAssessment = convertToMdsAssessment(assessment);
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
      <MdsHeader onNewAssessment={handleNewAssessment} />

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
        assessments={mockMdsAssessments} 
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
