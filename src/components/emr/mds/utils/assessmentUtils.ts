
import { MdsAssessment } from "@/types/mds";
import { MockMdsAssessment } from "../types/mockData";

export const convertToMdsAssessment = (assessment: MockMdsAssessment): MdsAssessment => {
  return {
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
};
