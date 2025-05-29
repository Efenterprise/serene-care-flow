
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
      i0100: [],
      i0200: [],
      i0300: [],
      i0400: [],
      i0500: [],
      i0600: [],
      i0700: [],
      i0800: [],
      i0900: [],
      i1000: [],
      i1200: [],
      i1400: [],
      i1500: [],
      i1550: [],
      i1700: [],
      i2000: [],
      i2100: [],
      i2200: [],
      i2300: [],
      i2400: [],
      i2500: [],
      completed: false 
    },
    section_j: { 
      j0100: '0',
      j0200: '0',
      j0300: '0',
      j0400: '0',
      j0500: '0',
      j0600: '0',
      j1100: '0',
      j1400: '0',
      j1550: '0',
      j1700: '0',
      j1800: '0',
      j1900: '0',
      completed: false 
    },
    section_k: { 
      k0100: '0',
      k0200: '0',
      k0300: '0',
      k0510: '0',
      k0520: '0',
      k0700: '0',
      k0800: '0',
      k0900: '0',
      completed: false 
    },
    section_l: { 
      l0100: '0',
      l0200: '0',
      completed: false 
    },
    section_m: { 
      m0100: '0',
      m0150: '0',
      m0200: '0',
      m0300: '0',
      m0400: '0',
      m0500: '0',
      m0610: '0',
      m0700: '0',
      m0800: '0',
      completed: false 
    },
    section_n: { 
      n0100: '0',
      n0300: '0',
      n0350: '0',
      n0400: '0',
      n0410: '0',
      n0450: '0',
      n0500: '0',
      n0510: '0',
      completed: false 
    },
    section_o: { 
      o0100: '0',
      o0200: '0',
      o0250: '0',
      o0300: '0',
      o0400: '',
      o0410: '',
      o0420: '',
      o0430: '',
      o0440: '',
      o0450: '',
      o0500: '0',
      o0600: '0',
      completed: false 
    },
    section_p: { 
      p0100: '0',
      p0200: '0',
      completed: false 
    },
    section_q: { 
      q0100: '0',
      q0200: '0',
      completed: false 
    },
    section_v: { 
      caa_summary: {},
      completed: false 
    },
    section_x: { 
      x0100: '',
      x0150: '',
      completed: false 
    },
    section_z: { 
      z0100: '',
      z0150: '',
      z0200: '',
      z0250: '',
      z0300: '',
      z0350: '',
      z0400: '',
      z0500: '',
      z0600: '',
      completed: false 
    }
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
