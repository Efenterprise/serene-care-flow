
import MdsAssessmentCard from "./MdsAssessmentCard";

interface MdsAssessment {
  id: string;
  patientName: string;
  mrn: string;
  assessmentType: string;
  dueDate: string;
  status: string;
  completedBy: string;
  lastModified: string;
  completion_percentage?: number;
  caa_triggers?: any[];
}

interface MdsAssessmentListProps {
  assessments: MdsAssessment[];
  onEditAssessment?: (assessment: MdsAssessment) => void;
}

const MdsAssessmentList = ({ assessments, onEditAssessment }: MdsAssessmentListProps) => {
  return (
    <div className="grid gap-4">
      {assessments.map((assessment) => (
        <MdsAssessmentCard 
          key={assessment.id} 
          assessment={assessment} 
          onEditAssessment={onEditAssessment}
        />
      ))}
    </div>
  );
};

export default MdsAssessmentList;
