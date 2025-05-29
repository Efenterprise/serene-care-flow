
import { AssessmentType } from "@/types/mds";

export interface MockMdsAssessment {
  id: string;
  resident_id: string;
  patientName: string;
  mrn: string;
  assessment_type: AssessmentType;
  assessmentType: string;
  dueDate: string;
  status: string;
  completedBy: string;
  lastModified: string;
  completion_percentage: number;
  sections_completed: string[];
  total_sections: number;
  caa_triggers: any[];
  target_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  data: {
    [key: string]: { completed: boolean };
  };
}
