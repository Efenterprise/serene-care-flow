
// Care Area Assessment (CAA) Types

export type CaaType = 
  | 'delirium'
  | 'cognitive_loss'
  | 'visual_function'
  | 'communication'
  | 'adl_functional_rehab'
  | 'urinary_incontinence'
  | 'psychosocial_wellbeing'
  | 'mood_state'
  | 'behavioral_symptoms'
  | 'activities'
  | 'falls'
  | 'nutritional_status'
  | 'feeding_tube'
  | 'dehydration'
  | 'dental_care'
  | 'pressure_ulcer'
  | 'psychotropic_drug_use'
  | 'physical_restraints'
  | 'pain';

export interface CaaTrigger {
  caa_type: CaaType;
  triggered: boolean;
  trigger_items: string[];
  investigation_required: boolean;
  investigation_completed: boolean;
  proceed_to_care_planning: boolean;
  rationale: string;
  completed_by?: string;
  completed_date?: string;
}

export interface CaaInvestigation {
  id: string;
  assessment_id: string;
  caa_type: CaaType;
  triggered_items: string[];
  investigation_notes: string;
  clinical_findings: string;
  proceed_to_care_planning: boolean;
  rationale: string;
  interventions_considered: string[];
  care_plan_problems: string[];
  completed_by: string;
  completed_date: string;
  reviewed_by?: string;
  reviewed_date?: string;
}
