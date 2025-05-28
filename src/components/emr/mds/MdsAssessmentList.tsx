
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
}

interface MdsAssessmentListProps {
  assessments: MdsAssessment[];
}

const MdsAssessmentList = ({ assessments }: MdsAssessmentListProps) => {
  return (
    <div className="grid gap-4">
      {assessments.map((assessment) => (
        <MdsAssessmentCard key={assessment.id} assessment={assessment} />
      ))}
    </div>
  );
};

export default MdsAssessmentList;
