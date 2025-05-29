
import { MdsAssessment, AssessmentStatus, MdsData } from "@/types/mds";
import { MockMdsAssessment } from "../types/mockData";

export const convertToMdsAssessment = (assessment: MockMdsAssessment): MdsAssessment => {
  // Create default MdsData structure
  const defaultData: MdsData = {
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
      i0100: [],
      i0200: [],
      i0300: [],
      i0400: [],
      i0500: [],
      i0600: [],
      i0700: [],
      i0800: [],
      i0900: [],
      completed: false 
    },
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
  };

  // Merge assessment data with defaults
  const mergedData: MdsData = {
    ...defaultData,
    ...assessment.data
  };

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
    data: mergedData
  };
};
