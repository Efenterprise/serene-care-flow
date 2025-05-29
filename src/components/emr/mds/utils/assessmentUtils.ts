
import { MdsAssessment, AssessmentStatus } from "@/types/mds";
import { MockMdsAssessment } from "../types/mockData";

export const convertToMdsAssessment = (assessment: MockMdsAssessment): MdsAssessment => {
  return {
    ...assessment,
    resident_id: assessment.resident_id || 'unknown',
    assessment_type: assessment.assessment_type || 'admission',
    status: (assessment.status as AssessmentStatus) || 'not_started',
    sections_completed: assessment.sections_completed || [],
    total_sections: assessment.total_sections || 20,
    completion_percentage: assessment.completion_percentage || 0,
    caa_triggers: assessment.caa_triggers || [],
    target_date: assessment.dueDate || assessment.target_date,
    created_by: assessment.created_by || 'unknown',
    created_at: assessment.created_at || new Date().toISOString(),
    updated_at: assessment.updated_at || new Date().toISOString(),
    data: assessment.data || {
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
      section_c: { completed: false },
      section_d: { 
        d0100: '0',
        d0200: '0',
        d0300: '0',
        d0350: '0',
        d0500: '0',
        d0600: '0',
        completed: false 
      },
      section_e: { completed: false },
      section_f: { completed: false },
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
