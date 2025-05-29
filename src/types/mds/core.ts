
// Core MDS Assessment Types

export type AssessmentType = 
  | 'admission' 
  | 'annual' 
  | 'significant_change' 
  | 'quarterly' 
  | 'discharge' 
  | 'death';

export type AssessmentStatus = 
  | 'not_started' 
  | 'in_progress' 
  | 'completed' 
  | 'submitted' 
  | 'locked';

export interface MdsAssessment {
  id: string;
  resident_id: string;
  assessment_type: AssessmentType;
  status: AssessmentStatus;
  target_date: string;
  completion_date?: string;
  submitted_date?: string;
  created_by: string;
  updated_by?: string;
  sections_completed: string[];
  total_sections: number;
  completion_percentage: number;
  data: MdsData;
  caa_triggers: CaaTrigger[];
  created_at: string;
  updated_at: string;
}

// Import section interfaces
import type { 
  SectionA, SectionB, SectionC, SectionD, SectionE, SectionF,
  SectionG, SectionH, SectionI, SectionJ, SectionK, SectionL,
  SectionM, SectionN, SectionO, SectionP, SectionQ, SectionV,
  SectionX, SectionZ 
} from './sections';
import type { CaaTrigger } from './caa';

export interface MdsData {
  section_a: SectionA;
  section_b: SectionB;
  section_c: SectionC;
  section_d: SectionD;
  section_e: SectionE;
  section_f: SectionF;
  section_g: SectionG;
  section_h: SectionH;
  section_i: SectionI;
  section_j: SectionJ;
  section_k: SectionK;
  section_l: SectionL;
  section_m: SectionM;
  section_n: SectionN;
  section_o: SectionO;
  section_p: SectionP;
  section_q: SectionQ;
  section_v: SectionV;
  section_x: SectionX;
  section_z: SectionZ;
}
